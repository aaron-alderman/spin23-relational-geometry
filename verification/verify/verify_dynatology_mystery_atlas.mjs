import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const root = process.cwd();
const registerPath = path.join(root, "corpus/programmes/dynatology/mystery_atlas_register_v1.json");
const register = JSON.parse(fs.readFileSync(registerPath, "utf8"));

assert.equal(register.schema, "dynatology-mystery-atlas/1");
assert.equal(register.authority, "question_intake_not_extraordinary_claim_admission");
assert.deepEqual(Object.keys(register.zones), ["M0", "M1", "M2", "M3", "M4", "M5"]);
assert.ok(Array.isArray(register.entries) && register.entries.length >= 21);

const ids = register.entries.map((entry) => entry.id);
assert.equal(new Set(ids).size, ids.length);
assert.deepEqual(ids, ids.map((_, i) => `MY-${String(i + 1).padStart(3, "0")}`));

const required = ["domain", "label", "zone", "establishedBase", "openResidue", "extraordinaryBranch", "killTest", "nextGate"];
for (const entry of register.entries) {
  for (const field of required) {
    assert.ok(typeof entry[field] === "string" && entry[field].trim(), `${entry.id}: ${field}`);
  }
  assert.ok(Object.hasOwn(register.zones, entry.zone), `${entry.id}: unknown zone ${entry.zone}`);
  assert.ok(Array.isArray(entry.sourceRefs) && entry.sourceRefs.length > 0, `${entry.id}: sourceRefs`);
  for (const ref of entry.sourceRefs) {
    assert.ok(fs.existsSync(path.join(root, ref)), `${entry.id}: missing ${ref}`);
  }
}

const domains = new Set(register.entries.map((entry) => entry.domain));
for (const domain of ["consciousness", "brain_environment", "ancient_structures", "anomalous_cognition", "anomalous_physics", "anomalous_aerospace", "fundamental_physics", "life", "cultural_esoteric", "sacred_geometry"]) {
  assert.ok(domains.has(domain), `missing domain ${domain}`);
}

assert.ok(register.entries.some((entry) => /Schumann/i.test(entry.label)), "missing Schumann target");
assert.ok(register.entries.some((entry) => /Orch OR/i.test(entry.label)), "missing Orch OR target");
assert.ok(register.entries.some((entry) => /Pyramid/i.test(entry.label)), "missing pyramid target");
assert.ok(register.entries.every((entry) => !["M4", "M5"].includes(entry.zone)), "no mystery is presently promoted to new-physics evidence");

console.log("Dynatology mystery atlas: PASS");
console.log(`entries=${register.entries.length}; domains=${domains.size}; zonesUsed=${new Set(register.entries.map((entry) => entry.zone)).size}`);
