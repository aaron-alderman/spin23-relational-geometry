import assert from "node:assert/strict";
import fs from "node:fs";

const benchmarkPath = new URL(
  "../../evidence/data/monster-order46-connected-ratio-benchmark-v1.json",
  import.meta.url,
);
const budgetPath = new URL(
  "../../evidence/data/monster-order46-trace-shot-budget-v1.json",
  import.meta.url,
);
const benchmark = JSON.parse(fs.readFileSync(benchmarkPath, "utf8"));
const budget = JSON.parse(fs.readFileSync(budgetPath, "utf8"));

assert.equal(budget.schemaVersion, "monster-order46-trace-shot-budget-v1");
const targets = benchmark.frozenTargetsAtI;
const j = benchmark.functions.JAtI;
const derived = {
  mixed46AB: targets.T46ABTransported / j,
  mixed46CD: targets.T46CDTransported / j,
  twisted23: targets.T23Twisted / j,
  insertion2B: targets.T2B / j,
  insertion2A: targets.T2A / j,
};
for (const [name, value] of Object.entries(derived)) {
  assert.ok(Math.abs(value - budget.normalizedRealAmplitudes[name]) < 1e-15);
  assert.ok(value > 0 && value < 1);
}

const model = budget.samplingModel;
assert.deepEqual(model.measurementRange, [-1, 1]);
const r = model.relativeErrorPerAmplitude;
const alpha = model.familywiseAlpha;
const m = model.bonferroniAmplitudes;
assert.equal(m, Object.keys(derived).length);
const hoeffdingNumerator = 2 * Math.log((2 * m) / alpha);
const shots = {};
for (const [name, mean] of Object.entries(derived)) {
  const epsilon = r * Math.abs(mean);
  shots[name] = Math.ceil(hoeffdingNumerator / (epsilon * epsilon));
  assert.equal(shots[name], budget.shotBudget[name]);
}
const total = Object.values(shots).reduce((sum, value) => sum + value, 0);
assert.equal(total, budget.shotBudget.total);
const dominantFraction = shots.mixed46AB / total;
assert.ok(Math.abs(dominantFraction - budget.shotBudget.dominantFractionMixed46AB) < 1e-15);

const upperFactor = ((1 + r) / (1 - r)) ** 2;
assert.equal(upperFactor, budget.ratioGuarantee.multiplicativeUpperFactor);
const upperAB = targets.magnitudeRatio46AB * upperFactor;
const upperCD = targets.magnitudeRatio46CD * upperFactor;
assert.ok(Math.abs(upperAB - budget.ratioGuarantee.upperMagnitude46AB) < 1e-12);
assert.ok(Math.abs(upperCD - budget.ratioGuarantee.upperMagnitude46CD) < 1e-12);
assert.ok(upperAB < 1 && upperCD < 1);
assert.equal(budget.ratioGuarantee.bothRejectNullOnSimultaneousConfidenceEvent, true);

const smallestTolerance = r * derived.mixed46AB;
assert.ok(Math.abs(smallestTolerance - budget.coherentAlternative.smallestAbsoluteTolerance) < 1e-15);
assert.ok(Math.abs(1 / smallestTolerance - budget.coherentAlternative.inverseTolerance) < 1e-9);

console.log(JSON.stringify({
  status: "PASS",
  normalizedAmplitudes: derived,
  relativeErrorPerAmplitude: r,
  familywiseAlpha: alpha,
  idealizedShots: shots,
  totalIdealizedShots: total,
  dominantChannel: "mixed46AB",
  dominantFraction,
  ratioUpperBounds: { "46AB": upperAB, "46CD": upperCD },
  coherentInverseToleranceIndicator: 1 / smallestTolerance,
}));
