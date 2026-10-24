import assert from "node:assert/strict";
import fs from "node:fs";

const ledger = JSON.parse(
  fs.readFileSync("evidence/data/admissibility-current-research-frontier-crosswalk-v1.json", "utf8"),
);

assert.equal(ledger.protocol, "admissibility-current-research-frontier-crosswalk/1");
assert.ok(ledger.lanes.length >= 10);

const ids = new Set(ledger.lanes.map((lane) => lane.id));
assert.equal(ids.size, ledger.lanes.length);

const permittedGrades = new Set(["A", "B", "C", "D", "A/B"]);
for (const lane of ledger.lanes) {
  assert.ok(permittedGrades.has(lane.grade), `unknown grade for ${lane.id}`);
  assert.equal(lane.physicalIdentity, false, `physical identity overclaim in ${lane.id}`);
}

assert.equal(
  ledger.lanes.find((lane) => lane.id === "projector-geometry")?.grade,
  "A",
);
assert.equal(
  ledger.lanes.find((lane) => lane.id === "e8-global-shape")?.grade,
  "D",
);
assert.equal(ledger.firewall.admissibilityIsFundamental, "not established");
assert.equal(ledger.firewall.spin23IsPhysicalGravity, "not established");
assert.equal(ledger.firewall.e8Unification, "unsupported identification");
assert.equal(ledger.firewall.simulatorIsUVCompletion, "false");
assert.match(ledger.nearestExperiment.decisiveCriterion, /rho\(DR\) < 1/);

const sourceIds = new Set(ledger.primarySources.map((source) => source.arxiv));
for (const required of ["2608.06777", "2605.28754", "2406.00321", "2506.07688", "2504.17731", "2601.14381"]) {
  assert.ok(sourceIds.has(required), `missing primary source ${required}`);
}

console.log(JSON.stringify({
  status: "PASS",
  lanes: ledger.lanes.length,
  exactFormalContacts: ledger.lanes.filter((lane) => lane.grade === "A").map((lane) => lane.id),
  nearestExperiment: ledger.nearestExperiment.packet,
  decisiveCriterion: ledger.nearestExperiment.decisiveCriterion,
  fundamentalPhysicsFirewall: "ACTIVE",
}));
