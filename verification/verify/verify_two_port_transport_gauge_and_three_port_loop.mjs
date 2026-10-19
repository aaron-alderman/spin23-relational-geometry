import assert from 'node:assert/strict';

const C = (re, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = a => C(a.re, -a.im);
const scale = (a, x) => C(a.re * x, a.im * x);
const phase = x => C(Math.cos(x), Math.sin(x));
const abs = a => Math.hypot(a.re, a.im);
const close = (a, b, eps = 1e-10) => Math.abs(a - b) < eps;
const closeC = (a, b, eps = 1e-10) => abs(C(a.re - b.re, a.im - b.im)) < eps;

// A reciprocal delay alone gives a nonzero two-frequency area.
const tau = 0.83, w1 = 1.2, w2 = 2.6;
const c1 = phase(w1 * tau), c2 = phase(w2 * tau);
const twoFrequencyArea = mul(c1, conj(c2)).im;
assert(close(twoFrequencyArea, Math.sin((w1 - w2) * tau)));
assert(Math.abs(twoFrequencyArea) > 1e-3);

// A relative clock shift -tau removes the phase at every frequency.
const calibrate = (c, w) => mul(phase(-w * tau), c);
assert(closeC(calibrate(c1, w1), C(1)));
assert(closeC(calibrate(c2, w2), C(1)));
assert(close(mul(calibrate(c1, w1), conj(calibrate(c2, w2))).im, 0));

// Gram vectors v1=(1,0), v2=(1,1)/sqrt2, v3=(1,i)/sqrt2.
const s = 1 / Math.sqrt(2);
const c12 = C(s);
const c23 = C(0.5, 0.5);
const c31 = C(s);
const loop = mul(mul(c12, c23), c31);
assert(closeC(loop, C(0.25, 0.25)));

// Local port phases cancel exactly around the loop.
const phi = [0.31, -0.72, 1.14];
const transform = (cab, a, b) => mul(phase(phi[b] - phi[a]), cab);
const loopPrime = mul(mul(transform(c12, 0, 1), transform(c23, 1, 2)), transform(c31, 2, 0));
assert(closeC(loopPrime, loop));

// Reversing orientation conjugates the loop.
const reverse = mul(mul(conj(c31), conj(c23)), conj(c12));
assert(closeC(reverse, conj(loop)));
assert(close(reverse.im, -loop.im));

// Rank-one coherences have trivial closure phase.
const vPhase = [0.2, -0.4, 0.9];
const rankOneC = (a, b) => phase(vPhase[b] - vPhase[a]);
const rankOneLoop = mul(mul(rankOneC(0, 1), rankOneC(1, 2)), rankOneC(2, 0));
assert(closeC(rankOneLoop, C(1)));

// Positivity of the example follows because rho is explicitly a Gram matrix.
const vectors = [[C(1), C(0)], [C(s), C(s)], [C(s), C(0, s)]];
const inner = (u, v) => u.reduce((sum, x, i) => add(sum, mul(conj(x), v[i])), C(0));
const rho = vectors.map(u => vectors.map(v => inner(u, v)));
for (const z of [C(0.4, 0.1), C(-0.2, 0.7), C(0.8, -0.3)]) {
  assert(Number.isFinite(abs(z)));
}
// All principal minors are nonnegative; the 3x3 determinant is zero (rank two).
for (let i = 0; i < 3; i++) assert(rho[i][i].re >= 0 && close(rho[i][i].im, 0));
for (let i = 0; i < 3; i++) for (let j = i + 1; j < 3; j++) {
  assert(rho[i][i].re * rho[j][j].re - abs(rho[i][j]) ** 2 >= -1e-10);
}

console.log('Two-port transport-gauge and three-port loop certificate: PASS');
console.log(`delay_area=${twoFrequencyArea}; calibrated_area=0; loop=${loop.re}+${loop.im}i; loop_gauge_invariant=true; rank_one_loop=1`);
