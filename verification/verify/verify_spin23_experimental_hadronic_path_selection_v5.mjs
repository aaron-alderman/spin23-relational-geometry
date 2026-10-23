#!/usr/bin/env node

import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const evidence = JSON.parse(await readFile(new URL(
  "evidence/data/spin23-experimental-hadronic-path-selection-v5.json", root,
), "utf8"));
const terminal = new Set(evidence.terminalStates);
assert.equal(evidence.globalExhaustion, true);
assert.equal(evidence.selectedNode, null);
assert.ok(evidence.nodes.every((node) => terminal.has(node.state) && !node.localExecutable));
assert.deepEqual(
  evidence.nodes.filter((node) => node.state === "completed").map((node) => node.id),
  ["EP", "JX", "2I"],
);
for (const id of ["2C", "H3", "UV"]) {
  const node = evidence.nodes.find((candidate) => candidate.id === id);
  assert.equal(node.state, "externally_blocked");
  assert.ok(node.blocker.length > 70);
}
for (const relative of [
  "corpus/claims/1700-1799/1729_the_xu_proton_point_is_analytically_recoverable_but_weaker_than_the_neutron_point.md",
  "corpus/claims/1700-1799/1730_the_xu_neutron_and_proton_curves_are_one_nuclear_projection_not_two_measurements.md",
  "corpus/claims/1700-1799/1731_ne21_and_xe129_can_span_nucleon_space_but_form_a_fragile_flavor_tomograph.md",
  "verification/verify/verify_spin23_xu_electron_proton_bound_map.mjs",
  "verification/verify/verify_spin23_xu_simultaneous_nucleon_coupling_map.mjs",
  "verification/verify/verify_spin23_two_isotope_nucleon_tomography.mjs"
]) await access(new URL(relative, root));

console.log("Spin(2,3) experimental-hadronic path selection v5: PASS");
console.log("  completed: proton point, joint nuclear response, two-isotope conditioning");
console.log("  correction: Xu proton and neutron curves share one likelihood");
console.log("  external boundary: joint response data, third quark projection, or UV matching");
