import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const wave = path.join(root, "corpus/programmes/frontier/wave-7");
const source = JSON.parse(fs.readFileSync(path.join(wave, "claimipedia_relationship_operator_source_v1.json"), "utf8"));
const ale = JSON.parse(fs.readFileSync(path.join(wave, "sourcery_ale_algebra_v1.json"), "utf8"));
const ledger = JSON.parse(fs.readFileSync(path.join(wave, "claimipedia_sourcery_typed_extraction_boundary_v1.json"), "utf8"));
const composer = JSON.parse(fs.readFileSync(path.join(root, "integrations/sourcery/mcp-admission/scientific-derivation-composer/scientific-derivation-process.json"), "utf8"));

const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };
const edges = source.edges;
const nodes = new Set(edges.flatMap(([from, to]) => [from, to]));
const triples = edges.map((edge) => JSON.stringify(edge));
const uniqueTriples = new Set(triples);
const multiplicities = new Map();
for (const triple of triples) multiplicities.set(triple, (multiplicities.get(triple) ?? 0) + 1);
const duplicateClasses = [...multiplicities.values()].filter((count) => count > 1);
const relationCounts = {};
for (const [, , relationType] of edges) relationCounts[relationType] = (relationCounts[relationType] ?? 0) + 1;

const lengthTwoPaths = [];
for (const first of edges) for (const second of edges) {
  if (first[1] === second[0]) lengthTwoPaths.push({
    from: first[0],
    to: second[1],
    word: `${first[2]}>${second[2]}`,
  });
}
const lengthTwoWords = new Set(lengthTwoPaths.map((item) => item.word));
const lengthTwoEndpointWords = new Set(lengthTwoPaths.map((item) => JSON.stringify(item)));
const qualifiesQualifiesEndpoints = new Set(lengthTwoPaths
  .filter((item) => item.word === "Qualifies>Qualifies")
  .map((item) => `${item.from}->${item.to}`));

// The capture exposes each relationship as a positional triple only.  These
// are the metadata classes tested by common-algebra-2 before an edge may enter
// an admitted Sourcery path.
const requiredAuthoredMetadata = [
  "stableTransformationId",
  "fromSignature",
  "toSignature",
  "fromDimension",
  "toDimension",
  "dimensionRule",
  "dimensionDelta",
  "changes",
  "assumptions",
  "losses",
  "evidenceRefs",
  "analogyOnly",
  "authority",
];
const directlyAdmissible = edges.filter((edge) => !Array.isArray(edge) && requiredAuthoredMetadata.every((field) => field in edge));
const processText = JSON.stringify(composer);

check(source.schema === "claimipedia-relationship-operator-source/1", "unexpected Claimipedia source schema");
check(ale.schema === "sourcery-ale-algebra/1", "unexpected Sourcery ALE schema");
check(composer.protocol === "scientific-derivation-composition/common-algebra-2", "unexpected composer protocol");
for (const token of ["fromSignatureMatches", "toSignatureMatches", "evidencePresent", "lossDeclared", "dimensionallyValid", "authorityBounded"]) {
  check(processText.includes(token), `composer no longer tests ${token}`);
}
check(edges.length === ledger.claimipediaCapture.relationshipRecords, "relationship-record count changed");
check(nodes.size === ledger.claimipediaCapture.nodeCount, "node count changed");
check(uniqueTriples.size === ledger.claimipediaCapture.uniqueTriples, "unique-triple count changed");
check(JSON.stringify(relationCounts) === JSON.stringify(ledger.claimipediaCapture.relationTypeCounts), "relation-type counts changed");
check(duplicateClasses.length === ledger.claimipediaCapture.duplicateTripleClasses, "duplicate-class count changed");
check(duplicateClasses.every((count) => count === 2), "unexpected duplicate multiplicity");
check(lengthTwoPaths.length === ledger.pathAudit.lengthTwoPathInstances, "length-two path count changed");
check(lengthTwoEndpointWords.size === ledger.pathAudit.uniqueLengthTwoEndpointWords, "length-two endpoint-word count changed");
check(lengthTwoWords.size === ledger.pathAudit.relationTypeWords, "length-two relation-word count changed");
check(qualifiesQualifiesEndpoints.size === ledger.pathAudit.qualifiesQualifiesEndpointPairs, "Qualifies/Qualifies collision count changed");
check(directlyAdmissible.length === 0, "raw Claimipedia edge unexpectedly satisfies Sourcery admission metadata");
check(ledger.directExtraction.directlyAdmissibleTransformations === 0, "ledger must retain the zero direct-admission result");
check(ledger.directExtraction.requiredAuthoredMetadata.every((field) => requiredAuthoredMetadata.includes(field)), "ledger metadata inventory drifted");
check(ledger.decision.claimipediaToSourceryTypedFunctorExtracted === false, "typed functor must remain unextracted");
check(ledger.decision.graphSkeletonRetained === true, "graph-skeleton retention must remain explicit");
check(ledger.decision.ot026Closed === false && ledger.decision.ot027Closed === false, "translation gates were closed by a negative extraction test");

if (failures.length) {
  console.error(JSON.stringify({ result: "fail", failures }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  result: "pass",
  relationshipRecords: edges.length,
  nodes: nodes.size,
  uniqueTriples: uniqueTriples.size,
  duplicateTripleClasses: duplicateClasses.length,
  relationTypeCounts: relationCounts,
  lengthTwoPathInstances: lengthTwoPaths.length,
  relationTypeWords: lengthTwoWords.size,
  qualifiesQualifiesEndpointPairs: qualifiesQualifiesEndpoints.size,
  directlyAdmissibleTransformations: directlyAdmissible.length,
  conclusion: "directed graph skeleton retained; typed ALE/scientific functor not extracted",
}, null, 2));
