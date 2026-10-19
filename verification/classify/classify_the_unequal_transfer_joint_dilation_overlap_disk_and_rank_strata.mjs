import assert from 'node:assert/strict';

const tol = 1e-10;
const close = (a, b, t = tol) => Math.abs(a - b) < t;
const C = (re, im = 0) => ({ re, im });
const conj = (z) => C(z.re, -z.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const sub = (a, b) => C(a.re - b.re, a.im - b.im);
const abs2 = (z) => z.re ** 2 + z.im ** 2;
const determinant = (f0, f1, s) =>
  1 - abs2(f0) - abs2(f1) - abs2(s) + 2 * (mul(mul(conj(f0), f1), s)).re;
const disk = (f0, f1) => ({
  center: mul(conj(f1), f0),
  radius: Math.sqrt((1 - abs2(f0)) * (1 - abs2(f1))),
});

for (const [f0, f1] of [
  [C(0.8), C(0.4)],
  [C(0.7, 0.2), C(0.3, -0.5)],
  [C(0.9), C(-0.9)],
]) {
  const { center, radius } = disk(f0, f1);
  for (let n = 0; n <= 16; n += 1) {
    const angle = 2 * Math.PI * n / 16;
    for (const fraction of [0, 0.5, 1, 1.2]) {
      const s = C(center.re + fraction * radius * Math.cos(angle), center.im + fraction * radius * Math.sin(angle));
      const det = determinant(f0, f1, s);
      const inside = abs2(sub(s, center)) <= radius ** 2 + tol;
      assert.equal(det >= -tol, inside);
      if (close(fraction, 1)) assert.ok(Math.abs(det) < 2e-10);
    }
  }
}

const realInterval = (f0, f1) => {
  const { center, radius } = disk(f0, f1);
  if (Math.abs(center.im) > radius + tol) return null;
  const half = Math.sqrt(Math.max(0, radius ** 2 - center.im ** 2));
  return [center.re - half, center.re + half];
};

const aligned = realInterval(C(0.9), C(0.9));
assert.ok(close(aligned[0], 0.62));
assert.ok(close(aligned[1], 1));
const opposite = realInterval(C(0.9), C(-0.9));
assert.ok(close(opposite[0], -1));
assert.ok(close(opposite[1], -0.62));
assert.ok(opposite[1] < 0);

const unequal = realInterval(C(0.99), C(0.1));
const geometricMean = Math.sqrt(0.99 * 0.1);
assert.ok(geometricMean > unequal[1]);

console.log(JSON.stringify({
  protocol: 'unequal-transfer-joint-dilation-overlap-disk/1',
  admissibleDisk: '|s-conjugate(f1)f0| <= sqrt((1-|f0|^2)(1-|f1|^2))',
  gramRank: { interior: 3, boundary: 2, degenerate: 'lower at coincident/unit rays' },
  realOverlapCondition: '|Im(conjugate(f1)f0)| <= disk radius, followed by intersection with [0,1]',
  alignedExample: aligned,
  oppositePhaseExample: opposite,
  geometricMeanUniversality: false,
  remainingGate: 'insert the two physical response eigenchannel transfers and impose the placement/deck/Real character conditions',
  passed: true,
}, null, 2));
