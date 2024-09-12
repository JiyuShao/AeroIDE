# CONTRIBUTING

## 快速开始

### 安装依赖&启动编译服务

```bash
# 安装依赖
pnpm install

# 开启 js-runner-and-debugger、webview-ui 编译服务
pnpm start
```

### 本地调试

#### Run Local Extension 调试

在调试面板选择 `Run Local Extension` 进行调试

#### Run Web Extention 调试

在调试面板选择 `Run Web Extension` 进行调试，实际上是无法运行的，会报以下错误：

```txt
Cannot activate the 'JS Runner & Debugger (In-browser)' extension because it depends on the 'WASI based WebAssembly Execution Engine' extension, which is not loaded. Would you like to reload the window to load the extension?
```

这个 [vscode-kcide](https://marketplace.visualstudio.com/items?itemName=floooh.vscode-kcide) 这个插件是支持 Web 的，但是本地也是无法使用 `Run Web Extension` 进行调试，应该是 `WASI based WebAssembly Execution Engine` 的实现问题

### vscode-test-web 调试

```bash
# 使用 vscode-test-web 进行调试
pnpm --filter js-runner-and-debugger run run-in-browser
```

运行命令后会有以下提示，点击 `Install and Reload` 就能使用

```txt
Cannot activate the 'JS Runner & Debugger (In-browser)' extension because it depends on the 'WASI based WebAssembly Execution Engine' extension from 'Microsoft', which is not installed. Would you like to install the extension and reload the window?
```

**注意：**
在使用 `JS Runner & Debugger: Open WASI Terminal` 功能的时候，会弹出 `SharedArrayBuffer is not defined` 报错，这个是 vscode 的同源限制，在网页链接后拼上 `?vscode-coi` 参数即可解决，详情见

- [Allow SharedArrayBuffer to be used by extensions in vscode.dev (using cross-origin isolation)](https://github.com/microsoft/vscode/issues/137884)
- [vscode-container-wasm: An Extension of VSCode on Browser for Running Containers Within Your Browser](https://medium.com/nttlabs/vscode-container-wasm-57d17dda7caa)

## 打包&发布

### 构建

```bash
pnpm run build
```

### 打包

```bash
pnpm run package
```

运行完命令后会在 `/packages/extentions/js-runner-and-debugger` 目录下生成 `js-runner-and-debugger.vsix` 文件

### 发布

```bash
pnpm run publish
```
