/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
// Reference: https://github.com/microsoft/vscode/blob/main/src/vs/base/common/strings.ts

export function escapeRegExpCharacters(value: string): string {
  // eslint-disable-next-line no-useless-escape
  return value.replace(/[\\\{\}\*\+\?\|\^\$\.\[\]\(\)]/g, '\\$&');
}

/**
 * Removes all occurrences of needle from the beginning and end of haystack.
 * @param haystack string to trim
 * @param needle the thing to trim (default is a blank)
 */
export function trim(haystack: string, needle: string = ' '): string {
  const trimmed = ltrim(haystack, needle);
  return rtrim(trimmed, needle);
}

/**
 * Removes all occurrences of needle from the beginning of haystack.
 * @param haystack string to trim
 * @param needle the thing to trim
 */
export function ltrim(haystack: string, needle: string): string {
  if (!haystack || !needle) {
    return haystack;
  }

  const needleLen = needle.length;
  if (needleLen === 0 || haystack.length === 0) {
    return haystack;
  }

  let offset = 0;

  while (haystack.indexOf(needle, offset) === offset) {
    offset = offset + needleLen;
  }
  return haystack.substring(offset);
}
/**
 * Removes all occurrences of needle from the end of haystack.
 * @param haystack string to trim
 * @param needle the thing to trim
 */
export function rtrim(haystack: string, needle: string): string {
  if (!haystack || !needle) {
    return haystack;
  }

  const needleLen = needle.length,
    haystackLen = haystack.length;

  if (needleLen === 0 || haystackLen === 0) {
    return haystack;
  }

  let offset = haystackLen,
    idx = -1;

  while (true) {
    idx = haystack.lastIndexOf(needle, offset - 1);
    if (idx === -1 || idx + needleLen !== offset) {
      break;
    }
    if (idx === 0) {
      return '';
    }
    offset = idx;
  }

  return haystack.substring(0, offset);
}
