#!/usr/bin/env node

import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const evidence = JSON.parse(await readFile(new URL(
  "evidence/data/spin23-new-model-path-selection-v4.json", root,
), "utf8"));
const terminal = new Set(evidence.terminalStates);
assert.equal(evidence.globalExhaustion, true);
assert.equal(evidence.selectedNode, null);
assert.ok(evidence.nodes.every((node) => terminal.has(node.state)));
assert.deepEqual(evidence.nodes.filter((node) => node.state === "completed").map((node) => node.id), ["TG"]);
assert.deepEqual(evidence.nodes.filter((node) => node.state === "rejected_as_selector").map((node) => node.id), ["KN", "PM"]);
assert.deepEqual(evidence.nodes.filter((node) => node.state === "externally_blocked").map((node) => node.id), ["SV", "FP"]);
for (const relative of [
  "corpus/claims/1700-1799/1755_a_concrete_three_generation_heterotic_e6_quotient_still_leaves_the_axial_normalization_continuous.md",
  "evidence/data/spin23-three-generation-heterotic-normalization-v1.json",
  "verification/verify/verify_spin23_three_generation_heterotic_normalization.mjs",
]) await access(new URL(relative, root));

console.log("Spin(2,3) new-model path selection v4: PASS");
console.log("  completed: explicit three-generation E6 topology");
console.log("  rejected selectors: Kahler normalization and universal-axion pole identity");
console.log("  external boundary: stabilized torsional vacuum or complete fixed-point packet");
