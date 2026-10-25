import assert from "node:assert/strict";
import fs from "node:fs";

const load = (relativePath) => JSON.parse(fs.readFileSync(new URL(relativePath, import.meta.url), "utf8"));
const gate = load("../../evidence/data/moonshine-order46-galois-orientation-v1.json");
const augmentation = load("../../evidence/data/moonshine-order46-centralizer-augmentation-v1.json");
const ladder = load("../../evidence/data/moonshine-order46-observable-ladder-v1.json");

const gcd = (a0, b0) => {
  let a = a0;
  let b = b0;
  while (b !== 0) [a, b] = [b, a % b];
  return a;
};
const modPow = (base, exponent, modulus) => {
  let result = 1;
  let factor = base % modulus;
  let power = exponent;
  while (power > 0) {
    if (power & 1) result = (result * factor) % modulus;
    factor = (factor * factor) % modulus;
    power >>= 1;
  }
  return result;
};

const modulus = gate.unitArithmetic.modulus;
const units = Array.from({length: modulus}, (_, value) => value)
  .filter((value) => gcd(value, modulus) === 1);
const squares = new Set(units.map((value) => (value * value) % modulus));

assert.equal(units.length, 22);
assert.equal(squares.size, 11);
assert.equal(modPow(5, 22, modulus), 1);
assert.equal(modPow(5, 11, modulus), modulus - 1);
assert.equal(squares.has(5), false);
assert.equal(gate.innerNormalizer.doesNotContainPowerFive, true);

const ab = gate.augmentationActions["46AB"];
const cd = gate.augmentationActions["46CD"];
assert.equal(ab.quotient, augmentation.quotients["46AB"].groupStructure);
assert.equal(cd.quotient, "C2");
assert.equal(gcd(gate.unitArithmetic.squareSubgroupOrder, ab.automorphismGroupOrder), 1);
assert.equal(gcd(gate.unitArithmetic.squareSubgroupOrder, cd.automorphismGroupOrder), 1);
assert.equal(ab.innerC11Action, "trivial");
assert.equal(cd.innerC11Action, "trivial");

const traceCount = 2 * ab.nonidentityLabelsPerOrientedClass
  + 2 * cd.nonidentityLabelsPerOrientedClass;
assert.equal(traceCount, 8);
assert.equal(traceCount, gate.traceInventory.orientedNonidentityTracesMaximum);
assert.equal(ladder.cyclicOrientationNoGo.orientationRecovered, false);
assert(gate.boundaries.some((entry) => entry.includes("not conjugation")));
assert(gate.boundaries.some((entry) => entry.includes("not a real-time")));

console.log(JSON.stringify({
  unitGroupOrder: units.length,
  squareSubgroupOrder: squares.size,
  powerFiveOrder: gate.unitArithmetic.powerFiveOrder,
  powerFiveInsideInnerNormalizerImage: false,
  quotientActions: {
    "46AB": ab.innerC11Action,
    "46CD": cd.innerC11Action,
  },
  maximumNewOrientedTraces: traceCount,
}, null, 2));
console.log("PASS verify_moonshine_order46_galois_orientation");
