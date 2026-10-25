import assert from "node:assert/strict";
import fs from "node:fs";

const record = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/leech-transition-selective-exchange-compiler-v1.json", import.meta.url),
  "utf8"
));
assert.equal(record.schemaVersion, "leech-transition-selective-exchange-compiler-v1");

const N = record.localRegister.rotorCutoffN;
const dimension = 2 * N + 1;
assert.equal(record.localRegister.dimension, dimension);
assert.equal(record.localRegister.binaryQubitsCeiling, Math.ceil(Math.log2(dimension)));
assert.equal(
  record.localRegister.invalidBinaryStates,
  2 ** record.localRegister.binaryQubitsCeiling - dimension
);

const H = Array.from({length: dimension}, (_, i) =>
  Array.from({length: dimension}, (_, j) => {
    if (i === j) return (i - N) ** 2 / 2 + 1;
    if (Math.abs(i - j) === 1) return -0.5;
    return 0;
  })
);
const A = H.map((row) => [...row]);
const V = Array.from({length: dimension}, (_, i) =>
  Array.from({length: dimension}, (_, j) => i === j ? 1 : 0)
);
for (let iteration = 0; iteration < 200000; iteration += 1) {
  let p = 0;
  let q = 1;
  let maximum = 0;
  for (let i = 0; i < dimension; i += 1) {
    for (let j = i + 1; j < dimension; j += 1) {
      if (Math.abs(A[i][j]) > maximum) {
        maximum = Math.abs(A[i][j]);
        p = i;
        q = j;
      }
    }
  }
  if (maximum < 1e-14) break;
  const angle = 0.5 * Math.atan2(2 * A[p][q], A[q][q] - A[p][p]);
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  for (let k = 0; k < dimension; k += 1) {
    if (k === p || k === q) continue;
    const kp = A[k][p];
    const kq = A[k][q];
    A[k][p] = A[p][k] = c * kp - s * kq;
    A[k][q] = A[q][k] = s * kp + c * kq;
  }
  const pp = A[p][p];
  const qq = A[q][q];
  const pq = A[p][q];
  A[p][p] = c ** 2 * pp - 2 * s * c * pq + s ** 2 * qq;
  A[q][q] = s ** 2 * pp + 2 * s * c * pq + c ** 2 * qq;
  A[p][q] = A[q][p] = 0;
  for (let k = 0; k < dimension; k += 1) {
    const kp = V[k][p];
    const kq = V[k][q];
    V[k][p] = c * kp - s * kq;
    V[k][q] = s * kp + c * kq;
  }
}
const order = Array.from({length: dimension}, (_, i) => i)
  .sort((a, b) => A[a][a] - A[b][b]);
const energies = order.map((index) => A[index][index]);
const W = Array.from({length: dimension}, (_, row) =>
  order.map((index) => V[row][index])
);

let orthogonalityResidual = 0;
let eigenResidual = 0;
let diagonalizationResidual = 0;
for (let a = 0; a < dimension; a += 1) {
  for (let b = 0; b < dimension; b += 1) {
    let overlap = 0;
    let transformed = 0;
    for (let i = 0; i < dimension; i += 1) {
      overlap += W[i][a] * W[i][b];
      let hw = 0;
      for (let j = 0; j < dimension; j += 1) hw += H[i][j] * W[j][b];
      transformed += W[i][a] * hw;
    }
    orthogonalityResidual = Math.max(
      orthogonalityResidual,
      Math.abs(overlap - (a === b ? 1 : 0))
    );
    diagonalizationResidual = Math.max(
      diagonalizationResidual,
      Math.abs(transformed - (a === b ? energies[a] : 0))
    );
  }
  for (let i = 0; i < dimension; i += 1) {
    let hw = 0;
    for (let j = 0; j < dimension; j += 1) hw += H[i][j] * W[j][a];
    eigenResidual = Math.max(eigenResidual, Math.abs(hw - energies[a] * W[i][a]));
  }
}
assert.ok(orthogonalityResidual <= record.localRegister.eigenbasisOrthogonalityResidual + 1e-15);
assert.ok(eigenResidual <= record.localRegister.eigenEquationResidual + 1e-15);
assert.ok(diagonalizationResidual <= record.localRegister.diagonalizationResidual + 1e-15);

// Reflection parity commutes with H and splits 17=9+8.
for (let i = 0; i < dimension; i += 1) {
  for (let j = 0; j < dimension; j += 1) {
    assert.equal(H[dimension - 1 - i][dimension - 1 - j], H[i][j]);
  }
}
assert.deepEqual(record.basisCompiler.reflectionParityDimensions, [N + 1, N]);
assert.equal(record.basisCompiler.pairwiseParityRotations, N);
assert.equal(record.basisCompiler.genericGivensWithinParityBlocks, (N + 1) * N / 2 + N * (N - 1) / 2);
assert.equal(
  record.basisCompiler.totalSingleRegisterGivensUpperBound,
  record.basisCompiler.pairwiseParityRotations
    + record.basisCompiler.genericGivensWithinParityBlocks
);
assert.equal(record.basisCompiler.unoptimizedGenericGivensUpperBound, dimension * (dimension - 1) / 2);

const exchangeAction = (theta, input) => {
  const c = Math.cos(theta);
  const s = Math.sin(theta);
  if (input === "10") return {a10: {re: c, im: 0}, a01: {re: 0, im: -s}};
  if (input === "01") return {a10: {re: 0, im: -s}, a01: {re: c, im: 0}};
  return {unchanged: true};
};
const quarter = exchangeAction(Math.PI / 4, "10");
assert.ok(Math.abs(quarter.a10.re - 1 / Math.sqrt(2)) < 1e-15);
assert.ok(Math.abs(quarter.a01.im + 1 / Math.sqrt(2)) < 1e-15);
const half = exchangeAction(Math.PI / 2, "10");
assert.ok(Math.abs(half.a10.re) < 1e-15);
assert.ok(Math.abs(half.a01.im + 1) < 1e-15);
assert.equal(record.selectiveExchange.actedSubspaceDimension, 2);
assert.equal(record.selectiveExchange.fullTwoRegisterDimension, dimension ** 2);
assert.equal(record.selectiveExchange.idealLeakageOutsideSelectedSubspace, 0);

for (const resource of record.openChainResourcesPerInputOutputCycle) {
  assert.equal(
    resource.localGivensForInitialAndFinalBasisChanges,
    2 * resource.cells * record.basisCompiler.totalSingleRegisterGivensUpperBound
  );
  assert.equal(resource.selectiveExchangeGatesPerTrotterStep, resource.cells - 1);
  assert.ok(Math.abs(
    resource.maximumExchangeOperatorErrorForOnePercentStepBudget
      - 0.01 / resource.selectiveExchangeGatesPerTrotterStep
  ) < 1e-15);
}
assert.equal(record.commissioning.tests.length, 5);
assert.ok(record.boundary.includes("does not decompose"));

console.log(JSON.stringify({
  status: "PASS",
  localDimension: dimension,
  parityOptimizedLocalGivens: record.basisCompiler.totalSingleRegisterGivensUpperBound,
  selectiveExchangeSubspace: record.selectiveExchange.actedSubspaceDimension,
  idealLeakage: record.selectiveExchange.idealLeakageOutsideSelectedSubspace,
  largestChainResources: record.openChainResourcesPerInputOutputCycle.at(-1),
  boundary: record.boundary
}));
