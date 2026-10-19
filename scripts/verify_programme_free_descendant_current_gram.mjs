import assert from "node:assert/strict";

const V = [
  [1, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, -1],
  [0, 0, 0, 1, 1, 0, -1],
  [0, 0, 0, 1, 0, 1, 1],
];
// Units: one left-handed Weyl component has current two-point weight one.
// A complex scalar contributes half as much; the Higgs doublet has two complex
// components, hence D_H=1.
const D = [6, 3, 3, 2, 1, 1, 1];
// Free Yukawa descendants have common weak-isospin multiplicity and relative
// color multiplicities 3,3,1,1. Values below are illustrative squared-Yukawa
// hierarchy after including those color factors.
const W = [3, 0.0018, 0.0001, 1e-24];
const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
const apply = (A, x) => A.map((row) => dot(row, x));

const rank = (A, tolerance = 1e-12) => {
  const M = A.map((r) => r.slice());
  let row = 0;
  for (let col = 0; col < M[0].length && row < M.length; col++) {
    let p = row;
    while (p < M.length && Math.abs(M[p][col]) < tolerance) p++;
    if (p === M.length) continue;
    [M[row], M[p]] = [M[p], M[row]];
    const pivot = M[row][col];
    for (let j = col; j < M[0].length; j++) M[row][j] /= pivot;
    for (let i = 0; i < M.length; i++) if (i !== row) {
      const f = M[i][col];
      for (let j = col; j < M[0].length; j++) M[i][j] -= f * M[row][j];
    }
    row++;
  }
  return row;
};
assert.equal(rank(V), 4);

const y = [1, -4, 2, -3, 6, 0, 3];
const b = [1, -1, -1, 0, 0, 0, 0];
const ell = [0, 0, 0, 1, -1, -1, 0];
for (const x of [y, b, ell]) assert.deepEqual(apply(V, x), [0, 0, 0, 0]);

const K = Array.from({ length: 7 }, (_, i) => Array.from({ length: 7 }, (_, j) =>
  V.reduce((s, row, a) => s + row[i] * W[a] * row[j] / D[i], 0)
));
for (const x of [y, b, ell]) {
  const image = K.map((row) => dot(row, x));
  assert(image.every((z) => Math.abs(z) < 1e-12));
}
// D-self-adjointness.
for (let i = 0; i < 7; i++) for (let j = 0; j < 7; j++) {
  assert(Math.abs(D[i] * K[i][j] - D[j] * K[j][i]) < 1e-12);
}

const S = Array.from({ length: 7 }, (_, i) => Array.from({ length: 7 }, (_, j) =>
  V.reduce((s, row, a) => s + row[i] * W[a] * row[j] / Math.sqrt(D[i] * D[j]), 0)
));
function jacobi(A) {
  const n = A.length;
  A = A.map((r) => r.slice());
  const U = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => i === j ? 1 : 0));
  for (let step = 0; step < 1200; step++) {
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
  return Array.from({ length: n }, (_, i) => ({ value: A[i][i], vector: U.map((r) => r[i]) })).sort((a, b) => b.value - a.value);
}
const eig = jacobi(S);
const positive = eig.filter((x) => x.value > 1e-12);
assert.equal(positive.length, 3); // neutrino channel is below the numerical resolution
assert(positive[0].value / positive[1].value > 1000);

const top = V[0].map((x, i) => x / Math.sqrt(D[i]));
const topNorm = Math.sqrt(dot(top, top));
const overlap = Math.abs(dot(positive[0].vector, top.map((x) => x / topNorm)));
assert(overlap > 0.999999);

// Weighted least-breaking Higgs dressing.
const hStar = -(10 * W[0] - 6 * W[1] - 2 * W[2] + W[3]) / W.reduce((s, x) => s + x, 0);
assert(hStar < -9.99 && hStar > -10);

console.log("PASS free-descendant current Gram matrix");
console.log("current_metric=(6,3,3,2,1,1,1); descendant_color_weights=(3,3,1,1)");
console.log("rank_broken_space=4; exact_kernel=span(Y,B,L)");
console.log(`resolved_leading_to_second_ratio=${positive[0].value / positive[1].value}`);
console.log(`leading_top_ray_overlap=${overlap}`);
console.log(`weighted_best_higgs_dressing=${hStar}`);
console.log("domain_of_theorem=weakly_broken_fixed_point; running_SM_requires_local_RG_extension");
