import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const root = process.cwd();
const file = path.join(root, "corpus/programmes/quotient-scars/quotient_scar_register_v1.json");
const register = JSON.parse(fs.readFileSync(file, "utf8"));

assert.equal(register.schema, "quotient-scar-register/1");
assert.ok(Array.isArray(register.entries) && register.entries.length >= 7);
const ids = register.entries.map(x => x.id);
assert.equal(new Set(ids).size, ids.length);
assert.deepEqual(ids, ids.map((_, i) => `QS-${String(i + 1).padStart(3, "0")}`));

const scarTypes = new Set(register.scarTypes);
const statuses = new Set(register.statuses);
const relationTypes = new Set(register.relationTypes);
const fields = ["label", "parent", "reduction", "killed", "dynamicsClosure", "detectorSufficiency", "status", "falsifier"];
for (const entry of register.entries) {
  for (const field of fields) assert.ok(typeof entry[field] === "string" && entry[field].trim(), `${entry.id}: ${field}`);
  assert.ok(statuses.has(entry.status), `${entry.id}: invalid status`);
  assert.ok(Array.isArray(entry.scars) && entry.scars.length > 0, `${entry.id}: scars`);
  for (const scar of entry.scars) {
    assert.ok(scarTypes.has(scar.type), `${entry.id}: invalid scar type ${scar.type}`);
    assert.ok(typeof scar.datum === "string" && scar.datum.trim());
  }
  assert.ok(Array.isArray(entry.sourceRefs) && entry.sourceRefs.length > 0);
  for (const ref of entry.sourceRefs) assert.ok(fs.existsSync(path.join(root, ref)), `${entry.id}: missing ${ref}`);
}

const completeErasure = register.entries.filter(entry => entry.scars.some(scar => scar.type === "none"));
assert.ok(completeErasure.length > 0, "register must retain at least one certified complete-erasure boundary");
assert.ok(register.entries.some(entry => entry.scars.some(scar => scar.type === "dynamical")));
assert.ok(register.entries.some(entry => entry.scars.some(scar => scar.type === "integral")));
assert.ok(register.entries.some(entry => entry.scars.some(scar => scar.type === "statistical")));

const idSet = new Set(ids);
const relationIds = new Set();
for (const relation of register.relations ?? []) {
  assert.ok(/^QR-\d{3}$/.test(relation.id));
  assert.ok(!relationIds.has(relation.id), 'duplicate relation ' + relation.id);
  relationIds.add(relation.id);
  assert.ok(idSet.has(relation.from), relation.id + ': missing from endpoint');
  assert.ok(idSet.has(relation.to), relation.id + ': missing to endpoint');
  assert.notEqual(relation.from, relation.to, relation.id + ': self relation');
  assert.ok(relationTypes.has(relation.type), relation.id + ': invalid type');
  assert.ok(typeof relation.statement === "string" && relation.statement.trim());
}
assert.ok((register.relations ?? []).length >= 7);

console.log("Quotient-scar register: PASS");
console.log('entries=' + register.entries.length + '; relations=' + register.relations.length + '; scar_types=' + new Set(register.entries.flatMap(e => e.scars.map(s => s.type))).size + '; complete_erasure_witnesses=' + completeErasure.length);
