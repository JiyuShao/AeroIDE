import vscode from 'vscode';
import { workspace, ExtensionContext, Uri } from 'vscode';
import { Wasm, RootFileSystem, WasmPseudoterminal } from '@vscode/wasm-wasi';

export type WasiEnv = {
  wasm: Wasm;
  fs: RootFileSystem;
  module: WebAssembly.Module;
};

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

export function requirePseudoTerminal(
  wasm: Wasm,
  name: string
): WasmPseudoterminal {
  const pty = wasm.createPseudoterminal();
  const terminal = vscode.window.createTerminal({
    name,
    pty,
    isTransient: true,
  });
  terminal.show(true);
  return pty;
}

export async function uriToWasmPath(
  context: ExtensionContext,
  wasmPath: string,
  uri: Uri
): Promise<string> {
  const wasiEnvMap = await requireWasiEnv(context, wasmPath);
  const uriPath = await wasiEnvMap.fs.toWasm(uri);
  if (uriPath === undefined) {
    throw new Error(`uriToWasmPath: ctx.fs.toWasm(${uriPath}) failed!`);
  }
  return uriPath;
}
