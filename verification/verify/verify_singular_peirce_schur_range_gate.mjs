import assert from 'node:assert/strict';

const close = (a, b, eps = 1e-10) => Math.abs(a - b) < eps;
const maxDiff = (A, B) => Math.max(...A.flatMap((row, i) => row.map((x, j) => Math.abs(x - B[i][j]))));
const T = A => A[0].map((_, j) => A.map(row => row[j]));
const mm = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const eye = n => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => i === j ? 1 : 0));
const blockMatrix = (A, B, C) => [
  ...A.map((row, i) => [...row, ...B[i]]),
  ...C.map((row, i) => [...T(B)[i], ...row]),
];

const Cmat = [[2, 0], [0, 0]];
const Cplus = [[0.5, 0], [0, 0]];
const B = [[1, 0], [0.5, 0]]; // annihilates ker C
const S = [[1.4, 0.2], [0.2, 1.1]];
const correction = mm(mm(B, Cplus), T(B));
const A = S.map((row, i) => row.map((x, j) => x + correction[i][j]));
const R = blockMatrix(A, B, Cmat);

// Congruence block diagonalization.
const G = eye(4);
const BCplus = mm(B, Cplus);
for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) G[i][j + 2] = -BCplus[i][j];
const diagonalized = mm(mm(G, R), T(G));
const expected = blockMatrix(S, [[0, 0], [0, 0]], Cmat);
assert(maxDiff(diagonalized, expected) < 1e-10);

// Positivity follows from the block diagonal form; sample quadratic checks.
const quad = (M, v) => v.reduce((s, x, i) => s + x * M[i].reduce((t, y, j) => t + y * v[j], 0), 0);
for (const v of [[1, 0, 0, 0], [0.2, -0.7, 1.1, 3], [-1, 2, -0.3, 0.8]]) assert(quad(R, v) >= -1e-10);

// Interior null vector is inherited by the full kernel.
const nullVector = [0, 0, 0, 1];
const Rnull = R.map(row => row.reduce((s, x, i) => s + x * nullVector[i], 0));
assert(Rnull.every(x => close(x, 0)));

// Compatible regulator gives exactly the same correction.
for (const eps of [1, 0.1, 1e-4]) {
  const CepsInv = [[0.5, 0], [0, 1 / eps]];
  assert(maxDiff(mm(mm(B, CepsInv), T(B)), correction) < 1e-10);
}

// Incompatible coupling to ker C makes the full form indefinite and regulator divergent.
const Bbad = [[1, 0.3], [0.5, -0.2]];
const yNull = [0, 1];
const By = Bbad.map(row => row[1]);
const delta = 1e-3;
const x = By.map(v => -delta * v);
const badA = A;
const badR = blockMatrix(badA, Bbad, Cmat);
const badVector = [...x, ...yNull];
assert(quad(badR, badVector) < 0);

const corrections = [1e-1, 1e-3, 1e-5].map(eps => {
  const CepsInv = [[0.5, 0], [0, 1 / eps]];
  return mm(mm(Bbad, CepsInv), T(Bbad))[0][0];
});
assert(corrections[1] > corrections[0] * 10);
assert(corrections[2] > corrections[1] * 10);

console.log('Singular Peirce-Schur range-gate certificate: PASS');
console.log(`compatible_response=${JSON.stringify(S)}; inherited_null=true; regulator_independent=true; incompatible_quadratic=${quad(badR, badVector)}; divergent=true`);
