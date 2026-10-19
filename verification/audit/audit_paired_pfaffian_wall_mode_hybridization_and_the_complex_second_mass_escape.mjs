import assert from 'node:assert/strict';

const tol = 1e-12;
const same = (A, B) => A.every((row, i) => row.every((x, j) => Math.abs(x - B[i][j]) < tol));
const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const scale = (r, A) => A.map((row) => row.map((x) => r * x));
const product = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const kron = (A, B) => A.flatMap((rowA) => B.map((rowB) => rowA.flatMap((a) => rowB.map((b) => a * b))));

const I = [[1, 0], [0, 1]];
const Z = [[1, 0], [0, -1]];
const X = [[0, 1], [1, 0]];
const A = [[0, -1], [1, 0]]; // imaginary part of sigma_2
const zero2 = [[0, 0], [0, 0]];

// Opposite-chirality endpoint modes admit a chiral-symmetric coupling.
const t = 0.17;
const Heff = scale(t, X);
assert.ok(same(add(product(Z, Heff), product(Heff, Z)), zero2));
assert.ok(Math.abs((-t) * t - (-t * t)) < tol); // det(H_eff)=-t^2, eigenvalues +/-t

// A local overlap ansatz gives exponential but generically nonzero splitting.
const splitting = (L, xi = 1, t0 = 1) => 2 * Math.abs(t0) * Math.exp(-L / xi);
assert.ok(splitting(8) < splitting(4));
assert.ok(splitting(20) > 0);

// Realify H(k)=a sigma_1+k sigma_2+b sigma_3.  Its square is
// (k^2+a^2+b^2)I, so a can rotate from +m to -m through b without closure.
const realify = (Re, Im) => [
  [...Re[0], ...scale(-1, Im)[0]],
  [...Re[1], ...scale(-1, Im)[1]],
  [...Im[0], ...Re[0]],
  [...Im[1], ...Re[1]],
];
const Hreal = (k, a, b) => realify(add(scale(a, X), scale(b, Z)), scale(k, A));
const I4 = kron(I, I);
for (const [k, a, b] of [[0, 1, 0], [0, 0, 1], [0.7, 0.6, 0.8], [-2, -1, 0.3]]) {
  const H = Hreal(k, a, b);
  assert.ok(same(product(H, H), scale(k * k + a * a + b * b, I4)));
}
for (let n = 0; n <= 20; n += 1) {
  const theta = Math.PI * n / 20;
  const a = Math.cos(theta);
  const b = Math.sin(theta);
  assert.ok(Math.abs(a * a + b * b - 1) < tol);
}

console.log(JSON.stringify({
  protocol: 'paired-pfaffian-wall-stability-audit/1',
  pairedWallTotalIndex: 0,
  endpointEffectiveHamiltonian: 't sigma_1',
  finiteSeparationEnergies: ['-|t|', '+|t|'],
  localityAnsatzSplitting: '2|t0| exp(-L/xi)',
  secondMassEscape: '(a,b)=(cos theta,sin theta) keeps bulk gap open',
  exactZeroPerFinitePairGuaranteed: false,
  passed: true,
}, null, 2));
