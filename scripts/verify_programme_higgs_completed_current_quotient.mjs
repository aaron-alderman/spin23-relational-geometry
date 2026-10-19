import assert from "node:assert/strict";

const V = [
  [1, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, -1],
  [0, 0, 0, 1, 1, 0, -1],
  [0, 0, 0, 1, 0, 1, 1],
];
const y = [1, -4, 2, -3, 6, 0, 3];
const b = [1, -1, -1, 0, 0, 0, 0];
const ell = [0, 0, 0, 1, -1, -1, 0];
const q = [1, -1, -1, -3, 3, 3, 0];
const dot = (x, z) => x.reduce((s, xi, i) => s + xi * z[i], 0);
const apply = (A, x) => A.map((r) => dot(r, x));

for (const x of [y, b, ell, q]) assert.deepEqual(apply(V, x), [0, 0, 0, 0]);
assert.deepEqual(q, b.map((x, i) => x - 3 * ell[i]));

function rank(A) {
  const M = A.map((r) => r.map(Number));
  let row = 0;
  for (let col = 0; col < M[0].length && row < M.length; col++) {
    let p = row;
    while (p < M.length && Math.abs(M[p][col]) < 1e-12) p++;
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
}
assert.equal(rank(V), 4);
assert.equal(7 - rank(V), 3);
assert.equal(rank([y, b, ell]), 3);

const lambdaH = (h) => [5, 5, 1, 1, 1, 0, h];
assert.deepEqual(apply(V, lambdaH(0)), [10, 6, 2, 1]);
for (const h of [-20, -10, -0.75, 0, 6, 20]) {
  assert.notDeepEqual(apply(V, lambdaH(h)), [0, 0, 0, 0]);
}

const optimum = ([wu, wd, we, wn]) => -(10 * wu - 6 * wd - 2 * we + wn) / (wu + wd + we + wn);
assert.equal(optimum([1, 1, 1, 1]), -0.75);
const breaking = (h, [wu, wd, we, wn]) => wu * (10 + h) ** 2 + wd * (6 - h) ** 2 + we * (2 - h) ** 2 + wn * (1 + h) ** 2;
for (const weights of [[1, 1, 1, 1], [100, 1, 1, 0.1], [1, 2, 3, 4]]) {
  const h = optimum(weights);
  const eps = 1e-5;
  assert(breaking(h, weights) <= breaking(h - eps, weights));
  assert(breaking(h, weights) <= breaking(h + eps, weights));
}

console.log("PASS Higgs-completed current quotient");
console.log("rank_V=4 nullity=3");
console.log("null_basis=6Y,3B,L");
console.log("anomaly_safe_global_axis=3(B-L)");
console.log("equal_weight_h_star=-3/4");
