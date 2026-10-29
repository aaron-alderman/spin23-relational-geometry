import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const inputPath = resolve(root, "evidence/data/prophetic-historical-sensitivity-v0.json");
const outputPath = resolve(root, "evidence/data/prophetic-historical-sensitivity-v0-result.json");
const registry = JSON.parse(await readFile(inputPath, "utf8"));
const values = registry.codingRule.outcomeValues;

const audited = registry.cases.map((entry) => {
  const strictPreEventByInterval = entry.sourceLayerInterval.latest < entry.outcomeInterval.earliest;
  const possiblePreEventByInterval = entry.sourceLayerInterval.earliest < entry.outcomeInterval.latest;
  const primaryEligible = entry.dateClass === "D0" && ["I3", "I4"].includes(entry.independenceClass);
  const sensitivityEligible = ["D1", "D2"].includes(entry.dateClass) && ["I2", "I3", "I4"].includes(entry.independenceClass);
  return {
    id: entry.id,
    dateClass: entry.dateClass,
    outcome: entry.outcome,
    outcomeValue: values[entry.outcome],
    strictPreEventByInterval,
    possiblePreEventByInterval,
    primaryEligible,
    sensitivityEligible,
    rivalCount: entry.rivals.length
  };
});

const sensitivity = audited.filter((entry) => entry.sensitivityEligible);
const result = {
  protocol: registry.protocol,
  generatedAt: registry.date,
  caseCount: audited.length,
  primaryEligibleCount: audited.filter((entry) => entry.primaryEligible).length,
  sensitivityEligibleCount: sensitivity.length,
  strictPreEventIntervalCount: audited.filter((entry) => entry.strictPreEventByInterval).length,
  dateClassCounts: Object.fromEntries(Object.keys(registry.codingRule.dateClasses).map((dateClass) => [
    dateClass,
    audited.filter((entry) => entry.dateClass === dateClass).length
  ])),
  sensitivityOutcomeMean: sensitivity.reduce((sum, entry) => sum + entry.outcomeValue, 0) / sensitivity.length,
  rivalModelCount: audited.reduce((sum, entry) => sum + entry.rivalCount, 0),
  cases: audited,
  decision: "A historical-critical sensitivity set exists, but no D0 manuscript-secure case is present. Its annotated outcome mean cannot be promoted into a predictive success rate.",
  authorityBoundary: registry.codingRule.warning
};

if (process.argv.includes("--write")) {
  await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
}

console.log(JSON.stringify(result, null, 2));

