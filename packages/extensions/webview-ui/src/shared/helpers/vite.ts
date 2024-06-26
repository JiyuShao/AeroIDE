import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { resolve } from 'path';
import { v4 } from 'uuid';

type PackageName = 'npm' | 'database' | 'figma';

export const getViteConfig = (name: PackageName) => {
  return defineConfig({
    plugins: [vue()],
    resolve: {
      alias: {
        '@': resolve(__dirname, '..', '..', name, 'src'),
      },
    },
    build: {
      manifest: true,
      emptyOutDir: true,
      outDir: `../../extensions/${name}/out/ui`,
    },
    root: '.',
    server: {
      hmr: {
        host: 'localhost',
      },
    },
  });
};

declare var acquireVsCodeApi: any;

export const vscodePlugin = () => {
  const vscode = acquireVsCodeApi();

  function fetch(data: { method: string; uri: string; payload?: any }) {
    return new Promise((resolve, reject) => {
      const requestId = v4();
      const handleResponse = (message: MessageEvent<any>): void => {
        if (
          message.data.uri === data.uri &&
          message.data.method === data.method &&
          message.data.requestId === requestId
        ) {
          if (message.data.status >= 300) {
            reject(message.data.payload);
          } else {
            resolve(message.data.payload);
          }
          window.removeEventListener('message', handleResponse, false);
        }
      };
      // TODO: Handle reject
      window.addEventListener('message', handleResponse);
      const jsData = JSON.parse(JSON.stringify(data));
      vscode.postMessage({ ...jsData, requestId });
    });
  }

  fetch.get = (uri: string, payload?: any) =>
    fetch({ method: 'GET', uri, payload });
  fetch.post = (uri: string, payload?: any) =>
    fetch({ method: 'POST', uri, payload });
  fetch.put = (uri: string, payload?: any) =>
    fetch({ method: 'PUT', uri, payload });
  fetch.patch = (uri: string, payload?: any) =>
    fetch({ method: 'PATCH', uri, payload });
  fetch.delete = (uri: string, payload?: any) =>
    fetch({ method: 'delete', uri, payload });

  return { ...vscode, fetch };
};
