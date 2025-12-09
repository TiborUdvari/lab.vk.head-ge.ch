#!/usr/bin/env node
// Usage: node scripts/ig-decode-content.mjs file_or_folder

import fs from "fs";
import path from "path";
import { exit } from "process";

if (process.argv.length < 3) {
  console.error("Usage: node ig-decode-content.mjs <file-or-folder>");
  process.exit(1);
}

const inputPath = process.argv[2];

// ---- helper: try decode string ----
function tryDecodeString(value, file, pathStr) {
  try {
    const decoded = Buffer.from(value, "latin1").toString("utf8");

    if (decoded.includes("�")) {
      console.log("-------------------------")
      console.log("value", value);
      console.log("decoded", decoded)
      console.log("+++++++++++++++++++++++++")
      console.error("Attempt to double decode, exiting ...")
      exit();
    }
    // if (decoded !== value) {
    //   console.error(`Decoding mismatch at ${pathStr} in ${file} ${value}`);
    //   return value;
    // }

    return decoded;
  } catch (err) {
    console.error(`Exception decoding ${pathStr} in ${file}: ${err.message}`);
    return value;
  }
}

// ---- recursive walk ----
function decodeRecursively(node, file, currentPath, markChanged) {
  if (typeof node === "string") {
    const decoded = tryDecodeString(node, file, currentPath);
    if (decoded !== node) markChanged.changed = true;
    return decoded;
  }

  if (Array.isArray(node)) {
    return node.map((v, i) =>
      decodeRecursively(v, file, `${currentPath}[${i}]`, markChanged),
    );
  }

  if (node !== null && typeof node === "object") {
    const result = {};
    for (const key of Object.keys(node)) {
      result[key] = decodeRecursively(
        node[key],
        file,
        `${currentPath}.${key}`,
        markChanged,
      );
    }
    return result;
  }

  return node; // number, boolean, null
}

// ---- process JSON file ----
function processFile(file) {
  console.log("Decoding file");
  try {
    const json = JSON.parse(fs.readFileSync(file, "utf8"));
    const markChanged = { changed: false };

    const decoded = decodeRecursively(json, file, "$", markChanged);

    if (markChanged.changed) {
      fs.writeFileSync(file, JSON.stringify(decoded, null, 2), "utf8");
      console.log(`Decoded strings in ${file}`);
    }
  } catch (err) {
    console.error(`Failed to process ${file}: ${err.message}`);
  }
}

// ---- file or directory ----
if (fs.statSync(inputPath).isDirectory()) {
  for (const f of fs.readdirSync(inputPath)) {
    if (f.endsWith(".json")) {
      processFile(path.join(inputPath, f));
    }
  }
} else {
  processFile(inputPath);
}
