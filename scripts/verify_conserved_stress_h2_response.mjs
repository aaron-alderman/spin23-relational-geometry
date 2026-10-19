import assert from 'node:assert/strict';

const close = (a, b, eps = 1e-9) => Math.abs(a - b) < eps;
const maxDiff = (A, B) => Math.max(...A.flatMap((row, i) => row.map((x, j) => Math.abs(x - B[i][j]))));
const T = A => A[0].map((_, j) => A.map(row => row[j]));
const mm = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const eye = n => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => i === j ? 1 : 0));
const madd = (A, B, a = 1, b = 1) => A.map((row, i) => row.map((x, j) => a * x + b * B[i][j]));
const frob = (A, B) => A.reduce((s, row, i) => s + row.reduce((t, x, j) => t + x * B[i][j], 0), 0);
const matVec = (A, v) => A.map(row => row.reduce((s, x, i) => s + x * v[i], 0));
const blockMatrix = (A, B, C) => [...A.map((row, i) => [...row, ...B[i]]), ...C.map((row, i) => [...T(B)[i], ...row])];
const quad = (M, v) => v.reduce((s, x, i) => s + x * M[i].reduce((t, y, j) => t + y * v[j], 0), 0);

const d = 4;
const q = [0, 0, 0, 2];
const q2 = q.reduce((s, x) => s + x * x, 0);
const theta = eye(d).map((row, i) => row.map((x, j) => x - q[i] * q[j] / q2));

// Orthonormal basis of real symmetric 4x4 matrices.
const basis = [];
for (let i = 0; i < d; i++) {
  const E = Array.from({ length: d }, () => Array(d).fill(0)); E[i][i] = 1; basis.push(E);
}
for (let i = 0; i < d; i++) for (let j = i + 1; j < d; j++) {
  const E = Array.from({ length: d }, () => Array(d).fill(0));
  E[i][j] = E[j][i] = 1 / Math.sqrt(2); basis.push(E);
}
assert.equal(basis.length, 10);

const P0apply = H => {
  const t = frob(theta, H) / 3;
  return theta.map(row => row.map(x => t * x));
};
const PTapply = H => mm(mm(theta, H), theta);
const P2apply = H => madd(PTapply(H), P0apply(H), 1, -1);
const operatorMatrix = apply => basis.map(Ea => basis.map(Eb => frob(Ea, apply(Eb))));
const P0 = operatorMatrix(P0apply);
const P2 = operatorMatrix(P2apply);
assert(maxDiff(mm(P0, P0), P0) < 1e-9);
assert(maxDiff(mm(P2, P2), P2) < 1e-9);
assert(maxDiff(mm(P0, P2), Array.from({ length: 10 }, () => Array(10).fill(0))) < 1e-9);
assert(close(P0.reduce((s, row, i) => s + row[i], 0), 1));
assert(close(P2.reduce((s, row, i) => s + row[i], 0), 5));

const rho2 = 2.3, rho0 = 1.1;
const C = madd(P2, P0, rho2, rho0);
const Cplus = madd(P2, P0, 1 / rho2, 1 / rho0);
assert(maxDiff(mm(mm(C, Cplus), C), C) < 1e-9);

const coords = H => basis.map(E => frob(E, H));
const F1 = [[1, 0, 0, 0], [0, -1, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
const F2 = [[1, 0.2, 0, 0], [0.2, 1, 0.1, 0], [0, 0.1, 1, 0], [0, 0, 0, 0]];
const B = [coords(F1), coords(F2)];
const support = madd(P2, P0);
for (const row of B) assert(maxDiff([matVec(support, row)], [row]) < 1e-9);

const S = [[1.8, 0.25], [0.25, 1.4]];
const correction = mm(mm(B, Cplus), T(B));
const A = S.map((row, i) => row.map((x, j) => x + correction[i][j]));
const R = blockMatrix(A, B, C);
const recovered = A.map((row, i) => row.map((x, j) => x - correction[i][j]));
assert(maxDiff(recovered, S) < 1e-9);
assert(S[0][0] * S[1][1] - S[0][1] ** 2 > 0);

// Longitudinal symmetric source q_(mu xi_nu) lies in the Ward-null complement.
const Fbad = Array.from({ length: d }, () => Array(d).fill(0));
Fbad[0][3] = Fbad[3][0] = 1 / Math.sqrt(2);
const bad = coords(Fbad);
assert(matVec(support, bad).every(x => close(x, 0)));
const Bbad = [B[0].map((x, i) => x + 0.2 * bad[i]), B[1]];
const Rbad = blockMatrix(A, Bbad, C);
const yNull = bad;
const By = matVec(Bbad, yNull);
const delta = 1e-3;
const test = [...By.map(x => -delta * x), ...yNull];
assert(quad(Rbad, test) < 0);

const nullProjector = madd(eye(10), support, 1, -1);
const regulatorCorrections = [1e-1, 1e-3, 1e-5].map(eps => {
  const inv = madd(Cplus, nullProjector, 1, 1 / eps);
  return mm(mm(Bbad, inv), T(Bbad))[0][0];
});
assert(regulatorCorrections[1] > regulatorCorrections[0] * 10);
assert(regulatorCorrections[2] > regulatorCorrections[1] * 10);

console.log('Conserved-stress spectral-quotient H2 certificate: PASS');
console.log(`rank_P2=5; rank_P0=1; Ward_null_dim=4; H2_det=${S[0][0] * S[1][1] - S[0][1] ** 2}; longitudinal_indefinite=${quad(Rbad, test)}`);
