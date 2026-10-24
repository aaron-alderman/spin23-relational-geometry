import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const write = process.argv.includes("--write");
const root = resolve(import.meta.dirname, "..");
const reviewRoot = resolve(root, "integrations/claimipedia/research-method");
const generatedRoot = resolve(reviewRoot, "generated");
const outputPath = resolve(root, "evidence/data/claimipedia-sourcery-live-path-audit-v1.json");
const processPath = resolve(root, "integrations/sourcery/mcp-admission/scientific-derivation-composer/scientific-derivation-process.json");

const families = [
  { id: "local", review: "d02-sourcery-review.json", runner: "run-d02-sourcery-review.mjs", dimensionSource: "d02-scientific-transformation-graph.mjs", positiveKey: "localCandidateSteps", negativeCount: 1 },
  { id: "operator", review: "d02-operator-sourcery-review.json", runner: "run-d02-operator-sourcery-review.mjs", positiveKey: "positiveCandidateSteps" },
  { id: "rank-change", review: "d02-exhaustion-sourcery-review.json", runner: "run-d02-exhaustion-sourcery-review.mjs", positiveKey: "positiveCandidateSteps" },
  { id: "boundary", review: "d02-boundary-sourcery-review.json", runner: "run-d02-boundary-sourcery-review.mjs", positiveKey: "positiveCandidateSteps" },
];

const composer = JSON.parse(await readFile(processPath, "utf8"));
const rows = [];
for (const family of families) {
  const review = JSON.parse(await readFile(resolve(generatedRoot, family.review), "utf8"));
  const runnerText = await readFile(resolve(reviewRoot, family.runner), "utf8");
  const dimensionText = family.dimensionSource
    ? await readFile(resolve(reviewRoot, family.dimensionSource), "utf8")
    : runnerText;
  const positivePaths = review.summary[family.positiveKey];
  const positiveQuery = review.queries.find(({ result }) => result.candidates.length > 0);
  const candidate = positiveQuery?.result.candidates[0];
  const negativeCandidateCounts = review.summary.negativeCandidateCounts
    ?? { global: review.summary.globalCandidateCount };
  rows.push({
    id: family.id,
    review: `integrations/claimipedia/research-method/generated/${family.review}`,
    runner: `integrations/claimipedia/research-method/${family.runner}`,
    passed: review.passed,
    host: review.host,
    resultProtocol: positiveQuery?.result.protocol,
    positiveCandidateCount: positivePaths.length,
    positiveSteps: positivePaths.flat(),
    negativeCandidateCounts,
    invalidRuleIds: review.summary.invalidRuleIds,
    candidateLedger: {
      assumptionCount: candidate?.assumptions.length ?? 0,
      lossCount: candidate?.losses.length ?? 0,
      evidenceReferenceCount: candidate?.evidenceRefs.length ?? 0,
      entails: candidate?.entails,
      empiricalAuthority: candidate?.empiricalAuthority,
      applicationAdmission: candidate?.applicationAdmission,
    },
    commonAlgebra2DimensionFieldsPresent: {
      objectDimension: /\bdimension\s*:/.test(dimensionText),
      fromDimension: /\bfromDimension\s*:/.test(dimensionText),
      toDimension: /\btoDimension\s*:/.test(dimensionText),
      dimensionRule: /\bdimensionRule\s*:/.test(dimensionText),
      dimensionDelta: /\bdimensionDelta\s*:/.test(dimensionText),
    },
  });
}

const allSteps = rows.flatMap(row => row.positiveSteps);
const negativeQueries = rows.reduce((total, row) => total + Object.keys(row.negativeCandidateCounts).length, 0);
const negativeCandidates = rows.reduce((total, row) => total + Object.values(row.negativeCandidateCounts).reduce((sum, count) => sum + count, 0), 0);
const invalidRuleIds = rows.flatMap(row => row.invalidRuleIds);
const dimensionedFamilies = rows.filter(row => Object.values(row.commonAlgebra2DimensionFieldsPresent).every(Boolean)).map(row => row.id);
const dimensionTokens = ["fromDimensionMatches", "toDimensionMatches", "dimensionRuleRecognized", "dimensionallyValid", "dimensionChangeDeclared"];
const processText = JSON.stringify(composer);

const result = {
  protocol: "claimipedia-sourcery-live-path-audit/1",
  date: "2026-10-25",
  scope: "Source-native D02 scientific-transformation paths tested against the active Sourcery host; compared with the stricter local common-algebra-2 contract.",
  activeHost: rows[0].host,
  families: rows,
  totals: {
    admittedPositivePaths: rows.reduce((total, row) => total + row.positiveCandidateCount, 0),
    namedPositiveSteps: allSteps.length,
    distinctNamedPositiveSteps: new Set(allSteps).size,
    zeroCandidateNegativeQueries: negativeQueries,
    negativeCandidates,
    invalidRuleFixturesRetained: invalidRuleIds.length,
    distinctInvalidRuleFixtures: new Set(invalidRuleIds).size,
  },
  protocolBoundary: {
    activeResultProtocols: [...new Set(rows.map(row => row.resultProtocol))],
    stricterLocalProtocol: composer.protocol,
    stricterDimensionChecksPresent: dimensionTokens.filter(token => processText.includes(token)),
    runnersSupplyingAllRequiredDimensionFields: dimensionedFamilies,
  },
  decision: {
    liveV1SourceNativeAdmissionClosed: rows.every(row => row.passed && row.positiveCandidateCount === 1),
    sourceNativeAssumptionLossEvidenceLedgersRetained: rows.every(row => row.candidateLedger.assumptionCount > 0 && row.candidateLedger.lossCount > 0 && row.candidateLedger.evidenceReferenceCount > 0),
    authorityFirewallRetained: rows.every(row => row.candidateLedger.entails === false && row.candidateLedger.empiricalAuthority === false && row.candidateLedger.applicationAdmission === false),
    heldOutNegativeControlsRetained: negativeQueries === 14 && negativeCandidates === 0 && invalidRuleIds.length === 15,
    wave72GraphOnlyNoGoUnchanged: true,
    primaryCommonAlgebra2DimensionMigrationClosed: dimensionedFamilies.includes("local"),
    commonAlgebra2DimensionMigrationOpen: dimensionedFamilies.length < rows.length,
    jordanProductExtracted: false,
    physicalOperatorAssignmentExtracted: false,
    detectorRecordPredicted: false,
    ot026Closed: false,
    ot027Closed: false,
  },
  reason: "The relationship capture and the D02 transformation graphs are different source objects. The former remains an epistemic graph with zero directly admissible scientific transformations; the latter authors scientific operations with typed endpoints, assumptions, losses, evidence and bounded authority.",
  implication: "A real Claimipedia-to-Sourcery workflow bridge exists at protocol v1, and its primary local-theorem path now passes common-algebra-2 through an explicit dimensionless-record convention. The other three families still need dimensional migration; none of the four yet yields a graph-derived Jordan product, physical operator or detector prediction.",
};

if (write) await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
console.log(JSON.stringify({ outputPath, totals: result.totals, protocolBoundary: result.protocolBoundary, decision: result.decision }, null, 2));
