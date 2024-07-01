import * as vscode from 'vscode';
import 'reflect-metadata';
import { bootstrap } from '../../utils/webview/app/bootstrap';
import { Bus } from '../../utils/webview/bus/bus';
import routes from './routes';
import { ClientManager } from './clients/client-manager';
import { NpmClient } from './clients/npm-client';
import { WebviewProviderEvents } from '../../utils/webview/webview/webview-provider';
import { AddDependencyCommand } from './commands/add-dependency-command';

export async function registerNpm(context: vscode.ExtensionContext) {
  const app = bootstrap({
    context,
    routes,
    viewId: 'js-runner-and-debugger.npm',
  });

  app.bind(NpmClient).toSelf();
  app.bind(ClientManager).toSelf();
  app.bind(AddDependencyCommand).toSelf();
  app.resolve(AddDependencyCommand);

  app
    .get(Bus)
    .on(WebviewProviderEvents.registered, (webviewView: vscode.WebviewView) => {
      if (vscode.workspace.workspaceFolders) {
        const watcher =
          vscode.workspace.createFileSystemWatcher('**/package.json');
        const notify = () =>
          webviewView.webview.postMessage({ type: 'PACKAGE_JSON_UPDATED' });
        watcher.onDidChange(notify);
        watcher.onDidDelete(notify);
        watcher.onDidCreate(notify);
        context.subscriptions.push(watcher);
      }

      if (vscode.workspace.workspaceFolders) {
        // let watcher = vscode.workspace.createFileSystemWatcher(
        //   "**/.unimportedrc.json"
        // );
        // const notify = () =>
        //   webviewView.webview.postMessage({ type: "UNIMPORTEDRC_UPDATED" });
        // watcher.onDidChange(notify);
        // watcher.onDidDelete(notify);
        // watcher.onDidCreate(notify);
        // context.subscriptions.push(watcher);
      }

      vscode.workspace.onDidChangeConfiguration(() => {
        webviewView.webview.postMessage({ type: 'CONFIG_UPDATED' });
      });
    });
}
