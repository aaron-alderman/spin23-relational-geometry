import { readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const data = JSON.parse(await readFile(new URL("evidence/data/admissibility-acoustic-selector-channel-v1.json", root), "utf8"));
const failures = [];
const near = (a, b, tol = 1e-10) => Math.abs(a - b) <= tol;

if (data.protocol !== "admissibility-acoustic-selector-channel/1") failures.push("unexpected protocol");
if (!near(data.parameters.tangentSlope, 1 / 3)) failures.push("selector slope drifted");
if (!near(data.parameters.matchedPassiveFilterLogSingularValueRatio, Math.log(3))) failures.push("filter nonunitarity drifted");
if (!near(data.parameters.orthogonalInputPowerTransmission, 1 / 9)) failures.push("filter power arithmetic drifted");
if (data.localComparison.length !== 4) failures.push("expected four local perturbations");
for (const row of data.localComparison) {
  if (!near(row.neutralUnitaryDistanceRatio, 1)) failures.push("unitary distance ratio must be one");
  if (!near(row.affineReplacementDistanceRatio, 1 / 3, 1e-9)) failures.push("affine trace-distance contraction must be exactly one third");
  if (!(row.passiveFilterDistanceRatio > 0 && row.passiveFilterDistanceRatio < 1)) failures.push("passive filter should contract locally");
}
if (data.implementation.ensembleChannel.limitation !== "individual coherent shots do not contract; only the ensemble covariance does") failures.push("ensemble/single-shot boundary missing");
if (data.verdict.passiveLoopPlusSelector !== "closed_as_a_distinct_nonloss_selection_test") failures.push("passive no-go verdict drifted");
if (data.verdict.ensembleReplacementEmulator !== "exact_and_buildable") failures.push("ensemble emulator verdict drifted");
if (data.verdict.singleTrajectorySelection !== "active_feedback_or_nonlinear_reservoir_required") failures.push("single-trajectory gate drifted");

if (failures.length) {
  console.error(JSON.stringify({ result: "fail", failures }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  result: "pass",
  perturbations: data.localComparison.length,
  affineSlope: data.parameters.tangentSlope,
  passiveFilterNu: data.parameters.matchedPassiveFilterLogSingularValueRatio,
  passiveOrthogonalPower: data.parameters.orthogonalInputPowerTransmission,
  verdict: data.verdict,
}, null, 2));
