// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { logger } from './utils/logger';
import { LOGGER_LEVEL, setExtensionStatus } from './config';
import { registerFileSystem } from './services/file-system';
import { registerWasi } from './services/wasi';
import { registerJSRunner } from './services/js-runner';
import { registerHelloWorld } from './services/hello-world';

logger.setLevel(LOGGER_LEVEL);

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  logger.debug(
    'Congratulations, your extension is now active in the web extension host!'
  );
  const checkWorkspaceFolders = () => {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (workspaceFolders && workspaceFolders.length === 1) {
      setExtensionStatus(true);
      return;
    }
    const errMsg =
      'Oops, Your extension can only be used in a single-root workspace.';
    if (workspaceFolders && workspaceFolders.length > 1) {
      vscode.window.showErrorMessage(errMsg);
    }
    setExtensionStatus(false, errMsg);
    logger.error(errMsg);
  };
  context.subscriptions.push(
    vscode.workspace.onDidChangeWorkspaceFolders(() => {
      checkWorkspaceFolders();
    })
  );
  registerFileSystem(context);
  registerWasi(context);
  registerJSRunner(context);
  registerHelloWorld(context);
}

// This method is called when your extension is deactivated
export function deactivate() {
  logger.debug(
    'Congratulations, Your extension is now deactivate in the web extension host!'
  );
}
