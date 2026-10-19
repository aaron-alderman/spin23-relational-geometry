import assert from 'node:assert/strict';

const mm = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
const transpose = (A) => A[0].map((_, j) => A.map((r) => r[j]));
const add = (A, B) => A.map((r, i) => r.map((x, j) => x + B[i][j]));
const scale = (s, A) => A.map((r) => r.map((x) => s * x));
const eq = (A, B, tol = 1e-10) => A.every((r, i) => r.every((x, j) => Math.abs(x - B[i][j]) < tol));
const frob2 = (A) => A.reduce((s, r) => s + r.reduce((t, x) => t + x*x, 0), 0);

const A = (t) => [[0, Math.cos(t), 0, Math.sin(t)], [Math.sin(t), 0, Math.cos(t), 0]];
const dA = (t) => [[0, -Math.sin(t), 0, Math.cos(t)], [Math.cos(t), 0, -Math.sin(t), 0]];
const P = (t) => mm(transpose(A(t)), A(t));
const dP = (t) => add(mm(transpose(dA(t)), A(t)), mm(transpose(A(t)), dA(t)));
const I2 = [[1,0],[0,1]];
const zero2 = [[0,0],[0,0]];

for (const t of [0.17, 0.63, 1.21, 2.04]) {
  assert.ok(eq(mm(A(t), transpose(A(t))), I2));
  assert.ok(eq(mm(A(t), transpose(dA(t))), zero2));
  assert.ok(eq(P(t + Math.PI), P(t)));
  assert.ok(eq(A(t + Math.PI), scale(-1, A(t))));
  assert.ok(Math.abs(frob2(dA(t)) - 2) < 1e-10);
  assert.ok(Math.abs(frob2(dP(t)) - 4) < 1e-10);
}

assert.ok(!eq(P(0), P(Math.PI / 2)));
assert.ok(eq(A(2 * Math.PI), A(0)));

console.log(JSON.stringify({
  protocol: 'flat-weighted-root-connection-central-projective-holonomy/1',
  localConnection: 'A(theta) dA(theta)^T = 0',
  projectorPeriod: 'pi',
  framePeriod: '2pi',
  projectiveLoopHolonomy: '-I2',
  fullCircleHolonomy: '+I2',
  extrinsicMotion: { frobeniusNormSquared_dA: 2, frobeniusNormSquared_dP: 4 },
  interpretation: 'The aggregate frame is a horizontal double cover of its projector loop. The central sign is a transition holonomy, not local curvature.',
  physicalBoundary: 'If physical weights remain positive, theta stays in one quadrant and does not complete the projective loop; no topological sign follows without sign/phase winding.',
  passed: true,
}, null, 2));
