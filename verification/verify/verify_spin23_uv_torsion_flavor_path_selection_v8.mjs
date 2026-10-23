#!/usr/bin/env node

import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const evidence = JSON.parse(await readFile(new URL(
  "evidence/data/spin23-uv-torsion-flavor-path-selection-v8.json", root,
), "utf8"));
const terminal = new Set(evidence.terminalStates);
assert.equal(evidence.globalExhaustion, true);
assert.equal(evidence.selectedNode, null);
assert.ok(evidence.nodes.every((node) => terminal.has(node.state) && !node.localExecutable));
assert.deepEqual(evidence.nodes.filter((node) => node.state === "rejected").map((node) => node.id), ["SO", "DS", "RG"]);
assert.deepEqual(evidence.nodes.filter((node) => node.state === "externally_blocked").map((node) => node.id), ["UG", "FP"]);
for (const relative of [
  "corpus/claims/1700-1799/1739_no_unbroken_symmetry_can_fix_the_minimal_axial_coefficient_and_perturbative_rg_does_not_select_one_eighth.md",
  "verification/verify/verify_spin23_axial_coefficient_selection_no_go.mjs"
]) await access(new URL(relative, root));

console.log("Spin(2,3) UV torsion-flavor path selection v8: PASS");
console.log("  rejected: same-operator symmetry selection, named symmetries, perturbative RG selection");
console.log("  external boundary: new UV grading/nonrenormalization or interacting fixed point");
