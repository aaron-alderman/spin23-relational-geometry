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
const matMul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((q, x, k) => add(q, mul(x, B[k][j])), C(0))));
const dagger = (A) => A[0].map((_, j) => A.map((row) => conj(row[j])));
const bar = (A) => A.map((row) => row.map(conj));
const closeMatrix = (A, B, tol = 1e-11) => A.every((row, i) => row.every((x, j) => abs(sub(x, B[i][j])) < tol));
const outer = (v, w) => v.map((x) => w.map((y) => mul(x, conj(y))));
const identity = (n) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => C(i === j ? 1 : 0)));

const s = [C(1 / Math.sqrt(3)), C(1 / Math.sqrt(3)), C(1 / Math.sqrt(3))];
const t = [C(1 / Math.sqrt(6)), C(1 / Math.sqrt(6)), C(-2 / Math.sqrt(6))];
const o = [C(1 / Math.sqrt(2)), C(-1 / Math.sqrt(2)), C(0)];
const Ps = outer(s, s);
const Pd = matAdd(identity(3), matScale(-1, Ps));
const W = matAdd(matScale(2, Ps), matScale(-1, identity(3)));

const P12 = [[C(0), C(1), C(0)], [C(1), C(0), C(0)], [C(0), C(0), C(1)]];
const P23 = [[C(1), C(0), C(0)], [C(0), C(0), C(1)], [C(0), C(1), C(0)]];
const commutator = (A, B) => matAdd(matMul(A, B), matScale(-1, matMul(B, A)));

assert(closeMatrix(matMul(W, W), identity(3)), "singlet-doublet grading must square to one");
assert(closeMatrix(W, dagger(W)), "singlet-doublet grading must be Hermitian");
assert(closeMatrix(commutator(W, P12), matScale(0, identity(3))), "grading must commute with first transposition");
assert(closeMatrix(commutator(W, P23), matScale(0, identity(3))), "grading must commute with second transposition");

const apply = (A, v) => A.map((row) => row.reduce((q, x, k) => add(q, mul(x, v[k])), C(0)));
const closeVector = (v, w) => v.every((x, i) => abs(sub(x, w[i])) < 1e-11);
assert(closeVector(apply(W, s), s), "sheet singlet must have + parity");
assert(closeVector(apply(W, t), t.map((x) => scale(-1, x))), "flag contrast must have - parity");
assert(closeVector(apply(W, o), o.map((x) => scale(-1, x))), "sign-gradient direction must have - parity");

// Every S3-equivariant Hermitian map is a Ps+b Pd. The involution equation gives a,b in {+1,-1}.
for (const a of [-1, 1]) {
  for (const b of [-1, 1]) {
    const X = matAdd(matScale(a, Ps), matScale(b, Pd));
    assert(closeMatrix(matMul(X, X), identity(3)), "isotypic sign choice must be an involution");
  }
}
const nontrivial = [
  matAdd(Ps, matScale(-1, Pd)),
  matAdd(matScale(-1, Ps), Pd),
];
assert(closeMatrix(nontrivial[0], W), "first nontrivial involution must be W");
assert(closeMatrix(nontrivial[1], matScale(-1, W)), "second nontrivial involution must be -W");

// Canonical CP operators and their two independent reality parities.
const A = matAdd(outer(s, o), outer(o, s));
const rawB = matAdd(outer(t, o), matScale(-1, outer(o, t)));
const B = rawB.map((row) => row.map((x) => mul(C(0, 1), x)));
const conjugateByW = (X) => matMul(matMul(W, X), W);
assert(closeMatrix(bar(A), A), "A must be ordinary-real");
assert(closeMatrix(bar(B), matScale(-1, B)), "B must be ordinary-imaginary");
assert(closeMatrix(conjugateByW(A), matScale(-1, A)), "A must cross the singlet-doublet grading");
assert(closeMatrix(conjugateByW(B), B), "B must remain inside the doublet");

console.log("Unique S3 singlet-doublet flag involution certificate: PASS");
console.log("W=2|s><s|-I_commutes_with_S3_and_has_eigenvalues_(+,-,-)");
console.log("nontrivial_S3_equivariant_Hermitian_involution_unique_up_to_sign=true");
console.log("A=(ordinary_real,W_odd); B=(ordinary_imaginary,W_even)");
