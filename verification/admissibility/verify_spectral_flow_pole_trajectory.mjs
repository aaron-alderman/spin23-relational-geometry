#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..", "..");
const dataPath = path.join(root, "evidence", "data", "admissibility-spectral-flow-pole-trajectory-v1.json");
const documentPath = path.join(root, "corpus", "programmes", "admissibility", "admissibility_52_spectral_flow_pole_trajectories.md");

const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
const document = fs.readFileSync(documentPath, "utf8");

assert.equal(data.schema, "admissibility.spectral-flow-pole-trajectory/1");
assert.equal(data.id, "AZ-052");
assert.deepEqual(data.model.parameters.continuumBand, [-2, 2]);
assert.equal(data.model.rails.trivial.winding, 0);
assert.equal(data.model.rails.topological.winding, 1);
assert.equal(data.runs.trivial.length, 7);
assert.equal(data.runs.topological.length, 7);

for (const rail of ["trivial", "topological"]) {
  const runs = data.runs[rail];
  assert.equal(runs[0].boundStates.length, 3, `${rail}: lower exterior control must have the extra bound pole`);
  assert.equal(runs[3].boundStates.length, 2, `${rail}: central control must lose the extra bound pole to the continuum`);
  assert.equal(runs[6].boundStates.length, 3, `${rail}: upper exterior control must recover the extra bound pole`);
  const trajectory = runs.map((run) => run.trackedLocalBranch.real);
  assert.ok(trajectory.every((x, i) => i === 0 || x > trajectory[i - 1]), `${rail}: tracked local branch must move monotonically through the sweep`);
  for (const run of runs) {
    assert.ok(run.resonances.length >= 7, `${rail}/${run.localEnergy}: continued-sheet poles missing`);
    assert.ok(run.trackedLocalBranch, `${rail}/${run.localEnergy}: local branch was not tracked`);
    assert.equal(run.trackedLocalBranch.kind, Math.abs(run.localEnergy) > 2 ? "physical_sheet_bound" : "continued_sheet_resonance");
    assert.ok(run.resonances.every((pole) => pole.residual < 1e-7));
    assert.ok(run.resonances.every((pole) => pole.width >= 0));
    assert.ok(run.boundStates.every((pole) => Math.abs(pole.energy) > 2));
    assert.ok(run.boundStates.every((pole) => pole.localizationLength > 0));
    assert.ok(Number.isFinite(run.scattering.phaseWinding));
    assert.ok(run.scattering.maxUnitarityError < 1e-4, `${rail}/${run.localEnergy}: real-axis scattering is not unitary`);
    assert.ok(Number.isFinite(run.scattering.maxDelay.value));
    assert.ok(Number.isFinite(run.casimirProxy));
  }
}

assert.equal(data.comparisons.zeroControl.topologyChangesSpectralResponse, true);
assert.ok(Math.abs(data.comparisons.zeroControl.trivialCasimirProxy - data.comparisons.zeroControl.topologicalCasimirProxy) > 1e-3);
assert.equal(data.comparisons.cyclicMemory.finiteRateMemoryObserved, true);
assert.ok(data.comparisons.cyclicMemory.fast.absoluteLoopArea > data.comparisons.cyclicMemory.slow.absoluteLoopArea);
const capture = data.comparisons.radiativeCapture;
assert.equal(capture.model, "unitary_friedrichs_one_excitation_bath");
assert.ok(capture.final.capturedPopulation > 0.8, "radiative bath must retain most of the transferred population at the declared final time");
assert.ok(Math.abs(capture.final.normResidual) < 1e-9, "unitary bath norm ledger failed");
assert.ok(Math.abs(capture.final.energyResidual) < 1e-9, "unitary bath energy ledger failed");
assert.equal(data.admission.unitaryRadiativeCaptureToyEstablished, true);
assert.equal(data.admission.universalCombinedIndexEstablished, false);
assert.equal(data.admission.microscopicCaptureEstablished, false);
assert.equal(data.admission.spin23ConstraintEstablished, false);

for (const phrase of [
  "admissible deformation path",
  "raw phase winding is not yet the index",
  "finite-rate memory",
  "unitary radiative-capture surrogate",
  "does not derive microscopic capture",
  "Spin(2,3)",
]) assert.ok(document.includes(phrase), `missing document phrase: ${phrase}`);

console.log("PASS spectral-flow pole trajectories, topology comparison, memory and capture firewalls");

