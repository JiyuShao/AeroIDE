import * as vscode from 'vscode';
import { injectable } from 'inversify';

@injectable()
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class VSCodeContext {}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface VSCodeContext extends vscode.ExtensionContext {}
