import * as vscode from 'vscode';
import { Client } from './client';
import { injectable } from '../../../utils/webview';
import { FS_SCHEME } from '../../../config';
import { loadDependencies, Manifest } from '../../../utils/sandpack-core';
import { logger } from '../../../utils/logger';
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
          version: string;
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
    if (this.#projectsState[key]) {
      if (this.#projectsState[key].status === 'installing') {
        return;
      } else if (this.#projectsState[key].status === 'success') {
        // TODO
        return;
      }
    }

    this.#projectsState[key] = {
      status: 'installing',
      dependenciesState: {},
    };
    const currentProject = this.#projectsState[key];

    const dependencies = await this.getAllPackages();
    try {
      await this.install({ packages: dependencies });
      currentProject.status = 'success';
    } catch (_error) {
      currentProject.status = 'failed';
    }
  }
  async install(options: {
    packages: { name: string; version: string }[];
    isDev?: boolean;
  }) {
    const key = this.#uri.path;
    if (!this.#projectsState[key]) {
      return;
    }
    const currentProject = this.#projectsState[key];

    await vscode.window.withProgress(
      {
        location: vscode.ProgressLocation.Notification,
      },
      async (progress, token) => {
        // The total number of steps, if known.
        const totalSteps = options.packages.length;

        for (const [currentIndex, currentPkg] of options.packages.entries()) {
          // Update the progress bar
          progress.report({
            increment: currentIndex,
            message: `Installing ${options.isDev ? 'dev ' : ''}dependency ${currentPkg.name}@${currentPkg.version}`,
          });

          currentProject.dependenciesState[currentPkg.name] = {
            status: 'installing',
            version: currentPkg.version,
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
            // Check if the user canceled the operation
            if (token.isCancellationRequested) {
              break;
            }
          } catch (error) {
            currentPkgState.status = 'failed';
            logger.error(
              `Install ${options.isDev ? 'dev ' : ''}dependency ${currentPkg.name}@${currentPkg.version} failed`,
              error
            );
            throw error;
          }
        }
        this.updatePackageJSON();
        progress.report({
          increment: totalSteps,
        });
      }
    );
  }
  async update(_options: { query: string }) {
    // const args = ['update', ...query.split(' ')];
    // spawn.sync('npm', args, {
    //   stdio: 'inherit',
    //   cwd: this.#cwd,
    //   windowsHide: true,
    //   shell: false,
    // });
    this.updatePackageJSON();
  }
  async remove(_options: { packages: string[] }) {
    console.log(_options);
    // spawn.sync('npm', ['remove', ...packages], {
    //   stdio: 'inherit',
    //   cwd: this.#cwd,
    //   windowsHide: true,
    //   shell: false,
    // });
    this.updatePackageJSON();
  }
  private async updatePackageJSON() {
    const key = this.#uri.path;
    if (!this.#projectsState[key]) {
      return;
    }
    const currentProject = this.#projectsState[key];
    const packageJsonUri = vscode.Uri.parse(`${FS_SCHEME}:${key}`);
    const packageJsonRaw = await vscode.workspace.fs.readFile(
      vscode.Uri.parse(`${FS_SCHEME}:${key}`)
    );
    const packageJson = JSON.parse(new TextDecoder().decode(packageJsonRaw));
    packageJson.dependencies = Object.keys(
      currentProject.dependenciesState
    ).reduce((final, currentPkgName) => {
      return {
        ...final,
        [currentPkgName]:
          currentProject.dependenciesState[currentPkgName].version,
      };
    }, {});
    await vscode.workspace.fs.writeFile(
      packageJsonUri,
      new TextEncoder().encode(JSON.stringify(packageJson, null, 4))
    );
  }
}
