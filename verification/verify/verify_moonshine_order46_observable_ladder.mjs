import assert from "node:assert/strict";
import fs from "node:fs";

const load = (relativePath) => JSON.parse(fs.readFileSync(new URL(relativePath, import.meta.url), "utf8"));
const ladder = load("../../evidence/data/moonshine-order46-observable-ladder-v1.json");
const joined = load("../../evidence/data/moonshine-joined-bridge-map-v1.json");
const moonshine = load("../../evidence/data/moonshine-program-lattice-bridge-v1.json");

const mod = (value, modulus) => ((value % modulus) + modulus) % modulus;
const gcd = (a0, b0) => {
  let a = a0;
  let b = b0;
  while (b !== 0) [a, b] = [b, a % b];
  return a;
};

// Chinese-remainder reconstruction of the order-46 root from its order-23
// square and central involution.
assert.equal(mod(2 * 12 + 23, 46), 1);
assert.equal(ladder.cyclicReconstruction.formula, "h=g^12*z");
assert.equal(46 / gcd(46, 2), 23);
assert.equal(46 / gcd(46, 23), 2);

// The modular matrix has bottom row (2,23), so it transports (1,h) to
// (h^2,h^23) under the stated generalized-moonshine convention.
const gamma = ladder.modularTransport.matrix;
assert.deepEqual(gamma, [[1, 11], [2, 23]]);
assert.equal(gamma[0][0] * gamma[1][1] - gamma[0][1] * gamma[1][0], 1);
assert.deepEqual(ladder.modularTransport.targetPair, ["h^2", "h^23"]);

// Index arithmetic at squarefree level 46.
const gamma0Index = 46 * (1 + 1 / 2) * (1 + 1 / 23);
assert.equal(gamma0Index, 72);
assert.equal(ladder.groupIndices.gamma0_46InPSL2Z, 72);
assert.equal(ladder.groupIndices.gamma0_46Plus23InPSL2Z, 72 / 2);
assert.equal(ladder.groupIndices.gamma0_46PlusInPSL2Z, 72 / 4);
assert.equal(ladder.scalarHierarchy.order46.classPairs["46AB"].psl2Index, 36);
assert.equal(ladder.scalarHierarchy.order46.classPairs["46CD"].psl2Index, 18);

// Cross-ledger class and rail consistency.
assert.deepEqual(ladder.scalarHierarchy.order23.classes, moonshine.order23MoonshineBoundary.monsterClasses);
assert.deepEqual(ladder.scalarHierarchy.order46.classes, joined.order46Junction.allRootClassesAbove23AB);
assert.equal(ladder.scalarHierarchy.order46.classPairs["46AB"].involution, joined.order46Junction.leechInvolutionClass);
assert.equal(ladder.scalarHierarchy.order46.classPairs["46CD"].involution, joined.order46Junction.fermionicInvolutionClass);
assert.equal(ladder.scalarHierarchy.order23.distinctScalarOutputs, 1);
assert.equal(ladder.scalarHierarchy.order46.distinctScalarOutputs, 2);

// Arithmetic alone allows order two, but the Conway--Norton h parameter is
// one for both 46+23 and 46+, so these cyclic classes are non-anomalous.
assert.equal(gcd(ladder.anomalyBoundary.monsterAnomalyOrder, ladder.anomalyBoundary.cyclicChannelOrder), 2);
assert.equal(ladder.anomalyBoundary.arithmeticMaximumRestrictionOrder, 2);
assert.deepEqual(ladder.anomalyBoundary.moonshineAnomalyParameters, {"46AB": 1, "46CD": 1});
assert.equal(ladder.anomalyBoundary.resolvedRestrictionOrder, 1);
assert(ladder.anomalyBoundary.remaining.includes("not a nontrivial cyclic anomaly"));
assert(ladder.physicalBoundary.includes("not real-time dynamics"));

console.log(JSON.stringify({
  reconstruction: "h=(h^2)^12 h^23",
  modularMatrix: gamma,
  scalarOutputs: {
    order23: ladder.scalarHierarchy.order23.distinctScalarOutputs,
    order46: ladder.scalarHierarchy.order46.distinctScalarOutputs,
    possibleOrientedCeiling: 4,
  },
  genusZeroGroups: {
    leechRail46AB: "46+23",
    fermionicRail46CD: "46+",
  },
  arithmeticAnomalyCeiling: 2,
  resolvedCyclicAnomalyOrder: 1,
  normalizationPhasesEvaluated: false,
}, null, 2));
console.log("PASS verify_moonshine_order46_observable_ladder");
