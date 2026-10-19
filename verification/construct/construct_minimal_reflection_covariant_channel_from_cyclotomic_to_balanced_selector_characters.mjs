import assert from 'node:assert/strict';

const omega = { re: -0.5, im: Math.sqrt(3) / 2 };
const phase = q => q === 0 ? [1, 0] : q === 1 ? [omega.re, omega.im] : [omega.re, -omega.im];
const csub = ([a, b], [c, d]) => [a - c, b - d];
const cmul = ([a, b], [c, d]) => [a * c - b * d, a * d + b * c];
const cabs = ([a, b]) => Math.hypot(a, b);

const sourceMultiplicities = [0, 3, 3];
const targetMultiplicities = [2, 2, 2];
const tensorMultiplicities = environment => [0, 1, 2].map(q =>
  [0, 1, 2].reduce((sum, a) => sum + targetMultiplicities[a] * environment[(q - a + 3) % 3], 0));
const embeds = environment => tensorMultiplicities(environment).every((capacity, q) => capacity >= sourceMultiplicities[q]);

const reflectionStableEnvironments = [];
for (let e0 = 0; e0 <= 2; e0++) for (let e1 = 0; e1 <= 2; e1++) {
  const environment = [e0, e1, e1];
  if (environment.reduce((a, b) => a + b, 0) <= 2) reflectionStableEnvironments.push({ environment, capacity: tensorMultiplicities(environment), embeds: embeds(environment) });
}
assert.equal(reflectionStableEnvironments.filter(x => x.environment.reduce((a, b) => a + b, 0) < 2 && x.embeds).length, 0);
assert.ok(embeds([0, 1, 1]));
assert.ok(embeds([2, 0, 0]));

// Only the nontrivial doublet can route source charges 1 and 2 into target charge 0.
const canActivateCommonMode = environment => environment[1] > 0 && environment[2] > 0;
const minimalCommonModeEnvironments = reflectionStableEnvironments.filter(x =>
  x.environment.reduce((a, b) => a + b, 0) === 2 && x.embeds && canActivateCommonMode(x.environment));
assert.deepEqual(minimalCommonModeEnvironments.map(x => x.environment), [[0, 1, 1]]);

// Bases: source (q=1,2; i=0,1,2), target (a=0,1,2; mu=0,1), environment b=1,2.
const sourceBasis = [1, 2].flatMap(q => [0, 1, 2].map(i => ({ q, i })));
const targetBasis = [0, 1, 2].flatMap(a => [0, 1].map(mu => ({ a, mu })));
const environmentBasis = [1, 2].map(b => ({ b }));
const productBasis = targetBasis.flatMap((target, ti) => environmentBasis.map((environment, ei) => ({ ...target, ...environment, ti, ei })));
const indexProduct = (a, mu, b) => productBasis.findIndex(x => x.a === a && x.mu === mu && x.b === b);
const V = Array.from({ length: 12 }, () => Array(6).fill(0));
const images = [
  [0, 0, 1], [2, 0, 2], [2, 1, 2],
  [0, 1, 2], [1, 0, 1], [1, 1, 1],
];
images.forEach(([a, mu, b], column) => { V[indexProduct(a, mu, b)][column] = 1; });

const transpose = A => A[0].map((_, j) => A.map(row => row[j]));
const mul = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((sum, x, k) => sum + x * B[k][j], 0)));
const identity = n => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => Number(i === j)));
assert.deepEqual(mul(transpose(V), V), identity(6));

// Character intertwining, checked entrywise with complex phases.
for (let row = 0; row < 12; row++) for (let column = 0; column < 6; column++) if (V[row][column]) {
  const sourceCharge = sourceBasis[column].q;
  const productCharge = (productBasis[row].a + productBasis[row].b) % 3;
  assert.ok(cabs(csub(phase(sourceCharge), phase(productCharge))) < 1e-12);
}

// Reflection: q -> -q; target swaps the two trivial multiplicities and exchanges charges 1,2;
// environment swaps 1,2.  The explicit isometry intertwines these permutations.
const sourceReflection = sourceBasis.map(({ q, i }) => sourceBasis.findIndex(x => x.q === 3 - q && x.i === i));
const targetReflect = ({ a, mu }) => a === 0 ? { a: 0, mu: 1 - mu } : { a: 3 - a, mu };
const productReflection = productBasis.map(({ a, mu, b }) => {
  const target = targetReflect({ a, mu });
  return indexProduct(target.a, target.mu, 3 - b);
});
for (let row = 0; row < 12; row++) for (let column = 0; column < 6; column++) {
  assert.equal(V[productReflection[row]][sourceReflection[column]], V[row][column]);
}

// Partial trace of V (I/6) V^* over the environment is exactly I_6/6.
const outputDiagonal = Array(6).fill(0);
for (let column = 0; column < 6; column++) {
  const row = V.findIndex(vector => vector[column] === 1);
  outputDiagonal[productBasis[row].ti] += 1 / 6;
}
assert.ok(outputDiagonal.every(x => Math.abs(x - 1 / 6) < 1e-12));

const ambientMultiplicities = tensorMultiplicities([0, 1, 1]);
const complementMultiplicities = ambientMultiplicities.map((x, q) => x - sourceMultiplicities[q]);
assert.deepEqual(ambientMultiplicities, [4, 4, 4]);
assert.deepEqual(complementMultiplicities, [4, 1, 1]);

console.log(JSON.stringify({
  protocol: 'minimal-reflection-covariant-cyclotomic-to-selector-channel/1',
  sourceMultiplicities,
  targetMultiplicities,
  reflectionStableEnvironmentCensus: reflectionStableEnvironments,
  minimumEnvironmentDimension: 2,
  uniqueMinimumCommonModeEnvironment: [0, 1, 1],
  explicitIsometry: { sourceDimension: 6, stinespringDimension: 12, reflectionCovariant: true, mapsMaximallyMixedSourceTo: 'I_6/6' },
  stinespringCharacterMultiplicities: ambientMultiplicities,
  orthogonalComplementMultiplicities: complementMultiplicities,
  conclusion: 'The unique minimum reflection-stable environment that both embeds the cyclotomic source and activates the target common mode is the nontrivial C3 doublet. Its 12-dimensional Stinespring representation has exactly the full dilation multiplicities (4,4,4).',
  passed: true,
}, null, 2));
