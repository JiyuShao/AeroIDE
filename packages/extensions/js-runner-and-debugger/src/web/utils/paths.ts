export function dirname(originalPath: string) {
  const path = removeTrailingSlash(originalPath);
  return path.substring(0, path.lastIndexOf('/')) || '/';
}

export function basename(originalPath: string) {
  const path = removeTrailingSlash(originalPath);
  const lastSlashIndex = path.lastIndexOf('/');
  return lastSlashIndex >= 0 ? path.substring(lastSlashIndex + 1) : path;
}

function removeTrailingSlash(str: string) {
  return str.replace(/\/+$/, '');
}