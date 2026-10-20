import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const data = JSON.parse(readFileSync(path.join(root, "evidence/data/claimipedia-speculative-ansatz-playground.json"), "utf8"));

assert.equal(data.documentId, 1467);
assert.equal(data.sourcePolicy.sourceAuthorityGrantsEvidence, false);
assert.equal(data.sourcePolicy.alteredStateContentEstablishesExternalOntology, false);
assert.equal(data.beautyPrior.beautyChangesLikelihoodWithoutTest, false);
assert.equal(data.beautyPrior.use, "search-order-only");
assert.ok(data.formalizationMinimum >= 2);
assert.ok(data.pipeline.includes("cheap-kill-test"));
assert.ok(data.mandatoryControls.includes("scrambled or random motif baseline"));

const states = new Set(data.promotionStates);
for (const [from, to] of data.forbiddenDirectPromotions) {
  assert.ok(states.has(from));
  assert.ok(states.has(to));
}
assert.ok(data.forbiddenDirectPromotions.some(([from, to]) => from === "SIGNPOST" && to === "EMPIRICAL"));

const required = new Set(data.requiredFields);
for (const field of ["formalTargets", "namedCorpusGate", "minimalAnsatz", "cheapestKillTest", "negativeControl", "failureValue"]) assert.ok(required.has(field));

console.log("PASS 1467: unrestricted inspiration is admitted only as a signpost; typed translation, two formalizations, controls and a kill test are mandatory before promotion.");
