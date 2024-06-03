import vscode from 'vscode';
import { fileExists } from '../file';
import { requirePseudoTerminal, requireWasiEnv } from './wasi';
import { FS_SCHEME } from '../../config';

export async function esbuild(
  context: vscode.ExtensionContext,
  entryFile: vscode.Uri,
  outFile: vscode.Uri
) {
  vscode.workspace.saveAll(false);
  // Load the WASM module.
  const { wasm, fs, module } = await requireWasiEnv(
    context,
    'assets/esbuild-wasm-wasi/esbuild.wasm'
  );
  if (!(await fileExists(entryFile))) {
    throw new Error(`Entry file '${entryFile}' not found!`);
  }

  const wasmEntryFile = await fs.toWasm(entryFile);
  const wasmOutFile = await fs.toWasm(outFile);

  if (!wasmEntryFile) {
    throw new Error(`Map VS Code URI to WASM FS Failed: ${FS_SCHEME}:/file.ts`);
  }
  if (!wasmOutFile) {
    throw new Error(`Map VS Code URI to WASM FS Failed: ${FS_SCHEME}:/file.ts`);
  }
  // Create a pseudoterminal to provide stdio to the WASM process.
  const { pty } = requirePseudoTerminal(wasm, 'esbuild');
  // Create a WASM process.
  const process = await wasm.createProcess('esbuild', module, {
    rootFileSystem: fs,
    stdio: pty.stdio,
    args: [
      wasmEntryFile,
      `--outfile=${wasmOutFile}`,
      '--bundle',
      // '--loader=ts',
      '--format=esm',
    ],
  });
  // Run the process and wait for its result.
  const result = await process.run();
  if (result !== 0) {
    throw new Error(`Process esbuild ended with error: ${result}`);
  }
}
