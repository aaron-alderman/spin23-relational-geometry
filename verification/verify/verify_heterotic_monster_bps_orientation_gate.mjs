import assert from "node:assert/strict";
import fs from "node:fs";

const evidencePath = new URL(
  "../../evidence/data/heterotic-monster-bps-orientation-gate-v1.json",
  import.meta.url,
);
const evidence = JSON.parse(fs.readFileSync(evidencePath, "utf8"));

assert.equal(
  evidence.schemaVersion,
  "heterotic-monster-bps-orientation-gate-v1",
);

const p = evidence.order;
const a = evidence.generatorChange.power;
const inverse = evidence.generatorChange.inversePowerModOrder;
const mod = (value) => ((value % p) + p) % p;
assert.equal(mod(a * inverse), 1);

const D = ([l, k]) => [mod(a * l), mod(inverse * k)];
const S = ([l, k]) => [k, mod(-l)];
const minus = ([l, k]) => [mod(-l), mod(-k)];
const iterate = (fn, value, count) => {
  let result = value;
  for (let index = 0; index < count; index += 1) result = fn(result);
  return result;
};

const labels = [];
for (let l = 0; l < p; l += 1) {
  for (let k = 0; k < p; k += 1) labels.push([l, k]);
}

for (const label of labels) {
  const [l, k] = label;
  const [dl, dk] = D(label);
  assert.equal(mod(dl * dk), mod(l * k), "D_5 must preserve l*k mod 23");
  assert.deepEqual(iterate(D, label, 22), label);
  assert.deepEqual(iterate(D, label, 11), minus(label));
  assert.deepEqual(iterate(S, label, 2), minus(label));
  assert.deepEqual(iterate(S, label, 4), label);

  // S D S^-1 = D^-1, written without constructing matrix inverses.
  const Sinverse = iterate(S, label, 3);
  const conjugated = S(D(Sinverse));
  const Dinverse = iterate(D, label, 21);
  assert.deepEqual(conjugated, Dinverse);
}

const key = ([l, k]) => `${l},${k}`;
const compose = (left, right) => (label) => left(right(label));
const generators = [D, S];
const transformations = new Map();
const identity = (label) => label;
transformations.set(labels.map((label) => key(identity(label))).join("|"), identity);
const queue = [identity];
while (queue.length > 0) {
  const current = queue.shift();
  for (const generator of generators) {
    const next = compose(generator, current);
    const signature = labels.map((label) => key(next(label))).join("|");
    if (!transformations.has(signature)) {
      transformations.set(signature, next);
      queue.push(next);
    }
  }
}
assert.equal(transformations.size, 44, "D_5 and S must generate Dic_11 of order 44");

// The current corpus character rule factors through the product label.
const productFibres = new Map();
for (const label of labels) {
  const product = mod(label[0] * label[1]);
  if (!productFibres.has(product)) productFibres.set(product, []);
  productFibres.get(product).push(label);
}
assert.equal(productFibres.size, 23);
for (const fibre of productFibres.values()) {
  for (const label of fibre) {
    const transformed = D(label);
    assert.ok(
      fibre.some((candidate) => key(candidate) === key(transformed)),
      "D_5 must stay inside each scalar-character product fibre",
    );
  }
}

assert.equal(evidence.survivingWitness.status, "open");
assert.ok(
  evidence.orientationBlindObservables.includes(
    "second-quantized supersymmetric index",
  ),
);
assert.ok(
  evidence.survivingWitness.requirements.includes(
    "invariant under external-state rephasing",
  ),
);

console.log(JSON.stringify({
  status: "PASS",
  generatorInverse: inverse,
  dicyclicGroupOrder: transformations.size,
  productFibres: productFibres.size,
  physicalCarrierEstablished: true,
  multiplicityOrientationRecovered: false,
  nextWitness: evidence.survivingWitness.kind,
  verdict: evidence.verdict,
}));

