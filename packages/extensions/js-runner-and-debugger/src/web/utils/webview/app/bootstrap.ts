import * as vscode from 'vscode';
import { Bus } from '../bus/bus';
import { Router } from '../routing/router';
import {
  WebviewProvider,
  WebviewProviderEvents,
} from '../webview/webview-provider';
import app from './app';
import { VSCodeContext } from './vs-code-context';
import { VSCodeWebView } from './vs-code-webview';

export function bootstrap(props: {
  viewId: string | string[];
  context: vscode.ExtensionContext;
  routes: (router: Router) => void;
}) {
  const { routes, context, viewId } = props;

  app.bind('app').toConstantValue(app);
  app.bind(VSCodeContext).toConstantValue(context);
  app.bind(Bus).toConstantValue(new Bus());
  app.bind(Router).toSelf().inSingletonScope();
  app.bind(WebviewProvider).toSelf().inSingletonScope();

  // Watch for webview registration event
  app
    .get(Bus)
    .on(WebviewProviderEvents.registered, (webviewView: vscode.WebviewView) => {
      // Attach router to webview
      app.get(Router).registerWebview(webviewView);
      app.bind(VSCodeWebView).toConstantValue(webviewView.webview);
      routes(app.get(Router));
    });

  // Init webview loading
  const ids = Array.isArray(viewId) ? viewId : [viewId];
  ids.forEach(id => {
    const webviewSub = vscode.window.registerWebviewViewProvider(
      id,
      app.get(WebviewProvider),
      {
        webviewOptions: {
          retainContextWhenHidden: true,
        },
      }
    );
    context.subscriptions.push(webviewSub);
  });

  return app;
}
