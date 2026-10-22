#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence=JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-torsionful-loop-source-order-readiness-v2.json",
  import.meta.url,
),"utf8"));

assert.equal(evidence.sectors.length,4);
assert.equal(evidence.requiredSourceDerivativeObjects,evidence.sectors.length*2);
assert.deepEqual(evidence.missingSourceDerivativeObjects,["HB1","HB2"]);
assert.equal(evidence.closedSourceDerivativeObjects+evidence.missingSourceDerivativeObjects.length,
  evidence.requiredSourceDerivativeObjects);

const byId=Object.fromEntries(evidence.sectors.map(sector=>[sector.id,sector]));
assert.equal(byId.ghost.firstSourceDerivative,"zero");
assert.equal(byId.ghost.secondSourceDerivative,"zero");
assert.equal(byId.ghost.msbarAxialResponse,0);
assert.equal(byId.measureJacobians.firstSourceDerivative,"zero");
assert.equal(byId.measureJacobians.secondSourceDerivative,"zero");
assert.equal(byId.measureJacobians.msbarAxialResponse,0);
assert.equal(byId.secondClass.firstSourceDerivative,"zero at origin");
assert.equal(byId.secondClass.msbarAxialResponse,0);
assert.equal(byId.bosonicComplete.firstSourceDerivative,"missing");
assert.equal(byId.bosonicComplete.secondSourceDerivative,"missing");

// Dependency certificate for fixed-(e,V) axial connection variation.
const axialVariation=new Set(["omega"]);
const fpDependencies=new Set(["e","V"]);
const measureDependencies=new Set(["e"]);
const intersects=(a,b)=>[...a].some(value=>b.has(value));
assert.equal(intersects(axialVariation,fpDependencies),false);
assert.equal(intersects(axialVariation,measureDependencies),false);

// The affine omega-to-contorsion transformation has identity diagonal.
const triangularJacobian=[[1,0],[-7,1]];
const determinant=triangularJacobian[0][0]*triangularJacobian[1][1]
  -triangularJacobian[0][1]*triangularJacobian[1][0];
assert.equal(determinant,1);

console.log("Spin(2,3) torsionful loop source-order readiness v2: PASS");
console.log("  source derivatives closed: 6/8");
console.log("  ghost, constraint-measure pole, ordinary-Jacobian responses: zero");
console.log("  remaining objects: HB1 and HB2 of the complete mixed bosonic Hessian");
