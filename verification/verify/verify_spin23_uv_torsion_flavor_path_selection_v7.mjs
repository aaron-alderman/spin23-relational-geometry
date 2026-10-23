#!/usr/bin/env node

import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const evidence = JSON.parse(await readFile(new URL(
  "evidence/data/spin23-uv-torsion-flavor-path-selection-v7.json", root,
), "utf8"));
const terminal = new Set(evidence.terminalStates);
assert.equal(evidence.globalExhaustion, true);
assert.equal(evidence.selectedNode, null);
assert.ok(evidence.nodes.every((node) => terminal.has(node.state) && !node.localExecutable));
assert.deepEqual(evidence.nodes.filter((node) => node.state === "completed").map((node) => node.id), ["PL"]);
assert.deepEqual(evidence.nodes.filter((node) => node.state === "rejected").map((node) => node.id), ["PG", "PP"]);
assert.deepEqual(evidence.nodes.filter((node) => node.state === "externally_blocked").map((node) => node.id), ["NS", "TM"]);
for (const relative of [
  "corpus/claims/1700-1799/1733_minimal_spin_connection_coupling_is_tree_level_flavor_universal_but_the_allowed_wilson_space_is_not.md",
  "corpus/claims/1700-1799/1736_the_spin23_compensator_lifts_the_nonminimal_axial_torsion_operator_and_closes_the_parent_symmetry_escape.md",
  "verification/verify/verify_spin23_parent_axial_operator_lift.mjs"
]) await access(new URL(relative, root));

console.log("Spin(2,3) UV torsion-flavor path selection v7: PASS");
console.log("  completed: explicit compensator lift of the nonminimal axial operator");
console.log("  rejected: parent-gauge and parity protection");
console.log("  external boundary: a new protecting law plus a complete threshold action");
