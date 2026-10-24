import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { executeProcess } from "file:///C:/Users/aaron/sourcery/.consolidation/temple-supervisor/runtime/2026-10-17-generated-view-materializer-v8r3/surface-async-process.mjs";
import { graph as localGraph, queries as localQueries, recordDimension } from "../integrations/claimipedia/research-method/d02-scientific-transformation-graph.mjs";

const write = process.argv.includes("--write");
const root = resolve(import.meta.dirname, "..");
const researchRoot = resolve(root, "integrations/claimipedia/research-method");
const generatedRoot = resolve(researchRoot, "generated");
const model = JSON.parse(await readFile(resolve(root, "integrations/sourcery/mcp-admission/scientific-derivation-composer/scientific-derivation-process.json"), "utf8"));

const definitions = [
  { id: "local", graph: localGraph, queries: localQueries, review: "d02-sourcery-review.json", expectedInvalid: 2 },
  { id: "operator", graphFile: "d02-operator-common-algebra2-graph.json", review: "d02-operator-sourcery-review.json", expectedInvalid: 4 },
  { id: "rank-change", graphFile: "d02-exhaustion-common-algebra2-graph.json", review: "d02-exhaustion-sourcery-review.json", expectedInvalid: 3 },
  { id: "boundary", graphFile: "d02-boundary-common-algebra2-graph.json", review: "d02-boundary-sourcery-review.json", expectedInvalid: 6 },
];

async function compose(graph, query) {
  const env = await executeProcess(model.program, { model, request: { graph: structuredClone(graph), query: structuredClone(query) } }, { compute: {}, ports: {} });
  return env.result;
}

const families = [];
for (const definition of definitions) {
  let graph = definition.graph;
  let queries = definition.queries;
  if (definition.graphFile) {
    const source = JSON.parse(await readFile(resolve(generatedRoot, definition.graphFile), "utf8"));
    graph = source.graph;
    queries = source.queries;
  }
  const review = JSON.parse(await readFile(resolve(generatedRoot, definition.review), "utf8"));
  const results = [];
  for (const query of queries) results.push({ query, result: await compose(graph, query) });
  const positiveEntry = results.find(entry => entry.result.candidates.length > 0);
  const positive = positiveEntry?.result.candidates[0];
  const negativeEntries = results.filter(entry => entry !== positiveEntry);
  const invalidRuleIds = [...new Set(results.flatMap(entry => entry.result.invalidRules.map(check => check.rule.id)))].sort();
  const graphSha256 = createHash("sha256").update(JSON.stringify(graph)).digest("hex");

  const gateRuleId = positive?.steps[0];
  const missingRuleGraph = structuredClone(graph);
  delete missingRuleGraph.transformations.find(rule => rule.id === gateRuleId).dimensionRule;
  const missingRule = await compose(missingRuleGraph, positiveEntry.query);
  const invalidDeltaGraph = structuredClone(graph);
  invalidDeltaGraph.transformations.find(rule => rule.id === gateRuleId).dimensionDelta.time = -1;
  const invalidDelta = await compose(invalidDeltaGraph, positiveEntry.query);

  families.push({
    id: definition.id,
    graphSha256,
    resultProtocol: positiveEntry.result.protocol,
    positiveCandidateCount: positiveEntry.result.candidates.length,
    positiveSteps: positive.steps,
    assumptionCount: positive.assumptions.length,
    lossCount: positive.losses.length,
    evidenceReferenceCount: positive.evidenceRefs.length,
    validTransformationCount: positiveEntry.result.receipt.validTransformationCount,
    dimensionRejectedTransformationCount: positiveEntry.result.receipt.dimensionRejectedTransformationCount,
    negativeQueryCount: negativeEntries.length,
    negativeCandidateCount: negativeEntries.reduce((sum, entry) => sum + entry.result.candidates.length, 0),
    invalidRuleIds,
    expectedInvalidRuleCount: definition.expectedInvalid,
    liveV1: {
      passed: review.passed,
      sourceGraphSha256: review.sourceGraphSha256,
      sourceGraphMatches: review.sourceGraphSha256 === graphSha256,
      projectionOperation: review.protocolAdapter?.operation,
    },
    strictNegativeControls: {
      missingDimensionRule: {
        candidateCount: missingRule.candidates.length,
        dimensionRuleRecognized: missingRule.invalidRules.find(check => check.rule.id === gateRuleId)?.dimensionRuleRecognized,
      },
      invalidDimensionDelta: {
        candidateCount: invalidDelta.candidates.length,
        dimensionallyValid: invalidDelta.invalidRules.find(check => check.rule.id === gateRuleId)?.dimensionallyValid,
      },
    },
    authority: {
      proposalOnly: positiveEntry.result.receipt.proposalOnly,
      entails: positiveEntry.result.receipt.entails,
      empiricalAuthority: positiveEntry.result.receipt.empiricalAuthority,
      applicationAdmission: positiveEntry.result.receipt.applicationAdmission,
    },
  });
}

