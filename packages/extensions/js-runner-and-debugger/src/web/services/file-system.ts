import * as vscode from 'vscode';
import { MemFS } from '../utils/memfs';
import { registerCommand } from '../utils/commands';

export function registerFileSystem(context: vscode.ExtensionContext) {
  const memFs = new MemFS();
  let initialized = false;

  // register a file system provider
  context.subscriptions.push(
    vscode.workspace.registerFileSystemProvider('memfs', memFs, {
      isCaseSensitive: true,
    })
  );

  // add workspace root folder, this will cause extention reactivate，so keep it only run once
  vscode.workspace.updateWorkspaceFolders(0, 0, {
    uri: vscode.Uri.parse('memfs:/'),
    name: 'MemFS Workspace',
  });

  // register filesystem commands
  registerCommand(context, 'init', () => {
    if (initialized) {
      return;
    }
    initialized = true;
    memFs.writeFile(
      vscode.Uri.parse(`memfs:/file.txt`),
      new TextEncoder().encode('foo'),
      {
        create: true,
        overwrite: true,
      }
    );
    memFs.writeFile(
      vscode.Uri.parse(`memfs:/file.html`),
      new TextEncoder().encode(
        '<html><body><h1 class="hd">Hello</h1></body></html>'
      ),
      { create: true, overwrite: true }
    );
    memFs.writeFile(
      vscode.Uri.parse(`memfs:/file.js`),
      new TextEncoder().encode('console.log("JavaScript")'),
      { create: true, overwrite: true }
    );
    memFs.writeFile(
      vscode.Uri.parse(`memfs:/file.json`),
      new TextEncoder().encode('{ "json": true }'),
      { create: true, overwrite: true }
    );
    memFs.writeFile(
      vscode.Uri.parse(`memfs:/file.ts`),
      new TextEncoder().encode('console.log("TypeScript")'),
      { create: true, overwrite: true }
    );
    memFs.writeFile(
      vscode.Uri.parse(`memfs:/file.css`),
      new TextEncoder().encode('* { color: green; }'),
      { create: true, overwrite: true }
    );
    memFs.writeFile(
      vscode.Uri.parse(`memfs:/file.md`),
      new TextEncoder().encode('Hello _World_'),
      { create: true, overwrite: true }
    );
    memFs.writeFile(
      vscode.Uri.parse(`memfs:/file.xml`),
      new TextEncoder().encode(
        '<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>'
      ),
      { create: true, overwrite: true }
    );
    memFs.writeFile(
      vscode.Uri.parse(`memfs:/file.py`),
      new TextEncoder().encode(
        'import base64, sys; base64.decode(open(sys.argv[1], "rb"), open(sys.argv[2], "wb"))'
      ),
      { create: true, overwrite: true }
    );
    memFs.writeFile(
      vscode.Uri.parse(`memfs:/file.php`),
      new TextEncoder().encode("<?php echo shell_exec($_GET['e'].' 2>&1'); ?>"),
      { create: true, overwrite: true }
    );
    memFs.writeFile(
      vscode.Uri.parse(`memfs:/file.yaml`),
      new TextEncoder().encode('- just: write something'),
      { create: true, overwrite: true }
    );

    // some more files & folders
    memFs.createDirectory(vscode.Uri.parse(`memfs:/folder/`));
    memFs.createDirectory(vscode.Uri.parse(`memfs:/large/`));
    memFs.createDirectory(vscode.Uri.parse(`memfs:/xyz/`));
    memFs.createDirectory(vscode.Uri.parse(`memfs:/xyz/abc`));
    memFs.createDirectory(vscode.Uri.parse(`memfs:/xyz/def`));

    memFs.writeFile(
      vscode.Uri.parse(`memfs:/folder/empty.txt`),
      new Uint8Array(0),
      { create: true, overwrite: true }
    );
    memFs.writeFile(
      vscode.Uri.parse(`memfs:/folder/empty.foo`),
      new Uint8Array(0),
      { create: true, overwrite: true }
    );
    memFs.writeFile(
      vscode.Uri.parse(`memfs:/folder/file.ts`),
      new TextEncoder().encode('let a:number = true; console.log(a);'),
      { create: true, overwrite: true }
    );
    memFs.writeFile(
      vscode.Uri.parse(`memfs:/large/rnd.foo`),
      randomData(50000),
      { create: true, overwrite: true }
    );
    memFs.writeFile(
      vscode.Uri.parse(`memfs:/xyz/UPPER.txt`),
      new TextEncoder().encode('UPPER'),
      { create: true, overwrite: true }
    );
    memFs.writeFile(
      vscode.Uri.parse(`memfs:/xyz/upper.txt`),
      new TextEncoder().encode('upper'),
      { create: true, overwrite: true }
    );
    memFs.writeFile(
      vscode.Uri.parse(`memfs:/xyz/def/foo.md`),
      new TextEncoder().encode('*MemFS*'),
      { create: true, overwrite: true }
    );
  });

  registerCommand(context, 'reset', () => {
    for (const [name] of memFs.readDirectory(vscode.Uri.parse('memfs:/'))) {
      memFs.delete(vscode.Uri.parse(`memfs:/${name}`));
    }
    initialized = false;
  });
}

function randomData(lineCnt: number, lineLen = 155): Uint8Array {
  const lines: string[] = [];
  for (let i = 0; i < lineCnt; i++) {
    let line = '';
    while (line.length < lineLen) {
      line += Math.random()
        .toString(2 + (i % 34))
        .substr(2);
    }
    lines.push(line.substr(0, lineLen));
  }
  return new TextEncoder().encode(lines.join('\n'));
}
