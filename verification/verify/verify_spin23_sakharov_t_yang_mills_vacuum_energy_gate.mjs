#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-sakharov-t-yang-mills-vacuum-energy-gate.json",
  import.meta.url,
), "utf8"));

// Sakharov truth table: the three standard conditions are jointly necessary,
// not a claim that satisfying them is sufficient.
let admittedRows = 0;
for (const bViolation of [false, true]) {
  for (const cpViolation of [false, true]) {
    for (const outOfEquilibrium of [false, true]) {
      admittedRows += Number(bViolation && cpViolation && outOfEquilibrium);
    }
  }
}
assert.equal(admittedRows, 1);
assert.equal(evidence.sakharov.necessaryConditions.length, 3);

const conversion = (Nf, NH) => (8*Nf+4*NH)/(22*Nf+13*NH);
assert.ok(Math.abs(conversion(3, 1)-28/79) < 1e-15);
assert.ok(Math.abs(conversion(3, 2)-8/23) < 1e-15);

// y1=(1,1), y2=(1,i), so y1^dagger y2=1+i and Im[(...)^2]=2.
const y1 = [[1, 0], [1, 0]];
const y2 = [[1, 0], [0, 1]];
let innerRe = 0;
let innerIm = 0;
for (let k = 0; k < y1.length; k += 1) {
  innerRe += y1[k][0]*y2[k][0] + y1[k][1]*y2[k][1];
  innerIm += y1[k][0]*y2[k][1] - y1[k][1]*y2[k][0];
}
const imaginarySquare = 2*innerRe*innerIm;
assert.equal(innerRe, 1);
assert.equal(innerIm, 1);
assert.equal(imaginarySquare, evidence.toyLeptogenesisInvariant.imaginarySquare);

assert.equal(evidence.yangMillsQft.standardModelGaugeAlgebraDimension, 8+3+1);
assert.equal(evidence.yangMillsQft.quantumAdmission.length, 6);
assert.ok(evidence.yangMillsQft.adsGeometricCosmologicalConstant.includes("-3/ell^2"));

// Recheck the claim-1581 radial witness and expose its arbitrary additive
// vacuum-energy constant.
const V0 = (x, y, z) => -5*x-7*y+2*z+2*x*x+3*y*y+4*z*z+x*y+0.5*x*z-0.25*y*z;
const gradAtWitness = [
  -5+4+1,
  -7+6+1,
  2+0.5-0.25,
];
assert.deepEqual(gradAtWitness, [0, 0, 2.25]);
assert.equal(V0(1, 1, 0), evidence.vacuumEnergy.reducedPotentialWitness.valueBeforeConstant);

const constants = evidence.vacuumEnergy.reducedPotentialWitness.additiveConstants;
const shifted = constants.map((constant) => V0(1, 1, 0)+constant);
assert.deepEqual(shifted, evidence.vacuumEnergy.reducedPotentialWitness.shiftedVacuumValues);

// The Hessian is independent of every additive constant and remains positive.
const leadingMinors = [4, 4*6-1, 182];
assert.ok(leadingMinors.every((minor) => minor > 0));
assert.equal(evidence.timeReversal.notEquivalentTo.length, 4);

console.log("Spin(2,3) Sakharov/T/Yang-Mills/vacuum-energy gate verification: PASS");
console.log("  Sakharov conjunction admits one of eight Boolean rows");
console.log("  toy heavy-neutrino invariant Im[(Ydagger Y)_12^2]=2");
console.log("  sphaleron conversion is 28/79 or 8/23 for one or two Higgs doublets");
console.log("  V_min=-6+C while the vacuum and Hessian are unchanged");
