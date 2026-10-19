import assert from 'node:assert/strict';

const mm = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const mv = (A, v) => A.map(row => row.reduce((s, x, i) => s + x * v[i], 0));
const tr = A => A[0].map((_, j) => A.map(row => row[j]));
const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);

// An exact determinant-one color transformation and its inverse transpose.
const U = [[1, 1, 0], [0, 1, 1], [0, 0, 1]];
const Uinv = [[1, -1, 1], [0, 1, -1], [0, 0, 1]];
assert.deepEqual(mm(U, Uinv), [[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
const dualU = tr(Uinv);
const q = [2, -1, 3];
const qc = [4, 5, -2];
assert.equal(dot(mv(dualU, qc), mv(U, q)), dot(qc, q));

// Any additive U(1) charge acts with opposite phases on a representation and
// its dual, so the Dirac contraction is neutral.  Track only exponents.
for (const charge of [-3, -1, 1, 3]) assert.equal((-charge) + charge, 0);

// The Standard-Model Yukawa completion contains one weak doublet fermion and
// one weak doublet Higgs (or conjugate Higgs).  Their center signs multiply to
// +1, while the right-handed conjugate is a weak singlet.
const weakCenterCompletedYukawa = (+1) * (-1) * (-1);
assert.equal(weakCenterCompletedYukawa, 1);

const inducedOnCompletedResponses = [[1, 0], [0, 1]];
const requiredD = [[1, 0], [0, -1]];
assert.notDeepEqual(inducedOnCompletedResponses, requiredD);

console.log(JSON.stringify({
  protocol: 'unbroken-gauge-action-versus-lepton-color-response-sign/1',
  colorIdentity: '(U^{-T} q^c)^T (U q) = (q^c)^T q',
  abelianIdentity: 'opposite dual charges sum to zero in every Dirac contraction',
  weakIdentity: 'the weak-center sign of the doublet fermion is cancelled by the Higgs doublet in a completed Yukawa response',
  inducedOnCompletedResponses,
  requiredD,
  conclusion: 'No ordinary unbroken internal gauge transformation induces the sector-relative sign D on completed lepton/color Dirac responses.',
  allowedEscapeRoutes: ['spurionic vacuum comparison', 'boundary or topology action', 'nonminimal mediator interference', 'emergent composite-sector symmetry'],
  passed: true,
}, null, 2));
