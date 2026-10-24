import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "../..");
const certificate = JSON.parse(readFileSync(resolve(root, "evidence/data/admissibility-hopf-link-vacuum-equivariance-v1.json"), "utf8"));

const I = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
const A = [[1, 0, 0], [0, 0, 1], [0, 1, 0]];
const B = [[0, 1, 0], [0, 0, 1], [1, 0, 0]];
const transpose = (M) => M[0].map((_, j) => M.map((row) => row[j]));
const multiply = (M, N) => M.map((row) => N[0].map((_, j) => row.reduce((sum, value, k) => sum + value * N[k][j], 0)));
const power = (M, n) => {
  let result = I;
  for (let k = 0; k < n; k += 1) result = multiply(result, M);
  return result;
};
const equal = (M, N) => M.every((row, i) => row.every((value, j) => value === N[i][j]));
const det3 = (M) =>
  M[0][0] * (M[1][1] * M[2][2] - M[1][2] * M[2][1])
  - M[0][1] * (M[1][0] * M[2][2] - M[1][2] * M[2][0])
  + M[0][2] * (M[1][0] * M[2][1] - M[1][1] * M[2][0]);
const mod = (n, d) => ((n % d) + d) % d;
const X = (n) => multiply(power(A, mod(n, 2)), power(transpose(B), mod(n, 3)));

assert.ok(equal(power(A, 2), I));
assert.ok(equal(power(B, 3), I));
assert.ok(equal(multiply(multiply(A, B), A), transpose(B)));

const orbit = Array.from({ length: 6 }, (_, n) => X(n));
assert.equal(new Set(orbit.map((M) => JSON.stringify(M))).size, 6);

for (let n = 0; n < 6; n += 1) {
  assert.ok(equal(multiply(multiply(A, X(n)), transpose(B)), X(n + 1)));
  assert.equal(det3(X(n)), (-1) ** n);
  assert.ok(equal(X(n + 3), multiply(A, X(n))));
  assert.ok(equal(multiply(multiply(A, X(n)), transpose(A)), X(-n)));
}
assert.ok(equal(X(6), X(0)));
assert.ok(!equal(X(3), X(0)));

const cover = Array.from({ length: 6 }, (_, n) => ({ n, placement: n % 3, sheet: n % 2, determinant: det3(X(n)) }));
assert.equal(new Set(cover.map((point) => `${point.placement}:${point.sheet}`)).size, 6);
assert.equal(cover.filter((point) => point.determinant === 1).length, 3);
assert.equal(cover.filter((point) => point.determinant === -1).length, 3);

assert.equal(certificate.protocol, "admissibility-hopf-link-vacuum-equivariance/1");
assert.equal(certificate.equivariance.period, 6);
assert.equal(certificate.counts.distinctLinkVacua, orbit.length);
assert.equal(certificate.interpretation.physicalAdmission, false);

console.log(JSON.stringify({
  status: "PASS",
  orbit: cover,
  step: "X -> A X B^T",
  halfTurn: "left family reflection with placement fixed",
  reflection: "X_n -> X_-n",
  equivariantHopfLinkIdentification: true,
  physicalCarrierIdentification: "OPEN"
}));
