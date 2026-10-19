import assert from 'node:assert/strict';

const tol = 1e-11;
const add = (A, B) => A.map((r, i) => r.map((x, j) => x + B[i][j]));
const scale = (a, A) => A.map((r) => r.map((x) => a * x));
const mul = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
const tr = (A) => A[0].map((_, j) => A.map((r) => r[j]));
const eye = (n) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => +(i === j)));
const diag = (xs) => xs.map((x, i) => xs.map((_, j) => (i === j ? x : 0)));
const same = (A, B) => A.every((r, i) => r.every((x, j) => Math.abs(x - B[i][j]) < tol));

const s2 = Math.sqrt(2);
const A = [[0, 1 / s2, 0, 1 / s2], [1 / s2, 0, 1 / s2, 0]];
const p = diag([1, -1, 1, -1]);
const FC = [[0, 0, 0, 1], [0, 0, 1, 0], [0, 1, 0, 0], [1, 0, 0, 0]];
const D = diag([1, -1]);
const X = [[0, 1], [1, 0]];
const epsilon = mul(D, X);
const G = mul(FC, p);

assert.ok(same(tr(G), scale(-1, G)));
assert.ok(same(mul(G, G), scale(-1, eye(4))));
assert.ok(same(mul(A, G), mul(epsilon, A)));

// Q=iG is Hermitian and Q^2=I because G is real skew and G^2=-I.
const mu = 1.7;
const g = 1.2;
assert.ok(mu >= Math.abs(g));
const pulseEigenvalues = [mu - g, mu - g, mu + g, mu + g];
assert.ok(pulseEigenvalues.every((x) => x >= 0));

const angle = 0.63;
const sourceFlow = add(scale(Math.cos(angle), eye(4)), scale(Math.sin(angle), G));
const targetFlow = add(scale(Math.cos(angle), eye(2)), scale(Math.sin(angle), epsilon));
assert.ok(same(mul(tr(sourceFlow), sourceFlow), eye(4)));
assert.ok(same(mul(A, sourceFlow), mul(targetFlow, A)));

const targetGeneratorFromCompression = mul(mul(A, G), tr(A));
assert.ok(same(targetGeneratorFromCompression, epsilon));

console.log(JSON.stringify({
  protocol: 'minimal-positive-furey-channel-response-pulse/1',
  sourceSchrodingerHamiltonian: 'H(t)=mu(t) I + i g(t) F_C p',
  hermiticityReason: '(F_C p)^T=-(F_C p)',
  instantaneousSpectrum: 'mu(t) +/- g(t), each twice',
  positivityCondition: 'mu(t)>=|g(t)|',
  evolution: 'common phase times exp(theta F_C p), theta=integral g(t) dt',
  targetCompression: 'A (F_C p) A^T=epsilon',
  crossedBulkDegeneracyRequiredForPulse: false,
  microscopicGaugeChargeCompletionDerived: false,
  passed: true,
}, null, 2));
