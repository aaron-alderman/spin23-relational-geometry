import assert from "node:assert/strict";
import fs from "node:fs";

const evidencePath = new URL(
  "../../evidence/data/leech-orbifold-symmetry-enrichment-witness-v1.json",
  import.meta.url,
);
const evidence = JSON.parse(fs.readFileSync(evidencePath, "utf8"));
assert.equal(evidence.schemaVersion, "leech-orbifold-symmetry-enrichment-witness-v1");

const N = evidence.finiteClockToy.dimension;
const mod = (value) => ((value % N) + N) % N;
const translation = Array.from({ length: N }, (_, label) => mod(label + 1));
const translationInverse = Array.from({ length: N }, (_, label) => mod(label - 1));
const inversion = Array.from({ length: N }, (_, label) => mod(-label));
const identity = Array.from({ length: N }, (_, label) => label);
const compose = (left, right) => right.map((label) => left[label]);
const inversePermutation = (permutation) => {
  const inverse = Array(permutation.length);
  permutation.forEach((image, preimage) => { inverse[image] = preimage; });
  return inverse;
};
const conjugate = (operator, by) => compose(compose(by, operator), inversePermutation(by));
assert.deepEqual(conjugate(translation, inversion), translationInverse);
assert.deepEqual(conjugate(translation, identity), translation);

const tracePermutation = (permutation) =>
  permutation.reduce((count, image, index) => count + (image === index ? 1 : 0), 0);
const commutator = (branch) =>
  compose(compose(compose(branch, translation), inversePermutation(branch)), translationInverse);
const enrichedWitness = tracePermutation(commutator(inversion)) / N;
const factorizedWitness = tracePermutation(commutator(identity)) / N;
assert.equal(enrichedWitness, evidence.finiteClockToy.enrichedWitness);
assert.equal(factorizedWitness, evidence.finiteClockToy.factorizedWitness);

let fixed = 0;
let pairs = 0;
const seen = new Set();
for (let label = 0; label < N; label += 1) {
  if (seen.has(label)) continue;
  const image = inversion[label];
  seen.add(label);
  seen.add(image);
  if (image === label) fixed += 1;
  else pairs += 1;
}
assert.equal(fixed, evidence.finiteClockToy.fixedLabelsUnderInversion);
assert.equal(pairs, evidence.finiteClockToy.twoCyclesUnderInversion);
assert.equal(fixed + 2 * pairs, N);
assert.ok(evidence.scope.notClaimed.includes("23AB"));

console.log(JSON.stringify({
  status: "PASS",
  dimension: N,
  enrichedConjugation: "P T P^-1 = T^-1",
  enrichedWitness,
  factorizedWitness,
  inversionOrbits: { fixed, pairs },
  promotionGate: evidence.promotionGate,
}));
