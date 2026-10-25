import assert from "node:assert/strict";
import fs from "node:fs";

const record = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/leech-free-fermion-matchgate-evolution-v1.json", import.meta.url),
  "utf8"
));
const compiler = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/leech-transition-selective-exchange-compiler-v1.json", import.meta.url),
  "utf8"
));
const trotter = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/leech-selective-exchange-trotter-budget-v1.json", import.meta.url),
  "utf8"
));

assert.equal(record.schemaVersion, "leech-free-fermion-matchgate-evolution-v1");
const sine = (j, k, M) => Math.sqrt(2 / (M + 1))
  * Math.sin((j + 1) * (k + 1) * Math.PI / (M + 1));

for (const rung of record.resourceLadder) {
  const M = rung.cells;
  assert.equal(rung.modeEvolutionGates, M * M);
  assert.equal(rung.localBasisInputOutputGates, 144 * M);
  assert.equal(rung.totalLogicalGates, M * M + 144 * M);

  // Verify every component of the path-adjacency eigenvalue recurrence.
  for (let k = 0; k < M; k += 1) {
    const lambda = 2 * Math.cos((k + 1) * Math.PI / (M + 1));
    for (let j = 0; j < M; j += 1) {
      const lhs = (j > 0 ? sine(j - 1, k, M) : 0)
        + (j + 1 < M ? sine(j + 1, k, M) : 0);
      assert.ok(Math.abs(lhs - lambda * sine(j, k, M)) < 2e-12);
    }
  }

  // Check normalization and representative mutual orthogonality without an O(M^3) audit.
  const indices = [...new Set([0, 1, Math.floor(M / 3), Math.floor(M / 2), M - 1])];
  for (const k of indices) {
    for (const q of indices) {
      let dot = 0;
      for (let j = 0; j < M; j += 1) dot += sine(j, k, M) * sine(j, q, M);
      assert.ok(Math.abs(dot - (k === q ? 1 : 0)) < 2e-12);
    }
  }
}

const largest = record.resourceLadder.at(-1);
const compiledLargest = compiler.openChainResourcesPerInputOutputCycle.at(-1);
assert.equal(largest.cells, compiledLargest.cells);
assert.equal(largest.localBasisInputOutputGates, compiledLargest.localGivensForInitialAndFinalBasisChanges);

const comparison = record.largestChainComparison;
const crossover = largest.modeEvolutionGates / comparison.firstOrderExchangeGatesPerStep;
assert.ok(Math.abs(comparison.exactCrossoverBeforeCeiling - crossover) < 1e-12);
assert.equal(comparison.matchgateWinsWhenTrotterStepsAtLeast, Math.floor(crossover) + 1);
const short = trotter.largestChainBudget.find((point) => point.timeTimesGap === 1 && point.hoppingOverGap === 0.45);
const long = trotter.largestChainBudget.find((point) => point.timeTimesGap === 10 && point.hoppingOverGap === 0.45);
assert.equal(comparison.shortBenchmark.firstOrderTotal, short.totalLogicalGatesIncludingInputOutput);
assert.equal(comparison.longBenchmark.firstOrderTotal, long.totalLogicalGatesIncludingInputOutput);
assert.equal(comparison.shortBenchmark.matchgateTotal, largest.totalLogicalGates);
assert.equal(comparison.longBenchmark.matchgateTotal, largest.totalLogicalGates);
assert.ok(Math.abs(
  comparison.longBenchmark.firstOrderOverMatchgate
  - long.totalLogicalGatesIncludingInputOutput / largest.totalLogicalGates
) < 1e-12);
assert.equal(record.model.trotterError, 0);
assert.ok(record.boundary.includes("neither realizes the Leech lattice nor the Monster"));

console.log(JSON.stringify({
  status: "PASS",
  decomposition: record.model.evolution,
  largestChain: largest,
  exactCrossoverSteps: comparison.exactCrossoverBeforeCeiling,
  matchgateWinsFromStep: comparison.matchgateWinsWhenTrotterStepsAtLeast,
  longBenchmarkSavingFactor: comparison.longBenchmark.firstOrderOverMatchgate,
  boundary: record.boundary
}));
