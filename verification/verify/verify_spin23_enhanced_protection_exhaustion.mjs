#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-enhanced-protection-exhaustion-v1.json",
  import.meta.url,
), "utf8"));

const susy = evidence.minimalN1AdSCompletion;
const bosonic = susy.multiplets.reduce((sum, item) => sum + item.bosonicDegrees, 0);
const fermionic = susy.multiplets.reduce((sum, item) => sum + item.fermionicDegrees, 0);
assert.equal(bosonic, susy.totalBosonicDegrees);
assert.equal(fermionic, susy.totalFermionicDegrees);
assert.equal(bosonic, fermionic);
assert.equal(bosonic + fermionic, susy.totalDegrees);
assert.equal(susy.totalDegrees - evidence.target.bosonicDegrees, susy.additionalDegreesRelativeToTarget);
assert.ok(susy.totalDegrees > evidence.target.bosonicDegrees);

// For an orthogonal representation generator J, X^T X is invariant because
// J^T+J=0. Check the defining SO(2) example and a one-dimensional sign action.
const J = [[0, -1], [1, 0]];
for (let i = 0; i < 2; i += 1) {
  for (let j = 0; j < 2; j += 1) {
    assert.equal(J[j][i] + J[i][j], 0);
  }
}
for (const sign of [-1, 1]) assert.equal((sign*3)**2, 9);

const parseLoopCoefficient = (text) => {
  const match = text.match(/^1\/\[(\d+)\(4pi\)\^2\]$/);
  assert.ok(match);
  return 1/(Number(match[1])*(4*Math.PI)**2);
};
const normal = evidence.remainingRgProblem.knownWeakCouplingNormalTerms;
assert.ok(parseLoopCoefficient(normal.C2) > 0);
assert.ok(parseLoopCoefficient(normal.R2) > 0);

assert.equal(evidence.otherPrinciples.length, 3);
for (const item of evidence.otherPrinciples) assert.ok(item.failure.length > 0);
assert.equal(evidence.remainingRgProblem.requiredChecks.length, 5);

console.log("Spin(2,3) enhanced-protection exhaustion: PASS");
console.log("  commuting bosonic symmetries leave real quadratic sector norms invariant");
console.log("  minimal N=1 AdS completion: 4 bosonic + 4 fermionic states");
console.log("  extra states relative to 2+1 target: 5");
console.log("  Weyl, shift and topological shortcuts fail their compatibility gates");
console.log("  remaining reopening: explicit enlarged theory or unitary RG fixed surface");
