/**
 * Copyright 2024 Jiyu Shao
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Modifications:
 * - remove Manager/TranspiledModule logic
 */
import gensync from 'gensync';
import * as pathUtils from '../../../paths';

import { Module } from '../../types/module';

import { getFetchProtocol } from './fetch-protocols';
import { getDependencyName } from '../../utils/get-dependency-name';
import { DEFAULT_EXTENSIONS } from '../../utils/extensions';
import {
  invalidatePackageFromCache,
  resolveAsync,
} from '../../resolver/resolver';
import { FnReadFile } from '../../resolver/utils/fs';
import { IResponse } from '../merge-dependency';

export type Meta = {
  [path: string]: true;
};

// dependencyAndVersion => P<Meta>
const metas = new Map<string, Promise<Meta>>();
export let combinedMetas: Meta = {};
const normalizedMetas: { [key: string]: Meta } = {};

// path => P<Module>
const packages = new Map<string, Promise<Module>>();

const resolverCache = new Map();

function prependRootPath(meta: Meta, rootPath: string): Meta {
  const newMeta: Meta = {};
  Object.keys(meta).forEach(path => {
    newMeta[rootPath + path] = meta[path];
  });

  return newMeta;
}

export interface FetchProtocol {
  file(name: string, version: string, path: string): Promise<string>;
  meta(name: string, version: string): Promise<Meta>;
  massFiles?(name: string, version: string): Promise<Array<Module>>;
}

export function setCombinedMetas(givenCombinedMetas: Meta) {
  combinedMetas = givenCombinedMetas;
}

// Strips the version of a path, eg. test/1.3.0 -> test
const ALIAS_REGEX = /\/\d*\.\d*\.\d*.*?(\/|$)/;

function getMeta(
  name: string,
  packageJSONPath: string | null,
  version: string,
  useFallback = false
): Promise<{ meta: Meta; fromCache: boolean }> {
  const [depName, depVersion] = [name, version];
  const nameWithoutAlias = depName.replace(ALIAS_REGEX, '');
  const id = `${packageJSONPath || depName}@${depVersion}`;
  const foundMeta = metas.get(id);
  if (foundMeta) {
    return foundMeta.then(x => ({
      meta: x,
      fromCache: true,
    }));
  }

  const protocol = getFetchProtocol(depName, depVersion, useFallback);

  const newMeta = protocol
    .meta(nameWithoutAlias, depVersion)
    .catch((e: Error) => {
      metas.delete(id);
      throw e;
    });
  metas.set(id, newMeta);
  return newMeta.then((x: Meta) => ({
    meta: x,
    fromCache: false,
  }));
}

const downloadedAllDependencies = new Set<string>();
/**
 * If the protocol supports it, download all files of the dependency
 * at once. It's an optimization.
 */
export async function downloadAllDependencyFiles(
  name: string,
  version: string
): Promise<Module[] | null> {
  if (downloadedAllDependencies.has(`${name}@${version}`)) {
    return null;
  }

  downloadedAllDependencies.add(`${name}@${version}`);

  const [depName, depVersion] = [name, version];
  const nameWithoutAlias = depName.replace(ALIAS_REGEX, '');
  const protocol = getFetchProtocol(depName, depVersion);

  if (protocol.massFiles) {
    // If the protocol supports returning many files at once, we opt for that instead.
    return protocol.massFiles(nameWithoutAlias, depVersion);
  }

  return null;
}

const packagesToInvalidate = new Set<string>();
function invalidatePendingPackages() {
  for (const pkgName of packagesToInvalidate) {
    invalidatePackageFromCache(pkgName, resolverCache);
    packagesToInvalidate.delete(pkgName);
  }
}

