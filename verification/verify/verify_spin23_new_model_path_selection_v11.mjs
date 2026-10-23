#!/usr/bin/env node

import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const evidence = JSON.parse(await readFile(new URL(
  "evidence/data/spin23-new-model-path-selection-v11.json", root,
), "utf8"));
const terminal = new Set(evidence.terminalStates);
assert.equal(evidence.globalExhaustion, true);
assert.equal(evidence.selectedNode, null);
assert.ok(evidence.nodes.every((node) => terminal.has(node.state)));
assert.deepEqual(evidence.nodes.filter((node) => node.state === "completed").map((node) => node.id), ["PC"]);
assert.deepEqual(evidence.nodes.filter((node) => node.state === "rejected_as_selector").map((node) => node.id), ["CM", "S1"]);
assert.deepEqual(evidence.nodes.filter((node) => node.state === "externally_blocked").map((node) => node.id), ["ES", "HS", "SV"]);
for (const relative of [
  "corpus/claims/1700-1799/1769_ordinary_continuous_symmetry_cannot_be_the_missing_spin_two_torsion_mixer.md",
  "evidence/data/spin23-cross-sector-symmetry-classification-v1.json",
  "verification/verify/verify_spin23_cross_sector_symmetry_classification.mjs",
]) await access(new URL(relative, root));

console.log("Spin(2,3) new-model path selection v11: PASS");
console.log("  rejected selectors: ordinary bosonic S-matrix symmetry and minimal N=1");
console.log("  caveat retained: gravity can evade S-matrix assumptions only with explicit new structure");
console.log("  external boundary: extended SUSY, nonstandard symmetry framework, or stabilized compactification");
