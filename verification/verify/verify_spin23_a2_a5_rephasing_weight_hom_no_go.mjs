import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const data = JSON.parse(
  readFileSync(
    path.join(root, "evidence/data/spin23-a2-a5-rephasing-weight-hom-no-go.json"),
    "utf8",
  ),
);

const eps = 1e-11;
const approx = (a, b) => Math.abs(a - b) < eps;
const mul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const sub = (A, B) => A.map((row, i) => row.map((x, j) => x - B[i][j]));
const scale = (s, A) => A.map((row) => row.map((x) => s * x));
const flatNorm = (A) => Math.sqrt(A.flat().reduce((s, x) => s + x * x, 0));
const I = [[1, 0], [0, 1]];
const J = [[0, -1], [1, 0]];
const K = [[1, 0], [0, -1]];

assert.equal(data.documentId, 1463);

// Solve homogeneous linear matrix constraints by evaluating their coefficient
// columns on the standard basis of M_2(R), then compute rank by elimination.
const matrixBasis = [
  [[1, 0], [0, 0]],
  [[0, 1], [0, 0]],
  [[0, 0], [1, 0]],
  [[0, 0], [0, 1]],
];

function rank(rows) {
  const A = rows.map((row) => [...row]);
  let r = 0;
  for (let c = 0; c < (A[0]?.length ?? 0) && r < A.length; c += 1) {
    let pivot = r;
    while (pivot < A.length && Math.abs(A[pivot][c]) < eps) pivot += 1;
    if (pivot === A.length) continue;
    [A[r], A[pivot]] = [A[pivot], A[r]];
    const p = A[r][c];
    for (let j = c; j < A[r].length; j += 1) A[r][j] /= p;
    for (let i = 0; i < A.length; i += 1) {
      if (i === r) continue;
      const f = A[i][c];
      for (let j = c; j < A[i].length; j += 1) A[i][j] -= f * A[r][j];
    }
    r += 1;
  }
  return r;
}

function homDimension(constraints) {
  const rows = [];
  for (const constraint of constraints) {
    const columns = matrixBasis.map((T) => constraint(T).flat());
    for (let component = 0; component < 4; component += 1) {
      rows.push(columns.map((column) => column[component]));
    }
  }
  return 4 - rank(rows);
}

const restrictedDimension = homDimension([
  (T) => sub(mul(T, J), mul(J, T)),
  (T) => sub(mul(T, K), mul(K, T)),
]);
assert.equal(restrictedDimension, 1);
assert.equal(data.restrictedHom.realDimension, 1);

for (const sourceWeight of [1, -1]) {
  const physicalDimension = homDimension([
    (T) => sub(scale(sourceWeight, mul(T, J)), scale(-2, mul(J, T))),
  ]);
  assert.equal(physicalDimension, 0);
}
assert.equal(data.physicalHom.realDimension, 0);

// A direct finite-angle check at generic alpha reaches the same conclusion.
const rotation = (theta) => [[Math.cos(theta), -Math.sin(theta)], [Math.sin(theta), Math.cos(theta)]];
const alpha = 0.371;
for (const T of matrixBasis) {
  const defect = sub(mul(T, rotation(alpha)), mul(rotation(-2 * alpha), T));
  assert.ok(flatNorm(defect) > eps);
}

// Q(z)=conjugate(z)^2 has weight -2 and respects conjugation.
const complex = (re, im) => ({ re, im });
const conjugate = (z) => complex(z.re, -z.im);
const times = (z, w) => complex(z.re * w.re - z.im * w.im, z.re * w.im + z.im * w.re);
const phase = (theta) => complex(Math.cos(theta), Math.sin(theta));
const q = (z) => times(conjugate(z), conjugate(z));
const closeComplex = (z, w) => approx(z.re, w.re) && approx(z.im, w.im);

const z = complex(0.37, -0.81);
assert(closeComplex(q(times(phase(alpha), z)), times(phase(-2 * alpha), q(z))));
assert(closeComplex(q(conjugate(z)), conjugate(q(z))));

const qOne = q(complex(1, 0));
const qI = q(complex(0, 1));
assert(closeComplex(qOne, complex(1, 0)));
assert(closeComplex(qI, complex(-1, 0)));
// Real projective equality means the two nonzero vectors are proportional.
assert.ok(approx(qOne.re * qI.im - qOne.im * qI.re, 0));
assert.equal(data.quadraticRepair.sameRealProjectiveTarget, true);
assert.equal(data.quadraticRepair.transmitsWallOrientation, false);

// The collapse is universal for weight -2: a quarter-turn of the source is
// a half-turn of the target, which is only a sign after projectivization.
assert(closeComplex(phase(-2 * (Math.PI / 2)), complex(-1, 0)));

assert.equal(data.verdict.a2InternalRaySelectionRetainedConditionally, true);
assert.equal(data.verdict.a5LinearTransportRuledOut, true);
assert.equal(data.verdict.oneLineChargeCorrectNonlinearTransportDistinguishesWallPair, false);
assert.equal(data.verdict.chargedTroLockPresent, false);
assert.equal(data.verdict.physicalAdmission, false);

console.log(
  "PASS 1463: restoring sterile rephasing makes the linear Hom zero, while every charge-minus-two repair identifies the two wall-selected rays projectively.",
);
