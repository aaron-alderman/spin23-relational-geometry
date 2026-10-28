import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const root = process.cwd();
const recordPath = path.join(root, "corpus/programmes/dynatology/golden_golay_integral_encoder_audit_v1.json");
const record = JSON.parse(fs.readFileSync(recordPath, "utf8"));
const mod = (x, n) => ((x % n) + n) % n;
const mod3 = (x) => mod(x, 3);
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const mul = (A, B, modulus = null) => A.map((row) => B[0].map((_, j) => {
  const value = row.reduce((sum, x, k) => sum + x * B[k][j], 0);
  return modulus ? mod(value, modulus) : value;
}));
const det2 = (A, modulus = null) => {
  const value = A[0][0] * A[1][1] - A[0][1] * A[1][0];
  return modulus ? mod(value, modulus) : value;
};
const key = (A) => JSON.stringify(A);

assert.equal(record.schema, "dynatology-golden-golay-integral-encoder-audit/1");
const source = record.sourceCarrier;
const E = source.encoderRows;
const mu = source.coefficientVector;
assert.equal(E.length, 2);
assert.notEqual(E[0][0] * E[1][2] - E[0][2] * E[1][0], 0, "encoder must have rank two");
const weightedLinearSum = E.map((row) => row.reduce((sum, x, i) => sum + x * mu[i], 0));
const weightedGram = E.map((left) => E.map((right) => left.reduce((sum, x, i) => sum + mu[i] * x * right[i], 0)));
assert.deepEqual(weightedLinearSum, source.exactProperties.weightedLinearSum);
assert.deepEqual(weightedGram, source.exactProperties.weightedGram);

const involution = source.signedMonomialInvolution;
const applyH = (row) => {
  const out = Array(11).fill(0);
  for (let j = 0; j < 11; j += 1) {
    const value = involution.sourceCoordinateSigns[j] * row[j];
    out[involution.zeroBasedPermutation[j]] = value === 0 ? 0 : value;
  }
  return out;
};
assert.deepEqual(E.map(applyH), E, "the exact two-face must be pointwise fixed by h");

const golden = record.goldenDynamics;
const S = golden.matrixS;
const Q = mul(E, transpose(E));
assert.deepEqual(Q, golden.uniformEuclideanPullback);
assert.notDeepEqual(mul(mul(transpose(S), Q), S), Q, "golden dynamics is not an isometry of the uniform channel metric");

const ternary = record.ternaryShadow;
const E3 = E.map((row) => row.map(mod3));
assert.deepEqual(E3, ternary.encoderRowsMod3);
const codewords = [];
for (let a = 0; a < 3; a += 1) for (let b = 0; b < 3; b += 1) {
  codewords.push(E3[0].map((x, i) => mod3(a * x + b * E3[1][i])));
}
assert.equal(new Set(codewords.map((word) => word.join(""))).size, ternary.codewords);
const nonzeroWeights = codewords.slice(1).map((word) => word.filter(Boolean).length);
assert.deepEqual([...new Set(nonzeroWeights)], [6]);
assert.equal(nonzeroWeights.length, ternary.nonzeroWeightCensus["6"]);
const zeroColumns = E3[0].map((_, i) => i).filter((i) => E3.every((row) => row[i] === 0));
assert.deepEqual(zeroColumns, ternary.identicallyZeroCoordinatesZeroBased);

const I = [[1, 0], [0, 1]];
const S2 = mul(S, S, 3);
assert.deepEqual(S2, ternary.matrixSMod3Squared);
let power = I;
let order = null;
for (let n = 1; n <= 48; n += 1) {
  power = mul(power, S, 3);
  if (key(power) === key(I)) { order = n; break; }
}
assert.equal(order, ternary.matrixSMod3Order);
const unseen = new Set();
for (let a = 0; a < 3; a += 1) for (let b = 0; b < 3; b += 1) if (a || b) unseen.add(`${a}${b}`);
const orbitSizes = [];
while (unseen.size) {
  const start = [...unseen][0].split("").map(Number);
  let current = start;
  let size = 0;
  do {
    unseen.delete(current.join(""));
    current = [
      mod3(current[0] * S[0][0] + current[1] * S[1][0]),
      mod3(current[0] * S[0][1] + current[1] * S[1][1]),
    ];
    size += 1;
  } while (current.join("") !== start.join(""));
  orbitSizes.push(size);
}
assert.deepEqual(orbitSizes.sort((a, b) => a - b), ternary.nonzeroCoefficientOrbits);

const GL23 = [];
for (let a = 0; a < 3; a += 1) for (let b = 0; b < 3; b += 1) {
  for (let c = 0; c < 3; c += 1) for (let d = 0; d < 3; d += 1) {
    const A = [[a, b], [c, d]];
    if (det2(A, 3) !== 0) GL23.push(A);
  }
}
assert.equal(GL23.length, record.basisGauge.groupOrder);
const centralizer = GL23.filter((A) => key(mul(A, S, 3)) === key(mul(S, A, 3)));
assert.equal(centralizer.length, record.basisGauge.centralizerOfSMod3Order);
assert.equal(GL23.length / centralizer.length, record.basisGauge.conjugacyClassSize);

const primitive = (a, b) => {
  const gcd = (x, y) => y === 0 ? Math.abs(x) : gcd(y, x % y);
  return gcd(a, b) === 1;
};
const length = (a, b) => a * a * Q[0][0] + 2 * a * b * Q[0][1] + b * b * Q[1][1];
const primitiveVectors = [];
for (let a = -12; a <= 12; a += 1) for (let b = -12; b <= 12; b += 1) {
  if ((a || b) && primitive(a, b)) primitiveVectors.push({a, b, length: length(a, b)});
}
const shortest = Math.min(...primitiveVectors.map((x) => x.length));
assert.equal(shortest, record.basisGauge.uniformEuclideanShortestFlag.squaredLengths[0]);
const independent = primitiveVectors.filter((x) => x.b !== 0);
assert.equal(Math.min(...independent.map((x) => x.length)), record.basisGauge.uniformEuclideanShortestFlag.squaredLengths[1]);

const noGo = record.coxeterCapSuccessorNoGo;
assert.equal(noGo.fixedBaseSecantStabilizerOrbits.sameSecant, 1);
assert.equal(noGo.fixedBaseSecantStabilizerOrbits.oneSharedCapPoint, 2 * 9);
assert.equal(noGo.fixedBaseSecantStabilizerOrbits.disjointCapPoints, 9 * 8 / 2);
assert.equal(Object.values(noGo.fixedBaseSecantStabilizerOrbits).reduce((a, b) => a + b, 0), noGo.secants);
assert.deepEqual(noGo.equivariantDeterministicSuccessors, ["identity"]);

for (const sourcePath of [source.claim, ...noGo.sourceClaims]) {
  assert.ok(fs.existsSync(path.resolve(path.dirname(recordPath), sourcePath)), `missing source ${sourcePath}`);
}
assert.equal(record.closure.resolution, "closed_by_equivariant_successor_no_go");
assert.ok(record.closure.doesNotEstablish.includes("a_Golay_origin_of_the_golden_angle"));

console.log("Dynatology Golden--Golay integral encoder audit: PASS [11,2,6], S mod 3 order 4, secant orbits 1+18+36");
