const eps = 1e-10;

const transpose = A => A[0].map((_, j) => A.map(r => r[j]));
const mul = (A, B) => A.map(r => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
const scale = (c, A) => A.map(r => r.map(x => c * x));
const det2 = A => A[0][0] * A[1][1] - A[0][1] * A[1][0];
const det3 = A =>
  A[0][0] * (A[1][1] * A[2][2] - A[1][2] * A[2][1])
  - A[0][1] * (A[1][0] * A[2][2] - A[1][2] * A[2][0])
  + A[0][2] * (A[1][0] * A[2][1] - A[1][1] * A[2][0]);
const inv3 = A => {
  const d = det3(A);
  if (Math.abs(d) < eps) throw new Error('singular matrix');
  const C = [
    [A[1][1] * A[2][2] - A[1][2] * A[2][1], -(A[1][0] * A[2][2] - A[1][2] * A[2][0]), A[1][0] * A[2][1] - A[1][1] * A[2][0]],
    [-(A[0][1] * A[2][2] - A[0][2] * A[2][1]), A[0][0] * A[2][2] - A[0][2] * A[2][0], -(A[0][0] * A[2][1] - A[0][1] * A[2][0])],
    [A[0][1] * A[1][2] - A[0][2] * A[1][1], -(A[0][0] * A[1][2] - A[0][2] * A[1][0]), A[0][0] * A[1][1] - A[0][1] * A[1][0]],
  ];
  return scale(1 / d, transpose(C));
};
const maxError = (A, B) => Math.max(...A.flatMap((r, i) => r.map((x, j) => Math.abs(x - B[i][j]))));
const identity3 = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];

// Takagi-adapted P plus Q basis: QMQ has rank one, while y couples P
// to the null direction of QMQ.
const a = 2, x = 5, y = 7, d = 3;
const M = [[a, x, y], [x, d, 0], [y, 0, 0]];
const expectedDet = -d * y * y;
if (Math.abs(det3(M) - expectedDet) > eps) throw new Error('heavy determinant identity failed');

const MinvExpected = [
  [0, 0, 1 / y],
  [0, 1 / d, -x / (d * y)],
  [1 / y, -x / (d * y), (x * x - a * d) / (d * y * y)],
];
const Minv = inv3(M);
if (maxError(Minv, MinvExpected) > eps) throw new Error('inverse formula failed');
if (maxError(mul(M, Minv), identity3) > eps) throw new Error('inverse multiplication failed');

// A general invertible block-preserving Dirac map.
const D = [[2, 0, 0], [0, 2, 1], [0, 1, 1]];
const mLight = scale(-1, mul(mul(D, Minv), transpose(D)));
const mLightInv = inv3(mLight);
const Dinv = inv3(D);
const seesawInverseExpected = scale(-1, mul(mul(transpose(Dinv), M), Dinv));
if (maxError(mLightInv, seesawInverseExpected) > eps) throw new Error('seesaw inverse congruence failed');
if (Math.abs(mLight[0][0]) > eps) throw new Error('selected-flavour texture zero failed');
if (Math.abs(det2([[mLightInv[1][1], mLightInv[1][2]], [mLightInv[2][1], mLightInv[2][2]]])) > eps) {
  throw new Error('inverse Q minor rank-one identity failed');
}

const determinantRelation = det3(mLight) - (-Math.pow(det3(D), 2) / det3(M));
if (Math.abs(determinantRelation) > eps) throw new Error('seesaw determinant relation failed');
if (Math.abs(det3(mLight)) < eps) throw new Error('light matrix should be full rank');

// Dirac leakage across P/Q destroys the exact selected-flavour zero.
const Dmixed = [[2, 0.2, 0], [0, 2, 1], [0, 1, 1]];
const mLightMixed = scale(-1, mul(mul(Dmixed, Minv), transpose(Dmixed)));
if (Math.abs(mLightMixed[0][0]) < 1e-6) throw new Error('Dirac-mixing counterexample failed');

console.log(JSON.stringify({
  protocol: 'rank-one-Q-Majorana-seesaw-texture-zero/1',
  canonicalHeavyMatrix: M,
  rankOneQBlock: [[d, 0], [0, 0]],
  determinant: det3(M),
  determinantFormula: '-d*y^2',
  fullHeavyRankRestoredBy: 'nonzero coupling y from P to ker(QMQ)',
  inverse: Minv,
  blockPreservingDiracMap: D,
  lightMajoranaMatrix: mLight,
  selectedFlavorEntry: mLight[0][0],
  lightDeterminant: det3(mLight),
  inverseLightQMinorDeterminant: det2([[mLightInv[1][1], mLightInv[1][2]], [mLightInv[2][1], mLightInv[2][2]]]),
  jacobiIdentity: 'det((m_light^-1)_QQ)=(m_light)_PP/det(m_light)',
  mixedDiracCounterexampleSelectedEntry: mLightMixed[0][0],
  boundary: 'The light texture zero is exact only when the Dirac map preserves the selected P plus Q splitting.',
  passed: true,
}, null, 2));
