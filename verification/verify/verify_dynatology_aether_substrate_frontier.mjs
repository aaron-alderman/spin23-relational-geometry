import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const root = process.cwd();
const registerPath = path.join(root, "corpus/programmes/dynatology/aether_substrate_frontier_register_v1.json");
const register = JSON.parse(fs.readFileSync(registerPath, "utf8"));

assert.equal(register.schema, "dynatology-aether-substrate-frontier/1");
assert.equal(register.authority, "frontier_map_not_substrate_admission");
assert.ok(fs.existsSync(path.join(root, register.canonicalDocument)), "missing canonical document");

assert.ok(Array.isArray(register.branches) && register.branches.length >= 7);
assert.deepEqual(register.branches.map((x) => x.id), register.branches.map((_, i) => `AS-${String(i + 1).padStart(3, "0")}`));
assert.equal(new Set(register.branches.map((x) => x.id)).size, register.branches.length);
for (const branch of register.branches) {
  for (const field of ["label", "status", "carrier", "requiredRecovery", "signature", "killTest"]) {
    assert.ok(branch[field] !== undefined && String(branch[field]).trim(), `${branch.id}: ${field}`);
  }
  assert.ok(branch.preferredFrame !== undefined, `${branch.id}: preferredFrame`);
}

assert.ok(Array.isArray(register.frontiers) && register.frontiers.length >= 8);
assert.deepEqual(register.frontiers.map((x) => x.id), register.frontiers.map((_, i) => `ASF-${String(i + 1).padStart(3, "0")}`));
assert.equal(new Set(register.frontiers.map((x) => x.id)).size, register.frontiers.length);
for (const frontier of register.frontiers) {
  for (const field of ["label", "priority", "question", "nextGate", "stopRule"]) {
    assert.ok(typeof frontier[field] === "string" && frontier[field].trim(), `${frontier.id}: ${field}`);
  }
}

assert.ok(register.frontiers.some((x) => /universal-cone/i.test(x.label)), "missing universal-cone frontier");
assert.ok(register.frontiers.some((x) => /noise/i.test(x.label)), "missing response-noise frontier");
assert.ok(register.branches.some((x) => x.preferredFrame === false), "retain non-preferred-frame branches");
assert.ok(register.branches.some((x) => x.preferredFrame === true), "retain preferred-frame branches");

for (const ref of register.corpusInterfaces) {
  assert.ok(fs.existsSync(path.join(root, ref)), `missing corpus interface ${ref}`);
}

console.log("Dynatology aether/substrate frontier: PASS");
console.log(`branches=${register.branches.length}; frontiers=${register.frontiers.length}`);
