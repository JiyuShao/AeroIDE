import * as vscode from 'vscode';
import { Container, inject, injectable } from 'inversify';
import { Route } from './route';
import { RouteAction, RouteRequest } from './types';
import { VSCodeContext } from '../app/vs-code-context';
import { Controller } from './controller';

@injectable()
export class Router {
  private routes = [] as Route[];

  constructor(
    private context: VSCodeContext,
    @inject('app') private container: Container
  ) {}

  public get<T extends Controller>(uri: string, action: RouteAction<T>) {
    return this.addRoute('GET', uri, action);
  }

  public post<T extends Controller>(uri: string, action: RouteAction<T>) {
    return this.addRoute('POST', uri, action);
  }

  public patch<T extends Controller>(uri: string, action: RouteAction<T>) {
    return this.addRoute('PATCH', uri, action);
  }

  public put<T extends Controller>(uri: string, action: RouteAction<T>) {
    return this.addRoute('PUT', uri, action);
  }

  public delete<T extends Controller>(uri: string, action: RouteAction<T>) {
    return this.addRoute('DELETE', uri, action);
  }

  private addRoute<T extends Controller>(
    method: string,
    uri: string,
    action: RouteAction<T>
  ) {
    const route = this.createRoute(method, uri, action);
    this.routes.push(route);
    if (!this.container.isBound(route.controller)) {
      this.container.bind(route.controller).toSelf().inSingletonScope();
    }
  }
  private createRoute<T extends Controller>(
    methods: string | string[],
    uri: string,
    [controller, action]: RouteAction<T>
  ) {
    const methodsArray = Array.isArray(methods) ? methods : [methods];
    return new Route({ uri, methods: methodsArray, action, controller });
  }

  public registerWebview(webviewView: vscode.WebviewView) {
    webviewView.webview.onDidReceiveMessage(
      event => {
        this.handle(event, webviewView);
      },
      undefined,
      this.context.subscriptions
    );
  }

  private findRoute(request: RouteRequest) {
    return this.routes.find(item => item.match(request));
  }

  private async handle(
    request: RouteRequest,
    webviewView: vscode.WebviewView
  ): Promise<void> {
    const route = this.findRoute(request);

    if (!route) {
      webviewView.webview.postMessage({
        requestId: request.requestId,
        uri: request.uri,
        method: request.method,
        status: 400,
        payload: {
          message: `Route [${request.uri}] not defined.`,
        },
      });
      return;
    }

    const controller = this.container.get<any>(route.controller);
    const result = await controller[route.action](request.payload);

    if (result !== undefined) {
      webviewView.webview.postMessage({
        requestId: request.requestId,
        uri: request.uri,
        method: request.method,
        payload: result,
      });
    }
  }
}
