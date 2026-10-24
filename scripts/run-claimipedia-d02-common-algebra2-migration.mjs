import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { executeProcess } from "file:///C:/Users/aaron/sourcery/.consolidation/temple-supervisor/runtime/2026-10-17-generated-view-materializer-v8r3/surface-async-process.mjs";
import { graph, queries, recordDimension } from "../integrations/claimipedia/research-method/d02-scientific-transformation-graph.mjs";

const write = process.argv.includes("--write");
const root = resolve(import.meta.dirname, "..");
const model = readFile(
  resolve(root, "integrations/sourcery/mcp-admission/scientific-derivation-composer/scientific-derivation-process.json"),
  "utf8",
).then(JSON.parse);

async function compose(candidateGraph, query) {
  const processModel = await model;
  const env = await executeProcess(processModel.program, { model: processModel, request: { graph: structuredClone(candidateGraph), query: structuredClone(query) } }, { compute: {}, ports: {} });
  return env.result;
}

const localQuery = queries.find(query => query.id === "bounded-local-theorem");
const globalQuery = queries.find(query => query.id === "global-rank-change-law");
const local = await compose(graph, localQuery);
const global = await compose(graph, globalQuery);

const missingRuleGraph = structuredClone(graph);
delete missingRuleGraph.transformations.find(rule => rule.id === "apply-local-support-schur-theorem").dimensionRule;
const missingRule = await compose(missingRuleGraph, localQuery);

const invalidDeltaGraph = structuredClone(graph);
invalidDeltaGraph.transformations.find(rule => rule.id === "apply-local-support-schur-theorem").dimensionDelta.time = -1;
const invalidDelta = await compose(invalidDeltaGraph, localQuery);

const positive = local.candidates[0];
let liveReview = null;
try {
  liveReview = JSON.parse(await readFile(resolve(root, "integrations/claimipedia/research-method/generated/d02-sourcery-review.json"), "utf8"));
} catch {}
const sourceGraphSha256 = createHash("sha256").update(JSON.stringify(graph)).digest("hex");
const liveV1CompatibilityRechecked = liveReview?.passed === true
  && liveReview?.sourceGraphSha256 === sourceGraphSha256
  && liveReview?.protocolAdapter?.operation === "erase-dimension-metadata-for-legacy-host";
const result = {
  protocol: "claimipedia-d02-common-algebra2-migration/1",
  date: "2026-10-25",
  sourceGraph: "integrations/claimipedia/research-method/d02-scientific-transformation-graph.mjs",
  composer: "integrations/sourcery/mcp-admission/scientific-derivation-composer/scientific-derivation-process.json",
  graphSha256: sourceGraphSha256,
  dimensionConvention: {
    carrier: "proposal-and-review records about response families",
    siBaseExponentVector: recordDimension,
    interpretation: "The graph nodes are dimensionless semantic records. This vector does not assign units to the response matrices, operators or measurements represented inside those records.",
    physicalQuantityCalibrationClosed: false,
  },
  exactRun: {
    protocol: local.protocol,
    positiveCandidateCount: local.candidates.length,
    positiveSteps: positive?.steps ?? [],
    assumptionCount: positive?.assumptions.length ?? 0,
    lossCount: positive?.losses.length ?? 0,
    evidenceReferenceCount: positive?.evidenceRefs.length ?? 0,
    validTransformationCount: local.receipt.validTransformationCount,
    dimensionRejectedTransformationCount: local.receipt.dimensionRejectedTransformationCount,
    globalCandidateCount: global.candidates.length,
    invalidRuleIds: [...new Set([...local.invalidRules, ...global.invalidRules].map(check => check.rule.id))].sort(),
    authority: {
      proposalOnly: local.receipt.proposalOnly,
      entails: local.receipt.entails,
      empiricalAuthority: local.receipt.empiricalAuthority,
      applicationAdmission: local.receipt.applicationAdmission,
    },
  },
  strictNegativeControls: {
    missingDimensionRule: {
      candidateCount: missingRule.candidates.length,
      rejectedRuleId: missingRule.invalidRules.find(check => check.rule.id === "apply-local-support-schur-theorem")?.rule.id,
      dimensionRuleRecognized: missingRule.invalidRules.find(check => check.rule.id === "apply-local-support-schur-theorem")?.dimensionRuleRecognized,
    },
    invalidDimensionDelta: {
      candidateCount: invalidDelta.candidates.length,
      rejectedRuleId: invalidDelta.invalidRules.find(check => check.rule.id === "apply-local-support-schur-theorem")?.rule.id,
      dimensionallyValid: invalidDelta.invalidRules.find(check => check.rule.id === "apply-local-support-schur-theorem")?.dimensionallyValid,
    },
  },
  decision: {
    primaryD02CommonAlgebra2MigrationClosed: local.protocol === "scientific-derivation-composition/2" && local.candidates.length === 1,
    exactDimensionGatePassed: local.receipt.dimensionRejectedTransformationCount === 0,
    dimensionGateFailsClosed: missingRule.candidates.length === 0 && invalidDelta.candidates.length === 0,
    liveV1CompatibilityRechecked,
    liveV1DimensionProjectionRequired: liveV1CompatibilityRechecked,
    otherD02FamiliesMigrated: false,
    physicalResponseUnitsAssigned: false,
    heldOutProductIdentityPredicted: false,
    physicalOperatorAssignmentExtracted: false,
    detectorRecordPredicted: false,
    ot026Closed: false,
    ot027Closed: false,
  },
  implication: "The first source-native D02 path survives Sourcery common-algebra-2 at the honest dimensionless record layer, and an explicit loss-bearing projection preserves live-v1 execution. This closes semantic dimensional bookkeeping for that path, not the units or dynamics of the represented response. The next gate is migration of the operator, rank-change and boundary families; the physical bridge still requires quantity-level units and a held-out operator or detector prediction.",
};

if (write) await writeFile(resolve(root, "evidence/data/claimipedia-d02-common-algebra2-migration-v1.json"), `${JSON.stringify(result, null, 2)}\n`, "utf8");
console.log(JSON.stringify(result, null, 2));
if (!result.decision.primaryD02CommonAlgebra2MigrationClosed || !result.decision.dimensionGateFailsClosed) process.exitCode = 1;
