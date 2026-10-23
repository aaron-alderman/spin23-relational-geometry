#!/usr/bin/env node

import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const evidence = JSON.parse(await readFile(new URL(
  "evidence/data/spin23-new-model-path-selection-v3.json", root,
), "utf8"));
const terminal = new Set(evidence.terminalStates);
assert.equal(evidence.globalExhaustion, true);
assert.equal(evidence.selectedNode, null);
assert.ok(evidence.nodes.every((node) => terminal.has(node.state)));
assert.deepEqual(evidence.nodes.filter((node) => node.state === "rejected_as_selector").map((node) => node.id), ["AU", "SG", "ST"]);
assert.deepEqual(evidence.nodes.filter((node) => node.state === "externally_blocked").map((node) => node.id), ["CC", "FP"]);
for (const relative of [
  "corpus/claims/1700-1799/1753_heterotic_torsion_normalization_becomes_moduli_dependent_before_reaching_the_pgt_axial_mode.md",
  "verification/verify/verify_spin23_heterotic_torsion_normalization_audit.mjs",
]) await access(new URL(relative, root));

console.log("Spin(2,3) new-model path selection v3: PASS");
console.log("  rejected generic selectors: axial gauging, local supersymmetry, heterotic normalization");
console.log("  external boundary: specified stabilized compactification or complete fixed-point computation");
