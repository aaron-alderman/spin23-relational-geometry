import assert from 'node:assert/strict';

const tol = 1e-12;
const same = (A, B) => A.every((row, i) => row.every((x, j) => Math.abs(x - B[i][j]) < tol));
const product = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const scale = (r, A) => A.map((row) => row.map((x) => r * x));
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));

const I = [[1, 0], [0, 1]];
const X = [[0, 1], [1, 0]];
const epsilon = [[0, 1], [-1, 0]];
const epsilonInv = scale(-1, epsilon);
const t = 0.31;
const H = scale(t, X);
const N = scale(0.7, I);

// Because H and N are real, antiunitary conjugation reduces here to U(.)U^-1.
const theta = (M) => product(product(X, M), X);
const gamma = (M) => product(product(epsilon, M), epsilonInv);
assert.ok(same(theta(H), H));
assert.ok(same(gamma(H), scale(-1, H)));
assert.ok(same(theta(N), N));
assert.ok(same(gamma(N), N));
assert.ok(same(transpose(H), H)); // reciprocal endpoint Hamiltonian

// The same scalar noise admits both antiunitaries and therefore cannot select
// their Hamiltonian role assignment by itself.
assert.ok(same(N, transpose(N)));

console.log(JSON.stringify({
  protocol: 'minimal-reciprocal-endpoint-kernel-CI-witness/1',
  endpointHamiltonian: 'H=t X',
  reciprocity: 'H^T=H',
  thetaAction: '+H (time-reversal-like)',
  gammaAction: '-H (particle-hole-like)',
  realizedSquarePattern: 'CI',
  scalarNoiseSelectsRoleAssignment: false,
  dIIIExcludedMicroscopically: false,
  passed: true,
}, null, 2));