export function downloadDependency(
  name: string,
  version: string,
  path: string
): Promise<Module> {
  const [depName, depVersion] = [name, version];
  const id = depName + depVersion + path;
  const foundPkg = packages.get(id);
  if (foundPkg) {
    return foundPkg;
  }

  packagesToInvalidate.add(depName);

  const relativePath = path
    .replace(
      new RegExp(
        `.*${pathUtils.join('/node_modules', depName)}`.replace('/', '\\/')
      ),
      ''
    )
    .replace(/#/g, '%23');

  const nameWithoutAlias = depName.replace(ALIAS_REGEX, '');
  const protocol = getFetchProtocol(depName, depVersion);

  const newPkg = protocol
    .file(nameWithoutAlias, depVersion, relativePath)
    .catch(async () => {
      const fallbackProtocol = getFetchProtocol(
        nameWithoutAlias,
        depVersion,
        true
      );
      return fallbackProtocol.file(nameWithoutAlias, depVersion, relativePath);
    })
    .then((code: string) => ({
      path,
      code,
      downloaded: true,
    }));
  packages.set(id, newPkg);
  return newPkg;
}

function resolvePath(
  path: string,
  defaultExtensions: Array<string> = DEFAULT_EXTENSIONS,
  meta: Meta = {},
  ignoreDepNameVersion: string = '',
  manifest: IResponse
): Promise<string> {
  invalidatePendingPackages();
  const isFile = gensync({
    sync: (p: string) => Boolean(meta[p]),
  });

  const readFile: FnReadFile = gensync<[string], string>({
    sync: () => {
      throw new Error('Sync not supported for readFile');
    },
    async: async (p: string): Promise<string> => {
      const depPath = p.replace(/.*\/node_modules\//, '');
      const depName = getDependencyName(depPath);

      // To prevent infinite loops we keep track of which dependencies have been requested before.
      if (!meta[p] || ignoreDepNameVersion === depName) {
        const err = new Error('Could not find ' + p);
        // @ts-expect-error ENOENT
        err.code = 'ENOENT';

        throw err;
      }

      const subDepVersionVersionInfo = await getDependencyVersion(
        depName,
        manifest
      );

      if (subDepVersionVersionInfo) {
        const { version: subDepVersion } = subDepVersionVersionInfo;
        const module = await downloadDependency(
          depName,
          subDepVersion,
          p
        ).finally(() => {
          packagesToInvalidate.add(depName);
          invalidatePendingPackages();
        });

        if (module) {
          return module.code;
        }
      }
      throw new Error('readFile failed');
    },
  });

  return resolveAsync(
    path,
    {
      resolverCache,
      filename: 'filename.js',
      extensions: defaultExtensions.map(ext => '.' + ext),
      moduleDirectories: ['node_modules'].filter(Boolean),
      isFile,
      readFile,
    },
    false
  );
}

type DependencyVersionResult =
  | {
      version: string;
      packageJSONPath: string;
    }
  | {
      version: string;
      packageJSONPath: null;
    }
  | {
      version: string;
      name: string | null;
      packageJSONPath: null;
    };

async function getDependencyVersion(
  dependencyName: string,
  manifest: IResponse
): Promise<DependencyVersionResult | null> {
  try {
    const filepath = pathUtils.join(dependencyName, 'package.json');
    const foundPackageJSONPath = await resolvePath(
      filepath,
      [],
      {},
      dependencyName,
      manifest
    );

    // If the dependency is in the root we get it from the manifest, as the manifest
    // contains all the versions that we really wanted to resolve in the first place.
    // An example of this is csb.dev packages, the package.json version doesn't say the
    // actual version, but the semver it relates to. In this case we really want to have
    // the actual url
    if (
      foundPackageJSONPath ===
      pathUtils.join('/node_modules', dependencyName, 'package.json')
    ) {
      const rootDependency = manifest.dependencies.find(
        (dep: { name: string }) => dep.name === dependencyName
      );
      if (rootDependency) {
        return {
          packageJSONPath: foundPackageJSONPath,
          version: rootDependency.version,
        };
      }
    }

    // const packageJSON =
    //   manager.transpiledModules[foundPackageJSONPath] &&
    //   manager.transpiledModules[foundPackageJSONPath].module.code;
    const packageJSON: string = '{"version": "1.0.0"}';
    const { version } = JSON.parse(packageJSON);

    const savedDepDep = manifest.dependencyDependencies[dependencyName];

    if (
      savedDepDep &&
      savedDepDep.resolved === version &&
      savedDepDep.semver.startsWith('https://')
    ) {
      return {
        packageJSONPath: foundPackageJSONPath,
        version: savedDepDep.semver,
      };
    }

    if (packageJSON !== '//empty.js') {
      return { packageJSONPath: foundPackageJSONPath, version };
    }
  } catch (e) {
    /* do nothing */
  }

  let version = null;

  if (manifest.dependencyDependencies[dependencyName]) {
    if (
      manifest.dependencyDependencies[dependencyName].semver.startsWith(
        'https://'
      )
    ) {
      version = manifest.dependencyDependencies[dependencyName].semver;
    } else {
      version = manifest.dependencyDependencies[dependencyName].resolved;
    }
  } else {
    const dep = manifest.dependencies.find(
      (m: { name: string }) => m.name === dependencyName
    );

    if (dep) {
      version = dep.version;
    }
  }

  if (version) {
    return { packageJSONPath: null, version };
  }

  return null;
}

export async function fetchModule(
  path: string,
  defaultExtensions: Array<string> = DEFAULT_EXTENSIONS,
  manifest: IResponse
): Promise<Module> {
  // Get the last part of the path as dependency name for paths like
  // instantsearch.js/node_modules/lodash/sum.js
  // In this case we want to get the lodash dependency info
  const dependencyName = getDependencyName(
    path.replace(/.*\/node_modules\//, '')
  );

  packagesToInvalidate.add(dependencyName);
  invalidatePendingPackages();

  const versionInfo = await getDependencyVersion(dependencyName, manifest);

  if (versionInfo === null) {
    throw new Error(`DependencyNotFoundError ${path}`);
  }

  const { packageJSONPath, version } = versionInfo;

  let meta: { meta: Meta; fromCache: boolean };

  try {
    meta = await getMeta(dependencyName, packageJSONPath, version);
  } catch (e) {
    // Use fallback
    meta = await getMeta(dependencyName, packageJSONPath, version, true);
  }

  const rootPath = packageJSONPath
    ? pathUtils.dirname(packageJSONPath)
    : pathUtils.join('/node_modules', dependencyName);
  const normalizedCacheKey = dependencyName + rootPath;

  const normalizedMeta =
    normalizedMetas[normalizedCacheKey] || prependRootPath(meta.meta, rootPath);

  if (!normalizedMetas[normalizedCacheKey]) {
    normalizedMetas[normalizedCacheKey] = normalizedMeta;
  } else if (!meta.fromCache) {
    combinedMetas = { ...combinedMetas, ...normalizedMeta };
  }

  packagesToInvalidate.add(dependencyName);
  invalidatePendingPackages();

  const foundPath = await resolvePath(
    path,
    defaultExtensions,
    normalizedMeta,
    '',
    manifest
  );

  if (foundPath === '//empty.js') {
    // Mark the path of the module as the real module, because during evaluation
    // we don't have meta to find which modules are browser modules and we still
    // need to return an empty module for browser modules.
    const isDependency = /^(\w|@\w|@-)/.test(path);
    const fullFilePath = isDependency
      ? pathUtils.join('/node_modules', path)
      : pathUtils.join('/', path);

    return {
      path: fullFilePath,
      code: 'module.exports = {};',
      requires: [],
      stubbed: true,
    };
  }

  return downloadDependency(dependencyName, version, foundPath).finally(() => {
    packagesToInvalidate.add(dependencyName);
    invalidatePendingPackages();
  });
}
