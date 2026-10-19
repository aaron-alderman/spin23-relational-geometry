import assert from 'node:assert/strict';

const tol = 1e-10;
const same = (A, B) => A.every((row, i) => row.every((x, j) => Math.abs(x - B[i][j]) < tol));
const product = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const scale = (r, A) => A.map((row) => row.map((x) => r * x));
const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));

// Real representation of -i sigma_2, plus sigma_1 and chiral sigma_3.
const A = [[0, -1], [1, 0]]; // -i sigma_2
const sigma1 = [[0, 1], [1, 0]];
const sigma3 = [[1, 0], [0, -1]];
const zero = [[0, 0], [0, 0]];
assert.ok(same(add(product(sigma3, A), product(A, sigma3)), zero));
assert.ok(same(add(product(sigma3, sigma1), product(sigma1, sigma3)), zero));

const matVec = (M, v) => M.map((row) => row[0] * v[0] + row[1] * v[1]);
const sech = (x) => 1 / Math.cosh(x);
const mass = (x) => Math.tanh(x);
const psi = (x) => [sech(x) / Math.sqrt(2), 0];
const dpsi = (x) => [-Math.tanh(x) * sech(x) / Math.sqrt(2), 0];

for (const x of [-8, -3, -0.4, 0, 0.7, 4, 9]) {
  const kinetic = matVec(A, dpsi(x));
  const potential = matVec(scale(mass(x), sigma1), psi(x));
  assert.ok(kinetic.every((v, i) => Math.abs(v + potential[i]) < tol));
}

// Analytic normalization integral: integral sech^2(x)/2 dx = 1.
const primitive = (x) => 0.5 * Math.tanh(x);
assert.ok(Math.abs((primitive(30) - primitive(-30)) - 1) < tol);

// The Clifford relations imply the constant asymptotic symbol has
// H(k)^2=(k^2+m^2)I.
assert.ok(same(product(A, A), scale(-1, [[1, 0], [0, 1]])));
assert.ok(same(product(sigma1, sigma1), [[1, 0], [0, 1]]));
assert.ok(same(add(product(A, sigma1), product(sigma1, A)), zero));

console.log(JSON.stringify({
  protocol: 'response-pfaffian-wall-bdi-zero-mode/1',
  operator: 'H=-i sigma_2 d_x + a(x) sigma_1',
  profile: 'a(x)=tanh(x)',
  normalizedZeroMode: 'psi=(sech(x)/sqrt(2),0)',
  chiralSymmetry: 'sigma_3',
  particleHole: 'C=sigma_3 K, C^2=+1',
  asymptoticGap: true,
  standardModelCouplingDerived: false,
  passed: true,
}, null, 2));
