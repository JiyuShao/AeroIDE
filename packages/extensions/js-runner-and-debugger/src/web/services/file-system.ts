import * as vscode from 'vscode';
import { MemFS } from '../utils/memfs';
import { executeCommand, registerCommand } from '../utils/commands';
import { FS_SCHEME } from '../config';
import { importFile, exportFile } from '../utils/file';

export async function registerFileSystem(context: vscode.ExtensionContext) {
  const memFs = new MemFS();

  // register a file system provider
  context.subscriptions.push(
    vscode.workspace.registerFileSystemProvider(FS_SCHEME, memFs, {
      isCaseSensitive: true,
    })
  );

  registerCommand(context, `${FS_SCHEME}.importDemoWorkspace`, async () => {
    const folderUri = vscode.Uri.parse(`${FS_SCHEME}:/`);
    await executeCommand(`${FS_SCHEME}.importWorkspace`, {
      isDemo: true,
    });
    await vscode.commands.executeCommand('vscode.openFolder', folderUri, {
      forceReuseWindow: true,
    });
  });

  registerCommand(
    context,
    `${FS_SCHEME}.importWorkspace`,
    async (options?: { isDemo: boolean }) => {
      // 展示信息消息框，含有Yes和No选项
      const userChoice = await vscode.window.showInformationMessage(
        'Importing the workspace will delete all data in the current workspace, continue?',
        'Yes',
        'No'
      );
      if (userChoice !== 'Yes') {
        return;
      }
      const { isDemo = false } = options || {};
      let zipFileContent: Uint8Array | void = undefined;
      if (!isDemo) {
        zipFileContent = await importFile();
      } else {
        zipFileContent = await vscode.workspace.fs.readFile(
          vscode.Uri.joinPath(context.extensionUri, 'assets/demo.zip')
        );
      }
      if (zipFileContent) {
        // reset workspace before run import logic
        await memFs.reset();
        await memFs.importFromZip(zipFileContent);
        vscode.window.showInformationMessage('File imported successfully');
      }
    }
  );

  registerCommand(context, `${FS_SCHEME}.exportWorkspace`, async () => {
    const content = await memFs.exportToZip();
    const path = await exportFile(content, 'memfs.zip');
    if (path) {
      vscode.window.showInformationMessage(`File saved successfully: ${path}`);
    }
  });
}
