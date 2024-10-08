import * as vscode from 'vscode';
import 'reflect-metadata';
import { Container } from 'inversify';
import { bootstrap as webviewBootstrap } from '../../utils/webview/app/bootstrap';
import { Bus } from '../../utils/webview/bus/bus';
import routes from './routes';
import { ClientManager } from './clients/client-manager';
import { NpmClient } from './clients/npm-client';
import { WebviewProviderEvents } from '../../utils/webview/webview/webview-provider';
import { PackageJsonController } from './controllers/package-json-controller';
import { logger } from '../../utils/logger';

export async function registerNpm(context: vscode.ExtensionContext) {
  const app = webviewBootstrap({
    context,
    viewId: 'js-runner-and-debugger.npm',
    initCallback: app => {
      app.bind(NpmClient).toSelf();
      app.bind(ClientManager).toSelf();
      routes(app);
      initNpmProject(app);
    },
  });
  function initNpmProject(app: Container) {
    const packageJsonController = app.get(PackageJsonController);
    packageJsonController.getPackageJSONFiles().then(([packageJsonFile]) => {
      if (!packageJsonFile) {
        logger.error('PackageJsonController packageJsonFile not found');
        return;
      }
      packageJsonController.init({ packageJSON: packageJsonFile });
    });
  }

  let webviewView: vscode.WebviewView | null = null;
  app
    .get(Bus)
    .on(WebviewProviderEvents.registered, (webview: vscode.WebviewView) => {
      webviewView = webview;
    });

  if (vscode.workspace.workspaceFolders) {
    const watcher = vscode.workspace.createFileSystemWatcher('/package.json');
    const notify = () => {
      webviewView?.webview.postMessage({ type: 'PACKAGE_JSON_UPDATED' });
      initNpmProject(app);
    };
    watcher.onDidChange(notify);
    watcher.onDidDelete(notify);
    watcher.onDidCreate(notify);
    context.subscriptions.push(watcher);
  }

  vscode.workspace.onDidChangeConfiguration(() => {
    webviewView?.webview.postMessage({ type: 'CONFIG_UPDATED' });
  });
}
