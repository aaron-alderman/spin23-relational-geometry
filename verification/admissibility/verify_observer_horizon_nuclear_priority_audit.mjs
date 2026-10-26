import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const root = new URL("../../", import.meta.url);
const data = JSON.parse(readFileSync(new URL("evidence/data/observer-horizon-nuclear-priority-audit-v1.json", root), "utf8"));

assert.equal(data.schema, "observer-horizon-nuclear-priority-audit/1");
assert.equal(data.candidates.length, 5);
assert.equal(Object.keys(data.profiles).length, 4);
for (const candidate of data.candidates) {
  for (const field of ["coreFit", "formalSharpness", "existingData", "interventionAccess", "noRefitPotential", "newPhysicsReach", "bridgeTractability"])
    assert.ok(Number.isInteger(candidate[field]) && candidate[field] >= 0 && candidate[field] <= 5, `${candidate.id}: bad ${field}`);
}
for (const [profile, rows] of Object.entries(data.rankings)) {
  assert.equal(rows.length, data.candidates.length, `${profile}: incomplete ranking`);
  assert.equal(new Set(rows.map(row => row.id)).size, data.candidates.length, `${profile}: duplicate candidate`);
  assert.ok(rows.every((row, index) => index === 0 || rows[index - 1].score >= row.score), `${profile}: unsorted`);
}
assert.equal(data.rankings.balanced[0].id, "TH229");
assert.equal(data.rankings.next_experiment[0].id, "TH229");
assert.equal(data.rankings.corpus_bridge[0].id, "TH229");
assert.equal(data.rankings.foundational_insight[0].id, "HAWKING");

const text = readFileSync(new URL("corpus/programmes/admissibility/admissibility_141_observer_horizon_and_nuclear_priority_for_next_insight.md", root), "utf8");
for (const id of ["TH229", "NUCLEAR_OPEN", "KERR", "UNRUH", "HAWKING"]) assert.ok(text.includes(id));
for (const phrase of ["Why this is different", "Next decisive work", "What would change the ranking", "Decision"])
  assert.ok(text.includes(phrase), `missing ${phrase}`);

console.log(JSON.stringify({ result: "pass", topCounts: data.topCounts, nextDecision: data.nextDecision }, null, 2));

