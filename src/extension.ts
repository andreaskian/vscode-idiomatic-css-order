import * as vscode from "vscode";

const stylelint = require("stylelint");
const config = require("stylelint-config-idiomatic-css");

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "idiomatic-css.sortSelection",
    formatSelection
  );
  context.subscriptions.push(disposable);
}

export function deactivate() {}

export async function sortSelection(text: any) {
  return stylelint.lint({
    code: text,
    config,
    configBasedir: __dirname,
    fix: true,
  });
}

async function formatSelection() {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    return;
  }

  if (editor.selections.length === 0) {
    return;
  }

  const replaces = editor.selections.map(async (selection) => {
    const input = editor.document.getText(selection);
    const { errored, output } = await sortSelection(input);
    return errored ? input : output;
  });

  const results = await Promise.all(replaces);

  editor.edit((editBuilder) => {
    editor.selections.forEach((selection, index) => {
      editBuilder.replace(selection, `${results[index]}`);
    });
  });
}
