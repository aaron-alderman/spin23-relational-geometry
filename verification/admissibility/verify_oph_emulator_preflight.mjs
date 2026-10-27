import { readFileSync } from "node:fs";

const data = JSON.parse(readFileSync("evidence/data/oph-emulator-preflight-v1.json", "utf8"));
const requireCondition = (condition, message) => {
  if (!condition) throw new Error(message);
};
const hoeffding = (delta, alpha) => Math.ceil(8 * Math.log(4 / alpha) / delta ** 2);

const probabilities = data.oneStep.phase0Probabilities;
const distinct = [...new Set(Object.values(probabilities))].sort((a, b) => a - b);
const separations = distinct.slice(1).map((value, index) => value - distinct[index]);
const minimum = Math.min(...separations);
requireCondition(Math.abs(minimum - data.oneStep.minimumSeparation) < 1e-14, "one-step separation mismatch");
requireCondition(hoeffding(minimum, data.decisionAlpha) === data.oneStep.shotsPerArmBound, "one-step shot bound mismatch");
requireCondition(data.oneStep.plannedShotsPerPhasePerLaw >= data.oneStep.shotsPerArmBound, "one-step plan is underpowered");

const cDepth4 = 0.5 * (0.5 ** 4);
const cDepth8 = 0.5 * (0.5 ** 8);
requireCondition(cDepth4 === data.repetition.CDepth4VersusESeparation, "depth-4 separation mismatch");
requireCondition(cDepth8 === data.repetition.CDepth8VersusESeparation, "depth-8 separation mismatch");
requireCondition(hoeffding(cDepth4, data.decisionAlpha) === data.repetition.CDepth4ShotsPerArmBound, "depth-4 shot bound mismatch");
requireCondition(hoeffding(cDepth8, data.decisionAlpha) === data.repetition.CDepth8ShotsPerArmBound, "depth-8 shot bound mismatch");

requireCondition(data.order.adjacentIdealTotalVariation > data.order.disjointNullToleranceAfterCorrection, "order target below null tolerance");
requireCondition(data.order.disjointIdealTotalVariation === 0, "disjoint null is not zero");
requireCondition(2 ** data.logicalResources.oneSeamSystemQubits >= 6, "one-seam logical carrier does not fit");
requireCondition(2 ** data.logicalResources.recordAncillaQubits >= data.logicalResources.maximumRecordLabels, "record register does not fit");
requireCondition(2 ** data.logicalResources.twoSeamSystemQubits >= 10, "two-seam logical carrier does not fit");

console.log(JSON.stringify({
  result: "pass",
  alpha: data.decisionAlpha,
  oneStepMinimumSeparation: minimum,
  oneStepShotsPerArm: data.oneStep.shotsPerArmBound,
  depth4ShotsPerArm: data.repetition.CDepth4ShotsPerArmBound,
  depth8ShotsPerArm: data.repetition.CDepth8ShotsPerArmBound,
  adjacentTotalVariation: data.order.adjacentIdealTotalVariation,
  disjointTotalVariation: data.order.disjointIdealTotalVariation,
  oneSeamQubits: data.logicalResources.oneSeamTotalQubits,
  twoSeamQubits: data.logicalResources.twoSeamWithReusableRecordAncillas
}, null, 2));
