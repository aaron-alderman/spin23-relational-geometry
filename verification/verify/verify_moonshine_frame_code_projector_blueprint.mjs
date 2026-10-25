import assert from "node:assert/strict";
import fs from "node:fs";

const evidencePath = new URL(
  "../../evidence/data/moonshine-frame-code-projector-blueprint-v1.json",
  import.meta.url,
);
const evidence = JSON.parse(fs.readFileSync(evidencePath, "utf8"));
assert.equal(evidence.schemaVersion, "moonshine-frame-code-projector-blueprint-v1");

const length = 48;
const rows = [];
rows.push(Array.from({ length }, (_, i) => i < 16 ? 1 : 0));
rows.push(Array.from({ length }, (_, i) => i >= 32 ? 1 : 0));
for (let basis = 0; basis < 5; basis += 1) {
  rows.push(Array.from({ length }, (_, i) => {
    const point = i % 16;
    return basis === 0 ? 1 : (point >> (basis - 1)) & 1;
  }));
}

const weight = (word) => word.reduce((sum, bit) => sum + bit, 0);
const generatorWeights = rows.map(weight);
assert.deepEqual(generatorWeights, evidence.codes.chosenDGeneratorWeights);
assert.equal(generatorWeights.reduce((a, b) => a + b, 0), evidence.digitalProjector.naiveDataAncillaEntanglingGatesPerRound);

const dHistogram = new Map();
for (let mask = 0; mask < 2 ** rows.length; mask += 1) {
  const word = Array(length).fill(0);
  for (let row = 0; row < rows.length; row += 1) {
    if ((mask >> row) & 1) {
      for (let column = 0; column < length; column += 1) word[column] ^= rows[row][column];
    }
  }
  const w = weight(word);
  dHistogram.set(w, (dHistogram.get(w) ?? 0) + 1);
}
assert.deepEqual(Object.fromEntries(dHistogram), evidence.codes.DweightEnumerator);
assert.equal([...dHistogram.values()].reduce((a, b) => a + b, 0), 2 ** evidence.codes.Ddimension);
assert.ok([...dHistogram.keys()].every((w) => w % 8 === 0));

const choose = (n, k) => {
  if (k < 0 || k > n) return 0;
  let result = 1;
  for (let i = 1; i <= Math.min(k, n - k); i += 1) result = result * (n - i + 1) / i;
  return Math.round(result);
};
const krawtchouk = (degree, w) => {
  let sum = 0;
  for (let j = 0; j <= degree; j += 1) {
    sum += (j % 2 ? -1 : 1) * choose(w, j) * choose(length - w, degree - j);
  }
  return sum;
};

const cHistogram = {};
for (let degree = 0; degree <= length; degree += 1) {
  let sum = 0;
  for (const [w, count] of dHistogram) sum += count * krawtchouk(degree, w);
  const coefficient = Math.round(sum / 2 ** evidence.codes.Ddimension);
  if (coefficient !== 0) cHistogram[degree] = coefficient;
}
assert.deepEqual(cHistogram, evidence.codes.CweightEnumerator);
assert.equal(Object.values(cHistogram).reduce((a, b) => a + b, 0), 2 ** evidence.codes.Cdimension);
assert.equal(Math.min(...Object.keys(cHistogram).map(Number).filter((w) => w > 0)), evidence.codes.CminimumWeight);
assert.equal(cHistogram[4], evidence.codes.CweightFourWords);

assert.equal(evidence.digitalProjector.independentParityChecks, evidence.codes.Ddimension);
assert.equal(evidence.digitalProjector.projectorTermCount, 2 ** evidence.codes.Ddimension);
assert.equal(evidence.digitalProjector.projectedComputationalDimension, 2 ** evidence.codes.Cdimension);
assert.ok(evidence.implementationStages.some((stage) => stage.id === "C2" && stage.status.includes("open")));

console.log(JSON.stringify({
  status: "PASS",
  DweightEnumerator: Object.fromEntries(dHistogram),
  Cdimension: evidence.codes.Cdimension,
  CminimumWeight: evidence.codes.CminimumWeight,
  CweightFourWords: evidence.codes.CweightFourWords,
  parityChecks: evidence.digitalProjector.independentParityChecks,
  naiveEntanglingGatesPerRound: evidence.digitalProjector.naiveDataAncillaEntanglingGatesPerRound,
  openStages: evidence.implementationStages.filter((stage) => stage.status.includes("open")).map((stage) => stage.id),
}));
