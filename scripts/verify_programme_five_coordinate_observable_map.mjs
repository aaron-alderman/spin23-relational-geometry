import assert from "node:assert/strict";

const rank = (input, eps = 1e-10) => {
  if (input.length === 0) return 0;
  const A = input.map((r) => r.slice());
  let k = 0;
  for (let j = 0; j < A[0].length && k < A.length; j++) {
    let p = k;
    for (let i = k + 1; i < A.length; i++) if (Math.abs(A[i][j]) > Math.abs(A[p][j])) p = i;
    if (Math.abs(A[p][j]) < eps) continue;
    [A[k], A[p]] = [A[p], A[k]];
    const q = A[k][j];
    for (let c = j; c < A[0].length; c++) A[k][c] /= q;
    for (let i = 0; i < A.length; i++) if (i !== k) {
      const f = A[i][j];
      for (let c = j; c < A[0].length; c++) A[i][c] -= f * A[k][c];
    }
    k++;
  }
  return k;
};
const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
const annihilates = (rows, vector) => rows.every((r) => Math.abs(dot(r, vector)) < 1e-10);
const identifiable = (rows, functional) => rank(rows) === rank([...rows, functional]);

// Physical current quotient z=(v_u,v_d,v_e,v_nu,A2).
const T = [1, 0, 0, 0, 0];      // top/up Yukawa channel
const B = [0, 1, 0, 0, 0];      // bottom Yukawa channel
const L = [0, 0, 1, 0, 0];      // charged-lepton channel
const N = [0, 0, 0, 1, 0];      // neutrino chirality/Yukawa channel
const W = [0, 0, 0, 0, 1];      // weak-anomaly channel
const P = [48, 12, 36, 0, -18]; // pre-EWSB hypercharge-anomaly matching row
const incidenceResidual = [-1, -1, 0, 0, 1]; // A2-vu-vd

const core = [T, L];
const lowMassWithPhoton = [T, L, P];
assert.equal(rank(core), 2);
assert.equal(rank(lowMassWithPhoton), 3);
assert(annihilates(lowMassWithPhoton, [0, 0, 0, 1, 0]));
assert(annihilates(lowMassWithPhoton, [0, 3, 0, 0, 2])); // bottom-anomaly degeneracy
assert(!identifiable(lowMassWithPhoton, incidenceResidual));

// Either a bottom row or a weak-anomaly row closes the four visible current
// coordinates if the source-derived photon matching row P is accepted.
for (const extra of [B, W]) {
  const rows = [...lowMassWithPhoton, extra];
  assert.equal(rank(rows), 4);
  assert(annihilates(rows, [0, 0, 0, 1, 0]));
  assert(identifiable(rows, incidenceResidual));
}

// The clean channel-resolved set tests the incidence relation and lepton fork,
// but v_nu remains invisible until a neutrino chirality observable is added.
const visible = [T, B, L, W];
assert.equal(rank(visible), 4);
assert(identifiable(visible, incidenceResidual));
assert(annihilates(visible, N));
assert.equal(rank([...visible, N]), 5);

const incidenceD = [10, 6, 2, 1, 16];
const incidenceM = [10, 6, 4, 1, 16];
assert.equal(dot(incidenceResidual, incidenceD), 0);
assert.equal(dot(incidenceResidual, incidenceM), 0);
assert.deepEqual(visible.map((r) => dot(r, incidenceD)), [10, 6, 2, 16]);
assert.deepEqual(visible.map((r) => dot(r, incidenceM)), [10, 6, 4, 16]);
assert.equal((dot(L, incidenceM) / dot(L, incidenceD)) ** 2, 4);
assert.equal(dot(P, incidenceD), 336);
assert.equal(dot(P, incidenceM), 408);

// Generic ALP: an independent low-energy photonic counterterm eta_gamma makes
// P unable to determine A2.  Coordinates are (z,eta_gamma).
const lift = (r) => [...r, 0];
const Pgeneric = [48, 12, 36, 0, -18, 1];
const genericLow = [lift(T), lift(L), Pgeneric];
const genericBottom = [...genericLow, lift(B)];
const genericWeak = [...genericLow, lift(W)];
const genericCompleteVisible = [lift(T), lift(B), lift(L), lift(W), Pgeneric];
const residualGeneric = [...incidenceResidual, 0];
assert.equal(rank(genericLow), 3);
assert.equal(rank(genericBottom), 4);
assert.equal(rank(genericWeak), 4);
assert(!identifiable(genericBottom, residualGeneric));
assert(!identifiable(genericWeak, residualGeneric));
assert.equal(rank(genericCompleteVisible), 5);
assert(identifiable(genericCompleteVisible, residualGeneric));
assert(annihilates(genericCompleteVisible, [0, 0, 0, 1, 0, 0]));

// Squared rates have the same local rank at a nonzero benchmark, but lose
// global signs.  A mixed/interference observable is needed for a signed test.
const rateJacobian = (rows, point) => rows.map((r) => {
  const amplitude = dot(r, point);
  return r.map((x) => 2 * amplitude * x);
});
assert.equal(rank(rateJacobian(visible, incidenceD)), 4);
const signFlipBottom = [10, -6, 2, 1, 16];
assert.deepEqual(
  visible.map((r) => dot(r, incidenceD) ** 2),
  visible.map((r) => dot(r, signFlipBottom) ** 2),
);
assert.equal(dot(incidenceResidual, signFlipBottom), 12);
const mixedBottomWeak = (z) => dot(B, z) * dot(W, z);
assert.notEqual(mixedBottomWeak(incidenceD), mixedBottomWeak(signFlipBottom));

// Representative light-Dirac-neutrino suppression at the programme scale.
const mNuGeV = 0.1e-9; // 0.1 eV
const mElectronGeV = 0.00051099895;
const faGeV = 1e6;
const neutrinoAmplitudeScale = mNuGeV / faGeV;
const nuToElectronWidthRatioDedup = (mNuGeV / mElectronGeV) ** 2 * (1 / 2) ** 2;
assert(Math.abs(neutrinoAmplitudeScale - 1e-16) < 1e-30);
assert(nuToElectronWidthRatioDedup < 1e-14);

console.log("PASS five-coordinate observable map");
console.log("coordinates=(vu,vd,ve,vnu,A2)");
console.log("production_plus_lepton_core_rank=2");
console.log("add_source_matched_hypercharge_anomaly_rank=3; nulls=vnu_and_bottom-anomaly_combination");
console.log("source_matched_case:add_either_bottom_or_weak_row=>visible_rank4_and_incidence_residual_identifiable");
console.log("generic_ALP_case:independent_electroweak_gauge_counterterms_require_both_bottom_and_weak_rows");
console.log("neutrino_chirality_row_required_for_full_rank5=true");
console.log("dedup_vs_multiplicity_charged_lepton_rate_ratio=4_at_unrun_amplitude_level");
console.log("rate_only_global_sign_degeneracy=true; signed_incidence_test_requires_interference_or_phase_information");
console.log(`light_Dirac_neutrino_amplitude_scale_at_f1e6=${neutrinoAmplitudeScale}`);
console.log(`dedup_neutrino_to_electron_width_ratio_upper_scale=${nuToElectronWidthRatioDedup}`);

