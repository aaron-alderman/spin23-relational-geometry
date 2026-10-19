import assert from 'node:assert/strict';

const dims = { O1: 1, O2: 3, H: 2, C: 1, R: 1 };
const offsets = {};
let ambient = 0;
for (const [block, dimension] of Object.entries(dims)) {
  offsets[block] = ambient;
  ambient += dimension;
}

const swap = (block) => block === 'O1' ? 'R' : block === 'R' ? 'O1' : block;
const arrows = [
  ['Q', 'O2', 'H'],
  ['uc', 'C', 'O2'],
  ['dc', 'O1', 'O2'],
  ['L', 'H', 'R'],
  ['ec', 'R', 'C'],
  ['nuc', 'R', 'O1'],
];

const basis = arrows.flatMap(([arrow, targetBlock, sourceBlock]) =>
  Array.from({ length: dims[targetBlock] }, (_, i) =>
    Array.from({ length: dims[sourceBlock] }, (_, j) => ({
      arrow,
      targetBlock,
      sourceBlock,
      target: offsets[targetBlock] + i,
      source: offsets[sourceBlock] + j,
    })),
  ).flat(),
);
assert.equal(basis.length, 16);

const middle = (x) => ({
  target: offsets[swap(x.sourceBlock)] + x.source - offsets[x.sourceBlock],
  source: offsets[swap(x.targetBlock)] + x.target - offsets[x.targetBlock],
});
const multiply = (a, b) => a.source === b.target
  ? { target: a.target, source: b.source }
  : null;
const triple = (x, y, z) => {
  const first = multiply(x, middle(y));
  return first && multiply(first, z);
};
const add = (map, unit) => {
  if (!unit) return;
  const key = `${unit.target}<-${unit.source}`;
  map.set(key, (map.get(key) ?? 0) + 1);
};
const response = (x, y, z) => {
  const out = new Map();
  add(out, triple(x, y, z));
  add(out, triple(z, y, x));
  return out;
};
const normSquared = (map) => [...map.values()].reduce((sum, value) => sum + value * value, 0);

const middleWeights = Object.fromEntries(arrows.map(([arrow]) => {
  const values = basis
    .filter((candidate) => candidate.arrow === arrow)
    .map((candidate) => basis.reduce(
      (outerSum, left) => outerSum + basis.reduce(
        (rightSum, right) => rightSum + normSquared(response(left, candidate, right)),
        0,
      ),
      0,
    ));
  return [arrow, [...new Set(values)]];
}));

for (const [arrow, values] of Object.entries(middleWeights)) {
  assert.equal(values.length, 1, `${arrow} is not sector-scalar`);
}

const sectorWeights = Object.fromEntries(
  Object.entries(middleWeights).map(([arrow, values]) => [arrow, values[0]]),
);
const kernel = Object.entries(sectorWeights)
  .filter(([, weight]) => weight === 0)
  .map(([arrow]) => arrow);

assert.deepEqual(sectorWeights, { Q: 14, uc: 14, dc: 8, L: 2, ec: 6, nuc: 12 });
assert.deepEqual(kernel, []);

console.log(JSON.stringify({
  protocol: 'completed-furey-middle-slot-frame/1',
  basisDimension: basis.length,
  sectorWeights,
  kernel,
  comparison: {
    deduplicatedIncidence: { Q: 5, uc: 5, dc: 1, L: 1, ec: 1, nuc: 0 },
    multiplicityIncidence: { Q: 5, uc: 5, dc: 1, L: 1, ec: 3, nuc: 0 },
  },
  interpretation: 'This computes the basis-independent Hilbert--Schmidt norm of the completed Furey ternary response with the candidate in its distinguished middle slot.',
}, null, 2));
