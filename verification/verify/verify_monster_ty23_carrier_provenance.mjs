import assert from "node:assert/strict";
import fs from "node:fs";

const evidencePath = new URL(
  "../../evidence/data/monster-ty23-carrier-provenance-v1.json",
  import.meta.url,
);
const evidence = JSON.parse(fs.readFileSync(evidencePath, "utf8"));
assert.equal(evidence.schemaVersion, "monster-ty23-carrier-provenance-v1");

const levels = evidence.witnessLevels;
assert.deepEqual(levels.map(({ level }) => level), [0, 1, 2, 3, 4]);
assert.deepEqual(levels.map(({ id }) => id), ["W0", "W1", "W2", "W3", "W4"]);
for (let index = 1; index < levels.length; index += 1) {
  assert.ok(levels[index].requires.includes(`W${index - 1}`));
}

const classify = (passed) => {
  let highest = -1;
  for (let level = 0; level < levels.length; level += 1) {
    if (!passed.has(`W${level}`)) break;
    highest = level;
  }
  return highest < 0 ? "no categorical carrier" : evidence.claimRules[`W${highest}`];
};

const cases = [
  { passed: [], expected: "no categorical carrier" },
  { passed: ["W0"], expected: evidence.claimRules.W0 },
  { passed: ["W0", "W1"], expected: evidence.claimRules.W1 },
  { passed: ["W0", "W1", "W2"], expected: evidence.claimRules.W2 },
  { passed: ["W0", "W1", "W2", "W3"], expected: evidence.claimRules.W3 },
  { passed: ["W0", "W1", "W2", "W3", "W4"], expected: evidence.claimRules.W4 },
  // Non-consecutive evidence cannot skip a missing lower-level witness.
  { passed: ["W0", "W1", "W3", "W4"], expected: evidence.claimRules.W1 },
  { passed: ["W2", "W3", "W4"], expected: "no categorical carrier" }
];
for (const test of cases) assert.equal(classify(new Set(test.passed)), test.expected);

const qca = evidence.carrierRoutes.find(({ id }) => id === "qca");
const xxz = evidence.carrierRoutes.find(({ id }) => id === "xxz");
const stringNet = evidence.carrierRoutes.find(({ id }) => id === "adaptive-string-net");
assert.equal(qca.ty23CarrierEstablishedInTheory, true);
assert.equal(xxz.ty23FusionRingEstablishedInTheory, true);
assert.equal(xxz.ty23AssociatorTomographyPublished, false);
assert.equal(stringNet.explicitZ23CircuitPublishedInCitedSource, false);
assert.ok(evidence.carrierRoutes.every(({ monsterProvenance }) => monsterProvenance === false));
assert.equal(evidence.sameCarrierRequired, true);

console.log(JSON.stringify({
  status: "PASS",
  carrierRoutesChecked: evidence.carrierRoutes.length,
  witnessLevelsChecked: levels.length,
  promotionCasesChecked: cases.length,
  ty23TensorProductCarrierAvailableInTheory: true,
  laboratoryMonsterProvenance: false,
  verdict: evidence.verdict
}));
