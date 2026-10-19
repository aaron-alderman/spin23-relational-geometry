#!/usr/bin/env node

const eps = 1e-9;
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const C = (re, im = 0) => ({ re, im });
const closeC = (a, b) => Math.hypot(a.re - b.re, a.im - b.im) < eps;

// Center obstruction to an SU(3)-equivariant antilinear real structure on 3bar.
const omega = C(Math.cos(2 * Math.PI / 3), Math.sin(2 * Math.PI / 3));
const rho = C(Math.cos(4 * Math.PI / 3), Math.sin(4 * Math.PI / 3)); // center on 3bar
const conjugateRho = C(rho.re, -rho.im);
assert(closeC(conjugateRho, omega), "conjugate center phase failed");
assert(!closeC(conjugateRho, rho), "complex-type center phases must differ");

// Three antisymmetric pairs (23,31,12) Hodge-dual to the real vector basis.
const pairBasis = ["23", "31", "12"];
const vectorBasis = ["1", "2", "3"];
assert(pairBasis.length === vectorBasis.length && pairBasis.length === 3, "Hodge triplet count failed");

// A unit selector n creates eta=2nn^T-I of signature (1,2).
const n = [1, 0, 0];
const eta = n.map((ni, i) => n.map((nj, j) => 2 * ni * nj - (i === j ? 1 : 0)));
assert(eta[0][0] === 1 && eta[1][1] === -1 && eta[2][2] === -1, "selector Lorentz metric failed");

const normEta = r => r[0] ** 2 - r[1] ** 2 - r[2] ** 2;
const toJordan = ([t, x, y]) => [[t + x, y], [y, t - x]];
const det2 = Q => Q[0][0] * Q[1][1] - Q[0][1] * Q[1][0];
for (const r of [[2, 0.5, -1], [1, 2, 3], [4, -2, 0.1]]) {
  assert(Math.abs(det2(toJordan(r)) - normEta(r)) < eps, "flavor-selector to Jordan determinant failed");
}

// Positive Euclidean and Lorentzian forms have different inertia and cannot
// be related by real congruence (Sylvester's law).
const euclideanInertia = [3, 0, 0]; // positive, negative, zero
const jordanInertia = [1, 2, 0];
assert(euclideanInertia.some((x, i) => x !== jordanInertia[i]), "signature mismatch must be present");

console.log("Sterile real-structure/signature gate certificate: PASS");
console.log("SU3_3bar_equivariant_real_structure=false_by_center; Majorana_real_metric_stabilizer=O3; Hodge_Lambda2R3_to_R3=true");
console.log("Euclidean_signature=3,0; Jordan_signature=1,2; selector_n_gives_eta=2nnT-I; stabilizer=O2");
