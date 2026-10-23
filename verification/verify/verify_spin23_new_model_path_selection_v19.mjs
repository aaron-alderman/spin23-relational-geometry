#!/usr/bin/env node

import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const evidence = JSON.parse(await readFile(new URL(
  "evidence/data/spin23-new-model-path-selection-v19.json", root,
), "utf8"));
const terminal = new Set(evidence.terminalStates);
assert.equal(evidence.globalExhaustion, true);
assert.equal(evidence.selectedNode, null);
assert.ok(evidence.nodes.every((node) => terminal.has(node.state)));
assert.deepEqual(evidence.nodes.filter((node) => node.state === "completed").map((node) => node.id), ["SD"]);
assert.deepEqual(evidence.nodes.filter((node) => node.state === "rejected_as_selector").map((node) => node.id), ["PP", "SS"]);
assert.deepEqual(evidence.nodes.filter((node) => node.state === "externally_blocked").map((node) => node.id), ["CG", "NR", "HD"]);
for (const relative of [
  "corpus/claims/1700-1799/1785_lorentzian_self_duality_complexifies_the_connection_rather_than_making_its_real_kinetic_form_positive.md",
  "evidence/data/spin23-self-dual_connection_reality_audit-v1.json",
  "verification/verify/verify_spin23_self_dual_connection_reality_audit.mjs",
]) await access(new URL(relative, root));

console.log("Spin(2,3) new-model path selection v19: PASS");
console.log("  completed: exact Lorentzian chiral decomposition and reality audit");
console.log("  rejected shortcuts: projection-as-positivity and supersymmetry-as-reality-condition");
console.log("  external boundary: constrained chiral gravity, nonlinear realization, or a normalized higher parent");
