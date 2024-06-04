import vscode from 'vscode';
import { requirePseudoTerminal, requireWasiEnv } from './wasi';
import { ansiColor } from '../ansi-color';

const ESBUILD_WASM_WASI_PATH = 'assets/esbuild-wasm-wasi/esbuild.wasm';

export async function esbuild(
  context: vscode.ExtensionContext,
  args: (string | vscode.Uri)[]
) {
  // Load the WASM module.
  const { wasm, fs, module } = await requireWasiEnv(
    context,
    ESBUILD_WASM_WASI_PATH
  );
  // Create a pseudoterminal to provide stdio to the WASM process.
  const { pty } = requirePseudoTerminal(wasm, 'esbuild');
  pty.write(
    new TextEncoder().encode(
      ansiColor(`$ esbuild ${args?.join(' ')}\n\n`, 'green')
    )
  );
  // Create a WASM process.
  const process = await wasm.createProcess('esbuild', module, {
    rootFileSystem: fs,
    stdio: pty.stdio,
    args,
  });
  // Run the process and wait for its result.
  const result = await process.run();
  if (result !== 0) {
    throw new Error(`Process esbuild ended with error: ${result}`);
  }
}

/**
 * Maps a given VS Code URI to an absolute path in the WASM filesystem. Returns undefined if the URI cannot be mapped.
 * @param {vscode.ExtensionContext} context
 * @param {vscode.Uri} uri
 */
export async function toWasm(
  _context: vscode.ExtensionContext,
  uri: vscode.Uri
): Promise<string | undefined> {
  // const { fs } = await requireWasiEnv(context, ESBUILD_WASM_WASI_PATH);
  // const result = fs.toWasm(uri);
  // the official toWasm is not working
  const result = `/workspace${uri.path}`;
  return result;
}
