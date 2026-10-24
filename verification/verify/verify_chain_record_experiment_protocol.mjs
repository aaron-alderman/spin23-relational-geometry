import assert from "node:assert/strict";
import fs from "node:fs";
import {
  DEFAULTS,
  RECORD_MODELS,
  recordProbability,
  runProtocol,
} from "../../scripts/run-chain-record-experiment.mjs";

const manifest = JSON.parse(
  fs.readFileSync(
    new URL(
      "../../corpus/programmes/frontier/wave-7/chain_record_experiment_v1.json",
      import.meta.url,
    ),
  ),
);

assert.equal(manifest.schema, "chain-record-experiment/1");
assert.equal(manifest.gates.length, 6);
assert.deepEqual(
  manifest.gates.map((gate) => gate.id),
  ["G0", "G1", "G2", "G3", "G4", "G5"],
);
assert.equal(manifest.carrier.recordSpaceDimension, 31104);

assert.ok(Math.abs(recordProbability(3) - 0.002979131709027206) < 1e-15);
assert.ok(RECORD_MODELS["no-commutator"].probability < RECORD_MODELS["binary-character"].probability);
assert.ok(RECORD_MODELS["binary-character"].probability < RECORD_MODELS["phase-complete"].probability);

const run = runProtocol({ ...DEFAULTS });
assert.equal(run.schema, "chain-record-experiment-run/1");
assert.equal(run.exact.recordSpaceDimension, 31104);
assert.equal(run.exact.activeRecordDimension, 172);
assert.equal(run.exact.character, "chi(z)=z^3");
assert.equal(run.stages.unread.classCounts.nonidentityIdentity, 0);
assert.equal(run.stages.record.selectedModel, "binary-character");
assert.ok(run.stages.record.separationFromNoCommutator >= 5);
assert.ok(Object.values(run.gates).every(Boolean));
assert.equal(run.passed, true);

// Deterministic adversarial gates: phase error beyond pi/6 flips the cubed
// sign, and a large state-dependent term fails the centrality audit.
const phaseFailure = runProtocol({
  ...DEFAULTS,
  recordShots: 100000,
  qutritPhaseError: 0.6,
});
assert.equal(phaseFailure.gates.G3, false);
assert.equal(phaseFailure.passed, false);

const centralityFailure = runProtocol({
  ...DEFAULTS,
  recordShots: 100000,
  noncentrality: 0.12,
});
assert.equal(centralityFailure.gates.G4, false);
assert.equal(centralityFailure.passed, false);

console.log(
  JSON.stringify({
    status: "PASS",
    manifest: manifest.schema,
    defaultRun: {
      passed: run.passed,
      gates: run.gates,
      unreadTotalVariation: run.stages.unread.totalVariation,
      maximumPhaseClosureResidual: run.stages.phase.maximumPhaseClosureResidual,
      centralitySpread: run.stages.centrality.spread,
      recordClicks: run.stages.record.clicks,
      recordProbability: run.stages.record.observedProbability,
      recordModel: run.stages.record.selectedModel,
      separationFromNoCommutator: run.stages.record.separationFromNoCommutator,
    },
    adversarialControls: {
      excessivePhaseErrorRejected: !phaseFailure.gates.G3,
      noncentralDynamicsRejected: !centralityFailure.gates.G4,
    },
    verdict:
      "the executable protocol passes its seeded default run and rejects phase and centrality faults",
  }),
);
