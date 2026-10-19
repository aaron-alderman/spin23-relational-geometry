import assert from 'node:assert/strict';

const mm = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
const transpose = (A) => A[0].map((_, j) => A.map((r) => r[j]));
const eye = (n) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => +(i === j)));
const scale = (s, A) => A.map((r) => r.map((x) => s * x));
const eq = (A, B, tol = 1e-12) => A.every((r, i) => r.every((x, j) => Math.abs(x - B[i][j]) < tol));
const kron = (A, B) => A.flatMap((ar) => B.map((br) => ar.flatMap((a) => br.map((b) => a * b))));
const det2 = (A) => A[0][0] * A[1][1] - A[0][1] * A[1][0];

const D = [[1, 0], [0, -1]];
const X = [[0, 1], [1, 0]];
const epsilon = mm(D, X);
const Knu = [[1, 0], [0, -1]]; // conjugation on the realified neutral Peirce line
const Jnu = [[0, -1], [1, 0]]; // multiplication by i
const GammaFactored = kron(Knu, epsilon);
const GammaEstablished = [
  [0, 1, 0, 0],
  [-1, 0, 0, 0],
  [0, 0, 0, -1],
  [0, 0, 1, 0],
];
assert.ok(eq(GammaFactored, GammaEstablished));
assert.ok(eq(mm(GammaFactored, GammaFactored), scale(-1, eye(4))));
assert.ok(eq(mm(Knu, Jnu), scale(-1, mm(Jnu, Knu))));

// Root matrix: Peirce quadratures are rows; lepton/color response labels are columns.
const Psi = [[2, -1], [3, 4]];
const Q = mm(transpose(Psi), Psi);
assert.ok(eq(Q, transpose(Q)));
assert.ok(det2(Q) > 0);

// Gamma acts as Psi -> Knu Psi epsilon^T.
const gammaOnRoot = (P) => mm(mm(Knu, P), transpose(epsilon));
const Psi1 = gammaOnRoot(Psi);
const Psi2 = gammaOnRoot(Psi1);
assert.ok(eq(Psi2, scale(-1, Psi)));
const Q1 = mm(transpose(Psi1), Psi1);
assert.ok(eq(Q1, mm(mm(epsilon, Q), transpose(epsilon))));
const Q2 = mm(transpose(Psi2), Psi2);
assert.ok(eq(Q2, Q));

// Every positive-definite H2(R) matrix has such a root (explicit Cholesky sample).
const target = [[5, 2], [2, 3]];
const l11 = Math.sqrt(target[0][0]);
const l21 = target[1][0] / l11;
const l22 = Math.sqrt(target[1][1] - l21 * l21);
const L = [[l11, 0], [l21, l22]];
const root = transpose(L);
assert.ok(eq(mm(transpose(root), root), target));

// Left orthogonal changes of Peirce root leave the Jordan response unchanged.
const O = [[0, -1], [1, 0]];
assert.ok(eq(mm(transpose(mm(O, Psi)), mm(O, Psi)), Q));

console.log(JSON.stringify({
  protocol: 'neutral-peirce-root-times-lepton-color-doublet/1',
  factorization: 'Gamma_R = K_nu tensor (D X)',
  gammaSquare: '-I4',
  rootShape: '2 Peirce quadratures x 2 lepton-color labels',
  jordanMap: 'Q=Psi^T Psi in H2(R)_+',
  covariance: 'Q(Gamma Psi)=epsilon Q(Psi) epsilon^T',
  centralDescent: 'Q(-Psi)=Q(Psi)',
  rootGauge: 'left O(2) transformations of Psi leave Q invariant',
  boundary: 'The factorization is exact, but a source-level intertwiner from the neutral Furey Peirce corner to the normalized lepton-color response has not been derived.',
  passed: true,
}, null, 2));
