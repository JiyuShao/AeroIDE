import vscode from 'vscode';
import { requirePseudoTerminal, requireWasiEnv } from './wasi';
import { ansiColor } from '../ansi-color';

export async function coreutils(context: vscode.ExtensionContext) {
  const command = await vscode.window.showInputBox({
    value: '-h',
    valueSelection: [0, 2],
    prompt: 'Please input wasi.coreutils command.',
  });
  vscode.workspace.saveAll(false);
  // Load the WASM module.
  const { wasm, fs, module } = await requireWasiEnv(
    context,
    'assets/coreutils/coreutils.async.wasm'
  );
  // Create a pseudoterminal to provide stdio to the WASM process.
  const { pty } = requirePseudoTerminal(wasm, 'coreutils');
  const args = command ? command.split(' ') : [];
  // Create a WASM process.
  pty.write(
    new TextEncoder().encode(
      ansiColor(`$ coreutils ${args.join(' ')}\n\n`, 'green')
    )
  );
  const process = await wasm.createProcess('coreutils', module, {
    rootFileSystem: fs,
    stdio: pty.stdio,
    args,
  });
  // Run the process and wait for its result.
  const result = await process.run();
  if (result !== 0) {
    throw new Error(`Process coreutils ended with error: ${result}`);
  }
}
