import assert from "node:assert/strict";

const transpose = (A) => A[0].map((_, j) => A.map((r) => r[j]));
const mul = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
const det2 = (A) => A[0][0] * A[1][1] - A[0][1] * A[1][0];
const congruence = (M, A) => mul(mul(M, A), transpose(M));
const close = (a, b, eps = 1e-11) => Math.abs(a - b) < eps * (1 + Math.abs(a) + Math.abs(b));

const conePoints = [
  [[2, 0.4], [0.4, 1]],
  [[1, -0.7], [-0.7, 3]],
  [[4, 1.2], [1.2, 0.5]],
];
for (const A of conePoints) assert(A[0][0] > 0 && det2(A) > 0);

// Ward preservation of the q axis allows an upper-triangular scale/shear
// family. Two inequivalent members both preserve the positive cone.
const admissible = [
  [[1, 0], [0, 1]],
  [[2, -0.375], [0, 0.8]],
  [[0.5, 1.25], [0, 3]],
];

for (const M of admissible) {
  assert(!close(det2(M), 0));
  for (const A of conePoints) {
    const B = congruence(M, A);
    assert(close(B[0][1], B[1][0]));
    assert(B[0][0] > 0 && det2(B) > 0);
    assert(close(det2(B), det2(M) ** 2 * det2(A)));
  }
}

const probe = conePoints[0];
const images = admissible.map((M) => congruence(M, probe));
assert(images.some((A, i) => i > 0 && !close(A[0][1], images[0][0][1])));

console.log("PASS programme route separation");
console.log(`admissible_cone_isomorphisms_tested=${admissible.length}`);
console.log("ward_axis_preserved=true");
console.log("cone_equivalence_selects_intertwiner=false");
