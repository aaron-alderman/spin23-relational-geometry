import fs from 'node:fs';
import assert from 'node:assert/strict';

const limit = JSON.parse(fs.readFileSync('programme_na62_100mev_limit_summary.json', 'utf8'));
const scan = JSON.parse(fs.readFileSync('programme_incidence_alpaca_summary.json', 'utf8'));
const close = (actual, expected, tolerance = 1e-9) => {
  assert.ok(Math.abs(actual - expected) <= tolerance * Math.max(1, Math.abs(expected)), `${actual} != ${expected}`);
};
const lerpLog = (target, x1, y1, x2, y2) => {
  const exponent = Math.log10(x1) +
    (Math.log10(target) - Math.log10(y1)) *
    (Math.log10(x2) - Math.log10(x1)) /
    (Math.log10(y2) - Math.log10(y1));
  return 10 ** exponent;
};

const observed = limit.observed_90pct_CL;
const fraction = (100 - observed.lower.mass_MeV) / (observed.upper.mass_MeV - observed.lower.mass_MeV);
close(
  observed.lower.branching_ratio + fraction * (observed.upper.branching_ratio - observed.lower.branching_ratio),
  observed.interpolated_100_MeV,
);

const self = scan.self_consistent_Lambda_equals_4pi_f_at_100MeV;
for (const [name, output] of Object.entries(limit.self_consistent_Lambda_equals_4pi_f_crossings)) {
  const points = self[name === 'universal' ? 'generation_universal' : name];
  const p1 = points.find(point => point.fa_GeV === 1e7);
  const p2 = points.find(point => point.fa_GeV === 1e8) ?? points.find(point => point.fa_GeV === 1e9);
  const crossing = lerpLog(observed.interpolated_100_MeV, p1.fa_GeV, p1.BR_Kplus_to_piplus_a, p2.fa_GeV, p2.BR_Kplus_to_piplus_a);
  close(crossing, output.f_GeV, 1e-7);
  assert.ok(output.proper_lifetime_s > 1e-8, `${name} is not safely in the invisible regime`);
}

console.log(JSON.stringify({
  status: 'pass',
  observed_limit_100_MeV: observed.interpolated_100_MeV,
  crossings_GeV: Object.fromEntries(Object.entries(limit.self_consistent_Lambda_equals_4pi_f_crossings).map(([key, value]) => [key, value.f_GeV])),
  interpretation: limit.status,
}, null, 2));
