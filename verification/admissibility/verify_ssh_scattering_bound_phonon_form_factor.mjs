import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const data = JSON.parse(await readFile(new URL("../../evidence/data/ssh-scattering-bound-phonon-form-factor-v1.json", import.meta.url)));
assert.equal(data.schema, "admissibility.ssh-scattering-bound-phonon-form-factor/1");
assert.equal(data.parent, "AZ-120");
assert.ok(data.boundState.energy < -2);
assert.ok(Math.abs(data.boundState.totalNorm - 1) < 1e-12);
assert.ok(data.boundState.maximumEffectiveEquationResidual < 1e-10);
assert.equal(data.selectedTransition.energyNormalizedIncomingState, true);
assert.ok(Math.abs(data.selectedTransition.emittedPhononEnergy - 1.2) < 1e-12);
assert.ok(data.selectedTransition.strongestBond.magnitude > 0);
assert.equal(data.selectedTransition.normalizationBoundary.directNumericalRatioAdmissible, false);
assert.match(data.selectedTransition.normalizationBoundary.explanation, /cannot be substituted directly/);
assert.equal(data.energyScan.samples.length, 81);
assert.match(data.verdict.open, /material derivative dt\/du/);
console.log("PASS SSH scattering-to-bound phonon form-factor gate");
