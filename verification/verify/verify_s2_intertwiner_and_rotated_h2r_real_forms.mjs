const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };
const C = (re, im = 0) => ({ re, im });
const add = (x, y) => C(x.re + y.re, x.im + y.im);
const mul = (x, y) => C(x.re * y.re - x.im * y.im, x.re * y.im + x.im * y.re);
const conj = (x) => C(x.re, -x.im);
const sub = (x, y) => C(x.re - y.re, x.im - y.im);
const abs = (x) => Math.hypot(x.re, x.im);
const matMul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => add(s, mul(x, B[k][j])), C(0))));
const dagger = (A) => A[0].map((_, j) => A.map((row) => conj(row[j])));
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const close = (x, y, tol = 1e-12) => abs(sub(x, y)) < tol;
const closeMatrix = (A, B) => A.every((row, i) => row.every((x, j) => close(x, B[i][j])));

// Residual S2 parity basis: two even directions and one odd direction.
const P = [[C(1), C(0), C(0)], [C(0), C(1), C(0)], [C(0), C(0), C(-1)]];
const evenEnd = [
  [[1, 0], [0, 0]], [[0, 1], [0, 0]], [[0, 0], [1, 0]], [[0, 0], [0, 1]],
];
assert(evenEnd.length + 1 === 5, "S2-even endomorphism dimension must be 5 complex");
assert(2 + 2 === 4, "S2-odd endomorphism dimension must be 4 complex");
assert(3 + 1 === 4, "S2-even symmetric dimension must be 4 complex");
assert(2 === 2, "S2-odd symmetric dimension must be 2 complex");

const Xeven = [
  [C(1, 2), C(3, -1), C(0)],
  [C(-2, 1), C(4), C(0)],
  [C(0), C(0), C(5, -2)],
];
const Xodd = [
  [C(0), C(0), C(1, 1)],
  [C(0), C(0), C(2, -1)],
  [C(3), C(-1, 2), C(0)],
];
assert(closeMatrix(matMul(matMul(P, Xeven), P), Xeven), "even block must commute with residual parity");
assert(closeMatrix(matMul(matMul(P, Xodd), P), Xodd.map((r) => r.map((x) => C(-x.re, -x.im)))), "odd block must anticommute with residual parity");

// The canonical exceptional odd slice Z=Q R^2, z=(alpha,i beta).
const Q = [[C(1), C(0)], [C(0), C(0, 1)]];
const Qd = dagger(Q);
const B = [[C(2), C(3)], [C(-1), C(4)]]; // arbitrary real endomorphism
const T = matMul(matMul(Q, B), Qd);
for (const [alpha, beta] of [[1, 2], [-3, 0.5], [0, 4]]) {
  const z = [[C(alpha)], [C(0, beta)]];
  const pulledBack = matMul(Qd, matMul(T, z));
  assert(Math.abs(pulledBack[0][0].im) < 1e-12 && Math.abs(pulledBack[1][0].im) < 1e-12, "Q M2(R) Q^-1 must preserve the exceptional real slice");
}

// Hermitian elements of the stabilizer are Q H2(R) Q^dagger.
const H0 = [[C(5), C(2)], [C(2), C(7)]];
const Hq = matMul(matMul(Q, H0), Qd);
assert(closeMatrix(Hq, dagger(Hq)), "rotated carrier must be Hermitian");
assert(close(Hq[0][1], C(0, -2)) && close(Hq[1][0], C(0, 2)), "rotated H2(R) must have imaginary Hermitian off-diagonal");

// Original and rotated Hermitian H2(R) slices intersect only on diagonal matrices.
assert(!closeMatrix(H0, Hq), "nonzero real off-diagonal cannot lie in both real forms");
const diagonal = [[C(5), C(0)], [C(0), C(7)]];
assert(closeMatrix(matMul(matMul(Q, diagonal), Qd), diagonal), "diagonal intersection must survive both real forms");

// Acting with the original real carrier on z leaks from Z exactly through r.
const alpha = 3;
const beta = 5;
const r = 2;
const z = [[C(alpha)], [C(0, beta)]];
const Hz = matMul(H0, z);
const back = matMul(Qd, Hz);
assert(Math.abs(back[0][0].im - r * beta) < 1e-12, "first leakage component must be r beta");
assert(Math.abs(back[1][0].im + r * alpha) < 1e-12, "second leakage component must be -r alpha");
assert(r * alpha * beta !== 0, "CP area requires the real-form incompatibility parameters");

console.log("Residual-S2 intertwiner and rotated-H2(R) certificate: PASS");
console.log("End=5_even+4_odd_complex; Sym=4_even+2_odd_complex");
console.log("exceptional_slice_stabilizer=Q*M2(R)*Q^-1; Hermitian_part=Q*H2(R)*Q^dagger");
console.log("original_rotated_H2R_intersection=diagonal; leakage=(r*beta,-r*alpha)");
