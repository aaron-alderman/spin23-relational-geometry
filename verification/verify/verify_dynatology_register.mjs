import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const root = process.cwd();
const registerPath = path.join(root, "corpus/programmes/dynatology/dynatology_register_v1.json");
const register = JSON.parse(fs.readFileSync(registerPath, "utf8"));

assert.equal(register.schema, "dynatology-register/1");
assert.deepEqual(register.coordinates, ["X", "A", "T", "J", "rho", "L", "D", "I", "R"]);
assert.ok(Array.isArray(register.entries) && register.entries.length >= 8);

const statuses = new Set(register.statuses);
const ids = register.entries.map((entry) => entry.id);
assert.equal(new Set(ids).size, ids.length);
assert.deepEqual(ids, ids.map((_, i) => `DY-${String(i + 1).padStart(3, "0")}`));

for (const entry of register.entries) {
  assert.ok(typeof entry.label === "string" && entry.label.trim(), `${entry.id}: label`);
  assert.ok(statuses.has(entry.status), `${entry.id}: status`);
  assert.ok(typeof entry.nextGate === "string" && entry.nextGate.trim(), `${entry.id}: nextGate`);
  assert.ok(Array.isArray(entry.openCoordinates), `${entry.id}: openCoordinates`);
  assert.deepEqual(Object.keys(entry.coordinates), register.coordinates, `${entry.id}: coordinate order or coverage`);
  for (const coordinate of register.coordinates) {
    assert.ok(typeof entry.coordinates[coordinate] === "string" && entry.coordinates[coordinate].trim(), `${entry.id}: ${coordinate}`);
  }
  assert.ok(Array.isArray(entry.sourceRefs) && entry.sourceRefs.length > 0, `${entry.id}: sourceRefs`);
  for (const ref of entry.sourceRefs) {
    assert.ok(fs.existsSync(path.join(root, ref)), `${entry.id}: missing ${ref}`);
  }
}

assert.ok(register.entries.some((entry) => entry.coordinates.J.includes("undefined")), "retain at least one missing-objective witness");
assert.ok(register.entries.some((entry) => entry.coordinates.I.includes("no projector-sensitive scar")), "retain complete-erasure witness");
assert.ok(register.entries.some((entry) => entry.status === "blocked"), "retain terminally blocked witness");
assert.ok(register.entries.some((entry) => entry.status === "experimental_target"), "retain experimental target");

console.log("Dynatology register: PASS");
console.log(`entries=${register.entries.length}; coordinates=${register.coordinates.length}; statuses=${new Set(register.entries.map((entry) => entry.status)).size}`);
