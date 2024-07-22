import * as vscode from 'vscode';
import { Controller } from '../../../utils/webview/routing/controller';
import { inject } from '../../../utils/webview';
import { ClientManager } from '../clients/client-manager';
import { relative } from '../../../utils/paths';

export class PackageJsonController extends Controller {
  @inject(ClientManager) private clientManager!: ClientManager;

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
    packages: { name: string; version?: string }[];
    dev: boolean;
    packageJSON: string;
  }) {
    const query = data.packages
      .map(item => {
        return item.version ? `${item.name}@${item.version}` : item.name;
      })
      .join(' ');
    const client = await this.clientManager.getClient(data.packageJSON);
    client.install({
      query,
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

  async removePackage(data: { packages: string[]; packageJSON: string }) {
    const client = await this.clientManager.getClient(data.packageJSON);
    client.remove({ packages: data.packages });
    return {};
  }

  async swapPackageType(data: {
    name: string;
    version: string;
    dev: boolean;
    packageJSON: string;
  }) {
    const client = await this.clientManager.getClient(data.packageJSON);
    client.swapType({
      packageName: data.name,
      isDev: data.dev,
      version: data.version,
    });
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
      query: `${data.name}@${data.version}`,
    });

    if (data.originalVersion.startsWith('^')) {
      const uri = vscode.Uri.joinPath(
        vscode.workspace.workspaceFolders![0].uri,
        data.packageJSON
      );
      const content = await vscode.workspace.fs.readFile(uri);
      const packageJson = JSON.parse(new TextDecoder().decode(content));
      if (packageJson.dependencies?.[data.name]) {
        packageJson.dependencies[data.name] = `^${data.version}`;
      }
      if (packageJson.devDependencies?.[data.name]) {
        packageJson.devDependencies[data.name] = `^${data.version}`;
      }
      await vscode.workspace.fs.writeFile(
        uri,
        new TextEncoder().encode(JSON.stringify(packageJson, null, 2))
      );
    }

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
