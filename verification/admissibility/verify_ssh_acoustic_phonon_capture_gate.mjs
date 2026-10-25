import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const data = JSON.parse(await readFile(new URL("../../evidence/data/ssh-acoustic-phonon-capture-gate-v1.json", import.meta.url)));
assert.equal(data.schema, "admissibility.ssh-acoustic-phonon-capture-gate/1");
assert.equal(data.microscopicChannel.zeroModeDecouples, true);
assert.equal(data.microscopicChannel.gapInsideBand, true);
assert.ok(data.dynamics.final.capturedPopulation > 0.5);
assert.ok(Math.abs(data.dynamics.final.normResidual) < 1e-9);
assert.ok(Math.abs(data.dynamics.final.energyResidual) < 1e-9);
assert.ok(data.dynamics.timeReversal.reverseBathPopulation < 1e-9);
assert.ok(data.dynamics.timeReversal.reverseExcitedAmplitudeError < 1e-4);
assert.ok(Math.abs(data.detailedBalance.upwardToDownwardRatio - data.detailedBalance.expectedBoltzmannRatio) < 1e-14);
assert.ok(data.parameters.totalTime < data.dynamics.recurrenceEstimate);
assert.match(data.verdict.open, /not been computed from the actual SSH-plus-local eigenstates/);
console.log("PASS SSH acoustic-phonon capture gate");
