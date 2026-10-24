import assert from 'node:assert/strict';

const near = (a, b, tol = 1e-10) => assert.ok(Math.abs(a - b) < tol, String(a) + ' != ' + String(b));
const mul = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const transpose = A => A[0].map((_, j) => A.map(row => row[j]));
const det2 = A => A[0][0] * A[1][1] - A[0][1] * A[1][0];
const inv2 = A => {
  const d = det2(A);
  return [[A[1][1] / d, -A[0][1] / d], [-A[1][0] / d, A[0][0] / d]];
};
const sub = (A, B) => A.map((row, i) => row.map((x, j) => x - B[i][j]));

const Q1 = [[1, 0, 0], [0, 1, 0]];
const Q2 = [[1, 1]];
const Q21 = mul(Q2, Q1);
assert.deepEqual(Q21, [[1, 1, 0]]);
assert.deepEqual(mul(Q1, [[0], [0], [1]]), [[0], [0]]);
assert.deepEqual(mul(Q21, [[1], [-1], [0]]), [[0]]);

const stacked = [[1, 0], [0, 1]];
const stackedGram = mul(transpose(stacked), stacked);
near(det2(stackedGram), 1);

const latticeFirst = [[2, 0], [0, 1]];
const latticeSecond = [[3, 0], [0, 1]];
near(Math.abs(det2(latticeFirst)), 2);
near(Math.abs(det2(latticeSecond)), 3);
near(Math.abs(det2(mul(latticeSecond, latticeFirst))), 6);

const Kxx = [[7, 1], [1, 6]];
const Kxh = [[1, 2], [2, -1]];
const Khh = [[5, 1], [1, 4]];
const direct = sub(Kxx, mul(mul(Kxh, inv2(Khh)), transpose(Kxh)));

const kzz = 4;
const Kxy = [[1], [2]];
const Kxz = [[2], [-1]];
const kyy = 5;
const kyz = 1;
const outer = (u, v, scale = 1) => u.map(row => v.map(r => scale * row[0] * r[0]));
const afterZxx = sub(Kxx, outer(Kxz, Kxz, 1 / kzz));
const afterZxy = Kxy.map((row, i) => [row[0] - Kxz[i][0] * kyz / kzz]);
const afterZyy = kyy - kyz * kyz / kzz;
const sequential = sub(afterZxx, outer(afterZxy, afterZxy, 1 / afterZyy));
for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) near(direct[i][j], sequential[i][j]);

const fisherAfterBsc = p => 4 * (1 - 2 * p) ** 2;
const composeBsc = (p, q) => p + q - 2 * p * q;
const p = 0.1;
const q = 0.2;
const pq = composeBsc(p, q);
near(fisherAfterBsc(0), 4);
assert.ok(fisherAfterBsc(p) < 4);
assert.ok(fisherAfterBsc(pq) < fisherAfterBsc(p));

console.log('Quotient-scar composition certificate: PASS');
console.log('kernels_grow_under_serial_compression; parallel_faces_intersect_kernels');
console.log('finite_lattice_indices_multiply=2*3=6; exact_Schur_elimination_is_associative');
console.log('Fisher_information_contracts_under_serial_detector_channels');
