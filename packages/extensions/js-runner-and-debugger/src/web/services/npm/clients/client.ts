import { Uri } from 'vscode';
import { injectable } from '../../../utils/webview';

@injectable()
export abstract class Client {
  abstract cwdFromUri(uri: Uri): this;
  abstract getAllPackages(): Promise<
    {
      name: string;
      version: string;
      isDevDependency: boolean;
    }[]
  >;
  abstract audit(): any;
  abstract install(args: { query: string; isDev?: boolean }): void;
  abstract update(args: { query: string }): void;
  abstract remove(args: { packages: string[] }): void;
  abstract swapType(args: {
    packageName: string;
    isDev?: boolean;
    version?: string;
  }): void;
}
