#!/usr/bin/env node

import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

const bridgePath = new URL("../../evidence/data/spin23-worldwright-torsion-response-surface-v1.json", import.meta.url);
const sourcePath = new URL("../../evidence/data/spin23-critical-pgt-lense-thirring-spin-yukawa.json", import.meta.url);
const [bridgeBytes, sourceBytes] = await Promise.all([readFile(bridgePath), readFile(sourcePath)]);
const bridge = JSON.parse(bridgeBytes);
const source = JSON.parse(sourceBytes);
const sha256 = bytes => createHash("sha256").update(bytes).digest("hex");
const close = (actual, expected, rel = 1e-12) => {
  const scale = Math.max(1, Math.abs(actual), Math.abs(expected));
  assert.ok(Math.abs(actual - expected) <= rel * scale, `${actual} != ${expected}`);
};

assert.equal(sha256(sourceBytes), bridge.sourceEvidence.sha256);
assert.equal(source.metricWeakField.criticalClassCoefficient, 1);
assert.equal(source.benchmarks.lageosLike.torsionCorrectionForUnpolarizedBodies_mas_per_year, 0);
assert.equal(bridge.separationRule.worldwrightSemanticsImportedIntoPhysics, false);
assert.equal(bridge.separationRule.physicsAuthorityExportedToWorldwright, false);

const kernel = (x, orientation) => Math.exp(-x) * (
  -orientation.s1DotS2 * (x + 1)
  + orientation.s1DotR * orientation.s2DotR * (x*x + 3*x + 3)
);

const cells = [];
for (const x of bridge.axes.x) {
  for (const orientation of bridge.axes.orientations) {
    for (const p1 of bridge.axes.polarization) {
      for (const p2 of bridge.axes.polarization) {
        cells.push({ x, orientation: orientation.id, p1, p2, signal: p1*p2*kernel(x, orientation) });
      }
    }
  }
}

assert.equal(cells.length, bridge.execution.cellCount);
const zeroControls = cells.filter(cell => cell.p1 === 0 || cell.p2 === 0);
assert.equal(zeroControls.length, bridge.execution.zeroPolarizationControlCount);
assert.ok(zeroControls.every(cell => Object.is(cell.signal, 0) || Object.is(cell.signal, -0)));
const polarized = cells.filter(cell => cell.p1 > 0 && cell.p2 > 0);
assert.equal(polarized.length, bridge.execution.nonzeroPolarizationCellCount);
assert.equal(polarized.filter(cell => Math.abs(cell.signal) > 1e-15).length, bridge.execution.nonzeroSignalCellCount);

const orientation = id => bridge.axes.orientations.find(item => item.id === id);
for (const row of bridge.unitPolarizationResponse) {
  const radial = kernel(row.x, orientation("radial-parallel"));
  const radialAnti = kernel(row.x, orientation("radial-antiparallel"));
  const transverse = kernel(row.x, orientation("transverse-parallel"));
  const transverseAnti = kernel(row.x, orientation("transverse-antiparallel"));
  const orthogonal = kernel(row.x, orientation("radial-transverse"));
  close(radial, row.radialParallel);
  close(transverse, row.transverseParallel);
  close(radial / -transverse, row.absoluteAnisotropyRatio);
  close(row.yukawaSuppression, Math.exp(-row.x));
  close(radialAnti, -radial);
  close(transverseAnti, -transverse);
  close(orthogonal, 0);
}

const radialSeries = bridge.unitPolarizationResponse.map(row => row.radialParallel);
const transverseMagnitude = bridge.unitPolarizationResponse.map(row => -row.transverseParallel);
const anisotropy = bridge.unitPolarizationResponse.map(row => row.absoluteAnisotropyRatio);
for (let index = 1; index < radialSeries.length; index += 1) {
  assert.ok(radialSeries[index] <= radialSeries[index - 1]);
  assert.ok(transverseMagnitude[index] <= transverseMagnitude[index - 1]);
  assert.ok(anisotropy[index] >= anisotropy[index - 1]);
}

const x16 = bridge.unitPolarizationResponse.at(-1);
close(x16.radialParallel, Math.exp(-16) * 290);
assert.ok(290 / x16.radialParallel > 8e6);
assert.equal(bridge.interpretation.newPhysicsStatus, "candidate-observable-not-detection");
assert.equal(bridge.interpretation.spin23Specificity, "not-yet");
assert.ok(Object.values(bridge.authority).every(value => value === false));

console.log("Spin(2,3)/Worldwright torsion response-surface bridge: PASS");
console.log(`  deterministic cells: ${cells.length}; zero-polarization controls: ${zeroControls.length}`);
console.log(`  x=0 radial/transverse kernels: ${radialSeries[0]} / ${-transverseMagnitude[0]}`);
console.log(`  x=16 radial kernel: ${x16.radialParallel.toExponential(6)}; anisotropy: ${x16.absoluteAnisotropyRatio.toFixed(6)}`);
console.log("  authority: experimental grammar shared; domain semantics and evidential authority remain separate");
