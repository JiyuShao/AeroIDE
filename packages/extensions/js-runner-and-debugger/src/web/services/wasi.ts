import vscode from 'vscode';
import { registerCommand } from '../utils/commands';
import { coreutils } from '../utils/wasi/coreutils';
import { esbuild } from '../utils/wasi/esbuild';

export async function registerWasi(context: vscode.ExtensionContext) {
  registerCommand(context, 'wasi.command', async () => {
    try {
      const command = await vscode.window.showInputBox({
        value: '-h',
        valueSelection: [0, 2],
        prompt: 'Please input command.',
      });

      const args = command ? command.split(' ') : [];
      if (args.length === 0) {
        throw new Error('Please input wasi command');
      }
      vscode.workspace.saveAll(false);
      if (args[0] === 'esbuild') {
        await esbuild(context, args.slice(1));
      } else {
        await coreutils(context, args);
      }
    } catch (error) {
      vscode.window.showErrorMessage((error as Error).message);
    }
  });
}
