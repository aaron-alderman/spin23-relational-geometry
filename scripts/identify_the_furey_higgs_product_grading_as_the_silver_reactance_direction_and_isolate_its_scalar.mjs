import assert from 'node:assert/strict';

const close = (a, b, e = 1e-12) => Math.abs(a - b) < e;
const mm = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
const transpose = (A) => A[0].map((_, j) => A.map((r) => r[j]));
const scale = (s, A) => A.map((r) => r.map((x) => s * x));
const eq = (A, B) => A.every((r, i) => r.every((x, j) => close(x, B[i][j])));
const diag = (...xs) => xs.map((x, i) => xs.map((_, j) => i === j ? x : 0));
const I2 = diag(1, 1), I4 = diag(1, 1, 1, 1);
const h = diag(1, -1, -1, 1);
const chi = diag(1, 1, -1, -1);
const p = mm(h, chi);
const A = scale(1 / Math.sqrt(2), [[0, 1, 0, 1], [1, 0, 1, 0]]);
const P = mm(transpose(A), A);
const D = diag(1, -1);
const pAgg = mm(mm(A, p), transpose(A));

assert.ok(eq(mm(h, h), I4));
assert.ok(eq(mm(chi, chi), I4));
assert.ok(eq(mm(h, chi), mm(chi, h)));
assert.ok(eq(mm(p, p), I4));
assert.ok(eq(mm(A, transpose(A)), I2));
assert.ok(eq(mm(p, P), mm(P, p)));
assert.ok(eq(pAgg, scale(-1, D)));
assert.ok(eq(mm(pAgg, pAgg), I2));

const reactance = (k) => scale(k, pAgg);
for (const k of [0.2, 1, 2.7]) assert.ok(eq(mm(reactance(k), reactance(k)), scale(k * k, I2)));

const relativePhase = (k) => -4 * Math.atan(k);
assert.ok(close(relativePhase(1), -Math.PI));
for (const k of [0.1, 0.7, 1.3, 5]) if (k !== 1) assert.ok(!close(Math.cos(relativePhase(k)), -1) || !close(Math.sin(relativePhase(k)), 0));

const ratioMinus = (k) => (1 + Math.sqrt(1 + k * k)) / k;
const ratioPlus = (k) => k / (1 + Math.sqrt(1 + k * k));
for (const k of [0.2, 1, 3]) assert.ok(close(ratioMinus(k) * ratioPlus(k), 1));
assert.ok(close(ratioMinus(1), 1 + Math.sqrt(2)));
assert.ok(close(ratioPlus(1), Math.sqrt(2) - 1));

console.log(JSON.stringify({
  protocol: 'furey-higgs-grading-to-silver-reactance/1',
  atomicGradings: { h: [1, -1, -1, 1], chi: [1, 1, -1, -1], product: [1, -1, 1, -1], commute: true, productSquaresToIdentity: true },
  aggregation: { basis: ['L=(nu+e)/sqrt(2)', 'Q=(u+d)/sqrt(2)'], invariantProjector: true, compressedProduct: 'p_agg=diag(-1,+1)=-D' },
  responseFamily: { form: 'K(k)=k p_agg', square: 'K(k)^2=k^2 I', algebraFixes: 'direction and relative sign', algebraDoesNotFix: 'positive scalar k' },
  cayley: { relativeEigenphase: 'Delta(k)=-4 arctan(k)', exactPiCondition: 'k=1 uniquely for k>0' },
  poleRatios: { normal: 'r_-(k)=(1+sqrt(1+k^2))/k', tangent: 'r_+(k)=k/(1+sqrt(1+k^2))', reciprocalForAllPositiveK: true, atK1: [ratioMinus(1), ratioPlus(1)] },
  theorem: 'The Furey-handle times Higgs-channel grading compresses to the exact silver reactance direction. Its involution protects the sign pattern; exact A2 relative pi phase uniquely fixes the remaining positive amplitude to k=1 and recovers the silver ratios.',
  boundary: 'This is conditional on identifying the physical reactance with the compressed grading family and imposing the exact A2/Coxeter relative phase. It does not derive the mediator coupling, operating frequency, or dimensional scale.',
  passed: true,
}, null, 2));
