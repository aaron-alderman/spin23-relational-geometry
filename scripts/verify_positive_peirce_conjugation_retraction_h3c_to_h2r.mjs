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
const trace = (A) => A.reduce((s, row, i) => s + row[i].re, 0);
const jordan = (A, B) => mscale(0.5, madd(mmul(A, B), mmul(B, A)));
const triple = (A, B, C) => mscale(0.5, madd(mmul(mmul(A, B), C), mmul(mmul(C, B), A)));
const toC = (A) => A.map((row) => row.map((x) => c(x)));
const embedReal2 = (A) => [
  [c(A[0][0].re), c(A[0][1].re), c(0)],
  [c(A[1][0].re), c(A[1][1].re), c(0)],
  [c(0), c(0), c(0)],
];
const retract = (X) => embedReal2([
  [X[0][0], X[0][1]],
  [X[1][0], X[1][1]],
]);
const positive2 = (X) => X[0][0].re >= -1e-12 && X[1][1].re >= -1e-12
  && X[0][0].re * X[1][1].re - X[0][1].re ** 2 >= -1e-12;

const R = [
  [c(1, 0.2), c(0.3, -0.1), c(-0.2, 0.4)],
  [c(0.5, 0.7), c(1.2, 0.1), c(0.4, -0.3)],
  [c(-0.1, 0.6), c(0.2, 0.5), c(0.9, -0.2)],
];
const X = mmul(R, dagger(R));
const EX = retract(X);
assert(positive2(EX));
assert(maxAbs(msub(retract(EX), EX)) < 1e-12);
assert(trace(EX) <= trace(X) + 1e-12);

const A = embedReal2(toC([[2, 0.4], [0.4, 1]]));
const C = embedReal2(toC([[1, -0.2], [-0.2, 3]]));
assert(maxAbs(msub(retract(jordan(A, X)), jordan(A, EX))) < 1e-12);
assert(maxAbs(msub(retract(triple(A, X, C)), triple(A, EX, C))) < 1e-12);

const thirdFace = [
  [c(0), c(0), c(0)],
  [c(0), c(0), c(0)],
  [c(0), c(0), c(5)],
];
assert(maxAbs(retract(thirdFace)) === 0);
assert(trace(thirdFace) === 5);

const complexCorner = [
  [c(2), c(0.4, 0.8), c(0)],
  [c(0.4, -0.8), c(1), c(0)],
  [c(0), c(0), c(0)],
];
const realCorner = retract(complexCorner);
assert(Math.abs(complexCorner[0][1].im) > 0.1);
assert(realCorner[0][1].im === 0);
assert(trace(realCorner) === trace(complexCorner));

console.log(JSON.stringify({
  protocol: "positive-peirce-conjugation-retraction-h3c-to-h2r/1",
  map: "E(X)=Re(eXe), embedded back into H_3(C), e=diag(1,1,0)",
  factorization: [
    "Peirce compression X -> eXe is completely positive into H_2(C)",
    "conjugation average Y -> (Y+conj(Y))/2 is positive into H_2(R)",
  ],
  properties: {
    positive: true,
    idempotent: true,
    surjectiveOntoPositiveH2R: true,
    jordanBimodule: "E(A o X)=A o E(X) for A in H_2(R)",
    tripleBimodule: "E({A,X,C})={A,E(X),C} for A,C in H_2(R)",
    globallyUnital: false,
    globalTracePreserving: false,
    faithful: false,
  },
  discardedDirections: {
    peirceHalfLinksRealDimension: 4,
    thirdFaceRealDimension: 1,
    imaginaryCornerDirectionRealDimension: 1,
    totalKernelDimension: 6,
  },
  positiveKernelWitness: "diag(0,0,5) maps to zero",
  physicalMeaning: "The canonical retraction is a compression plus real decoherence. It selects the Spin(2,3) face but cannot be a lossless deterministic reduction of the full H_3(C) state space.",
  passed: true,
}, null, 2));
