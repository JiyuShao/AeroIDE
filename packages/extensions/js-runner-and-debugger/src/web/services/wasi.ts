import vscode from 'vscode';
import { registerCommand } from '../utils/commands';
import { runWasiCommand } from '../utils/wasi';

export async function registerWasi(context: vscode.ExtensionContext) {
  registerCommand(context, 'wasi.openTerminal', async () => {
    vscode.workspace.saveAll(false);
    await runWasiCommand(context, ['help']);
  });
}
