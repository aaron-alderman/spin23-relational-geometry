#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-complete-quadratic-axial-torsion-no-go.json",
  import.meta.url,
), "utf8"));

const values = evidence.finiteScan.values;
let points = 0;
let scalarHealthyPoints = 0;
let vectorHealthyPoints = 0;
let bothHealthyPoints = 0;
let positiveMassBothButScalarGhostPoints = 0;

for (const a of values) {
  for (const b of values) {
    for (const z of values) {
      points += 1;
      const m0Squared = a/b;
      const m1Squared = -a/z;
      const scalarHealthy = a > 0 && m0Squared > 0;
      const vectorHealthy = z > 0 && m1Squared > 0;
      const bothHealthy = scalarHealthy && vectorHealthy;
      const positiveMassBothButScalarGhost = m0Squared > 0 && m1Squared > 0 && a < 0 && z > 0;
      scalarHealthyPoints += Number(scalarHealthy);
      vectorHealthyPoints += Number(vectorHealthy);
      bothHealthyPoints += Number(bothHealthy);
      positiveMassBothButScalarGhostPoints += Number(positiveMassBothButScalarGhost);
    }
  }
}

assert.equal(points, evidence.finiteScan.points);
assert.equal(scalarHealthyPoints, evidence.finiteScan.scalarHealthyPoints);
assert.equal(vectorHealthyPoints, evidence.finiteScan.vectorHealthyPoints);
assert.equal(bothHealthyPoints, evidence.finiteScan.bothHealthyPoints);
assert.equal(positiveMassBothButScalarGhostPoints, evidence.finiteScan.positiveMassBothButScalarGhostPoints);

// Analytic incompatibility: scalar health contains a>0; vector health contains a<0.
assert.equal(bothHealthyPoints, 0);

// Finite representatives of the two mutually exclusive healthy surfaces.
const scalarPoint = { a: 2, b: 1, z: 1 };
assert.equal(scalarPoint.a/scalarPoint.b, 2);
assert.equal(-scalarPoint.a/scalarPoint.z, -2); // transverse tachyon

const vectorPoint = { a: -2, b: -1, z: 1 };
assert.equal(-vectorPoint.a/vectorPoint.z, 2);
assert.equal(vectorPoint.a/vectorPoint.b, 2);
assert.ok(vectorPoint.a < 0); // longitudinal kinetic norm is negative

const constraints = evidence.constraintCounts;
assert.equal((8 - constraints.z_zero_scalar_surface.secondClassConstraints)/2, 1);
assert.equal((8 - constraints.b_zero_proca_surface.secondClassConstraints)/2, 3);
assert.equal((8 - constraints.bz_zero_auxiliary_surface.secondClassConstraints)/2, 0);
assert.equal(constraints.generic_bz_nonzero.velocityHessianRank, 4);
assert.equal(constraints.generic_bz_nonzero.physicalConfigurationDegrees, 4);

console.log("Spin(2,3) complete quadratic axial-torsion gate: PASS");
console.log(`  finite sign scan: ${points} points; scalar healthy=${scalarHealthyPoints}; vector healthy=${vectorHealthyPoints}; both=${bothHealthyPoints}`);
console.log(`  positive masses but scalar ghost: ${positiveMassBothButScalarGhostPoints} points`);
console.log("  analytic obstruction: healthy 0- requires a>0; healthy massive 1 requires a<0");
console.log("  surviving surfaces: z=0 healthy scalar EFT or b=0 healthy Proca, never both as an open region");
