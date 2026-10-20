#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-e6-z3-three-family-two-copy-frame.json",
  import.meta.url,
), "utf8"));

const omega = { re: -0.5, im: Math.sqrt(3) / 2 };
const cadd = (a, b) => ({ re: a.re + b.re, im: a.im + b.im });
const cmul = (a, b) => ({
  re: a.re * b.re - a.im * b.im,
  im: a.re * b.im + a.im * b.re,
});
const cconj = (a) => ({ re: a.re, im: -a.im });
const cscale = (a, x) => ({ re: a.re * x, im: a.im * x });
const close = (a, b, tolerance = 1e-12) =>
  Math.hypot(a.re - b.re, a.im - b.im) < tolerance;
const zero = { re: 0, im: 0 };
const one = { re: 1, im: 0 };

const omega2 = cmul(omega, omega);
assert.ok(close(cadd(cadd(one, omega), omega2), zero));
assert.ok(close(cmul(omega2, omega), one));

const P = [[0, 0, 1], [1, 0, 0], [0, 1, 0]];
const q = 1 / Math.sqrt(3);
const Y0 = [
  [cscale(one, q), zero, zero],
  [zero, cscale(one, q), zero],
  [zero, zero, cscale(one, q)],
];
const Y1 = [
  [cscale(one, q), zero, zero],
  [zero, cscale(omega, q), zero],
  [zero, zero, cscale(omega2, q)],
];

const transform = (Y) => Array.from({ length: 3 }, (_, i) =>
  Array.from({ length: 3 }, (_, j) => {
    let z = zero;
    for (let k = 0; k < 3; k += 1) {
      for (let l = 0; l < 3; l += 1) {
        z = cadd(z, cscale(Y[k][l], P[k][i] * P[l][j]));
      }
    }
    return z;
  }),
);
for (let i = 0; i < 3; i += 1) {
  for (let j = 0; j < 3; j += 1) {
    assert.ok(close(transform(Y0)[i][j], Y0[i][j]));
    assert.ok(close(transform(Y1)[i][j], cmul(omega, Y1[i][j])));
  }
}

const hs = (A, B) => {
  let z = zero;
  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) z = cadd(z, cmul(cconj(A[i][j]), B[i][j]));
  }
  return z;
};
assert.ok(close(hs(Y0, Y0), one));
assert.ok(close(hs(Y1, Y1), one));
assert.ok(close(hs(Y0, Y1), zero));

for (let i = 0; i < 3; i += 1) {
  let diagonal = zero;
  for (const Y of [Y0, Y1]) diagonal = cadd(diagonal, cmul(Y[i][i], cconj(Y[i][i])));
  assert.ok(close(diagonal, cscale(one, 2 / 3)));
}

assert.equal(evidence.e6MassRank.totalExoticRank, 3 * 11);
assert.equal(evidence.e6MassRank.totalKernelDimension, 3 * 16);
assert.equal(evidence.e6MassRank.survivingChiral16s, 3);
assert.equal(evidence.scalarCopies.vevPreservesZ3, true);
assert.equal(evidence.scalarCopies.crossMixingForbidden, true);
assert.equal(evidence.decision.observedThreeFamilyMultiplicityClosesOneLoopCopyGram, true);
assert.equal(evidence.decision.residualZ3ProtectsOrthogonalPortalCopy, true);
assert.equal(evidence.decision.fullScalarPotentialVacuumDerived, false);
assert.equal(evidence.decision.normalizedPortalWardLineDerived, false);

console.log("spin23 E6 Z3 three-family two-copy frame verification: PASS");
console.log("  covariance: P^T Y0 P=Y0, P^T Y1 P=omega Y1");
console.log("  scalar-copy Gram: identity_2");
console.log("  family wavefunction operator: (2/3) identity_3");
console.log("  E6 exotic rank/kernel: 33/48 = three chiral 16s");
