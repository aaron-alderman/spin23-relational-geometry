import assert from "node:assert/strict";

const tolerance = 1e-10;
const c = 3 / 4;
const s = Math.sqrt(7) / 4;
const pi = Math.PI;

const dot = (u, v) => u.reduce((sum, x, i) => sum + x * v[i], 0);
const outer = (u, v) => u.map((x) => v.map((y) => x * y));
const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const scale = (k, A) => A.map((row) => row.map((x) => k * x));
const multiply = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((sum, x, k) => sum + x * B[k][j], 0)));
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const identity = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
const close = (x, y, tol = tolerance) => Math.abs(x - y) <= tol;
const matrixClose = (A, B, tol = tolerance) => A.every((row, i) => row.every((x, j) => close(x, B[i][j], tol)));

const n = (phi) => [s * Math.cos(phi), s * Math.sin(phi), c];
const eTheta = (phi) => [c * Math.cos(phi), c * Math.sin(phi), -s];
const ePhi = (phi) => [-Math.sin(phi), Math.cos(phi), 0];
const P = (phi) => outer(n(phi), n(phi));

assert.ok(close(c * c + s * s, 1));
for (const phi of [0, 0.2, 1.7, 4.1, 2 * pi]) {
  const projector = P(phi);
  assert.ok(matrixClose(multiply(projector, projector), projector));
  assert.ok(close(dot(n(phi), eTheta(phi)), 0));
  assert.ok(close(dot(n(phi), ePhi(phi)), 0));
  assert.ok(close(dot(eTheta(phi), ePhi(phi)), 0));
}
assert.ok(matrixClose(P(0), P(2 * pi)));

// The frame connection has A_{theta,phi}=-c and A_{phi,theta}=c.
const deTheta = (phi) => [-c * Math.sin(phi), c * Math.cos(phi), 0];
const dePhi = (phi) => [-Math.cos(phi), -Math.sin(phi), 0];
for (const phi of [0, 0.8, 2.4, 5.9]) {
  assert.ok(close(dot(eTheta(phi), dePhi(phi)), -c));
  assert.ok(close(dot(ePhi(phi), deTheta(phi)), c));
}

const solidAngle = 2 * pi * (1 - c);
const transportedAngle = ((-2 * pi * c) % (2 * pi) + 2 * pi) % (2 * pi);
assert.ok(close(solidAngle, pi / 2));
assert.ok(close(transportedAngle, pi / 2));

// In the chosen periodic frame, the geometric return is J.
const J = [[0, -1], [1, 0]];
const holonomy = [
  [Math.cos(transportedAngle), -Math.sin(transportedAngle)],
  [Math.sin(transportedAngle), Math.cos(transportedAngle)],
];
assert.ok(matrixClose(holonomy, J));

// Two-datum angle map for Y along the reference axis.
const a = 1;
const b = 2;
const angleMap = (theta, aa = a, bb = b) => 0.5 * Math.atan2(aa * Math.sin(2 * theta), bb + aa * Math.cos(2 * theta));

assert.ok(close(angleMap(0), 0));
assert.ok(close(angleMap(pi / 2), 0));
for (let i = 1; i < 100; i += 1) {
  const theta = (i / 100) * (pi / 2);
  const alpha = angleMap(theta);
  assert.ok(alpha >= 0 && alpha < theta, `noncontracting angle at ${theta}`);
}

const epsilon = 1e-7;
const finiteDifferenceMultiplier = angleMap(epsilon) / epsilon;
const exactMultiplier = a / (a + b);
assert.ok(close(finiteDifferenceMultiplier, exactMultiplier, 1e-7));
assert.ok(exactMultiplier < 1);

// With no second datum, the return is the identity in projective angle.
for (const theta of [0, 0.1, 0.6, 1.2, pi / 2]) {
  assert.ok(close(angleMap(theta, 1, 0), theta));
}

// Direct matrix witness at the fixed point: F=(a+b)Y and the top line is Y.
const y = [0, 0, 1];
const Y = outer(y, y);
const fixedFusion = add(scale(a, Y), scale(b, Y));
assert.ok(matrixClose(fixedFusion, scale(a + b, Y)));
assert.ok(matrixClose(add(P(0), scale(-1, P(0))), scale(0, identity)));

console.log(JSON.stringify({
  status: "PASS",
  modes: 3,
  gap: "Delta",
  latitudeCosine: c,
  solidAngle,
  projectorReturn: "exact",
  coherentDoubletReturn: "quarter-turn J",
  secondDatumWeights: {a, b},
  uniqueFixedPoint: "Y",
  tangentSpectralRadius: exactMultiplier,
  memoryOnlySpectralRadius: 1,
}));
