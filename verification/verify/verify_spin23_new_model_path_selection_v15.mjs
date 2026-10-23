#!/usr/bin/env node

import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const evidence = JSON.parse(await readFile(new URL(
  "evidence/data/spin23-new-model-path-selection-v15.json", root,
), "utf8"));
const terminal = new Set(evidence.terminalStates);
assert.equal(evidence.globalExhaustion, true);
assert.equal(evidence.selectedNode, null);
assert.ok(evidence.nodes.every((node) => terminal.has(node.state)));
assert.deepEqual(evidence.nodes.filter((node) => node.state === "completed").map((node) => node.id), ["S7"]);
assert.deepEqual(evidence.nodes.filter((node) => node.state === "rejected_as_selector").map((node) => node.id), ["AF", "SC"]);
assert.deepEqual(evidence.nodes.filter((node) => node.state === "externally_blocked").map((node) => node.id), ["TE", "HD", "SV"]);
for (const relative of [
  "corpus/claims/1700-1799/1777_the_standard_s7_uplift_contains_form_pseudoscalars_but_not_the_independent_pgt_torsion_pole.md",
  "evidence/data/spin23-s7_uplift_pgt_field_identity_audit-v1.json",
  "verification/verify/verify_spin23_s7_uplift_pgt_field_identity_audit.mjs",
]) await access(new URL(relative, root));

console.log("Spin(2,3) new-model path selection v15: PASS");
console.log("  completed: standard S7 uplift field-provenance audit");
console.log("  rejected selectors: A3 parity identity and supercovariant-torsion substitution");
console.log("  external boundary: torsionful parent extension, higher-spin dictionary, or stabilized compactification");
