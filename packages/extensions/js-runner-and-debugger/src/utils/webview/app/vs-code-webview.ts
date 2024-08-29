import * as vscode from 'vscode';
import { injectable } from 'inversify';

@injectable()
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class VSCodeWebView {}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface VSCodeWebView extends vscode.Webview {}
