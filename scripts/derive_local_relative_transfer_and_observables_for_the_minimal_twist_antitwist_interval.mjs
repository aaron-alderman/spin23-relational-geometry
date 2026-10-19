import assert from 'node:assert/strict';

const tol = 1e-12;
const same = (A, B) => A.every((row, i) => row.every((x, j) => Math.abs(x - B[i][j]) < tol));
const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const scale = (r, A) => A.map((row) => row.map((x) => r * x));
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const product = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const kron = (A, B) => A.flatMap((rowA) => B.map((rowB) => rowA.flatMap((a) => rowB.map((b) => a * b))));

const I = [[1, 0], [0, 1]];
const D = [[1, 0], [0, -1]];
const X = [[0, 1], [1, 0]];
const J = [[0, 1], [-1, 0]];
const P = scale(0.5, add(I, D));
const Q = scale(0.5, add(I, scale(-1, D)));
const I4 = kron(I, I);
const E = kron(I, product(D, X));
const Sneg = (sign) => add(kron(I, P), scale(sign, kron(J, Q)));
const Spos = (sign) => add(kron(I, Q), scale(sign, kron(J, P)));
const turn = (symbol) => symbol === 0 ? I4 : Sneg(symbol);
const inverse = transpose; // all matrices used here are orthogonal
const power = (A, n) => {
  let out = I4;
  for (let k = 0; k < n; k += 1) out = product(A, out);
  return out;
};
const relativePath = (schedule) => {
  let W = I4;
  return schedule.map((symbol, n) => {
    W = product(product(E, turn(symbol)), W);
    return product(W, inverse(power(E, n + 1)));
  });
};

const chiPlus = [1, 0, -1, 0, 0, 0];
const chiMinus = [1, 0, 0, 0, -1, 0];
const pathPlus = relativePath(chiPlus);
const pathMinus = relativePath(chiMinus);
assert.ok(same(pathPlus[0], Spos(1)));
assert.ok(same(pathPlus[1], Sneg(1)));
assert.ok(same(pathPlus[2], I4));
assert.ok(same(pathPlus[5], I4));
assert.ok(same(pathMinus[0], Spos(1)));
assert.ok(same(pathMinus[1], Sneg(1)));
assert.ok(same(pathMinus[2], Spos(1)));
assert.ok(same(pathMinus[3], Sneg(1)));
assert.ok(same(pathMinus[4], I4));
assert.ok(same(pathMinus[5], I4));

// A quarter-turn leaves isotropic covariance invariant but reverses the
// traceless quadrature tensor on its active face.
const phaseAnisotropy = D;
assert.ok(same(product(product(J, phaseAnisotropy), transpose(J)), scale(-1, phaseAnisotropy)));
assert.ok(same(product(product(J, I), transpose(J)), I));

// For carrier columns u,v, the controlled turn v -> Jv rotates the
// relationship doublet (dot product, oriented area) by a quarter-turn.
const u = [2, -1];
const v = [3, 4];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1];
const area = (a, b) => a[0] * b[1] - a[1] * b[0];
const Jv = [v[1], -v[0]];
const c = dot(u, v);
const a = area(u, v);
assert.equal(dot(u, Jv), a);
assert.equal(area(u, Jv), -c);
const norm2 = (x) => dot(x, x);
assert.equal(norm2(u) * norm2(v) - c ** 2, a ** 2);
assert.equal(norm2(u) * norm2(Jv) - dot(u, Jv) ** 2, c ** 2);

console.log(JSON.stringify({
  protocol: 'minimal-twist-antitwist-local-relative-transfer/1',
  chiPlusRelativePath: ['S_+^(+)', 'S_-^(+)', 'I', 'I', 'I', 'I'],
  chiMinusRelativePath: ['S_+^(+)', 'S_-^(+)', 'S_+^(+)', 'S_-^(+)', 'I', 'I'],
  globalRelativeHolonomy: 'I for both sectors',
  isotropicCovarianceDetectsInterval: false,
  tracelessQuadratureTensor: 'sign reversed on the active face',
  relationshipDoublet: '(u dot v, u^T J v) maps to (u^T J v, -u dot v)',
  jordanGramExchange: 'offDiagonalSquared and determinant are exchanged',
  passed: true,
}, null, 2));
