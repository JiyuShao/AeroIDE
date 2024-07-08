import * as vscode from 'vscode';
import { Client } from './client';
import { injectable } from '../../../utils/webview';
import { FS_SCHEME } from '../../../config';
// import { dirname } from '../../../utils/paths';

@injectable()
export class NpmClient extends Client {
  #uri!: vscode.Uri;
  // #cwd!: string;
  cwdFromUri(uri: vscode.Uri) {
    this.#uri = uri;
    // this.#cwd = dirname(uri.fsPath);
    return this;
  }
  audit() {
    return null;
    // const { stdout } = spawn.sync("npm", ["audit", "--json"], {
    //   cwd: this.#cwd,
    //   windowsHide: true,
    //   shell: false
    // });
    // console.log(JSON.parse(stdout.toString()));
    // return JSON.parse(stdout.toString());
  }
  async getAllPackages() {
    const uri = vscode.Uri.parse(`${FS_SCHEME}:${this.#uri.fsPath}`);
    const content = await vscode.workspace.fs.readFile(uri);
    const json = JSON.parse(new TextDecoder().decode(content));
    const allDependencies = {
      ...(json.dependencies || {}),
      ...(json.devDependencies || {}),
    };
    const devDependencies = Object.keys(json.devDependencies || {});
    return Object.entries(allDependencies).reduce<
      {
        name: string;
        version: string;
        isDevDependency: boolean;
      }[]
    >((all, [name, version]) => {
      const isDevDependency = devDependencies.includes(name);
      return all.concat({ name, version: version as string, isDevDependency });
    }, []);
  }
  install({ isDev, query }: { isDev?: boolean; query: string }) {
    const args = ['install', ...query.split(' ')];
    if (isDev) {
      args.push('--save-dev');
    }
    // spawn.sync('npm', args, {
    //   stdio: 'inherit',
    //   cwd: this.#cwd,
    //   windowsHide: true,
    //   shell: false,
    // });
  }
  update(_options: { query: string }) {
    // const args = ['update', ...query.split(' ')];
    // spawn.sync('npm', args, {
    //   stdio: 'inherit',
    //   cwd: this.#cwd,
    //   windowsHide: true,
    //   shell: false,
    // });
  }
  remove(_options: { packages: string[] }) {
    // spawn.sync('npm', ['remove', ...packages], {
    //   stdio: 'inherit',
    //   cwd: this.#cwd,
    //   windowsHide: true,
    //   shell: false,
    // });
  }
  swapType(_args: { packageName: string; isDev?: boolean; version?: string }) {
    // spawn.sync(
    //   'npm',
    //   [
    //     'install',
    //     `${args.packageName}@${args.version}`,
    //     args.isDev ? '--save-prod' : '--save-dev',
    //   ],
    //   {
    //     stdio: 'inherit',
    //     cwd: this.#cwd,
    //     windowsHide: true,
    //     shell: false,
    //   }
    // );
  }
}
