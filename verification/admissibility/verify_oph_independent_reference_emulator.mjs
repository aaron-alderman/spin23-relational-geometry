import { readFileSync } from "node:fs";
import { buildReceipt } from "../../scripts/run-oph-independent-reference-emulator.mjs";

const requireCondition = (condition, message) => {
  if (!condition) throw new Error(message);
};

const path = "evidence/data/oph-independent-reference-emulator-v1.json";
const retained = JSON.parse(readFileSync(path, "utf8"));
const replayed = buildReceipt();

requireCondition(JSON.stringify(retained) === JSON.stringify(replayed), "retained emulator receipt differs from clean replay");
requireCondition(retained.independence.importsOriginalOphCode === false, "reference imports original OPH code");
requireCondition(retained.independence.comparesAgainstOriginalReceiptAtRuntime === false, "reference uses original receipt as an oracle");
requireCondition(retained.commonClassicalTable.length === 6, "classical seam-key table is incomplete");
requireCondition(retained.instrumentCompiler.pass, "named-law instrument compiler failed");
requireCondition(JSON.stringify(Object.fromEntries(Object.entries(retained.instrumentCompiler.instruments).map(([name, row]) => [name, row.recordCount]))) === JSON.stringify({ C0: 3, C: 6, E: 10, T: 12 }), "record-label counts changed");
requireCondition(Object.values(retained.instrumentCompiler.instruments).every(({ definiteCurrent, maxIsometryError }) => definiteCurrent && maxIsometryError < 1e-14), "compiled instrument is not a definite-current isometry");
requireCondition(Math.abs(retained.instrumentCompiler.instruments.C0.multipliers.g - 1 / Math.sqrt(2)) < 1e-14, "C0 multiplier mismatch");
requireCondition(Math.abs(retained.instrumentCompiler.instruments.C.multipliers.g - 0.5) < 1e-14, "C multiplier mismatch");
requireCondition(Math.abs(retained.instrumentCompiler.instruments.E.multipliers.k - 1) < 1e-14 && retained.instrumentCompiler.instruments.E.multipliers.g === 0, "E multiplier mismatch");
requireCondition(retained.instrumentCompiler.instruments.T.multipliers.k === 0, "T multiplier mismatch");
requireCondition(Math.abs(retained.schedule.adjacent.exactTotalVariation - 0.25) < 1e-15, "adjacent-order witness changed");
requireCondition(retained.schedule.disjoint.exactTotalVariation === 0, "disjoint schedules do not commute");
requireCondition(retained.decision.allHeldOutPhasePredictionsPass, "held-out phase prediction failed");
requireCondition(retained.decision.adjacentOrderPass, "sampled adjacent-order witness failed");
requireCondition(retained.decision.disjointSamplingCompatibilityPass, "sampled disjoint null is statistically incompatible");
requireCondition(retained.decision.disjointRawEngineeringThresholdPass === false, "seeded null no longer exposes the raw-threshold error");
requireCondition(retained.decision.logicalReferencePass, "logical reference did not pass");
requireCondition(retained.decision.hardwareGate5Pass === false, "logical replay improperly claims hardware completion");
requireCondition(retained.kProbe.E === 1 && retained.kProbe.T === 0.5, "k probe does not distinguish E and T");
requireCondition(retained.phase.C0_quarter.declaredG[1] < 0, "quarter-turn control is absent");

console.log(JSON.stringify({
  result: "pass",
  receipt: path,
  heldOutPhasePredictions: "pass",
  compiledRecordCounts: Object.fromEntries(Object.entries(retained.instrumentCompiler.instruments).map(([name, row]) => [name, row.recordCount])),
  adjacentExactTotalVariation: retained.schedule.adjacent.exactTotalVariation,
  disjointExactTotalVariation: retained.schedule.disjoint.exactTotalVariation,
  disjointObservedTotalVariation: retained.schedule.disjoint.observedTotalVariation,
  disjointRawEngineeringThresholdPass: retained.decision.disjointRawEngineeringThresholdPass,
  disjointSamplingCompatibilityPass: retained.decision.disjointSamplingCompatibilityPass,
  hardwareGate5Pass: retained.decision.hardwareGate5Pass
}, null, 2));
