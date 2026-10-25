import assert from "node:assert/strict";
import fs from "node:fs";

const load = (relativePath) => JSON.parse(fs.readFileSync(new URL(relativePath, import.meta.url), "utf8"));
const augmentation = load("../../evidence/data/moonshine-order46-centralizer-augmentation-v1.json");
const joined = load("../../evidence/data/moonshine-joined-bridge-map-v1.json");
const ladder = load("../../evidence/data/moonshine-order46-observable-ladder-v1.json");
const fullCentralizer = load("../../evidence/data/moonshine-order23-centralizer-exhaustion-v1.json");

const ab = augmentation.quotients["46AB"];
const cd = augmentation.quotients["46CD"];

assert.equal(ab.monsterCentralizerOrder, joined.centralizerLiftResolution.twoB.rootCentralizerOrderInMonster);
assert.equal(cd.monsterCentralizerOrder, joined.centralizerLiftResolution.twoA.rootCentralizerOrderInMonster);
assert.equal(ab.cyclicRootOrder, joined.order46Junction.rootOrder);
assert.equal(cd.cyclicRootOrder, joined.order46Junction.rootOrder);

assert.equal(ab.quotientOrder, ab.monsterCentralizerOrder / ab.cyclicRootOrder);
assert.equal(cd.quotientOrder, cd.monsterCentralizerOrder / cd.cyclicRootOrder);
assert.equal(ab.quotientOrder, 4);
assert.equal(cd.quotientOrder, 2);
assert.equal(ab.nonidentityCosets, ab.quotientOrder - 1);
assert.equal(cd.nonidentityCosets, cd.quotientOrder - 1);
assert.equal(ab.nonidentityCosets + cd.nonidentityCosets, 4);

// Resolve the quotient orders through the involution-centralizer projections.
assert.equal(ab.centralizerProjectionKernelOrder, ab.monsterCentralizerOrder / ab.conwayImageCentralizerOrder);
assert.equal(ab.quotientOrder, ab.centralizerProjectionKernelOrder / ab.centralParitySubgroupOrder);
assert.equal(cd.babyMonsterImageCentralizerOrder / cd.babyMonsterCyclicSubgroupOrder, cd.quotientOrder);
assert.equal(ab.centralizerProjectionKernelOrder, joined.centralizerLiftResolution.twoB.centralizerProjectionKernelOrder);

// The augmentation starts only after the cyclic trace has been proved
// orientation-blind.  The order-eight kernel lies in the extraspecial
// 2-group, so quotienting by its central involution gives a subgroup of the
// elementary-abelian E/Z and fixes the order-four type as C2^2.
assert.equal(ladder.cyclicOrientationNoGo.orientationRecovered, false);
assert.equal(ab.groupStructure, "C2^2");
assert.equal(cd.groupStructure, "C2 by its order");
assert(ab.structureReason.includes("elementary abelian"));
assert.equal(augmentation.traceTarget.newNonidentityCosetsTotalBeforeIdentifications, 4);
assert(augmentation.traceTarget.transportType.includes("not conjugation"));
assert(augmentation.boundaries.some((entry) => entry.includes("need not give distinct trace functions")));
assert(augmentation.boundaries.some((entry) => entry.includes("cannot be implemented by inner conjugation")));
assert(augmentation.boundaries.some((entry) => entry.includes("not vector-valued or genus-two")));
assert.equal(fullCentralizer.centralizer.structure, "C23 x S4");
assert.equal(fullCentralizer.cyclicReduction.scalarGenusOneCentralizerSearchExhausted, true);
assert.equal(fullCentralizer.insertionClasses.filter((row) => row.order === 2).length, 2);
assert(fullCentralizer.insertionClasses.every((row) => row.seriesEqual));

console.log(JSON.stringify({
  minimalNoncyclicInsertionSpaces: {
    leechRail46AB: {
      quotientOrder: ab.quotientOrder,
      nonidentityCosets: ab.nonidentityCosets,
      source: "order-eight 2B-centralizer kernel modulo <z>",
    },
    fermionicRail46CD: {
      quotientOrder: cd.quotientOrder,
      nonidentityCosets: cd.nonidentityCosets,
      source: "Baby-Monster order-46 centralizer modulo C23",
    },
  },
  newCosetsBeforeIdentifications: 4,
  orientationRecovered: false,
  scalarSearchExhaustedByFullCentralizerCensus: true,
}, null, 2));
console.log("PASS verify_moonshine_order46_centralizer_augmentation");
