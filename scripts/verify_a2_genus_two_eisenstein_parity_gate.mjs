import assert from "node:assert/strict";

const residues = [0, 1, 2];
const qNumerator = (a) => (a * a) % 3;

const anisotropic = residues.slice(1).every((a) => qNumerator(a) !== 0);
assert.equal(anisotropic, true);

const gauss = residues.reduce((sum, a) => {
  const theta = (2 * Math.PI * qNumerator(a)) / 3;
  return { re: sum.re + Math.cos(theta), im: sum.im + Math.sin(theta) };
}, { re: 0, im: 0 });
const normalizedGauss = { re: gauss.re / Math.sqrt(3), im: gauss.im / Math.sqrt(3) };
assert.ok(Math.abs(normalizedGauss.re) < 1e-12);
assert.ok(Math.abs(normalizedGauss.im - 1) < 1e-12);

const signatureMod8 = 2;
const compatibleWeights = [];
for (let l = 0; l <= 12; l += 1) {
  if ((2 * l + signatureMod8) % 4 === 0) compatibleWeights.push(l);
}
assert.deepEqual(compatibleWeights, [1, 3, 5, 7, 9, 11]);
assert.equal(compatibleWeights.filter((l) => l % 2 === 0).length, 0);

const n = 2;
const minimalConvergentCompatibleWeight = compatibleWeights.find((l) => l >= n + 1);
assert.equal(minimalConvergentCompatibleWeight, 3);

const p = 3;
const denominator = 1 - p ** -3;
const kIdOneBlock = (1 - p ** -1) ** 4 / denominator;
const kIdTwoBlocks = p ** -1 * (1 - p ** -1) ** 3 / denominator;
const kSwapOneBlock = p ** -2 * (1 - p ** -1) ** 2 / denominator;
const cyclicBadPrimeCorrection = kIdOneBlock + kIdTwoBlocks + kSwapOneBlock;
assert.ok(Math.abs(cyclicBadPrimeCorrection - 14 / 39) < 1e-12);

console.log(JSON.stringify({
  protocol: "a2-genus-two-eisenstein-parity-gate/1",
  discriminantModule: "Z/3 with q(a)=a^2/3 mod 1",
  anisotropic,
  normalizedGaussSum: "i",
  signatureMod8,
  compatibleWeightsThrough12: compatibleWeights,
  evenCompatibleWeights: [],
  minimalWeightWithLAtLeastNPlus1: minimalConvergentCompatibleWeight,
  publishedEvenWeightSpecializationAppliesDirectly: false,
  cyclicP3K0Correction: {
    exact: "14/39",
    decimal: cyclicBadPrimeCorrection
  },
  conclusion: "The nine-state A2 genus-two multiplier is arithmetically admissible and anisotropic, but its central character forces odd weight. The cited even-weight functional-equation theorem cannot be applied verbatim; an odd-weight/metaplectic extension is required."
}, null, 2));
