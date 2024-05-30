// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { logger } from './utils/logger';
import { LOGGER_LEVEL } from './config';
import { registerFileSystem } from './services/file-system';
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

  registerFileSystem(context);
  registerJSRunner(context);
  registerHelloWorld(context);
}

// This method is called when your extension is deactivated
export function deactivate() {
  logger.debug(
    'Congratulations, Your extension is now deactivate in the web extension host!'
  );
}
