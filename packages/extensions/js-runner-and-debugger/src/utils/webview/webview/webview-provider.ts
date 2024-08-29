import * as vscode from 'vscode';
import { inject, injectable } from 'inversify';
import ContentProvider from './content-provider';
import { Bus } from '../bus/bus';
import { VSCodeContext } from '../app/vs-code-context';

export enum WebviewProviderEvents {
  registered = 'WEBVIEW_PROVIDER_registered',
}

@injectable()
export class WebviewProvider implements vscode.WebviewViewProvider {
  public view?: vscode.WebviewView;

  constructor(
    @inject(VSCodeContext) private context: VSCodeContext,
    @inject(Bus) private bus: Bus
  ) {}

  public async resolveWebviewView(
    webviewView: vscode.WebviewView,
    _context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ) {
    const contentProvider = new ContentProvider();
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this.context.extensionUri],
    };
    webviewView.webview.html = await contentProvider.getContent(
      this.context,
      webviewView
    );
    this.bus.emit(WebviewProviderEvents.registered, webviewView);
  }
}
