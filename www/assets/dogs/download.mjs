// Downloads json file of dogs from unsplash
// https://unsplash.com/documentation#get-a-collections-photos

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const envPath = path.join(__dirname, ".env");
for (const line of fs.readFileSync(envPath, "utf-8").split("\n")) {
  if (!line || line.startsWith("#")) continue;
  const [key, ...rest] = line.split("=");
  process.env[key.trim()] = rest.join("=").trim();
}

const accessKey = process.env.UNSPLASH_ACCESS_KEY;

if (!accessKey) {
  console.error("Missing UNSPLASH_ACCESS_KEY in .env file next to script.");
  process.exit(1);
}

const collectionId = "3745150";

const requestOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Client-ID ${accessKey}`,
  },
  redirect: "follow"
};


let page = 0;

let allData = [];
let totalPages = Infinity;

while (page <= totalPages) {
  const url = new URL(`https://api.unsplash.com/collections/${collectionId}/photos`);
  url.searchParams.append("per_page", "30");
  url.searchParams.append("page", page + 1);

  const res = await fetch(url, requestOptions);
  
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }
  
  const data = await res.json();
  allData.push(...data);

  if (totalPages === Infinity) {
    console.log("total", res.headers.get("X-Total"));
    const total = parseInt(res.headers.get("X-Total", 1));
    console.log("total is", total);
    const perPage = parseInt(res.headers.get("X-Per-Page", 10));
    totalPages = Math.ceil(total / perPage);
  }

  page = page + 1;
  console.log(`Fetched page ${page} / ${totalPages}`);
}

const outputPath = path.join(__dirname, "dogs.json");

fs.writeFileSync(outputPath, JSON.stringify(allData, null, 2), "utf-8");
console.log("✅ Saved to dogs.json");
