import assert from "node:assert/strict";

const mod = (x, p) => ((x % p) + p) % p;
const add2 = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const scale2 = (n, A) => A.map((row) => row.map((x) => n * x));
const outer = (u) => u.map((x) => u.map((y) => x * y));
const reduce2 = (A, p) => A.map((row) => row.map((x) => mod(x, p)));

const e1 = [1, 0], e2 = [0, 1], sum = [1, 1];
const Kplus = add2(add2(scale2(2, outer(sum)), outer(e1)), outer(e2));
assert.deepEqual(Kplus, [[3, 2], [2, 3]]);
assert.deepEqual(reduce2(Kplus, 2), [[1, 0], [0, 1]]);
assert.deepEqual(reduce2(Kplus, 3), [[0, 2], [2, 0]]);
assert.equal(Kplus[0][0] * Kplus[1][1] - Kplus[0][1] * Kplus[1][0], 5);
assert.deepEqual([Kplus[0][0] + Kplus[0][1], Kplus[1][0] + Kplus[1][1]], [5, 5]);
assert.deepEqual([Kplus[0][0] - Kplus[0][1], Kplus[1][0] - Kplus[1][1]], [1, -1]);

// Integral physical representatives on the fourteen retained matter fields.
const vector = (entries) => {
  const v = Array(14).fill(0);
  for (const [i, x] of entries) v[i] = x;
  return v;
};
const z1 = vector([[2, 1], [3, 1], [6, -1]]);
const z2 = vector([[3, 1], [6, -1], [13, 1]]);
const z12 = vector([[6, -1], [10, -1]]);
assert.deepEqual([z1, z2, z12].map((v) => v.filter((x) => x !== 0).length), [3, 3, 2]);
const union = new Set();
for (const v of [z1, z2, z12]) v.forEach((x, i) => { if (x) union.add(i); });
assert.deepEqual([...union].sort((a, b) => a - b), [2, 3, 6, 10, 13]);

// The coefficient patterns reduce to the already certified qutrit axes and to
// their binary support indicators.
assert.deepEqual(z1.map((x) => mod(x, 3)).filter((x) => x !== 0), [1, 1, 2]);
assert.deepEqual(z2.map((x) => mod(x, 3)).filter((x) => x !== 0), [1, 2, 1]);
assert.deepEqual(z12.map((x) => mod(x, 3)).filter((x) => x !== 0), [2, 2]);
assert.deepEqual([z1, z2, z12].map((v) => v.map((x) => mod(x, 2)).filter((x) => x !== 0).length), [3, 3, 2]);

console.log("integral_word=T_Z1plusZ2_squared*T_Z1*T_Z2");
console.log("integral_shear_Kplus=[[3,2],[2,3]],determinant=5,eigenvalues=5,1");
console.log("mod2_shadow=equal_diagonal_shear_I2,sum_axis_square_vanishes_symplectically");
console.log("mod3_shadow=mutual_shear_0_2__2_0,diagonal_three_vanishes");
console.log("integral_physical_axis_weights=3,3,2,union_indices=2,3,6,10,13");
console.log("same_five_field_Furey_spanning_tree_support_works_at_two_and_three");
