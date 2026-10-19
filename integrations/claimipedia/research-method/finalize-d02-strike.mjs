import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const generated = resolve(here, "generated");
const read = (name) => JSON.parse(readFileSync(resolve(generated, name), "utf8"));
const hashFile = (name) => createHash("sha256").update(readFileSync(resolve(generated, name))).digest("hex");
const hashValue = (value) => createHash("sha256").update(JSON.stringify(value)).digest("hex");

const processReceipt = read("d02-process-receipt.json");
const executionReceipt = read("d02-execution-receipt.json");
const executionResult = read("d02-execution-result.json");
const sourceryReview = read("d02-sourcery-review.json");

assert.equal(processReceipt.passed, true);
assert.equal(executionReceipt.passed, true);
assert.ok(Object.values(executionReceipt.checks).every(Boolean));
assert.equal(sourceryReview.passed, true);
assert.equal(sourceryReview.summary.localCandidateCount, 1);
assert.equal(sourceryReview.summary.globalCandidateCount, 0);
assert.ok(sourceryReview.summary.invalidRuleIds.includes("counterexample-silent-rank-change-continuation"));
assert.ok(sourceryReview.summary.invalidRuleIds.includes("counterexample-boundary-response-determines-wall-index"));

const docket = {
  protocol: "claimipedia-d02-final-strike-docket/1",
  strikeId: executionResult.strikeId,
  reviewStage: "Triage",
  disposition: "retain-local-law-split-global-rank-change-law",
  terminalResult: "A single local support-stratified dispatcher exists on fixed-rank patches, but the eliminated response has no canonical continuation through a rank change from the limiting block alone. Global composition must carry approach/residue data or remain split.",
  basis: {
    processReceipt: { path: "d02-process-receipt.json", sha256: hashFile("d02-process-receipt.json") },
    executionReceipt: { path: "d02-execution-receipt.json", sha256: hashFile("d02-execution-receipt.json") },
    executionResult: { path: "d02-execution-result.json", sha256: hashFile("d02-execution-result.json") },
    sourceryReview: { path: "d02-sourcery-review.json", sha256: hashFile("d02-sourcery-review.json"), host: sourceryReview.host }
  },
  findings: [
    { id: "D02-F1", status: "exact-bounded-theorem", statement: "A constant-support, range-compatible real-coupling Schur operation preserves analyticity and Herglotz passivity and is covariant under support-frame changes with the metric/projector data transported." },
    { id: "D02-F2", status: "exact-counterexample", statement: "The families D_t=t z with B_t=b sqrt(t) and B_t=b t approach the same limiting block but yield different eliminated limits; the limiting block therefore does not select a canonical continuation." },
    { id: "D02-F3", status: "compatibility-rule", statement: "Ward support transports on a constant-rank patch under the range condition; a forbidden null coupling produces regulator divergence." },
    { id: "D02-F4", status: "compatibility-rule", statement: "KMS transports only under one common temperature and the declared reciprocal real coupling assumptions." },
    { id: "D02-F5", status: "loss-boundary", statement: "A probe-visible wall pole transports as residue data, but the projected boundary response does not determine an invisible bulk chiral index." }
  ],
  lightningLinks: [
    { id: "LS1", status: "closed-for-bounded-exemplars" },
    { id: "LS2", status: "scoped-census-complete-independent-audit-open" },
    { id: "LS3", status: "local-strata-classified-global-stratification-open" },
    { id: "LS4", status: "closed-for-bounded-handler-contract" },
    { id: "LS5", status: "closed-for-ordinary-and-fixed-support-inverse-residue-extension-open" },
    { id: "LS6", status: "local-frame-covariance-closed-global-holonomy-open" },
    { id: "LS7", status: "split-to-typed-preserve-loss-refuse-matrix" },
    { id: "LS8", status: "closed-for-three-bounded-exemplars" },
    { id: "LS9", status: "ready-for-human-triage" }
  ],
  branchDispositions: executionResult.disposition,
  strongestFalsifier: "Exhibit two paths with identical full decorated approach data, not merely the same limiting block, that still yield inequivalent external responses. That would defeat the proposed repair by approach/residue decoration and force permanently separate calculi.",
  nextDiscriminant: "Test whether a groupoid- or measure-valued object containing support transition, approach-scaling and positive residue data makes the rank-changing output path-independent. Refuse a global law if it does not.",
  independentContext: [
    { title: "On Matrix-Valued Herglotz Functions", url: "https://arxiv.org/abs/funct-an/9712004", relevance: "matrix-valued Herglotz representation and linear-fractional transformations" },
    { title: "A generalized Schur complement for non-negative operators on linear space", url: "https://arxiv.org/abs/1708.01545", relevance: "generalized Schur complement beyond nonsingular finite matrices" }
  ],
  authority: {
    proposalOnly: true,
    entailsBeyondDeclaredFiniteModels: false,
    empiricalAuthority: false,
    automaticPromotion: false,
    automaticCorpusAdmission: false,
    applicationAdmission: false
  }
};
docket.docketSha256 = hashValue(docket);
writeFileSync(resolve(generated, "d02-final-docket.json"), `${JSON.stringify(docket, null, 2)}\n`);
console.log(JSON.stringify({ protocol: docket.protocol, disposition: docket.disposition, findingCount: docket.findings.length, docketSha256: docket.docketSha256, passed: true }, null, 2));

