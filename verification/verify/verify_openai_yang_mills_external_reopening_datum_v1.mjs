import { readFileSync } from "node:fs";
import assert from "node:assert/strict";

const root = new URL("../../", import.meta.url);
const evidence = JSON.parse(readFileSync(new URL("evidence/data/openai-yang-mills-external-reopening-datum-v1.json", root), "utf8"));
const claim = readFileSync(new URL("corpus/claims/1700-1799/1794_openais_reported_lean_formalized_yang_mills_existence_is_an_external_reopening_datum_not_a_mass_gap_result.md", root), "utf8");

assert.equal(evidence.source.publisher, "OpenAI");
assert.equal(evidence.source.published, "2026-10-26");
assert.equal(evidence.reportedObservations.length, 4);
assert.ok(Object.values(evidence.artifactAvailability).every(value => value === false));
assert.equal(evidence.corpusDisposition.classification, "external_reopening_datum");
assert.equal(evidence.corpusDisposition.constructiveExistenceGateReopened, true);
assert.equal(evidence.corpusDisposition.constructiveExistenceEstablishedInCorpus, false);
assert.equal(evidence.corpusDisposition.positivePhysicalMassGapReportedBySource, false);
assert.equal(evidence.corpusDisposition.positivePhysicalMassGapEstablishedInCorpus, false);
assert.equal(evidence.corpusDisposition.spin23BridgeEstablished, false);
assert.equal(evidence.corpusDisposition.standardModelOrE6BridgeEstablished, false);
assert.equal(evidence.corpusDisposition.topicId, "OT-031");
assert.ok(evidence.admissionRequirements.length >= 8);
assert.match(evidence.authority.prohibitedPromotion, /do not restate/i);
assert.match(claim, /external reopening datum/i);
assert.match(claim, /does not publicly state a separately proved positive Hamiltonian mass gap/i);
assert.match(claim, /awaiting independent admission/i);
assert.match(claim, /Claim 1590/);
assert.match(claim, /Claim 1592/);
assert.match(claim, /Claim 1593/);
console.log("OpenAI Yang-Mills external reopening datum v1 verification passed");
