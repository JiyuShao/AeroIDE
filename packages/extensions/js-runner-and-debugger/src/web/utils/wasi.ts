import vscode from 'vscode';
import { workspace, ExtensionContext, Uri } from 'vscode';
import { Wasm, RootFileSystem, WasmPseudoterminal } from '@vscode/wasm-wasi';
import { ansiColor } from './ansi-color';

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
let wasiTerminalMap: WasiTerminal | undefined = undefined;
export function requirePseudoTerminal(wasm: Wasm, _name: string): WasiTerminal {
  if (!wasiTerminalMap) {
    const pty = wasm.createPseudoterminal();
    const terminal = vscode.window.createTerminal({
      name: 'wasm-wasi',
      pty,
      isTransient: true,
    });
    terminal.show(true);
    wasiTerminalMap = {
      pty,
      terminal,
    };
  }
  return wasiTerminalMap;
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

export interface RunWasiCommandOptions {
  prerun?: (wasiEnv: WasiEnv, wasiTerminal: WasiTerminal) => void;
  postrun?: (wasiEnv: WasiEnv, wasiTerminal: WasiTerminal) => void;
}

const WASI_COMMAND_MAPPING: Record<string, string> = {
  coreutils: 'assets/coreutils/coreutils.async.wasm',
  esbuild: 'assets/esbuild-wasm-wasi/esbuild.wasm',
};
const WASI_MOCK_COMMAND_RESPONSE: Record<string, string> = {};
WASI_MOCK_COMMAND_RESPONSE['help'] = `
Usage: command [arguments...]
       command --help

Currently defined command:

    base32, base64, basename, cat, cksum, comm, cp, csplit, cut, date, df,
    dircolors, dirname, echo, env, expand, expr, factor, false, fmt, fold,
    hashsum, head, join, link, ln, ls, md5sum, mkdir, mktemp, more, mv, nl,
    od, paste, printenv, printf, ptx, pwd, readlink, realpath, relpath, rm,
    rmdir, seq, sha1sum, sha224sum, sha256sum, sha3-224sum, sha3-256sum,
    sha3-384sum, sha3-512sum, sha384sum, sha3sum, sha512sum, shake128sum,
    shake256sum, shred, shuf, sleep, sort, split, sum, tac, tail, tee, test,
    touch, tr, true, truncate, tsort, unexpand, uniq, wc, yes, esbuild
`;
WASI_MOCK_COMMAND_RESPONSE['-h'] = WASI_MOCK_COMMAND_RESPONSE['help'];

export async function runWasiCommand(
  context: vscode.ExtensionContext,
  args: (string | vscode.Uri)[]
) {
  if (args.length === 0) {
    throw new Error('Please input wasi command');
  }

  // Use coreutils as default command
  let commandName = 'coreutils';
  let commandDisplayName = '';
  let commandArgs = [];
  if (typeof args[0] === 'string' && WASI_COMMAND_MAPPING[args[0]]) {
    commandName = args[0];
  }
  if (commandName === 'coreutils') {
    commandArgs = [...args];
  } else {
    commandDisplayName = commandName;
    commandArgs = [...args.slice(1)];
  }

  // Load the WASM module.
  const { wasm, fs, module } = await requireWasiEnv(
    context,
    WASI_COMMAND_MAPPING[commandName]
  );

  // Create a pseudoterminal to provide stdio to the WASM process.
  const { pty } = requirePseudoTerminal(wasm, commandName);
  // Create a WASM process.
  pty.write(
    new TextEncoder().encode(
      ansiColor(
        `$ ${[commandDisplayName, ...commandArgs]?.join(' ')}\n\n`,
        'green'
      )
    )
  );

  // Handle mock command
  if (
    typeof commandArgs[0] === 'string' &&
    WASI_MOCK_COMMAND_RESPONSE[commandArgs[0]]
  ) {
    pty.write(
      new TextEncoder().encode(
        WASI_MOCK_COMMAND_RESPONSE[commandArgs[0]].trim() + '\n\n'
      )
    );
    return;
  }

  // Run real command
  const process = await wasm.createProcess(commandName, module, {
    rootFileSystem: fs,
    stdio: pty.stdio,
    args: commandArgs,
  });
  // Run the process and wait for its result.
  const result = await process.run();
  if (result !== 0) {
    throw new Error(
      `Process ${commandName} ${commandArgs.join(' ')} ended with error: ${result}`
    );
  }
  pty.write(new TextEncoder().encode('\n\n'));
}
