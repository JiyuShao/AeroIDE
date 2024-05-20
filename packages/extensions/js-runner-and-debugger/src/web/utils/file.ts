import vscode from 'vscode';

export async function exportFile(data: Uint8Array, defaultFilename: string) {
  try {
    // 询问用户保存文件的位置
    const uri = await vscode.window.showSaveDialog({
      saveLabel: '保存文件',
      filters: {
        'All files': ['*'],
      },
      defaultUri: vscode.Uri.file(defaultFilename),
    });

    if (!uri) {
      // 如果用户取消了操作，直接返回
      return;
    }

    // 写入文件系统
    await vscode.workspace.fs.writeFile(uri, data);

    // 提醒用户文件已下载
    vscode.window.showInformationMessage(`文件已保存到：${uri.fsPath}`);
  } catch (error) {
    vscode.window.showErrorMessage(`保存文件失败: ${error}`);
  }
}

export async function blobToUint8Array(blob: Blob) {
  // 使用 Blob 的 arrayBuffer 方法获取 ArrayBuffer
  const arrayBuffer = await blob.arrayBuffer();

  // 使用 ArrayBuffer 创建 Uint8Array
  const uint8Array = new Uint8Array(arrayBuffer);

  return uint8Array;
}
