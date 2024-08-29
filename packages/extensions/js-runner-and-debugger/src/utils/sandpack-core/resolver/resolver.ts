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
 * - remove processTSConfig/findPackageJSON/resolveAlias logic
 */
import gensync from 'gensync';

import * as pathUtils from '../../paths';
import { ModuleNotFoundError } from './errors/module-not-found';
import { ProcessedPackageJSON, processPackageJSON } from './utils/pkg-json';
import { isFile, FnIsFile, FnReadFile, getParentDirectories } from './utils/fs';

export type ResolverCache = Map<string, any>;

export function invalidatePackageFromCache(
  pkgName: string,
  cache: ResolverCache
): void {
  const lowerPkgName = pkgName.toLowerCase();
  for (const [key] of cache) {
    if (key.toLowerCase().includes(lowerPkgName)) {
      cache.delete(key);
    }
  }
}

export interface IResolveOptionsInput {
  filename: string;
  extensions: string[];
  isFile: FnIsFile;
  readFile: FnReadFile;
  moduleDirectories?: string[];
  resolverCache?: ResolverCache;
  pkgJson?: IFoundPackageJSON;
}

interface IResolveOptions extends IResolveOptionsInput {
  moduleDirectories: string[];
  resolverCache: ResolverCache;
}

function normalizeResolverOptions(opts: IResolveOptionsInput): IResolveOptions {
  const normalizedModuleDirectories: Set<string> = opts.moduleDirectories
    ? new Set(
        opts.moduleDirectories.map(p => (p[0] === '/' ? p.substring(1) : p))
      )
    : new Set();
  normalizedModuleDirectories.add('node_modules');

  return {
    filename: opts.filename,
    extensions: [...new Set(['', ...opts.extensions])],
    isFile: opts.isFile,
    readFile: opts.readFile,
    moduleDirectories: [...normalizedModuleDirectories],
    resolverCache: opts.resolverCache || new Map(),
    pkgJson: opts.pkgJson,
  };
}

interface IFoundPackageJSON {
  filepath: string;
  content: ProcessedPackageJSON;
}

function* loadPackageJSON(
  directory: string,
  opts: IResolveOptions
): Generator<any, IFoundPackageJSON | null, any> {
  const packageFilePath = pathUtils.join(directory, 'package.json');
  let packageContent = opts.resolverCache.get(packageFilePath);
  if (packageContent === undefined) {
    try {
      packageContent = processPackageJSON(
        JSON.parse(yield* opts.readFile(packageFilePath)),
        pathUtils.dirname(packageFilePath)
      );
      opts.resolverCache.set(packageFilePath, packageContent);
    } catch (err) {
      opts.resolverCache.set(packageFilePath, false);
    }
  }
  if (packageContent) {
    return {
      filepath: packageFilePath,
      content: packageContent,
    };
  }
  return null;
}

function* loadNearestPackageJSON(
  filepath: string,
  opts: IResolveOptions,
  rootDir: string = '/'
): Generator<any, IFoundPackageJSON | null, any> {
  const directories = getParentDirectories(filepath, rootDir);
  for (const directory of directories) {
    const foundPackageJSON = yield* loadPackageJSON(directory, opts);

    if (foundPackageJSON) {
      return foundPackageJSON;
    }
  }
  return null;
}

function resolveFile(filepath: string, dir: string): string {
  switch (filepath[0]) {
    case '.':
      return pathUtils.join(dir, filepath);
    case '/':
      return filepath;
    default:
      // is a node module
      return filepath;
  }
}

function resolveModule(moduleSpecifier: string, opts: IResolveOptions): string {
  const dirPath = pathUtils.dirname(opts.filename);
  const filename = resolveFile(moduleSpecifier, dirPath);
  return filename;
}

const extractPkgSpecifierParts = (specifier: string) => {
  const parts = specifier.split('/');
  const pkgName =
    parts[0][0] === '@' ? parts.splice(0, 2).join('/') : parts.shift();
  return {
    pkgName,
    filepath: parts.join('/'),
  };
};

