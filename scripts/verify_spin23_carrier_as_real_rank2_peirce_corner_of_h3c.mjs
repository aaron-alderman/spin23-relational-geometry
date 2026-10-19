import assert from "node:assert/strict";

const c = (re, im = 0) => ({ re, im });
const addc = (a, b) => c(a.re + b.re, a.im + b.im);
const mulc = (a, b) => c(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (a) => c(a.re, -a.im);
const scalec = (x, a) => c(x * a.re, x * a.im);
const mmul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => addc(s, mulc(x, B[k][j])), c(0))));
const dagger = (A) => A[0].map((_, j) => A.map((row) => conj(row[j])));
const madd = (A, B) => A.map((row, i) => row.map((z, j) => addc(z, B[i][j])));
const mscale = (x, A) => A.map((row) => row.map((z) => scalec(x, z)));
const msub = (A, B) => madd(A, mscale(-1, B));
const maxAbs = (A) => Math.max(...A.flat().map((z) => Math.hypot(z.re, z.im)));
const jordan = (A, B) => mscale(0.5, madd(mmul(A, B), mmul(B, A)));
const triple = (A, B, C) => mscale(0.5, madd(mmul(mmul(A, B), C), mmul(mmul(C, B), A)));
const toC = (A) => A.map((row) => row.map((x) => c(x)));
const embed2to3 = (A) => [
  [A[0][0], A[0][1], c(0)],
  [A[1][0], A[1][1], c(0)],
  [c(0), c(0), c(0)],
];
const det3 = (A) => {
  const term = (i, j, k) => mulc(A[0][i], mulc(A[1][j], A[2][k]));
  return addc(addc(term(0, 1, 2), term(1, 2, 0)), addc(term(2, 0, 1), scalec(-1, addc(addc(term(2, 1, 0), term(1, 0, 2)), term(0, 2, 1)))));
};

const A = toC([[2, 0.4], [0.4, 1]]);
const B = toC([[1, -0.3], [-0.3, 3]]);
const C = toC([[0.7, 0.2], [0.2, 1.4]]);
for (const X of [A, B, C]) {
  assert(maxAbs(msub(X, dagger(X))) < 1e-12);
  assert(maxAbs(msub(X, X.map((row) => row.map(conj)))) < 1e-12);
}
assert(maxAbs(msub(jordan(embed2to3(A), embed2to3(B)), embed2to3(jordan(A, B)))) < 1e-12);
assert(maxAbs(msub(triple(embed2to3(A), embed2to3(B), embed2to3(C)), embed2to3(triple(A, B, C)))) < 1e-12);

const e = [
  [c(1), c(0), c(0)],
  [c(0), c(1), c(0)],
  [c(0), c(0), c(0)],
];
for (const X of [embed2to3(A), embed2to3(B), embed2to3(C)]) {
  assert(maxAbs(msub(mmul(e, mmul(X, e)), X)) < 1e-12);
  assert(Math.hypot(det3(X).re, det3(X).im) < 1e-12);
}

const complexHermitian2 = [
  [c(2), c(0.4, 0.7)],
  [c(0.4, -0.7), c(1)],
];
assert(maxAbs(msub(complexHermitian2, dagger(complexHermitian2))) < 1e-12);
assert(maxAbs(msub(complexHermitian2, complexHermitian2.map((row) => row.map(conj)))) > 0.5);

console.log(JSON.stringify({
  protocol: "spin23-carrier-as-real-rank2-peirce-corner-of-h3c/1",
  rankTwoProjection: "e=diag(1,1,0)",
  complexCorner: "e H_3(C) e is Jordan-isomorphic to H_2(C), real dimension 4",
  realFixedCorner: "(e H_3(C) e)^conjugation is H_2(R), real dimension 3",
  exactChecks: [
    "upper-left embedding preserves the Jordan product",
    "upper-left embedding preserves the special Jordan triple",
    "embedded H_2(R) matrices satisfy eXe=X",
    "their H_3(C) cubic determinant vanishes, so the corner lies on the rank-two boundary",
  ],
  conformalLadder: [
    "co(H_2(R))=sp(4,R)=so(2,3)",
    "co(H_2(C))=su(2,2)=so(2,4)",
    "co(H_3(C))=su(3,3)",
    "co(H_3(O))=e7(-25) after a chosen C subset O embedding",
  ],
  conclusion: "The Spin(2,3) carrier is exactly the conjugation-fixed real slice of a rank-two Peirce corner inside the dynamic Majorana H_3(C) carrier. This nests the earlier Spin(2,4)->Spin(2,3) descent inside the larger SU(3,3) response system.",
  passed: true,
}, null, 2));
