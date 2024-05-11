import vscode from 'vscode';
import helloworld from './helloworld';

type Commands = {
  [key: string]: () => void;
};
// The command has been defined in the package.json file
// Now provide the implementation of the command with registerCommand
// The commandId parameter must match the command field in package.json
const commands: Commands = {
  ...helloworld,
};

export default function registerCommand(context: vscode.ExtensionContext) {
  // Register Commands
  Object.keys(commands).forEach(currentCommand => {
    const disposable = vscode.commands.registerCommand(
      `js-runner-and-debugger.${currentCommand}`,
      commands[currentCommand]
    );
    context.subscriptions.push(disposable);
  });
}
