import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const e = JSON.parse(readFileSync("evidence/data/alp-charged-neutral-detector-rank-v1.json", "utf8"));
assert.equal(e.schema, "admissibility.alp-charged-neutral-detector-rank/1");
assert.deepEqual(e.fullNull, [2, 1, -1]);
assert.deepEqual(e.fullNullImage, [0, 0]);
assert.equal(e.fixedCbb.determinant, -0.5);
assert.equal(e.fixedCbb.amplitudeIdentifiable, true);
assert.equal(e.rateOnlyExample.branchesBeforeGlobalSignQuotient, 4);
assert.equal(e.rateOnlyExample.relativeSignBranches, 2);
assert.equal(e.decisions.coherentInterferenceOrPhaseReferenceRequired, true);
assert.equal(e.decisions.unrestrictedThreeOriginLabelsIdentifiable, false);
assert.equal(e.decisions.newPhysicsEvidence, false);
console.log("verified charged-neutral ALP detector rank");
