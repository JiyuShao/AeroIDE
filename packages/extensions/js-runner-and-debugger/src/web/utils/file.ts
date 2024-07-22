import * as vscode from 'vscode';

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
    return (await vscode.workspace.fs.stat(uri)).type === vscode.FileType.File;
  } catch (err) {
    return false;
  }
}

export async function dirExists(uri: vscode.Uri): Promise<boolean> {
  try {
    return (
      (await vscode.workspace.fs.stat(uri)).type === vscode.FileType.Directory
    );
  } catch (err) {
    return false;
  }
}

export async function writeFile(
  uri: vscode.Uri,
  data: Uint8Array
): Promise<boolean> {
  try {
    if (!dirExists(uri)) {
      await vscode.workspace.fs.createDirectory(uri);
    }
    await vscode.workspace.fs.writeFile(uri, data);
    return true;
  } catch (error) {
    return false;
  }
}
