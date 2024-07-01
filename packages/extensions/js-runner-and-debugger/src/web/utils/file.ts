import * as vscode from 'vscode';

export async function importFile(): Promise<vscode.Uri | void> {
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

export async function exportFile(
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
