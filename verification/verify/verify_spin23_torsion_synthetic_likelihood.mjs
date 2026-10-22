#!/usr/bin/env node

import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

const likelihood = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-torsion-synthetic-likelihood-v1.json",
  import.meta.url,
), "utf8"));
const surfaceBytes = await readFile(new URL(
  "../../evidence/data/spin23-worldwright-torsion-response-surface-v1.json",
  import.meta.url,
));
const sha256 = bytes => createHash("sha256").update(bytes).digest("hex");
const close = (actual, expected, rel = 1e-11) => {
  const scale = Math.max(1, Math.abs(actual), Math.abs(expected));
  assert.ok(Math.abs(actual - expected) <= rel * scale, `${actual} != ${expected}`);
};

assert.equal(sha256(surfaceBytes), likelihood.responseSurfaceRef.sha256);
const kernel = (x, orientation) => {
  if (orientation === "radial-parallel") return Math.exp(-x) * (x*x + 2*x + 2);
  if (orientation === "transverse-parallel") return -Math.exp(-x) * (x + 1);
  throw new Error(`unknown orientation ${orientation}`);
};

const { separations, orientations, sigma } = likelihood.design;
const injected = separations.flatMap(separation => orientations.map(orientation => ({
  separation,
  orientation,
  value: likelihood.injection.amplitude * kernel(
    likelihood.injection.dimensionlessMass * separation,
    orientation,
  ),
})));
assert.equal(injected.length, likelihood.design.signalCells);

const profile = likelihood.massGrid.map(dimensionlessMass => {
  const template = injected.map(point => kernel(
    dimensionlessMass * point.separation,
    point.orientation,
  ));
  const numerator = template.reduce((sum, value, index) => sum + value * injected[index].value, 0);
  const denominator = template.reduce((sum, value) => sum + value*value, 0);
  const amplitudeHat = numerator / denominator;
  const chiSquared = injected.reduce((sum, point, index) => (
    sum + ((point.value - amplitudeHat*template[index]) / sigma)**2
  ), 0);
  return { dimensionlessMass, amplitudeHat, chiSquared };
});

for (const [index, row] of profile.entries()) {
  const recorded = likelihood.profileLikelihood[index];
  close(row.dimensionlessMass, recorded.dimensionlessMass);
  close(row.amplitudeHat, recorded.amplitudeHat);
  close(row.chiSquared, recorded.chiSquared);
}

const best = profile.reduce((a, b) => a.chiSquared < b.chiSquared ? a : b);
close(best.dimensionlessMass, likelihood.result.uniqueGridMinimum);
close(best.amplitudeHat, likelihood.result.recoveredAmplitude);
const nullChiSquared = injected.reduce((sum, point) => sum + (point.value/sigma)**2, 0);
close(nullChiSquared, likelihood.nullModel.chiSquared);
assert.ok(profile.filter(row => row.dimensionlessMass !== best.dimensionlessMass)
  .every(row => row.chiSquared - best.chiSquared > 90));

const zeroControls = separations.flatMap(separation => orientations.map(orientation => ({
  separation,
  orientation,
  value: 0 * kernel(likelihood.injection.dimensionlessMass * separation, orientation),
})));
assert.equal(zeroControls.length, likelihood.design.zeroPolarizationControls);
assert.ok(zeroControls.every(control => Object.is(control.value, 0) || Object.is(control.value, -0)));
assert.equal(likelihood.status.includes("not empirical calibration"), true);
assert.ok(Object.values(likelihood.authority).every(value => value === false));

console.log("Spin(2,3) torsion synthetic likelihood: PASS");
console.log(`  injected (mass,amplitude): (${likelihood.injection.dimensionlessMass},${likelihood.injection.amplitude})`);
console.log(`  recovered grid minimum: (${best.dimensionlessMass},${best.amplitudeHat.toFixed(6)})`);
console.log(`  null chi-squared: ${nullChiSquared.toFixed(6)}; nearest wrong-mass chi-squared: ${Math.min(profile[1].chiSquared, profile[3].chiSquared).toFixed(6)}`);
console.log("  status: inference plumbing demonstrated; empirical calibration remains blocked");
