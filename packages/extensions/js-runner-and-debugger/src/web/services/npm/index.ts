import * as vscode from 'vscode';
import 'reflect-metadata';
import { bootstrap as webviewBootstrap } from '../../utils/webview/app/bootstrap';
import { Bus } from '../../utils/webview/bus/bus';
import routes from './routes';
import { ClientManager } from './clients/client-manager';
import { NpmClient } from './clients/npm-client';
import { WebviewProviderEvents } from '../../utils/webview/webview/webview-provider';

export async function registerNpm(context: vscode.ExtensionContext) {
  const app = webviewBootstrap({
    context,
    viewId: 'js-runner-and-debugger.npm',
    initCallback: app => {
      app.bind(NpmClient).toSelf();
      app.bind(ClientManager).toSelf();
      routes(app);
    },
  });

  app
    .get(Bus)
    .on(WebviewProviderEvents.registered, (webviewView: vscode.WebviewView) => {
      if (vscode.workspace.workspaceFolders) {
        const watcher =
          vscode.workspace.createFileSystemWatcher('/package.json');
        const notify = () =>
          webviewView.webview.postMessage({ type: 'PACKAGE_JSON_UPDATED' });
        watcher.onDidChange(notify);
        watcher.onDidDelete(notify);
        watcher.onDidCreate(notify);
        context.subscriptions.push(watcher);
      }

      vscode.workspace.onDidChangeConfiguration(() => {
        webviewView.webview.postMessage({ type: 'CONFIG_UPDATED' });
      });
    });
}
