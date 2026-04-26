// Verify markdown cells in notebook .html files are flush-left.
// CommonMark treats 4+ leading spaces as an indented code block, so any
// indented markdown cell renders as <pre><code> instead of prose.

import {readdirSync, readFileSync} from "node:fs";
import {fileURLToPath} from "node:url";
import {dirname, join} from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const files = readdirSync(here).filter((f) => f.endsWith(".html"));
const cellRe = /<script\s+type="text\/markdown"[^>]*>([\s\S]*?)<\/script>/g;

let bad = 0;
for (const file of files) {
    const src = readFileSync(join(here, file), "utf8");
    let match;
    while ((match = cellRe.exec(src)) !== null) {
        const cellStartLine = src.slice(0, match.index).split("\n").length;
        const lines = match[1].split("\n");
        lines.forEach((line, i) => {
            if (/^\s*$/.test(line)) return;
            if (/^ {4,}\S/.test(line)) {
                console.error(
                    `${file}:${cellStartLine + i + 1}  markdown cell line is indented 4+ spaces (will render as <pre><code>)`
                );
                console.error(`    ${line}`);
                bad++;
            }
        });
    }
}

if (bad > 0) {
    console.error(`\n${bad} indented markdown line(s) found. Move them flush-left.`);
    process.exit(1);
}
console.log(`OK — checked ${files.length} notebook file(s).`);
