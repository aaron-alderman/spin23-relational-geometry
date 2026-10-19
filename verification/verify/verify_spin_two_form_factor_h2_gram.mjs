#!/usr/bin/env node

const eps = 1e-9;
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const C = (re, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = a => C(a.re, -a.im);
const scale = (s, a) => C(s * a.re, s * a.im);
const abs2 = a => a.re * a.re + a.im * a.im;
const close = (a, b, tol = 1e-8) => Math.hypot(a.re - b.re, a.im - b.im) < tol;

const pow = (z, n) => {
  let out = C(1);
  for (let i = 0; i < n; i++) out = mul(out, z);
  return out;
};

// Normalized binary-quartic components of lambda^{\odot 4}.
const quartic = ([a, b]) => [
  pow(a, 4),
  scale(2, mul(pow(a, 3), b)),
  scale(Math.sqrt(6), mul(pow(a, 2), pow(b, 2))),
  scale(2, mul(a, pow(b, 3))),
  pow(b, 4),
];

const lambda = [C(0.8, 0.1), C(-0.3, 0.7)];
const Q = quartic(lambda);
const spinorNorm = abs2(lambda[0]) + abs2(lambda[1]);
const quarticNorm = Q.reduce((s, z) => s + abs2(z), 0);
assert(Math.abs(quarticNorm - Math.pow(spinorNorm, 4)) < eps, "quartic norm identity failed");

const theta = 0.29;
const phase = C(Math.cos(theta), Math.sin(theta));
const phasedQ = quartic(lambda.map(z => mul(phase, z)));
const weight4 = pow(phase, 4);
assert(phasedQ.every((z, i) => close(z, mul(weight4, Q[i]))), "spin-two face weight four failed");

const gram = (aPlus, aMinus) => ({
  a: abs2(aPlus),
  d: abs2(aMinus),
  z: mul(aPlus, conj(aMinus)),
});
const detGram = G => G.a * G.d - abs2(G.z);
const addGram = (G, H) => ({ a: G.a + H.a, d: G.d + H.d, z: add(G.z, H.z) });

const Aplus = C(1.2, -0.4), Aminus = C(-0.3, 0.9);
const G = gram(Aplus, Aminus);
assert(Math.abs(detGram(G)) < eps && G.a > 0 && G.d > 0, "one-state Gram must be PSD rank one");

const p4 = pow(phase, 4);
const m4 = conj(p4);
const Grot = gram(mul(p4, Aplus), mul(m4, Aminus));
const p8 = pow(phase, 8);
assert(Math.abs(Grot.a - G.a) < eps && Math.abs(Grot.d - G.d) < eps, "face intensities must be invariant");
assert(close(Grot.z, mul(p8, G.z)), "relationship coherence weight eight failed");

// Spectral sum over two independent intermediate states becomes positive full rank.
const H = gram(C(0.5, 1.1), C(1.3, 0.2));
const S = addGram(G, H);
assert(S.a > 0 && S.d > 0 && detGram(S) > eps, "spectral Gram sum must be positive definite");
const realProjectionDet = S.a * S.d - S.z.re * S.z.re;
assert(realProjectionDet >= detGram(S) - eps && realProjectionDet > eps,
  "real H2 projection must remain positive");

console.log("Spin-two form-factor H2 Gram certificate: PASS");
console.log("lambda^4_components=5; face_weight=4; opposite_helicity_coherence_weight=8");
console.log("one_state_Gram_rank1_PSD=true; spectral_sum_positive_definite=true; real_H2_projection_PSD=true");
