// Verify markdown cells in notebook .html files don't accidentally render as
// indented code blocks. CommonMark treats 4+ leading spaces as <pre><code>;
// Notebook Kit dedents the cell's common leading whitespace before parsing,
// so the relevant check is "indented 4+ spaces relative to the cell's baseline".

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

        const nonEmpty = lines.filter((l) => /\S/.test(l));
        if (nonEmpty.length === 0) continue;

        // Common leading whitespace = the cell's effective dedent baseline
        const dedent = Math.min(...nonEmpty.map((l) => l.match(/^ */)[0].length));

        lines.forEach((line, i) => {
            if (/^\s*$/.test(line)) return;
            const leading = line.match(/^ */)[0].length;
            const relative = leading - dedent;
            if (relative >= 4) {
                console.error(
                    `${file}:${cellStartLine + i + 1}  markdown line indented ${relative} spaces past the cell baseline (will render as <pre><code>)`
                );
                console.error(`    ${line}`);
                bad++;
            }
        });
    }
}

if (bad > 0) {
    console.error(`\n${bad} indented markdown line(s) found.`);
    process.exit(1);
}
console.log(`OK — checked ${files.length} notebook file(s).`);
