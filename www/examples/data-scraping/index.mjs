import {
  writeFileSync,
  existsSync,
  mkdirSync,
  globSync,
  readSync,
  readFileSync,
} from "node:fs";
import { dirname } from "node:path";
import { exit } from "node:process";
import * as cheerio from "cheerio";
import slugify from "slugify";
let pageNumbers = 23;

// Download the html pages
for (let i = 1; i <= pageNumbers; i++) {
  let url = `https://www.nopasaran.ch/fr-CH?page=${i}`;

  const filePath = `web/${i}.html`;
  const fileExits = existsSync(filePath);
  if (fileExits) {
    continue;
  }

  let response = await fetch(url);
  const html = await response.text();

  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, html);
}

const filePaths = globSync("web/*.html");

for (const filePath of filePaths) {
  const text = readFileSync(filePath, "utf-8");
  const $ = cheerio.load(text);
  const data = $.extract({
    articles: [
      {
        selector: "ul li", // Each link is our "container" for one item
        value: {
          url: {
            selector: "a", // Current element
            value: "href",
          },
          title: "p.text-lg",
          date: "div.text-gray-300",
        },
      },
    ],
  });
  for (const article of data.articles) {
    const { title, url } = article;
    const filePath = `articles/${slugify(title)}.html`;
    const fileExits = existsSync(filePath);
    if (fileExits) {
      continue;
    }

    let response = await fetch("https://www.nopasaran.ch" + url);
    const html = await response.text();

    mkdirSync(dirname(filePath), { recursive: true });
    writeFileSync(filePath, html);
  }
}

const articleFilePaths = globSync("articles/*.html");

let entries = [];
for (const filePath of articleFilePaths) {
  const text = readFileSync(filePath, "utf-8");
  const $ = cheerio.load(text);
  const data = $.extract({
    title: "h1",
    date: "div.w-full>div.flex>div.flex>span",
    name: "aside h3",
    role: "aside h3+p",
    img: {
      selector: "aside img",
      value: "src",
    },
    party: "aside p.text-center.text-sm.text-gray-300",
  });
  entries = [...entries, data];
}

const filePath = "no-pasarin.json";
const fileExits = existsSync(filePath);
if (!fileExits) {
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, JSON.stringify(entries));
}
