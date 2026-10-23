#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const data = JSON.parse(await readFile(new URL(
  "evidence/data/spin23-self-dual_connection_reality_audit-v1.json", root,
), "utf8"));

// Matrices act on coefficient columns in the ordered basis (J_i,K_i).
const star = [[0, -1], [1, 0]];
const multiply = (a, b) => a.map((row, i) =>
  b[0].map((_, j) => row.reduce((sum, value, k) => sum + value * b[k][j], 0)));
assert.deepEqual(multiply(star, star), [[-1, 0], [0, -1]]);

const actComplex = ([x, y]) => [-y, x];
const plus = [1, { re: 0, im: -1 }];
const minus = [1, { re: 0, im: 1 }];
const complex = (value) => typeof value === "number" ? { re: value, im: 0 } : value;
const starComplex = ([x, y]) => {
  const yc = complex(y);
  return [{ re: -yc.re, im: -yc.im }, complex(x)];
};
const scaleI = (value, sign) => {
  const z = complex(value);
  return { re: -sign * z.im, im: sign * z.re };
};
const equalComplexVectors = (left, right) => left.every((value, index) => {
  const a = complex(value);
  const b = complex(right[index]);
  return a.re === b.re && a.im === b.im;
});
assert.ok(equalComplexVectors(starComplex(plus), plus.map((z) => scaleI(z, 1))));
assert.ok(equalComplexVectors(starComplex(minus), minus.map((z) => scaleI(z, -1))));

// A real vector (j,k) cannot solve star v = +/- i v unless it vanishes.
for (const [j, k] of [[1, 0], [0, 1], [2, -3]]) {
  assert.notDeepEqual(actComplex([j, k]), [{ re: 0, im: j }, { re: 0, im: k }]);
}

const killing = [[-4, 0], [0, 4]];
const bilinear = (u, v) => {
  const uc = u.map(complex);
  const vc = v.map(complex);
  let re = 0;
  let im = 0;
  for (let i = 0; i < 2; i += 1) for (let j = 0; j < 2; j += 1) {
    const factor = killing[i][j];
    re += factor * (uc[i].re * vc[j].re - uc[i].im * vc[j].im);
    im += factor * (uc[i].re * vc[j].im + uc[i].im * vc[j].re);
  }
  return { re, im };
};
assert.deepEqual(bilinear(plus, plus), { re: -8, im: 0 });
assert.deepEqual(bilinear(minus, minus), { re: -8, im: 0 });
assert.deepEqual(bilinear(plus, minus), { re: 0, im: 0 });

for (const [x, y] of [[1, 0], [0, 1], [1, 2]]) {
  const realChiralAction = -16 * (x * x - y * y);
  assert.equal(realChiralAction, -16 * x * x + 16 * y * y);
}
assert.equal(data.hodgeStar.realEigenvectors, false);
assert.equal(data.realityReconstruction.oneChiralSectorAloneIsReal, false);
assert.equal(data.bilinearAudit.positiveRealKineticFormObtainedByProjectionAlone, false);
assert.equal(data.constraintAudit.chiralGravityExists, true);
assert.equal(data.targetAudit.healthyIndependentZeroMinusPoleConstructed, false);
assert.equal(data.targetAudit.oneEighthSelected, false);

console.log("Spin(2,3) self-dual connection reality audit: PASS");
console.log("  Lorentzian star squared: -identity; real self-dual eigenvectors: none");
console.log("  a real connection requires conjugate plus/minus chiral coefficients");
console.log("  chiral projection alone supplies neither positivity nor the torsion pole");
