export function dirname(originalPath: string) {
  const path = removeTrailingSlash(originalPath);
  return path.substring(0, path.lastIndexOf('/')) || '/';
}

export function dirpath(originalPath: string) {
  let path = dirname(originalPath);
  if (!path.endsWith('/')) {
    path += '/';
  }
  return path;
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
function removeTrailingSlash(str: string) {
  return str.replace(/\/+$/, '');
}
