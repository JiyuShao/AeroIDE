import * as vscode from 'vscode';
import { MemFS } from '../utils/memfs';
import { executeCommand, registerCommand } from '../utils/commands';
import { FS_SCHEME } from '../config';
import { importFile } from '../utils/file';

export async function registerFileSystem(context: vscode.ExtensionContext) {
  // init memFs
  const workspaceFolders = vscode.workspace.workspaceFolders || [];
  const matchedFolder = workspaceFolders.find(
    folder => folder.uri.scheme === FS_SCHEME
  );
  const memFs = new MemFS(
    matchedFolder ? matchedFolder.uri : vscode.Uri.parse(`${FS_SCHEME}:/`)
  );

  // register a file system provider
  context.subscriptions.push(
    vscode.workspace.registerFileSystemProvider(FS_SCHEME, memFs, {
      isCaseSensitive: true,
    })
  );

  registerCommand(context, `${FS_SCHEME}.importDemoWorkspace`, async () => {
    await executeCommand(`${FS_SCHEME}.importWorkspace`, {
      uri: vscode.Uri.joinPath(context.extensionUri, 'assets/demo.zip'),
    });
  });

  registerCommand(
    context,
    `${FS_SCHEME}.importWorkspace`,
    async (options?: { uri: vscode.Uri }) => {
      // 展示信息消息框，含有Yes和No选项
      const userChoice = await vscode.window.showInformationMessage(
        'Importing the workspace will delete all data in the current workspace, continue?',
        'Yes',
        'No'
      );
      if (userChoice !== 'Yes') {
        return;
      }
      const { uri } = options || {};
      const finalUri: vscode.Uri | void = uri || (await importFile());
      if (!finalUri) {
        return;
      }
      // reset workspace before run import logic
      await memFs.reset();
      // import and folder to memfs(persistence)
      const newUri = await memFs.importFromZip(finalUri);
      if (newUri) {
        // open single-folder workspace
        await vscode.commands.executeCommand('vscode.openFolder', newUri, {
          forceReuseWindow: true,
        });
        vscode.window.showInformationMessage('File imported successfully');
      }
    }
  );

  registerCommand(context, `${FS_SCHEME}.exportWorkspace`, async () => {
    await memFs.exportToZip();
  });
}
