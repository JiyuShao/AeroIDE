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
import { exportFile } from './file';
import { IStorage, Storage } from './storage';
import { AutoInitClass, autoInit } from './decorator/auto-init-class';

abstract class BaseFile implements vscode.FileStat {
  type: vscode.FileType;
  ctime: number;
  mtime: number;
  size: number;

  name: string;
  data?: Uint8Array; // only file has data

  constructor(name: string, type: vscode.FileType) {
    this.ctime = Date.now();
    this.mtime = Date.now();
    this.size = 0;
    this.name = name;
    this.type = type;
  }

  toUnit8Array() {
    const metadata = {
      type: this.type,
      ctime: this.ctime,
      mtime: this.mtime,
      size: this.size,
      name: this.name,
    };
    const metadataString = JSON.stringify(metadata);
    const metadataBytes = new TextEncoder().encode(metadataString);

    if (this.data) {
      const combined = new Uint8Array(
        metadataBytes.length + this.data.length + 1
      );
      combined.set(new Uint8Array([metadataBytes.length]), 0); // Store the length of metadata as first byte.
      combined.set(metadataBytes, 1);
      combined.set(this.data, metadataBytes.length + 1);
      return combined;
    } else {
      const combined = new Uint8Array(metadataBytes.length + 1);
      combined.set(new Uint8Array([metadataBytes.length]), 0); // Store the length of metadata as first byte.
      combined.set(metadataBytes, 1);
      return combined;
    }
  }

  static fromUnit8Array(bytes: Uint8Array): File | Directory {
    const metadataLength = bytes[0];
    const metadataBytes = bytes.slice(1, metadataLength + 1);
    const data = bytes.slice(metadataLength + 1);

    const metadataString = new TextDecoder().decode(metadataBytes);
    const metadata = JSON.parse(metadataString);
    let result: File | Directory | null = null;
    if (metadata.type === vscode.FileType.File) {
      result = new File(metadata.name);
      result.data = data;
    } else if (metadata.type === vscode.FileType.Directory) {
      result = new Directory(metadata.name);
    } else {
      throw new Error(`Invalid File Metadata: ${metadataString}`);
    }

    result.ctime = metadata.ctime;
    result.mtime = metadata.mtime;
    result.size = metadata.size;
    return result;
  }
}

export class File extends BaseFile {
  constructor(name: string) {
    super(name, vscode.FileType.File);
  }
}

export class Directory extends BaseFile {
  entries: Map<string, File | Directory> = new Map();

  constructor(name: string) {
    super(name, vscode.FileType.Directory);
  }
}

export type Entry = File | Directory;

export class MemFS extends AutoInitClass implements vscode.FileSystemProvider {
  private _root: Directory;
  private _storage: IStorage;

  constructor(context: vscode.ExtensionContext) {
    super();
    this._root = new Directory('/');
    this._storage = new Storage(context);
  }

  protected _init = async () => {
    // load from storage
    const keys = (await this._storage.getAllKeys()).sort(
      (a, b) => a.length - b.length
    );
    if (keys.length === 0) {
      await this._storage.put(
        this._convertUriToFileKey(vscode.Uri.parse(`${FS_SCHEME}:/`)),
        this._root.toUnit8Array()
      );
      return;
    }
    const fileMap: Record<string, Directory> = {
      '/': this._root,
    };

    for (const key of keys) {
      const rawData = await this._storage.get(key);
      const uri = this._convertFileKeyToUri(key);
      const baseFile = BaseFile.fromUnit8Array(rawData);
      if (baseFile instanceof Directory && !fileMap[uri.path]) {
        fileMap[path.dirpath(uri.path)].entries.set(
          path.basename(uri.path),
          baseFile
        );
        fileMap[uri.path] = baseFile;
      } else if (baseFile instanceof File) {
        const currentFolder = fileMap[path.dirpath(uri.path)];
        if (!currentFolder) {
          throw new Error(
            `Load from storage failed: ${path.dirpath(uri.path)} not found`
          );
        }
        currentFolder.entries.set(path.basename(uri.path), baseFile);
      }
    }
  };

  // --- manage file metadata

  @autoInit
  async stat(uri: vscode.Uri): Promise<vscode.FileStat> {
    return this._lookup(uri, false);
  }

  @autoInit
  async readDirectory(uri: vscode.Uri): Promise<[string, vscode.FileType][]> {
    const entry = this._lookupAsDirectory(uri, false);
    const result: [string, vscode.FileType][] = [];
    for (const [name, child] of entry.entries) {
      result.push([name, child.type]);
    }
    return result;
  }

  // --- manage file contents

  @autoInit
  async readFile(uri: vscode.Uri): Promise<Uint8Array> {
    const data = this._lookupAsFile(uri, false).data;
    if (data) {
      return data;
    }
    throw vscode.FileSystemError.FileNotFound();
  }

  @autoInit
  async writeFile(
    uri: vscode.Uri,
    content: Uint8Array,
    options: { create: boolean; overwrite: boolean }
  ): Promise<void> {
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

    // async write file storage
    await this._storage.put(
      this._convertUriToFileKey(uri),
      entry.toUnit8Array()
    );
    this._fireSoon({ type: vscode.FileChangeType.Changed, uri });
  }

