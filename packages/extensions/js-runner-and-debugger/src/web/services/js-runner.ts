import vscode from 'vscode';
import { registerCommand } from '../utils/commands';
import { requirePseudoTerminal, requireWasiEnv } from '../utils/wasi';

export async function registerJSRunner(context: vscode.ExtensionContext) {
  registerCommand(context, 'runner.test', async () => {
    try {
      // Load the WASM module.
      const { wasm, fs, module } = await requireWasiEnv(
        context,
        'src/web/wasi_example_main.wasm'
      );
      // Create a pseudoterminal to provide stdio to the WASM process.
      const pty = requirePseudoTerminal(wasm, 'Run JS Compiler');
      // Create a WASM process.
      const process = await wasm.createProcess('run-js-compiler', module, {
        rootFileSystem: fs,
        stdio: pty.stdio,
        args: ['arg1', 'arg2'],
      });
      // Run the process and wait for its result.
      const result = await process.run();
      if (result !== 0) {
        vscode.window.showErrorMessage(
          `Process hello ended with error: ${result}`
        );
      }
    } catch (error) {
      // Show an error message if something goes wrong.
      vscode.window.showErrorMessage((error as Error).message);
    }
  });
}
