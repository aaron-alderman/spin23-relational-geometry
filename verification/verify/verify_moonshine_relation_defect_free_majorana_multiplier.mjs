import assert from "node:assert/strict";
import fs from "node:fs";

const load = (relativePath) => JSON.parse(fs.readFileSync(new URL(relativePath, import.meta.url), "utf8"));
const result = load("../../evidence/data/moonshine-relation-defect-free-majorana-multiplier-v1.json");
const source = load("../../evidence/data/lattice-subroutine-metaplectic-t1-s1-boundary-v1.json");
const seam = load("../../evidence/data/moonshine-relation-defect-seam-permutation-v1.json");
const eta = load("../../evidence/data/moonshine-dedekind-eta-relation-phase-v1.json");

const mod8 = (value) => ((value % 8) + 8) % 8;
const multiply = (a, b) => [
  [a[0][0] * b[0][0] + a[0][1] * b[1][0], a[0][0] * b[0][1] + a[0][1] * b[1][1]],
  [a[1][0] * b[0][0] + a[1][1] * b[1][0], a[1][0] * b[0][1] + a[1][1] * b[1][1]],
];
const inverse = (a) => [[a[1][1], -a[0][1]], [-a[1][0], a[0][0]]];
const power = (a, exponent) => {
  if (exponent < 0) return power(inverse(a), -exponent);
  let output = [[1, 0], [0, 1]];
  let base = a;
  let n = exponent;
  while (n > 0) {
    if (n % 2 === 1) output = multiply(output, base);
    base = multiply(base, base);
    n = Math.floor(n / 2);
  }
  return output;
};

const matrixGenerators = {
  S: [[0, 1], [-1, 0]],
  T: [[1, 1], [0, 1]],
};
const wordMatrix = result.generatorConvention.RWord.reduce(
  (matrix, [generator, exponent]) => multiply(matrix, power(matrixGenerators[generator], exponent)),
  [[1, 0], [0, 1]],
);
assert.deepEqual(wordMatrix, result.generatorConvention.RMatrix);

const characteristics = seam.evenCharacteristics.map((label) => {
  const [a, b] = label.split("|");
  return [Number(a[0]), Number(a[1]), Number(b[0]), Number(b[1])];
});
const label = ([a1, a2, b1, b2]) => String(a1) + String(a2) + "|" + String(b1) + String(b2);
const byLabel = new Map(characteristics.map((entry, index) => [label(entry), index]));

const generatorAction = {
  T: ([a1, a2, b1, b2]) => ({
    target: [a1, a2, (b1 + a1 + 1) % 2, b2],
    exponent: a1,
  }),
  S: ([a1, a2, b1, b2]) => ({
    target: [b1, a2, a1, b2],
    exponent: 2 * a1 * b1,
  }),
};
assert.equal(source.convention.T1Exponent.includes("a1"), true);
assert.equal(source.convention.S1Exponent.includes("2*a1*b1"), true);

const applyGenerator = (state, generator, direction) => {
  if (direction === 1) {
    const next = generatorAction[generator](state.characteristic);
    return {characteristic: next.target, exponent: mod8(state.exponent + next.exponent)};
  }
  for (const candidate of characteristics) {
    const next = generatorAction[generator](candidate);
    if (label(next.target) === label(state.characteristic)) {
      return {characteristic: candidate, exponent: mod8(state.exponent - next.exponent)};
    }
  }
  throw new Error("inverse characteristic image not found");
};
const applyPower = (state, generator, exponent) => {
  const direction = exponent >= 0 ? 1 : -1;
  let output = state;
  for (let i = 0; i < Math.abs(exponent); i += 1) {
    output = applyGenerator(output, generator, direction);
  }
  return output;
};
const inverseWord = (word) => [...word].reverse().map(([generator, exponent]) => [generator, -exponent]);
const kWord = [
  ["S", 2],
  ...Array.from({length: 11}, () => inverseWord(result.generatorConvention.RWord)).flat(),
];
const applyWord = (characteristic, word) => [...word].reverse().reduce(
  (state, [generator, exponent]) => applyPower(state, generator, exponent),
  {characteristic, exponent: 0},
);

const action = characteristics.map((characteristic) => applyWord(characteristic, kWord));
const materialized = action.map((entry, index) => ({
  source: seam.evenCharacteristics[index],
  target: label(entry.characteristic),
  exponent: entry.exponent,
}));
assert.deepEqual(materialized, result.reducedAction);

const seen = new Set();
const cycleProducts = [];
const fixedExponents = [];
for (let start = 0; start < action.length; start += 1) {
  if (seen.has(start)) continue;
  let cursor = start;
  let exponent = 0;
  let length = 0;
  while (!seen.has(cursor)) {
    seen.add(cursor);
    exponent = mod8(exponent + action[cursor].exponent);
    cursor = byLabel.get(label(action[cursor].characteristic));
    length += 1;
  }
  if (length === 1) fixedExponents.push(exponent);
  else cycleProducts.push(exponent);
}
assert.deepEqual(cycleProducts, result.reducedCycleData.threeCycleProducts);
assert.deepEqual(fixedExponents, [result.reducedCycleData.fixedExponent]);
assert.equal(mod8(action.reduce((sum, entry) => sum + entry.exponent, 0)), result.reducedCycleData.determinantExponent);

const common = result.generatorConvention.commonEtaExponentOnK;
assert.equal(eta.relationDefect.phaseExponentModulo24 / 3, common);
assert.deepEqual(
  cycleProducts.map((exponent) => mod8(exponent + 3 * common)),
  result.etaNormalizedCycleData.threeCycleProducts,
);
assert.equal(mod8(fixedExponents[0] + common), result.etaNormalizedCycleData.fixedExponent);
assert.equal(
  mod8(result.reducedCycleData.determinantExponent + characteristics.length * common),
  result.etaNormalizedCycleData.determinantExponent,
);
assert.equal(seam.quotients.permutationSign, result.interpretation.permutationSign);

console.log(JSON.stringify({
  RWordVerified: true,
  reducedCycleProducts: result.reducedCycleData.threeCycleProducts,
  reducedFixedExponent: result.reducedCycleData.fixedExponent,
  etaNormalizedCycleProducts: result.etaNormalizedCycleData.threeCycleProducts,
  etaNormalizedFixedExponent: result.etaNormalizedCycleData.fixedExponent,
  etaNormalizedDeterminant: result.etaNormalizedCycleData.determinant,
  remaining: result.nextTest,
}, null, 2));
console.log("PASS verify_moonshine_relation_defect_free_majorana_multiplier");
