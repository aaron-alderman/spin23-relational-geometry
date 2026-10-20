import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const data = JSON.parse(
  readFileSync(
    path.join(root, "evidence/data/spin23-complete-current-input-exhaustion-v2.json"),
    "utf8",
  ),
);

assert.equal(data.documentId, 1462);
assert.equal(data.gates.length, 7);
assert.deepEqual(
  data.gates.map((gate) => gate.id),
  ["A2", "A4", "A5", "A6", "A7", "A9", "A11"],
);

const count = (classification) =>
  data.gates.filter((gate) => gate.class === classification).length;
assert.equal(count("internally-exhausted"), data.counts.internallyExhaustedGates);
assert.equal(count("conditionally-constructed"), data.counts.conditionallyConstructedGates);
assert.equal(count("externally-open"), data.counts.externallyOpenGates);
assert.equal(data.counts.globallyFailedGates, 0);

const byId = Object.fromEntries(data.gates.map((gate) => [gate.id, gate]));
assert.equal(byId.A4.class, "conditionally-constructed");
assert.equal(byId.A6.class, "conditionally-constructed");
assert.match(byId.A5.terminalDatum, /Hom space/i);
assert.match(byId.A9.terminalDatum, /generator/i);
assert.match(byId.A11.terminalDatum, /measured data/i);

for (const gate of data.gates) {
  assert.ok(gate.result.length > 30, `${gate.id} result is not typed`);
  assert.ok(gate.terminalDatum.length > 20, `${gate.id} terminal datum is not typed`);
}

const requiredDocuments = [
  "1458_o0_is_the_unique_zero_index_cp1_spectator_but_no_single_ordinary_dirac_or_real_structure_generates_the_flux_split.md",
  "1459_the_a7_a9_a11_lane_is_underidentified_and_reopens_only_with_a_generator_state_port_packet.md",
  "1460_an_undoubled_weyl_reflection_fold_has_no_local_covariant_self_adjoint_domain_but_the_full_wall_conditionally_constructs_a4.md",
  "1461_the_wall_sign_and_native_peirce_real_structure_select_two_phase_rays_but_transport_to_the_sterile_line_is_the_terminal_a2_a5_gate.md",
].map((name) => path.join(root, "corpus/claims/1400-1499", name));
for (const document of requiredDocuments) assert.equal(existsSync(document), true);

assert.equal(data.otherLanes.length, 4);
assert.equal(data.verdict.allCurrentInputPathsTerminal, true);
assert.equal(data.verdict.physicalAdmission, false);
assert.equal(data.verdict.spin23DerivedAsSpacetimeSymmetry, false);
assert.equal(data.verdict.threeGenerationsPhysicallyDerived, false);
assert.equal(data.verdict.deviceSignalPredicted, false);

console.log(
  "PASS 1462: all seven gates and four adjacent lanes have terminal current-input classifications; A4/A6 are conditional, physical admission remains false.",
);
