#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-minimal-propagating-extension.json",
  import.meta.url,
), "utf8"));

const close = (actual, expected, tolerance = 1e-12) => {
  assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} != ${expected}`);
};

// Exact partial fraction for the four-derivative spin-2 kernel.
const m2Squared = 7;
for (const p2 of [0.1, 1, 3, 11]) {
  const direct = 1/(p2*(1 + p2/m2Squared));
  const split = 1/p2 - 1/(p2 + m2Squared);
  close(direct, split);
}
assert.equal(evidence.curvatureSquareAction.spin2MasslessResidue, 1);
assert.equal(evidence.curvatureSquareAction.spin2MassiveResidue, -1);

// The auxiliary-field identity for R+R^2/(6m0^2).
const m0Squared = 4;
for (const curvature of [-3, -0.25, 0, 2, 9]) {
  const phi = 1 + curvature/(3*m0Squared);
  const original = curvature + curvature*curvature/(6*m0Squared);
  const auxiliary = phi*curvature - 1.5*m0Squared*(phi - 1)**2;
  close(original, auxiliary);
}

// The Starobinsky potential has V''(0)=m0^2. A centered finite difference
// supplies an independent numerical check of the analytic expansion.
const planckSquared = 1;
const potential = (field) => 0.75*planckSquared*m0Squared*(
  1 - Math.exp(-Math.sqrt(2/3)*field/Math.sqrt(planckSquared))
)**2;
const step = 1e-4;
const secondDerivative = (potential(step) - 2*potential(0) + potential(-step))/(step*step);
close(secondDerivative, m0Squared, 1e-7);

const selector = evidence.softenedSelector.finiteWitness;
const selectorKinetic = selector.Z + 3*selector.M_PlSquared/(2*selector.ellSquared);
const selectorMassSquared = selector.muRhoSquared/selectorKinetic;
close(selectorKinetic, selector.einsteinFrameKinetic);
close(selectorMassSquared, selector.physicalMassSquared);
assert.ok(selectorKinetic > 0);
assert.ok(selectorMassSquared > 0);

// When both scalars are present they mix through the Einstein-frame conformal
// factor. Check the exact generalized eigenproblem det(H-m^2 K)=0.
const mixed = evidence.joinedSpectrum.mixedScalarQuadraticWitness;
const [[k11, k12], [, k22]] = mixed.kineticMatrix;
const [[h11], [, h22]] = mixed.massMatrix;
const detK = k11*k22 - k12*k12;
const detH = h11*h22;
const linearCoefficient = h11*k22 + h22*k11;
close(k11, mixed.kineticPrincipalMinors[0]);
close(detK, mixed.kineticPrincipalMinors[1]);
assert.ok(k11 > 0 && detK > 0, "mixed scalar kinetic matrix is not positive definite");
const discriminant = linearCoefficient**2 - 4*detK*detH;
const mixedMasses = [
  (linearCoefficient - Math.sqrt(discriminant))/(2*detK),
  (linearCoefficient + Math.sqrt(discriminant))/(2*detK),
];
mixedMasses.forEach((mass, index) => {
  close(mass, mixed.numericalMassSquaredEigenvalues[index], 1e-10);
  assert.ok(mass > 0);
});

// Claim 1596 singular surfaces must remain excluded before reduction.
const torsionCoefficients = {
  trace: (coupling) => 2*(coupling - 2)/3,
  axial: (coupling) => (1 - 4*coupling)/24,
  tensor: (coupling) => coupling + 1/2,
};
close(torsionCoefficients.trace(2), 0);
close(torsionCoefficients.axial(1/4), 0);
close(torsionCoefficients.tensor(-1/2), 0);
for (const value of Object.values(torsionCoefficients)) assert.notEqual(value(0), 0);

const example = evidence.joinedSpectrum.nonemptyExample;
assert.match(example, /15-sqrt\(145\)/);

console.log("Spin(2,3) minimal propagating-extension gate: PASS");
console.log("  finite Weyl-squared pole residues: +1 (graviton), -1 (massive spin-2)");
console.log(`  healthy R^2 witness: scalaron m^2=${m0Squared}`);
console.log(`  healthy softened-selector witness: K=${selectorKinetic}, m^2=${selectorMassSquared}`);
console.log("  claim-1596 torsion degeneracies retained: lambda=-1/2, 1/4, 2");
console.log(`  mixed scalar masses squared: ${mixedMasses.map((mass) => mass.toFixed(6)).join(", ")}`);
console.log("  nonempty healthy local subspace: massless graviton plus up to two gapped scalars");
