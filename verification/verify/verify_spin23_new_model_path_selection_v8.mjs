#!/usr/bin/env node

import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const evidence = JSON.parse(await readFile(new URL(
  "evidence/data/spin23-new-model-path-selection-v8.json", root,
), "utf8"));
const terminal = new Set(evidence.terminalStates);
assert.equal(evidence.globalExhaustion, true);
assert.equal(evidence.selectedNode, null);
assert.ok(evidence.nodes.every((node) => terminal.has(node.state)));
assert.deepEqual(evidence.nodes.filter((node) => node.state === "completed").map((node) => node.id), ["EN", "BM"]);
assert.deepEqual(evidence.nodes.filter((node) => node.state === "rejected_as_selector").map((node) => node.id), ["CS", "AS"]);
assert.deepEqual(evidence.nodes.filter((node) => node.state === "externally_blocked").map((node) => node.id), ["NQ", "SV"]);
for (const relative of [
  "corpus/claims/1700-1799/1763_a_healthy_bimetric_parent_has_a_continuous_mass_mixing_inverse_problem_at_fixed_local_curvature_coefficient.md",
  "evidence/data/spin23-bimetric-matching-degeneracy-v1.json",
  "verification/verify/verify_spin23_bimetric_matching_degeneracy.mjs",
]) await access(new URL(relative, root));

console.log("Spin(2,3) new-model path selection v8: PASS");
console.log("  completed: entire and bimetric spin-two escape families");
console.log("  rejected selectors: unique inverse completion and axial prediction");
console.log("  external boundary: new parent principle or stabilized compactification");
