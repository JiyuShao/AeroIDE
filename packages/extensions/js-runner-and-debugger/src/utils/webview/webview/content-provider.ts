import * as vscode from 'vscode';
import { isProduction } from '../../../config';

export default class ContentProvider {
  async getDevServerContent(
    _context: vscode.ExtensionContext,
    webviewView: vscode.WebviewView
  ) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <script type="module" src="http://localhost:3000/@vite/client"></script>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body data-view="${webviewView.viewType}">
      <div id="app"></div>
      <script type="module" src="http://localhost:3000/src/main.ts"></script>
    </body>
    </html>
      `;
  }

  async getProductionContent(
    context: vscode.ExtensionContext,
    _webviewView: vscode.WebviewView
  ) {
    const webviewHtmlUri = vscode.Uri.joinPath(
      context.extensionUri,
      'assets/webview/index.html'
    );
    const webviewHtmlContent =
      await vscode.workspace.fs.readFile(webviewHtmlUri);
    return new TextDecoder().decode(webviewHtmlContent);
  }

  async getContent(
    context: vscode.ExtensionContext,
    webviewView: vscode.WebviewView
  ) {
    if (isProduction) {
      return this.getProductionContent(context, webviewView);
    }
    return this.getDevServerContent(context, webviewView);
  }
}
