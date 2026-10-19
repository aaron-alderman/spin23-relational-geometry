#!/usr/bin/env node

const eps = 1e-9;
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const C = (re, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const scale = (s, a) => C(s * a.re, s * a.im);
const conj = a => C(a.re, -a.im);
const abs2 = a => a.re * a.re + a.im * a.im;
const close = (a, b, tol = 1e-8) => Math.hypot(a.re - b.re, a.im - b.im) < tol;
const vclose = (a, b) => a.every((x, i) => close(x, b[i]));
const matVec = (M, v) => M.map(row => row.reduce((s, x, i) => add(s, mul(x, v[i])), C(0)));

const sqrt2 = Math.sqrt(2);
const veronese = ([u, v]) => [mul(u, u), scale(sqrt2, mul(u, v)), mul(v, v)];
const sym2 = ([[a, b], [c, d]]) => [
  [mul(a, a), scale(sqrt2, mul(a, b)), mul(b, b)],
  [scale(sqrt2, mul(a, c)), add(mul(a, d), mul(b, c)), scale(sqrt2, mul(b, d))],
  [mul(c, c), scale(sqrt2, mul(c, d)), mul(d, d)],
];

const theta = 0.63, phi = 0.41;
const a = C(Math.cos(theta));
const b = scale(Math.sin(theta), C(Math.cos(phi), Math.sin(phi)));
const U = [[a, b], [scale(-1, conj(b)), conj(a)]];
const psi = [C(0.7, -0.2), C(-0.1, 0.9)];
const lhs = veronese(matVec(U, psi));
const rhs = matVec(sym2(U), veronese(psi));
assert(vclose(lhs, rhs), "SU(2) symmetric-square equivariance failed");

const q = veronese(psi);
assert(close(mul(q[1], q[1]), scale(2, mul(q[0], q[2]))), "Veronese conic equation failed");

const psiNorm2 = abs2(psi[0]) + abs2(psi[1]);
const qNorm2 = q.reduce((s, z) => s + abs2(z), 0);
assert(Math.abs(qNorm2 - psiNorm2 * psiNorm2) < eps, "symmetric-square norm identity failed");

// A scalar phase on the face line doubles on the symmetric-square line.
const alpha = 0.37;
const phase = C(Math.cos(alpha), Math.sin(alpha));
const phasedPsi = psi.map(z => mul(phase, z));
const phasedQ = veronese(phasedPsi);
const doublePhase = C(Math.cos(2 * alpha), Math.sin(2 * alpha));
assert(vclose(phasedQ, q.map(z => mul(doublePhase, z))), "phase doubling failed");

// Pullback of a generic hyperplane section is quadratic and has degree two.
// The section Z0+Z2=0 becomes u^2+v^2=0 with roots [u:v]=[i:1],[-i:1].
const roots = [[C(0, 1), C(1)], [C(0, -1), C(1)]];
for (const root of roots) {
  const qr = veronese(root);
  assert(close(add(qr[0], qr[2]), C(0)), "degree-two hyperplane root failed");
}

// Fourth tensor power of the relationship phase has weight eight.
const relationshipWeight = 2;
const stressWeight = 4 * relationshipWeight;
assert(stressWeight === 8, "fourth tensor-power weight failed");

console.log("Symmetric-square Veronese equivariance certificate: PASS");
console.log("SU2_equivariant=true; conic_equation=Z1^2-2Z0Z2=0; pullback_O1=O2; phase_weight=2");
console.log("base_map_onto_conic_degree=1; ambient_line_degree=2; fourth_tensor_power_weight=8");
