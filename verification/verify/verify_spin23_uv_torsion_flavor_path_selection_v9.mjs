#!/usr/bin/env node

import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const evidence = JSON.parse(await readFile(new URL(
  "evidence/data/spin23-uv-torsion-flavor-path-selection-v9.json", root,
), "utf8"));
const terminal = new Set(evidence.terminalStates);
assert.equal(evidence.globalExhaustion, true);
assert.equal(evidence.selectedNode, null);
assert.ok(evidence.nodes.every((node) => terminal.has(node.state) && !node.localExecutable));
assert.deepEqual(evidence.nodes.filter((node) => node.state === "rejected").map((node) => node.id), ["CL"]);
assert.deepEqual(evidence.nodes.filter((node) => node.state === "externally_blocked").map((node) => node.id), ["NC", "SP", "NT", "FP"]);
for (const relative of [
  "corpus/claims/1700-1799/1741_every_commuting_linear_uv_grading_leaves_the_parent_axial_torsion_operator_invariant.md",
  "verification/verify/verify_spin23_commuting_uv_grading_no_go.mjs"
]) await access(new URL(relative, root));

console.log("Spin(2,3) UV torsion-flavor path selection v9: PASS");
console.log("  rejected: every commuting linear internal grading on current fields");
console.log("  external boundary: enlarged algebra/fields, nonlinear topology, or fixed-point dynamics");
