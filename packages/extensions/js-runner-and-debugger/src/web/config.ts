export const EXTENSION_NAME = 'js-runner-and-debugger';
export const EXTENSION_NAME_SHORT = 'JSRunner';
export const FS_SCHEME = 'memfs';
export const LOGGER_LEVEL = 0; // LogLevel.DEBUG

// 由于 updateWorkspaceFolders 会导致上一实例销毁，导致 onDidChangeWorkspaceFolders 监听失效，所以默认为 true
let extentionStatus: {
  isEnabled: boolean;
  errMsg?: string;
} = {
  isEnabled: true,
  errMsg: undefined,
};

export function setExtensionStatus(isEnabled: boolean, errMsg?: string) {
  if (isEnabled) {
    extentionStatus = {
      isEnabled: true,
      errMsg: undefined,
    };
  } else {
    extentionStatus = {
      isEnabled: false,
      errMsg,
    };
  }
}

export function getExtentionStatus() {
  return extentionStatus;
}
