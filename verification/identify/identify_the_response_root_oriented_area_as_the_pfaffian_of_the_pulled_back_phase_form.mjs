import assert from 'node:assert/strict';

const tol = 1e-12;
const same = (A, B) => A.every((row, i) => row.every((x, j) => Math.abs(x - B[i][j]) < tol));
const product = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const det2 = ([[a, b], [c, d]]) => a * d - b * c;
const scale = (r, A) => A.map((row) => row.map((x) => r * x));
const dot = (u, v) => u[0] * v[0] + u[1] * v[1];

const I = [[1, 0], [0, 1]];
const D = [[1, 0], [0, -1]];
const X = [[0, 1], [1, 0]];
const J = [[0, 1], [-1, 0]];
const epsilon = product(D, X);
const Psi = [[2, 3], [-1, 4]]; // columns u,v
const pulledBack = product(product(transpose(Psi), J), Psi);
const a = det2(Psi);
assert.ok(same(pulledBack, scale(a, epsilon)));
assert.equal(pulledBack[0][1], a); // Pfaffian of a 2x2 alternating matrix

// Right channel transformations act on the Pfaffian coefficient by determinant.
for (const R of [D, X, epsilon]) {
  const transformed = product(Psi, transpose(R));
  assert.equal(det2(transformed), det2(R) * a);
}

// The realified antiunitary acts as Psi -> K Psi epsilon^T and reverses
// the response-root orientation because det K=-1 and det epsilon=+1.
const K = D;
const gammaPsi = product(product(K, Psi), transpose(epsilon));
assert.equal(det2(gammaPsi), -a);

// Controlled Fourier rotation of the second column rotates (c,a)->(a,-c).
const u = [Psi[0][0], Psi[1][0]];
const v = [Psi[0][1], Psi[1][1]];
const Jv = [v[1], -v[0]];
const twistedPsi = [[u[0], Jv[0]], [u[1], Jv[1]]];
const c = dot(u, v);
assert.equal(det2(twistedPsi), -c);
assert.equal(dot(u, Jv), a);
assert.ok(same(product(product(transpose(twistedPsi), J), twistedPsi), scale(-c, epsilon)));

console.log(JSON.stringify({
  protocol: 'response-root-pulled-back-pfaffian/1',
  identity: 'Psi^T J_phase Psi = det(Psi) epsilon_channel',
  pfaffianCoefficient: 'a=det(Psi)=u^T J v',
  hChiChannelReflectionParity: 'odd',
  gradedAntiunitaryParity: 'odd on coefficient, invariant alternating tensor type',
  controlledTurn: '(c,a) -> (a,-c)',
  microscopicWeakHiggsIdentification: false,
  passed: true,
}, null, 2));
