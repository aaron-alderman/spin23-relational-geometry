import assert from 'node:assert/strict';

const same = (A, B, tol = 1e-12) => A.every((row, i) => row.every((x, j) => Math.abs(x - B[i][j]) < tol));
const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const scale = (r, A) => A.map((row) => row.map((x) => r * x));
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const product = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const comm = (A, B) => add(product(A, B), scale(-1, product(B, A)));
const eye = (n) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => i === j ? 1 : 0));
const zero = (n, m = n) => Array.from({ length: n }, () => Array(m).fill(0));
const block = (A, B, C, D) => A.map((row, i) => [...row, ...B[i]]).concat(C.map((row, i) => [...row, ...D[i]]));

const E = [[0, 1], [0, 0]];
const F = [[0, 0], [1, 0]];
const H = [[1, 0], [0, -1]];
const I2 = eye(2);

assert.ok(same(product(E, E), zero(2)));
assert.ok(same(product(F, F), zero(2)));
assert.ok(same(comm(E, F), H));
assert.ok(same(comm(H, E), scale(2, E)));
assert.ok(same(comm(H, F), scale(-2, F)));

// First logarithmic jet: the primal derivative sends value to derivative and
// truncates the second derivative, giving F.  The dual generator is -F^T=-E.
const primalJetGenerator = F;
const dualJetGenerator = scale(-1, transpose(primalJetGenerator));
assert.ok(same(dualJetGenerator, scale(-1, E)));

// Nilpotence makes the exponential exact after the linear term.
const Nminus = add(I2, dualJetGenerator);
assert.ok(same(Nminus, [[1, -1], [0, 1]]));

// Canonical symplectic embedding A -> diag(A,-A^T).
const embed = (A) => block(A, zero(2), zero(2), scale(-1, transpose(A)));
const Omega = block(zero(2), I2, scale(-1, I2), zero(2));
for (const A of [E, F, H]) {
  const X = embed(A);
  assert.ok(same(add(product(transpose(X), Omega), product(Omega, X)), zero(4)));
}
assert.ok(same(comm(embed(E), embed(F)), embed(H)));
assert.ok(same(comm(embed(H), embed(E)), scale(2, embed(E))));
assert.ok(same(comm(embed(H), embed(F)), scale(-2, embed(F))));

console.log(JSON.stringify({
  protocol: 'pole-jet-sl2-sp4-closure/1',
  primalJetGenerator: 'F=E_21',
  dualResidueGenerator: '-F^T=-E_12',
  residueShear: 'exp(-E_12)=I-E_12',
  grading: 'D=[E_12,E_21]',
  lieClosure: 'sl(2,R)',
  symplecticEmbedding: 'A -> diag(A,-A^T) in sp(4,R)',
  physicalJordanIdempotentIdentified: false,
  passed: true,
}, null, 2));
