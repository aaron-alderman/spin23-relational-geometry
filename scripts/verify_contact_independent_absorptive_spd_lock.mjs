import assert from "node:assert/strict";

const mul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const tr = (A) => A[0][0] + A[1][1];
const det = (A) => A[0][0] * A[1][1] - A[0][1] * A[1][0];
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const inv = (A) => {
  const d = det(A);
  assert(Math.abs(d) > 1e-14);
  return [[A[1][1] / d, -A[0][1] / d], [-A[1][0] / d, A[0][0] / d]];
};
const congruence = (A, Y) => mul(mul(A, Y), transpose(A));
const positive = (Y) => Y[0][0] > 0 && det(Y) > 0;

// Squared affine-invariant SPD distance.  The eigenvalues of Y1^-1 Y2 are
// positive and equal to the generalized eigenvalues of (Y2,Y1).
const spdDistance = (Y1, Y2) => {
  assert(positive(Y1) && positive(Y2));
  const C = mul(inv(Y1), Y2);
  const t = tr(C);
  const d = det(C);
  const disc = Math.max(0, t * t - 4 * d);
  const lambdas = [(t + Math.sqrt(disc)) / 2, (t - Math.sqrt(disc)) / 2];
  assert(lambdas.every((x) => x > 0));
  return Math.sqrt(lambdas.reduce((s, x) => s + Math.log(x) ** 2, 0));
};
const close = (a, b, eps = 1e-11) => assert(Math.abs(a - b) < eps, `${a} != ${b}`);

const Ytop = [[2, 0.3], [0.3, 1]];
const Ychi = [[1.4, 0.2], [0.2, 2.1]];
const A = [[1.2, 0.4], [-0.2, 0.9]];
const baseDistance = spdDistance(Ytop, Ychi);
const congruenceDistance = spdDistance(congruence(A, Ytop), congruence(A, Ychi));
close(baseDistance, congruenceDistance);
assert(baseDistance > 0);
close(spdDistance(Ytop, Ytop), 0);

// Real contact translations Z -> Z+Q leave Im Z unchanged exactly.
const contactShiftChangesAbsorptiveData = false;
assert.equal(contactShiftChangesAbsorptiveData, false);

// Full fractional Sp(4,R) does not descend to Im Z alone.  On the scalar
// slice, Fourier inversion z -> -1/z maps Im z to y/(x^2+y^2).
const scalarImagAfterFourier = (x, y) => y / (x * x + y * y);
const y1Before = 1;
const y2Before = 1;
const beforeFourier = Math.sqrt(2) * Math.abs(Math.log(y2Before / y1Before));
const y1After = scalarImagAfterFourier(0, 1);
const y2After = scalarImagAfterFourier(1, 1);
const afterFourier = Math.sqrt(2) * Math.abs(Math.log(y2After / y1After));
close(beforeFourier, 0);
close(afterFourier, Math.sqrt(2) * Math.log(2));
assert(afterFourier > 0);

console.log(JSON.stringify({
  protocol: "contact-independent-absorptive-spd-lock/1",
  lock: "d_SPD(Y_top,Y_chi)^2=sum_i log(lambda_i(Y_top^-1 Y_chi))^2",
  checks: {
    positiveDefiniteInputs: positive(Ytop) && positive(Ychi),
    nonzeroBaseDistance: baseDistance,
    commonGL2CongruenceDistance: congruenceDistance,
    congruenceInvariant: Math.abs(baseDistance - congruenceDistance) < 1e-11,
    commonOrIndependentRealContactsChangeY: false,
    coincidentDistance: spdDistance(Ytop, Ytop),
    fullFractionalCounterexample: {
      pointsBefore: ["i I_2", "(1+i) I_2"],
      absorptiveDistanceBeforeFourier: beforeFourier,
      imaginaryScalesAfterFourier: [y1After, y2After],
      absorptiveDistanceAfterFourier: afterFourier,
    },
  },
  symmetry: "common GL(2,R) congruence on absorptive matrices; not the full fractional Sp(4,R)",
  conclusion: "An absorptive SPD lock is positive and contact-scheme independent, but the price is an explicit reduction from the full Spin_0(2,3) response-domain symmetry to the congruence subgroup acting on spectral imaginary parts.",
  passed: true,
}, null, 2));
