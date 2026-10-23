#!/usr/bin/env node

import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const evidence = JSON.parse(await readFile(new URL(
  "evidence/data/spin23-new-model-path-selection-v10.json", root,
), "utf8"));
const terminal = new Set(evidence.terminalStates);
assert.equal(evidence.globalExhaustion, true);
assert.equal(evidence.selectedNode, null);
assert.ok(evidence.nodes.every((node) => terminal.has(node.state)));
assert.deepEqual(evidence.nodes.filter((node) => node.state === "completed").map((node) => node.id), ["BM", "TP", "JP"]);
assert.deepEqual(evidence.nodes.filter((node) => node.state === "rejected_as_selector").map((node) => node.id), ["SW"]);
assert.deepEqual(evidence.nodes.filter((node) => node.state === "externally_blocked").map((node) => node.id), ["CW", "SV"]);
for (const relative of [
  "corpus/claims/1700-1799/1767_the_minimal_positive_bimetric_torsion_parent_has_a_continuous_axial_portal_family.md",
  "evidence/data/spin23-bimetric-torsion-product-ward-audit-v1.json",
  "verification/verify/verify_spin23_bimetric_torsion_product_ward_audit.mjs",
]) await access(new URL(relative, root));

console.log("Spin(2,3) new-model path selection v10: PASS");
console.log("  completed: positive bimetric, healthy torsion, and minimal joined parent");
console.log("  rejected selector: ordinary gravitational Ward identities");
console.log("  external boundary: new cross-sector principle or stabilized compactification");
