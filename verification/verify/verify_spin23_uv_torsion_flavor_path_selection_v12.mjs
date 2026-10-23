#!/usr/bin/env node

import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const evidence = JSON.parse(await readFile(new URL(
  "evidence/data/spin23-uv-torsion-flavor-path-selection-v12.json", root,
), "utf8"));
const terminal = new Set(evidence.terminalStates);

assert.equal(evidence.globalExhaustion, true);
assert.equal(evidence.selectedNode, null);
assert.ok(evidence.nodes.every((node) => terminal.has(node.state) && !node.localExecutable));
assert.deepEqual(evidence.nodes.filter((node) => node.state === "rejected").map((node) => node.id), ["NY", "AC", "GA"]);
assert.deepEqual(evidence.nodes.filter((node) => node.state === "completed").map((node) => node.id), ["BR"]);
assert.deepEqual(evidence.nodes.filter((node) => node.state === "externally_blocked").map((node) => node.id), ["UA", "EA"]);
for (const relative of [
  "corpus/claims/1700-1799/1747_nieh_yan_anomaly_data_do_not_quantize_the_axial_torsion_wilson_coefficient.md",
  "verification/verify/verify_spin23_nieh_yan_axial_selector_no_go.mjs",
]) await access(new URL(relative, root));

console.log("Spin(2,3) UV torsion-flavor path selection v12: PASS");
console.log("  rejected: Nieh-Yan index, anomaly-coefficient, and gauge-cancellation selectors");
console.log("  external boundary: new UV action or non-shiftable Ward theorem");
