import assert from 'node:assert/strict';

const tol = 1e-12;
const same = (A, B) => A.every((row, i) => row.every((x, j) => Math.abs(x - B[i][j]) < tol));
const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const scale = (r, A) => A.map((row) => row.map((x) => r * x));
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const product = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const kron = (A, B) => A.flatMap((rowA) => B.map((rowB) => rowA.flatMap((a) => rowB.map((b) => a * b))));
const I2 = [[1, 0], [0, 1]];
const Z = [[1, 0], [0, -1]];
const X = [[0, 1], [1, 0]];
const J = [[0, 1], [-1, 0]];
const K = Z;
const eps = product(Z, X); // [[0,1],[-1,0]]
const P = scale(0.5, add(I2, Z));
const Q = scale(0.5, add(I2, scale(-1, Z)));
const Omega = kron(J, I2);
const I4 = kron(I2, I2);

// Channel-controlled Fourier quarter-turn on the negative D eigenspace.
const Sminus = add(kron(I2, P), kron(J, Q));
const expected = [
  [1, 0, 0, 0],
  [0, 0, 0, 1],
  [0, 0, 1, 0],
  [0, -1, 0, 0],
];
assert.ok(same(Sminus, expected));
assert.ok(same(product(product(transpose(Sminus), Omega), Sminus), Omega));

const D4 = kron(I2, Z);
assert.ok(same(product(Sminus, Sminus), D4));
assert.ok(same(product(product(Sminus, Sminus), product(Sminus, Sminus)), I4));

// Established realification of Gamma=epsilon K: K_phase tensor epsilon_channel.
const GammaR = kron(K, eps);
assert.ok(same(product(GammaR, GammaR), scale(-1, I4)));
assert.ok(!same(GammaR, Sminus));

// Gamma swaps the selected channel and reverses the Fourier orientation.
const SplusInverse = add(kron(I2, Q), scale(-1, kron(J, P)));
const GammaInv = scale(-1, GammaR);
assert.ok(same(product(product(GammaR, Sminus), GammaInv), SplusInverse));
assert.ok(same(product(SplusInverse, SplusInverse), scale(-1, D4)));

// Cascading the two complementary controlled transforms yields the global
// D-graded complex structure.
const gradedJ = scale(-1, kron(J, Z));
assert.ok(same(product(Sminus, SplusInverse), gradedJ));
assert.ok(same(product(gradedJ, gradedJ), scale(-1, I4)));

console.log(JSON.stringify({
  protocol: 'split-tkk-exchange-versus-furey-antiunitary/1',
  canonicalExchange: 'S_-=I_phase tensor e_+ + J_phase tensor e_-',
  square: 'S_-^2=I_phase tensor D',
  realifiedAntiunitary: 'Gamma_R=K_phase tensor epsilon_channel',
  equality: false,
  conjugation: 'Gamma_R S_- Gamma_R^{-1}=S_+^{-1}',
  complementaryProduct: 'S_- S_+^{-1}=-J_phase tensor D',
  physicalControlledFourierActionDerived: false,
  passed: true,
}, null, 2));
