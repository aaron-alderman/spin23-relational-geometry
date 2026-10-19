import assert from 'node:assert/strict';

const tol = 1e-10;
const close = (a, b, t = tol) => Math.abs(a - b) < t;
const matMul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));

const q = 1 / Math.sqrt(2);
const A = [[0, q, 0, q], [q, 0, q, 0]];
const F = [
  [0, 0, 0, 1],
  [0, 0, 1, 0],
  [0, 1, 0, 0],
  [1, 0, 0, 0],
];
const p = [[1,0,0,0],[0,-1,0,0],[0,0,1,0],[0,0,0,-1]];
const X = [[0, 1], [1, 0]];
const D = [[1, 0], [0, -1]];
const eps = matMul(D, X);
const sameReal = (M, N) => M.every((row, i) => row.every((x, j) => close(x, N[i][j])));
assert.ok(sameReal(matMul(A, F), matMul(X, A)));
assert.ok(sameReal(matMul(A, matMul(F, p)), matMul(eps, A)));

// Pauli matrices represented as [real, imaginary] pairs are unnecessary here:
// antiunitary adjoint parities follow from U bar(sigma) U^T.
const sxR = [[0, 1], [1, 0]], sxI = [[0, 0], [0, 0]];
const syR = [[0, 0], [0, 0]], syI = [[0, -1], [1, 0]];
const szR = [[1, 0], [0, -1]], szI = [[0, 0], [0, 0]];
const antiAdjoint = (U, MR, MI) => ({
  R: matMul(matMul(U, MR), transpose(U)),
  I: matMul(matMul(U, MI.map((row) => row.map((x) => -x))), transpose(U)),
});
const equalPair = (P, MR, MI, sign) => sameReal(P.R, MR.map((r) => r.map((x) => sign * x))) && sameReal(P.I, MI.map((r) => r.map((x) => sign * x)));

assert.ok(equalPair(antiAdjoint(X, sxR, sxI), sxR, sxI, +1));
assert.ok(equalPair(antiAdjoint(X, syR, syI), syR, syI, +1));
assert.ok(equalPair(antiAdjoint(X, szR, szI), szR, szI, -1));
assert.ok(equalPair(antiAdjoint(eps, sxR, sxI), sxR, sxI, -1));
assert.ok(equalPair(antiAdjoint(eps, syR, syI), syR, syI, -1));
assert.ok(equalPair(antiAdjoint(eps, szR, szI), szR, szI, -1));

console.log(JSON.stringify({
  protocol: 'furey-residual-current-typing-fork/1',
  linearPortDoublet: '(L,Q), transformed antiunitarily by X K or epsilon K',
  quadraticRelationshipDoublet: ['J_x=a^dagger sigma_x a', 'J_y=a^dagger sigma_y a'],
  thetaParities: { Jx: +1, Jy: +1, Jz: -1 },
  gammaParities: { Jx: -1, Jy: -1, Jz: -1 },
  equalOnsagerParityForRelationshipDoublet: true,
  linearAndQuadraticCovariancesIdentified: false,
  gaussianWickBridgeRequired: true,
  passed: true,
}, null, 2));
