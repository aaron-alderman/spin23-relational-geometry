import assert from "node:assert/strict";

const V = [
  [1, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, -1],
  [0, 0, 0, 1, 1, 0, -1],
  [0, 0, 0, 1, 0, 1, 1],
];
// Linear anomaly coefficients in an all-left-handed basis. Overall row
// normalizations are conventional and do not affect rank or kernel.
const A = [
  [2, 1, 1, 0, 0, 0, 0],          // 2 SU(3)^2-X
  [3, 0, 0, 1, 0, 0, 0],          // 2 SU(2)^2-X
  [6, 48, 12, 18, 36, 0, 0],      // (6Y)^2-X
  [6, 3, 3, 2, 1, 1, 0],          // gravity^2-X
];
const hypercharge = [1, -4, 2, -3, 6, 0, 3];
const baryon3 = [1, -1, -1, 0, 0, 0, 0];
const lepton = [0, 0, 0, 1, -1, -1, 0];
const bMinusL3 = baryon3.map((x, i) => x - 3 * lepton[i]);
const incidence = [5, 5, 1, 1, 1, 0, 0];
const dot = (x, y) => x.reduce((s, a, i) => s + a * y[i], 0);
const mv = (M, x) => M.map((r) => dot(r, x));
function rank(M, eps = 1e-10) {
  M = M.map((r) => r.slice());
  let k = 0;
  for (let j = 0; j < M[0].length && k < M.length; j++) {
    let p = k;
    for (let i = k + 1; i < M.length; i++) if (Math.abs(M[i][j]) > Math.abs(M[p][j])) p = i;
    if (Math.abs(M[p][j]) < eps) continue;
    [M[k], M[p]] = [M[p], M[k]];
    const q = M[k][j];
    for (let c = j; c < M[0].length; c++) M[k][c] /= q;
    for (let i = 0; i < M.length; i++) if (i !== k) {
      const f = M[i][j];
      for (let c = j; c < M[0].length; c++) M[i][c] -= f * M[k][c];
    }
    k++;
  }
  return k;
}

assert.equal(rank(V), 4);
assert.equal(rank([...V, ...A]), 5);
for (const x of [hypercharge, bMinusL3]) {
  assert.deepEqual(mv(V, x), [0, 0, 0, 0]);
  assert.deepEqual(mv(A, x), [0, 0, 0, 0]);
}
assert.notDeepEqual(mv(A, baryon3), [0, 0, 0, 0]);
assert.notDeepEqual(mv(A, lepton), [0, 0, 0, 0]);
assert.deepEqual(mv(V, incidence), [10, 6, 2, 1]);
assert.deepEqual(mv(A, incidence), [16, 16, 336, 51]);

console.log("PASS ALP completion of current quotient");
console.log("Yukawa_map_rank=4; Yukawa_kernel=span(6Y,3B,L)");
console.log("Yukawa_plus_linear_anomaly_map_rank=5");
console.log("combined_kernel=span(6Y,3(B-L))");
console.log("after_gauged_hypercharge_quotient=one_null_direction_3(B-L)_and_five_ALP-active_directions");
console.log("incidence_Yukawa_image=(10,6,2,1)");
console.log("incidence_anomaly_image_in_declared_normalization=(16,16,336,51)");
