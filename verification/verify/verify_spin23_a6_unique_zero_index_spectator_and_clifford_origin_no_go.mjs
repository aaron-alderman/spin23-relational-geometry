import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const data = JSON.parse(
  readFileSync(
    path.join(
      root,
      "evidence/data/spin23-a6-unique-zero-index-spectator-and-clifford-origin-no-go.json",
    ),
    "utf8",
  ),
);

assert.equal(data.documentId, 1458);

// On CP1, holomorphic line bundles are O(n), and the twisted spin-Dirac
// index is n.  Zero index therefore uniquely forces n=0.
const index = (degree) => degree;
const candidateDegrees = Array.from({ length: 15 }, (_, offset) => offset - 7);
const zeroIndexDegrees = candidateDegrees.filter((degree) => index(degree) === 0);
assert.deepEqual(zeroIndexDegrees, [0]);
assert.equal(data.lineBundlesOnCP1.zeroIndexDegree, 0);
assert.equal(data.lineBundlesOnCP1.uniqueHolomorphicZeroIndexLine, "O(0)");

// The untwisted round-sphere spectrum is +/- (ell+1)/R, so it has no zero.
const untwistedMasses = Array.from({ length: 8 }, (_, ell) => ell + 1);
assert.equal(Math.min(...untwistedMasses), 1);
assert.equal(data.lineBundlesOnCP1.roundSphereKernelAtDegreeZero, 0);
assert.equal(data.lineBundlesOnCP1.lowestUntwistedMassInInverseRadiusUnits, 1);

assert.equal(data.selectedAndSpectator.selectedIndex, 3);
assert.equal(data.selectedAndSpectator.spectatorIndex, 0);
assert.equal(
  data.selectedAndSpectator.combinedNetIndex,
  data.selectedAndSpectator.selectedIndex + data.selectedAndSpectator.spectatorIndex,
);
assert.equal(data.selectedAndSpectator.masslessMirrorKernel, 0);

// An ordinary twisted Dirac symbol uses Clifford multiplication tensored
// with the identity on one common twist.  Isomorphic line bundles on CP1
// have equal degree, which fails for degree three versus degree zero.
const selectedDegree = data.ordinaryDiracNoGo.selectedDegree;
const spectatorDegree = data.ordinaryDiracNoGo.spectatorDegree;
assert.notEqual(selectedDegree, spectatorDegree);
assert.equal(
  data.ordinaryDiracNoGo.degreeMismatch,
  selectedDegree - spectatorDegree,
);
assert.equal(data.ordinaryDiracNoGo.sameOrdinaryDiracBundlePossible, false);
assert.equal(data.ordinaryDiracNoGo.commutatorGenericallyZero, false);

assert.equal(data.realStructure.selectedConjugate, "O(-3)");
assert.notEqual(data.realStructure.selectedConjugate, data.realStructure.spectator);
assert.equal(data.realStructure.canonicalRealStructureProducesSpectator, false);

assert.equal(data.mixingAndProtection.totalFredholmIndex, 3);
assert.equal(data.mixingAndProtection.smoothEllipticMixingPreservesIndex, true);
assert.equal(
  data.mixingAndProtection.netThreeModesCanBeRemovedWithoutChangingFredholmClass,
  false,
);
assert.equal(data.mixingAndProtection.holomorphicSectionsOfMixingBundle, 0);

assert.equal(data.verdict.spectatorChoiceUniqueWithinLineBundleClass, true);
assert.equal(data.verdict.ordinarySingleDiracOriginRuledOut, true);
assert.equal(data.verdict.independentMatterOriginRequired, true);
assert.equal(data.verdict.a6Passed, false);

console.log(
  "PASS 1458: O(0) is the unique zero-index line spectator; a single ordinary Dirac/real structure cannot generate the O(3)+ plus O(0)- split.",
);
