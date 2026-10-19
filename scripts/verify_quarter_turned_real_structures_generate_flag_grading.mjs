const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };
const C = (re, im = 0) => ({ re, im });
const add = (x, y) => C(x.re + y.re, x.im + y.im);
const sub = (x, y) => C(x.re - y.re, x.im - y.im);
const mul = (x, y) => C(x.re * y.re - x.im * y.im, x.re * y.im + x.im * y.re);
const conj = (x) => C(x.re, -x.im);
const scale = (a, x) => C(a * x.re, a * x.im);
const abs = (x) => Math.hypot(x.re, x.im);
const matAdd = (A, B) => A.map((row, i) => row.map((x, j) => add(x, B[i][j])));
const matScale = (a, A) => A.map((row) => row.map((x) => scale(a, x)));
const matMul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => add(s, mul(x, B[k][j])), C(0))));
const dagger = (A) => A[0].map((_, j) => A.map((row) => conj(row[j])));
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const bar = (A) => A.map((row) => row.map(conj));
const closeMatrix = (A, B, tol = 1e-11) => A.every((row, i) => row.every((x, j) => abs(sub(x, B[i][j])) < tol));

const triple = (A, B, D) => matScale(0.5, matAdd(matMul(matMul(A, dagger(B)), D), matMul(matMul(D, dagger(B)), A)));
const conjugateBy = (U, A) => matMul(matMul(U, A), dagger(U));

const Q = [[C(1), C(0)], [C(0), C(0, 1)]];
const A = [[C(2), C(1, 2)], [C(1, -2), C(3)]];
const B = [[C(1), C(-2, 1)], [C(-2, -1), C(4)]];
const D = [[C(5), C(0, -1)], [C(0, 1), C(2)]];

// Unitary conjugation is an exact Hermitian Jordan-triple automorphism.
const left = conjugateBy(Q, triple(A, B, D));
const right = triple(conjugateBy(Q, A), conjugateBy(Q, B), conjugateBy(Q, D));
assert(closeMatrix(left, right), "quarter-turn conjugation must preserve the Jordan triple");

// Real structures kappa_0=K and kappa_Q=Q K Q^-1 have antiunitary matrix U_Q=Q Q^T.
const Gamma = matMul(Q, transpose(Q));
const expectedGamma = [[C(1), C(0)], [C(0), C(-1)]];
assert(closeMatrix(Gamma, expectedGamma), "relative real structures must generate the flag grading");
assert(closeMatrix(matMul(Gamma, Gamma), [[C(1), C(0)], [C(0), C(1)]]), "flag grading must square to one");

// The two conjugations commute here: (U_Q K)K = K(U_Q K) = Gamma.
assert(closeMatrix(Gamma, bar(Gamma)), "grading must be real for commuting conjugations");

// Gamma-conjugation makes diagonal matrices even and off-diagonal matrices odd.
const diagonal = [[C(2), C(0)], [C(0), C(5)]];
const offDiagonal = [[C(0), C(3, 1)], [C(3, -1), C(0)]];
assert(closeMatrix(conjugateBy(Gamma, diagonal), diagonal), "diagonal sector must be grading even");
assert(closeMatrix(conjugateBy(Gamma, offDiagonal), matScale(-1, offDiagonal)), "off-diagonal sector must be grading odd");

// The original and rotated real Hermitian carriers are related by the same automorphism.
const Hreal = [[C(2), C(3)], [C(3), C(7)]];
const Hrot = conjugateBy(Q, Hreal);
assert(closeMatrix(Hrot, [[C(2), C(0, -3)], [C(0, 3), C(7)]]), "quarter-turn must map real to imaginary Hermitian edge");

console.log("Quarter-turned real-structure grading certificate: PASS");
console.log("Ad_Q_is_Jordan_triple_automorphism=true; intrinsic_selection=false");
console.log("kappa_Q*kappa_0=diag(1,-1)=flag_grading");
console.log("grading_even=diagonal; grading_odd=off_diagonal");
