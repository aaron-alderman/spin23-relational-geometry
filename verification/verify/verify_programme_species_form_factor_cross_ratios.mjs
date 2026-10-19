import assert from "node:assert/strict";

const rays = {
  Q: [5n, 1n],
  u: [5n, -1n],
  d: [1n, -1n],
  L: [1n, -3n],
  e: [1n, 3n],
  N: [0n, 3n],
};
const wedge = (a, b) => a[0] * b[1] - a[1] * b[0];
const gcd = (a, b) => {
  a = a < 0n ? -a : a; b = b < 0n ? -b : b;
  while (b) [a, b] = [b, a % b];
  return a;
};
const fraction = (num, den) => {
  assert.notEqual(den, 0n);
  if (den < 0n) { num = -num; den = -den; }
  const g = gcd(num, den);
  return [num / g, den / g];
};
const crossRatio = (a, b, c, d) => fraction(
  wedge(a, c) * wedge(b, d),
  wedge(a, d) * wedge(b, c),
);
const apply = (M, v) => [M[0][0] * v[0] + M[0][1] * v[1], M[1][0] * v[0] + M[1][1] * v[1]];

assert.equal(wedge(rays.Q, rays.d), -6n);
assert.equal(wedge(rays.u, rays.e), 16n);
assert.equal(wedge(rays.Q, rays.e), 14n);
assert.equal(wedge(rays.u, rays.d), -4n);
assert.deepEqual(crossRatio(rays.Q, rays.u, rays.d, rays.e), [12n, 7n]);

const transformations = [
  [[2n, 1n], [1n, 1n]],
  [[-1n, 2n], [3n, 1n]],
  [[3n, -4n], [2n, 5n]],
];
for (const M of transformations) {
  const determinant = M[0][0] * M[1][1] - M[0][1] * M[1][0];
  assert.notEqual(determinant, 0n);
  const transformed = Object.fromEntries(Object.entries(rays).map(([k, v]) => [k, apply(M, v)]));
  assert.deepEqual(crossRatio(transformed.Q, transformed.u, transformed.d, transformed.e), [12n, 7n]);
  assert.equal(wedge(transformed.Q, transformed.d), determinant * wedge(rays.Q, rays.d));
}

const labels = Object.keys(rays);
let nondegenerateQuartets = 0;
for (let a = 0; a < labels.length; a++) for (let b = a + 1; b < labels.length; b++) {
  for (let c = b + 1; c < labels.length; c++) for (let d = c + 1; d < labels.length; d++) {
    const [A, B, C, D] = [labels[a], labels[b], labels[c], labels[d]].map((x) => rays[x]);
    if (wedge(A, D) !== 0n && wedge(B, C) !== 0n) {
      crossRatio(A, B, C, D);
      nondegenerateQuartets++;
    }
  }
}

console.log("PASS species form-factor cross-ratios");
console.log("C(Q,u;d,e)=12/7");
console.log(`nondegenerate_ordered_label_quartets=${nondegenerateQuartets}`);
console.log("common_GL2_calibration_invariant=true");
console.log("orientation_bit_detected=false");
