import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const sourcePath = resolve(root, "evidence/data/prophetic-admissibility-pilot-v0.json");
const outputPath = resolve(root, "evidence/data/prophetic-admissibility-pilot-v0-result.json");

const registry = JSON.parse(await readFile(sourcePath, "utf8"));
const required = registry.admissionRule.predictiveCalibrationRequires;

const auditedCases = registry.cases.map((entry) => {
  const failedGates = required.filter((gate) => entry.gates[gate] !== true);
  return {
    id: entry.id,
    lane: entry.lane,
    authorityRung: entry.authorityRung,
    failedGates,
    predictiveCalibrationAdmitted: failedGates.length === 0,
    rejectionReceipt: entry.rejectionReceipt
  };
});

const admitted = auditedCases.filter((entry) => entry.predictiveCalibrationAdmitted);
const gateFailureCounts = Object.fromEntries(required.map((gate) => [
  gate,
  auditedCases.filter((entry) => entry.failedGates.includes(gate)).length
]));

const result = {
  protocol: registry.protocol,
  generatedAt: registry.date,
  caseCount: auditedCases.length,
  predictiveCalibrationAdmittedCount: admitted.length,
  predictiveRankingIdentified: admitted.length >= 6,
  minimumCasesForPilotSplit: 6,
  majorCandidateRankingAuthorized: false,
  gateFailureCounts,
  cases: auditedCases,
  decision: admitted.length >= 6
    ? "A split may be designed, but scoring and partitions must still be frozen before ranking."
    : "No predictive ranking is identified. Expand and provenance-close the calibration registry before fitting hermeneutic operators.",
  claimBoundary: "This audit measures source admission only; it neither validates nor falsifies divine prophecy."
};

if (process.argv.includes("--write")) {
  await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
}

console.log(JSON.stringify(result, null, 2));

