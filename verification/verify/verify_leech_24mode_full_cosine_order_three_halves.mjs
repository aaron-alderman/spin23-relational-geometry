import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {execFileSync} from "node:child_process";
import {fileURLToPath} from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const record = JSON.parse(fs.readFileSync(path.join(
  here, "../../evidence/data/leech-24mode-full-cosine-order-three-halves-v1.json"
), "utf8"));
const run = JSON.parse(execFileSync(process.execPath, [
  path.join(here, "../../scripts/analyze-leech-24mode-quartic-second-order.mjs")
], {encoding: "utf8", maxBuffer: 2 ** 22}));
const ladder = JSON.parse(fs.readFileSync(path.join(
  here, "../../evidence/data/leech-full-cosine-active-mode-ladder-v1.json"
), "utf8"));

assert.equal(record.schemaVersion, "leech-24mode-full-cosine-order-three-halves-v1");
const close = (first, second, tolerance = 4e-14) =>
  assert.ok(Math.abs(first - second) < tolerance * Math.max(1, Math.abs(second)), `${first} != ${second}`);
const coefficients = record.coefficientsAtUnitRatio;
close(coefficients.quarticFirstOrder, run.coefficientsAtUnitRatio.firstOrderGap);
close(coefficients.quarticSecondOrder, run.coefficientsAtUnitRatio.secondOrderGap);
close(coefficients.sexticFirstOrder, run.coefficientsAtUnitRatio.sexticFirstOrderGap);
close(coefficients.fullCosineOrderThreeHalves,
  run.coefficientsAtUnitRatio.fullCosineOrderThreeHalvesGap);
close(coefficients.quarticSecondOrder + coefficients.sexticFirstOrder,
  coefficients.fullCosineOrderThreeHalves);
close(coefficients.sexticCancellationFractionOfQuarticSecondOrder,
  coefficients.sexticFirstOrder / -coefficients.quarticSecondOrder);

// Independent oscillator moment check: <1|x^6|1>-<0|x^6|0>=90 for ground variance one.
const applyX = (vector) => {
  const output = Array(vector.length).fill(0);
  for (let occupation = 0; occupation < vector.length; occupation += 1) {
    if (occupation + 1 < vector.length) output[occupation + 1] +=
      Math.sqrt(occupation + 1) * vector[occupation];
    if (occupation > 0) output[occupation - 1] += Math.sqrt(occupation) * vector[occupation];
  }
  return output;
};
const momentSix = (occupation) => {
  let vector = Array(10).fill(0);
  vector[occupation] = 1;
  for (let power = 0; power < 6; power += 1) vector = applyX(vector);
  return vector[occupation];
};
close(momentSix(0), 15);
close(momentSix(1), 105);
close(momentSix(1) - momentSix(0), 90);

for (let index = 0; index < record.scans.length; index += 1) {
  const frozen = record.scans[index];
  const actual = run.scans[index];
  close(frozen.harmonicGap, actual.harmonicGap);
  close(frozen.quarticFirstOrderCorrection, actual.firstOrderQuarticGapCorrection);
  close(frozen.fullCosineOrderThreeHalvesCorrection,
    actual.fullCosineOrderThreeHalvesCorrection);
  close(frozen.relativeOrderThreeHalvesCorrection,
    actual.fullCosineOrderThreeHalvesRelativeToHarmonic);
  close(frozen.gapThroughOrderThreeHalves, actual.gapThroughFullCosineOrderThreeHalves);
  if (frozen.eightModeFullCosineGap) {
    const ladderScan = ladder.scans.find(({chargingToCosineRatio}) =>
      chargingToCosineRatio === frozen.chargingToCosineRatio);
    const eightMode = ladderScan.activeModeRungs.find(({activeModes}) => activeModes === 8).gap;
    assert.equal(frozen.eightModeFullCosineGap, eightMode);
    close(frozen.relativeDifferenceFromEightModeGap,
      (eightMode - frozen.gapThroughOrderThreeHalves) / eightMode);
  }
}
assert.ok(record.boundary.includes("not a rigorous remainder bound"));

console.log(JSON.stringify({
  status: "PASS",
  modes: 24,
  oscillatorSixthMomentIdentity: true,
  sexticCancellationFraction: coefficients.sexticCancellationFractionOfQuarticSecondOrder,
  fullCosineOrderThreeHalvesCoefficient: coefficients.fullCosineOrderThreeHalves,
  comparisonsToEightMode: record.scans.filter((scan) => scan.eightModeFullCosineGap)
    .map(({chargingToCosineRatio, relativeDifferenceFromEightModeGap}) =>
      ({chargingToCosineRatio, relativeDifferenceFromEightModeGap})),
  rigorousRemainderBoundEstablished: false,
  epistemicStatus: record.epistemicStatus
}));
