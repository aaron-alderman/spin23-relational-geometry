#!/usr/bin/env node

import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const evidence = JSON.parse(await readFile(new URL(
  "evidence/data/spin23-hadronic-path-selection-v4.json", root,
), "utf8"));
const terminal = new Set(evidence.terminalStates);
assert.equal(evidence.globalExhaustion, true);
assert.equal(evidence.selectedNode, null);
assert.ok(evidence.nodes.every((node) => terminal.has(node.state) && !node.localExecutable));
assert.deepEqual(
  evidence.nodes.filter((node) => node.state === "completed").map((node) => node.id),
  ["HU", "HG"],
);
assert.equal(evidence.nodes.find((node) => node.id === "HD").state, "rejected");
for (const id of ["EP", "H3", "RG", "UV"]) {
  const node = evidence.nodes.find((candidate) => candidate.id === id);
  assert.equal(node.state, "externally_blocked");
  assert.ok(node.blocker.length > 50);
}
for (const relative of [
  "corpus/claims/1700-1799/1726_universal_light_quark_matching_suppresses_the_nucleon_torsion_portal.md",
  "corpus/claims/1700-1799/1727_proton_and_neutron_dipole_channels_leave_one_light_quark_axial_direction_invisible.md",
  "evidence/data/spin23-universal-light-quark-nucleon-matching-v1.json",
  "evidence/data/spin23-nucleon-axial-flavor-map-v1.json",
  "verification/verify/verify_spin23_universal_light_quark_nucleon_matching.mjs",
  "verification/verify/verify_spin23_nucleon_axial_flavor_map.mjs"
]) await access(new URL(relative, root));

console.log("Spin(2,3) hadronic path selection v4: PASS");
console.log("  completed: universal benchmark and general u,d,s -> p,n map");
console.log("  rejected: unique three-flavor reconstruction from only p,n channels");
console.log("  external boundary: response data, third flavor projection, or UV matching");
