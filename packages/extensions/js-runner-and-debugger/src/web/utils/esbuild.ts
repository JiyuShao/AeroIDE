import * as esbuild from 'esbuild-wasm';

export async function test() {
  // 使用esbuild-wasm的初始化方法
  await esbuild.initialize({
    worker: false, // 在主线程中使用
    wasmURL: '/node_modules/esbuild-wasm/esbuild.wasm', // 声明 wasm 文件的位置
  });
  const ts = 'let test: boolean = true';
  const result = await esbuild.transform(ts, { loader: 'ts' });
  console.log('result:', result);
  return result;
}
