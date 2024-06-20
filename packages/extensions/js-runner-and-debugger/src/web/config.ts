import vscode, { UIKind } from 'vscode';

export const EXTENSION_NAME = 'js-runner-and-debugger';
export const EXTENSION_NAME_SHORT = 'JSRunner';
export const FS_SCHEME = 'memfs';
export const LOGGER_LEVEL = 0; // LogLevel.DEBUG
export const isWebEnv = vscode.env.uiKind === UIKind.Web;
