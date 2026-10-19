import assert from 'node:assert/strict';

const tol = 1e-12;
const dot = (x, y) => x.reduce((s, a, i) => s + a * y[i], 0);
const mv = (A, x) => A.map((row) => dot(row, x));
const norm = (x) => Math.sqrt(dot(x, x));
const unit = (x) => x.map((a) => a / norm(x));
const det2 = (A) => A[0][0] * A[1][1] - A[0][1] * A[1][0];
const columns = (u, v) => [[u[0], v[0]], [u[1], v[1]]];
const J = [[0, -1], [1, 0]];
const angle = (x) => Math.atan2(x[1], x[0]);
const rayDelta = (a, b) => {
  let d = b - a;
  while (d <= -Math.PI / 2) d += Math.PI;
  while (d > Math.PI / 2) d -= Math.PI;
  return d;
};

// The loop-corrected inverse-mass metric from documents 1063--1065.
const m2 = 5;
const kappa = 0.3;
const denom = m2 * (m2 + 2 * kappa);
const a = 1 / m2 - kappa / denom;
const b = -kappa / denom;
const K = [[a, b], [b, a]];
assert(a > Math.abs(b));

// Cholesky K=L L^T, with W=L^T, so x^T K y=(Wx).(Wy).
const l11 = Math.sqrt(a);
const l21 = b / l11;
const l22 = Math.sqrt(a - l21 * l21);
const W = [[l11, l21], [0, l22]];
const wtW = [
  [W[0][0] ** 2 + W[1][0] ** 2, W[0][0] * W[0][1] + W[1][0] * W[1][1]],
  [W[0][1] * W[0][0] + W[1][1] * W[1][0], W[0][1] ** 2 + W[1][1] ** 2],
];
assert(Math.max(...K.flatMap((r, i) => r.map((x, j) => Math.abs(x - wtW[i][j])))) < tol);

// Rephase the mediator vectors to a real ray triple.
const raw = [[1, 1], [1, 0], [0, 1]]; // L,u,d
const rays = raw.map((x) => unit(mv(W, x)));
const overlaps = [
  dot(rays[0], rays[1]),
  dot(rays[1], rays[2]),
  dot(rays[2], rays[0]),
];
assert(overlaps[0] > 0 && overlaps[1] < 0 && overlaps[2] > 0);
assert(overlaps.reduce((x, y) => x * y, 1) < 0);

// Shortest projective transports sum to an odd multiple of pi.  The lift to
// the oriented unit-vector cover therefore closes at -r rather than r.
const theta = rays.map(angle);
const increments = [
  rayDelta(theta[0], theta[1]),
  rayDelta(theta[1], theta[2]),
  rayDelta(theta[2], theta[0]),
];
const liftedAngleChange = increments.reduce((x, y) => x + y, 0);
assert(Math.abs(Math.abs(liftedAngleChange) - Math.PI) < tol);
const deckHolonomy = -1;

// Canonically complete a lifted ray r to the oriented frame (r,Jr).  Under
// r -> -r the entire frame gets the central action -I.  In two dimensions
// det(-F)=det(F), so the response-root Pfaffian coefficient is unchanged.
const r0 = rays[0];
const F0 = columns(r0, mv(J, r0));
const r1 = r0.map((x) => -x);
const F1 = columns(r1, mv(J, r1));
assert(det2(F0) > 0);
assert(Math.abs(det2(F1) - det2(F0)) < tol);
assert(F1.flat().every((x, k) => Math.abs(x + F0.flat()[k]) < tol));

// A one-column flip would reverse determinant, but it is not supplied by the
// projective lift; it is an extra reflection/orientation datum.
const oneColumnFlip = columns(r1, mv(J, r0));
assert(Math.abs(det2(oneColumnFlip) + det2(F0)) < tol);

console.log(JSON.stringify({
  protocol: 'wilson-pi-flux-real-projective-holonomy-response-pfaffian-test/1',
  inverseMassMetric: K,
  whiteningMap: W,
  normalizedRealRays: { L: rays[0], u: rays[1], d: rays[2] },
  consecutiveOverlaps: overlaps,
  bargmannSign: -1,
  projectiveLoop: {
    rayAnglesModuloPi: theta,
    shortestIncrements: increments,
    liftedAngleChange,
    deckHolonomy,
    topology: 'odd loop in RP^1; the unit-vector lift returns at the antipode',
  },
  canonicalOrientedFrameCompletion: {
    initialFrame: F0,
    finalFrame: F1,
    frameAction: '-I_2',
    initialDeterminant: det2(F0),
    finalDeterminant: det2(F1),
    responsePfaffianSheetFlipped: false,
  },
  extraReflectionTest: {
    oneColumnFlipDeterminant: det2(oneColumnFlip),
    responsePfaffianSheetFlipped: true,
    sourceStatus: 'not supplied by the Wilson projective holonomy',
  },
  conclusion: 'The Wilson pi flux is exactly a nontrivial tautological-line deck holonomy and lifts canonically to central -I in SO(2), not to the det=-1 response-Pfaffian sheet exchange.',
  passed: true,
}, null, 2));
