#!/usr/bin/env node

import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const evidence = JSON.parse(await readFile(new URL(
  "evidence/data/spin23-phenomenology-reopening-selection-v2.json", root,
), "utf8"));

const terminal = new Set(evidence.terminalStates);
assert.equal(evidence.globalExhaustion, true);
assert.equal(evidence.selectedNode, null);
assert.ok(evidence.nodes.every((node) => terminal.has(node.state)));
assert.ok(evidence.nodes.every((node) => node.localExecutable === false));
assert.deepEqual(
  evidence.nodes.filter((node) => node.state === "completed").map((node) => node.id),
  ["O", "S", "V"],
);
for (const id of ["D", "M", "U", "N"]) {
  const node = evidence.nodes.find((candidate) => candidate.id === id);
  assert.equal(node.state, "externally_blocked");
  assert.ok(node.blocker.length > 20);
}

for (const relative of [
  "corpus/claims/1700-1799/1719_a_dual_orientation_polarized_electron_experiment_separates_the_0minus_mass_from_its_unknown_matching.md",
  "corpus/claims/1700-1799/1720_uniform_polarized_spheres_preserve_the_coupling_free_0minus_mass_estimator_exactly.md",
  "corpus/claims/1700-1799/1721_a_voxel_spin_map_closes_the_arbitrary_geometry_forward_model_for_the_0minus_torque.md",
  "verification/analyze/analyze_spin23_polarized_geometry_response.mjs"
]) await access(new URL(relative, root));

console.log("Spin(2,3) phenomenology reopening selection v2: PASS");
console.log("  completed: observable, exact sphere response, arbitrary-geometry solver");
console.log("  external boundary: apparatus data/noise or UV matching");
console.log("  locally executable decision frontier: empty");
