import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const result = JSON.parse(await readFile(resolve(root, "evidence/data/prophecy-group-weight-scenarios-v1.json"), "utf8"));

assert.equal(result.protocol, "prophetic-admissibility/group-weight-scenarios/1");
assert.ok(result.canonicalElementCount >= 140);
assert.ok(result.noncanonicalElementCount >= 25);
assert.ok(result.groupCount >= 8);
assert.ok(result.profileCount >= 6);
assert.equal(result.validationErrors.length, 0);

const neutral = result.scenarios.find((scenario) => scenario.profileId === "individual-evidence-neutral");
assert.ok(neutral.rows.every((row) => row.effectiveAttentionWeight === 1));
const hidden = result.scenarios.find((scenario) => scenario.profileId === "hidden-knowledge-stress-test");
const filtered = result.scenarios.find((scenario) => scenario.profileId === "successful-filter-stress-test");
assert.ok(hidden.noncanonicalAttentionMass > filtered.noncanonicalAttentionMass);

const enoch = neutral.rows.find((row) => row.id === "1en-091-weeks");
assert.deepEqual(enoch.groupIds.sort(), ["ethiopian-broader-canon", "second-temple-pseudepigrapha"].sort());

console.log(JSON.stringify({
  result: "pass",
  protocol: result.protocol,
  canonicalElements: result.canonicalElementCount,
  noncanonicalElements: result.noncanonicalElementCount,
  profiles: result.profileCount,
  overlapRuleCheckedOn: enoch.id
}, null, 2));
