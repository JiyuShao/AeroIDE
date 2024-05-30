import vscode from 'vscode';
import { Wasm } from '@vscode/wasm-wasi';
import { registerCommand } from '../utils/commands';
// import { test } from '../utils/esbuild';

export async function registerJSRunner(context: vscode.ExtensionContext) {
  const wasm: Wasm = await Wasm.load();
  registerCommand(context, 'runner.test', async () => {
    // Create a pseudoterminal to provide stdio to the WASM process.
    const pty = wasm.createPseudoterminal();
    const terminal = vscode.window.createTerminal({
      name: 'Run C Example',
      pty,
      isTransient: true,
    });
    terminal.show(true);

    try {
      // Load the WASM module. It is stored alongside the extension's JS code.
      // So we can use VS Code's file system API to load it. Makes it
      // independent of whether the code runs in the desktop or the web.
      const bits = await vscode.workspace.fs.readFile(
        vscode.Uri.joinPath(context.extensionUri, 'src/web/hello.wasm')
      );
      const module = await WebAssembly.compile(bits);
      // Create a WASM process.
      const process = await wasm.createProcess('hello', module, {
        stdio: pty.stdio,
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
