import assert from 'node:assert/strict';

const tol = 1e-12;
const same = (A, B) => A.every((row, i) => row.every((x, j) => Math.abs(x - B[i][j]) < tol));
const product = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const scale = (r, A) => A.map((row) => row.map((x) => r * x));

const X = [[0, 1], [1, 0]];
const A = [[0, -1], [1, 0]]; // -i sigma_2 = epsilon
const epsilon = A;
const epsilonInv = scale(-1, epsilon);

// Spatial reflection P reverses the derivative and preserves the symmetric
// kink-antikink mass profile. Internal conjugations then give the full signs.
assert.ok(same(product(product(X, A), X), scale(-1, A)));
assert.ok(same(product(product(X, X), X), X));
assert.ok(same(product(product(epsilon, A), epsilonInv), A));
assert.ok(same(product(product(epsilon, X), epsilonInv), scale(-1, X)));
// Including P: Theta=P X K preserves both terms; Gamma=P epsilon K reverses both.

const m0 = 1.3;
const L = 2.4;
const fLeft = (x) => Math.sqrt(m0) * Math.exp(-m0 * Math.abs(x));
const fRight = (x) => Math.sqrt(m0) * Math.exp(-m0 * Math.abs(x - L));
const exactT = -m0 * Math.exp(-m0 * L);

// The pair differs from the isolated right antikink only for x<0, where the
// mass changes by -2m0.  This integral is the exact projected matrix element.
const dx = 2e-4;
let numericalT = 0;
const lower = -16;
const intervalCount = Math.round((0 - lower) / dx);
for (let i = 0; i < intervalCount; i += 1) {
  const midpoint = lower + (i + 0.5) * dx;
  numericalT += (-2 * m0) * fLeft(midpoint) * fRight(midpoint) * dx;
}
assert.ok(Math.abs(numericalT - exactT) < 2e-7);

// Reflection about L/2 exchanges the normalized endpoint envelopes.
for (const x of [-4, -0.2, 0, 0.7, L, 3.9, 8]) {
  assert.ok(Math.abs(fLeft(L - x) - fRight(x)) < tol);
}

console.log(JSON.stringify({
  protocol: 'piecewise-pfaffian-kink-antikink-endpoint-projection/1',
  massProfile: '-m0 outside [0,L], +m0 inside',
  endpointModes: ['sqrt(m0) exp(-m0|x|) e_+', 'sqrt(m0) exp(-m0|x-L|) e_-'],
  exactProjectedMixing: 't=-m0 exp(-m0 L)',
  theta: 'P X K commutes with H',
  gamma: 'P epsilon K anticommutes with H',
  realizedClass: 'CI',
  fullBoundStateEnergyEqualsProjectedTExactly: false,
  passed: true,
}, null, 2));
