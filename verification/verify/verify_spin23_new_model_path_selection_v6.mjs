#!/usr/bin/env node

import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const evidence = JSON.parse(await readFile(new URL(
  "evidence/data/spin23-new-model-path-selection-v6.json", root,
), "utf8"));
const terminal = new Set(evidence.terminalStates);
assert.equal(evidence.globalExhaustion, true);
assert.equal(evidence.selectedNode, null);
assert.ok(evidence.nodes.every((node) => terminal.has(node.state)));
assert.deepEqual(evidence.nodes.filter((node) => node.state === "completed").map((node) => node.id), ["TM", "QP"]);
assert.deepEqual(evidence.nodes.filter((node) => node.state === "rejected_as_fundamental").map((node) => node.id), ["LF"]);
assert.deepEqual(evidence.nodes.filter((node) => node.state === "externally_blocked").map((node) => node.id), ["SV", "NF"]);
for (const relative of [
  "corpus/claims/1700-1799/1759_the_existing_quantum_packet_already_rejects_the_unchanged_spectrum_local_fixed_point_route.md",
  "evidence/data/spin23-fixed-point-route-readiness-v2.json",
  "verification/verify/verify_spin23_fixed_point_route_readiness_v2.mjs",
]) await access(new URL(relative, root));

console.log("Spin(2,3) new-model path selection v6: PASS");
console.log("  local completions: two-mode surrogate and frozen quantum packet exhausted");
console.log("  rejected: unchanged-spectrum local finite-derivative fundamental route");
console.log("  external boundary: new stabilized vacuum or enlarged nonperturbative definition");
