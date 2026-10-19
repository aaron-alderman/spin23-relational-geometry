import assert from 'node:assert/strict';

const mm = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
const transpose = (A) => A[0].map((_, j) => A.map((r) => r[j]));
const diag = (v) => v.map((x, i) => v.map((_, j) => i === j ? x : 0));
const scale = (s, A) => A.map((r) => r.map((x) => s * x));
const eq = (A, B, tol = 1e-12) => A.every((r, i) => r.every((x, j) => Math.abs(x - B[i][j]) < tol));
const commutes = (A, B) => eq(mm(A, B), mm(B, A));

const p = diag([1, -1, 1, -1]);
const FC = [[0,0,0,1],[0,0,1,0],[0,1,0,0],[1,0,0,0]];
const D = [[1,0],[0,-1]];
const X = [[0,1],[1,0]];

const weightedA = (a, b) => [[0, a, 0, b], [b, 0, a, 0]];
for (const theta of [0.13, 0.41, 0.79, 1.19]) {
  const a = Math.cos(theta), b = Math.sin(theta);
  const A = weightedA(a, b);
  assert.ok(eq(mm(A, transpose(A)), [[1,0],[0,1]]));
  assert.ok(eq(mm(A, p), mm(scale(-1, D), A)));
  assert.ok(eq(mm(A, FC), mm(X, A)));
}

// The symmetric Walsh aggregate is theta=pi/4.
const s = 1 / Math.sqrt(2);
const A0 = weightedA(s, s);
const P0 = mm(transpose(A0), A0);

const preservesFixedAggregate = (rates) => commutes(diag(rates), P0);
assert.equal(preservesFixedAggregate([2,3,2,3]), true);   // ru=rd, rnu=re
assert.equal(preservesFixedAggregate([2,3,5,3]), false);
assert.equal(preservesFixedAggregate([2,3,2,7]), false);

// A diagonal renormalization commutes with FC iff ru=re and rnu=rd.
const commutesWithFC = (rates) => commutes(diag(rates), FC);
assert.equal(commutesWithFC([2,3,3,2]), true);
assert.equal(commutesWithFC([2,3,2,3]), false);

// Preserving both the fixed symmetric aggregate and FC forces all four rates equal.
const samples = [];
for (const ru of [1,2]) for (const rn of [1,2]) for (const rd of [1,2]) for (const re of [1,2]) {
  const rates = [ru,rn,rd,re];
  if (preservesFixedAggregate(rates) && commutesWithFC(rates)) samples.push(rates);
}
assert.deepEqual(samples, [[1,1,1,1],[2,2,2,2]]);

// A cross-related diagonal reweighting moves within the weighted family.
const a = 0.8, b = 0.6;
const Rcross = diag([b, a, a, b]);
const movedRows = mm(A0, Rcross);
const norm = Math.sqrt((a*a+b*b)/2);
const movedNormalized = scale(1/norm, movedRows);
assert.ok(eq(movedNormalized, weightedA(a, b)));

console.log(JSON.stringify({
  protocol: 'weighted-furey-aggregates-and-broken-phase-obstruction/1',
  covariantFamily: 'A(a,b)=[[0,a,0,b],[b,0,a,0]], a^2+b^2=1',
  exactForEveryWeight: ['A p=(-D) A', 'A F_C=X A'],
  symmetricPoint: 'a=b=1/sqrt(2)',
  fixedAggregateCondition: 'diagonal running preserves P_agg iff r_u=r_d and r_nu=r_e',
  FCCondition: 'diagonal running commutes with F_C iff r_u=r_e and r_nu=r_d',
  simultaneousCondition: 'all four diagonal rates equal',
  movingBundleRepair: 'cross-related weights (r_u,r_nu,r_d,r_e)=(b,a,a,b) move the symmetric aggregate into A(a,b)',
  boundary: 'Generic broken-phase channel-dependent running destroys the fixed symmetric reducing root. A moving weighted root is possible only with cross-related spurion covariance.',
  passed: true,
}, null, 2));
