import vscode from 'vscode';
import { registerCommand } from '../utils/commands';
import { FS_SCHEME } from '../config';
import { runWasiCommand, toWasm } from '../utils/wasi';
import { fileExists } from '../utils/file';

export async function registerJSRunner(context: vscode.ExtensionContext) {
  registerCommand(context, 'runner.test', async () => {
    try {
      const entryFile = vscode.Uri.parse(`${FS_SCHEME}:/file.ts`);
      const outFile = vscode.Uri.parse(`${FS_SCHEME}:/out.js`);
      // Change VS Code file to WASM file
      if (!(await fileExists(entryFile))) {
        throw new Error(`Entry file '${entryFile}' not found!`);
      }
      const wasmEntryFile = await toWasm(context, entryFile);
      const wasmOutFile = await toWasm(context, outFile);
      if (!wasmEntryFile) {
        throw new Error(
          `Map VS Code URI to WASM FS Failed: ${FS_SCHEME}:/file.ts`
        );
      }
      if (!wasmOutFile) {
        throw new Error(
          `Map VS Code URI to WASM FS Failed: ${FS_SCHEME}:/out.js`
        );
      }

      await runWasiCommand(context, [
        'esbuild',
        wasmEntryFile,
        `--outfile=${wasmOutFile}`,
        '--bundle',
        '--loader:.ts=ts',
        '--format=esm',
      ]);
    } catch (error) {
      // Show an error message if something goes wrong.
      vscode.window.showErrorMessage((error as Error).message);
    }
  });
}
