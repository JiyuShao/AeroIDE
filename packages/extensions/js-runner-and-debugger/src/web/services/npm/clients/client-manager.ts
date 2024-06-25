import { inject, injectable } from '../../../utils/webview';
import { Uri, workspace } from 'vscode';
import { NpmClient } from './npm-client';

@injectable()
export class ClientManager {
  @inject(NpmClient) npm!: NpmClient;

  getClient(packageJSON: string) {
    // @ts-expect-error workspaceFolders has value
    const uri = Uri.joinPath(workspace.workspaceFolders[0].uri, packageJSON);
    const client = this.npm;
    return client.cwdFromUri(uri);
  }
}
