import * as vscode from 'vscode';
import * as paths from './paths';
import { FS_SCHEME } from '../config';
import { logger } from './logger';

export async function importWorkspaceFromZip(): Promise<vscode.Uri | void> {
  const uris = await vscode.window.showOpenDialog({
    canSelectMany: false,
    canSelectFiles: true,
    canSelectFolders: false,
    openLabel: 'Select ZIP File',
    filters: {
      'ZIP File': ['zip'],
    },
    defaultUri: vscode.Uri.file('/'),
  });

  if (!uris || uris.length === 0) {
    return;
  }
  return uris[0];
}

export async function exportWorkspaceToZip(
  data: Uint8Array,
  defaultFilename: string
): Promise<string | void> {
  // Ask where to save
  const uri = await vscode.window.showSaveDialog({
    saveLabel: 'Save File',
    filters: {
      'ZIP File': ['zip'],
    },
    defaultUri: vscode.Uri.file(defaultFilename),
  });
  if (!uri) {
    return;
  }
  await vscode.workspace.fs.writeFile(uri, data);
  return uri.fsPath;
}

export async function fileExists(uri: vscode.Uri): Promise<boolean> {
  try {
    const stat = await vscode.workspace.fs.stat(uri);
    return stat.type === vscode.FileType.File;
  } catch (err) {
    return false;
  }
}

export async function dirExists(uri: vscode.Uri): Promise<boolean> {
  try {
    const stat = await vscode.workspace.fs.stat(uri);
    return stat.type === vscode.FileType.Directory;
  } catch (err) {
    return false;
  }
}

export async function writeFile(
  uri: vscode.Uri,
  data: Uint8Array
): Promise<boolean> {
  try {
    if (!(await dirExists(uri))) {
      await vscode.workspace.fs.createDirectory(
        vscode.Uri.parse(`${FS_SCHEME}:${paths.dirname(uri.path)}`)
      );
    }
    await vscode.workspace.fs.writeFile(uri, data);
    return true;
  } catch (error) {
    return false;
  }
}

export async function deleteFile(uri: vscode.Uri): Promise<boolean> {
  try {
    await vscode.workspace.fs.delete(uri);

    let currentDirUri = vscode.Uri.parse(
      `${FS_SCHEME}:${paths.dirname(uri.path)}`
    );
    let currentDirItems =
      await vscode.workspace.fs.readDirectory(currentDirUri);
    while (currentDirUri.path !== '/' && currentDirItems.length === 0) {
      await vscode.workspace.fs.delete(currentDirUri);
      currentDirUri = vscode.Uri.parse(
        `${FS_SCHEME}:${paths.dirname(currentDirUri.path)}`
      );
      currentDirItems = await vscode.workspace.fs.readDirectory(currentDirUri);
    }
    return true;
  } catch (error) {
    return false;
  }
}

export async function deleteDir(dirPath: vscode.Uri): Promise<void> {
  try {
    if (!(await dirExists(dirPath))) {
      return;
    }
    const files = await vscode.workspace.fs.readDirectory(dirPath);
    for (const [name, type] of files) {
      const filePath = vscode.Uri.joinPath(dirPath, name);
      if (type === vscode.FileType.File) {
        await vscode.workspace.fs.delete(filePath);
      } else if (type === vscode.FileType.Directory) {
        await deleteDir(filePath);
      }
    }
    await vscode.workspace.fs.delete(dirPath);
  } catch (error) {
    logger.error(`deleteDir error: ${error}`);
    throw error;
  }
}
