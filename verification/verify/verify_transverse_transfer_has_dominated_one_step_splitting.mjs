import assert from "node:assert/strict";
import { analyseTransfer } from "./explore_transverse_transfer_splitting.mjs";

const base = { L: 2, r: 0.8, m0: 0.8, mu: 0.7, delta: 1.2664482421875 };
const rows = [8, 16, 32].map((y) => analyseTransfer({ ...base, y }));

for (const row of rows) {
  assert.equal(row.sliceDimension, 32, "complete circumference slice must be retained");
  assert.equal(row.transferDimension, 64, "two-step state must double the slice dimension");
  assert(row.currentResidual < 2e-13, "transfer matrix must preserve the lattice current form");
  assert(Math.abs(row.logAbsDet) < 1e-6, "transfer determinant must have unit modulus");
  assert(row.reciprocalPairingError < 1e-7, "benchmark singular values must pair reciprocally");
  assert(row.stableEdge < 1 && row.unstableEdge > 1, "one-step spectrum must split across one");
}

assert(rows[1].dominanceRatio > rows[0].dominanceRatio, "domination must strengthen from radius 8 to 16");
assert(rows[2].dominanceRatio > rows[1].dominanceRatio, "domination must strengthen from radius 16 to 32");
assert(rows[2].dominanceRatio > 400, "far-tail one-step splitting must be strong at radius 32");
assert(rows[2].yTimesStableEdge > 1 && rows[2].yTimesStableEdge < 3,
  "stable edge must show the expected inverse-radius scale at the audited radii");

console.log("Transverse transfer one-step splitting: PASS");
for (const row of rows) console.log(
  `y=${row.y} stable_edge=${row.stableEdge.toFixed(9)} unstable_edge=${row.unstableEdge.toFixed(9)} ` +
  `ratio=${row.dominanceRatio.toFixed(6)} current_residual=${row.currentResidual.toExponential(2)}`);
console.log("stable_cocycle_bundle=not_yet_proved");
