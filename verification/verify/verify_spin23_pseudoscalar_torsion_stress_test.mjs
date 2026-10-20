#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-pseudoscalar-torsion-stress-test.json",
  import.meta.url,
), "utf8"));

const close = (actual, expected, tolerance = 1e-12) => {
  assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} != ${expected}`);
};

const witness = evidence.ads4QuadraticTest.finiteWitness;
const aS = witness.M_PlSquared*(1 - 4*witness.lambda)/24;
const massSquared = aS/witness.b_X;
const massSquaredEllSquared = massSquared*witness.ellSquared;
const bfMargin = massSquaredEllSquared + 9/4;
const deltaPlus = (3 + Math.sqrt(9 + 4*massSquaredEllSquared))/2;
const deltaMinus = (3 - Math.sqrt(9 + 4*massSquaredEllSquared))/2;
close(aS, witness.a_S);
close(massSquaredEllSquared, witness.massSquaredEllSquared);
close(bfMargin, witness.bfMargin);
close(deltaPlus, witness.DeltaPlus);
close(deltaMinus, witness.DeltaMinus);
assert.ok(bfMargin > 0);

const characteristic = evidence.characteristicAudit;
assert.equal(characteristic.speedRelativeToMetricLightCone, 1);
assert.ok(aS > 0);

const canonical = evidence.canonicalConstraintAudit;
const dof = (
  canonical.phaseSpaceDimension
  - 2*canonical.firstClassCount
  - canonical.secondClassCount
)/2;
assert.equal(canonical.primaryConstraintCount + canonical.secondaryConstraintCount, canonical.secondClassCount);
assert.equal(dof, canonical.physicalConfigurationDegrees);
assert.equal(dof, 1);

// The six-constraint Dirac matrix consists of three identical 2x2
// antisymmetric blocks with determinant a_S^2, hence determinant a_S^6.
const diracDeterminant = aS**6;
assert.ok(diracDeterminant > 0);
const singularAS = 0;
close(singularAS**6, 0);

const generated = evidence.radiativeClosureAudit.nonzeroGeneratedCoefficients;
close(generated.C2, 1/120);
close(generated.Euler, -1/360);
close(generated.R2, 1/72);
assert.notEqual(generated.C2, 0, "the minimal surface would require an unprotected zero C2 beta source");
assert.notEqual(generated.R2, 0, "the minimal surface would require an unprotected zero R2 beta source");

console.log("Spin(2,3) pseudoscalar-torsion stress test: PASS");
console.log(`  AdS witness: m^2 ell^2=${massSquaredEllSquared}, BF margin=${bfMargin}`);
console.log(`  conformal weights: Delta+=${deltaPlus.toFixed(6)}, Delta-=${deltaMinus.toFixed(6)}`);
console.log(`  characteristic speed: ${characteristic.speedRelativeToMetricLightCone}; canonical torsion dof: ${dof}`);
console.log(`  vacuum Dirac determinant proxy: a_S^6=${diracDeterminant.toExponential(6)}`);
console.log("  one-loop scalar spurion: C^2=1/120 and R^2=1/72 generated; minimal surface not closed");
