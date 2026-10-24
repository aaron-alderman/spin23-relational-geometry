import assert from "node:assert/strict";

const multiply = (a, b) => a.map((row) =>
  b[0].map((_, j) => row.reduce((sum, value, k) => sum + value * b[k][j], 0)));
const transpose = (a) => a[0].map((_, j) => a.map((row) => row[j]));
const apply = (a, v) => a.map((row) =>
  row.reduce((sum, value, i) => sum + value * v[i], 0));
const determinant5 = (matrix) => {
  const a = matrix.map((row) => [...row]);
  let det = 1;
  for (let i = 0; i < 5; i += 1) {
    let pivot = i;
    while (pivot < 5 && Math.abs(a[pivot][i]) < 1e-12) pivot += 1;
    if (pivot === 5) return 0;
    if (pivot !== i) {
      [a[pivot], a[i]] = [a[i], a[pivot]];
      det *= -1;
    }
    det *= a[i][i];
    const p = a[i][i];
    for (let j = i; j < 5; j += 1) a[i][j] /= p;
    for (let r = i + 1; r < 5; r += 1) {
      const f = a[r][i];
      for (let j = i; j < 5; j += 1) a[r][j] -= f * a[i][j];
    }
  }
  return det;
};

const eta = [
  [-1, 0, 0, 0, 0],
  [0, -1, 0, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 0, 1, 0],
  [0, 0, 0, 0, 1]
];
const rotation = (theta) => [
  [Math.cos(theta), -Math.sin(theta), 0, 0, 0],
  [Math.sin(theta), Math.cos(theta), 0, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 0, 1, 0],
  [0, 0, 0, 0, 1]
];
const maxError = (a, b) => Math.max(...a.flatMap((row, i) =>
  row.map((value, j) => Math.abs(value - b[i][j]))));

for (const theta of [0, 0.2, 1, Math.PI]) {
  const r = rotation(theta);
  assert.ok(maxError(multiply(multiply(transpose(r), eta), r), eta) < 2e-15);
  assert.ok(Math.abs(determinant5(r) - 1) < 2e-15);
}

const ell = 3;
const V = [ell, 0, 0, 0, 0];
const minusV = V.map((x) => -x);
const rotatedV = apply(rotation(Math.PI), V);
assert.ok(rotatedV.every((x, i) => Math.abs(x - minusV[i]) < 1e-14));

const dimSO = (n) => n * (n - 1) / 2;
const parentDimension = dimSO(5);
const stabilizerDimension = dimSO(4);
const compensatorOrbitDimension = parentDimension - stabilizerDimension;
const seamTangentDimension = 0;
assert.equal(parentDimension, 10);
assert.equal(stabilizerDimension, 6);
assert.equal(compensatorOrbitDimension, 4);
assert.notEqual(seamTangentDimension, compensatorOrbitDimension);

console.log(JSON.stringify({
  seamCarrier: {
    type: "affine F2 torsor",
    cardinality: 2,
    tangentDimension: seamTangentDimension,
    connectedSpin23Action: "trivial on the finite discrete carrier"
  },
  cartanCompensator: {
    orbit: "Spin_0(2,3)/Spin_0(1,3)",
    parentDimension,
    stabilizerDimension,
    orbitDimension: compensatorOrbitDimension,
    normalizedVectorComponents: 5,
    constraintCount: 1
  },
  independentConnection: {
    algebra: "so(2,3)",
    algebraDimension: parentDimension,
    formDegree: 1
  },
  signPath: {
    metricSignature: "(-,-,+,+,+)",
    path: "rotation by theta in the two-time plane",
    endpointAtPi: "V -> -V",
    remainsInConnectedOrientationPreservingGroup: true
  },
  conclusion: "The seam bit can label a marked orientation/defect sector, but it cannot supply the continuous compensator orbit or independent connection. V and -V are in the same connected Spin_0(2,3) orbit."
}, null, 2));
console.log("PASS verify_lattice_subroutine_cartan_seam_gate");

