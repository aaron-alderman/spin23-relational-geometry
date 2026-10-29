import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const date = "2026-10-28";
const inputs = [
  "evidence/data/prophetic-admissibility-pilot-v0.json",
  "evidence/data/prophetic-interpreter-forecasts-v0.json",
  "evidence/data/biblical-time-transform-register-v0.json",
  "evidence/data/prophetic-major-candidates-v0.json",
  "evidence/data/prophetic-historical-sensitivity-v0.json",
  "evidence/data/prophecy-text-groups-v1.json",
  "evidence/data/prophecy-element-catalogue-noncanonical-v1.json",
  "evidence/data/prophecy-group-weight-profiles-v1.json"
  ,"evidence/data/newton-combinatorial-input-v1.json"
  ,"evidence/data/prophecy-chronology-registry-v1.json"
];
const outputPath = resolve(root, "evidence/data/prophetic-source-audit-v0.json");

const rules = [
  { pattern: /biblegateway\.com|classic\.net\.bible\.org/, sourceClass: "scriptural-text-translation", independenceRole: "source-text" },
  { pattern: /newtonproject\.ox\.ac\.uk|josephsmithpapers\.org/, sourceClass: "primary-source-critical-edition", independenceRole: "forecast-source" },
  { pattern: /144000\.com|archive\.org|commons\.wikimedia\.org/, sourceClass: "primary-source-third-party-scan", independenceRole: "forecast-source" },
  { pattern: /apnews\.com|abc\.net\.au/, sourceClass: "news-report", independenceRole: "outcome-or-reception" },
  { pattern: /exeter-cathedral\.org\.uk|campuspress\.yale\.edu/, sourceClass: "institutional-secondary-source", independenceRole: "outcome-or-reception" },
  { pattern: /ethiopianorthodox\.org/, sourceClass: "community-canonical-source", independenceRole: "canon-membership" },
  { pattern: /britannica\.com/, sourceClass: "reference-source", independenceRole: "canon-membership" },
  { pattern: /gnosis\.org/, sourceClass: "primary-text-collection-portal", independenceRole: "text-and-collection-membership" },
  { pattern: /ccdl\.claremont\.edu/, sourceClass: "scholarly-reference-collection", independenceRole: "collection-membership" },
  { pattern: /academic\.oup\.com|sbl-site\.org|journals\.sagepub\.com|onlinelibrary\.wiley\.com|doi\.org|doaj\.org|uwspace\.uwaterloo\.ca|sfu\.ca|tyndalebulletin\.org|hts\.org\.za|saet\.ac\.uk|calhoun\.nps\.edu|gradlectures\.berkeley\.edu|biblicalstudies\.gospelstudies\.org\.uk|uecf\.net|s3\.amazonaws\.com/, sourceClass: "secondary-scholarship", independenceRole: "dating-or-interpretation" }
];

const consumersByUrl = new Map();
function walk(value, file, pointer = "") {
  if (typeof value === "string" && /^https?:\/\//.test(value)) {
    const consumers = consumersByUrl.get(value) ?? [];
    consumers.push({ file, pointer: pointer || "/" });
    consumersByUrl.set(value, consumers);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((entry, index) => walk(entry, file, `${pointer}/${index}`));
    return;
  }
  if (value && typeof value === "object") {
    for (const [key, entry] of Object.entries(value)) {
      walk(entry, file, `${pointer}/${key.replaceAll("~", "~0").replaceAll("/", "~1")}`);
    }
  }
}

for (const file of inputs) {
  walk(JSON.parse(await readFile(resolve(root, file), "utf8")), file);
}

const sources = [...consumersByUrl.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([url, consumers]) => {
  const rule = rules.find((candidate) => candidate.pattern.test(url));
  return {
    url,
    host: new URL(url).host,
    retrievedAt: date,
    sourceClass: rule?.sourceClass ?? "unclassified",
    independenceRole: rule?.independenceRole ?? "unclassified",
    consumers
  };
});

const result = {
  protocol: "prophetic-admissibility/source-audit/0",
  generatedAt: date,
  inputs,
  sourceCount: sources.length,
  classCounts: Object.fromEntries([...new Set(sources.map((entry) => entry.sourceClass))].sort().map((sourceClass) => [
    sourceClass,
    sources.filter((entry) => entry.sourceClass === sourceClass).length
  ])),
  unclassifiedCount: sources.filter((entry) => entry.sourceClass === "unclassified").length,
  locatorCoverageComplete: sources.every((entry) => entry.consumers.length > 0 && entry.retrievedAt),
  bibliographicMetadataComplete: false,
  bibliographicBoundary: "This audit proves locator, retrieval-date, class and consumer coverage. It does not yet freeze author, title, publication date, edition or archived content hashes for every secondary source.",
  sources
};

if (process.argv.includes("--write")) {
  await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
}

console.log(JSON.stringify({
  protocol: result.protocol,
  sourceCount: result.sourceCount,
  classCounts: result.classCounts,
  unclassifiedCount: result.unclassifiedCount,
  locatorCoverageComplete: result.locatorCoverageComplete,
  bibliographicMetadataComplete: result.bibliographicMetadataComplete,
  boundary: result.bibliographicBoundary
}, null, 2));
