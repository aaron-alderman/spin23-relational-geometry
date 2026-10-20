#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-semiclassical-continuity-mass-gap-gate.json",
  import.meta.url,
), "utf8"));

assert.equal(evidence.schema, "spin23.semiclassical-continuity-mass-gap-gate/1");
assert.match(evidence.status, /unproved large-circle and R4 continuity gate/);

const transpose = (a) => a[0].map((_, j) => a.map((row) => row[j]));
const multiply = (a, b) => a.map((row) =>
  transpose(b).map((col) => row.reduce((s, x, i) => s+x*col[i], 0)));
const outerSum = (vectors) => vectors[0].map((_, i) =>
  vectors[0].map((_, j) => vectors.reduce((s, v) => s+v[i]*v[j], 0)));
const matVec = (a, v) => a.map((row) => row.reduce((s, x, i) => s+x*v[i], 0));
const dot = (a, b) => a.reduce((s, x, i) => s+x*b[i], 0);
const close = (a, b, tol=1e-14) => Math.abs(a-b) < tol;
const assertMatrix = (a, b, tol=1e-14) => {
  assert.equal(a.length, b.length);
  for (let i=0; i<a.length; i++) {
    assert.equal(a[i].length, b[i].length);
    for (let j=0; j<a[i].length; j++) assert.ok(close(a[i][j], b[i][j], tol));
  }
};
const assertEigenvector = (matrix, vector, eigenvalue, tol=1e-14) => {
  const action = matVec(matrix, vector);
  for (let i=0; i<vector.length; i++) assert.ok(close(action[i], eigenvalue*vector[i], tol));
};

for (const witness of [evidence.su2Witness, evidence.su3Witness]) {
  const monopole = outerSum(witness.affineRoots);
  const bion = outerSum(witness.bionCharges);
  assertMatrix(monopole, witness.monopoleHessian);
  assertMatrix(bion, witness.bionHessian);
  assertMatrix(bion, multiply(monopole, monopole));
  assertEigenvector(monopole, witness.nullVector, 0);
  assertEigenvector(bion, witness.nullVector, 0);
  assert.ok(close(dot(witness.nullVector, witness.nullVector), 1));
  const physicalVectors = witness.physicalEigenvectors || [];
  for (let i=0; i<physicalVectors.length; i++) {
    const v = physicalVectors[i];
    assertEigenvector(monopole, v, witness.monopoleEigenvalues[i+1]);
    assertEigenvector(bion, v, witness.bionEigenvalues[i+1]);
    assert.ok(close(dot(v, witness.nullVector), 0));
  }
}
assertEigenvector(evidence.su2Witness.monopoleHessian, evidence.su2Witness.physicalEigenvector, 4);
assertEigenvector(evidence.su2Witness.bionHessian, evidence.su2Witness.physicalEigenvector, 16);

const zM = evidence.combinedNumericalWitness.zetaMonopole;
const zB = evidence.combinedNumericalWitness.zetaBion;
for (const key of ["su2", "su3"]) {
  const w = evidence[key+"Witness"];
  const expected = evidence.combinedNumericalWitness[key+"Hessian"];
  const combined = w.monopoleHessian.map((row, i) =>
    row.map((x, j) => zM*x+zB*w.bionHessian[i][j]));
  assertMatrix(combined, expected);
  assertEigenvector(combined, w.nullVector, 0);
  const vectors = w.physicalEigenvectors || [w.physicalEigenvector];
  const positive = evidence.combinedNumericalWitness[key+"Eigenvalues"].slice(1);
  for (let i=0; i<vectors.length; i++) {
    assertEigenvector(combined, vectors[i], positive[i]);
    assert.ok(positive[i] > 0);
  }
}

for (const row of evidence.generalAffineSpectrum.minimumRows) {
  const mono = 4*Math.sin(Math.PI/row.N)**2;
  const bion = mono**2;
  const combined = zM*mono+zB*bion;
  assert.ok(close(mono, row.monopoleMinimum));
  assert.ok(close(bion, row.bionMinimum));
  assert.ok(close(combined, row.combinedMinimum));
}
const largeNRows = evidence.generalAffineSpectrum.minimumRows.slice(2);
for (let i=1; i<largeNRows.length; i++) {
  assert.ok(largeNRows[i].monopoleMinimum < largeNRows[i-1].monopoleMinimum);
  assert.ok(largeNRows[i].bionMinimum < largeNRows[i-1].bionMinimum);
}
for (const row of evidence.semiclassicalPhysicalScale.unitPrefactorRows) {
  const ratio = row.lambdaNL**(5/6)*Math.abs(Math.log(row.lambdaNL))**(9/11);
  assert.ok(close(ratio, row.mGammaOverLambda));
}
assert.ok(evidence.semiclassicalPhysicalScale.unitPrefactorRows.at(-1).mGammaOverLambda <
  evidence.semiclassicalPhysicalScale.unitPrefactorRows[0].mGammaOverLambda);
assert.match(evidence.generalAffineSpectrum.modeMeaning, /k=0 is the decoupled common-shift photon/);
assert.match(evidence.semiclassicalPhysicalScale.consequence, /finite controlled L0/);

assert.ok(evidence.continuityGate.supported.length >= 4);
assert.ok(evidence.continuityGate.notProved.length >= 6);
assert.match(evidence.continuityGate.necessaryUniformStatement, /Delta_star>0/);
assert.match(evidence.continuityGate.absenceOfOrderParameter, /not a spectral inequality/);
assert.match(evidence.mechanisms.qcdAdjointTemplate.separation, /subleading template in pure deformed Yang-Mills/);
assert.match(evidence.spin23Boundary.gravityConstraint, /massless spin-2/);

console.log("Semiclassical continuity mass-gap gate: PASS");
console.log("  SU(2): monopole spectrum {0,4}; bion spectrum {0,16}; combined gap^2="+evidence.combinedNumericalWitness.su2Eigenvalues[1]);
console.log("  SU(3): monopole spectrum {0,3,3}; bion spectrum {0,9,9}; combined gap^2="+evidence.combinedNumericalWitness.su3Eigenvalues[1]);
console.log("  large-N witness: lambda_min(N=16)="+evidence.generalAffineSpectrum.minimumRows.at(-1).monopoleMinimum.toFixed(6));
console.log("  small-L witness: m_gamma/Lambda="+evidence.semiclassicalPhysicalScale.unitPrefactorRows.at(-1).mGammaOverLambda.toExponential(6)+" at Lambda*N*L=1e-8");
console.log("  controlled small-circle gap remains below the unproved uniform R4 continuity gate");
