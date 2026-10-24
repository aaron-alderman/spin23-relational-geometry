import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "../..");
const certificate = JSON.parse(readFileSync(resolve(root, "evidence/data/admissibility-family-placement-torsor-reduction-v1.json"), "utf8"));
const nufit = JSON.parse(readFileSync(resolve(root, "evidence/data/spin23-selected-flavour-texture-zero-nufit61.json"), "utf8"));

assert.equal(certificate.protocol, "admissibility-family-placement-torsor-reduction/1");

const permutations = (items) => items.length === 1
  ? [items]
  : items.flatMap((item, index) => permutations(items.filter((_, i) => i !== index)).map((tail) => [item, ...tail]));

const maps = permutations([0, 1, 2]);
const parity = (p) => {
  let inversions = 0;
  for (let i = 0; i < p.length; i += 1) {
    for (let j = i + 1; j < p.length; j += 1) inversions += Number(p[i] > p[j]);
  }
  return inversions % 2;
};

const orientationCorrelated = maps.filter((p) => parity(p) === 0);
const basepointCorrelated = maps.filter((p) => p[0] === 0);
const fullyCorrelated = maps.filter((p) => parity(p) === 0 && p[0] === 0);

assert.equal(maps.length, 6);
assert.equal(orientationCorrelated.length, 3);
assert.equal(basepointCorrelated.length, 2);
assert.equal(fullyCorrelated.length, 1);

const stageCounts = Object.fromEntries(certificate.conditionalReductionLadder.map((stage) => [stage.stage, stage.remainingBijections]));
assert.deepEqual(stageCounts, {
  raw: maps.length,
  "orientation-correlated": orientationCorrelated.length,
  "basepoint-correlated": basepointCorrelated.length,
  "orientation-and-basepoint-correlated": fullyCorrelated.length
});

for (const datum of certificate.availableData) {
  assert.equal(datum.remainingBijections, 6, `${datum.id} must not silently select a cross-carrier map`);
  assert.ok(datum.boundary.length > 0);
}

const sampled = nufit.sampledMarginalRangeResults;
assert.equal(sampled.inverted.electron.accepted, 0);
assert.ok(sampled.normal.electron.accepted > 0);
assert.ok(sampled.normal.muon.accepted > 0);
assert.ok(sampled.normal.tau.accepted > 0);
assert.ok(sampled.inverted.muon.accepted > 0);
assert.ok(sampled.inverted.tau.accepted > 0);

assert.equal(certificate.problem.physicalAdmission, false);
assert.equal(certificate.conditionalReductionLadder[1].status, "conditional-not-derived");
assert.equal(certificate.conditionalReductionLadder[3].status, "conditional-not-derived");

console.log(JSON.stringify({
  status: "PASS",
  rawLabelTorsor: maps.length,
  afterOrientationCorrelation: orientationCorrelated.length,
  afterBasepointCorrelation: basepointCorrelated.length,
  afterBoth: fullyCorrelated.length,
  currentPhysicallyAdmittedMaps: 0,
  nearestEdge: "OPEN"
}));
