#!/usr/bin/env node

import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const evidence = JSON.parse(await readFile(new URL(
  "evidence/data/spin23-new-model-path-selection-v9.json", root,
), "utf8"));
const terminal = new Set(evidence.terminalStates);
assert.equal(evidence.globalExhaustion, true);
assert.equal(evidence.selectedNode, null);
assert.ok(evidence.nodes.every((node) => terminal.has(node.state)));
assert.deepEqual(evidence.nodes.filter((node) => node.state === "completed").map((node) => node.id), ["KL", "BM"]);
assert.deepEqual(evidence.nodes.filter((node) => node.state === "rejected_under_standard_positivity").map((node) => node.id), ["EX"]);
assert.deepEqual(evidence.nodes.filter((node) => node.state === "rejected_as_selector").map((node) => node.id), ["AS"]);
assert.deepEqual(evidence.nodes.filter((node) => node.state === "externally_blocked").map((node) => node.id), ["BP", "NP", "SV"]);
for (const relative of [
  "corpus/claims/1700-1799/1765_the_simple_exponential_spin_two_escape_fails_standard_positive_spectral_reconstruction.md",
  "evidence/data/spin23-spin2-positive-spectral-reconstruction-v1.json",
  "verification/verify/verify_spin23_spin2_positive_spectral_reconstruction.mjs",
]) await access(new URL(relative, root));

console.log("Spin(2,3) new-model path selection v9: PASS");
console.log("  standard positivity rejects the simple exponential representative");
console.log("  positive bimetric spectral measure survives but selects no axial coupling");
console.log("  external boundary: nonlinear bimetric parent, alternative nonlocal reconstruction, or stabilized compactification");
