#!/usr/bin/env node

import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const evidence = JSON.parse(await readFile(new URL(
  "evidence/data/spin23-new-model-path-selection-v13.json", root,
), "utf8"));
const terminal = new Set(evidence.terminalStates);
assert.equal(evidence.globalExhaustion, true);
assert.equal(evidence.selectedNode, null);
assert.ok(evidence.nodes.every((node) => terminal.has(node.state)));
assert.deepEqual(evidence.nodes.filter((node) => node.state === "completed").map((node) => node.id), ["N2"]);
assert.deepEqual(evidence.nodes.filter((node) => node.state === "rejected_as_selector").map((node) => node.id), ["GS", "PI"]);
assert.deepEqual(evidence.nodes.filter((node) => node.state === "externally_blocked").map((node) => node.id), ["NV", "NX", "HD", "SV"]);
for (const relative of [
  "corpus/claims/1700-1799/1773_n2_supergravity_organizes_the_axion_sector_but_leaves_gauging_geometry_and_vacuum_data_continuous.md",
  "evidence/data/spin23-n2_sugra_axial_selector_audit-v1.json",
  "verification/verify/verify_spin23_n2_sugra_axial_selector_audit.mjs",
]) await access(new URL(relative, root));

console.log("Spin(2,3) new-model path selection v13: PASS");
console.log("  completed: representative N=2 matter-coupled supergravity route");
console.log("  rejected selectors: symmetry-only normalization and automatic PGT identity");
console.log("  external boundary: specified N=2 vacuum, higher N, higher-spin dictionary, or stabilized compactification");