const totals = {
  families: families.length,
  admittedPositivePaths: families.reduce((sum, family) => sum + family.positiveCandidateCount, 0),
  namedPositiveSteps: families.reduce((sum, family) => sum + family.positiveSteps.length, 0),
  negativeQueries: families.reduce((sum, family) => sum + family.negativeQueryCount, 0),
  negativeCandidates: families.reduce((sum, family) => sum + family.negativeCandidateCount, 0),
  invalidRuleFixtures: families.reduce((sum, family) => sum + family.invalidRuleIds.length, 0),
  dimensionRejectedPositiveTransformations: families.reduce((sum, family) => sum + family.dimensionRejectedTransformationCount, 0),
};
const allStrict = families.every(family => family.resultProtocol === "scientific-derivation-composition/2"
  && family.positiveCandidateCount === 1
  && family.positiveSteps.length === 4
  && family.dimensionRejectedTransformationCount === 0
  && family.negativeCandidateCount === 0
  && family.invalidRuleIds.length === family.expectedInvalidRuleCount
  && family.strictNegativeControls.missingDimensionRule.candidateCount === 0
  && family.strictNegativeControls.missingDimensionRule.dimensionRuleRecognized === false
  && family.strictNegativeControls.invalidDimensionDelta.candidateCount === 0
  && family.strictNegativeControls.invalidDimensionDelta.dimensionallyValid === false);
const allLive = families.every(family => family.liveV1.passed === true
  && family.liveV1.sourceGraphMatches === true
  && family.liveV1.projectionOperation === "erase-dimension-metadata-for-legacy-host");

const output = {
  protocol: "claimipedia-d02-common-algebra2-family-migration/1",
  date: "2026-10-25",
  dimensionConvention: {
    carrier: "proposal-and-review records about response families",
    siBaseExponentVector: recordDimension,
    physicalQuantityCalibrationClosed: false,
  },
  families,
  totals,
  decision: {
    allFourRecordLayerMigrationsClosed: allStrict,
    allFourLiveV1ProjectionsRechecked: allLive,
    commonAlgebra2DimensionMigrationOpen: !allStrict,
    physicalResponseUnitsAssigned: false,
    heldOutProductIdentityPredicted: false,
    physicalOperatorAssignmentExtracted: false,
    detectorRecordPredicted: false,
    ot026Closed: false,
    ot027Closed: false,
  },
  implication: "All four source-native D02 path families pass common-algebra-2 at the dimensionless proposal-record layer and retain their fail-closed negative controls. This completes record-level dimensional migration. It does not assign units to the represented response quantities, derive a Jordan product, select physical dynamics or predict a detector record; those are now the exact remaining translation gates.",
};

if (write) await writeFile(resolve(root, "evidence/data/claimipedia-d02-common-algebra2-family-migration-v1.json"), `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log(JSON.stringify(output, null, 2));
if (!allStrict || !allLive) process.exitCode = 1;
