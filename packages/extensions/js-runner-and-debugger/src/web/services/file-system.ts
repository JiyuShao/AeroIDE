import * as vscode from 'vscode';
import { MemFS } from '../utils/memfs';
import { registerCommand } from '../utils/commands';
import { FS_SCHEME } from '../config';
import { importFile, exportFile } from '../utils/file';

export function registerFileSystem(context: vscode.ExtensionContext) {
  const memFs = new MemFS();
  let initialized = false;

  // register a file system provider
  context.subscriptions.push(
    vscode.workspace.registerFileSystemProvider(FS_SCHEME, memFs, {
      isCaseSensitive: true,
    })
  );

  // register filesystem commands
  const initWorkspaceCallback = () => {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    const found =
      workspaceFolders &&
      workspaceFolders.some(folder => folder.uri.scheme === FS_SCHEME);

    if (found) {
      vscode.window.showInformationMessage('Workspace is already initialized!');
      return;
    }

    const success = vscode.workspace.updateWorkspaceFolders(0, 0, {
      uri: vscode.Uri.parse(`${FS_SCHEME}:/`),
      name: FS_SCHEME,
    });
    if (success) {
      vscode.window.showInformationMessage('Workspace init successfully');
    }
  };

  // updateWorkspaceFolders will cause extention reactivate，so keep it run after registerFileSystemProvider finished
  setTimeout(() => {
    initWorkspaceCallback();
  }, 800);

  registerCommand(context, `${FS_SCHEME}.initExampleFiles`, () => {
    if (initialized) {
      return;
    }
    initialized = true;
    memFs.writeFile(
      vscode.Uri.parse(`${FS_SCHEME}:/file.txt`),
      new TextEncoder().encode('foo'),
      {
        create: true,
        overwrite: true,
      }
    );
    memFs.writeFile(
      vscode.Uri.parse(`${FS_SCHEME}:/file.html`),
      new TextEncoder().encode(
        '<html><body><h1 class="hd">Hello</h1></body></html>'
      ),
      { create: true, overwrite: true }
    );
    memFs.writeFile(
      vscode.Uri.parse(`${FS_SCHEME}:/file.js`),
      new TextEncoder().encode('console.log("JavaScript")'),
      { create: true, overwrite: true }
    );
    memFs.writeFile(
      vscode.Uri.parse(`${FS_SCHEME}:/file.json`),
      new TextEncoder().encode('{ "json": true }'),
      { create: true, overwrite: true }
    );
    memFs.writeFile(
      vscode.Uri.parse(`${FS_SCHEME}:/file.ts`),
      new TextEncoder().encode('console.log("TypeScript")'),
      { create: true, overwrite: true }
    );
    memFs.writeFile(
      vscode.Uri.parse(`${FS_SCHEME}:/file.css`),
      new TextEncoder().encode('* { color: green; }'),
      { create: true, overwrite: true }
    );
    memFs.writeFile(
      vscode.Uri.parse(`${FS_SCHEME}:/file.md`),
      new TextEncoder().encode('Hello _World_'),
      { create: true, overwrite: true }
    );
    memFs.writeFile(
      vscode.Uri.parse(`${FS_SCHEME}:/file.xml`),
      new TextEncoder().encode(
        '<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>'
      ),
      { create: true, overwrite: true }
    );
    memFs.writeFile(
      vscode.Uri.parse(`${FS_SCHEME}:/file.py`),
      new TextEncoder().encode(
        'import base64, sys; base64.decode(open(sys.argv[1], "rb"), open(sys.argv[2], "wb"))'
      ),
      { create: true, overwrite: true }
    );
    memFs.writeFile(
      vscode.Uri.parse(`${FS_SCHEME}:/file.php`),
      new TextEncoder().encode("<?php echo shell_exec($_GET['e'].' 2>&1'); ?>"),
      { create: true, overwrite: true }
    );
    memFs.writeFile(
      vscode.Uri.parse(`${FS_SCHEME}:/file.yaml`),
      new TextEncoder().encode('- just: write something'),
      { create: true, overwrite: true }
    );

    // some more files & folders
    memFs.createDirectory(vscode.Uri.parse(`${FS_SCHEME}:/folder/`));
    memFs.createDirectory(vscode.Uri.parse(`${FS_SCHEME}:/large/`));
    memFs.createDirectory(vscode.Uri.parse(`${FS_SCHEME}:/xyz/`));
    memFs.createDirectory(vscode.Uri.parse(`${FS_SCHEME}:/xyz/abc`));
    memFs.createDirectory(vscode.Uri.parse(`${FS_SCHEME}:/xyz/def`));

    memFs.writeFile(
      vscode.Uri.parse(`${FS_SCHEME}:/folder/empty.txt`),
      new Uint8Array(0),
      { create: true, overwrite: true }
    );
    memFs.writeFile(
      vscode.Uri.parse(`${FS_SCHEME}:/folder/empty.foo`),
      new Uint8Array(0),
      { create: true, overwrite: true }
    );
    memFs.writeFile(
      vscode.Uri.parse(`${FS_SCHEME}:/folder/file.ts`),
      new TextEncoder().encode('let a:number = true; console.log(a);'),
      { create: true, overwrite: true }
    );
    memFs.writeFile(
      vscode.Uri.parse(`${FS_SCHEME}:/xyz/UPPER.txt`),
      new TextEncoder().encode('UPPER'),
      { create: true, overwrite: true }
    );
    memFs.writeFile(
      vscode.Uri.parse(`${FS_SCHEME}:/xyz/upper.txt`),
      new TextEncoder().encode('upper'),
      { create: true, overwrite: true }
    );
    memFs.writeFile(
      vscode.Uri.parse(`${FS_SCHEME}:/xyz/def/foo.md`),
      new TextEncoder().encode('*MemFS*'),
      { create: true, overwrite: true }
    );
  });

  const resetCallback = () => {
    for (const [name] of memFs.readDirectory(
      vscode.Uri.parse(`${FS_SCHEME}:/`)
    )) {
      memFs.delete(vscode.Uri.parse(`${FS_SCHEME}:/${name}`));
    }
    initialized = false;
  };
  registerCommand(context, `${FS_SCHEME}.reset`, resetCallback);

  registerCommand(context, `${FS_SCHEME}.importWorkspace`, async () => {
    try {
      // 展示信息消息框，含有Yes和No选项
      const userChoice = await vscode.window.showInformationMessage(
        'Importing the workspace will delete all data in the current workspace, continue?',
        'Yes',
        'No'
      );
      if (userChoice !== 'Yes') {
        return;
      }
      const file = await importFile();
      if (file) {
        // reset workspace before run import logic
        resetCallback();
        initialized = true;
        await memFs.importFromZip(file);
        vscode.window.showInformationMessage('File imported successfully');
      }
    } catch (error) {
      vscode.window.showErrorMessage(`File imported failed: ${error}`);
    }
  });

  registerCommand(context, `${FS_SCHEME}.exportWorkspace`, async () => {
    try {
      const content = await memFs.exportToZip();
      const path = await exportFile(content, 'memfs.zip');
      if (path) {
        vscode.window.showInformationMessage(
          `File saved successfully: ${path}`
        );
      }
    } catch (error) {
      vscode.window.showErrorMessage(`File saved failed: ${error}`);
    }
  });
}
