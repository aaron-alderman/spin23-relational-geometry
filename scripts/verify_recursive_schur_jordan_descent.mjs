import assert from 'node:assert/strict';

const close = (a, b, eps = 1e-9) => Math.abs(a - b) < eps;
const maxDiff = (A, B) => Math.max(...A.flatMap((row, i) => row.map((x, j) => Math.abs(x - B[i][j]))));
const T = A => A[0].map((_, j) => A.map(row => row[j]));
const mm = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const eye = n => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => i === j ? 1 : 0));

const determinant = A => {
  const M = A.map(row => row.slice());
  let d = 1;
  for (let i = 0; i < M.length; i++) {
    let p = i;
    for (let k = i + 1; k < M.length; k++) if (Math.abs(M[k][i]) > Math.abs(M[p][i])) p = k;
    assert(Math.abs(M[p][i]) > 1e-12);
    if (p !== i) { [M[p], M[i]] = [M[i], M[p]]; d *= -1; }
    const pivot = M[i][i]; d *= pivot;
    for (let k = i + 1; k < M.length; k++) {
      const q = M[k][i] / pivot;
      for (let j = i + 1; j < M.length; j++) M[k][j] -= q * M[i][j];
    }
  }
  return d;
};

const inverse = A => {
  const n = A.length;
  const M = A.map((row, i) => [...row, ...eye(n)[i]]);
  for (let i = 0; i < n; i++) {
    let p = i;
    for (let k = i + 1; k < n; k++) if (Math.abs(M[k][i]) > Math.abs(M[p][i])) p = k;
    [M[p], M[i]] = [M[i], M[p]];
    const q = M[i][i];
    for (let j = 0; j < 2 * n; j++) M[i][j] /= q;
    for (let k = 0; k < n; k++) if (k !== i) {
      const f = M[k][i];
      for (let j = 0; j < 2 * n; j++) M[k][j] -= f * M[i][j];
    }
  }
  return M.map(row => row.slice(n));
};

const schurLast = R => {
  const n = R.length, c = R[n - 1][n - 1];
  const A = R.slice(0, -1).map(row => row.slice(0, -1));
  const u = R.slice(0, -1).map(row => row[n - 1]);
  return { c, S: A.map((row, i) => row.map((x, j) => x - u[i] * u[j] / c)), u };
};

const schurBlock = (R, retainedCount) => {
  const A = R.slice(0, retainedCount).map(row => row.slice(0, retainedCount));
  const B = R.slice(0, retainedCount).map(row => row.slice(retainedCount));
  const C = R.slice(retainedCount).map(row => row.slice(retainedCount));
  const correction = mm(mm(B, inverse(C)), T(B));
  return A.map((row, i) => row.map((x, j) => x - correction[i][j]));
};

// Positive four-port response R=L L^T.
const L = [[2, 0, 0, 0], [0.3, 1.7, 0, 0], [-0.2, 0.5, 1.4, 0], [0.4, -0.1, 0.6, 1.1]];
const R = mm(L, T(L));
assert(determinant(R) > 0);

const first = schurLast(R);
assert(determinant(first.S) > 0);
assert(close(determinant(R), first.c * determinant(first.S)));

// Unit-determinant congruence block-diagonalizes R.
const n = 4;
const G = eye(n);
for (let i = 0; i < n - 1; i++) G[i][n - 1] = -first.u[i] / first.c;
const diagonalized = mm(mm(G, R), T(G));
for (let i = 0; i < n - 1; i++) {
  assert(close(diagonalized[i][n - 1], 0));
  assert(close(diagonalized[n - 1][i], 0));
}
assert(maxDiff(diagonalized.slice(0, -1).map(row => row.slice(0, -1)), first.S) < 1e-9);
assert(close(diagonalized[n - 1][n - 1], first.c));

// Sequential elimination of ports 4 then 3 equals eliminating their 2x2 block jointly.
const second = schurLast(first.S);
const joint = schurBlock(R, 2);
assert(maxDiff(second.S, joint) < 1e-9);

// Recursive pivot product equals the determinant.
let current = R.map(row => row.slice());
const pivots = [];
while (current.length > 1) {
  const step = schurLast(current);
  pivots.push(step.c);
  current = step.S;
}
pivots.push(current[0][0]);
assert(pivots.every(x => x > 0));
assert(close(pivots.reduce((a, b) => a * b, 1), determinant(R)));

// Retained-coordinate congruence commutes with elimination.
const Q = [[1.2, 0.3, -0.1], [0.2, 0.9, 0.4], [-0.3, 0.1, 1.1]];
const H = eye(4);
for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) H[i][j] = Q[i][j];
const transformed = mm(mm(H, R), T(H));
const transformedSchur = schurLast(transformed).S;
assert(maxDiff(transformedSchur, mm(mm(Q, first.S), T(Q))) < 1e-9);

console.log('Recursive Schur-Jordan descent certificate: PASS');
console.log(`detR=${determinant(R)}; pivot_product=${pivots.reduce((a, b) => a * b, 1)}; sequential_equals_block=true; congruence_covariant=true`);
