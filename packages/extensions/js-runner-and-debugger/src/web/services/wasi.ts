import vscode from 'vscode';
import { registerCommand } from '../utils/commands';
import { coreutils } from '../utils/wasi/coreutils';

export async function registerWasi(context: vscode.ExtensionContext) {
  registerCommand(context, 'wasi.coreutils', async () => {
    try {
      await coreutils(context);
    } catch (error) {
      // Show an error message if something goes wrong.
      vscode.window.showErrorMessage((error as Error).message);
    }
  });
}
