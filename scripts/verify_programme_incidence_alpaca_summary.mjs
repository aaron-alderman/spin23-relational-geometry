import assert from "node:assert/strict";
import fs from "node:fs";

const data = JSON.parse(fs.readFileSync("programme_incidence_alpaca_summary.json", "utf8"));
assert.equal(data.tool.name, "alpaca-ALPs");
assert.equal(data.tool.version, "1.2.0");
const full = data.full_rg_10TeV_to_100GeV;
const ratio = full.third_family_only.flavor_magnitudes.bs /
  full.generation_universal.flavor_magnitudes.bs;
assert(ratio > 20 && ratio < 30);
assert(Math.abs(full.generation_universal.flavor_magnitudes.bs - 0.008201543368490502) < 1e-15);

const scan = data.self_consistent_Lambda_equals_4pi_f_at_100MeV;
for (const key of ["generation_universal", "third_family_only"]) {
  const rows = scan[key];
  for (let i = 1; i < rows.length; i++) {
    assert(rows[i].fa_GeV > rows[i - 1].fa_GeV);
    assert(rows[i].BR_Kplus_to_piplus_a < rows[i - 1].BR_Kplus_to_piplus_a);
    assert(rows[i].ctau_m > rows[i - 1].ctau_m);
  }
}
assert(scan.generation_universal[1].BR_Kplus_to_piplus_a < 2e-11);
assert(scan.third_family_only[2].BR_Kplus_to_piplus_a > 2e-11);

console.log("PASS incidence ALPaca summary");
console.log(`third_only_to_universal_bs_ratio=${ratio}`);
console.log("full_RGE_confirms_embedding_choice_is_phenomenologically_decisive=true");
console.log("self_consistent_100MeV_search_scales=O(1e8 GeV) universal; O(1e9 GeV) third-family-only");
console.log("status=experimental_likelihood_required_before_exclusion_claim");
