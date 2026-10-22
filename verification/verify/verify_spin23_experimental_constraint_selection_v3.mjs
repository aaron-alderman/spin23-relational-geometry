#!/usr/bin/env node

import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const evidence = JSON.parse(await readFile(new URL(
  "evidence/data/spin23-experimental-constraint-selection-v3.json", root,
), "utf8"));
const terminal = new Set(evidence.terminalStates);
assert.equal(evidence.globalExhaustion, true);
assert.equal(evidence.selectedNode, null);
assert.ok(evidence.nodes.every((node) => terminal.has(node.state) && !node.localExecutable));
assert.deepEqual(
  evidence.nodes.filter((node) => node.state === "completed").map((node) => node.id),
  ["EE", "EN"],
);
assert.equal(evidence.nodes.find((node) => node.id === "U").state, "rejected");
for (const id of ["FC", "HM", "UV"]) {
  const node = evidence.nodes.find((candidate) => candidate.id === id);
  assert.equal(node.state, "externally_blocked");
  assert.ok(node.blocker.length > 30);
}
for (const relative of [
  "corpus/claims/1700-1799/1723_the_eotwash_dipole_limit_bounds_the_critical_0minus_electron_portal_directly.md",
  "corpus/claims/1700-1799/1724_the_2025_electron_neutron_dipole_limit_adds_independent_0minus_flavor_tomography.md",
  "verification/verify/verify_spin23_terrano_electron_bound_map.mjs",
  "verification/verify/verify_spin23_xu_electron_neutron_bound_map.mjs"
]) await access(new URL(relative, root));

console.log("Spin(2,3) experimental-constraint selection v3: PASS");
console.log("  mapped: electron-electron plateau and electron-neutron 30-microeV point");
console.log("  rejected: mixed channel as a stronger universal-coupling bound");
console.log("  external boundary: full response tables, hadronic matching, or UV matching");
