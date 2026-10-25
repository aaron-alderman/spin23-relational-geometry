import assert from "node:assert/strict";
import fs from "node:fs";

const load = (relativePath) => JSON.parse(fs.readFileSync(new URL(relativePath, import.meta.url), "utf8"));
const noGo = load("../../evidence/data/moonshine-order23-projective-centralizer-no-go-v1.json");
const exhaustion = load("../../evidence/data/moonshine-order23-centralizer-exhaustion-v1.json");

const gcd = (a0, b0) => {
  let a = a0;
  let b = b0;
  while (b !== 0) [a, b] = [b, a % b];
  return a;
};
const squareSum = (values) => values.reduce((sum, value) => sum + value ** 2, 0);

assert.equal(gcd(...noGo.centralizer.factorOrders), 1);
assert.equal(gcd(
  noGo.anomalyTransgression.monsterAnomalyOrder,
  noGo.anomalyTransgression.twistOrder,
), 1);
assert.equal(noGo.abstractProjectivePossibility.crossTensor, "C23 tensor C2 is trivial");
assert.equal(noGo.abstractProjectivePossibility.schurMultiplierProduct, "C2");
assert.equal(squareSum(noGo.abstractProjectivePossibility.spinIrrepDegrees), 24);

assert.equal(noGo.anomalyTransgression.projectiveClassOnCentralizer, "trivial");
assert.equal(noGo.anomalyTransgression.centralizerAction, "linearisable");

assert.equal(noGo.ordinaryS4.conjugacyClasses, exhaustion.insertionClasses.length);
assert.equal(noGo.ordinaryS4.conjugacyClasses, noGo.ordinaryS4.irrepDegrees.length);
assert.equal(squareSum(noGo.ordinaryS4.irrepDegrees), 24);
assert.deepEqual(
  noGo.ordinaryS4.classTraceFamilies,
  exhaustion.insertionClasses.map((entry) => {
    const [first, second] = entry.monsterClasses;
    return `${first.slice(0, -1)}${first.at(-1)}${second.at(-1)}`;
  }),
);
assert(exhaustion.insertionClasses.every((entry) => entry.seriesEqual));
assert.equal(noGo.ordinaryS4.characterDeterminesRepresentation, true);
assert.equal(noGo.genusOneOutcome.orientationRecovered, false);
assert(noGo.genusOneOutcome.ordinaryVectorValuedCentralizerRepresentation.includes("exhausted"));
assert(noGo.genusOneOutcome.scalarMultiInsertionWordTraces.includes("exhausted"));

console.log(JSON.stringify({
  centralizer: noGo.centralizer.structure,
  abstractSchurMultiplier: noGo.abstractProjectivePossibility.schurMultiplierProduct,
  transgressedProjectiveClass: noGo.anomalyTransgression.projectiveClassOnCentralizer,
  ordinaryIrrepDegrees: noGo.ordinaryS4.irrepDegrees,
  inactiveSpinIrrepDegrees: noGo.abstractProjectivePossibility.spinIrrepDegrees,
  genusOneCentralizerRepresentationOrientationChannels: 0,
}, null, 2));
console.log("PASS verify_moonshine_order23_projective_centralizer_no_go");
