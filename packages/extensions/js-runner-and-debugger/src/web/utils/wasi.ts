import * as vscode from 'vscode';
import { workspace, ExtensionContext, Uri } from 'vscode';
import {
  Wasm,
  RootFileSystem,
  WasmPseudoterminal as OrignalWasmPseudoterminal,
  WasmProcess,
  PseudoterminalState,
} from '@vscode/wasm-wasi';
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

interface WasmPseudoterminal extends OrignalWasmPseudoterminal {
  commandHistory?: {
    current: number;
    history: string[];
  };
}
export interface WasiTerminal {
  pty: WasmPseudoterminal;
  terminal: vscode.Terminal;
}
let wasiTerminal: WasiTerminal | undefined = undefined;
export async function requirePseudoTerminal(
  name = 'wasm-wasi'
): Promise<WasiTerminal> {
  if (!wasiTerminal) {
    const wasm = await Wasm.load();
    const pty = wasm.createPseudoterminal({ history: true });
    const terminal = vscode.window.createTerminal({
      name,
      pty,
      isTransient: true,
    });
    terminal.show(true);
    wasiTerminal = {
      pty,
      terminal,
    };
  }
  return wasiTerminal;
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
type MockCommandFunction = (
  wasiEnv: WasiEnv,
  wasiTerminal: WasiTerminal
) => Promise<void>;
const WASI_MOCK_COMMAND_MAPPING: Record<string, string | MockCommandFunction> =
  {};
WASI_MOCK_COMMAND_MAPPING['help'] = `
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
WASI_MOCK_COMMAND_MAPPING['-h'] = WASI_MOCK_COMMAND_MAPPING['help'];
WASI_MOCK_COMMAND_MAPPING['clear'] = async (
  _wasiEnv: WasiEnv,
  wasiTerminal: WasiTerminal
) => {
  const { pty } = wasiTerminal;
  // \x1bc => Reset terminal
  // \x1b[0J => Clear screen from cursor down
  // \x1b[1J => Clear screen from cursor up
  // \x1b[2J => Clear entire screen
  // \x1b[3J   => Clears scroll back buffer (not documented)
  // \x1b[0;0H => Move cursor to 0,0
  // @ts-expect-error using internal _onDidWrite
  pty._onDidWrite.fire('\x1bc\x1b[0J\x1b[1J\x1b[2J\x1b[3J\x1b[0;0H');
};

WASI_MOCK_COMMAND_MAPPING['history'] = async (
  _wasiEnv: WasiEnv,
  wasiTerminal: WasiTerminal
) => {
  const { pty } = wasiTerminal;
  const history = pty.commandHistory?.history || [];
  const result = history.map((current, index) => {
    if (index === history.length - 1) {
      return '';
    }
    return `${index + 1} ${current}\n`;
  });

  pty.write(new TextEncoder().encode(result?.join('')));
};

// Create process variable to Ctrl-C termite
let wasmProcess: WasmProcess | null = null;
// Only add readline listener to pty once
let isReadlineMode: boolean = false;
export async function runWasiCommand(
  context: vscode.ExtensionContext,
  args: (string | vscode.Uri)[]
) {
  // Create a pseudoterminal to provide stdio to the WASM process.
  const wasiTerminal = await requirePseudoTerminal();
  const { pty } = wasiTerminal;

  const filteredArgs = args
    .map(currentArg => {
      if (typeof currentArg === 'string') {
        return currentArg.replace(/[\n\r]/g, '');
      }
      return currentArg;
    })
    .filter(e => e);

  const lifecycle = {
    postCommandFn() {
      pty.write(new TextEncoder().encode(ansiColor('> ', 'green')));
    },
  };
  if (filteredArgs.length === 0) {
    lifecycle.postCommandFn();
    return;
  }

  // Use coreutils as default command
  let commandName = 'coreutils';
  let commandDisplayName = '';
  let commandArgs = [];
  if (
    typeof filteredArgs[0] === 'string' &&
    WASI_COMMAND_MAPPING[filteredArgs[0]]
  ) {
    commandName = filteredArgs[0];
  }
  if (commandName === 'coreutils') {
    commandArgs = [...filteredArgs];
  } else {
    commandDisplayName = commandName;
    commandArgs = [...filteredArgs.slice(1)];
  }
  const commandDisplay = [commandDisplayName, ...commandArgs]
    .filter(e => e)
    .join(' ');

  // Load the WASM module.
  const wasiEnv = await requireWasiEnv(
    context,
    WASI_COMMAND_MAPPING[commandName]
  );
  const { wasm, fs, module } = wasiEnv;

  const mockCommandValue =
    typeof commandArgs[0] === 'string'
      ? WASI_MOCK_COMMAND_MAPPING[commandArgs[0]]
      : undefined;
  if (mockCommandValue) {
    if (typeof mockCommandValue === 'string') {
      // Handle mock command
      pty.write(
        new TextEncoder().encode((mockCommandValue as string).trim() + '\n')
      );
    } else if (typeof mockCommandValue === 'function') {
      await (mockCommandValue as MockCommandFunction)(wasiEnv, wasiTerminal);
    }
  } else {
    try {
      // Run real command
      wasmProcess = await wasm.createProcess(commandName, module, {
        rootFileSystem: fs,
        stdio: pty.stdio,
        args: commandArgs,
      });
      // Run the process and wait for its result.
      const result = await wasmProcess.run();
      if (result !== 0) {
        pty.write(
          new TextEncoder().encode(
            ansiColor(
              `Process ${commandDisplay} ended with error: ${result}\n`,
              'red'
            )
          )
        );
      }
    } catch (error) {
      pty.write(
        new TextEncoder().encode(
          ansiColor(
            `Process ${commandDisplay} ended with error: ${error}\n`,
            'red'
          )
        )
      );
    }
    wasmProcess = null;
  }
  pty.write(new TextEncoder().encode('\n'));
  lifecycle.postCommandFn();

  if (!isReadlineMode) {
    isReadlineMode = true;
    const orignalHandleInput = pty.handleInput;
    pty.handleInput = function (data: string) {
      if (
        [PseudoterminalState.idle, PseudoterminalState.busy].includes(
          this.getState()
        )
      ) {
        // 处理用户输入的 ASCII 控制字符
        if (data === '\x03') {
          // Ctrl+C
          if (wasmProcess) {
            wasmProcess.terminate();
          }
        } else if (data === '\x0c') {
          // Ctrl+L
          runWasiCommand(context, ['clear']);
        }
      }
      return orignalHandleInput?.apply(this, [data]);
    };
    let nextCommand: string = '';
    while (true) {
      nextCommand = await pty.readline();
      if (nextCommand) {
        await runWasiCommand(
          context,
          nextCommand ? nextCommand.trim().split(' ') : []
        );
      }
    }
  }
}
