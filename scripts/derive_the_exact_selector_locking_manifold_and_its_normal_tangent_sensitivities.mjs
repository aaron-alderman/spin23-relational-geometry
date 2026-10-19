import assert from 'node:assert/strict';

const rt2 = Math.sqrt(2), rt3 = Math.sqrt(3);
const s0 = Math.asinh(1);
const c = (re, im = 0) => [re, im];
const add = ([a, b], [d, e]) => [a + d, b + e];
const mul = ([a, b], [d, e]) => [a * d - b * e, a * e + b * d];
const div = ([a, b], [d, e]) => { const n = d * d + e * e; return [(a * d + b * e) / n, (b * d - a * e) / n]; };
const realM = A => A.map(row => row.map(x => c(x)));
const mm = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((z, x, k) => add(z, mul(x, B[k][j])), c(0))));
const maxDefect = (A, B) => Math.max(...A.flatMap((row, i) => row.map((x, j) => Math.hypot(x[0] - B[i][j][0], x[1] - B[i][j][1]))));
const I2 = realM([[1, 0], [0, 1]]);
const D = realM([[1, 0], [0, -1]]);
const U = realM([[1 / 2, -rt3 / 2], [rt3 / 2, 1 / 2]]);
const Ut = realM([[1 / 2, rt3 / 2], [-rt3 / 2, 1 / 2]]);
const f = gamma => { const b = div(c(1, -gamma), c(1, gamma)); return mul(b, b); };
const response = (sign, gn, gt) => {
  const eigen = sign > 0
    ? [[f(gn), c(0)], [c(0), f(gt)]]
    : [[div(c(1), f(gn)), c(0)], [c(0), div(c(1), f(gt))]];
  return mm(mm(U, eigen), Ut);
};
const cycle = (y, s) => {
  const gn = Math.exp(y + s), gt = Math.exp(y - s);
  return mm(mm(mm(D, response(-1, gn, gt)), D), response(1, gn, gt));
};
const orderDefect = (y, s) => { const C = cycle(y, s); return maxDefect(mm(mm(C, C), C), I2); };
const traceDefect = (y, s) => {
  const C = cycle(y, s);
  return Math.hypot(C[0][0][0] + C[1][1][0] + 1, C[0][0][1] + C[1][1][1]);
};
const relativePhase = (y, s) => -4 * (Math.atan(Math.exp(y + s)) - Math.atan(Math.exp(y - s)));
const lockResidual = (y, s) => Math.sinh(s) - Math.cosh(y);

assert.ok(Math.abs(Math.exp(s0) - (1 + rt2)) < 1e-12);
assert.ok(Math.abs(relativePhase(0, s0) + Math.PI) < 1e-12);
assert.ok(orderDefect(0, s0) < 1e-12);

const lockedSamples = [-0.6, -0.3, 0, 0.3, 0.6].map(y => {
  const s = Math.asinh(Math.cosh(y));
  return { y, s, lockResidual: lockResidual(y, s), phaseError: relativePhase(y, s) + Math.PI, orderThreeDefect: orderDefect(y, s) };
});
assert.ok(lockedSamples.every(x => Math.abs(x.lockResidual) < 1e-12 && Math.abs(x.phaseError) < 1e-12 && x.orderThreeDefect < 1e-11));

const fixedSilverSamples = [0.2, 0.1, 0.05, 0.02].map(y => ({
  y,
  phaseError: relativePhase(y, s0) + Math.PI,
  traceDefect: traceDefect(y, s0),
  orderThreeDefect: orderDefect(y, s0),
  orderDefectScaledByYFourth: orderDefect(y, s0) / y ** 4,
}));
const fixedSeparationSamples = [0.1, 0.05, 0.02, 0.01].map(ds => ({
  ds,
  phaseError: relativePhase(0, s0 + ds) + Math.PI,
  orderThreeDefect: orderDefect(0, s0 + ds),
  orderDefectScaledByDsSquared: orderDefect(0, s0 + ds) / ds ** 2,
}));
assert.ok(fixedSilverSamples.at(-1).orderDefectScaledByYFourth > 1 && fixedSilverSamples.at(-1).orderDefectScaledByYFourth < 2);
assert.ok(fixedSeparationSamples.at(-1).orderDefectScaledByDsSquared > 8 && fixedSeparationSamples.at(-1).orderDefectScaledByDsSquared < 14);

const curvatureSamples = [0.2, 0.1, 0.05, 0.02].map(y => {
  const ds = Math.asinh(Math.cosh(y)) - s0;
  return { y, ds, dsScaledByYSquared: ds / y ** 2 };
});
assert.ok(Math.abs(curvatureSamples.at(-1).dsScaledByYSquared - 1 / (2 * rt2)) < 1e-3);

console.log(JSON.stringify({
  protocol: 'exact-selector-locking-manifold/1',
  coordinates: { y: 'log(sqrt(gamma_n gamma_t)/omega)', s: '(1/2) log(gamma_n/gamma_t)', silverPoint: { y: 0, s: s0 } },
  exactCondition: 'sinh(s) = cosh(y)',
  localGeometry: { gradientAtSilverPoint: [0, rt2], tangent: 'y direction', normal: 's direction', lockingExpansion: 'delta s = y^2/(2 sqrt(2)) + O(y^4)' },
  lockedSamples,
  fixedSilverSamples,
  fixedSeparationSamples,
  curvatureSamples,
  verdict: 'The silver checkpoint is the vertex of an exact curved selector-locking manifold. Center-frequency mismatch is tangent and first-order protected; pole-separation error is normal and first-order unprotected.',
  limitation: 'The manifold is a kinematic phase-lock condition. No microscopic feedback or Ward functional has yet been shown to constrain the poles to it.',
  passed: true,
}, null, 2));
