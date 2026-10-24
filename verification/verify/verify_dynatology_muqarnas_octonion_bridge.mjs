import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const root = process.cwd();
const file = path.join(root, "corpus/programmes/dynatology/muqarnas_octonion_bridge_register_v1.json");
const register = JSON.parse(fs.readFileSync(file, "utf8"));

assert.equal(register.schema, "dynatology-muqarnas-octonion-bridge/1");
assert.equal(register.authority, "generative_analogy_requires_native_composition_invariants");
assert.match(register.claimBoundary, /No historical octonion encoding/i);
assert.ok(Array.isArray(register.stages) && register.stages.length === 10);

const ids = register.stages.map((stage) => stage.id);
assert.deepEqual(ids, ids.map((_, i) => `MOB-${String(i + 1).padStart(3, "0")}`));
assert.equal(new Set(ids).size, ids.length);

for (const stage of register.stages) {
  for (const field of ["stage", "muqarnasObject", "octonionAnalogue", "admissionTest", "status"]) {
    assert.ok(typeof stage[field] === "string" && stage[field].trim(), `${stage.id}: ${field}`);
  }
}

for (const required of ["associator", "alternativity", "moufang_closure", "oriented_triples", "global_package"]) {
  assert.ok(register.stages.some((stage) => stage.stage === required), `missing stage: ${required}`);
}

assert.ok(register.controls.length >= 6);
assert.ok(register.controls.includes("solver_order_randomization"));
assert.ok(register.outcomes.includes("associative_generative_grammar"));
assert.ok(register.outcomes.includes("clean_negative"));
assert.ok(Array.isArray(register.boundaryEvidence) && register.boundaryEvidence.length >= 3);
for (const ref of register.boundaryEvidence) {
  assert.ok(fs.existsSync(path.join(root, ref)), `missing boundary evidence: ${ref}`);
}

console.log("Dynatology muqarnas--octonion generative bridge: PASS");
console.log(JSON.stringify({stages: register.stages.length, controls: register.controls.length, outcomes: register.outcomes.length}));

