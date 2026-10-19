import assert from 'node:assert/strict';

const close = (a, b, eps = 1e-9) => Math.abs(a - b) < eps;
const maxDiff = (A, B) => Math.max(...A.flatMap((row, i) => row.map((x, j) => Math.abs(x - B[i][j]))));
const T = A => A[0].map((_, j) => A.map(row => row[j]));
const mm = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const madd = (A, B, a = 1, b = 1) => A.map((row, i) => row.map((x, j) => a * x + b * B[i][j]));
const eye = n => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => i === j ? 1 : 0));
const jprod = (A, B) => madd(mm(A, B), mm(B, A), 0.5, 0.5);
const tripleFromJordan = (X, Y, Z) => madd(madd(jprod(jprod(X, Y), Z), jprod(jprod(Z, Y), X)), jprod(jprod(X, Z), Y), 1, -1);
const tripleSpecial = (X, Y, Z) => madd(mm(mm(X, Y), Z), mm(mm(Z, Y), X), 0.5, 0.5);

const inverse = A => {
  const n = A.length, I = eye(n);
  const M = A.map((row, i) => [...row, ...I[i]]);
  for (let i = 0; i < n; i++) {
    let p = i;
    for (let k = i + 1; k < n; k++) if (Math.abs(M[k][i]) > Math.abs(M[p][i])) p = k;
    [M[p], M[i]] = [M[i], M[p]];
    const q = M[i][i]; assert(Math.abs(q) > 1e-12);
    for (let j = 0; j < 2 * n; j++) M[i][j] /= q;
    for (let k = 0; k < n; k++) if (k !== i) {
      const f = M[k][i];
      for (let j = 0; j < 2 * n; j++) M[k][j] -= f * M[i][j];
    }
  }
  return M.map(row => row.slice(n));
};

const determinant = A => {
  const M = A.map(row => row.slice()); let d = 1;
  for (let i = 0; i < M.length; i++) {
    let p = i;
    for (let k = i + 1; k < M.length; k++) if (Math.abs(M[k][i]) > Math.abs(M[p][i])) p = k;
    if (p !== i) { [M[p], M[i]] = [M[i], M[p]]; d *= -1; }
    const q = M[i][i]; d *= q;
    for (let k = i + 1; k < M.length; k++) {
      const f = M[k][i] / q;
      for (let j = i + 1; j < M.length; j++) M[k][j] -= f * M[i][j];
    }
  }
  return d;
};

// Positive R=L L^T with two retained and two eliminated ports.
const L = [[2, 0, 0, 0], [0.3, 1.6, 0, 0], [-0.2, 0.4, 1.3, 0], [0.5, -0.1, 0.2, 1.1]];
const R = mm(L, T(L));
const e = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
const q = madd(eye(4), e, 1, -1);
const A = mm(mm(e, R), e);
const Ccorner = mm(mm(q, R), q);
const X = madd(mm(mm(e, R), q), mm(mm(q, R), e));
assert(maxDiff(madd(madd(A, X), Ccorner), R) < 1e-10);

// Invert the eliminated 2x2 corner inside qVq and embed it back in 4x4.
const C2 = R.slice(2).map(row => row.slice(2));
const C2inv = inverse(C2);
const Cinv = Array.from({ length: 4 }, () => Array(4).fill(0));
for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) Cinv[i + 2][j + 2] = C2inv[i][j];

const correctionJordan = tripleFromJordan(X, Cinv, X);
const correctionSpecial = tripleSpecial(X, Cinv, X);
assert(maxDiff(correctionJordan, correctionSpecial) < 1e-10);
assert(maxDiff(correctionSpecial, mm(mm(X, Cinv), X)) < 1e-10);

const schurEmbedded = madd(A, correctionJordan, 1, -1);
const B = R.slice(0, 2).map(row => row.slice(2));
const expected2 = R.slice(0, 2).map(row => row.slice(0, 2));
const correction2 = mm(mm(B, C2inv), T(B));
const schur2 = expected2.map((row, i) => row.map((x, j) => x - correction2[i][j]));
assert(maxDiff(schurEmbedded.slice(0, 2).map(row => row.slice(0, 2)), schur2) < 1e-10);
assert(schur2[0][0] > 0 && determinant(schur2) > 0);
assert(close(determinant(R), determinant(C2) * determinant(schur2)));

console.log('Peirce-Schur triple recursion certificate: PASS');
console.log(`detR=${determinant(R)}; detC_detH2=${determinant(C2) * determinant(schur2)}; triple_equals_XCinvX=true; terminal=H2(R)`);
