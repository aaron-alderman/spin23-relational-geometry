import assert from 'node:assert/strict';

const tol = 1e-12;
const C = (re, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (z) => C(z.re, -z.im);
const scale = (s, z) => C(s * z.re, s * z.im);
const abs = (z) => Math.hypot(z.re, z.im);
const phase = (z) => Math.atan2(z.im, z.re);
const same = (a, b) => abs(C(a.re - b.re, a.im - b.im)) < tol;
const dot = (u, M, v) => {
  let out = C(0);
  for (let i = 0; i < u.length; i++) for (let j = 0; j < v.length; j++) {
    out = add(out, mul(mul(conj(u[i]), M[i][j]), v[j]));
  }
  return out;
};
const gram = (vectors, metric) => vectors.map((u) => vectors.map((v) => dot(u, metric, v)));
const bargmann = (G) => mul(mul(G[0][1], G[1][2]), G[2][0]);

// One mediator: every nonzero three-vertex Gram loop has positive Bargmann
// invariant |lambda_L lambda_u lambda_d|^2, regardless of vertex phases.
const I1 = [[C(1)]];
const oneVectors = [[C(1)], [C(0, 1)], [C(0, -1)]];
const G1 = gram(oneVectors, I1);
const B1 = bargmann(G1);
assert.ok(B1.re > 0 && Math.abs(B1.im) < tol);
assert.ok(Math.abs(phase(B1)) < tol);

// Verify phase-redefinition invariance explicitly.  Rephase each bilinear by
// an unrelated angle; the closed product must remain unchanged.
const angles = [0.37, -0.91, 1.23];
const phases = angles.map((x) => C(Math.cos(x), Math.sin(x)));
const rephased = G1.map((row, i) => row.map((z, j) =>
  mul(mul(conj(phases[i]), z), phases[j])));
assert.ok(same(bargmann(rephased), B1));

// Rank-two pure-star vectors, corrected by the shared-left self-energy.
const m2 = 5;
const kappa = 0.3;
const denom = m2 * (m2 + 2 * kappa);
const K = [
  [C(1 / m2 - kappa / denom), C(-kappa / denom)],
  [C(-kappa / denom), C(1 / m2 - kappa / denom)],
];
const l = [C(1), C(1)];
const u = [C(0, 1), C(0)];
const d = [C(0), C(0, -1)];
const G2 = gram([l, u, d], K);
const B2 = bargmann(G2);
assert.ok(G2[0][1].im > 0);
assert.ok(G2[0][2].im < 0);
assert.ok(G2[1][2].re > 0 && Math.abs(G2[1][2].im) < tol);
assert.ok(B2.re < 0 && Math.abs(B2.im) < tol);
assert.ok(Math.abs(Math.abs(phase(B2)) - Math.PI) < tol);

// Exact formulae.
const arm = 1 / (m2 + 2 * kappa);
const edge = kappa / denom;
assert.ok(same(G2[0][1], C(0, arm)));
assert.ok(same(G2[0][2], C(0, -arm)));
assert.ok(same(G2[1][2], C(edge)));
assert.ok(same(B2, C(-arm * arm * edge)));

// The pi phase is fixed by orientation reversal/conjugation: pi=-pi mod 2pi.
// It is a Z2 flux, not an orientation-odd chirality.
assert.ok(same(conj(B2), B2));

console.log(JSON.stringify({
  protocol: 's1-wilson-triangle-bargmann-phase-pfaffian-z2-boundary/1',
  vertexOrder: ['B_L=QL', 'B_u=uc ec', 'B_d=dc nuc'],
  oneMediatorTriangle: {
    gram: G1,
    bargmannInvariant: B1,
    phase: phase(B1),
    theorem: 'for rank one, C_Lu C_ud C_dL = |lambda_L lambda_u lambda_d|^2 >= 0',
    orientedLoop: false,
  },
  loopCorrectedRankTwoTriangle: {
    inverseMassMetric: K,
    gram: G2,
    desiredArmMagnitude: arm,
    regeneratedEdge: edge,
    bargmannInvariant: B2,
    phase: phase(B2),
    z2Flux: 'pi',
    orientationOdd: false,
  },
  interpretation: {
    positiveResult: 'shared-leg mixing converts the open star into a closed Wilson triangle with a rephasing-invariant central minus sign',
    negativeResult: 'the pi flux is invariant under conjugation and cannot distinguish twist from antitwist or supply chirality by itself',
    nextGate: 'derive an independent orientation-odd observable or path ordering that couples this Z2 sign to the response Pfaffian sheet',
  },
  passed: true,
}, null, 2));
