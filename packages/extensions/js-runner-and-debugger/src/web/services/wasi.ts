import vscode from 'vscode';
import { registerCommand } from '../utils/commands';
import { runWasiCommand } from '../utils/wasi';

export async function registerWasi(context: vscode.ExtensionContext) {
  registerCommand(context, 'wasi.command', async () => {
    try {
      const command = await vscode.window.showInputBox({
        value: 'help',
        valueSelection: [0, 4],
        prompt: 'Please input command.',
      });

      const commandArr = command ? command.trim().split(' ') : [];
      vscode.workspace.saveAll(false);
      await runWasiCommand(context, commandArr);
    } catch (error) {
      vscode.window.showErrorMessage((error as Error).message);
    }
  });
}
