/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
// Reference: https://github.com/microsoft/vscode-extension-samples/blob/main/fsprovider-sample/src/fileSystemProvider.ts

import * as path from './paths';
import * as vscode from 'vscode';
import JSZip from 'jszip';
import { logger } from './logger';
import { FS_SCHEME } from '../config';
import { IndexedDBWrapper } from './indexed-db';
import { exportFile } from './file';

export class File implements vscode.FileStat {
  type: vscode.FileType;
  ctime: number;
  mtime: number;
  size: number;

  name: string;
  data?: Uint8Array;

  constructor(name: string) {
    this.type = vscode.FileType.File;
    this.ctime = Date.now();
    this.mtime = Date.now();
    this.size = 0;
    this.name = name;
  }
}

export class Directory implements vscode.FileStat {
  type: vscode.FileType;
  ctime: number;
  mtime: number;
  size: number;

  name: string;
  entries: Map<string, File | Directory>;

  constructor(name: string) {
    this.type = vscode.FileType.Directory;
    this.ctime = Date.now();
    this.mtime = Date.now();
    this.size = 0;
    this.name = name;
    this.entries = new Map();
  }
}

export type Entry = File | Directory;

export class MemFS implements vscode.FileSystemProvider {
  private root: Directory;
  private dbWrapper: IndexedDBWrapper;

  constructor(rootUri: vscode.Uri) {
    this.root = new Directory(rootUri.path);
    this.dbWrapper = new IndexedDBWrapper(FS_SCHEME, rootUri.path);
  }

  // --- manage file metadata

  stat(uri: vscode.Uri): vscode.FileStat {
    return this._lookup(uri, false);
  }

  readDirectory(uri: vscode.Uri): [string, vscode.FileType][] {
    const entry = this._lookupAsDirectory(uri, false);
    const result: [string, vscode.FileType][] = [];
    for (const [name, child] of entry.entries) {
      result.push([name, child.type]);
    }
    return result;
  }

  // --- manage file contents

  readFile(uri: vscode.Uri): Uint8Array {
    const data = this._lookupAsFile(uri, false).data;
    if (data) {
      return data;
    }
    throw vscode.FileSystemError.FileNotFound();
  }

  writeFile(
    uri: vscode.Uri,
    content: Uint8Array,
    options: { create: boolean; overwrite: boolean }
  ): void {
    const basename = path.basename(uri.path);
    const parent = this._lookupParentDirectory(uri);
    let entry = parent.entries.get(basename);
    if (entry instanceof Directory) {
      throw vscode.FileSystemError.FileIsADirectory(uri);
    }
    if (!entry && !options.create) {
      throw vscode.FileSystemError.FileNotFound(uri);
    }
    if (entry && options.create && !options.overwrite) {
      throw vscode.FileSystemError.FileExists(uri);
    }
    if (!entry) {
      entry = new File(basename);
      parent.entries.set(basename, entry);
      this._fireSoon({ type: vscode.FileChangeType.Created, uri });
    }
    entry.mtime = Date.now();
    entry.size = content.byteLength;
    entry.data = content;

    this._fireSoon({ type: vscode.FileChangeType.Changed, uri });
  }

  // --- manage files/folders

  rename(
    oldUri: vscode.Uri,
    newUri: vscode.Uri,
    options: { overwrite: boolean }
  ): void {
    if (!options.overwrite && this._lookup(newUri, true)) {
      throw vscode.FileSystemError.FileExists(newUri);
    }

    const entry = this._lookup(oldUri, false);
    const oldParent = this._lookupParentDirectory(oldUri);

    const newParent = this._lookupParentDirectory(newUri);
    const newName = path.basename(newUri.path);

    oldParent.entries.delete(entry.name);
    entry.name = newName;
    newParent.entries.set(newName, entry);

    this._fireSoon(
      { type: vscode.FileChangeType.Deleted, uri: oldUri },
      { type: vscode.FileChangeType.Created, uri: newUri }
    );
  }

  delete(uri: vscode.Uri): void {
    const dirname = uri.with({ path: path.dirname(uri.path) });
    const basename = path.basename(uri.path);
    const parent = this._lookupAsDirectory(dirname, false);
    if (!parent.entries.has(basename)) {
      throw vscode.FileSystemError.FileNotFound(uri);
    }
    parent.entries.delete(basename);
    parent.mtime = Date.now();
    parent.size -= 1;
    this._fireSoon(
      { type: vscode.FileChangeType.Changed, uri: dirname },
      { uri, type: vscode.FileChangeType.Deleted }
    );
  }

  createDirectory(uri: vscode.Uri): void {
    const basename = path.basename(uri.path);
    const dirname = uri.with({ path: path.dirname(uri.path) });
    const parent = this._lookupAsDirectory(dirname, false);

    const entry = new Directory(basename);
    parent.entries.set(entry.name, entry);
    parent.mtime = Date.now();
    parent.size += 1;
    this._fireSoon(
      { type: vscode.FileChangeType.Changed, uri: dirname },
      { type: vscode.FileChangeType.Created, uri }
    );
  }

  // --- lookup

