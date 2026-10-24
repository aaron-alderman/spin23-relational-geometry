import { readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const data = JSON.parse(await readFile(new URL("evidence/data/admissibility-photonic-selector-chip-sweep-v1.json", root), "utf8"));
const failures = [];
const near = (a, b, tol = 1e-10) => Math.abs(a - b) <= tol;

if (data.protocol !== "admissibility-photonic-selector-chip-sweep/1") failures.push("unexpected protocol");
if (!data.model.scope.includes("not a fabrication certificate")) failures.push("scope must deny fabrication certification");
if (!near(data.corpusBudget.minimumCouplingLengthProduct, 207.79682205165204)) failures.push("coupling-length threshold drifted");
if (!near(data.corpusBudget.couplingRequiredForPublishedLengthPerMillimetre, 346.3280367527534)) failures.push("published-footprint conversion drifted");
if (data.publishedAnchor.notReportedInRequiredForm.length !== 3) failures.push("missing published-data firewall");
if (data.sweep.length !== 80) failures.push(`expected 80 sweep rows, found ${data.sweep.length}`);

const [forward, reverse] = data.baseline;
if (!forward || !reverse || forward.orientation !== 1 || reverse.orientation !== -1) failures.push("baseline reversal pair missing");
for (const row of data.baseline) {
  if (row.adiabaticEstimate > 0.02) failures.push("baseline misses adiabatic budget");
  if (row.relativeSplittingAccumulation > 0.05) failures.push("baseline misses splitting budget");
  if (row.differentialLossAccumulation > 0.05) failures.push("baseline misses loss budget");
  if (row.darkSubspacePowerRetention < 0.999) failures.push("baseline dark retention unexpectedly low");
  if (row.logSingularValueRatio > 0.05) failures.push("baseline nonunitarity exceeds budget");
  if (row.phaseBlindProjectiveQuarterTurnFidelity < 0.999) failures.push("baseline quarter-turn fit unexpectedly low");
  if (!row.phaseBlindSignDegeneracy) failures.push("phase-blind sign degeneracy must remain explicit");
}
for (let i = 0; i < 2; i += 1) {
  if (!near(forward.orientedAntisymmetricAmplitude[i], -reverse.orientedAntisymmetricAmplitude[i], 1e-9)) failures.push("reference-anchored orientation amplitude does not reverse");
}
if (data.fabricationPathGate.verdict !== "signed-coupling-schedule-not-yet-fabrication-native") failures.push("signed-coupling fabrication gate missing");
if (data.selectorCompatibility.verdict !== "separate-stage-required") failures.push("selector/holonomy separation gate missing");
if (!near(data.twoModuleAlternative.retainedPowerIfEachModuleRetains095, 0.9025)) failures.push("two-module retention arithmetic drifted");

if (failures.length) {
  console.error(JSON.stringify({ result: "fail", failures }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  result: "pass",
  sweepRows: data.sweep.length,
  minimumCouplingLengthProduct: data.corpusBudget.minimumCouplingLengthProduct,
  baselineDarkRetention: forward.darkSubspacePowerRetention,
  baselineNonunitarity: forward.logSingularValueRatio,
  baselineProjectiveQuarterTurnFidelity: forward.phaseBlindProjectiveQuarterTurnFidelity,
  physicalVerdict: "coupled-mode feasibility only; signed-coupling, full-wave, tolerance, measured-rate and selector-stage gates remain",
}, null, 2));
