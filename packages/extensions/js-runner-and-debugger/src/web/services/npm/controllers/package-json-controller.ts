import * as vscode from 'vscode';
import { Controller } from '../../../utils/webview/routing/controller';
import { inject } from '../../../utils/webview';
import { ClientManager } from '../clients/client-manager';
import { relative } from '../../../utils/paths';

export class PackageJsonController extends Controller {
  @inject(ClientManager) private clientManager!: ClientManager;

  async init(data: { packageJSON: string }) {
    const client = await this.clientManager.getClient(data.packageJSON);
    return client.init();
  }

  async getPackageJSONFiles() {
    const packages = await vscode.workspace.findFiles(
      '**/package.json',
      '**/node_modules/**'
    );
    return packages.map(item =>
      relative(vscode.workspace.workspaceFolders![0].uri.fsPath, item.fsPath)
    );
  }

  async getInstalledPackages(data: { packageJSON: string }) {
    const client = await this.clientManager.getClient(data.packageJSON);
    return client.getAllPackages();
  }

  async installPackages(data: {
    packages: { name: string; version: string }[];
    dev: boolean;
    packageJSON: string;
  }) {
    const client = await this.clientManager.getClient(data.packageJSON);
    client.install({
      packages: data.packages,
      isDev: data.dev,
    });
    return {};
  }

  async updatePackages(data: {
    packages: { name: string; maxSatisfyingVersion: string }[];
    packageJSON: string;
  }) {
    const query = data.packages
      .map(item => {
        if (item.maxSatisfyingVersion) {
          return `${item.name}@${item.maxSatisfyingVersion}`;
        }
        return item.name;
      })
      .join(' ');
    const client = await this.clientManager.getClient(data.packageJSON);
    client.update({ query });
    return {};
  }

  async removePackages(data: { packages: string[]; packageJSON: string }) {
    const client = await this.clientManager.getClient(data.packageJSON);
    client.remove({ packages: data.packages });
    return {};
  }

  async changeVersion(data: {
    name: string;
    version: string;
    originalVersion: string;
    packageJSON: string;
  }) {
    const client = await this.clientManager.getClient(data.packageJSON);
    client.install({
      packages: [
        {
          name: data.name,
          version: data.version,
        },
      ],
    });
    return {};
  }

  async showUpdateConfirmation() {
    return await vscode.window.showInformationMessage(
      'You are about to update all packages to their latest versions based on the specified ranges. Are you sure you want to continue?',
      {
        modal: true,
      },
      'Update all'
    );
  }
}
