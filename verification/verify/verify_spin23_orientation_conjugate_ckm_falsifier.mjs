import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const data = JSON.parse(readFileSync(path.join(root, "evidence/data/spin23-orientation-conjugate-ckm-falsifier.json"), "utf8"));

const permutations = [
  [0, 1, 2], [0, 2, 1], [1, 0, 2],
  [1, 2, 0], [2, 0, 1], [2, 1, 0],
];

assert.equal(data.documentId, 1477);
const m = data.ckmMagnitudes;
const differences = [m[0][1] - m[1][0], m[0][2] - m[2][0], m[1][2] - m[2][1]];
const norm = Math.hypot(...differences);
assert.ok(Math.abs(norm - data.transposeDifferences.frobeniusUpperTriangleNorm) < 1e-15);

let best = null;
for (const rows of permutations) {
  for (const columns of permutations) {
    const ds = [];
    for (let i = 0; i < 3; i += 1) {
      for (let j = i + 1; j < 3; j += 1) ds.push(m[rows[i]][columns[j]] - m[rows[j]][columns[i]]);
    }
    const rms = Math.hypot(...ds) / Math.sqrt(ds.length);
    if (!best || rms < best.rms) best = { rows, columns, rms };
  }
}
assert.deepEqual(best.rows, data.permutationAudit.bestRowPermutationZeroBased);
assert.deepEqual(best.columns, data.permutationAudit.bestColumnPermutationZeroBased);
assert.ok(Math.abs(best.rms - data.permutationAudit.bestRmsTransposeAsymmetry) < 1e-15);
assert.ok(best.rms > 0);

const f = data.dominantFalsifier;
const combinedSigma = Math.hypot(f.VubConservativeSigma, f.VtdConservativeSigma);
const significance = Math.abs(f.Vub - f.Vtd) / combinedSigma;
assert.ok(Math.abs(combinedSigma - f.combinedSigma) < 1e-15);
assert.ok(Math.abs(significance - f.significance) < 1e-12);
assert.ok(significance > 20);
assert.equal(data.repairBoundary.generationUniversalGaugeShiftRepairsMixing, false);
assert.equal(data.repairBoundary.arbitraryFamilySpurionAllowed, false);
assert.equal(data.verdict.directOrientationConjugateCKMExcluded, true);
assert.equal(data.verdict.algebraicNoncommutingConstructionRetained, true);
assert.equal(data.verdict.physicalAdmissionChanged, false);

console.log(`PASS 1477: the orientation-conjugate model predicts transpose-symmetric CKM magnitudes, but PDG-2025 |Vub|-|Vtd| differs at ${significance.toFixed(2)} conservative combined sigma; all 36 ordering pairs fail exact symmetry.`);
