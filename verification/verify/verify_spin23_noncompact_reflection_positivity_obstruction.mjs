import assert from "node:assert/strict";
import fs from "node:fs";

const evidence = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/spin23-noncompact-reflection-positivity-obstruction.json", import.meta.url),
  "utf8"
));

assert.equal(evidence.schema, "spin23.noncompact-reflection-positivity-obstruction/1");
const [positive, negative] = evidence.algebra.killingSignaturePositiveNegative;
const [reversedPositive, reversedNegative] = evidence.algebra.overallSignReversedSignaturePositiveNegative;
assert.equal(positive + negative, evidence.algebra.dimension);
assert.deepEqual([reversedPositive, reversedNegative], [negative, positive]);
assert.ok(positive > 0 && negative > 0);

const {mass, positiveTimeSamples: times, testCoefficients: coefficients} = evidence.gaussianWitness;
const amplitude = times.reduce((sum, time, index) => sum + coefficients[index] * Math.exp(-mass * time), 0);
const scalarNorm = amplitude ** 2 / (2 * mass);
assert.ok(scalarNorm > 0);
assert.ok(Math.abs(scalarNorm - evidence.gaussianWitness.positiveDirectionOSNorm) < 1e-15);
assert.ok(Math.abs(-scalarNorm - evidence.gaussianWitness.negativeDirectionOSNorm) < 1e-15);

const eta = evidence.gaussianWitness.internalMetricDiagonal;
assert.equal(eta.filter((entry) => entry > 0).length, positive);
assert.equal(eta.filter((entry) => entry < 0).length, negative);
const osNorm = (v) => v.reduce((sum, entry, index) => sum + eta[index] * entry ** 2, 0) * scalarNorm;
assert.ok(osNorm([1,0,0,0,0,0,0,0,0,0]) > 0);
assert.ok(osNorm([0,0,0,0,0,0,1,0,0,0]) < 0);
assert.equal(evidence.interpretation.requiredEscape.length, 4);

console.log("Spin(2,3) noncompact reflection-positivity obstruction: PASS");
console.log(`  Killing signature: (${positive},${negative}); reversed: (${reversedPositive},${reversedNegative})`);
console.log(`  scalar OS Gram norm: ${scalarNorm.toFixed(12)}`);
console.log(`  positive internal direction: ${osNorm([1,0,0,0,0,0,0,0,0,0]).toFixed(12)}`);
console.log(`  negative internal direction: ${osNorm([0,0,0,0,0,0,1,0,0,0]).toFixed(12)}`);
console.log("  naive full-adjoint analytic continuation rejected; constrained broken gravity not rejected");
