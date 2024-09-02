# js-runner-and-debugger README

基于浏览器的在线代码编辑器插件

## Features

- [x] 虚拟工作区
  - [x] 浏览器内虚拟文件系统
  - [x] 虚拟文件系统持久化
  - [x] 支持 ZIP 导入导出
  - [x] 支持文件搜索功能
  - [x] 支持文字搜索功能
- [x] 虚拟终端
  - [x] WASM WASI 支持
  - [x] 访问虚拟工作区文件系统
  - [x] 对接 coreutils
  - [x] 对接 esbuild
  - [x] 实现 Ctrl+C 终端命令能力
  - [x] 实现 Ctrl+L/clear 清屏能力
  - [x] 实现命令行历史记录能力
- [ ] JS 在线开发调试
  - [x] 支持 NPM 包
  - [ ] 实现 JS 在线打包逻辑
  - [ ] 实现 JS 在线运行/调试逻辑

## Release Notes

### 0.0.1

Initial release of js-runner-and-debugger
