import assert from 'node:assert/strict';

const close = (a, b, eps = 1e-10) => Math.abs(a - b) < eps;
const maxDiff = (A, B) => Math.max(...A.flatMap((row, i) => row.map((x, j) => Math.abs(x - B[i][j]))));
const T = A => A[0].map((_, j) => A.map(row => row[j]));
const mm = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const matVec = (A, v) => A.map(row => row.reduce((s, x, i) => s + x * v[i], 0));
const eye = n => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => i === j ? 1 : 0));
const blockMatrix = (A, B, C) => [...A.map((row, i) => [...row, ...B[i]]), ...C.map((row, i) => [...T(B)[i], ...row])];
const quad = (M, v) => v.reduce((s, x, i) => s + x * M[i].reduce((t, y, j) => t + y * v[j], 0), 0);

const q = [0, 0, 0, 2];
const q2 = q.reduce((s, x) => s + x * x, 0);
const PT = eye(4).map((row, i) => row.map((x, j) => x - q[i] * q[j] / q2));
const rho = 3;
const C = PT.map(row => row.map(x => rho * x));
const Cplus = PT.map(row => row.map(x => x / rho));
assert(matVec(C, q).every(x => close(x, 0)));
assert(maxDiff(mm(mm(C, Cplus), C), C) < 1e-10);

const B = [[1, 0.2, -0.3, 0], [0.4, -0.6, 0.5, 0]];
assert(matVec(B, q).every(x => close(x, 0)));

const S = [[2, 0.3], [0.3, 1.5]];
const correction = mm(mm(B, Cplus), T(B));
const A = S.map((row, i) => row.map((x, j) => x + correction[i][j]));
const R = blockMatrix(A, B, C);

// Generalized Schur complement is exactly the target H2 response.
const recovered = A.map((row, i) => row.map((x, j) => x - correction[i][j]));
assert(maxDiff(recovered, S) < 1e-10);
assert(S[0][0] > 0 && S[0][0] * S[1][1] - S[0][1] ** 2 > 0);

// Congruence diagonalizes into S plus the transverse spectral block.
const G = eye(6);
const BCplus = mm(B, Cplus);
for (let i = 0; i < 2; i++) for (let j = 0; j < 4; j++) G[i][j + 2] = -BCplus[i][j];
const diagonalized = mm(mm(G, R), T(G));
const expected = blockMatrix(S, Array.from({ length: 2 }, () => Array(4).fill(0)), C);
assert(maxDiff(diagonalized, expected) < 1e-10);

for (const v of [[1, 0, 0, 0, 0, 0], [0.2, -0.7, 1, 0.4, -0.2, 3]]) assert(quad(R, v) >= -1e-10);

// Longitudinal coupling violates positivity and diverges under regularization.
const Bbad = B.map(row => row.slice());
Bbad[0][3] = 0.25;
assert(!matVec(Bbad, q).every(x => close(x, 0)));
const Rbad = blockMatrix(A, Bbad, C);
const yLong = [0, 0, 0, 1];
const By = matVec(Bbad, yLong);
const delta = 1e-3;
const test = [...By.map(x => -delta * x), ...yLong];
assert(quad(Rbad, test) < 0);

const divergent = [1e-1, 1e-3, 1e-5].map(eps => {
  const CepsInv = [[1 / rho, 0, 0, 0], [0, 1 / rho, 0, 0], [0, 0, 1 / rho, 0], [0, 0, 0, 1 / eps]];
  return mm(mm(Bbad, CepsInv), T(Bbad))[0][0];
});
assert(divergent[1] > divergent[0] * 10 && divergent[2] > divergent[1] * 10);

console.log('Conserved-current Ward-quotient H2 certificate: PASS');
console.log(`Ward_null=true; range_compatible=true; H2_det=${S[0][0] * S[1][1] - S[0][1] ** 2}; longitudinal_indefinite=${quad(Rbad, test)}; regulator_divergent=true`);
