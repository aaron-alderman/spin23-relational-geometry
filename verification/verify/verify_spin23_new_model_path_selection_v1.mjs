#!/usr/bin/env node

import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const evidence = JSON.parse(await readFile(new URL(
  "evidence/data/spin23-new-model-path-selection-v1.json", root,
), "utf8"));

assert.equal(evidence.globalExhaustion, false);
assert.equal(evidence.selectedNode, "SG");
assert.equal(evidence.nodes.find((node) => node.id === "AU").state, "rejected_as_selector");
assert.equal(evidence.nodes.find((node) => node.id === "FP").state, "externally_blocked");
for (const relative of [
  "corpus/claims/1700-1799/1749_a_minimal_gauged_axial_locking_completion_adds_spectrum_but_still_does_not_select_one_eighth.md",
  "verification/verify/verify_spin23_axial_u1_locking_completion.mjs",
]) await access(new URL(relative, root));

console.log("Spin(2,3) new-model path selection v1: PASS");
console.log("  gauged axial locking rejected as selector");
console.log("  next selected branch: local supersymmetry Ward-identity audit");
