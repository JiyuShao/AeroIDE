import vscode from 'vscode';
import { requirePseudoTerminal, requireWasiEnv } from './wasi';
import { ansiColor } from '../ansi-color';

export async function coreutils(
  context: vscode.ExtensionContext,
  args: (string | vscode.Uri)[]
) {
  // Load the WASM module.
  const { wasm, fs, module } = await requireWasiEnv(
    context,
    'assets/coreutils/coreutils.async.wasm'
  );
  // Create a pseudoterminal to provide stdio to the WASM process.
  const { pty } = requirePseudoTerminal(wasm, 'coreutils');
  // Create a WASM process.
  pty.write(
    new TextEncoder().encode(ansiColor(`$ ${args?.join(' ')}\n\n`, 'green'))
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
