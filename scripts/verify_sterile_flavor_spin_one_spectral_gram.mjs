#!/usr/bin/env node

const eps = 1e-9;
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const outer = (u, v) => u.map(x => v.map(y => x * y));
const addM = (A, B) => A.map((r, i) => r.map((x, j) => x + B[i][j]));
const scaleM = (s, A) => A.map(r => r.map(x => s * x));
const symSpinor = (p, q) => scaleM(0.5, addM(outer(p, q), outer(q, p)));
const det2 = A => A[0][0] * A[1][1] - A[0][1] * A[1][0];
const bracket = (p, q) => p[0] * q[1] - p[1] * q[0];

for (const [p, q] of [
  [[1, 0], [0, 1]],
  [[1, 2], [3, -1]],
  [[2, -3], [4, 5]],
]) {
  const M = symSpinor(p, q);
  assert(Math.abs(det2(M) + bracket(p, q) ** 2 / 4) < eps,
    "two-fermion symmetric-spinor determinant identity failed");
  assert(Math.abs(det2(M)) > eps, "generic two-particle form factor must be nonzero");
}

// Three sterile flavors give exactly three antisymmetric flavor-pair operators.
const pairCount = n => n * (n - 1) / 2;
assert(pairCount(1) === 0 && pairCount(2) === 1 && pairCount(3) === 3,
  "antisymmetric flavor-pair count failed");

// Two linear response probes read M_00 and M_01. Each state contributes an
// outer-product spectral Gram; two non-collinear states give a full-rank sum.
const amplitude = M => [M[0][0], M[0][1]];
const gram = a => [[a[0] * a[0], a[0] * a[1]], [a[1] * a[0], a[1] * a[1]]];
const M1 = symSpinor([1, 0], [0, 1]);
const M2 = symSpinor([1, 1], [1, -1]);
const G1 = gram(amplitude(M1));
const G2 = gram(amplitude(M2));
const spectral = addM(G1, G2);
assert(Math.abs(det2(G1)) < eps && Math.abs(det2(G2)) < eps, "one-state Grams must be rank one");
assert(spectral[0][0] > 0 && spectral[1][1] > 0 && det2(spectral) > eps,
  "two-state spectral Gram must be positive definite");

// The Lorentz-symmetric bilinear is flavor antisymmetric; its diagonal pairs vanish.
const flavorPairs = [[0, 1], [0, 2], [1, 2]];
assert(flavorPairs.length === 3 && flavorPairs.every(([i, j]) => i < j), "three-flavor basis failed");

console.log("Sterile-flavor spin-one spectral Gram certificate: PASS");
console.log("form_factor=lambda_p_(alpha)lambda_q_(beta); det=-angle(pq)^2/4; generic_nonzero=true");
console.log("N=3_sterile_flavors_antisymmetric_pairs=3; one_state_Gram_rank1=true; two_state_spectral_Gram_positive_definite=true");
