import assert from "node:assert/strict";
import fs from "node:fs";

const record = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/leech-hardware-basis-pareto-frontier-v1.json", import.meta.url), "utf8"
));
const winner = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/leech-integral-hardware-basis-search-v1.json", import.meta.url), "utf8"
));
assert.equal(record.schemaVersion, "leech-hardware-basis-pareto-frontier-v1");
assert.equal(record.scan.candidatesEvaluated,
  record.scan.permutationTrials * record.scan.lovaszDeltaValues.length);

const candidates = record.sub1000EngineeringShortlist;
assert.deepEqual(candidates.map((candidate) => candidate.id), [
  "precision-first", "transform-first", "gram-first", "coordinate-small-entry"
]);
assert.ok(candidates.every((candidate) => candidate.conditionNumber < 1000));
const dominates = (left, right) => left.conditionNumber <= right.conditionNumber
  && left.gramOffDiagonalPairs <= right.gramOffDiagonalPairs
  && left.transformNonzeroEntries <= right.transformNonzeroEntries
  && (left.conditionNumber < right.conditionNumber
    || left.gramOffDiagonalPairs < right.gramOffDiagonalPairs
    || left.transformNonzeroEntries < right.transformNonzeroEntries);
for (let i = 0; i < candidates.length; i += 1) for (let j = 0; j < candidates.length; j += 1) {
  if (i !== j) assert.equal(dominates(candidates[i], candidates[j]), false);
}

const byId = new Map(candidates.map((candidate) => [candidate.id, candidate]));
assert.equal(byId.get("precision-first").conditionNumber,
  Math.min(...candidates.map((candidate) => candidate.conditionNumber)));
assert.equal(byId.get("transform-first").transformNonzeroEntries,
  Math.min(...candidates.map((candidate) => candidate.transformNonzeroEntries)));
assert.equal(byId.get("gram-first").gramOffDiagonalPairs,
  Math.min(...candidates.map((candidate) => candidate.gramOffDiagonalPairs)));
assert.equal(byId.get("coordinate-small-entry").transformMaximumAbsoluteEntry,
  Math.min(...candidates.map((candidate) => candidate.transformMaximumAbsoluteEntry)));

const frozenWinner = byId.get("precision-first");
assert.equal(frozenWinner.trialZeroBased, winner.winner.trialZeroBased);
assert.equal(frozenWinner.conditionNumber, winner.winner.conditionNumber);
assert.equal(frozenWinner.gramOffDiagonalPairs, winner.winner.offDiagonalNonzeroPairs);
assert.equal(frozenWinner.transformNonzeroEntries, winner.winner.unimodularTransformNonzeroEntries);

const tolerance = new Map(record.derivedTolerances.map((entry) => [entry.id, entry]));
for (const candidate of candidates) {
  const calculated = 0.01 / (1.01 * candidate.conditionNumber);
  assert.ok(Math.abs(calculated
    - tolerance.get(candidate.id).relativeDeltaForOnePercentWorstCaseInverse) < 2e-18);
}
assert.ok(record.selectionContract.forbidden.includes("measured platform cost weights"));
assert.ok(record.boundary.includes("not over all GL(24,Z)"));

console.log(JSON.stringify({
  status: "PASS",
  evaluatedCandidates: record.scan.candidatesEvaluated,
  shortlist: candidates.map((candidate) => ({
    id: candidate.id,
    condition: candidate.conditionNumber,
    gramPairs: candidate.gramOffDiagonalPairs,
    transformEntries: candidate.transformNonzeroEntries,
    maximumRatio: candidate.transformMaximumAbsoluteEntry
  })),
  mutuallyNondominated: true,
  missingPhysicalMeasurements: record.missingPhysicalDictionary.requiredMeasurements,
  boundary: record.boundary
}));
