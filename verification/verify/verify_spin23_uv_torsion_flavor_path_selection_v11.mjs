#!/usr/bin/env node

import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const evidence = JSON.parse(await readFile(new URL(
  "evidence/data/spin23-uv-torsion-flavor-path-selection-v11.json", root,
), "utf8"));
const terminal = new Set(evidence.terminalStates);

assert.equal(evidence.globalExhaustion, true);
assert.equal(evidence.selectedNode, null);
assert.ok(evidence.nodes.every((node) => terminal.has(node.state) && !node.localExecutable));
assert.deepEqual(evidence.nodes.filter((node) => node.state === "completed").map((node) => node.id), ["KS"]);
assert.deepEqual(evidence.nodes.filter((node) => node.state === "rejected").map((node) => node.id), ["ID", "IM"]);
assert.deepEqual(evidence.nodes.filter((node) => node.state === "externally_blocked").map((node) => node.id), ["BF", "ST", "MT"]);
for (const relative of [
  "corpus/claims/1700-1799/1745_the_known_rg_slice_cannot_identify_an_interacting_one_eighth_axial_fixed_point.md",
  "verification/verify/verify_spin23_axial_fixed_point_identifiability.mjs",
]) await access(new URL(relative, root));

console.log("Spin(2,3) UV torsion-flavor path selection v11: PASS");
console.log("  rejected: fixed-point inference from known slice or Immirzi analogy");
console.log("  external boundary: complete beta, stability, unitarity, and matching packet");
