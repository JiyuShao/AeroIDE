import vscode from 'vscode';
import { workspace, ExtensionContext, Uri } from 'vscode';
import { Wasm, RootFileSystem, WasmPseudoterminal } from '@vscode/wasm-wasi';

export interface WasiEnv {
  wasm: Wasm;
  fs: RootFileSystem;
  module: WebAssembly.Module;
}

const wasiEnvMap: Record<string, WasiEnv> = {};

// Load the WASM module.
export async function requireWasiEnv(
  context: ExtensionContext,
  wasmPath: string
): Promise<WasiEnv> {
  if (!wasiEnvMap[wasmPath]) {
    const wasm = await Wasm.load();
    const fs = await wasm.createRootFileSystem([{ kind: 'workspaceFolder' }]);
    const bits = await workspace.fs.readFile(
      Uri.joinPath(context.extensionUri, wasmPath)
    );
    const module = await WebAssembly.compile(bits);
    wasiEnvMap[wasmPath] = { wasm, fs, module };
  }
  return wasiEnvMap[wasmPath];
}

export interface WasiTerminal {
  pty: WasmPseudoterminal;
  terminal: vscode.Terminal;
}
const wasiTerminalMap: Record<string, WasiTerminal> = {};
export function requirePseudoTerminal(wasm: Wasm, name: string): WasiTerminal {
  if (!wasiTerminalMap[name]) {
    const pty = wasm.createPseudoterminal();
    const terminal = vscode.window.createTerminal({
      name,
      pty,
      isTransient: true,
    });
    terminal.show(true);
    wasiTerminalMap[name] = {
      pty,
      terminal,
    };
  }
  return wasiTerminalMap[name];
}
