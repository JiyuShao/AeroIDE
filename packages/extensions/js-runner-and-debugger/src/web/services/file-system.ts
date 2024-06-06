import * as vscode from 'vscode';
import { MemFS } from '../utils/memfs';
import { registerCommand } from '../utils/commands';
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

  const resetCallback = () => {
    for (const [name] of memFs.readDirectory(
      vscode.Uri.parse(`${FS_SCHEME}:/`)
    )) {
      memFs.delete(vscode.Uri.parse(`${FS_SCHEME}:/${name}`));
    }
  };

  registerCommand(context, `${FS_SCHEME}.initDemoWorkspace`, async () => {
    try {
      resetCallback();
      memFs.writeFile(
        vscode.Uri.parse(`${FS_SCHEME}:/index.ts`),
        new TextEncoder().encode('console.log("/index.ts")'),
        { create: true, overwrite: true }
      );
      memFs.createDirectory(vscode.Uri.parse(`${FS_SCHEME}:/folder/`));
      memFs.writeFile(
        vscode.Uri.parse(`${FS_SCHEME}:/folder/index.ts`),
        new TextEncoder().encode('console.log("/folder/index.ts")'),
        { create: true, overwrite: true }
      );
      const folderUri = vscode.Uri.parse(`${FS_SCHEME}:/`);
      if (
        typeof vscode.workspace.getWorkspaceFolder(folderUri) === 'undefined'
      ) {
        await vscode.commands.executeCommand('vscode.openFolder', folderUri, {
          forceReuseWindow: true,
        });
      }
    } catch (error) {
      vscode.window.showErrorMessage(`Failed to open folder: ${error}`);
    }
  });
  registerCommand(context, `${FS_SCHEME}.reset`, resetCallback);

  registerCommand(context, `${FS_SCHEME}.importWorkspace`, async () => {
    try {
      // 展示信息消息框，含有Yes和No选项
      const userChoice = await vscode.window.showInformationMessage(
        'Importing the workspace will delete all data in the current workspace, continue?',
        'Yes',
        'No'
      );
      if (userChoice !== 'Yes') {
        return;
      }
      const file = await importFile();
      if (file) {
        // reset workspace before run import logic
        resetCallback();
        await memFs.importFromZip(file);
        vscode.window.showInformationMessage('File imported successfully');
      }
    } catch (error) {
      vscode.window.showErrorMessage(`File imported failed: ${error}`);
    }
  });

  registerCommand(context, `${FS_SCHEME}.exportWorkspace`, async () => {
    try {
      const content = await memFs.exportToZip();
      const path = await exportFile(content, 'memfs.zip');
      if (path) {
        vscode.window.showInformationMessage(
          `File saved successfully: ${path}`
        );
      }
    } catch (error) {
      vscode.window.showErrorMessage(`File saved failed: ${error}`);
    }
  });
}