function* resolveNodeModule(
  moduleSpecifier: string,
  opts: IResolveOptions
): Generator<any, string, any> {
  const pkgSpecifierParts = extractPkgSpecifierParts(moduleSpecifier);
  const directories = getParentDirectories(opts.filename);
  for (const modulesPath of opts.moduleDirectories) {
    for (const directory of directories) {
      const rootDir = pathUtils.join(
        directory,
        modulesPath,
        pkgSpecifierParts.pkgName!
      );

      try {
        const pkgFilePath = pathUtils.join(rootDir, pkgSpecifierParts.filepath);
        const rootPkgJson = yield* loadPackageJSON(rootDir, opts);
        const pkgJson =
          rootPkgJson && rootPkgJson.content.hasExports
            ? rootPkgJson
            : yield* loadNearestPackageJSON(pkgFilePath, opts, rootDir);
        if (pkgJson) {
          try {
            return yield* resolve(pkgFilePath, {
              ...opts,
              filename: pkgJson.filepath,
              pkgJson,
            });
          } catch (err) {
            if (!pkgSpecifierParts.filepath) {
              return yield* resolve(pathUtils.join(pkgFilePath, 'index'), {
                ...opts,
                filename: pkgJson.filepath,
              });
            }

            throw err;
          }
        }
      } catch (err) {
        // Handle multiple duplicates of a node_module across the tree
        if (directory.length > 1) {
          return yield* resolveNodeModule(moduleSpecifier, {
            ...opts,
            filename: pathUtils.dirname(directory),
          });
        }

        throw err;
      }
    }
  }
  throw new ModuleNotFoundError(moduleSpecifier, opts.filename);
}

function* expandFile(
  filepath: string,
  opts: IResolveOptions,
  expandCount: number = 0
): Generator<any, string | null, any> {
  if (expandCount > 5) {
    throw new Error('Cyclic alias detected');
  }

  for (const ext of opts.extensions) {
    const f = filepath + ext;
    const exists = yield* isFile(f, opts.isFile);
    if (exists) {
      return f;
    }
  }
  return null;
}

export function normalizeModuleSpecifier(specifier: string): string {
  const normalized = specifier.replace(/(\/|\\)+/g, '/');
  if (normalized.endsWith('/')) {
    return normalized.substring(0, normalized.length - 1);
  }
  return normalized;
}

function* resolve(
  moduleSpecifier: string,
  inputOpts: IResolveOptionsInput,
  skipIndexExpansion: boolean = false
): Generator<any, string, any> {
  const normalizedSpecifier = normalizeModuleSpecifier(moduleSpecifier);
  const opts = normalizeResolverOptions(inputOpts);

  const modulePath = resolveModule(normalizedSpecifier, opts);

  if (modulePath[0] !== '/') {
    try {
      const resolved = yield* resolveNodeModule(modulePath, opts);
      return resolved;
    } catch (e) {
      throw new ModuleNotFoundError(normalizedSpecifier, opts.filename);
    }
  }

  let foundFile = yield* expandFile(modulePath, opts);
  if (!foundFile && !skipIndexExpansion) {
    foundFile = yield* expandFile(pathUtils.join(modulePath, 'index'), opts);

    // In case alias adds an extension, we retry the entire resolution with an added /index
    // This is mostly a hack I guess, but it works for now, so many edge-cases
    if (!foundFile) {
      try {
        const parts = moduleSpecifier.split('/');
        if (!parts.length || !parts[parts.length - 1].startsWith('index')) {
          foundFile = yield* resolve(moduleSpecifier + '/index', opts, true);
        }
      } catch (err) {
        // should throw ModuleNotFound for original specifier, not new one
      }
    }
  }

  if (!foundFile) {
    throw new ModuleNotFoundError(modulePath, opts.filename);
  }

  return foundFile;
}

export const resolver = gensync<
  [string, IResolveOptionsInput, boolean],
  string
>(resolve);

export const resolveSync = resolver.sync;
export const resolveAsync = resolver.async;
