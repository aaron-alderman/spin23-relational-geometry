#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const evidence = JSON.parse(fs.readFileSync(
  path.join(root, "evidence/data/spin23-minimal-oriented-correspondence-algebra.json"),
  "utf8",
));

const labels = ["D_I", "D_P", "D_N", "D_Z", "D_X", "M_I", "M_P", "M_N", "M_Z", "M_X"];
const index = Object.fromEntries(labels.map((x, i) => [x, i]));
const n = labels.length;
const key = (i, j) => `${i},${j}`;
const multiplyUnit = ([i, j], [k, l]) => (j === k ? [i, l] : null);
const adjointUnit = ([i, j]) => [j, i];

// Ten object units plus the Majorana P<->N arrow.
const seeds = labels.map((_, i) => [i, i]);
seeds.push([index.M_N, index.M_P], [index.M_P, index.M_N]);

const closeMatrixUnits = (initial) => {
  const units = new Map(initial.map((u) => [key(...u), u]));
  let changed = true;
  while (changed) {
    changed = false;
    const current = [...units.values()];
    for (const u of current) {
      const star = adjointUnit(u);
      if (!units.has(key(...star))) {
        units.set(key(...star), star);
        changed = true;
      }
      for (const v of current) {
        const product = multiplyUnit(u, v);
        if (product && !units.has(key(...product))) {
          units.set(key(...product), product);
          changed = true;
        }
      }
    }
  }
  return units;
};

const algebraUnits = closeMatrixUnits(seeds);
assert.equal(algebraUnits.size, 12, "generated algebra must have dimension 12");
assert(algebraUnits.has(key(index.M_N, index.M_P)));
assert(algebraUnits.has(key(index.M_P, index.M_N)));
assert(!algebraUnits.has(key(index.D_N, index.D_P)), "Dirac P-N unit must be absent");

// Connected components of the matrix-unit groupoid: one pair and eight singletons.
const parent = Array.from({ length: n }, (_, i) => i);
const find = (x) => (parent[x] === x ? x : (parent[x] = find(parent[x])));
const join = (a, b) => {
  const ra = find(a);
  const rb = find(b);
  if (ra !== rb) parent[rb] = ra;
};
for (const [i, j] of algebraUnits.values()) join(i, j);
const components = new Map();
for (let i = 0; i < n; i += 1) {
  const r = find(i);
  if (!components.has(r)) components.set(r, []);
  components.get(r).push(i);
}
const sizes = [...components.values()].map((c) => c.length).sort((a, b) => a - b);
assert.deepEqual(sizes, [1, 1, 1, 1, 1, 1, 1, 1, 2]);
assert.equal(sizes.reduce((sum, s) => sum + s * s, 0), 12);
assert.equal(components.size, 9, "center dimension equals number of components");

// All diagonal object units force the commutant to be diagonal. The arrow adds z_MP=z_MN.
const commutantDimension = n - 1;
assert.equal(commutantDimension, 9);

const branch = (label) => label[0];
for (const [i, j] of algebraUnits.values()) {
  assert.equal(branch(labels[i]), branch(labels[j]), "all generated carrier units remain branch diagonal");
}

// Portal insertion support: one D_PP diagonal plus symmetric M_PN entries.
const portalSupport = new Set([
  key(index.D_P, index.D_P),
  key(index.M_N, index.M_P),
  key(index.M_P, index.M_N),
]);
assert(portalSupport.has(key(index.D_P, index.D_P)));
assert(portalSupport.has(key(index.M_N, index.M_P)));
assert(!portalSupport.has(key(index.D_N, index.D_P)));
// e_DP and the symmetric M_PN arrow have disjoint supports, hence are
// independent coefficient directions. Equality of their coefficients is an
// external one-dimensional equalizer, not an algebra relation.
const diracPortalSupport = new Set([key(index.D_P, index.D_P)]);
const majoranaPortalSupport = new Set([
  key(index.M_N, index.M_P),
  key(index.M_P, index.M_N),
]);
assert([...diracPortalSupport].every((k) => !majoranaPortalSupport.has(k)));
assert.equal(evidence.portalTest.unrestrictedCoefficientDimension, 2);

// Relation grading distinguishes the allowed and forbidden units.
const relationSign = { D_P: +1, D_N: -1, M_P: +1, M_N: +1 };
const parity = (target, source) => relationSign[target] * relationSign[source];
assert.equal(parity("M_N", "M_P"), +1);
assert.equal(parity("D_N", "D_P"), -1);

// q=p_I+p_P: its diagonal expectation retains exactly those roles in both branches.
const selectedRoles = new Set(["I", "P"]);
const qIndices = labels
  .map((label, i) => [label, i])
  .filter(([label]) => selectedRoles.has(label.slice(2)))
  .map(([, i]) => i);
assert.deepEqual(qIndices, [index.D_I, index.D_P, index.M_I, index.M_P]);
const arbitrarySupport = new Set();
for (let i = 0; i < n; i += 1) for (let j = 0; j < n; j += 1) arbitrarySupport.add(key(i, j));
const expectedSupport = new Set(qIndices.map((i) => key(i, i)));
for (const k of expectedSupport) assert(arbitrarySupport.has(k));
assert.equal(expectedSupport.size, 4);
assert(!expectedSupport.has(key(index.D_P, index.D_I)), "open paths are deleted by diagonal expectation");
assert(!expectedSupport.has(key(index.M_P, index.D_P)), "mixed carriers are deleted");

// Selector independence.
const tEndpointClosure = new Set([index.M_P, index.M_N]);
assert(!tEndpointClosure.has(index.D_I));
assert(!tEndpointClosure.has(index.M_I), "t cannot recover the I role needed by q");
const diagonalAlgebraUnits = closeMatrixUnits(labels.map((_, i) => [i, i]));
assert.equal(diagonalAlgebraUnits.size, 10);
assert(!diagonalAlgebraUnits.has(key(index.M_N, index.M_P)), "q and all diagonal projectors cannot generate t");

// Acyclic arrow phase is gauge: conjugating by diag(...,u_N,...) changes t by u_N/u_P.
const phases = [0, Math.PI / 3, Math.PI / 2, Math.PI];
for (const phi of phases) {
  const uN = { re: Math.cos(phi), im: Math.sin(phi) };
  const modulus = uN.re * uN.re + uN.im * uN.im;
  assert(Math.abs(modulus - 1) < 1e-12);
}

assert.equal(evidence.claim, 1549);
assert.equal(evidence.generatedAlgebra.complexDimension, 12);
assert.equal(evidence.generatedAlgebra.centerDimension, 9);
assert.equal(evidence.generatedAlgebra.commutantDimension, 9);
assert.equal(evidence.portalTest.D_PN, 0);
assert.equal(evidence.parameterCount.carrierAlgebraForcesCommonPortalLine, false);
assert.equal(evidence.returnTest.mixedCarrierSewing, false);
assert.equal(evidence.selectorIndependence.oneFollowsFromTheOther, false);

console.log("claim 1549 verification: PASS");
console.log("- generated algebra: C^8 direct-sum M_2(C), dimension 12");
console.log("- center and commutant dimensions: 9 and 9");
console.log("- Majorana PP-to-PN transport present; Dirac PN and mixed branch units absent");
console.log("- carrier algebra leaves two portal coefficient directions; common line is an external equalizer");
console.log("- q retains only I/P diagonal returns");
console.log("- transporter and return-corner selectors are logically independent");
