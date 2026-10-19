import fs from 'node:fs';
import assert from 'node:assert/strict';

const data = JSON.parse(fs.readFileSync('programme_na62_300mev_dimuon_recast_summary.json', 'utf8'));
const prompt = data.digitized_prompt_observed_90pct_CL;
const fraction = (data.mass_MeV - prompt.lower.mass_MeV) / (prompt.upper.mass_MeV - prompt.lower.mass_MeV);
const interpolated = 10 ** (
  Math.log10(prompt.lower.limit) + fraction * (Math.log10(prompt.upper.limit) - Math.log10(prompt.lower.limit))
);
assert.ok(Math.abs(interpolated / prompt.log_interpolated - 1) < 1e-12);

const tauAcceptanceNs = 0.07;
const referenceF = data.fixed_10TeV_model_recast.common_reference_f_GeV;
for (const [name, model] of Object.entries(data.fixed_10TeV_model_recast)) {
  if (name === 'common_reference_f_GeV') continue;
  const scale = (model.curve_crossing_f_GeV / referenceF) ** 2;
  const predicted = model.BR_K_times_BR_mumu_at_reference / scale;
  const lifetime = model.proper_lifetime_ns_at_reference * scale;
  const experimental = prompt.log_interpolated / (1 - Math.exp(-tauAcceptanceNs / lifetime));
  assert.ok(Math.abs(predicted / experimental - 1) < 1e-10, `${name} crossing mismatch`);
  assert.ok(model.BR_K_times_BR_mumu_at_reference > prompt.log_interpolated / (1 - Math.exp(-tauAcceptanceNs / model.proper_lifetime_ns_at_reference)), `${name} reference point should lie above curve`);
}

const models = data.fixed_10TeV_model_recast;
assert.ok(models.top_right_only.curve_crossing_f_GeV < models.incidence_universal.curve_crossing_f_GeV);
assert.ok(models.incidence_universal.curve_crossing_f_GeV < models.equal_axial_universal.curve_crossing_f_GeV);

console.log(JSON.stringify({
  status: 'pass',
  prompt_limit_300_MeV: prompt.log_interpolated,
  crossing_f_GeV: Object.fromEntries(Object.entries(models).filter(([, value]) => typeof value === 'object').map(([name, value]) => [name, value.curve_crossing_f_GeV])),
  interpretation: data.status,
}, null, 2));
