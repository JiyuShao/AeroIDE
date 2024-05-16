import vscode from 'vscode';
import { registerCommand } from '../utils/commands';

export function registerHelloWorld(context: vscode.ExtensionContext) {
  registerCommand(context, 'helloWorld', () => {
    // Display a message box to the user
    vscode.window.showInformationMessage(
      'Hello World from JS Runner & Debugger (In-browser) in a web extension host!'
    );
  });
}
