import * as vscode from 'vscode';
import { Client } from './client';
import { injectable } from '../../../utils/webview';
import { FS_SCHEME } from '../../../config';
import { loadDependencies } from '../../../utils/sandpack-core/npm';
import { logger } from '../../../utils/logger';
import { IResponse as Manifest } from '../../../utils/sandpack-core/npm/merge-dependency';
import { writeFile } from '../../../utils/file';
// import { dirname } from '../../../utils/paths';

@injectable()
export class NpmClient extends Client {
  #uri!: vscode.Uri;
  #projectsState: Record<
    string,
    {
      status: 'installing' | 'success' | 'failed';
      dependenciesState: Record<
        string,
        {
          status: 'installing' | 'success' | 'failed';
          manifest?: Omit<Manifest, 'contents'> & {
            contentUrls: string[];
          };
        }
      >;
    }
  > = {};

  cwdFromUri(uri: vscode.Uri) {
    this.#uri = uri;
    return this;
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
  async init() {
    const key = this.#uri.path;
    if (
      this.#projectsState[key] &&
      this.#projectsState[key].status === 'installing'
    ) {
      return;
    }
    this.#projectsState[key] = {
      status: 'installing',
      dependenciesState: {},
    };
    const currentProject = this.#projectsState[key];

    const dependencies = await this.getAllPackages();
    try {
      for (let i = 0; i < dependencies.length; i++) {
        const currentPkg = dependencies[i];
        currentProject.dependenciesState[currentPkg.name] = {
          status: 'installing',
        };
        const currentPkgState =
          currentProject.dependenciesState[currentPkg.name];
        try {
          const result = await loadDependencies(
            {
              [currentPkg.name]: currentPkg.version,
            },
            _ => {}
          );
          if (!result.manifest) {
            throw new Error('manifest is null');
          }
          // save to file system
          await Promise.all(
            Object.keys(result.manifest.contents).map(currentFilePath => {
              const currentFileUri = vscode.Uri.parse(
                `${FS_SCHEME}:${currentFilePath}`
              );
              return writeFile(
                currentFileUri,
                new TextEncoder().encode(
                  result.manifest!.contents[currentFilePath].content
                )
              );
            })
          );

          // update pkg status
          currentPkgState.status = 'success';
          currentPkgState.manifest = {
            contentUrls: Object.keys(result.manifest.contents),
            dependencies: result.manifest.dependencies,
            dependencyAliases: result.manifest.dependencyAliases,
            dependencyDependencies: result.manifest.dependencyDependencies,
          };
        } catch (error) {
          currentPkgState.status = 'failed';
          logger.error(
            `Project ${key} install ${currentPkg.isDevDependency && 'dev '}dependency ${currentPkg.name}@${currentPkg.version} failed`,
            error
          );
          throw error;
        }
      }
      currentProject.status = 'success';
    } catch (_error) {
      currentProject.status = 'failed';
    }
  }
  async install({ isDev, query }: { isDev?: boolean; query: string }) {
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
  async update(_options: { query: string }) {
    // const args = ['update', ...query.split(' ')];
    // spawn.sync('npm', args, {
    //   stdio: 'inherit',
    //   cwd: this.#cwd,
    //   windowsHide: true,
    //   shell: false,
    // });
  }
  async remove(_options: { packages: string[] }) {
    console.log(_options);
    // spawn.sync('npm', ['remove', ...packages], {
    //   stdio: 'inherit',
    //   cwd: this.#cwd,
    //   windowsHide: true,
    //   shell: false,
    // });
  }
  async swapType(_args: {
    packageName: string;
    isDev?: boolean;
    version?: string;
  }) {
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
