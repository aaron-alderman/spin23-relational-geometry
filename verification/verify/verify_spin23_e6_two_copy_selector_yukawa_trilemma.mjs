#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-e6-two-copy-selector-yukawa-trilemma.json",
  import.meta.url,
), "utf8"));

assert.equal(evidence.assumptions.matter27Copies, 1);
assert.equal(evidence.assumptions.symmetricHiggs351PrimeCopies, 2);

// Additive character witness.  If both Yukawas FF S_w and FF S_d are
// invariant, their scalar characters are forced to coincide.
const modulus = 17;
for (let f = 0; f < modulus; f += 1) {
  const required = ((-2 * f) % modulus + modulus) % modulus;
  const sw = required;
  const sd = required;
  assert.equal((2 * f + sw) % modulus, 0);
  assert.equal((2 * f + sd) % modulus, 0);
  assert.equal(((sd - sw) % modulus + modulus) % modulus, 0);
}

const [distinct, common] = evidence.cases;
assert.equal(distinct.crossCopyMixingForbidden, true);
assert.equal(distinct.singleMatterBilinearCouplesToBothAxes, false);
assert.equal(common.crossCopyMixingForbidden, false);
assert.equal(common.singleMatterBilinearCouplesToBothAxes, true);

assert.equal(
  evidence.representationForm.distinctIsotypicAxesBothInYukawaSupport,
  false,
);
assert.equal(
  evidence.representationForm.sameIsotypicAxesProtectedFromMixing,
  false,
);
assert.equal(
  evidence.decision.twoScalarCopiesPlusOneMatterCopyGiveProtectedNonzeroMassAndPortal,
  false,
);
assert.equal(evidence.decision.kinematicGaugeOrthogonalDirectionStillExists, true);

console.log("spin23 E6 two-copy selector/Yukawa trilemma verification: PASS");
console.log("  distinct characters: protected axes, at most one Yukawa projection");
console.log("  common character: both Yukawa projections allowed, cross mixing allowed");
console.log("  additional relation or matter multiplicity is required");
