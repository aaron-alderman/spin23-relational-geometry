import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const inputPath = resolve(root, "evidence/data/biblical-time-transform-register-v0.json");
const outputPath = resolve(root, "evidence/data/biblical-time-transform-ranking-v0.json");
const registry = JSON.parse(await readFile(inputPath, "utf8"));

const authorityIndex = new Map(registry.authorityOrder.map((name, index) => [name, index + 1]));
const ranking = registry.transforms
  .map((transform) => ({
    id: transform.id,
    authority: transform.authority,
    textualAuthorityRank: authorityIndex.get(transform.authority),
    scope: transform.scope,
    globalChronologyLicense: transform.globalChronologyLicense,
    sourceCount: transform.sources.length
  }))
  .sort((a, b) => a.textualAuthorityRank - b.textualAuthorityRank || a.id.localeCompare(b.id));

const result = {
  protocol: registry.protocol,
  generatedAt: registry.date,
  rankingType: "ordinal textual authority; not probability and not predictive performance",
  ranking,
  globalChronologyOperators: ranking.filter((entry) => entry.globalChronologyLicense).map((entry) => entry.id),
  candidateFamilies: registry.candidateFamilies,
  decision: "Biblical texts license several local or genre-bounded temporal relations, but the register supplies no universal day--year or day--millennium conversion rule."
};

if (process.argv.includes("--write")) {
  await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
}

console.log(JSON.stringify(result, null, 2));

