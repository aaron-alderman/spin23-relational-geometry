#!/usr/bin/env node

import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const evidence = JSON.parse(await readFile(new URL(
  "evidence/data/spin23-new-model-path-selection-v16.json", root,
), "utf8"));
const terminal = new Set(evidence.terminalStates);
assert.equal(evidence.globalExhaustion, true);
assert.equal(evidence.selectedNode, null);
assert.ok(evidence.nodes.every((node) => terminal.has(node.state)));
assert.deepEqual(evidence.nodes.filter((node) => node.state === "completed").map((node) => node.id), ["SP"]);
assert.deepEqual(evidence.nodes.filter((node) => node.state === "rejected_as_selector").map((node) => node.id), ["DM", "KN", "NS", "IR"]);
assert.deepEqual(evidence.nodes.filter((node) => node.state === "externally_blocked").map((node) => node.id), ["NP", "HD", "SV"]);
for (const relative of [
  "corpus/claims/1700-1799/1779_known_supersymmetric_poincare_gauge_models_do_not_combine_all_four_required_torsion_gates.md",
  "evidence/data/spin23-supersymmetric_pgt_compatibility_audit-v1.json",
  "verification/verify/verify_spin23_supersymmetric_pgt_compatibility_audit.mjs",
]) await access(new URL(relative, root));

console.log("Spin(2,3) new-model path selection v16: PASS");
console.log("  completed: named supersymmetric PGT compatibility audit");
console.log("  rejected selectors: ordinary-class, Kuhfuss-Nitsch, Nishino and symmetry-first shortcuts");
console.log("  external boundary: a new torsionful SUSY parent, higher-spin dictionary, or stabilized compactification");