  // --- manage files/folders

  @autoInit
  async rename(
    oldUri: vscode.Uri,
    newUri: vscode.Uri,
    options: { overwrite: boolean }
  ): Promise<void> {
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

    // async rename storage
    const oldStorageItem = await this._storage.get(
      this._convertUriToFileKey(oldUri)
    );
    await this._storage.put(this._convertUriToFileKey(newUri), oldStorageItem);
    await this._storage.delete(this._convertUriToFileKey(oldUri));

    this._fireSoon(
      { type: vscode.FileChangeType.Deleted, uri: oldUri },
      { type: vscode.FileChangeType.Created, uri: newUri }
    );
  }

  @autoInit
  async delete(uri: vscode.Uri): Promise<void> {
    const dirUri = vscode.Uri.parse(`${FS_SCHEME}:${path.dirpath(uri.path)}`);
    const basename = path.basename(uri.path);
    const parent = this._lookupAsDirectory(dirUri, false);
    if (!parent.entries.has(basename)) {
      throw vscode.FileSystemError.FileNotFound(uri);
    }
    parent.entries.delete(basename);
    parent.mtime = Date.now();
    parent.size -= 1;

    // async delete storage
    await this._storage.delete(this._convertUriToFileKey(uri));

    this._fireSoon(
      { type: vscode.FileChangeType.Changed, uri: dirUri },
      { uri, type: vscode.FileChangeType.Deleted }
    );
  }

  @autoInit
  async createDirectory(uri: vscode.Uri): Promise<void> {
    const basename = path.basename(uri.path);
    const dirUri = vscode.Uri.parse(`${FS_SCHEME}:${path.dirpath(uri.path)}`);
    const parent = this._lookupAsDirectory(dirUri, false);
    const entry = new Directory(basename);
    parent.entries.set(entry.name, entry);
    parent.mtime = Date.now();
    parent.size += 1;

    // async create directory storage
    await this._storage.put(
      this._convertUriToFileKey(dirUri),
      parent.toUnit8Array()
    );
    await this._storage.put(
      this._convertUriToFileKey(uri),
      entry.toUnit8Array()
    );

    this._fireSoon(
      { type: vscode.FileChangeType.Changed, uri: dirUri },
      { type: vscode.FileChangeType.Created, uri }
    );
  }

  // --- lookup

  private _lookup(uri: vscode.Uri, silent: false): Entry;
  private _lookup(uri: vscode.Uri, silent: boolean): Entry | undefined;
  private _lookup(uri: vscode.Uri, silent: boolean): Entry | undefined {
    const parts = uri.path.split('/');
    let entry: Entry = this._root;
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
    const dirUri = vscode.Uri.parse(`${FS_SCHEME}:${path.dirpath(uri.path)}`);
    return this._lookupAsDirectory(dirUri, false);
  }

  private _convertUriToFileKey(uri: vscode.Uri) {
    return encodeURIComponent(uri.path);
  }

  private _convertFileKeyToUri(fileKey: string): vscode.Uri {
    return vscode.Uri.parse(`${FS_SCHEME}:${decodeURIComponent(fileKey)}`);
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

  // Custom Public Method
  @autoInit
  public async reset(
    uri: vscode.Uri = vscode.Uri.parse(`${FS_SCHEME}:${this._root.name}`)
  ) {
    for (const [name, fileType] of await this.readDirectory(uri)) {
      await this.delete(
        vscode.Uri.parse(
          `${FS_SCHEME}:/${name}${fileType === vscode.FileType.Directory ? '/' : ''}`
        )
      );
    }
  }

  @autoInit
  public async exportToZip(): Promise<void> {
    const rootZip = new JSZip();
    const stack: {
      value: Directory | File;
      path: string;
      parentZip: JSZip;
    }[] = [
      {
        value: this._root,
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
      if (path) {
        vscode.window.showInformationMessage(
          `File saved successfully: ${path}`
        );
      }
    } catch (error) {
      const errMsg = `exportToZip failed:${(error as Error).message}`;
      logger.info(errMsg);
      throw new Error(errMsg);
    }
  }

  @autoInit
  public async importFromZip(uri: vscode.Uri): Promise<void> {
    const rawContent = await vscode.workspace.fs.readFile(uri);
    if (!rawContent) {
      return;
    }
    const rootZip = await JSZip.loadAsync(rawContent);
    const stack: {
      value: Directory | File;
      zip: JSZip;
    }[] = [
      {
        value: this._root,
        zip: rootZip,
      },
    ];
    while (stack.length > 0) {
      const currentItem = stack.pop()!;
      for (const currentFileMeta of Object.values(currentItem.zip.files)) {
        if (currentFileMeta.dir) {
          await this.createDirectory(
            vscode.Uri.parse(`${FS_SCHEME}:/${currentFileMeta.name}`)
          );
        } else {
          const currentFileContent = await currentItem.zip
            .file(currentFileMeta.name)
            ?.async('uint8array');
          if (currentFileContent) {
            await this.writeFile(
              vscode.Uri.parse(`${FS_SCHEME}:/${currentFileMeta.name}`),
              currentFileContent,
              { create: true, overwrite: true }
            );
          }
        }
      }
    }
  }
}
