#!/usr/bin/env node

import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const evidence = JSON.parse(await readFile(new URL(
  "evidence/data/spin23-new-model-path-selection-v18.json", root,
), "utf8"));
const terminal = new Set(evidence.terminalStates);
assert.equal(evidence.globalExhaustion, true);
assert.equal(evidence.selectedNode, null);
assert.ok(evidence.nodes.every((node) => terminal.has(node.state)));
assert.deepEqual(evidence.nodes.filter((node) => node.state === "completed").map((node) => node.id), ["LV"]);
assert.deepEqual(evidence.nodes.filter((node) => node.state === "rejected_as_selector").map((node) => node.id), ["KF", "SS", "NR"]);
assert.deepEqual(evidence.nodes.filter((node) => node.state === "externally_blocked").map((node) => node.id), ["NP", "HD", "SV"]);
for (const relative of [
  "corpus/claims/1700-1799/1783_the_minimal_lorentz_vector_supermultiplet_has_an_unavoidable_three_plus_three_kinetic_signature.md",
  "evidence/data/spin23-lorentz_vector_supermultiplet_kinetic_audit-v1.json",
  "verification/verify/verify_spin23_lorentz_vector_supermultiplet_kinetic_audit.mjs",
]) await access(new URL(relative, root));

console.log("Spin(2,3) new-model path selection v18: PASS");
console.log("  completed: minimal Lorentz vector-supermultiplet kinetic audit");
console.log("  rejected selectors: invariant-form, SUSY-projection and minimal nonlinear-realization shortcuts");
console.log("  external boundary: a non-Yang-Mills four-gate parent, higher-spin dictionary, or stabilized compactification");
