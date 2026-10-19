import assert from "node:assert/strict";

const c = (re, im = 0) => ({ re, im });
const addc = (a, b) => c(a.re + b.re, a.im + b.im);
const mulc = (a, b) => c(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (a) => c(a.re, -a.im);
const scalec = (x, a) => c(x * a.re, x * a.im);
const mmul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => addc(s, mulc(x, B[k][j])), c(0))));
const madd = (A, B) => A.map((row, i) => row.map((z, j) => addc(z, B[i][j])));
const mscale = (x, A) => A.map((row) => row.map((z) => scalec(x, z)));
const msub = (A, B) => madd(A, mscale(-1, B));
const maxAbs = (A) => Math.max(...A.flat().map((z) => Math.hypot(z.re, z.im)));
const conjugateMatrix = (A) => A.map((row) => row.map(conj));
const zeros = (n) => Array.from({ length: n }, () => Array.from({ length: n }, () => c(0)));
const blockDiagonal = (A, B) => [
  [A[0][0], A[0][1], c(0), c(0)],
  [A[1][0], A[1][1], c(0), c(0)],
  [c(0), c(0), B[0][0], B[0][1]],
  [c(0), c(0), B[1][0], B[1][1]],
];
const encode = (A) => blockDiagonal(A, conjugateMatrix(A));
const S = [
  [c(0), c(0), c(1), c(0)],
  [c(0), c(0), c(0), c(1)],
  [c(1), c(0), c(0), c(0)],
  [c(0), c(1), c(0), c(0)],
];
const twirl = (O) => mscale(0.5, madd(O, mmul(S, mmul(O, S))));

const A = [
  [c(2), c(0.4, 0.8)],
  [c(0.4, -0.8), c(1)],
];
const realA = A.map((row) => row.map((z) => c(z.re)));
assert(maxAbs(msub(twirl(encode(A)), encode(realA))) < 1e-12);
assert(maxAbs(msub(twirl(twirl(encode(A))), twirl(encode(A)))) < 1e-12);

// The twirl is a random-unitary channel with Kraus operators I/sqrt(2), S/sqrt(2).
const I4 = zeros(4).map((row, i) => row.map((_, j) => c(i === j ? 1 : 0)));
assert(maxAbs(msub(mmul(S, S), I4)) < 1e-12);
const krausCompleteness = madd(mscale(0.5, I4), mscale(0.5, mmul(S, S)));
assert(maxAbs(msub(krausCompleteness, I4)) < 1e-12);

// Exchange-fixed topology coherences exist in the full doubled algebra.
const Q = [
  [c(0.3), c(0.1, 0.2)],
  [c(0.1, -0.2), c(-0.4)],
];
const coherentFixed = [
  [c(0), c(0), Q[0][0], Q[0][1]],
  [c(0), c(0), Q[1][0], Q[1][1]],
  [Q[0][0], Q[0][1], c(0), c(0)],
  [Q[1][0], Q[1][1], c(0), c(0)],
];
assert(maxAbs(msub(twirl(coherentFixed), coherentFixed)) < 1e-12);
assert(maxAbs(coherentFixed) > 0.1);

console.log(JSON.stringify({
  protocol: "doubled-conjugate-exchange-gives-cp-real-slice-selector/1",
  encoding: "iota(A)=diag(A,conj(A))",
  exchange: "S swaps the two conjugate topology sectors",
  selector: "T(O)=(O+S O S)/2",
  completelyPositiveImplementation: {
    randomUnitary: true,
    krausOperators: ["I/sqrt(2)", "S/sqrt(2)"],
    tracePreserving: true,
    unital: true,
    idempotent: true,
  },
  encodedAction: "T(iota(A))=iota(Re A)",
  essentialBoundary: "The full exchange-fixed doubled algebra contains off-diagonal topology coherences. H_2(R) is obtained only inside the conjugate-paired block-diagonal encoded sector, requiring topology superselection or a dynamical suppression of coherences.",
  passed: true,
}, null, 2));
