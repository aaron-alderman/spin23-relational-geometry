import assert from "node:assert/strict";
import fs from "node:fs";

const record = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/leech-fixed-cutoff-local-gap-stability-ledger-v1.json", import.meta.url),
  "utf8"
));
const rotor = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/leech-rotor-native-pendulum-gap-v1.json", import.meta.url),
  "utf8"
));
const strip = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/leech-rotor-strip-gap-and-edge-count-v1.json", import.meta.url),
  "utf8"
));

assert.equal(record.schemaVersion, "leech-fixed-cutoff-local-gap-stability-ledger-v1");
assert.equal(record.sources.length, 3);
assert.ok(record.sources[0].url.startsWith("https://doi.org/"));
assert.ok(record.sources[1].url.startsWith("https://arxiv.org/"));

const hypotheses = record.fixedCutoffHypotheses;
const rotorRung = rotor.cutoffSpectrum.find((rung) => rung.N === hypotheses.cutoffN);
assert.ok(rotorRung);
assert.equal(hypotheses.localDimension, rotorRung.dimension);
assert.equal(hypotheses.localDimension, 2 * hypotheses.cutoffN + 1);
assert.equal(hypotheses.localGroundStateNondegenerate, true);
assert.equal(hypotheses.periodicBulkCellsDisjoint, true);
assert.equal(hypotheses.finiteRangePerturbationRequired, true);
assert.equal(hypotheses.uniformBoundedLocalTermRequired, true);
assert.equal(hypotheses.openEdgeExcludedFromBulkTheorem, true);
assert.ok(Math.abs(hypotheses.uniformLocalGap - rotorRung.gap) < 2e-12);
assert.ok(Math.abs(hypotheses.uniformLocalGap - strip.idealStrip.singlePendulumGap) < 2e-12);
assert.ok(strip.periodicChecks.every((check) => check.edgeModes === 0));

const conclusion = record.theoremLevelConclusion;
assert.equal(conclusion.thresholdNumericallyKnownHere, false);
assert.equal(conclusion.uniformInVolume, true);
assert.equal(conclusion.uniformInRotorCutoffN, false);
assert.equal(conclusion.appliesToOpenChiralEdge, false);
assert.equal(conclusion.provesLeechCFT, false);
assert.equal(record.nonApplications.length, 4);

const protocol = record.experimentalRadiusProtocol;
assert.deepEqual(protocol.cutoffsN, [4, 8, 16]);
assert.deepEqual(protocol.periodicWidthsY, [4, 8, 16, 32]);
assert.equal(protocol.localStrengthFractionsOfUnperturbedGap[0], 0);
assert.ok(protocol.localStrengthFractionsOfUnperturbedGap.slice(1).every((x) => x > 0));
assert.ok(protocol.localStrengthFractionsOfUnperturbedGap.every(
  (x, i, values) => i === 0 || x > values[i - 1]
));
assert.equal(protocol.observables.length, 4);
assert.ok(record.boundary.includes("No numerical stability threshold"));

console.log(JSON.stringify({
  status: "PASS",
  fixedCutoffN: hypotheses.cutoffN,
  localDimension: hypotheses.localDimension,
  unperturbedGap: hypotheses.uniformLocalGap,
  theoremConclusion: conclusion.statement,
  thresholdNumericallyKnown: conclusion.thresholdNumericallyKnownHere,
  scanPoints: protocol.cutoffsN.length
    * protocol.periodicWidthsY.length
    * protocol.localStrengthFractionsOfUnperturbedGap.length,
  boundary: record.boundary
}));
