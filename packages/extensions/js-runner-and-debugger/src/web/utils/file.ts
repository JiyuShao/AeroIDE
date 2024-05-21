import vscode from 'vscode';

export async function importFile(): Promise<Uint8Array | void> {
  try {
    // 从网络中实现
    const uris = await vscode.window.showOpenDialog({
      canSelectMany: false,
      canSelectFiles: true,
      canSelectFolders: false,
      openLabel: 'Select File',
      filters: {
        'ZIP File': ['zip'],
      },
      defaultUri: vscode.Uri.file('/'),
    });

    if (!uris || uris.length === 0) {
      return;
    }
    return vscode.workspace.fs.readFile(uris[0]);
  } catch (error) {
    vscode.window.showErrorMessage(`File import failed: ${error}`);
  }
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

export async function blobToUint8Array(blob: Blob): Promise<Uint8Array> {
  const arrayBuffer = await blob.arrayBuffer();
  const uint8Array = new Uint8Array(arrayBuffer);

  return uint8Array;
}

export async function uint8ArraytoBlob(content: Uint8Array): Promise<Blob> {
  return new Blob([content]);
}
