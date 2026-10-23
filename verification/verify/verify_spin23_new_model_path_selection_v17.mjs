#!/usr/bin/env node

import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const evidence = JSON.parse(await readFile(new URL(
  "evidence/data/spin23-new-model-path-selection-v17.json", root,
), "utf8"));
const terminal = new Set(evidence.terminalStates);
assert.equal(evidence.globalExhaustion, true);
assert.equal(evidence.selectedNode, null);
assert.ok(evidence.nodes.every((node) => terminal.has(node.state)));
assert.deepEqual(evidence.nodes.filter((node) => node.state === "completed").map((node) => node.id), ["MA"]);
assert.deepEqual(evidence.nodes.filter((node) => node.state === "rejected_as_selector").map((node) => node.id), ["GV", "DR", "FM"]);
assert.deepEqual(evidence.nodes.filter((node) => node.state === "externally_blocked").map((node) => node.id), ["NP", "HD", "SV"]);
for (const relative of [
  "corpus/claims/1700-1799/1781_m_algebra_gauge_supergravity_has_an_independent_connection_but_its_dynamical_vacuum_does_not_supply_the_target_pole.md",
  "evidence/data/spin23-m_algebra_torsion_parent_audit-v1.json",
  "verification/verify/verify_spin23_m_algebra_torsion_parent_audit.mjs",
]) await access(new URL(relative, root));

console.log("Spin(2,3) new-model path selection v17: PASS");
console.log("  completed: M-algebra independent-connection parent audit");
console.log("  rejected selectors: generic vacuum, de Sitter reduction and fermion-map shortcuts");
console.log("  external boundary: a new four-gate parent, higher-spin dictionary, or stabilized compactification");
