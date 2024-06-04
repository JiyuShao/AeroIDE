import vscode from 'vscode';
import { EXTENSION_NAME, getExtentionStatus } from '../config';
import { logger } from './logger';

type Commands = {
  [key: string]: () => void;
};

type CommandCallback = (...args: any[]) => any;

// The command has been defined in the package.json file
// Now provide the implementation of the command with registerCommand
// The commandId parameter must match the command field in package.json
const commands: Commands = {};

export function registerCommand(
  context: vscode.ExtensionContext,
  command: string,
  callback: CommandCallback
) {
  const newCallback: CommandCallback = (...args) => {
    try {
      const extentionStatus = getExtentionStatus();
      if (!extentionStatus.isEnabled) {
        throw new Error(extentionStatus.errMsg);
      }
      return callback(...args);
    } catch (error) {
      logger.error(`Run ${command} failed: `, error);
      vscode.window.showErrorMessage(
        `Run ${command} failed: ${(error as Error).message}`
      );
    }
  };
  commands[command] = newCallback;
  const disposable = vscode.commands.registerCommand(
    `${EXTENSION_NAME}.${command}`,
    newCallback
  );
  context.subscriptions.push(disposable);
}

export function executeCommand(command: string) {
  vscode.commands.executeCommand(`${EXTENSION_NAME}.${command}`);
}
