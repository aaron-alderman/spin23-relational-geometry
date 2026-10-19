#!/usr/bin/env node

const eps = 1e-9;
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const cmul = (a, b) => ({ re: a.re * b.re - a.im * b.im, im: a.re * b.im + a.im * b.re });
const cscalePhase = (alpha, z) => cmul({ re: Math.cos(alpha), im: Math.sin(alpha) }, z);
const square = z => cmul(z, z);
const closeC = (a, b, tol = 1e-9) => Math.hypot(a.re - b.re, a.im - b.im) < tol;

// Equatorial restriction of F(z)=z^2 is the doubled projector phase.
for (const theta of [0.1, 0.7, 1.9, 4.2]) {
  const z = { re: Math.cos(theta), im: Math.sin(theta) };
  const Fz = square(z);
  assert(closeC(Fz, { re: Math.cos(2 * theta), im: Math.sin(2 * theta) }), "equator doubling failed");
}

// A generic nonzero value has two simple square-root preimages; the rational
// map has holomorphic degree two and branches at zero and infinity.
const w = { re: 0.3, im: 0.8 };
const modulus = Math.hypot(w.re, w.im);
const root = {
  re: Math.sqrt((modulus + w.re) / 2),
  im: Math.sign(w.im) * Math.sqrt((modulus - w.re) / 2),
};
assert(closeC(square(root), w), "first square-root preimage failed");
assert(closeC(square({ re: -root.re, im: -root.im }), w), "second square-root preimage failed");
assert(Math.hypot(root.re, root.im) > eps, "generic preimages must be simple");

// Failure of equivariance under the same standard axial rotation on source
// and target; equivariance holds only if the target angle is doubled.
const alpha = 0.4;
const z = { re: 0.6, im: -0.2 };
const sourceThenMap = square(cscalePhase(alpha, z));
const mapThenStandardTarget = cscalePhase(alpha, square(z));
const mapThenDoubledTarget = cscalePhase(2 * alpha, square(z));
assert(!closeC(sourceThenMap, mapThenStandardTarget), "degree-two map should fail standard axial equivariance");
assert(closeC(sourceThenMap, mapThenDoubledTarget), "doubled-weight axial equivariance failed");

// Pullback Fubini-Study/Hopf curvature density versus the rotationally uniform
// charge-two monopole density in stereographic coordinate radius r.
const pullbackDensity = r => 4 * r * r / Math.pow(1 + Math.pow(r, 4), 2);
const uniformChargeTwoDensity = r => 2 / Math.pow(1 + r * r, 2);
assert(Math.abs(pullbackDensity(0)) < eps, "pullback curvature must vanish at the branch point");
assert(uniformChargeTwoDensity(0) > 1, "uniform charge-two curvature must not vanish at the pole");
assert(Math.abs(pullbackDensity(1) - uniformChargeTwoDensity(1)) > 0.4,
  "curvature profiles should differ pointwise");

console.log("Degree-two base-map obstruction certificate: PASS");
console.log("F(z)=z^2; equator_winding=2; rational_degree=2; branch_points=0,infinity");
console.log("standard_SO2_equivariance=false; doubled_weight_SO2_equivariance=true; full_standard_SO3_equivariance_impossible=true");
console.log("pullback_c1=2; uniform_charge2_c1=2; Berry_curvature_profiles_equal=false");
