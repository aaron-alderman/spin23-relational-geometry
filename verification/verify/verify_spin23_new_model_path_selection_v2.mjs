#!/usr/bin/env node

import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const evidence = JSON.parse(await readFile(new URL(
  "evidence/data/spin23-new-model-path-selection-v2.json", root,
), "utf8"));
assert.equal(evidence.globalExhaustion, false);
assert.equal(evidence.selectedNode, "ST");
assert.deepEqual(evidence.nodes.filter((node) => node.state === "rejected_as_selector").map((node) => node.id), ["AU", "SG"]);
assert.deepEqual(evidence.nodes.filter((node) => node.state === "externally_blocked").map((node) => node.id), ["FP"]);
for (const relative of [
  "corpus/claims/1700-1799/1751_n1_local_supersymmetry_organizes_but_does_not_fix_the_axial_torsion_coupling.md",
  "verification/verify/verify_spin23_n1_sugra_axial_selector_audit.mjs",
]) await access(new URL(relative, root));

console.log("Spin(2,3) new-model path selection v2: PASS");
console.log("  local supersymmetry rejected as coefficient selector");
console.log("  next selected branch: concrete string/higher-dimensional normalization");
