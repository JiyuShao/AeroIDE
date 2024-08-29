export function dirname(originalPath: string) {
  const path = removeTrailingSlash(originalPath);
  return path.substring(0, path.lastIndexOf('/')) || '/';
}

export function basename(originalPath: string) {
  const path = removeTrailingSlash(originalPath);
  const lastSlashIndex = path.lastIndexOf('/');
  return lastSlashIndex >= 0 ? path.substring(lastSlashIndex + 1) : path;
}

/**
 * 获取从 from 路径到 to 路径的相对路径
 * @param {string} from - 源路径
 * @param {string} to - 目标路径
 * @returns {string} 相对路径
 */
export function relative(from: string, to: string): string {
  const fromSegments = from.split('/');
  const toSegments = to.split('/');

  // 找到两个路径的共同基路径的索引
  let commonLength = 0;
  for (let i = 0; i < Math.min(fromSegments.length, toSegments.length); i++) {
    if (fromSegments[i] === toSegments[i]) {
      commonLength++;
    } else {
      break;
    }
  }

  // 组成相对路径
  const upSegments = fromSegments.slice(commonLength).map(() => '..');
  const downSegments = toSegments.slice(commonLength);
  return upSegments.concat(downSegments).join('/');
}

export function removeTrailingSlash(str: string) {
  return str.replace(/\/+$/, '');
}

function normalizeArray(parts: string[], allowAboveRoot: boolean): string[] {
  const res: string[] = [];

  for (let i = 0; i < parts.length; i++) {
    const p = parts[i];

    // Ignore empty parts and current directory parts.
    if (!p || p === '.') {
      continue;
    }

    // Handle '..' to go up one directory.
    if (p === '..') {
      if (res.length && res[res.length - 1] !== '..') {
        res.pop();
      } else if (allowAboveRoot) {
        res.push('..');
      }
    } else {
      res.push(p);
    }
  }

  return res;
}

export function join(...paths: string[]): string {
  // Split the paths into path segments.
  let parts: string[] = [];

  for (let i = 0; i < paths.length; i++) {
    parts = parts.concat(paths[i].split('/'));
  }

  // Normalize the array of path segments.
  parts = normalizeArray(parts, false);

  // Recombine the array into a string.
  return '/' + parts.join('/');
}
