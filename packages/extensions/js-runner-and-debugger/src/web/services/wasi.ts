import * as vscode from 'vscode';
import { registerCommand } from '../utils/commands';
import { requirePseudoTerminal, runWasiCommand } from '../utils/wasi';

export async function registerWasi(context: vscode.ExtensionContext) {
  registerCommand(context, 'wasi.openTerminal', async () => {
    vscode.workspace.saveAll(false);
    // Create a pseudoterminal to provide stdio to the WASM process.
    const wasiTerminal = await requirePseudoTerminal();
    await runWasiCommand(context, wasiTerminal, ['help']);
  });
}
