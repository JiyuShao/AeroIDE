import * as vscode from 'vscode';
import { Client } from './client';
import { injectable } from '../../../utils/webview';
import { FS_SCHEME } from '../../../config';
import { loadDependencies, Manifest } from '../../../utils/sandpack-core';
import { logger } from '../../../utils/logger';
import { writeFile, deleteFile, deleteDir } from '../../../utils/file';
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
    if (!this.#projectsState[key]) {
      this.#projectsState[key] = {
        status: 'failed',
        dependenciesState: {},
      };
    }
    const currentProject = this.#projectsState[key];
    const dependencies = await this.getAllPackages();

    if (currentProject.status === 'installing') {
      return;
    } else if (currentProject.status === 'success') {
      let isInited = true;
      for (const currentDep of dependencies) {
        if (
          !currentProject.dependenciesState[currentDep.name] ||
          currentProject.dependenciesState[currentDep.name].version !==
            currentDep.version ||
          currentProject.dependenciesState[currentDep.name].status !== 'success'
        ) {
          isInited = false;
        }
      }
      if (isInited) {
        return;
      }
    }
    try {
      currentProject.status = 'installing';
      await deleteDir(vscode.Uri.parse(`${FS_SCHEME}:/node_modules`));
      await this.install({ packages: dependencies });
      currentProject.status = 'success';
    } catch (_error) {
      currentProject.status = 'failed';
    }
  }
  async install(options: { packages: { name: string; version: string }[] }) {
    const key = this.#uri.path;
    if (!this.#projectsState[key]) {
      return;
    }
    const currentProject = this.#projectsState[key];
    const packagesWithoutTypings = options.packages.filter(currentPkg => {
      return !currentPkg.name.includes('@types');
    });
    if (packagesWithoutTypings.length === 0) {
      return;
    }

    await vscode.window.withProgress(
      {
        location: vscode.ProgressLocation.Notification,
      },
      async (progress, token) => {
        // The total number of steps, if known.
        const totalSteps = packagesWithoutTypings.length;
        for (const [
          currentIndex,
          currentPkg,
        ] of packagesWithoutTypings.entries()) {
          // Update the progress bar
          progress.report({
            increment: currentIndex,
            message: `Installing dependency ${currentPkg.name}@${currentPkg.version}`,
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
              `Install dependency ${currentPkg.name}@${currentPkg.version} failed`,
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
  async update(options: { packages: { name: string; version: string }[] }) {
    await this.install({ packages: options.packages });
  }
  async remove(options: { packages: string[] }) {
    const key = this.#uri.path;
    if (!this.#projectsState[key]) {
      return;
    }
    const currentProject = this.#projectsState[key];
    for (const currentPkg of options.packages) {
      const currentPkgState = currentProject.dependenciesState[currentPkg];
      for (const currentContentUrl of currentPkgState.manifest?.contentUrls ||
        []) {
        await deleteFile(vscode.Uri.parse(`${FS_SCHEME}:${currentContentUrl}`));
      }
      delete currentProject.dependenciesState[currentPkg];
    }
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
    delete packageJson.devDependencies;
    await vscode.workspace.fs.writeFile(
      packageJsonUri,
      new TextEncoder().encode(JSON.stringify(packageJson, null, 4))
    );
  }
}
