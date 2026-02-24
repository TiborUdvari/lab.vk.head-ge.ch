import data from "../../assets/mcdonalds/mcdo.json" with { type: "json" };
import { writeFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname } from "node:path";

console.log("--------start------------");

const prompt = readFileSync("prompt.md", "utf-8");

async function analyzeReview(content) {
  try {
    const response = await fetch("http://localhost:1234/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "qwen/qwen3-4b-2507",
        messages: [
          {
            role: "system",
            content: prompt,
          },
          {
            role: "user",
            content: content,
          },
        ],
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "mcd_review_analysis",
            strict: true,
            schema: {
              type: "object",
              properties: {
                funnyScore: { type: "integer", minimum: 1, maximum: 10 },
                family: { type: "boolean" },
                girlfriend: { type: "boolean" },
                profanity: { type: "boolean" },
                typos: { type: "boolean" },
                homeless: { type: "boolean" },
                drugRelated: { type: "boolean" },
              },
              required: [
                "typos",
                "profanity",
                "absurdity",
                "funny",
                "highEffort",
                "family",
                "girlfriend",
                "creative",
                "story",
                "homeless",
                "drugRelated",
              ],
            },
          },
        },
        temperature: 0.1,
        max_tokens: 5000,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    return JSON.parse(data.choices.at(0).message.content);
  } catch (error) {
    console.error("Request failed:", error);
  }
}

for (const row of data) {
  const id = row.reviewer_id;
  const review = row.review;

  const filePath = `data/${id}.json`;
  const fileExits = existsSync(filePath);
  if (fileExits) {
    continue;
  }

  let result = {
    typos: false,
    profanity: false,
    absurdity: 1,
    funny: 1,
    highEffort: 1,
    family: 1,
    girlfriend: true,
    creative: false,
    story: 1,
    homeless: false,
    drugRelated: false,
    parsed: false,
  };

  try {
    console.log("Analyzing ", id, review);
    result = await analyzeReview(review);
    result = { ...result, parsed: true };
  } catch (err) {
    console.log("had error w. data", err);
  }

  mkdirSync(dirname(filePath), { recursive: true });
  console.log("result", result)
  writeFileSync(filePath, JSON.stringify(result));
}
