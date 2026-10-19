import assert from "node:assert/strict";

// Minimal one-family (or third-family-only) embedding of the all-left-handed
// incidence charges into Bauer et al.'s derivative basis.
const cQ = 5, cu = -5, cd = -1, cL = 1, ce = -1;
const ctt0 = cu - cQ;
const cbb0 = cd - cQ;
const ctau0 = ce - cL;
assert.deepEqual([ctt0, cbb0, ctau0], [-10, -6, -2]);

// Effective anomalous gauge couplings with explicit c_GG=c_WW=c_BB=0.
const g0 = 0.5 * (cu + cd - 2 * cQ);
const w0 = -0.5 * (3 * cQ + cL);
const b0 = 3 * ((4 / 9) * cu + (1 / 9) * cd - 2 * (1 / 36) * cQ)
  + ce - 2 * (1 / 4) * cL;
assert.deepEqual([g0, w0, b0], [-8, -8, -28 / 3]);

// Top-only leading-log diagnostic for Lambda=10 TeV -> mu=100 GeV with
// fixed y_t=1. This uses eqs. (26)-(28) of arXiv:2012.12272.
const Lambda = 10_000, mu = 100, yt = 1;
const U = Math.log(Lambda / mu) * yt ** 2 / (32 * Math.PI ** 2);
const E = Math.exp(-18 * U);
const ctt = E * ctt0;
const g = g0 - (2 / 9) * (1 - E) * ctt0;
const w = w0 - (1 / 6) * (1 - E) * ctt0;
const b = b0 - (17 / 54) * (1 - E) * ctt0;

// The four-component benchmark does not remain a ray.
const initial = [g0, w0, b0, ctt0];
const evolved = [g, w, b, ctt];
const ratios = evolved.map((x, i) => x / initial[i]);
assert(Math.max(...ratios) - Math.min(...ratios) > 0.1);

// Three exact invariants of the top-only, no-gauge-feedback subsystem.
const invariants = ([cg, cw, cb, ct]) => [
  cg - (2 / 9) * ct,
  cw - (1 / 6) * ct,
  cb - (17 / 54) * ct,
];
const I0 = invariants(initial), I1 = invariants(evolved);
for (let i = 0; i < 3; i++) assert(Math.abs(I0[i] - I1[i]) < 1e-12);

console.log("PASS incidence ALP top-Yukawa flow");
console.log("embedding=minimal_one_family_or_third_family_only");
console.log("UV_physical_fermion_couplings=(ctt,cbb,ctautau)=(-10,-6,-2)");
console.log("UV_effective_gauge_couplings=(cGGtilde,cWWtilde,cBBtilde)=(-8,-8,-28/3)");
console.log(`fixed_yt_diagnostic_E=${E}`);
console.log(`evolved=(cGGtilde:${g},cWWtilde:${w},cBBtilde:${b},ctt:${ctt})`);
console.log(`component_scale_factors=${ratios.join(",")}`);
console.log(`top_only_affine_invariants=${I1.join(",")}`);
console.log("incidence_benchmark_is_RG_eigenray=false");
