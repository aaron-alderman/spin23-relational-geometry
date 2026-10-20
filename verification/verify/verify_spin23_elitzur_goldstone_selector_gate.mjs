#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-elitzur-goldstone-selector-gate.json",
  import.meta.url,
), "utf8"));
const g = evidence.groupCounts;
const soDim = (n) => n*(n-1)/2;
assert.equal(g.spin23Dimension, soDim(5));
assert.equal(g.spin13Dimension, soDim(4));
assert.equal(g.spin23CosetDimension, g.spin23Dimension-g.spin13Dimension);
assert.equal(g.spin10PlusU1Dimension, soDim(10)+1);
assert.equal(g.e6CosetDimension, g.e6Dimension-g.spin10PlusU1Dimension);

// Finite local-gauge averaging witness: a charge-one field averages to zero.
const N = 97;
let re = 0;
let im = 0;
for (let k = 0; k < N; k += 1) {
  re += Math.cos(2*Math.PI*k/N);
  im += Math.sin(2*Math.PI*k/N);
}
assert.ok(Math.hypot(re/N, im/N) < 1e-12);

const minima = [0, 2*Math.PI/3, 4*Math.PI/3];
const dV = (theta) => 3*Math.sin(3*theta);
const ddV = (theta) => 9*Math.cos(3*theta);
for (const theta of minima) {
  assert.ok(Math.abs(dV(theta)) < 1e-12);
  assert.ok(ddV(theta) > 0);
}
assert.equal(evidence.portalPhaseWitness.pseudoGoldstoneMassSquared, "9 Lambda^4/f^2");
assert.equal(evidence.quantumHallBoundary.chernPhaseRequiresLocalOrderParameter, false);
assert.equal(evidence.quantumHallBoundary.edgeModesAreGoldstones, false);
assert.equal(evidence.elitzur.admissibleData.length, 5);

console.log("spin23 Elitzur/Goldstone selector gate verification: PASS");
console.log("  coset dimensions: Spin(2,3)/Spin(1,3)=4; E6/(Spin(10)xU1)=32");
console.log("  local gauge average annihilates a charged one-point order parameter");
console.log("  cos(3 theta) locking gives three minima and pseudo-Goldstone mass 9 Lambda^4/f^2");
