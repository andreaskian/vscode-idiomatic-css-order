import * as assert from "assert";

import * as vscode from "vscode";
import * as extension from "../../extension";

suite("idiomatic-css: Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");

  test("It should sort css correct", async () => {
    const input = `
	a { 
		background: orange; 
		z-index: 9; 
	}
	`;

    const expected = `
	a { 
		z-index: 9; 
		background: orange; 
	}
	`;

    const result = await extension.sortSelection(input);
    assert.strictEqual(result.output, expected);
  });

  test("It should sort css properties correct", async () => {
    const input = `\nbackground: orange;\nz-index: 9;\n`;
    const expected = `\nz-index: 9;\nbackground: orange;\n`;

    const result = await extension.sortSelection(input);
    assert.strictEqual(result.output, expected);
  });
});
