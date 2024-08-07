import { inject, injectable } from '../../../utils/webview';
import { Uri, workspace } from 'vscode';
import { NpmClient } from './npm-client';

@injectable()
export class ClientManager {
  @inject(NpmClient) npm!: NpmClient;

  async getClient(packageJSON: string) {
    const uri = Uri.joinPath(workspace.workspaceFolders![0].uri, packageJSON);
    const client = this.npm;
    await client.cwdFromUri(uri);
    return client;
  }
}
