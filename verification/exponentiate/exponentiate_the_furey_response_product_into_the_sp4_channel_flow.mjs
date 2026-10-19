import assert from 'node:assert/strict';

const tol = 1e-11;
const add = (A, B) => A.map((r, i) => r.map((x, j) => x + B[i][j]));
const scale = (a, A) => A.map((r) => r.map((x) => a * x));
const mul = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
const tr = (A) => A[0].map((_, j) => A.map((r) => r[j]));
const eye = (n) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => +(i === j)));
const same = (A, B) => A.every((r, i) => r.every((x, j) => Math.abs(x - B[i][j]) < tol));
const comm = (A, B) => add(mul(A, B), scale(-1, mul(B, A)));
const diag = (xs) => xs.map((x, i) => xs.map((_, j) => (i === j ? x : 0)));

const s2 = Math.sqrt(2);
const A = [[0, 1 / s2, 0, 1 / s2], [1 / s2, 0, 1 / s2, 0]];
const p = diag([1, -1, 1, -1]);
const FC = [[0, 0, 0, 1], [0, 0, 1, 0], [0, 1, 0, 0], [1, 0, 0, 0]];
const D = diag([1, -1]);
const X = [[0, 1], [1, 0]];
const epsilon = mul(D, X);
const G = mul(FC, p);
const Pagg = mul(tr(A), A);

assert.ok(same(tr(G), scale(-1, G)));
assert.ok(same(mul(G, G), scale(-1, eye(4))));
assert.ok(same(mul(A, G), mul(epsilon, A)));
assert.ok(same(comm(Pagg, G), Array.from({ length: 4 }, () => Array(4).fill(0))));

const exponentialOfComplexStructure = (M, t, n) => add(scale(Math.cos(t), eye(n)), scale(Math.sin(t), M));
for (const t of [0, 0.17, Math.PI / 4, Math.PI / 2, 1.9, 2 * Math.PI]) {
  const sourceFlow = exponentialOfComplexStructure(G, t, 4);
  const targetFlow = exponentialOfComplexStructure(epsilon, t, 2);
  assert.ok(same(mul(tr(sourceFlow), sourceFlow), eye(4)));
  assert.ok(same(mul(A, sourceFlow), mul(targetFlow, A)));
}

const diagonalKernel = (ru, rn, rd, re) => diag([ru, rn, rd, re]);
assert.ok(same(comm(diagonalKernel(2, 3, 3, 2), G), Array.from({ length: 4 }, () => Array(4).fill(0))));
assert.ok(!same(comm(diagonalKernel(2, 3, 5, 7), G), Array.from({ length: 4 }, () => Array(4).fill(0))));

console.log(JSON.stringify({
  protocol: 'furey-response-product-continuous-sp4-channel-flow/1',
  sourceGenerator: 'G_src=F_C p',
  sourceProperties: ['G_src^T=-G_src', 'G_src^2=-I', '[P_agg,G_src]=0'],
  intertwiner: 'A G_src=epsilon A',
  exponentiatedIntertwiner: 'A exp(t G_src)=exp(t epsilon) A for all real t',
  realifiedTargetGenerator: 'I_phase tensor epsilon_channel',
  diagonalKernelSymmetryCondition: ['r_u=r_e', 'r_nu=r_d'],
  physicalStatus: 'continuous orthogonal response representation is exact; a microscopic action coefficient and charge-safe mediator remain open',
  passed: true,
}, null, 2));
