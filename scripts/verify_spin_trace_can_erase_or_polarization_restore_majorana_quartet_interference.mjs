import assert from "node:assert/strict";

const C = (re, im = 0) => ({ re, im });
const add = (z, w) => C(z.re + w.re, z.im + w.im);
const mul = (z, w) => C(z.re * w.re - z.im * w.im, z.re * w.im + z.im * w.re);
const conj = z => C(z.re, -z.im);
const scale = (a, z) => C(a * z.re, a * z.im);
const M = (a, b, c, d) => [[a, b], [c, d]];
const dagger = A => M(conj(A[0][0]), conj(A[1][0]), conj(A[0][1]), conj(A[1][1]));
const mmul = (A, B) => M(
  add(mul(A[0][0], B[0][0]), mul(A[0][1], B[1][0])),
  add(mul(A[0][0], B[0][1]), mul(A[0][1], B[1][1])),
  add(mul(A[1][0], B[0][0]), mul(A[1][1], B[1][0])),
  add(mul(A[1][0], B[0][1]), mul(A[1][1], B[1][1]))
);
const trace = A => add(A[0][0], A[1][1]);
const trProduct = (...xs) => trace(xs.reduce((a, b) => mmul(a, b)));

const zero = C(0);
const one = C(1);
const I = M(one, zero, zero, one);
const sz = M(one, zero, zero, C(-1));
const p0 = M(one, zero, zero, zero);
const p1 = M(zero, zero, zero, one);
const density = r => M(C((1 + r) / 2), zero, zero, C((1 - r) / 2));
const coherence = (rho, A, B) => trProduct(rho, A, dagger(B));

const A = I;
const B = sz;
const unpolarized = density(0);
const plus = density(0.72);
const minus = density(-0.72);
const cUnpolarized = coherence(unpolarized, A, B);
const cPlus = coherence(plus, A, B);
const cMinus = coherence(minus, A, B);

const x = 0.4;
const center = 0.27;
const width = 0.16;
const quartet = 0.5663;
const inv = z => scale(1 / (z.re * z.re + z.im * z.im), conj(z));
const P = y => inv(C(y - center, width));
const Q = y => P(-y);
const pqKinematic = mul(P(x), conj(Q(x)));
const cpKernel = coherenceValue => -4 * quartet * mul(pqKinematic, coherenceValue).im;

const killedUnpolarized = cpKernel(cUnpolarized);
const recoveredPlus = cpKernel(cPlus);
const recoveredMinus = cpKernel(cMinus);
const orthogonalEverywhere = [density(0), plus, minus].map(rho => coherence(rho, p0, p1));

assert.ok(Math.abs(cUnpolarized.re) < 1e-14 && Math.abs(cUnpolarized.im) < 1e-14);
assert.ok(Math.abs(cPlus.re - 0.72) < 1e-14 && Math.abs(cPlus.im) < 1e-14);
assert.ok(Math.abs(cMinus.re + 0.72) < 1e-14 && Math.abs(cMinus.im) < 1e-14);
assert.ok(Math.abs(killedUnpolarized) < 1e-14);
assert.ok(Math.abs(recoveredPlus) > 1e-6);
assert.ok(Math.abs(recoveredPlus + recoveredMinus) < 1e-12);
assert.ok(orthogonalEverywhere.every(z => Math.abs(z.re) < 1e-14 && Math.abs(z.im) < 1e-14));

console.log(JSON.stringify({
  protocol: "spin-trace-selection-of-majorana-quartet/1",
  generalCrossFactor: "C_rho=Tr(rho A B^dagger)",
  cpDifference: "Delta=-4 Im(P Q* C_rho) Im(p q*)",
  spinExample: "A=I, B=sigma_z",
  unpolarizedCoherence: cUnpolarized,
  polarizedCoherencePlus: cPlus,
  polarizedCoherenceMinus: cMinus,
  differentialPoint: x,
  unpolarizedCpKernel: killedUnpolarized,
  polarizedCpKernelPlus: recoveredPlus,
  polarizedCpKernelMinus: recoveredMinus,
  structuralOrthogonalityExample: "A=|0><0|, B=|1><1| gives A B^dagger=0 and no density matrix can restore the cross term",
  orthogonalCoherences: orthogonalEverywhere,
  theorem: "Spin summation replaces the path coherence by Tr(rho A B^dagger). A zero unpolarized trace may be recoverable by polarization unless A B^dagger vanishes as an operator.",
  physicalBoundary: "A realistic CP comparison must transform the spin preparation and analyzers consistently and derive A,B from a gauge-complete amplitude.",
  passed: true
}, null, 2));
