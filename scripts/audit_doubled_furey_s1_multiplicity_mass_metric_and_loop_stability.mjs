import assert from 'node:assert/strict';

const tol = 1e-12;
const C = (re, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const sub = (a, b) => C(a.re - b.re, a.im - b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const scale = (s, z) => C(s * z.re, s * z.im);
const conj = (z) => C(z.re, -z.im);
const abs = (z) => Math.hypot(z.re, z.im);
const same = (a, b) => abs(sub(a, b)) < tol;
const zero = C(0);

const daggerDot = (u, M, v) => {
  let out = zero;
  for (let i = 0; i < u.length; i++) {
    for (let j = 0; j < v.length; j++) {
      out = add(out, mul(mul(conj(u[i]), M[i][j]), v[j]));
    }
  }
  return out;
};

const inverseHermitian2 = (a, z, b) => {
  const det = a * b - (z.re * z.re + z.im * z.im);
  assert(det > 0);
  return [
    [C(b / det), scale(-1 / det, z)],
    [scale(-1 / det, conj(z)), C(a / det)],
  ];
};

// The three incidence links are three independent coupling slots, but their
// gauge dressings use one complex S1 representation and its conjugate.  The
// conjugate is fixed by the reality/self-adjointness operation and is not an
// additional propagating copy.
const coloredLinks = [
  { link: 'Q-L', irrep: 'S1', orientation: 'S' },
  { link: 'uc-ec', irrep: 'S1', orientation: 'S-dagger' },
  { link: 'dc-nuc', irrep: 'S1', orientation: 'S-dagger' },
];
assert.equal(coloredLinks.length, 3);
assert.equal(new Set(coloredLinks.map((x) => x.irrep)).size, 1);
assert.deepEqual(new Set(coloredLinks.map((x) => x.orientation)), new Set(['S', 'S-dagger']));

// Two-copy construction from document 1062.
const l = [C(1), C(1)];
const u = [C(0, 1), C(0)];
const d = [C(0), C(0, -1)];
const I2 = [[C(1), zero], [zero, C(1)]];
assert.ok(same(daggerDot(l, I2, u), C(0, 1)));
assert.ok(same(daggerDot(l, I2, d), C(0, -1)));
assert.ok(same(daggerDot(u, I2, d), zero));

// Gauge, B and L assign identical charges to both copies, so a completely
// general positive Hermitian 2x2 mass-squared matrix is allowed.  A generic
// off-diagonal entry destroys inverse-mass orthogonality.
const genericMassInverse = inverseHermitian2(2, C(0.4, 0.2), 3);
const genericCud = daggerDot(u, genericMassInverse, d);
assert.ok(abs(genericCud) > 1e-6);

// A copy parity P=diag(1,-1) removes the off-diagonal mass, but does not make
// the diagonal masses equal.  Adding copy exchange X forces equality.  These
// are sufficient mass-sector conditions, not symmetries of the displayed
// interaction spurions.
const diagonalUnequalInverse = inverseHermitian2(2, zero, 3);
assert.ok(same(daggerDot(u, diagonalUnequalInverse, d), zero));
assert.ok(Math.abs(abs(daggerDot(l, diagonalUnequalInverse, u))
  - abs(daggerDot(l, diagonalUnequalInverse, d))) > 1e-6);
const scalarInverse = inverseHermitian2(2, zero, 2);
assert.ok(same(daggerDot(u, scalarInverse, d), zero));
assert.ok(Math.abs(abs(daggerDot(l, scalarInverse, u))
  - abs(daggerDot(l, scalarInverse, d))) < tol);

// The shared QL coupling necessarily contributes l l^dagger to the mediator
// self-energy.  Starting from m^2 I, a positive correction kappa l l^dagger
// has an inverse with nonzero off-diagonal entry and regenerates C_ud.
const m2 = 5;
const kappa = 0.3;
const correctedInverse = inverseHermitian2(m2 + kappa, C(kappa), m2 + kappa);
const regeneratedCud = daggerDot(u, correctedInverse, d);
const expectedRegenerated = kappa / (m2 * (m2 + 2 * kappa));
assert.ok(same(regeneratedCud, C(expectedRegenerated)));
assert.ok(abs(regeneratedCud) > tol);

// Coupling-graph phase count E-V+components.  The pure two-edge star is a
// tree and has no rephasing-invariant Wilson phase.  Closing the third edge
// creates one cycle and one invariant phase.
const cyclePhaseCount = (vertices, edges, components = 1) => edges - vertices + components;
assert.equal(cyclePhaseCount(3, 2), 0);
assert.equal(cyclePhaseCount(3, 3), 1);

console.log(JSON.stringify({
  protocol: 'doubled-furey-s1-multiplicity-mass-metric-loop-stability/1',
  incidenceAudit: {
    independentColoredLinkCoefficients: coloredLinks.length,
    economicalComplexIrrepFamilies: new Set(coloredLinks.map((x) => x.irrep)).size,
    orientations: [...new Set(coloredLinks.map((x) => x.orientation))],
    conclusion: 'three coupling slots do not imply three fields; S and S-dagger are one complex S1 field unless an additional multiplicity space is supplied',
  },
  copyAudit: {
    sourceGeometryDerivesTwoCopies: false,
    reason: 'the minimal endpoint model specifies link incidences and coefficients but no scalar kinetic module, copy Hilbert space, or scalar mass operator',
  },
  invariantTreeConditions: {
    noRightRightEdge: 'lambda_u^dagger (M^2)^-1 lambda_d = 0',
    equalArmMagnitude: '|lambda_L^dagger (M^2)^-1 lambda_u| = |lambda_L^dagger (M^2)^-1 lambda_d|',
    genericMassExampleRegeneratesCud: genericCud,
  },
  sufficientMassSectorSymmetry: {
    copyParity: 'P=diag(1,-1) forbids mass mixing',
    copyExchange: 'X swaps the copies and, together with P, forces M^2 proportional to I',
    limitation: 'the shared QL coupling vector (1,1) does not preserve copy parity',
  },
  loopAudit: {
    sharedCouplingSelfEnergy: 'delta M^2 proportional to kappa lambda_L lambda_L^dagger',
    startingMassSquared: `${m2} I`,
    kappa,
    regeneratedCud,
    exactFormula: 'kappa/[m^2(m^2+2 kappa)]',
    verdict: 'the displayed rank-two repair is not radiatively closed without an additional cancellation or protecting completion',
  },
  phaseAudit: {
    pureStarCycleRank: cyclePhaseCount(3, 2),
    triangleCycleRank: cyclePhaseCount(3, 3),
    conclusion: 'the +/-i phases on the pure star are removable by independent bilinear rephasings until another interaction fixes the source frame; only a closed triangle has an intrinsic loop phase',
  },
  passed: true,
}, null, 2));
