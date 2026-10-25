import assert from "node:assert/strict";
import fs from "node:fs";

const record = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/leech-selective-exchange-trotter-budget-v1.json", import.meta.url),
  "utf8"
));
const compiler = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/leech-transition-selective-exchange-compiler-v1.json", import.meta.url),
  "utf8"
));
assert.equal(record.schemaVersion, "leech-selective-exchange-trotter-budget-v1");

// For M divisible by four, each parity block of [A,B]^T[A,B] reduces to
// a length-M/4 tridiagonal matrix with diagonal (1,2,...,2) and off-diagonal -1.
const largestTridiagonalEigenvalue = (length) => {
  const diagonal = Array.from({length}, (_, i) => i === 0 ? 1 : 2);
  const countBelow = (x) => {
    let pivot = diagonal[0] - x;
    let count = pivot < 0 ? 1 : 0;
    for (let i = 1; i < length; i += 1) {
      if (Math.abs(pivot) < 1e-14) pivot = pivot < 0 ? -1e-14 : 1e-14;
      pivot = diagonal[i] - x - 1 / pivot;
      if (pivot < 0) count += 1;
    }
    return count;
  };
  let lower = 0;
  let upper = 4;
  for (let iteration = 0; iteration < 120; iteration += 1) {
    const midpoint = (lower + upper) / 2;
    if (countBelow(midpoint) < length) lower = midpoint;
    else upper = midpoint;
  }
  return (lower + upper) / 2;
};

for (const rung of record.commutatorLadderWithoutTSquared) {
  assert.equal(rung.cells % 4, 0);
  const tridiagonalNorm = Math.sqrt(largestTridiagonalEigenvalue(rung.cells / 4));
  const formula = 2 * Math.cos(Math.PI / (rung.cells / 2 + 1));
  assert.ok(Math.abs(tridiagonalNorm - formula) < 2e-12);
  assert.ok(Math.abs(rung.coefficient - formula) < 2e-12);
}

const bound = record.firstOrderBound;
const largestCompiler = compiler.openChainResourcesPerInputOutputCycle.at(-1);
assert.equal(bound.largestChainCells, largestCompiler.cells);
assert.equal(bound.largestChainExchangeGatesPerStep, largestCompiler.selectiveExchangeGatesPerTrotterStep);
assert.equal(bound.inputOutputLocalGivens, largestCompiler.localGivensForInitialAndFinalBasisChanges);
const coefficient = record.commutatorLadderWithoutTSquared.at(-1).coefficient;

for (const point of record.largestChainBudget) {
  const numerator = point.timeTimesGap ** 2
    * coefficient
    * point.hoppingOverGap ** 2;
  const steps = Math.ceil(numerator / (2 * bound.operatorErrorBudget));
  assert.equal(point.trotterSteps, steps);
  assert.equal(point.exchangeGates, steps * bound.largestChainExchangeGatesPerStep);
  assert.equal(
    point.totalLogicalGatesIncludingInputOutput,
    point.exchangeGates + bound.inputOutputLocalGivens
  );
}
assert.ok(record.largestChainBudget.at(-1).totalLogicalGatesIncludingInputOutput > 1e6);
assert.ok(record.boundary.includes("one-excitation sector"));

console.log(JSON.stringify({
  status: "PASS",
  largestChainCells: bound.largestChainCells,
  commutatorCoefficient: coefficient,
  errorBudget: bound.operatorErrorBudget,
  shortBenchmark: record.largestChainBudget[0],
  longestStrongBenchmark: record.largestChainBudget.at(-1),
  selectedAlternatives: ["native analog exchange", "free-fermion/matchgate compilation", "higher-order product formula"],
  boundary: record.boundary
}));
