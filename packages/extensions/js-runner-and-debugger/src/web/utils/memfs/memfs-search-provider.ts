/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

'use strict';

import * as vscode from 'vscode';
import { MinimatchOptions, minimatch } from 'minimatch';
import { MemFS } from './memfs-fs-provider';
import * as path from '../paths';
import { escapeRegExpCharacters } from '../strings';

function joinPath(resource: vscode.Uri, pathFragment: string): vscode.Uri {
  const joinedPath = path.join(resource.path || '/', pathFragment);
  return resource.with({
    path: joinedPath,
  });
}

export class MemFSSearchProvider
  implements vscode.TextSearchProvider, vscode.FileSearchProvider
{
  constructor(private memfs: MemFS) {}

  async provideTextSearchResults(
    query: vscode.TextSearchQuery,
    options: vscode.TextSearchOptions,
    progress: vscode.Progress<vscode.TextSearchResult>,
    _token: vscode.CancellationToken
  ): Promise<vscode.TextSearchComplete> {
    const flags = query.isCaseSensitive ? 'g' : 'ig';
    let regexText = query.isRegExp
      ? query.pattern
      : escapeRegExpCharacters(query.pattern);
    if (query.isWordMatch) {
      regexText = `\\b${regexText}\\b`;
    }

    const searchRegex = new RegExp(regexText, flags);
    await this._textSearchDir(
      options.folder,
      '',
      searchRegex,
      options,
      progress
    );
    return { limitHit: false };
  }

  private async _textSearchDir(
    baseFolder: vscode.Uri,
    relativeDir: string,
    pattern: RegExp,
    options: vscode.TextSearchOptions,
    progress: vscode.Progress<vscode.TextSearchResult>
  ): Promise<void> {
    const dirItems = await this.memfs.readDirectory(
      joinPath(baseFolder, relativeDir)
    );

    for (const [name, type] of dirItems) {
      const dirItemPath = path.join(relativeDir, name);
      if (!this._matchPath(dirItemPath, type, options)) {
        continue;
      }
      if (type === vscode.FileType.Directory) {
        await this._textSearchDir(
          baseFolder,
          dirItemPath,
          pattern,
          options,
          progress
        );
      } else if (type === vscode.FileType.File) {
        await this._textSearchFile(
          baseFolder,
          dirItemPath,
          pattern,
          options,
          progress
        );
      }
    }
  }

  private async _textSearchFile(
    baseFolder: vscode.Uri,
    relativePath: string,
    pattern: RegExp,
    _options: vscode.TextSearchOptions,
    progress: vscode.Progress<vscode.TextSearchResult>
  ): Promise<void> {
    const fileUri = joinPath(baseFolder, relativePath);
    const result = await this.memfs.readFile(fileUri);
    const fileContents = new TextDecoder().decode(result);

    fileContents.split(/\r?\n/).forEach((line, i) => {
      let result: RegExpExecArray | null;
      while ((result = pattern.exec(line))) {
        const range = new vscode.Range(
          i,
          result.index,
          i,
          result.index + result[0].length
        );

        progress.report({
          uri: fileUri,
          ranges: range,

          // options.previewOptions will describe parameters for this
          preview: {
            text: line,
            matches: new vscode.Range(
              0,
              range.start.character,
              0,
              range.end.character
            ),
          },
        });
      }
    });
  }

  async provideFileSearchResults(
    query: vscode.FileSearchQuery,
    options: vscode.FileSearchOptions,
    _token: vscode.CancellationToken
  ): Promise<vscode.Uri[]> {
    const searchRegex = new RegExp(query.pattern, 'g');
    const result: vscode.Uri[] = await this._fileSearchDir(
      options.folder,
      '',
      searchRegex,
      options
    );
    return result;
  }

  private async _fileSearchDir(
    baseFolder: vscode.Uri,
    relativeDir: string,
    pattern: RegExp,
    options: vscode.FileSearchOptions
  ): Promise<vscode.Uri[]> {
    const dirUri = joinPath(baseFolder, relativeDir);
    const dirItems = await this.memfs.readDirectory(dirUri);

    let result: vscode.Uri[] = [];
    for (const [name, type] of dirItems) {
      const dirItemUri = joinPath(dirUri, name);
      const dirItemPath = dirItemUri.path;
      if (!this._matchPath(dirItemPath, type, options)) {
        continue;
      }
      if (type === vscode.FileType.Directory) {
        const subResult = await this._fileSearchDir(
          baseFolder,
          dirItemPath,
          pattern,
          options
        );
        result = [...result, ...subResult];
      } else if (type === vscode.FileType.File) {
        if (pattern.exec(dirItemPath)) {
          result.push(dirItemUri);
        }
      }
    }
    return result;
  }

  private _matchPath(
    path: string,
    type: vscode.FileType,
    options: vscode.SearchOptions
  ) {
    const { includes, excludes } = options;
    const matchOptions: MinimatchOptions = {
      partial: false,
    };

    // 首先检查排除模式，如果路径匹配任意一个排除模式，返回false
    for (const excludePattern of excludes) {
      if (minimatch(path, excludePattern, matchOptions)) {
        return false; // 如果匹配到排除模式，该路径不满足要求
      }
    }
    // 如果目录没有命中 excludes，代表需要继续递归查询
    if (type === vscode.FileType.Directory) {
      return true;
    } else if (type === vscode.FileType.File) {
      // 如果用户没输入 include，默认匹配所有的
      if (includes.length === 0) {
        return true;
      }
      // 检查包含模式，如果路径匹配任意一个包含模式，返回true
      for (const includePattern of includes) {
        if (minimatch(path, includePattern, matchOptions)) {
          return true; // 如果匹配到包含模式，该路径满足要求
        }
      }
    }
    return false;
  }
}
