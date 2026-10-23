#!/usr/bin/env node

import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const evidence = JSON.parse(await readFile(new URL(
  "evidence/data/spin23-uv-torsion-flavor-path-selection-v10.json", root,
), "utf8"));
const terminal = new Set(evidence.terminalStates);
assert.equal(evidence.globalExhaustion, true);
assert.equal(evidence.selectedNode, null);
assert.ok(evidence.nodes.every((node) => terminal.has(node.state) && !node.localExecutable));
assert.deepEqual(evidence.nodes.filter((node) => node.state === "rejected").map((node) => node.id), ["CF", "TQ"]);
assert.deepEqual(evidence.nodes.filter((node) => node.state === "externally_blocked").map((node) => node.id), ["NE", "AN", "FP"]);
for (const relative of [
  "corpus/claims/1700-1799/1743_conformal_enlargement_and_topological_quantization_do_not_select_the_axial_torsion_coefficient.md",
  "verification/verify/verify_spin23_conformal_topological_axial_selection_no_go.mjs"
]) await access(new URL(relative, root));

console.log("Spin(2,3) UV torsion-flavor path selection v10: PASS");
console.log("  rejected: generic conformal and topological coefficient selection");
console.log("  external boundary: specific enlarged action, anomaly theorem, or interacting fixed point");
