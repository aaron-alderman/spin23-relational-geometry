#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-e6-two-family-tight-frame-chiral-threshold.json",
  import.meta.url,
), "utf8"));

const q = 1 / Math.sqrt(2);
const y1 = [[q, 0], [0, q]];
const y2 = [[q, 0], [0, -q]];
const traceProduct = (a, b) => {
  let sum = 0;
  for (let i = 0; i < a.length; i += 1) {
    for (let j = 0; j < a[i].length; j += 1) sum += a[i][j] * b[i][j];
  }
  return sum;
};

const highGram = [
  [traceProduct(y1, y1), traceProduct(y1, y2)],
  [traceProduct(y2, y1), traceProduct(y2, y2)],
];
assert.ok(Math.abs(highGram[0][0] - 1) < 1e-12);
assert.ok(Math.abs(highGram[1][1] - 1) < 1e-12);
assert.ok(Math.abs(highGram[0][1]) < 1e-12);
assert.ok(Math.abs(highGram[1][0]) < 1e-12);

assert.equal(evidence.e6BreakingRank.twoCopyRank, 2 * 11);
assert.equal(evidence.e6BreakingRank.twoCopyKernel, 2 * 16);
assert.equal(evidence.e6BreakingRank.survivingChiral16s, 2);

// Project to the first surviving family.  Each Yukawa matrix becomes a
// scalar, so its scalar-copy Gram matrix is necessarily one outer product.
const effective = [y1[0][0], y2[0][0]];
const lowGram = [
  [effective[0] * effective[0], effective[0] * effective[1]],
  [effective[1] * effective[0], effective[1] * effective[1]],
];
const lowDet = lowGram[0][0] * lowGram[1][1] - lowGram[0][1] * lowGram[1][0];
assert.ok(Math.abs(lowDet) < 1e-12);
assert.ok(Math.abs(lowGram[0][1] - 0.5) < 1e-12);
assert.equal(evidence.oneFamilyProjection.rank, 1);

assert.equal(evidence.generalRankBound.copyGramRankUpperBound, 1);
assert.equal(evidence.generalRankBound.rankRequiredForNonzeroIsotropicTwoFrame, 2);
assert.equal(evidence.generalRankBound.nonzeroIdentityFramePossible, false);
assert.equal(evidence.decision.twoActiveMatterChannelsCanCloseYukawaFrame, true);
assert.equal(evidence.decision.twoActiveMatterChannelsLeaveExactlyOneChiral16, false);
assert.equal(evidence.decision.projectingToOneChiral16PreservesFrame, false);

console.log("spin23 E6 two-family tight-frame/chiral-threshold verification: PASS");
console.log("  two-family high-energy Yukawa Gram: identity_2");
console.log("  E6 singlet-mass kernel with two matter 27s: 32");
console.log("  one-family projected Gram: rank 1 with off-diagonal 1/2");
