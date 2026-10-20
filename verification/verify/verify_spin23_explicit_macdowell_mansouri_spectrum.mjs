#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-explicit-macdowell-mansouri-spectrum.json",
  import.meta.url,
), "utf8"));

const close = (actual, expected, tolerance = 1e-12) => {
  assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} != ${expected}`);
};

// Work in exact dimensionless units kappa=ell=1. The three coefficients
// follow by expanding (ell^2/8kappa)(R+ell^-2 ee)^2.
const ell = 1;
const kappa = 1;
const lambdaCosmological = -3/(ell*ell);
const prefactor = ell*ell/(8*kappa);
const eulerCoefficient = prefactor;
const einsteinCartanCoefficient = prefactor*2/(ell*ell);
const cosmologicalCoefficient = prefactor/(ell**4);
close(eulerCoefficient, 1/8);
close(einsteinCartanCoefficient, 1/4);
close(cosmologicalCoefficient, 1/8);
close(cosmologicalCoefficient, -lambdaCosmological/(24*kappa));

const count = evidence.minimalBranchPoleCensus.configurationCount;
assert.equal(
  count.symmetricMetricComponents - 2*count.diffeomorphismFirstClassGenerators,
  count.physicalConfigurationDegrees,
);
assert.equal(count.physicalConfigurationDegrees, 2);
assert.equal(evidence.minimalBranchPoleCensus.independentTorsionPoles, 0);
assert.equal(evidence.minimalBranchPoleCensus.selectorPoles, 0);

const dimensions = evidence.minimalSelectorCovariantDeformation.torsionDecomposition.dimensions;
assert.equal(dimensions.traceVector + dimensions.axialVector + dimensions.tensor, dimensions.total);
assert.equal(dimensions.total, 24);

const coefficients = {
  traceVector: (coupling) => 2*(coupling - 2)/3,
  axialVector: (coupling) => (1 - 4*coupling)/24,
  tensor: (coupling) => coupling + 1/2,
};
const expectedRoots = { traceVector: 2, axialVector: 1/4, tensor: -1/2 };
for (const block of evidence.minimalSelectorCovariantDeformation.algebraicQuadraticCoefficients) {
  close(coefficients[block.sector](block.degenerateAt), 0);
  close(block.degenerateAt, expectedRoots[block.sector]);
}

const rankAt = (coupling) => evidence.minimalSelectorCovariantDeformation
  .algebraicQuadraticCoefficients
  .reduce((rank, block) => rank + (
    Math.abs(coefficients[block.sector](coupling)) > 1e-12 ? block.multiplicity : 0
  ), 0);

assert.equal(rankAt(0), 24, "Einstein-Cartan torsion Hessian must be nonsingular");
assert.equal(rankAt(1), 24, "generic deformation must leave torsion algebraic");
assert.equal(rankAt(2), 20, "trace-vector degeneracy must remove four Hessian directions");
assert.equal(rankAt(1/4), 20, "axial degeneracy must remove four Hessian directions");
assert.equal(rankAt(-1/2), 8, "tensor degeneracy must remove sixteen Hessian directions");
assert.equal(evidence.minimalSelectorCovariantDeformation.momentumDegree, 0);

const selector = evidence.selectorCount;
assert.equal(
  selector.ambientComponents - selector.fixedNormConstraint - selector.brokenGaugeOrbitDirections,
  selector.physicalRadialModes,
);
assert.equal(selector.physicalRadialModes, 0);

console.log("Explicit Spin(2,3) MacDowell-Mansouri spectrum gate: PASS");
console.log(`  MM coefficients at ell=kappa=1: Euler=${eulerCoefficient}, EC=${einsteinCartanCoefficient}, CC=${cosmologicalCoefficient}`);
console.log(`  minimal physical configuration degrees: ${count.physicalConfigurationDegrees}`);
console.log(`  generic torsion Hessian rank: ${rankAt(1)}/24; momentum degree: 0`);
console.log(`  exceptional ranks lambda={-1/2,1/4,2}: ${rankAt(-1/2)}, ${rankAt(1/4)}, ${rankAt(2)}`);
console.log("  fixed-norm selector radial modes: 0; additional massive poles: 0");
