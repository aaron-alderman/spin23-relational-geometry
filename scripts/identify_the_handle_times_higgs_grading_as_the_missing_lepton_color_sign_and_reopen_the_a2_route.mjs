import assert from 'node:assert/strict';

const rt2 = Math.sqrt(2), rt3 = Math.sqrt(3);
const mm = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const tr = A => A[0].map((_, j) => A.map(row => row[j]));
const diag = d => d.map((x, i) => d.map((_, j) => i === j ? x : 0));
const approx = (A, B, eps = 1e-12) => A.every((r, i) => r.every((x, j) => Math.abs(x - B[i][j]) < eps));
const I2 = [[1, 0], [0, 1]];

// Atomic order is (u,nu,d,e), exactly as in the four-channel response corpus.
const h = [1, -1, -1, 1];
const chi = [1, 1, -1, -1];
const p = h.map((x, i) => x * chi[i]);
assert.deepEqual(p, [1, -1, 1, -1]);

// Aggregate to the normalized (lepton,quark) plane.
const Agg = [
  [0, 1 / rt2, 0, 1 / rt2],
  [1 / rt2, 0, 1 / rt2, 0],
];
assert.ok(approx(mm(Agg, tr(Agg)), I2));
const inducedP = mm(mm(Agg, diag(p)), tr(Agg));
const D = [[1, 0], [0, -1]];
assert.ok(approx(inducedP, [[-1, 0], [0, 1]]));
assert.ok(approx(inducedP, D.map(row => row.map(x => -x))));

// The channel translation F_C=(u e)(nu d) exchanges the two aggregates.
const FC = [
  [0, 0, 0, 1],
  [0, 0, 1, 0],
  [0, 1, 0, 0],
  [1, 0, 0, 0],
];
const inducedFC = mm(mm(Agg, FC), tr(Agg));
const X = [[0, 1], [1, 0]];
assert.ok(approx(inducedFC, X));

// Sign and exchange anticommute on the aggregate plane, forming a real Pauli pair.
const anti = mm(inducedP, inducedFC).map((row, i) => row.map((x, j) => x + mm(inducedFC, inducedP)[i][j]));
assert.ok(approx(anti, [[0, 0], [0, 0]]));

// Walsh duality: multiplication by the HC character swaps 1<->HC and H<->C.
const F = [
  [1, 1, 1, 1],
  [1, -1, -1, 1],
  [1, 1, -1, -1],
  [1, -1, 1, -1],
].map(row => row.map(x => x / 2));
const pWalsh = mm(mm(F, diag(p)), tr(F));
assert.deepEqual(pWalsh, [
  [0, 0, 0, 1],
  [0, 0, 1, 0],
  [0, 1, 0, 0],
  [1, 0, 0, 0],
]);

// Acting on one of two projectively identical minimal-10 mediator normals
// supplies the distinct A2 root direction required in document 898.
const g = [1, rt3];
const Dg = [1, -rt3];
const projectivelyTwisted = inducedP.map(row => row[0] * g[0] + row[1] * g[1]);
assert.ok(projectivelyTwisted.every((x, i) => Math.abs(x + Dg[i]) < 1e-12));

const reflect = v => {
  const n2 = v[0] ** 2 + v[1] ** 2;
  return I2.map((row, i) => row.map((x, j) => x - 2 * v[i] * v[j] / n2));
};
const C3 = mm(reflect(Dg), reflect(g));
assert.ok(approx(mm(mm(C3, C3), C3), I2));

console.log(JSON.stringify({
  protocol: 'handle-times-higgs-grading-as-lepton-color-sign/1',
  atomicOrder: ['u', 'nu', 'd', 'e'],
  handleGrading: h,
  higgsChannelGrading: chi,
  productGrading: p,
  aggregateOrder: ['lepton', 'quark'],
  inducedProductGrading: inducedP,
  projectiveRelation: 'induced product grading = -D, so it acts projectively as D=diag(1,-1)',
  inducedChannelTranslation: inducedFC,
  pauliRelation: 'the aggregate sign and exchange anticommute',
  walshAction: 'multiplication by HC swaps 1<->HC and H<->C',
  mediatorNormals: { untwisted: g, twistedProjectively: Dg },
  reflectionProductOrderThree: true,
  physicalBoundary: 'One mediator face must carry the h*chi boundary/local-coefficient grading coherently; its existence as a label grading alone does not yet derive that insertion or the pi pulse phases.',
  passed: true,
}, null, 2));
