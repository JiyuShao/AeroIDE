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
    webviewView: vscode.WebviewView
  ) {
    const manifestUri = vscode.Uri.joinPath(
      context.extensionUri,
      'assets/webview/manifest.json'
    );
    const manifestContent = await vscode.workspace.fs.readFile(manifestUri);
    const manifest = JSON.parse(new TextDecoder().decode(manifestContent));

    const indexJS = vscode.Uri.joinPath(
      context.extensionUri,
      'assets/webview',
      manifest['index.html'].file
    );
    const indexCSS = vscode.Uri.joinPath(
      context.extensionUri,
      'assets/webview',
      manifest['index.html'].css[0]
    );
    const [vendorName] = manifest['index.html'].imports;
    const vendorJS = vscode.Uri.joinPath(
      context.extensionUri,
      'assets/webview',
      manifest[vendorName].file
    );

    const index = webviewView.webview.asWebviewUri(indexJS);
    const css = webviewView.webview.asWebviewUri(indexCSS);
    const vendor = webviewView.webview.asWebviewUri(vendorJS);
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <link href="${css}" rel="stylesheet"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
      <script type="module" src="${index}"></script>
      <script type="module" src="${vendor}"></script>
    </body>
    </html>
      `;
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
