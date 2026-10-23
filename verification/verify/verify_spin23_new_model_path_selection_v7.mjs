#!/usr/bin/env node

import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const evidence = JSON.parse(await readFile(new URL(
  "evidence/data/spin23-new-model-path-selection-v7.json", root,
), "utf8"));
const terminal = new Set(evidence.terminalStates);
assert.equal(evidence.globalExhaustion, true);
assert.equal(evidence.selectedNode, null);
assert.ok(evidence.nodes.every((node) => terminal.has(node.state)));
assert.deepEqual(evidence.nodes.filter((node) => node.state === "completed").map((node) => node.id), ["QP", "EN"]);
assert.deepEqual(evidence.nodes.filter((node) => node.state === "rejected_as_selector").map((node) => node.id), ["FS", "AS"]);
assert.deepEqual(evidence.nodes.filter((node) => node.state === "externally_blocked").map((node) => node.id), ["NQ", "SV"]);
for (const relative of [
  "corpus/claims/1700-1799/1761_matching_the_weyl_square_leak_to_an_entire_kernel_fixes_one_scale_not_the_completion_or_axial_coupling.md",
  "evidence/data/spin23-entire-completion-matching-degeneracy-v1.json",
  "verification/verify/verify_spin23_entire_completion_matching_degeneracy.mjs",
]) await access(new URL(relative, root));

console.log("Spin(2,3) new-model path selection v7: PASS");
console.log("  completed: packet-to-entire-kernel p4 matching with healthy free pole count");
console.log("  rejected selectors: form-factor uniqueness and axial-coupling selection");
console.log("  external boundary: complete nonlocal quantum principle or stabilized compactification");
