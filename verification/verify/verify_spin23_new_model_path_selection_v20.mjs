#!/usr/bin/env node

import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const evidence = JSON.parse(await readFile(new URL(
  "evidence/data/spin23-new-model-path-selection-v20.json", root,
), "utf8"));
const terminal = new Set(evidence.terminalStates);
assert.equal(evidence.globalExhaustion, true);
assert.equal(evidence.selectedNode, null);
assert.ok(evidence.nodes.every((node) => terminal.has(node.state)));
assert.deepEqual(evidence.nodes.filter((node) => node.state === "completed").map((node) => node.id), ["NR"]);
assert.deepEqual(evidence.nodes.filter((node) => node.state === "rejected_as_selector").map((node) => node.id), ["PS", "CO"]);
assert.deepEqual(evidence.nodes.filter((node) => node.state === "externally_blocked").map((node) => node.id), ["CG", "TS", "UV"]);
for (const relative of [
  "corpus/claims/1700-1799/1787_nonlinear_lorentz_realization_restores_a_positive_metric_but_produces_a_massive_vector_triplet.md",
  "evidence/data/spin23-lorentz_nonlinear_realization_audit-v1.json",
  "verification/verify/verify_spin23_lorentz_nonlinear_realization_audit.mjs",
]) await access(new URL(relative, root));

console.log("Spin(2,3) new-model path selection v20: PASS");
console.log("  completed: nonlinear Lorentz-to-rotation positivity construction");
console.log("  rejected shortcuts: target pseudoscalar and coefficient selection");
console.log("  global boundary: every continuation requires a new complete microscopic action and matching packet");
