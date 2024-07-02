import * as vscode from 'vscode';
import { MinimatchOptions, minimatch } from 'minimatch';
import { MemFS } from './memfs-fs-provider';
import * as path from '../paths';

function joinPath(resource: vscode.Uri, pathFragment: string): vscode.Uri {
  const joinedPath = path.join(resource.path || '/', pathFragment);
  return resource.with({
    path: joinedPath,
  });
}

function escapeRegExpCharacters(value: string): string {
  // eslint-disable-next-line no-useless-escape
  return value.replace(/[\-\\\{\}\*\+\?\|\^\$\.\[\]\(\)\#]/g, '\\$&');
}

function convertFolderMatchPatterns(patterns: string[]) {
  const result = new Set<string>();
  patterns.forEach(current => {
    result.add(current);
    // 检查和转换格式
    if (current.endsWith('/**')) {
      result.add(current.slice(0, -3)); // 去掉末尾的/**部分
    }
  });
  return Array.from(result);
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

    let finalIncludes = includes;
    let finalExcludes = excludes;
    if (type === vscode.FileType.Directory) {
      finalIncludes = convertFolderMatchPatterns(includes);
      finalExcludes = convertFolderMatchPatterns(excludes);
    }
    // 首先检查排除模式，如果路径匹配任意一个排除模式，返回false
    for (const excludePattern of finalExcludes) {
      if (minimatch(path, excludePattern, matchOptions)) {
        return false; // 如果匹配到排除模式，该路径不满足要求
      }
    }
    // 如果目录没有命中 excludes，代表需要继续递归查询
    if (type === vscode.FileType.Directory) {
      return true;
    } else if (type === vscode.FileType.File) {
      // 检查包含模式，如果路径匹配任意一个包含模式，返回true
      for (const includePattern of finalIncludes) {
        if (minimatch(path, includePattern, matchOptions)) {
          return true; // 如果匹配到包含模式，该路径满足要求
        }
      }
    }
    // 如果没有匹配任何包含模式，返回false
    return false;
  }
}
