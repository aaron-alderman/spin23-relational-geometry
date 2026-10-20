#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-sector-selective-mass-gap.json",
  import.meta.url,
), "utf8"));

const witness = evidence.reducedProjectorWitness;
const names = Object.keys(witness.projectors);
const vectors = names.map((name) => witness.projectors[name]);
const dot = (a, b) => a.reduce((sum, value, index) => sum + value*b[index], 0);

assert.equal(witness.dimension, 5);
for (let i = 0; i < vectors.length; i += 1) {
  for (let j = 0; j < vectors.length; j += 1) {
    const expected = i === j ? dot(vectors[i], vectors[i]) : 0;
    assert.equal(dot(vectors[i], vectors[j]), expected, `${names[i]} and ${names[j]} not orthogonal`);
  }
}

const completeness = Array(witness.dimension).fill(0);
for (const vector of vectors) {
  vector.forEach((entry, index) => { completeness[index] += entry; });
}
assert.deepEqual(completeness, Array(witness.dimension).fill(1));

const modesByProjector = new Map(witness.auxiliaryModes.map((mode) => [mode.projector, mode]));
const kernelEigenvalues = (q2) => completeness.map((_, index) => {
  if (witness.projectors.graviton[index] === 1) {
    return witness.planckCoefficient*q2;
  }
  const projectorName = names.find((name) => witness.projectors[name][index] === 1);
  const mode = modesByProjector.get(projectorName);
  return mode.Z*(q2+mode.massSquaredInEllUnits);
});

assert.ok(witness.planckCoefficient > 0);
for (const mode of witness.auxiliaryModes) {
  assert.ok(mode.Z > 0, `${mode.name} has a ghost-sign residue`);
  assert.ok(mode.massSquaredInEllUnits > 0, `${mode.name} is tachyonic`);
}

const atZero = kernelEigenvalues(0);
const nullity = atZero.filter((value) => Math.abs(value) < 1e-12).length;
const auxiliaryMassesSquared = witness.auxiliaryModes.map((mode) => mode.massSquaredInEllUnits);
const gapSquared = Math.min(...auxiliaryMassesSquared);
assert.equal(nullity, witness.expectedAtZeroMomentum.nullity);
assert.equal(nullity, evidence.infraredRequirement.masslessSpin2Helicities);
assert.equal(gapSquared, witness.expectedAtZeroMomentum.auxiliaryGapSquaredInEllUnits);
assert.ok(atZero.slice(nullity).every((value) => value > 0));

for (const q2 of [0.01, 0.1, 1, 10]) {
  assert.ok(kernelEigenvalues(q2).every((value) => value > 0));
}

const counterexample = evidence.higherDerivativeCounterexample;
assert.ok(counterexample.masslessResidue > 0);
assert.ok(counterexample.massiveResidue < 0);

// A completely gapped exchange is exponentially attenuated. At ten Compton
// lengths the static Yukawa response is less than five parts in 100,000 of 1/r.
const yukawaRatioAtTenComptonLengths = Math.exp(-10);
assert.ok(yukawaRatioAtTenComptonLengths < 5e-5);

console.log("Spin(2,3) sector-selective mass-gap gate: PASS");
console.log(`  reduced projectors: ${names.length}; completeness dimension: ${witness.dimension}`);
console.log(`  zero-momentum nullity: ${nullity} (massless graviton helicities)`);
console.log(`  positive auxiliary gap: m^2 ell^2 >= ${gapSquared.toFixed(2)}`);
console.log(`  full-gap Yukawa ratio at 10 Compton lengths: ${yukawaRatioAtTenComptonLengths.toExponential(3)}`);
console.log("  higher-derivative spin-2 counterexample: negative massive residue rejected");
