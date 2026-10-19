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
const Kphase = Z;
const eps = product(Z, X);
const P = scale(0.5, add(I2, Z));
const Q = scale(0.5, add(I2, scale(-1, Z)));
const I4 = kron(I2, I2);
const Omega = kron(J, I2);

// Positive-semidefinite quadratic Hamiltonian on the negative channel only.
const Hessian = kron(I2, Q);
const generator = product(Omega, Hessian); // J tensor Q
assert.ok(same(generator, kron(J, Q)));
assert.ok(same(add(product(transpose(generator), Omega), product(Omega, generator)), scale(0, I4)));

// Closed exponential because P,Q are complementary projectors.
const flow = (theta) => add(
  kron(I2, P),
  add(scale(Math.cos(theta), kron(I2, Q)), scale(Math.sin(theta), kron(J, Q))),
);
const Sminus = add(kron(I2, P), kron(J, Q));
assert.ok(same(flow(Math.PI / 2), Sminus));
assert.ok(same(product(transpose(Sminus), Sminus), I4));
assert.ok(same(product(product(transpose(Sminus), Omega), Sminus), Omega));

// The positive oscillator energy and total Euclidean norm are conserved.
assert.ok(same(add(product(transpose(generator), Hessian), product(Hessian, generator)), scale(0, I4)));

// The graded antiunitary realification sends the generator to the inverse
// oscillator generator on the complementary channel.
const GammaR = kron(Kphase, eps);
const GammaInv = scale(-1, GammaR);
const conjugatedGenerator = product(product(GammaR, generator), GammaInv);
const complementaryInverseGenerator = scale(-1, kron(J, P));
assert.ok(same(conjugatedGenerator, complementaryInverseGenerator));
const SplusInverse = add(kron(I2, Q), scale(-1, kron(J, P)));
assert.ok(same(
  product(product(GammaR, Sminus), GammaInv),
  SplusInverse,
));

console.log(JSON.stringify({
  protocol: 'passive-projected-oscillator-controlled-fourier/1',
  hamiltonian: 'H_-=(omega/2)(q^T e_- q+p^T e_- p)',
  evolutionTime: 'pi/(2 omega)',
  exactFlow: 'S_-=I tensor e_+ + J tensor e_-',
  positiveSemidefiniteHamiltonian: true,
  symplectic: true,
  orthogonal: true,
  passiveLossless: true,
  antiunitaryImage: 'complementary inverse oscillator on e_+',
  microscopicFureyHiggsOriginDerived: false,
  passed: true,
}, null, 2));
