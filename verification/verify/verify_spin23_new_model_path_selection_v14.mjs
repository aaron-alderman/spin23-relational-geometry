#!/usr/bin/env node

import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const evidence = JSON.parse(await readFile(new URL(
  "evidence/data/spin23-new-model-path-selection-v14.json", root,
), "utf8"));
const terminal = new Set(evidence.terminalStates);
assert.equal(evidence.globalExhaustion, true);
assert.equal(evidence.selectedNode, null);
assert.ok(evidence.nodes.every((node) => terminal.has(node.state)));
assert.deepEqual(evidence.nodes.filter((node) => node.state === "completed").map((node) => node.id), ["N8"]);
assert.deepEqual(evidence.nodes.filter((node) => node.state === "rejected_as_selector").map((node) => node.id), ["OD", "PI"]);
assert.deepEqual(evidence.nodes.filter((node) => node.state === "externally_blocked").map((node) => node.id), ["UP", "HD", "SV"]);
for (const relative of [
  "corpus/claims/1700-1799/1775_maximal_n8_supersymmetry_still_admits_a_continuous_omega_deformation_at_fixed_quadratic_spectrum.md",
  "evidence/data/spin23-n8_omega_deformation_axial_selector_audit-v1.json",
  "verification/verify/verify_spin23_n8_omega_deformation_axial_selector_audit.mjs",
]) await access(new URL(relative, root));

console.log("Spin(2,3) new-model path selection v14: PASS");
console.log("  completed: maximal N=8 omega-deformation test");
console.log("  rejected selectors: maximal-SUSY uniqueness and automatic PGT identity");
console.log("  external boundary: a specific uplift/torsion map, higher-spin dictionary, or stabilized compactification");
