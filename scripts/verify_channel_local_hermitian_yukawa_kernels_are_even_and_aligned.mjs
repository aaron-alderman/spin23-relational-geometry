import assert from "node:assert/strict";

const C = (re, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const sub = (a, b) => C(a.re - b.re, a.im - b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (a) => C(a.re, -a.im);
const scale = (a, s) => C(a.re * s, a.im * s);
const zero = (r, c = r) => Array.from({ length: r }, () => Array.from({ length: c }, () => C(0)));
const dagger = (A) => A[0].map((_, j) => A.map((row) => conj(row[j])));
const mm = (A, B) => A.map((row) => B[0].map((_, j) =>
  row.reduce((sum, x, k) => add(sum, mul(x, B[k][j])), C(0))));
const minus = (A, B) => A.map((row, i) => row.map((x, j) => sub(x, B[i][j])));
const trace = (A) => A.reduce((sum, row, i) => add(sum, row[i]), C(0));
const diag = (xs) => xs.map((x, i) => xs.map((_, j) => C(i === j ? x : 0)));
const frob = (A) => Math.sqrt(A.flat().reduce((sum, z) => sum + z.re ** 2 + z.im ** 2, 0));
const nearZero = (x, eps = 1e-10) => Math.abs(x) < eps;

const omega = C(-0.5, Math.sqrt(3) / 2);
const omega2 = mul(omega, omega);
const s3 = 1 / Math.sqrt(3);
const U = [
  [C(s3), C(s3), C(s3)],
  [C(s3), scale(omega, s3), scale(omega2, s3)],
  [C(s3), scale(omega2, s3), scale(omega, s3)]
];
const Yu = diag([1, 2, 4]);
const Yd = mm(U, diag([1.5, 3, 5]));
const Ynu = mm(U, diag([0.2, 0.5, 0.9]));
const Ye = diag([0.3, 0.7, 1.2]);

const H = (Y) => mm(Y, dagger(Y));
const Hu = H(Yu), Hd = H(Yd), Hnu = H(Ynu), He = H(Ye);
for (const X of [Hu, Hd, Hnu, He]) {
  assert(frob(minus(X, dagger(X))) < 1e-12);
  const X2 = mm(X, X), X3 = mm(X2, X);
  assert(nearZero(trace(X).im));
  assert(nearZero(trace(X2).im));
  assert(nearZero(trace(X3).im));
}

// Channel-local Hermitian trace kernels have no odd coefficient.
const evenUp = trace(Hu).re + trace(Hnu).re;
const evenDown = trace(Hd).re + trace(He).re;
const responseUpLocal = [evenUp, 0];
const responseDownLocal = [evenDown, 0];
const alignmentDeterminantLocal =
  responseUpLocal[0] * responseDownLocal[1] -
  responseUpLocal[1] * responseDownLocal[0];
assert.equal(alignmentDeterminantLocal, 0);

// CP odd flavor data first appear in a cross-channel commutator for three
// generations.  Its cubic trace is nonzero for the chosen complex orientation.
const comm = minus(mm(Hu, Hd), mm(Hd, Hu));
const jarlskogLike = trace(mm(mm(comm, comm), comm)).im;
assert(Math.abs(jarlskogLike) > 1e-6);

// One generation: Hermitian flavor matrices are numbers, so the commutator
// and every commutator-derived odd invariant vanish.
const h1u = C(2.3), h1d = C(1.7);
assert(nearZero(sub(mul(h1u, h1d), mul(h1d, h1u)).re));

// Two generations: trace of the cube of any traceless 2x2 commutator is zero.
const A2 = [[C(1), C(0)], [C(0), C(3)]];
const V2 = [
  [C(Math.cos(0.4)), C(Math.sin(0.4))],
  [C(-Math.sin(0.4)), C(Math.cos(0.4))]
];
const B2 = mm(mm(V2, diag([2, 5])), dagger(V2));
const comm2 = minus(mm(A2, B2), mm(B2, A2));
assert(nearZero(trace(mm(mm(comm2, comm2), comm2)).im));
assert(nearZero(trace(mm(mm(comm2, comm2), comm2)).re));

// A global CP-odd invariant does not by itself align two response vectors.
const oddFormUp = 0.7, oddFormDown = -0.2;
const responseUpCross = [evenUp, jarlskogLike * oddFormUp];
const responseDownCross = [evenDown, jarlskogLike * oddFormDown];
const alignmentDeterminantCross =
  responseUpCross[0] * responseDownCross[1] -
  responseUpCross[1] * responseDownCross[0];
assert(Math.abs(alignmentDeterminantCross) > 1e-6);

console.log(JSON.stringify({
  protocol: "higgs-channel-hermitian-yukawa-response-alignment/1",
  fieldGrid: {
    conjugateRight_up: ["nu^c", "u^c"],
    conjugateRight_down: ["e^c", "d^c"],
    left_up: ["nu", "u"],
    left_down: ["e", "d"]
  },
  channelLocalInvariantFamily: "real traces Tr[(Y Y^dagger)^n]",
  channelLocalOddCoefficient: 0,
  localResponseVectors: { up: responseUpLocal, down: responseDownLocal },
  localAlignmentDeterminant: alignmentDeterminantLocal,
  threeGenerationCrossChannelOddInvariant: "Im Tr([Hu,Hd]^3)",
  threeGenerationValue: jarlskogLike,
  oneGenerationOddInvariant: 0,
  twoGenerationCubicCommutatorTrace: 0,
  crossChannelSampleAlignmentDeterminant: alignmentDeterminantCross,
  consequence: "channel-local Hermitian quadratic kernels align on the even axis; CP-odd response and possible misalignment require cross-channel three-generation data plus a matching rule",
  passed: true
}, null, 2));
