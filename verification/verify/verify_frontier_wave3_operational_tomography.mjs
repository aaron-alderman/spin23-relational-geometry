import assert from 'node:assert/strict';
import fs from 'node:fs';

function rank(A, eps = 1e-12) {
  A = A.map(r => [...r]);
  let row = 0;
  for (let col = 0; col < A[0].length && row < A.length; col++) {
    let p = row;
    while (p < A.length && Math.abs(A[p][col]) < eps) p++;
    if (p === A.length) continue;
    [A[row], A[p]] = [A[p], A[row]];
    const q = A[row][col];
    A[row] = A[row].map(x => x / q);
    for (let i = 0; i < A.length; i++) if (i !== row) {
      const f = A[i][col];
      A[i] = A[i].map((x, j) => x - f * A[row][j]);
    }
    row++;
  }
  return row;
}

// Coordinates are (G_LL,G_RR,Re G_LR,Im G_LR).
const complexTomography = [
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [1, 1, 2, 0],
  [1, 1, 0, 2],
];
const realTomography = complexTomography.slice(0, 3).map(r => r.slice(0, 3));
assert.equal(rank(complexTomography), 4);
assert.equal(rank(realTomography), 3);

const response = { ll: 4, rr: 9, re: -3, im: 2 };
const intensities = [
  response.ll,
  response.rr,
  response.ll + response.rr + 2 * response.re,
  response.ll + response.rr + 2 * response.im,
];
const reconstructed = {
  ll: intensities[0],
  rr: intensities[1],
  re: (intensities[2] - intensities[0] - intensities[1]) / 2,
  im: (intensities[3] - intensities[0] - intensities[1]) / 2,
};
assert.deepEqual(reconstructed, response);

// Pure-face rates cannot see a real relative sign; coherent intensity can.
const rate = (a, b) => ({ left: a * a, right: b * b, plus: (a + b) ** 2 });
const signPlus = rate(2, 3), signMinus = rate(2, -3);
assert.equal(signPlus.left, signMinus.left);
assert.equal(signPlus.right, signMinus.right);
assert.notEqual(signPlus.plus, signMinus.plus);

const data = JSON.parse(fs.readFileSync(new URL('../../corpus/programmes/frontier/wave-3/frontier_wave3_incidence_alpaca_pair_summary.json', import.meta.url)));
const d100 = data.models.deduplicated.mass_points['0.1'];
const m100 = data.models.multiplicity_preserving.mass_points['0.1'];
const d300 = data.models.deduplicated.mass_points['0.3'];
const m300 = data.models.multiplicity_preserving.mass_points['0.3'];
assert(Math.abs(d100.K_BR / m100.K_BR - 1) < 1e-4);
assert(Math.abs(d300.K_BR / m300.K_BR - 1) < 1e-4);
const lifetimeRatios = [d100.ctau_m / m100.ctau_m, d300.ctau_m / m300.ctau_m];
assert(lifetimeRatios.every(x => x > 2.7 && x < 2.9));

// Reproduce lifetime-dependent NA62 300 MeV crossings.
const C_M_PER_S = 299792458;
const F0 = 1e6;
const { prompt_limit: limit, acceptance_tau0_ns: tau0 } = data.na62_300MeV_curve;
function crossing(point, visibleBR) {
  const product0 = point.K_BR * visibleBR;
  const properTau0ns = point.ctau_m / C_M_PER_S * 1e9;
  let lo = 1, hi = 1000; // x=(f/F0)^2
  for (let i = 0; i < 200; i++) {
    const x = (lo + hi) / 2;
    const prediction = product0 / x;
    const tau = properTau0ns * x;
    const curve = limit / (1 - Math.exp(-tau0 / tau));
    if (prediction > curve) lo = x; else hi = x;
  }
  return F0 * Math.sqrt((lo + hi) / 2);
}
const fd = crossing(d300, d300.BR_mumu);
const fm = crossing(m300, m300.BR_mumu);
assert(Math.abs(fd / data.na62_300MeV_curve.deduplicated_crossing_f_GeV - 1) < 1e-12);
assert(Math.abs(fm / data.na62_300MeV_curve.multiplicity_crossing_f_GeV - 1) < 1e-12);
assert(fm / fd > 1.28 && fm / fd < 1.29);

// Bare reduced charged-lepton/top ratios distinguish magnitudes by four.
assert.equal((4 / 10) ** 2 / (2 / 10) ** 2, 4);

console.log(JSON.stringify({
  ideal_tomography: {
    complex_measurement_rank: rank(complexTomography),
    real_measurement_rank: rank(realTomography),
    settings: ['L', 'R', 'L+R', 'L+iR'],
    common_phase_recoverable: false,
    relative_complex_phase_recoverable: true,
  },
  incidence_fork: {
    bare_reduced_rate_ratio_separation: 4,
    alpaca_lifetime_ratios: { at_100MeV: lifetimeRatios[0], at_300MeV: lifetimeRatios[1] },
    kaon_production_relative_difference_below_1e_minus_4: true,
  },
  na62_300MeV_curve_crossings_GeV: { deduplicated: fd, multiplicity_preserving: fm, ratio: fm / fd },
  minimum_low_mass_measured_set: ['BR(K->pi a)', 'proper lifetime', 'BR(a->leptons)'],
  sign_requires_interference: true,
  present_status: 'separate conditional exclusion curves; no signal-level ray identification',
}, null, 2));

