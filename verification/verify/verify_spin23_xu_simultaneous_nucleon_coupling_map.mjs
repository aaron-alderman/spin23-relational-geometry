#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-xu-simultaneous-nucleon-coupling-map-v1.json",
  import.meta.url,
), "utf8"));
const close = (actual, expected, rel = 1e-11) => {
  const scale = Math.max(Number.MIN_VALUE, Math.abs(actual), Math.abs(expected));
  assert.ok(Math.abs(actual - expected) <= rel * scale, `${actual} != ${expected}`);
};

const { neutronSpinFraction: etaN, protonSpinFraction: etaP } = evidence.source;
const u = 0.862, d = -0.424, s = -0.0458;
const protonRow = [u, d, s];
const neutronRow = [d, u, s];
const nuclearRow = neutronRow.map((value, index) => etaN * value + etaP * protonRow[index]);
const relativeWeight = etaP / etaN;
const cN = evidence.universalLightQuarkWitness.neutronCoefficient;
const cP = evidence.universalLightQuarkWitness.protonCoefficient;
const normalizedCombination = cN + relativeWeight * cP;
const aLower = 800194.9055700476
  * evidence.universalLightQuarkWitness.electronCoefficient
  * normalizedCombination;

close(relativeWeight, evidence.jointConstraint.protonWeightRelativeToNeutron);
close(-etaN / etaP, evidence.jointConstraint.coefficientCancellationCpOverCn);
close(-14.48004043272514, evidence.jointConstraint.pseudoscalarCancellationYpOverYn);
nuclearRow.forEach((value, index) => close(value, evidence.quarkProjection.row[index]));
assert.equal(evidence.quarkProjection.rankFromThisExperiment, 1);
close(normalizedCombination, evidence.universalLightQuarkWitness.normalizedNucleonCombination);
close(aLower, evidence.universalLightQuarkWitness.A_lower_GeV2);
close(Math.sqrt(aLower), evidence.universalLightQuarkWitness.sqrtA_lower_GeV);
close(aLower / (evidence.source.mass_eV * 1e-9) ** 2,
  evidence.universalLightQuarkWitness.B_lower);
assert.match(evidence.jointConstraint.interpretation, /not statistically independent/);

console.log("Spin(2,3) Xu simultaneous nucleon-coupling map: PASS");
console.log(`  constrained nuclear row: (${nuclearRow.map((x) => x.toFixed(6)).join(", ")})`);
console.log(`  exact coefficient cancellation: c_p/c_n = ${(-etaN/etaP).toFixed(1)}`);
console.log(`  universal joint witness: sqrt(A) > ${Math.sqrt(aLower).toFixed(3)} GeV`);
console.log("  independent hadronic projections supplied by this experiment: 1");
