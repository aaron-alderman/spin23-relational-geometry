#!/usr/bin/env node

import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const evidence = JSON.parse(await readFile(new URL(
  "evidence/data/spin23-new-model-path-selection-v12.json", root,
), "utf8"));
const terminal = new Set(evidence.terminalStates);
assert.equal(evidence.globalExhaustion, true);
assert.equal(evidence.selectedNode, null);
assert.ok(evidence.nodes.every((node) => terminal.has(node.state)));
assert.deepEqual(evidence.nodes.filter((node) => node.state === "completed").map((node) => node.id), ["HS"]);
assert.deepEqual(evidence.nodes.filter((node) => node.state === "rejected_as_selector").map((node) => node.id), ["PP", "TI"]);
assert.deepEqual(evidence.nodes.filter((node) => node.state === "externally_blocked").map((node) => node.id), ["HD", "ES", "SV"]);
for (const relative of [
  "corpus/claims/1700-1799/1771_ads4_higher_spin_symmetry_evades_the_flat_s_matrix_no_go_but_retains_a_continuous_parity_phase.md",
  "evidence/data/spin23-ads4-higher-spin-parity-selector-audit-v1.json",
  "verification/verify/verify_spin23_ads4_higher_spin_parity_selector_audit.mjs",
]) await access(new URL(relative, root));

console.log("Spin(2,3) new-model path selection v12: PASS");
console.log("  completed: explicit AdS4 infinite-higher-spin loophole");
console.log("  rejected selectors: unique parity phase and automatic PGT field identity");
console.log("  external boundary: higher-spin dictionary, extended SUSY, or stabilized compactification");
