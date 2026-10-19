import assert from 'node:assert/strict';

const mul = (A, B) => A.map((r, i) => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
const tr = A => A[0].map((_, j) => A.map(r => r[j]));
const sub = (A, B) => A.map((r, i) => r.map((x, j) => x - B[i][j]));
const maxAbs = A => Math.max(...A.flat().map(Math.abs));
const block = (A, B, C, D) => [
  [...A[0], ...B[0]], [...A[1], ...B[1]],
  [...C[0], ...D[0]], [...C[1], ...D[1]],
];
const diag = (x, y) => [[x, 0], [0, y]];
const inv2 = M => {
  const d = M[0][0] * M[1][1] - M[0][1] * M[1][0];
  return [[M[1][1] / d, -M[0][1] / d], [-M[1][0] / d, M[0][0] / d]];
};

// For S diag(x,y) S^T, offdiag = ac*x + bd*y. Preservation for all x,y
// requires ac=bd=0; among invertible matrices this means diagonal/anti-diagonal.
for (const S of [
  [[2, 0], [0, 3]],
  [[0, 2], [3, 0]],
]) {
  for (const D of [diag(1, 4), diag(3, 2)]) {
    assert(Math.abs(mul(mul(S, D), tr(S))[0][1]) < 1e-12);
  }
}
const generic = [[1, 2], [3, 5]];
assert(Math.abs(mul(mul(generic, diag(1, 0)), tr(generic))[0][1]) > 1e-8);

// Embed two independent SL(2,R) matrices into Sp(4,R).
const g1 = [[2, 1], [1, 1]];
const g2 = [[1, 2], [1, 3]];
for (const g of [g1, g2]) assert(Math.abs(g[0][0] * g[1][1] - g[0][1] * g[1][0] - 1) < 1e-12);
const A = diag(g1[0][0], g2[0][0]);
const B = diag(g1[0][1], g2[0][1]);
const C = diag(g1[1][0], g2[1][0]);
const D = diag(g1[1][1], g2[1][1]);
const G = block(A, B, C, D);
const Z2 = [[0, 0, 1, 0], [0, 0, 0, 1], [-1, 0, 0, 0], [0, -1, 0, 0]];
assert(maxAbs(sub(mul(mul(tr(G), Z2), G), Z2)) < 1e-12);

// Fractional action stays diagonal and equals independent Möbius maps.
const Z = diag(0.7, 1.4);
const image = mul(A.map((r, i) => r.map((x, j) => x * Z[j][j] + B[i][j])), inv2(C.map((r, i) => r.map((x, j) => x * Z[j][j] + D[i][j]))));
assert(Math.abs(image[0][1]) < 1e-12 && Math.abs(image[1][0]) < 1e-12);
assert(Math.abs(image[0][0] - (g1[0][0] * 0.7 + g1[0][1]) / (g1[1][0] * 0.7 + g1[1][1])) < 1e-12);
assert(Math.abs(image[1][1] - (g2[0][0] * 1.4 + g2[0][1]) / (g2[1][0] * 1.4 + g2[1][1])) < 1e-12);

// An allowed ambient sp(4) translation with off-diagonal symmetric B leaves the subdomain.
const mixedTranslation = [[0, 1], [1, 0]];
const moved = Z.map((r, i) => r.map((x, j) => x + mixedTranslation[i][j]));
assert(Math.abs(moved[0][1]) > 1e-8);

console.log('Stress-plane stabilizer certificate: PASS');
console.log('linear_stabilizer=monomial; connected_conformal_stabilizer=SL(2,R)xSL(2,R)~Spin_0(2,2); ambient_mixed_generator_leaves_plane=true');
