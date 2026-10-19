import assert from 'node:assert/strict';

const mm = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const scale = (a, A) => A.map((row) => row.map((x) => a * x));
const eq = (A, B) => A.every((row, i) => row.every((x, j) => x === B[i][j]));
const I = [[1, 0], [0, 1]];
const D = [[1, 0], [0, -1]];
const K = [[-1, 0], [0, 1]];
const J = [[0, 1], [1, 0]];

// Silver checkpoint and the h-chi grading.
assert.ok(eq(K, scale(-1, D)));
const Xi = scale(-1, mm(D, K));
assert.ok(eq(Xi, I));

// Covariance under simultaneous exchange of channel labels and their grading.
const conjugate = (A) => mm(mm(J, A), J);
const exchangedD = conjugate(D);
const exchangedK = conjugate(K);
assert.ok(eq(exchangedD, scale(-1, D)));
assert.ok(eq(exchangedK, scale(-1, K)));
assert.ok(eq(scale(-1, mm(exchangedD, exchangedK)), Xi));
assert.ok(eq(scale(-1, mm(D, exchangedK)), scale(-1, Xi)));

// Uniqueness among diagonal sign folds G K = I.
const signFolds = [];
for (const gn of [-1, 1]) for (const gt of [-1, 1]) {
  const G = [[gn, 0], [0, gt]];
  if (eq(mm(G, K), I)) signFolds.push({ gn, gt });
}
assert.deepEqual(signFolds, [{ gn: -1, gt: 1 }]);
assert.ok(eq([[-1, 0], [0, 1]], scale(-1, D)));

// Each channel shear has the same double projective fixed point.
const N = [[1, -1], [1, -1]];
assert.ok(eq(mm(N, N), [[0, 0], [0, 0]]));
const mobius = (x, s) => ((1 + s) * x - s) / (s * x + 1 - s);
for (const s of [-2, -0.25, 0.5, 3]) assert.ok(Math.abs(mobius(1, s) - 1) < 1e-12);

// Passive loss is not folded into one analytic half-plane.
const lowerHalfPlaneSample = { qn: [-1, -0.2], qt: [1, -0.3] };
const foldedSample = {
  xn: [-lowerHalfPlaneSample.qn[0], -lowerHalfPlaneSample.qn[1]],
  xt: [lowerHalfPlaneSample.qt[0], lowerHalfPlaneSample.qt[1]],
};
assert.ok(foldedSample.xn[1] > 0 && foldedSample.xt[1] < 0);

console.log(JSON.stringify({
  protocol: 'graded-reactance-to-joint-tkk-fixed-point/1',
  checkpoint: { D, K, identity: 'K=-D', foldedCoordinate: 'Xi=-DK=I' },
  scalarChannels: { normal: 'x_n=-q_n=1', tangent: 'x_t=q_t=1' },
  covariance: 'Xi is invariant when Higgs/channel exchange acts on both D and K; exchanging K while freezing D sends Xi to -Xi.',
  uniqueness: { class: 'diagonal involutive sign folds G with GK=I', solutions: signFolds, result: 'G=-D' },
  tkk: { nilpotent: 'N^2=0', flow: 'x -> ((1+s)x-s)/(sx+1-s)', jointFixedPoint: 'Xi=I' },
  lossBoundary: { lowerHalfPlaneReactances: lowerHalfPlaneSample, gradedFold: foldedSample, result: 'opposite half-planes' },
  interpretation: 'The hchi grading canonically folds the two signed lossless silver reactances onto the common unit fixed point of the two channel TKK shears, within the stated channel-local sign-fold class.',
  boundary: 'This is a typed coordinate bridge, not a derivation of why dynamics reaches K=-D. Strict passive loss reopens the two orientations rather than preserving one common analytic chart.',
  passed: true,
}, null, 2));
