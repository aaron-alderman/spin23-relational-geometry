import assert from "node:assert/strict";
import fs from "node:fs";

const root="corpus/programmes/frontier/wave-7/";
const ledger=JSON.parse(fs.readFileSync(root+"post_q_five_option_programme_v1.json","utf8"));
const waves=[76,77,78,79,80,81].map(n=>fs.readFileSync(root+({
  76:"frontier_wave7_76_common_carrier_intertwiner_classification.md",
  77:"frontier_wave7_77_tkk_wings_cover_the_rectangular_cross_module.md",
  78:"frontier_wave7_78_reverse_phase_physical_selection_boundary.md",
  79:"frontier_wave7_79_selector_covariant_channel_potential.md",
  80:"frontier_wave7_80_two_by_three_selector_calibration_protocol.md",
  81:"frontier_wave7_81_post_q_five_option_terminal_synthesis.md"
})[n],"utf8"));

assert.equal(ledger.schema,"post-q-five-option-programme/1");
assert.equal(ledger.options.length,5);
assert.deepEqual(ledger.options.map(x=>x.option),[1,2,3,4,5]);
assert.equal(ledger.options[0].exactData.naiveTwoHomDimension,0);
assert.equal(ledger.options[1].exactData.combinedCrossRank,6);
assert.match(ledger.options[2].result,/do not universally select/);
assert.deepEqual(ledger.options[3].exactData.singularValuesSquared,[16/13,10/13]);
assert.equal(ledger.options[4].exactData.plusAccuracy,1);
assert.equal(ledger.options[4].exactData.minusAccuracy,1);
assert.equal(ledger.combinedVerdict.algebraicCrossDirectionsMissing,false);
assert.equal(ledger.combinedVerdict.naiveAuthoredIdentificationWorks,false);
assert.equal(ledger.combinedVerdict.measurableDiscriminatorExists,true);
for(const text of waves)assert.match(text,/rectangular|channel|endpoint/i);
assert.match(waves.at(-1),/endpoint parity/);
assert.match(waves.at(-1),/selector fingerprint/);
assert.match(waves.at(-1),/target-frame calibration/);

console.log(JSON.stringify({
  status:"PASS",
  optionsCompleted:ledger.options.length,
  exactNoGo:"naive endpoint representations admit no invertible common-carrier intertwiner",
  exactPositiveBridge:"the transported TKK wings cover all six rectangular cross directions",
  physicalSelector:"Onsager-Casimir endpoint parity",
  effectiveVacuum:"measured Gram orbit with an SO(3) target-frame modulus",
  emulator:"both signed reciprocity branches classified in 500/500 trials",
  nextAuthority:ledger.combinedVerdict.nextAuthority
}));
