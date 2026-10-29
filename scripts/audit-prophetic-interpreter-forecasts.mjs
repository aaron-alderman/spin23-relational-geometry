import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const inputPath = resolve(root, "evidence/data/prophetic-interpreter-forecasts-v0.json");
const outputPath = resolve(root, "evidence/data/prophetic-interpreter-forecasts-v0-result.json");
const registry = JSON.parse(await readFile(inputPath, "utf8"));

const closed = registry.records.filter((record) => record.outcome !== "censored");
const exactTerminal = closed.filter((record) => record.operatorFamily.includes("terminal") || record.operatorFamily === "visionary_exact_horizon");
const outcomeCounts = Object.fromEntries(["match", "partial", "miss", "censored"].map((outcome) => [
  outcome,
  registry.records.filter((record) => record.outcome === outcome).length
]));

const result = {
  protocol: registry.protocol,
  generatedAt: registry.date,
  recordCount: registry.records.length,
  closedRecordCount: closed.length,
  outcomeCounts,
  exactTerminalControl: {
    recordCount: exactTerminal.length,
    matchCount: exactTerminal.filter((record) => record.outcome === "match").length,
    partialCount: exactTerminal.filter((record) => record.outcome === "partial").length,
    missCount: exactTerminal.filter((record) => record.outcome === "miss").length,
    interpretation: "In this deliberately selected failure-control registry, exact terminal date operators have no successes. This is a repair-sensitivity control, not a population estimate."
  },
  partialRecords: closed.filter((record) => record.outcome === "partial").map((record) => record.id),
  censoredRecords: registry.records.filter((record) => record.outcome === "censored").map((record) => record.id),
  rankingIdentified: false,
  decision: "The control lane demonstrates the necessity of frozen event predicates and repair ledgers. It does not yet supply a representative or common-task operator tournament."
};

if (process.argv.includes("--write")) {
  await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
}

console.log(JSON.stringify(result, null, 2));

