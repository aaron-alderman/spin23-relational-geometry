import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "../..");
const certificate = JSON.parse(readFileSync(resolve(root, "evidence/data/admissibility-universal-projector-quarter-turn-crossbar-v1.json"), "utf8"));

const multiply = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((sum, x, k) => sum + x * B[k][j], 0)));
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const scale = (c, A) => A.map((row) => row.map((x) => c * x));
const commutator = (A, B) => add(multiply(A, B), scale(-1, multiply(B, A)));
const equal = (A, B, tolerance = 1e-10) => A.every((row, i) => row.every((x, j) => Math.abs(x - B[i][j]) < tolerance));

const I2 = [[1, 0], [0, 1]];
const P0 = certificate.twoDimensionalModel.P0;
const J = certificate.twoDimensionalModel.J;
const projectorAt = (t) => {
  const c = Math.cos(t);
  const s = Math.sin(t);
  return [[c * c, c * s], [c * s, s * s]];
};
const projectorDerivativeAt = (t) => {
  const c = Math.cos(t);
  const s = Math.sin(t);
  return [[-2 * c * s, c * c - s * s], [c * c - s * s, 2 * c * s]];
};
const rotationAt = (t) => [[Math.cos(t), -Math.sin(t)], [Math.sin(t), Math.cos(t)]];

for (const t of [0, 0.17, Math.PI / 4, Math.PI / 2, Math.PI]) {
  const P = projectorAt(t);
  const dP = projectorDerivativeAt(t);
  assert.ok(equal(multiply(P, P), P));
  assert.ok(equal(dP, commutator(J, P)));
  assert.ok(equal(commutator(dP, P), J));
  const CP = commutator(P, dP);
  assert.ok(equal(CP, scale(-1, J)));
  assert.ok(equal(add(dP, commutator(CP, P)), [[0, 0], [0, 0]]));
}

assert.ok(equal(projectorAt(0), P0));
assert.ok(equal(projectorAt(Math.PI), P0));
assert.ok(equal(rotationAt(Math.PI / 2), J));
assert.ok(equal(rotationAt(Math.PI), scale(-1, I2)));
assert.ok(equal(rotationAt(2 * Math.PI), I2));

// Combining commuting order-three placement and order-four frame transport gives order twelve.
const C3 = [[0, 0, 1], [1, 0, 0], [0, 1, 0]];
const kronecker = (A, B) => A.flatMap((aRow, ai) => B.map((bRow) => aRow.flatMap((a) => bRow.map((b) => a * b))));
const T = kronecker(C3, J);
const I6 = Array.from({ length: 6 }, (_, i) => Array.from({ length: 6 }, (_, j) => Number(i === j)));
const power = (A, n) => {
  let result = A.map((_, i) => A.map((__, j) => Number(i === j)));
  for (let k = 0; k < n; k += 1) result = multiply(result, A);
  return result;
};
assert.ok(equal(power(T, 6), scale(-1, I6)));
assert.ok(equal(power(T, 12), I6));

// At the real locus of CP2, multiplication by i sends the real tangent R2 to
// an independent normal copy iR2 rather than rotating inside the real tangent.
const realTangentBasis = [[1, 0, 0, 0], [0, 1, 0, 0]];
const normalBasis = [[0, 0, 1, 0], [0, 0, 0, 1]];
const kahlerJ = [
  [0, 0, -1, 0],
  [0, 0, 0, -1],
  [1, 0, 0, 0],
  [0, 1, 0, 0]
];
const apply = (A, v) => A.map((row) => row.reduce((sum, x, i) => sum + x * v[i], 0));
const I4 = Array.from({ length: 4 }, (_, i) => Array.from({ length: 4 }, (_, j) => Number(i === j)));
assert.deepEqual(apply(kahlerJ, realTangentBasis[0]), normalBasis[0]);
assert.deepEqual(apply(kahlerJ, realTangentBasis[1]), normalBasis[1]);
assert.ok(equal(multiply(kahlerJ, kahlerJ), scale(-1, I4)));

assert.equal(certificate.protocol, "admissibility-universal-projector-quarter-turn-crossbar/1");
assert.equal(certificate.status.kinematicQuarterTurnCrossbarEstablished, true);
assert.equal(certificate.status.realLocusNestingEstablished, true);
assert.equal(certificate.status.selectorFamilyProjectorIntertwinerEstablished, false);
assert.equal(certificate.status.physicalAdmission, false);

console.log(JSON.stringify({
  status: "PASS",
  universalConnection: "C_P=[P,dP]",
  horizontalGenerator: "[dot(P),P]=J",
  projectorPreserved: true,
  holonomy: { quarter: "J", projectiveLoop: "-I", coherentPeriod: "I" },
  combinedTower: { step6: "-I", step12: "I" },
  realLocus: { nesting: "RP2 subset CP2", kahlerIMapsTangentToNormal: true },
  selectorFamilyPhysicalIntertwiner: "OPEN"
}));

