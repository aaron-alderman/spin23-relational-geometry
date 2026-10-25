import assert from "node:assert/strict";
import fs from "node:fs";

const ledger = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/moonshine-order23-centralizer-exhaustion-v1.json", import.meta.url),
  "utf8",
));

const factorial = (n) => n < 2 ? 1 : n * factorial(n - 1);
const permutations = (xs) => xs.length === 0
  ? [[]]
  : xs.flatMap((x, i) => permutations(xs.filter((_, j) => i !== j)).map((tail) => [x, ...tail]));
const compose = (p, q) => q.map((_, i) => p[q[i]]);
const inverse = (p) => {
  const out = Array(p.length);
  p.forEach((value, i) => { out[value] = i; });
  return out;
};
const conjugate = (x, by) => compose(compose(by, x), inverse(by));
const cycleType = (p) => {
  const seen = new Set();
  const lengths = [];
  for (let i = 0; i < p.length; i += 1) {
    if (seen.has(i)) continue;
    let j = i;
    let length = 0;
    do { seen.add(j); j = p[j]; length += 1; } while (!seen.has(j));
    if (length > 1) lengths.push(length);
  }
  return lengths.sort((a, b) => b - a).join("") || "identity";
};

const s4 = permutations([0, 1, 2, 3]);
assert.equal(s4.length, factorial(4));
const expected = {
  identity: {type: "identity", order: 1},
  "22": {type: "double_transposition", order: 2},
  "2": {type: "transposition", order: 2},
  "3": {type: "three_cycle", order: 3},
  "4": {type: "four_cycle", order: 4},
};

for (const [shape, descriptor] of Object.entries(expected)) {
  const elements = s4.filter((p) => cycleType(p) === shape);
  const representative = elements[0];
  const centralizer = s4.filter((p) => compose(p, representative).join() === compose(representative, p).join());
  const row = ledger.insertionClasses.find((entry) => entry.type === descriptor.type);
  assert(row);
  assert.equal(row.classSize, elements.length);
  assert.equal(row.centralizerOrderInS4, centralizer.length);
  assert.equal(row.order, descriptor.order);
  assert.equal(row.productOrder, 23 * descriptor.order);
  assert.equal(row.classSize * row.centralizerOrderInS4, 24);
  assert(row.seriesEqual);
  for (const p of elements) assert.equal(cycleType(conjugate(p, s4[7])), shape);
}

assert.equal(ledger.centralizer.monsterOrder, 23 * 24);
assert.equal(ledger.insertionClasses.reduce((sum, row) => sum + row.classSize, 0), 24);
assert.deepEqual(ledger.insertionClasses.map((row) => row.productOrder), [23, 46, 46, 69, 92]);
assert.equal(ledger.cyclicReduction.orientationSensitiveScalarPairs, 0);
assert.equal(ledger.cyclicReduction.scalarGenusOneCentralizerSearchExhausted, true);
assert.equal(ledger.powerMap.innerConjugation, false);
assert.equal(ledger.powerMap.normalizerImageOrder, 11);

console.log(JSON.stringify({
  centralizer: ledger.centralizer.structure,
  insertionClassSizes: ledger.insertionClasses.map((row) => row.classSize),
  productOrders: ledger.insertionClasses.map((row) => row.productOrder),
  scalarOrientationChannels: ledger.cyclicReduction.orientationSensitiveScalarPairs,
}, null, 2));
console.log("PASS verify_moonshine_order23_centralizer_exhaustion");

