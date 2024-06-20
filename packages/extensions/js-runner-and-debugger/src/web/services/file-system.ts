import * as vscode from 'vscode';
import { MemFS } from '../utils/memfs';
import { executeCommand, registerCommand } from '../utils/commands';
import { FS_SCHEME } from '../config';
import { importFile } from '../utils/file';
import { logger } from '../utils/logger';

export async function registerFileSystem(context: vscode.ExtensionContext) {
  // init memFs
  const memFs = new MemFS(context);

  // register a file system provider
  context.subscriptions.push(
    vscode.workspace.registerFileSystemProvider(FS_SCHEME, memFs, {
      isCaseSensitive: true,
    })
  );

  // open memfs root folder
  const workspaceFolders = vscode.workspace.workspaceFolders || [];
  const validFlag =
    workspaceFolders &&
    workspaceFolders.length === 1 &&
    workspaceFolders[0].uri.scheme === FS_SCHEME &&
    workspaceFolders[0].uri.fsPath === '/';

  if (!validFlag) {
    logger.error(`Only allow single-folder ${FS_SCHEME} workspace`);
    await vscode.commands.executeCommand(
      'vscode.openFolder',
      vscode.Uri.parse(`${FS_SCHEME}:/`),
      {
        forceReuseWindow: true,
      }
    );
  }

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
      await memFs.importFromZip(finalUri);
      // open single-folder workspace
      await vscode.commands.executeCommand(
        'vscode.openFolder',
        vscode.Uri.parse(`${FS_SCHEME}:/`),
        {
          forceReuseWindow: true,
        }
      );
      vscode.window.showInformationMessage('File imported successfully');
    }
  );

  registerCommand(context, `${FS_SCHEME}.exportWorkspace`, async () => {
    await memFs.exportToZip();
  });
}
