import assert from "node:assert/strict";

const add = (A, B) => A.map((r, i) => r.map((x, j) => x + B[i][j]));
const scale = (k, A) => A.map((r) => r.map((x) => k * x));
const mul = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
const transpose = (A) => A[0].map((_, j) => A.map((r) => r[j]));
const det = (A) => A[0][0] * A[1][1] - A[0][1] * A[1][0];
const inv2 = (A) => scale(1 / det(A), [[A[1][1], -A[0][1]], [-A[1][0], A[0][0]]]);
const tr = (A) => A.reduce((s, r, i) => s + r[i], 0);
const norm = (A) => Math.sqrt(A.flat().reduce((s, x) => s + x * x, 0));
const close = (A, B, eps = 1e-9) => norm(add(A, scale(-1, B))) < eps;
const eye2 = [[1, 0], [0, 1]];

const inverse = (A) => {
  const n = A.length;
  const aug = A.map((r, i) => [...r, ...Array.from({ length: n }, (_, j) => +(i === j))]);
  for (let k = 0; k < n; k++) {
    let p = k;
    for (let i = k + 1; i < n; i++) if (Math.abs(aug[i][k]) > Math.abs(aug[p][k])) p = i;
    [aug[k], aug[p]] = [aug[p], aug[k]];
    const pivot = aug[k][k];
    assert.ok(Math.abs(pivot) > 1e-12);
    aug[k] = aug[k].map((x) => x / pivot);
    for (let i = 0; i < n; i++) if (i !== k) {
      const f = aug[i][k];
      aug[i] = aug[i].map((x, j) => x - f * aug[k][j]);
    }
  }
  return aug.map((r) => r.slice(n));
};

const g1 = 2, g2 = 3, g3 = 7, m = 5, T = 1.7;
const Kbb = [[g1, 0], [0, g2]];
const Kbh = [[0, -g1], [0, -g2]];
const Khh = [[g3, -g3], [-g3, m + g1 + g2 + g3]];
const R = add(Kbb, scale(-1, mul(mul(Kbh, inv2(Khh)), transpose(Kbh))));
const expectedR = add(Kbb, scale(-1 / (m + g1 + g2), [[g1 * g1, g1 * g2], [g1 * g2, g2 * g2]]));
assert.ok(close(R, expectedR));
assert.ok(det(R) > 0 && R[0][0] > 0);

// Full kernel in variable order (phi1, phi2, phi3, chi).
const K = [
  [g1, 0, 0, -g1],
  [0, g2, 0, -g2],
  [0, 0, g3, -g3],
  [-g1, -g2, -g3, m + g1 + g2 + g3],
];
const Kinv = inverse(K);
const boundaryCovariance = scale(T, Kinv.slice(0, 2).map((r) => r.slice(0, 2)));
const predictedCovariance = scale(T, inv2(R));
assert.ok(close(boundaryCovariance, predictedCovariance));
assert.ok(close(mul(R, boundaryCovariance), scale(T, eye2)));
assert.ok(close(mul(boundaryCovariance, R), scale(T, eye2)));

// Freudenthal paired-face nullity and cubic criticality.
const pairing = tr(mul(R, boundaryCovariance));
const quartic = -2 * (pairing ** 2 - 4 * det(R) * det(boundaryCovariance));
assert.ok(Math.abs(pairing - 2 * T) < 1e-9);
assert.ok(Math.abs(det(R) * det(boundaryCovariance) - T ** 2) < 1e-9);
assert.ok(Math.abs(quartic) < 1e-9);

// The marginal covariance uniquely minimizes its Gaussian free energy.
const freeEnergy = (C) => 0.5 * tr(mul(R, C)) - 0.5 * T * Math.log(det(C));
for (const H of [
  [[0.1, 0], [0, 0]],
  [[0, 0.1], [0.1, 0]],
  [[0.2, -0.1], [-0.1, 0.3]],
]) {
  assert.ok(freeEnergy(add(boundaryCovariance, H)) > freeEnergy(boundaryCovariance));
}

// Ungrounded network: the two-port response is rank one and requires quotient/pseudoinverse treatment.
const R0 = add(Kbb, scale(-1 / (g1 + g2), [[g1 * g1, g1 * g2], [g1 * g2, g2 * g2]]));
assert.ok(Math.abs(det(R0)) < 1e-10);
assert.ok(close(mul(R0, [[1], [1]]), [[0], [0]]));

console.log("PASS Freudenthal Gaussian-Schur boundary realization");
console.log("  the boundary covariance block is T times the inverse Schur Hessian");
console.log("  the paired matrices are Freudenthal quartic-null and inverse matched");
console.log("  the Gaussian free energy has the covariance as its strict minimum");
console.log("  the ungrounded Ward-like zero mode requires quotienting first");
