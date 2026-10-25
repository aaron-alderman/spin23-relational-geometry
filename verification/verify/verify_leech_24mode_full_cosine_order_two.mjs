import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {execFileSync} from "node:child_process";
import {fileURLToPath} from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const record = JSON.parse(fs.readFileSync(path.join(
  here, "../../evidence/data/leech-24mode-full-cosine-order-two-v1.json"
), "utf8"));
const run = JSON.parse(execFileSync(process.execPath, [
  path.join(here, "../../scripts/analyze-leech-24mode-quartic-second-order.mjs"),
  "--order-two"
], {encoding: "utf8", maxBuffer: 2 ** 22}));

assert.equal(record.schemaVersion, "leech-24mode-full-cosine-order-two-v1");
assert.equal(run.orderTwoComputed, true);
const close = (first, second, tolerance = 5e-13) =>
  assert.ok(Math.abs(first - second) < tolerance * Math.max(1, Math.abs(second)), `${first} != ${second}`);
const terms = record.orderTwoTerms;
close(terms.quarticThirdOrder, run.coefficientsAtUnitRatio.thirdOrderQuarticGap);
close(terms.quarticSexticMixedSecondOrder,
  run.coefficientsAtUnitRatio.mixedQuarticSexticGap);
close(terms.octicFirstOrder, run.coefficientsAtUnitRatio.octicFirstOrderGap);
close(terms.sum, run.coefficientsAtUnitRatio.fullCosineOrderTwoGap);
close(terms.quarticThirdOrder + terms.quarticSexticMixedSecondOrder
  + terms.octicFirstOrder, terms.sum);
assert.deepEqual(run.thirdOrderSparseAudit, {
  groundResolventStates: record.sparseContractionAudit.groundResolventStates,
  softestResolventStates: record.sparseContractionAudit.softestResolventStates,
  groundMaximumThetaSquaredStates: record.sparseContractionAudit.groundMaximumThetaSquaredStates,
  softestMaximumThetaSquaredStates: record.sparseContractionAudit.softestMaximumThetaSquaredStates
});

const applyX = (vector) => {
  const output = Array(vector.length).fill(0);
  for (let occupation = 0; occupation < vector.length; occupation += 1) {
    if (occupation + 1 < vector.length) output[occupation + 1] +=
      Math.sqrt(occupation + 1) * vector[occupation];
    if (occupation > 0) output[occupation - 1] += Math.sqrt(occupation) * vector[occupation];
  }
  return output;
};
const moment = (occupation, power) => {
  let vector = Array(14).fill(0);
  vector[occupation] = 1;
  for (let index = 0; index < power; index += 1) vector = applyX(vector);
  return vector[occupation];
};
close(moment(0, 8), 105);
close(moment(1, 8), 945);
close(moment(1, 8) - moment(0, 8), 840);

for (let index = 0; index < record.scans.length; index += 1) {
  const frozen = record.scans[index];
  const actual = run.scans[index];
  close(frozen.orderTwoCorrection, actual.fullCosineOrderTwoCorrection);
  close(frozen.gapThroughOrderTwo, actual.gapThroughFullCosineOrderTwo);
  close(frozen.orderTwoRelativeToHarmonic,
    frozen.orderTwoCorrection / actual.harmonicGap);
  if (frozen.eightModeFullCosineGap) close(frozen.relativeDifferenceFromEightModeGap,
    (frozen.eightModeFullCosineGap - frozen.gapThroughOrderTwo)
      / frozen.eightModeFullCosineGap);
}
assert.ok(record.boundary.includes("not a rigorous remainder bound"));

console.log(JSON.stringify({
  status: "PASS",
  modes: 24,
  octicMomentIdentity: true,
  orderTwoTerms: terms,
  sparseAudit: run.thirdOrderSparseAudit,
  maximumRelativeOrderTwoCorrection: Math.max(...record.scans.map((scan) =>
    Math.abs(scan.orderTwoRelativeToHarmonic))),
  rigorousRemainderBoundEstablished: false,
  epistemicStatus: record.epistemicStatus
}));
