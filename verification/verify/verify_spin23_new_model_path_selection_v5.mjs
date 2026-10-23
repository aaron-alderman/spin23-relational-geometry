#!/usr/bin/env node

import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const evidence = JSON.parse(await readFile(new URL(
  "evidence/data/spin23-new-model-path-selection-v5.json", root,
), "utf8"));
const terminal = new Set(evidence.terminalStates);
assert.equal(evidence.globalExhaustion, true);
assert.equal(evidence.selectedNode, null);
assert.ok(evidence.nodes.every((node) => terminal.has(node.state)));
assert.deepEqual(evidence.nodes.filter((node) => node.state === "completed").map((node) => node.id), ["TG", "TM"]);
assert.deepEqual(evidence.nodes.filter((node) => node.state === "rejected_as_selector").map((node) => node.id), ["RS"]);
assert.deepEqual(evidence.nodes.filter((node) => node.state === "externally_blocked").map((node) => node.id), ["SV", "FP"]);
for (const relative of [
  "corpus/claims/1700-1799/1757_healthy_axion_torsion_mixing_preserves_only_a_total_residue_norm_not_the_pgt_pole_coupling.md",
  "evidence/data/spin23-axion-torsion-two-mode-mixing-v1.json",
  "verification/verify/verify_spin23_axion_torsion_two_mode_mixing.mjs",
]) await access(new URL(relative, root));

console.log("Spin(2,3) new-model path selection v5: PASS");
console.log("  completed: three-generation topology and general healthy two-mode reduction");
console.log("  rejected selector: positivity/residue sum rule fixes no individual pole coupling");
console.log("  external boundary: microscopic stabilized vacuum or complete fixed-point packet");
