import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const root = new URL("../../", import.meta.url);
const data = JSON.parse(readFileSync(new URL("corpus/programmes/frontier-physics-targets/th229_kerr_decision_programmes_v1.json", root), "utf8"));

assert.equal(data.schema, "th229-kerr-decision-programmes/1");
assert.equal(data.programmes.length, 2);
assert.deepEqual(new Set(data.programmes.map(row => row.id)), new Set(["TH229-FACTOR-01", "KERR-GW250114-01"]));
for (const programme of data.programmes) {
  for (const field of ["observable", "nuisanceModel", "buildGate", "bridgeGate", "physicsGate", "sensitivityRequirement", "stopRule", "outcomes"])
    assert.ok(programme[field] && programme[field].length !== 0, `${programme.id}: missing ${field}`);
  assert.ok(programme.publicInputs.length >= 2, `${programme.id}: public inputs`);
  assert.ok(programme.outcomes.length >= 5, `${programme.id}: outcome partition`);
  for (const outcome of programme.outcomes) {
    assert.ok(outcome.condition && outcome.classification && outcome.propagation, `${programme.id}/${outcome.id}: incomplete propagation`);
    assert.notEqual(outcome.classification, "new_physics", `${programme.id}/${outcome.id}: automatic new-physics promotion`);
  }
}
assert.ok(data.programmes.find(row => row.id === "KERR-GW250114-01").bridgeGate.includes("currently unsupplied"));
assert.equal(data.summary.suppliedCorpusBridgeCount, 0);
assert.equal(data.summary.automaticNewPhysicsPromotions, 0);
assert.ok(data.audit.every(row => row.pass));

for (const path of [
  "corpus/programmes/admissibility/admissibility_143_th229_shared_parent_host_channel_factorization_programme.md",
  "corpus/programmes/admissibility/admissibility_144_kerr_multirecord_public_data_consistency_programme.md"
]) assert.ok(existsSync(new URL(path, root)), `missing narrative ${path}`);

const th = readFileSync(new URL("corpus/programmes/admissibility/admissibility_143_th229_shared_parent_host_channel_factorization_programme.md", root), "utf8");
const kerr = readFileSync(new URL("corpus/programmes/admissibility/admissibility_144_kerr_multirecord_public_data_consistency_programme.md", root), "utf8");
for (const label of ["Build gate", "Bridge gate", "Physics gate", "Propagation gate"]) {
  assert.ok(th.includes(label), `TH229 missing ${label}`);
  assert.ok(kerr.includes(label), `Kerr missing ${label}`);
}

console.log(JSON.stringify({ result: "pass", programmes: data.summary.programmeCount, outcomes: data.programmes.reduce((n, row) => n + row.outcomes.length, 0), suppliedCorpusBridges: 0 }, null, 2));

