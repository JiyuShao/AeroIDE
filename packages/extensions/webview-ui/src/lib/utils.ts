import { Package } from '../types';
import { useQuery } from 'vue-query';
import { DownloadSpeed, View } from '../enums';
import { API } from './api';
import { store, useStore } from './store';

/**
 * @link https://github.com/pastelsky/bundlephobia/blob/28bde79bad73cd1ba0797889f2b77d11aac3424c/utils/index.js#L11
 */
export const formatSize = (value: number) => {
  let unit: string;
  let size: number;
  if (Math.log10(value) < 3) {
    unit = 'B';
    size = value;
  } else if (Math.log10(value) < 6) {
    unit = 'kB';
    size = value / 1024;
  } else {
    unit = 'MB';
    size = value / 1024 / 1024;
  }

  return {
    unit,
    size,
    toString: () => `${size.toFixed(1)} ${unit}`,
  };
};

/**
 * @link https://github.com/pastelsky/bundlephobia/blob/28bde79bad73cd1ba0797889f2b77d11aac3424c/utils/index.js#L27
 */
export const formatTime = (value: number) => {
  let unit: string;
  let size: number;
  if (value < 0.0005) {
    unit = 'μs';
    size = Math.round(value * 1_000_000);
  } else if (value < 0.5) {
    unit = 'ms';
    size = Math.round(value * 1000);
  } else {
    unit = 's';
    size = value;
  }

  return { unit, size };
};

/**
 * @link https://github.com/pastelsky/bundlephobia/blob/28bde79bad73cd1ba0797889f2b77d11aac3424c/utils/index.js#L50
 */
export const getTimeFromSize = (sizeInBytes: number) => {
  return {
    slow3G: sizeInBytes / 1024 / DownloadSpeed.Slow3G,
    fast3G: sizeInBytes / 1024 / DownloadSpeed.Fast3G,
    slow4G: sizeInBytes / 1024 / DownloadSpeed.Slow4G,
    fast4G: sizeInBytes / 1024 / DownloadSpeed.Fast4G,
  };
};

export function getTypingsPackageName(packageName: string) {
  if (packageName.startsWith('@types/')) {
    return '';
  }
  return `@types/${packageName.replace(/^@/, '').replace(/\//g, '__')}`;
}

export const withUpdate = async (
  packageName: string | string[] | undefined,
  callback: () => Promise<void>
) => {
  if (!packageName) {
    return;
  }
  if (Array.isArray(packageName)) {
    packageName.forEach(name => store.commit('addUpdatingPackage', name));
  } else {
    store.commit('addUpdatingPackage', packageName);
  }
  await callback();
  if (Array.isArray(packageName)) {
    packageName.forEach(name => store.commit('deleteUpdatingPackage', name));
  } else {
    store.commit('deleteUpdatingPackage', packageName);
  }
};

export const groupPackageJsonFiles = (files: string[]) => {
  return files.reduce((groups, item) => {
    item = item.replace('\\', '/');
    const parts = item.split('/');
    const group = groups.find(el => el.group === parts[0]);
    if (parts[0] === 'package.json') {
      groups.push({
        label: 'package.json',
        value: 'package.json',
      });
      return groups;
    }
    if (!group) {
      groups.push({
        group: parts[0],
        children: [
          {
            label: parts.slice(1).join('/').replace('/package.json', ''),
            value: item,
          },
        ],
      });
    } else {
      group.children?.push({
        label: parts.slice(1).join('/').replace('/package.json', ''),
        value: item,
      });
    }

    return groups;
  }, [] as any[]);
};

export const kFormat = (num: number) => {
  const abs = Math.abs(num);
  const sign = Math.sign(num);
  const value =
    abs > 9_999_999
      ? `${(sign * (abs / 1_000_000)).toFixed(0)}M`
      : abs > 999_999
        ? `${(sign * (abs / 1_000_000)).toFixed(1).replace(/\.0$/, '')}M`
        : abs > 9999
          ? `${(sign * (abs / 1000)).toFixed(0)}K`
          : abs > 999
            ? `${(sign * (abs / 1000)).toFixed(1).replace(/\.0$/, '')}K`
            : (sign * abs).toFixed(0);
  return String(value);
};

export const isSupportedVersion = (version: string) => {
  return (
    /^file:|^link:|^https?:|^git:|^git\+|^github:|^gist:|^bitbucket:|^gitlab:/.test(
      version
    ) === false
  );
};
