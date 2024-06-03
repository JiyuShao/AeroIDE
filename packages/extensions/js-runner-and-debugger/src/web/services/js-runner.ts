import vscode from 'vscode';
import { registerCommand } from '../utils/commands';
import { FS_SCHEME } from '../config';
import { esbuild } from '../utils/wasi/esbuild';

export async function registerJSRunner(context: vscode.ExtensionContext) {
  registerCommand(context, 'runner.test', async () => {
    try {
      await esbuild(
        context,
        vscode.Uri.parse(`${FS_SCHEME}:/file.ts`),
        vscode.Uri.parse(`${FS_SCHEME}:/out.js`)
      );
    } catch (error) {
      // Show an error message if something goes wrong.
      vscode.window.showErrorMessage((error as Error).message);
    }
  });
}
