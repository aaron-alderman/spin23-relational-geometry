import assert from "node:assert/strict";

// Generation-universal incidence charges give c_tt=-10 for every up-type
// generation at the UV scale. Top running then distinguishes generation 3.
const ctt0 = -10;
const Lambda = 10_000, mu = 100, yt = 1;
const U = Math.log(Lambda / mu) * yt ** 2 / (32 * Math.PI ** 2);
const E = Math.exp(-18 * U);
const It = -(2 / 3) * (1 - E) * ctt0;
const deltaQ = -It / 6;
assert(It > 0 && deltaQ < 0);

// Illustrative magnitudes of the third CKM row, normalized so its outer
// product is exactly a rank-one projector in this diagnostic.
const raw = [0.0088, 0.0405, 0.999]; // d,s,b
const norm = Math.sqrt(raw.reduce((s, x) => s + x * x, 0));
const v = raw.map((x) => x / norm);
const P = v.map((x) => v.map((y) => x * y));
const K = P.map((r) => r.map((x) => deltaQ * x));
const trace = K[0][0] + K[1][1] + K[2][2];
const frobenius2 = K.flat().reduce((s, x) => s + x * x, 0);
assert(Math.abs(trace - deltaQ) < 1e-12);
assert(Math.abs(frobenius2 - deltaQ ** 2) < 1e-12);
for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) for (let k = 0; k < 3; k++) {
  assert(Math.abs(K[i][j] * K[j][k] - deltaQ * v[j] ** 2 * K[i][k]) < 1e-12);
}

const magnitudes = {
  sd: Math.abs(K[1][0]),
  bd: Math.abs(K[2][0]),
  bs: Math.abs(K[2][1]),
};
assert(magnitudes.bs > magnitudes.bd && magnitudes.bd > magnitudes.sd);

// Three generation-universal copies triple anomaly traces from Result 22.
const anomalyOneFamily = [-8, -8, -28 / 3];
const anomalyThreeFamily = anomalyOneFamily.map((x) => 3 * x);
assert.deepEqual(anomalyThreeFamily, [-24, -24, -28]);

console.log("PASS universal-incidence ALP flavor projector");
console.log("embedding=three_generation_universal");
console.log(`top_running_It=${It}; third_family_doublet_split=${deltaQ}`);
console.log(`CKM_projector_offdiagonal_magnitudes=sd:${magnitudes.sd},bd:${magnitudes.bd},bs:${magnitudes.bs}`);
console.log("flavor_matrix_rank=1; structure=deltaQ*V_3i^*V_3j");
console.log("three_generation_UV_effective_gauge_couplings=(-24,-24,-28)");
console.log("rare_decay_hierarchy=bs > bd > sd in coupling magnitude (experimental sensitivity differs)");
