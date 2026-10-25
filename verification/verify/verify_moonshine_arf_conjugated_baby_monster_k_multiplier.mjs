import assert from "node:assert/strict";
import fs from "node:fs";

const load = (relativePath) => JSON.parse(fs.readFileSync(new URL(relativePath, import.meta.url), "utf8"));
const result = load("../../evidence/data/moonshine-arf-conjugated-baby-monster-k-multiplier-v1.json");
const arfLedger = load("../../evidence/data/moonshine-arf-fourier-baby-monster-reconstruction-v1.json");
const free = load("../../evidence/data/moonshine-relation-defect-free-majorana-multiplier-v1.json");
const seam = load("../../evidence/data/moonshine-relation-defect-seam-permutation-v1.json");
const order46 = load("../../evidence/data/moonshine-order46-observable-ladder-v1.json");

const bits = Array.from({ length: 16 }, (_, n) => [
  (n >> 3) & 1,
  (n >> 2) & 1,
  (n >> 1) & 1,
  n & 1,
]);
const key = (x) => x.join("");
const label = ([a1, a2, b1, b2]) => `${a1}${a2}|${b1}${b2}`;
const index = new Map(bits.map((x, i) => [key(x), i]));
const add = (x, y) => x.map((entry, i) => entry ^ y[i]);
const arf = ([a1, a2, b1, b2]) => (a1 * b1 + a2 * b2) & 1;
const pairing = ([a1, a2, b1, b2], [c1, c2, d1, d2]) => (
  a1 * d1 + a2 * d2 + b1 * c1 + b2 * c2
) & 1;
const multiply = (a, b) => a.map((row) => b[0].map((_, j) => (
  row.reduce((sum, entry, k) => sum + entry * b[k][j], 0) & 1
)));
const act = (matrix, vector) => matrix.map((row) => (
  row.reduce((sum, entry, i) => sum + entry * vector[i], 0) & 1
));

const rho = [0, 0, 0, 0];
const A = bits.map((S) => bits.map((t) => (
  ((arf(add(t, rho)) + arf(rho) + pairing(t, S)) & 1) === 0 ? 1 : -1
)));
const K2 = seam.oneBlockEmbeddingModulo2;
const K2Inverse = multiply(K2, K2);
const backgroundPermutation = bits.map((t) => index.get(key(act(K2Inverse, t))));
const conjugated = A.map((_, i) => A.map((__, j) => (
  A[i].reduce((sum, entry, k) => sum + entry * A[j][backgroundPermutation[k]], 0) / 16
)));

for (const row of conjugated) {
  assert.equal(row.filter((entry) => entry !== 0).length, 1);
  assert.equal(row.find((entry) => entry !== 0), 1);
}

const evenIndices = bits.map((spin, i) => [spin, i]).filter(([spin]) => arf(spin) === 0).map(([, i]) => i);
const totalMap = new Map(evenIndices.map((i) => {
  const j = conjugated[i].findIndex((entry) => entry !== 0);
  return [label(bits[i]), label(bits[j])];
}));
for (const cycle of seam.cycles) {
  for (let i = 0; i < cycle.length; i += 1) {
    assert.equal(totalMap.get(cycle[i]), cycle[(i + 1) % cycle.length]);
  }
}

assert.equal(order46.anomalyBoundary.resolvedRestrictionOrder, 1);
assert.equal(arfLedger.transform.invertible, true);
const etaExponent = free.generatorConvention.commonEtaExponentOnK;
const freeEdges = free.reducedAction.map(({ exponent }) => (exponent + etaExponent) % 8);
const babyEdges = freeEdges.map((exponent) => (8 - exponent) % 8);
const combinedEdges = freeEdges.map((exponent, i) => (exponent + babyEdges[i]) % 8);
assert.deepEqual(freeEdges, result.freeMajoranaAction.edgeExponents);
assert.deepEqual(babyEdges, result.babyMonsterAction.edgeExponents);
assert(combinedEdges.every((exponent) => exponent === 0));

const edgeBySource = new Map(free.reducedAction.map(({ source }, i) => [source, i]));
const cycleSums = (edges) => seam.cycles.map((cycle) => (
  cycle.reduce((sum, source) => sum + edges[edgeBySource.get(source)], 0) % 8
));
assert.deepEqual(cycleSums(freeEdges), [0, 0, 0, 4]);
assert.deepEqual(cycleSums(babyEdges), [0, 0, 0, 4]);
assert.deepEqual(cycleSums(combinedEdges), [0, 0, 0, 0]);
assert.equal(freeEdges.reduce((a, b) => a + b, 0) % 8, 4);
assert.equal(babyEdges.reduce((a, b) => a + b, 0) % 8, 4);
assert.equal(result.conjugatedTotalAction.determinant, "1");
assert.equal(result.implication.freeDeterminantSignSurvivesComplete2A, false);
assert.equal(result.implication.complete2ASectorVectorDetectsK, true);

console.log(JSON.stringify({
  arfConjugationPurePermutation: true,
  evenCycleType: result.conjugatedTotalAction.cycleTypeEven,
  freeCycleExponents: cycleSums(freeEdges),
  babyCycleExponents: cycleSums(babyEdges),
  combinedCycleExponents: cycleSums(combinedEdges),
  freeDeterminant: result.freeMajoranaAction.determinant,
  babyDeterminant: result.babyMonsterAction.determinant,
  complete2ADeterminant: result.conjugatedTotalAction.determinant,
  remaining: result.remaining,
}, null, 2));
console.log("PASS verify_moonshine_arf_conjugated_baby_monster_k_multiplier");