  private _lookup(uri: vscode.Uri, silent: false): Entry;
  private _lookup(uri: vscode.Uri, silent: boolean): Entry | undefined;
  private _lookup(uri: vscode.Uri, silent: boolean): Entry | undefined {
    const parts = uri.path.split('/');
    let entry: Entry = this.root;
    for (const part of parts) {
      if (!part) {
        continue;
      }
      let child: Entry | undefined;
      if (entry instanceof Directory) {
        child = entry.entries.get(part);
      }
      if (!child) {
        if (!silent) {
          throw vscode.FileSystemError.FileNotFound(uri);
        } else {
          return undefined;
        }
      }
      entry = child;
    }
    return entry;
  }

  private _lookupAsDirectory(uri: vscode.Uri, silent: boolean): Directory {
    const entry = this._lookup(uri, silent);
    if (entry instanceof Directory) {
      return entry;
    }
    throw vscode.FileSystemError.FileNotADirectory(uri);
  }

  private _lookupAsFile(uri: vscode.Uri, silent: boolean): File {
    const entry = this._lookup(uri, silent);
    if (entry instanceof File) {
      return entry;
    }
    throw vscode.FileSystemError.FileIsADirectory(uri);
  }

  private _lookupParentDirectory(uri: vscode.Uri): Directory {
    const dirname = uri.with({ path: path.dirname(uri.path) });
    return this._lookupAsDirectory(dirname, false);
  }

  // --- manage file events

  private _emitter = new vscode.EventEmitter<vscode.FileChangeEvent[]>();
  private _bufferedEvents: vscode.FileChangeEvent[] = [];
  private _fireSoonHandle?: NodeJS.Timeout;

  readonly onDidChangeFile: vscode.Event<vscode.FileChangeEvent[]> =
    this._emitter.event;

  watch(_resource: vscode.Uri): vscode.Disposable {
    // ignore, fires for all changes...
    return new vscode.Disposable(() => {});
  }

  private _fireSoon(...events: vscode.FileChangeEvent[]): void {
    this._bufferedEvents.push(...events);

    if (this._fireSoonHandle) {
      clearTimeout(this._fireSoonHandle);
    }

    this._fireSoonHandle = setTimeout(() => {
      this._emitter.fire(this._bufferedEvents);
      this._bufferedEvents.length = 0;
    }, 5);
  }

  // Custom Method
  public async init() {
    return this.dbWrapper.open();
  }

  public async reset(
    uri: vscode.Uri = vscode.Uri.parse(`${FS_SCHEME}:${this.root.name}`)
  ) {
    for (const [name] of this.readDirectory(uri)) {
      this.delete(vscode.Uri.parse(`${FS_SCHEME}:/${name}`));
    }
  }

  public async exportToZip(): Promise<void> {
    const rootZip = new JSZip();
    const stack: {
      value: Directory | File;
      path: string;
      parentZip: JSZip;
    }[] = [
      {
        value: this.root,
        path: '',
        parentZip: rootZip,
      },
    ];
    // preorder DFS
    while (stack.length > 0) {
      const currentItem = stack.pop()!;
      logger.debug(`Creating ${currentItem.path}:`, currentItem.value);
      if (currentItem.value instanceof Directory) {
        // create zip folder
        const currentZip =
          currentItem.path === ''
            ? currentItem.parentZip // root
            : currentItem.parentZip.folder(currentItem.value.name)!;
        currentItem.value.entries.forEach((value, key) => {
          stack.push({
            value,
            path: `${currentItem.path}/${key}`,
            parentZip: currentZip,
          });
        });
      } else if (currentItem.value instanceof File) {
        if (!currentItem.value.data) {
          logger.error(`Creating ${currentItem.path} Failed: File is Empty!`);
          continue;
        }
        currentItem.parentZip.file(
          currentItem.value.name,
          currentItem.value.data
        );
      }
      logger.debug(`Creating ${currentItem.path} Succeed!`);
    }
    try {
      const content = await rootZip.generateAsync({ type: 'uint8array' });
      const path = await exportFile(content, 'memfs.zip');
      vscode.window.showInformationMessage(`File saved successfully: ${path}`);
    } catch (error) {
      const errMsg = `exportToZip failed:${(error as Error).message}`;
      logger.info(errMsg);
      throw new Error(errMsg);
    }
  }

  public async importFromZip(uri: vscode.Uri): Promise<vscode.Uri | void> {
    const rawContent = await vscode.workspace.fs.readFile(uri);
    if (!rawContent) {
      return;
    }
    const rootZip = await JSZip.loadAsync(rawContent);
    const stack: {
      value: Directory | File;
      path: string;
      zip: JSZip;
    }[] = [
      {
        value: this.root,
        path: '',
        zip: rootZip,
      },
    ];
    while (stack.length > 0) {
      const currentItem = stack.pop()!;
      for (const currentFileMeta of Object.values(currentItem.zip.files)) {
        if (currentFileMeta.dir) {
          this.createDirectory(
            vscode.Uri.parse(
              `${FS_SCHEME}:${currentItem.path}/${currentFileMeta.name}`
            )
          );
        } else {
          const currentFileContent = await currentItem.zip
            .file(currentFileMeta.name)
            ?.async('uint8array');
          if (currentFileContent) {
            this.writeFile(
              vscode.Uri.parse(
                `${FS_SCHEME}:${currentItem.path}${currentFileMeta.name}`
              ),
              currentFileContent,
              { create: true, overwrite: true }
            );
          }
        }
      }
    }
    return vscode.Uri.parse(`${FS_SCHEME}:/`);
  }
}
