#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-balanced-finite-index-obstruction.json",
  import.meta.url,
), "utf8"));

const finiteIndex = (nPlus, nMinus) => nPlus - nMinus;
const balanced = evidence.balancedCarrier;
assert.equal(finiteIndex(balanced.dimHPlus, balanced.dimHMinus), 0);
assert.equal(balanced.indexForEveryMatrix, 0);
assert.equal(balanced.threeFamilyKernelImpliesIndexThree, false);

// rank-nullity: index=(nPlus-rank)-(nMinus-rank)=nPlus-nMinus.
for (const rank of [0, 1, 17, 47, 48]) {
  const kernel = balanced.dimHPlus - rank;
  const cokernel = balanced.dimHMinus - rank;
  assert.equal(kernel - cokernel, 0);
}

const witness = evidence.unbalancedWitness;
assert.equal(witness.dimHPlus - witness.genericRank, witness.kernelDimension);
assert.equal(witness.dimHMinus - witness.genericRank, witness.cokernelDimension);
assert.equal(witness.kernelDimension - witness.cokernelDimension, witness.index);
assert.equal(finiteIndex(witness.dimHPlus, witness.dimHMinus), 3);
assert.equal(evidence.currentE6Result.kernelDimension, 3 * 16);
assert.equal(evidence.requiredNewData.length, 3);

console.log("spin23 balanced finite-index obstruction verification: PASS");
console.log("  every finite 48-to-48 chiral block has index zero");
console.log("  a 51-to-48 full-rank block supplies the minimal index-three witness");
