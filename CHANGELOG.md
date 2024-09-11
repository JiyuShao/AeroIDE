## 0.0.1 (2024-09-09)


### Bug Fixes

* **logger:** add logger & fix vscode task bug ([3bff1e3](https://github.com/JiyuShao/AeroIDE/commit/3bff1e377f24492609032b5edd1bac11c1aa29a3))
* **memfs:** fix folder storage bug ([b65facd](https://github.com/JiyuShao/AeroIDE/commit/b65facdfa2953cbdec0239d1fd22fe20f3143370))
* **vscode extention:** fix vscode web extention cannot load cjs module bug ([7659dc6](https://github.com/JiyuShao/AeroIDE/commit/7659dc641b34d324cbe2cb9c9c827ab51ff4b373))
* **vscode-test-web:** fix vscode-test-web run-in-browser bug ([82d170f](https://github.com/JiyuShao/AeroIDE/commit/82d170f1726b707908a8a126b2f0bfb454d7c778))
* **webview:** fix load webview logic ([cb0541e](https://github.com/JiyuShao/AeroIDE/commit/cb0541e2f642865a0046ebe70c1bc68fb5d0c000))
* **workspace:** change multi-root workspace to single-folder workspace ([1e628f8](https://github.com/JiyuShao/AeroIDE/commit/1e628f8f0071afb971fa4230db707483bd9f6ad4))


### Features

* **all:** add single-root workspace check logic ([2b427f3](https://github.com/JiyuShao/AeroIDE/commit/2b427f3fc2287562594c1c19a9302cbf6fb37d7d))
* **configs:** add eslint and typescript config ([ecc50f2](https://github.com/JiyuShao/AeroIDE/commit/ecc50f25e2703f94acdb483b5b3182f384f92aad))
* **file-system:** add memfs FileSystemProvider ([3b75ff8](https://github.com/JiyuShao/AeroIDE/commit/3b75ff831151996ba610f0dcc05c65e333915a7d))
* **files:** export workspace ([d046d26](https://github.com/JiyuShao/AeroIDE/commit/d046d26f5e3bf9376f140b29ac69e895ab2e7893))
* **fs:** add import workspace from local zip file logic ([495ab20](https://github.com/JiyuShao/AeroIDE/commit/495ab202afad1871797d954130df07acfda2941c))
* **js-runner:** init js-runner vscode extention ([e725b6e](https://github.com/JiyuShao/AeroIDE/commit/e725b6e324937431dcd5ccff169e71f86983869d))
* **memfs:** add import demo workspace logic ([ff97ec1](https://github.com/JiyuShao/AeroIDE/commit/ff97ec123c7e5531bc0c66a988b5ad2f8891de5f))
* **memfs:** add memfs reset logic ([5d2e00e](https://github.com/JiyuShao/AeroIDE/commit/5d2e00eece042ed9f90c93a3a561b117f71532cb))
* **memfs:** add MemFSSearchProvider ([431c756](https://github.com/JiyuShao/AeroIDE/commit/431c7560833265f55243aafdd04497d16e3ce4f9))
* **memfs:** add path filter logic to TextSearchProvider ([f4c30fa](https://github.com/JiyuShao/AeroIDE/commit/f4c30fa5f5781157c65ab7a5c3f3b0cfac8fd7e6))
* **memfs:** finish importFromZip logic ([e4a1c56](https://github.com/JiyuShao/AeroIDE/commit/e4a1c56a390f62e665040ef623a4e47b7e17ab13))
* **memfs:** finish provideTextSearchResults logic ([f597cbc](https://github.com/JiyuShao/AeroIDE/commit/f597cbc1ca06792c58bc1b789d520f8a40f883e1))
* **npm:** add auto install npm logic ([fc8a836](https://github.com/JiyuShao/AeroIDE/commit/fc8a836e1cdc143e5bf4863a2b30f79712dd44d9))
* **npm:** add install npm logic ([ba411f2](https://github.com/JiyuShao/AeroIDE/commit/ba411f2fd7198519cc8930d102f9bbccd06c3267))
* **npm:** add load npm dependencies logic ([54429ba](https://github.com/JiyuShao/AeroIDE/commit/54429bae827176ae3aa5cb5379eba46e2b80c498))
* **npm:** add npm service to js-runner-and-debugger extention, add npm webview-ui ([100b407](https://github.com/JiyuShao/AeroIDE/commit/100b407e8153c42bd72e237a2b612bafb15a9d1d))
* **npm:** change npm project init logic ([746006a](https://github.com/JiyuShao/AeroIDE/commit/746006abaeef258e8ab896e63b5c52e29d52d14e))
* **npm:** finish npm init/install/update/delete logic ([9d0edef](https://github.com/JiyuShao/AeroIDE/commit/9d0edeff0a4d7f88fa08dd29864f1fa5ce21f62f))
* **npm:** fix npm dependencies init logic ([9d841e8](https://github.com/JiyuShao/AeroIDE/commit/9d841e8b3d3becc9b46a58f354faee0677371ca3))
* **npm:** remove dev dependencies logic ([0aa7cf7](https://github.com/JiyuShao/AeroIDE/commit/0aa7cf7958fa28f5ac8afcc3a92e2708d7718ffb))
* **project:** init project ([56b8e6c](https://github.com/JiyuShao/AeroIDE/commit/56b8e6caf61397ed25bd6f9d6e11999ac0d28e99))
* **storage:** add node storage for memfs ([7ee1e43](https://github.com/JiyuShao/AeroIDE/commit/7ee1e43bc3e0b5a619308c7ad05b69afc58f863c))
* **storage:** remove indexed-db for now ([4457367](https://github.com/JiyuShao/AeroIDE/commit/4457367b1b883f488822b923cbb993f932cd67c3))
* **terminal:** add cancel logic when user close terminal ([ef904b5](https://github.com/JiyuShao/AeroIDE/commit/ef904b58417eafd3a2d09d4a00a530ba93bb778b))
* **terminal:** add multiple terminal logic ([d22550b](https://github.com/JiyuShao/AeroIDE/commit/d22550b7405d8a1e9c5ee653cb11afbdbdfb340b))
* **ternimal:** add history command ([97825fb](https://github.com/JiyuShao/AeroIDE/commit/97825fbe9c9dfed8186503dbb0932d04e2734a5f))
* **vscode extention:** add vscode extention publish logic ([f942d52](https://github.com/JiyuShao/AeroIDE/commit/f942d52418d8ae2a29b387ce7542a32ed4196ccf))
* **wasi:** add common wasi command runner ([e8d8731](https://github.com/JiyuShao/AeroIDE/commit/e8d8731769bada58d34e5b333890ea7866027cbb))
* **wasi:** add wasi demo ([dca06df](https://github.com/JiyuShao/AeroIDE/commit/dca06dfdb61fa1fa288f27be439b81256ee1d406))
* **wasi:** add wasi.coreutils command ([2fb9fcc](https://github.com/JiyuShao/AeroIDE/commit/2fb9fcc7babe063c4fb720715bf668f40774fcd5))
* **wasm-wasi:** add wasm-wasi terminal run command logic ([1061aec](https://github.com/JiyuShao/AeroIDE/commit/1061aecedbc6bacbfa35c6be7ac0034fea34930f))
* **wasm-wasi:** upgrade @vscode/wasm-wasi to 1.0.1 ([f1f4ea2](https://github.com/JiyuShao/AeroIDE/commit/f1f4ea2d83c51a978c9e9c110d4c885909ac27e4))
* **wasm:** add wasm helloworld logic ([692cf85](https://github.com/JiyuShao/AeroIDE/commit/692cf85831a87994469dbf4e5637ff73f1fe9b3c))
* **webview-ui:** add npm dependencied ui panel ([729e829](https://github.com/JiyuShao/AeroIDE/commit/729e829c5e155d22e82e2dc05a0f5533378d508a))



