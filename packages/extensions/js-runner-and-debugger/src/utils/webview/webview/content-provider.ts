import * as vscode from 'vscode';
import { isProduction } from '../../../config';

export default class ContentProvider {
  async getDevServerContent(
    _context: vscode.ExtensionContext,
    _webviewView: vscode.WebviewView
  ) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <link rel="icon" type="image/svg+xml" href="/vite.svg" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>NPM Webview</title>
      <script type="module" src="http://localhost:3000/@vite/client"></script>
      <script type="module" src="http://localhost:3000/src/main.ts"></script>
    </head>
    <body>
      <div id="app">NPM Webview</div>
    </body>
    </html>
    `;
  }

  async getProductionContent(
    context: vscode.ExtensionContext,
    webviewView: vscode.WebviewView
  ) {
    const manifestJsonUri = vscode.Uri.joinPath(
      context.extensionUri,
      'assets/webview/.vite/manifest.json'
    );
    const manifestJson = JSON.parse(
      new TextDecoder().decode(
        await vscode.workspace.fs.readFile(manifestJsonUri)
      )
    );
    const scriptUri = webviewView.webview.asWebviewUri(
      vscode.Uri.joinPath(
        context.extensionUri,
        `assets/webview/${manifestJson['index.html'].file}`
      )
    );
    const styleUri = webviewView.webview.asWebviewUri(
      vscode.Uri.joinPath(
        context.extensionUri,
        `assets/webview/${manifestJson['index.html'].css[0]}`
      )
    );
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <link rel="icon" type="image/svg+xml" href="/vite.svg" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>NPM Webview</title>
      <script type="module" src="${scriptUri}"></script>
      <link rel="stylesheet" crossorigin href="${styleUri}">
    </head>
    <body>
      <div id="app">NPM Webview</div>
    </body>
    </html>
    `;
  }

  async getContent(
    context: vscode.ExtensionContext,
    webviewView: vscode.WebviewView
  ) {
    if (!isProduction) {
      return this.getDevServerContent(context, webviewView);
    }
    return this.getProductionContent(context, webviewView);
  }
}
