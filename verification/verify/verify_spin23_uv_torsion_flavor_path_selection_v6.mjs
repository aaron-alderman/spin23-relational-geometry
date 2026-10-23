#!/usr/bin/env node

import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const evidence = JSON.parse(await readFile(new URL(
  "evidence/data/spin23-uv-torsion-flavor-path-selection-v6.json", root,
), "utf8"));
const terminal = new Set(evidence.terminalStates);

assert.equal(evidence.globalExhaustion, true);
assert.equal(evidence.selectedNode, null);
assert.ok(evidence.nodes.every((node) => terminal.has(node.state) && !node.localExecutable));
assert.deepEqual(
  evidence.nodes.filter((node) => node.state === "completed").map((node) => node.id),
  ["MC", "BR", "E6"],
);
assert.deepEqual(
  evidence.nodes.filter((node) => node.state === "rejected").map((node) => node.id),
  ["Z3", "MP"],
);
for (const id of ["MA", "TM"]) {
  const node = evidence.nodes.find((candidate) => candidate.id === id);
  assert.equal(node.state, "externally_blocked");
  assert.ok(node.blocker.length > 120);
}
for (const relative of [
  "evidence/data/spin23-minimal-fermion-universality-boundary-v1.json",
  "verification/verify/verify_spin23_minimal_fermion_universality_boundary.mjs",
  "corpus/claims/1700-1799/1733_minimal_spin_connection_coupling_is_tree_level_flavor_universal_but_the_allowed_wilson_space_is_not.md"
]) await access(new URL(relative, root));

console.log("Spin(2,3) UV torsion-flavor path selection v6: PASS");
console.log("  completed: minimal coefficient, basis invariance, E6 commutant boundary");
console.log("  rejected: residual-Z3 universality and radiative protection");
console.log("  external boundary: complete protected matter action plus threshold matching");
