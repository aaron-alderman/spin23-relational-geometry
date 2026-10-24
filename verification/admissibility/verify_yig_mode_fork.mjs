import { readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const data = JSON.parse(await readFile(new URL("evidence/data/admissibility-yig-three-four-mode-fork-v1.json", root), "utf8"));
const failures = [];
const near = (a, b, tol = 1e-12) => Math.abs(a - b) <= tol;

if (data.protocol !== "admissibility-yig-three-four-mode-fork/1") failures.push("unexpected protocol");
if (!data.threeModeChain.exactStructuralResult.includes("simple eigenvalues")) failures.push("Jacobi simple-spectrum result missing");
if (data.threeModeChain.darkDimensionAtTripleResonance !== 1) failures.push("three-mode dark dimension must be one");
if (!near(data.measuredNearDoubletAudit.remotePolaritonGapKHz, 13260)) failures.push("polariton gap arithmetic drifted");
if (!near(data.measuredNearDoubletAudit.maximumAllowedPairSplittingKHz, 3.1906166487724157)) failures.push("AZ-027 pair-splitting bound drifted");
if (data.measuredNearDoubletAudit.cases.length !== 3) failures.push("expected three reported drive cases");
if (!data.measuredNearDoubletAudit.cases.every(row => row.exceedsAz027ByFactor > 1)) failures.push("a reported case unexpectedly passes AZ-027 splitting ratio");
if (data.measuredNearDoubletAudit.cases[0].spectrallyResolvedBySimpleLinewidthTest) failures.push("weak reported case should be unresolved");
if (!data.measuredNearDoubletAudit.cases.slice(1).every(row => row.spectrallyResolvedBySimpleLinewidthTest)) failures.push("strong reported cases should be resolved");
if (data.fourModeTripod.protectedDarkDimension !== 2) failures.push("four-mode tripod must have a two-dimensional kernel");
if (data.fourModeTripod.notSuppliedByCurrentExperiment.length !== 4) failures.push("current-experiment boundary incomplete");
if (data.verdict.ot012ThreeModeBranch !== "closed_for_protected_doublet_holonomy_in_the_reported_chain") failures.push("three-mode verdict drifted");
if (data.verdict.ot012FourModeBranch !== "structurally_admitted_but_hardware_and_calibration_open") failures.push("four-mode verdict drifted");

if (failures.length) {
  console.error(JSON.stringify({ result: "fail", failures }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  result: "pass",
  reportedCases: data.measuredNearDoubletAudit.cases.length,
  maximumAllowedPairSplittingKHz: data.measuredNearDoubletAudit.maximumAllowedPairSplittingKHz,
  exceedanceFactors: data.measuredNearDoubletAudit.cases.map(row => row.exceedsAz027ByFactor),
  threeModeDarkDimension: 1,
  fourModeDarkDimension: 2,
  verdict: data.verdict,
}, null, 2));
