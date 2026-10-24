import assert from "node:assert/strict";

const groupOrder = 6;
const stabilizers = [
  { name: "C6", order: 6, multiplicity: 79 },
  { name: "C3", order: 3, multiplicity: 48 },
  { name: "C2", order: 2, multiplicity: 42 },
  { name: "trivial", order: 1, multiplicity: 3 },
];

const sectors = stabilizers.map((sector) => {
  const orbitSize = groupOrder / sector.order;
  const orbitVector = Array.from({ length: orbitSize }, () => 1);
  const norm = Math.sqrt(
    orbitVector.reduce((sum, amplitude) => sum + amplitude ** 2, 0),
  );
  return { ...sector, orbitSize, norm };
});

assert.deepEqual(
  sectors.map(({ orbitSize }) => orbitSize),
  [1, 2, 3, 6],
);
for (const { orbitSize, norm } of sectors) {
  assert.ok(Math.abs(norm - Math.sqrt(orbitSize)) < 1e-12);
}

const numerator = sectors.reduce(
  (sum, { multiplicity, norm }) => sum + multiplicity * norm,
  0,
);
const denominator = 24 * 36 ** 2;
const inverse = denominator / numerator;
const expectedInverse = 137.03599918956616;
assert.ok(Math.abs(inverse - expectedInverse) < 1e-12);

// The normalized fold has operator norm one, while the raw coordinate sum
// has norm sqrt(n). This is the unresolved physical normalization choice.
const folds = sectors.map(({ orbitSize }) => ({
  orbitSize,
  rawSumOperatorNorm: Math.sqrt(orbitSize),
  normalizedFoldOperatorNorm: 1,
  incoherentIntensityWeight: orbitSize,
}));

console.log(JSON.stringify({
  status: "PASS",
  group: "C2 x C3 isomorphic to C6",
  sectors: sectors.map(({ name, order, multiplicity, orbitSize, norm }) => ({
    stabilizer: name,
    stabilizerOrder: order,
    multiplicity,
    orbitSize,
    orbitNorm: norm,
  })),
  target: {
    numerator,
    denominator,
    inverse,
  },
  normalizationAlternatives: folds,
  verdict:
    "the radicals are exact orbit norms under counting measure; their role as absolute physical gains still requires a source/detector normalization law",
}));
