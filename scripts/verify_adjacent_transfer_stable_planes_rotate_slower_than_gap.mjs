import assert from "node:assert/strict";
import { analyseAdjacentStableFrames } from "./explore_transverse_transfer_splitting.mjs";

const base = { L: 2, r: 0.8, m0: 0.8, mu: 0.7, delta: 1.2664482421875 };
const rows = [8, 16, 32].map((y) => analyseAdjacentStableFrames({ ...base, y }));

for (const row of rows) {
  assert.equal(row.stableRealDimension, 64);
  assert(row.minimumPrincipalCosine > 0.96, "adjacent stable planes must remain transverse");
  assert(row.rotationToGapRatio < 0.012, "rotation must be small relative to reciprocal gap estimate");
}
assert(rows[1].maximumPrincipalAngleDegrees < rows[0].maximumPrincipalAngleDegrees);
assert(rows[2].maximumPrincipalAngleDegrees < rows[1].maximumPrincipalAngleDegrees);
assert(rows[1].rotationToGapRatio < rows[0].rotationToGapRatio);
assert(rows[2].rotationToGapRatio < rows[1].rotationToGapRatio);
assert(rows[2].maximumPrincipalAngleDegrees < 2.4);
assert(rows[2].rotationToGapRatio < 8e-5);

console.log("Adjacent transfer stable-plane rotation: PASS");
for (const row of rows) console.log(
  "y=" + row.y + "->" + row.nextY + " max_angle_deg=" + row.maximumPrincipalAngleDegrees.toFixed(6) +
  " rotation_to_gap=" + row.rotationToGapRatio.toExponential(6));
console.log("uniform_graph_transform_bound=still_open");
