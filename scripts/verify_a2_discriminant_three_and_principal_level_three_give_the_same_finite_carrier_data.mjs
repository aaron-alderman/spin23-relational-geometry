import assert from "node:assert/strict";

const G = [[2, -1], [-1, 2]];
const determinant = G[0][0] * G[1][1] - G[0][1] * G[1][0];
assert.equal(determinant, 3);

// G^{-1}=(1/3)[[2,1],[1,2]].
const inverseNumerator = [[2, 1], [1, 2]];
for (let i = 0; i < 2; i += 1) for (let j = 0; j < 2; j += 1) {
  const numerator = G[i][0] * inverseNumerator[0][j] + G[i][1] * inverseNumerator[1][j];
  assert.equal(numerator, i === j ? 3 : 0);
}

// lambda_1=(2 alpha_1+alpha_2)/3 has norm 2/3 and q=lambda^2/2=1/3.
const lambdaNumerator = [2, 1];
const normNumeratorOverNine =
  lambdaNumerator[0] * (G[0][0] * lambdaNumerator[0] + G[0][1] * lambdaNumerator[1]) +
  lambdaNumerator[1] * (G[1][0] * lambdaNumerator[0] + G[1][1] * lambdaNumerator[1]);
assert.equal(normNumeratorOverNine, 6);
const generatorNorm = normNumeratorOverNine / 9;
const generatorQuadraticValue = generatorNorm / 2;
assert.equal(generatorNorm, 2 / 3);
assert.equal(generatorQuadraticValue, 1 / 3);

const discriminantOrder = determinant;
const genus = 2;
const discriminantDimension = discriminantOrder ** genus;
const principalLevel = 3;
const abelianDimension = 2;
const principalDimension = principalLevel ** abelianDimension;
const discriminantExponentOrder = discriminantOrder ** (2 * genus);
const principalExponentOrder = principalLevel ** (2 * abelianDimension);

assert.equal(discriminantDimension, 9);
assert.equal(principalDimension, 9);
assert.equal(discriminantExponentOrder, 81);
assert.equal(principalExponentOrder, 81);

console.log(JSON.stringify({
  protocol: "a2-discriminant-three-vs-principal-chern-level-three/1",
  a2: {
    gram: G,
    determinant,
    inverseGram: "(1/3)[[2,1],[1,2]]",
    discriminantGroup: "Z/3Z",
    generator: "lambda_1=(2 alpha_1+alpha_2)/3",
    generatorNorm,
    generatorQuadraticValueModOne: generatorQuadraticValue
  },
  discriminantConstruction: {
    genus,
    stateDimension: discriminantDimension,
    exponentModuleOrder: discriminantExponentOrder
  },
  principalTorusConstruction: {
    complexDimension: abelianDimension,
    chernLevel: principalLevel,
    stateDimension: principalDimension,
    exponentModuleOrder: principalExponentOrder
  },
  sameFiniteCarrierData: true,
  samePhysicalDerivation: false,
  conclusion: "A2 discriminant order three and principal-torus Chern level three yield the same nine-state/F3^4 finite carrier data, but an observable transport is required before they can be identified physically."
}, null, 2));
