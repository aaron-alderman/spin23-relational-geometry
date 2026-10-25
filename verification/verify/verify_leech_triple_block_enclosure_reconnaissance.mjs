#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";

const record = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/leech-triple-block-enclosure-reconnaissance-v1.json", import.meta.url)
));
assert.equal(record.cutoff, 2);
assert.equal(record.ratio, 0.01);
assert.equal(record.samples, 200);
assert.equal(record.best.length, 10);
assert.equal(record.certified, false);
assert.ok(record.best.every((row) => row.blocksZeroBased.length === 8));
assert.ok(record.best.every((row) => row.gapLower < -0.28));
assert.ok(record.best.every((row) => row.residualSmallestEigenvalue > 0));

const optimized = record.independentlyWeightedBestPartition;
assert.equal(optimized.optimizerSuccess, true);
assert.equal(optimized.weights.length, 8);
assert.equal(optimized.blocksZeroBased.length, 8);
assert.ok(optimized.gapLower < -0.28);
assert.ok(optimized.gapLower > record.best[0].gapLower);
assert.ok(Math.abs(optimized.residualSmallestEigenvalue) < 1e-9);
assert.match(record.boundary, /reconnaissance/);

console.log(JSON.stringify({
  status: "PASS",
  sampledPartitions: record.samples + 1,
  bestUniformGapLower: record.best[0].gapLower,
  independentlyWeightedGapLower: optimized.gapLower,
  certified: record.certified,
  interpretation: "negative principal-triple-block reconnaissance, not a triple-block no-go"
}));
