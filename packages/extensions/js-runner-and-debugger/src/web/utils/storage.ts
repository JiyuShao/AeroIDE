import * as vscode from 'vscode';
// import { Connection } from 'vscode-languageserver';
// import { isWebEnv } from '../config';
import { AutoInitClass, autoInit } from './decorator/auto-init-class';

export type StorageData = Uint8Array;

abstract class BaseStorage<T> extends AutoInitClass {
  abstract put(key: string, data: T): Promise<void>;

  abstract get(key: string): Promise<T>;
  abstract getAllKeys(): Promise<string[]>;

  abstract delete(key: string): Promise<void>;
}

// class BrowserStorage extends BaseStorage<StorageData> {
//   constructor(context: vscode.ExtensionContext) {
//     super(context);
//   }
//   async put() {}
//   async get() {}
//   async getAllKeys(): Promise<string[]> {}
//   async delete() {}
// }

class NodeStorage extends BaseStorage<StorageData> {
  private _persistUri: vscode.Uri;

  constructor(context: vscode.ExtensionContext) {
    super();
    if (!context.globalStorageUri) {
      throw new Error('NodeStorage context.globalStorageUri is undefined');
    }
    this._persistUri = vscode.Uri.joinPath(
      context.globalStorageUri,
      'storage.db'
    );
  }

  protected _init = async () => {
    return new Promise<void>(resolve => {
      vscode.workspace.fs.readDirectory(this._persistUri).then(
        () => {
          resolve();
        },
        error => {
          if (
            error instanceof vscode.FileSystemError &&
            error.code === 'FileNotFound'
          ) {
            vscode.workspace.fs
              .createDirectory(this._persistUri)
              .then(() => resolve());
          }
        }
      );
    });
  };

  @autoInit
  async put(key: string, data: StorageData) {
    await vscode.workspace.fs.writeFile(
      vscode.Uri.joinPath(this._persistUri, key),
      data
    );
  }

  @autoInit
  async get(key: string) {
    return vscode.workspace.fs.readFile(
      vscode.Uri.joinPath(this._persistUri, key)
    );
  }

  @autoInit
  async getAllKeys() {
    const dirItems = await vscode.workspace.fs.readDirectory(this._persistUri);
    return dirItems.map(([key]) => {
      return key;
    });
  }

  @autoInit
  async delete(key: string) {
    await vscode.workspace.fs.delete(
      vscode.Uri.joinPath(this._persistUri, key)
    );
  }
}

// export const Storage = isWebEnv ? BrowserStorage : NodeStorage;
export type IStorage = NodeStorage;
export const Storage = NodeStorage;
