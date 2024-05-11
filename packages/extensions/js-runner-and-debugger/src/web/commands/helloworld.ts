import vscode from 'vscode';

export default {
  helloWorld: () => {
    // Display a message box to the user
    vscode.window.showInformationMessage(
      'Hello World from JS Runner & Debugger (In-browser) in a web extension host!'
    );
  },
};
