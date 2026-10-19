import assert from "node:assert/strict";

const V = [
  [1, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, -1],
  [0, 0, 0, 1, 1, 0, -1],
  [0, 0, 0, 1, 0, 1, 1],
];
const D = [6, 3, 3, 2, 1, 1, 2]; // illustrative free-field metric; D_H declared explicitly
const weights = [1, 6e-4, 1e-4, 1e-24];
const n = 7;

// Symmetric representative S=D^{-1/2} V^T W V D^{-1/2}.
const S = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) =>
  V.reduce((sum, row, a) => sum + row[i] * weights[a] * row[j] / Math.sqrt(D[i] * D[j]), 0)
));

function jacobi(A) {
  A = A.map((r) => r.slice());
  const U = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => i === j ? 1 : 0));
  for (let step = 0; step < 1000; step++) {
    let p = 0, q = 1, best = 0;
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) if (Math.abs(A[i][j]) > best) {
      best = Math.abs(A[i][j]); p = i; q = j;
    }
    if (best < 1e-14) break;
    const phi = 0.5 * Math.atan2(2 * A[p][q], A[q][q] - A[p][p]);
    const c = Math.cos(phi), s = Math.sin(phi);
    const R = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => i === j ? 1 : 0));
    R[p][p] = c; R[q][q] = c; R[p][q] = s; R[q][p] = -s;
    const AR = A.map((row) => R[0].map((_, j) => row.reduce((sum, x, k) => sum + x * R[k][j], 0)));
    A = R[0].map((_, i) => AR[0].map((__, j) => R.reduce((sum, row, k) => sum + row[i] * AR[k][j], 0)));
    const UR = U.map((row) => R[0].map((_, j) => row.reduce((sum, x, k) => sum + x * R[k][j], 0)));
    U.splice(0, n, ...UR);
  }
  return Array.from({ length: n }, (_, i) => ({ value: A[i][i], vector: U.map((row) => row[i]) }))
    .sort((a, b) => b.value - a.value);
}

const spectrum = jacobi(S);
const positive = spectrum.filter((x) => x.value > 1e-12);
assert.equal(positive.length, 3); // the neutrino weight is below the declared numerical resolution
assert(positive[0].value / positive[1].value > 1000);

const topRay = V[0].map((x, i) => x / Math.sqrt(D[i]));
const topNorm = Math.sqrt(topRay.reduce((s, x) => s + x * x, 0));
const topUnit = topRay.map((x) => x / topNorm);
const overlap = Math.abs(positive[0].vector.reduce((s, x, i) => s + x * topUnit[i], 0));
assert(overlap > 0.999999);

// The corresponding coefficient-space ray is D^{-1}v_u^T. It cannot lie in
// span{incidence, B-L, hypercharge}: the N, e and d components force all three
// coefficients to vanish, contradicting its nonzero Q and u entries.
const topCoefficientRay = V[0].map((x, i) => x / D[i]);
assert.deepEqual(topCoefficientRay.slice(2, 6), [0, 0, 0, 0]);
assert(topCoefficientRay[0] !== 0 && topCoefficientRay[1] !== 0 && topCoefficientRay[6] !== 0);

const q = [1, -1, -1, -3, 3, 3, 0];
const y = [1, -4, 2, -3, 6, 0, 3];
const lambda = [5, 5, 1, 1, 1, 0, -10];
// N component => q coefficient 0; e and d equations then force y and lambda coefficients 0.
const determinantForComponentsNED = [
  [q[5], y[5], lambda[5]],
  [q[4], y[4], lambda[4]],
  [q[2], y[2], lambda[2]],
];
const det3 = (A) => A[0][0] * (A[1][1] * A[2][2] - A[1][2] * A[2][1])
  - A[0][1] * (A[1][0] * A[2][2] - A[1][2] * A[2][0])
  + A[0][2] * (A[1][0] * A[2][1] - A[1][1] * A[2][0]);
assert.notEqual(det3(determinantForComponentsNED), 0);

console.log("PASS top-dominant broken-current mode");
console.log(`positive_modes_above_1e-12=${positive.length}`);
console.log(`leading_to_second_eigenvalue_ratio=${positive[0].value / positive[1].value}`);
console.log(`leading_overlap_with_top_only_ray=${overlap}`);
console.log("top_mode_in_span_incidence_BminusL_hypercharge=false");
console.log("interpretation=positive_spurion_hierarchy_not_full_one_loop_gamma");
