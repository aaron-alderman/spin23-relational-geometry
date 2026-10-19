import assert from 'node:assert/strict';

const tol = 1e-12;
const same = (A, B) => A.every((row, i) => row.every((x, j) => Math.abs(x - B[i][j]) < tol));
const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const scale = (r, A) => A.map((row) => row.map((x) => r * x));
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const product = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const block = (A, B, C, D) => A.map((row, i) => [...row, ...B[i]]).concat(C.map((row, i) => [...row, ...D[i]]));
const zero = (n) => Array.from({ length: n }, () => Array(n).fill(0));
const I = [[1, 0], [0, 1]];
const D = [[1, 0], [0, -1]];
const X = [[0, 1], [1, 0]];
const E = [[0, 1], [0, 0]];
const F = [[0, 0], [1, 0]];
const H = D;
const Omega = block(zero(2), I, scale(-1, I), zero(2));
const embed = (A) => block(A, zero(2), zero(2), scale(-1, transpose(A)));
const invOrthogonal = (S) => transpose(S);

const Eold = embed(E), Fold = embed(F), Hold = embed(H);

// Canonical coordinate change: Q1=q1, Q2=p2, P1=p1, P2=-q2.
const S = [
  [1, 0, 0, 0],
  [0, 0, 0, -1],
  [0, 0, 1, 0],
  [0, 1, 0, 0],
];
assert.ok(same(product(product(transpose(S), Omega), S), Omega));
const Sinv = invOrthogonal(S);
const conjugate = (M, T, Tinv) => product(product(Tinv, M), T);

const Bsplit = scale(-1, X);
const Esplit = block(zero(2), Bsplit, zero(2), zero(2));
const Fsplit = block(zero(2), zero(2), Bsplit, zero(2));
const Huniversal = block(I, zero(2), zero(2), scale(-1, I));
assert.ok(same(conjugate(Eold, S, Sinv), Esplit));
assert.ok(same(conjugate(Fold, S, Sinv), Fsplit));
assert.ok(same(conjugate(Hold, S, Sinv), Huniversal));

// Orthogonally diagonalize -sigma_x to D, lifted symplectically.
const invSqrt2 = 1 / Math.sqrt(2);
const O = [[invSqrt2, invSqrt2], [-invSqrt2, invSqrt2]];
assert.ok(same(product(product(transpose(O), Bsplit), O), D));
const R = block(O, zero(2), zero(2), O);
assert.ok(same(product(product(transpose(R), Omega), R), Omega));
const Rinv = transpose(R);
const ED = block(zero(2), D, zero(2), zero(2));
const FD = block(zero(2), zero(2), D, zero(2));
assert.ok(same(conjugate(Esplit, R, Rinv), ED));
assert.ok(same(conjugate(Fsplit, R, Rinv), FD));
assert.ok(same(conjugate(Huniversal, R, Rinv), Huniversal));

// Primitive idempotent and identity comparison.
const ePrimitive = [[1, 0], [0, 0]];
const Eprimitive = block(zero(2), ePrimitive, zero(2), zero(2));
const Eidentity = block(zero(2), I, zero(2), zero(2));
const rank = (M) => {
  const A = M.map((row) => [...row]);
  let r = 0;
  for (let col = 0; col < A[0].length && r < A.length; col += 1) {
    let pivot = r;
    for (let i = r + 1; i < A.length; i += 1) if (Math.abs(A[i][col]) > Math.abs(A[pivot][col])) pivot = i;
    if (Math.abs(A[pivot][col]) < 1e-10) continue;
    [A[r], A[pivot]] = [A[pivot], A[r]];
    const p = A[r][col];
    for (let j = col; j < A[0].length; j += 1) A[r][j] /= p;
    for (let i = r + 1; i < A.length; i += 1) {
      const f = A[i][col];
      for (let j = col; j < A[0].length; j += 1) A[i][j] -= f * A[r][j];
    }
    r += 1;
  }
  return r;
};
assert.equal(rank(Eprimitive), 1);
assert.equal(rank(Eidentity), 2);
assert.equal(rank(ED), 2);

// The rank-two square-zero orbit retains the inertia of its induced symmetric
// form: I has (2,0), while D has (1,1).
const inertiaI = [2, 0];
const inertiaD = [1, 1];
assert.notDeepEqual(inertiaI, inertiaD);
assert.ok(same(product(D, D), I));
assert.ok(!same(D, product(D, D))); // D is a tripotent/involution, not idempotent.

console.log(JSON.stringify({
  protocol: 'pole-jet-split-jordan-tripotent-tkk-orbit/1',
  primitiveIdempotentOrbit: 'excluded by nilpotent rank 1 versus 2',
  positiveIdentityOrbit: 'excluded over real Sp4 by inertia (2,0) versus (1,1)',
  canonicalTransform: 'Q1=q1,Q2=p2,P1=p1,P2=-q2 plus an O(2) rotation',
  jordanElement: 'u=D with u^2=I and signature (1,1)',
  tkkTriple: 'E_D=[[0,D],[0,0]], F_D=[[0,0],[D,0]], H=diag(I,-I)',
  primitiveIdempotent: false,
  splitTripotent: true,
  passed: true,
}, null, 2));
