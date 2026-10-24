import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const wave = path.join(root, "corpus/programmes/frontier/wave-7");
const read = (name) => JSON.parse(fs.readFileSync(path.join(wave, name), "utf8"));
const insist = (condition, message) => { if (!condition) throw new Error(message); };

const ledger = read("claimipedia_operator_exhaustion_v1.json");
const relationship = read("claimipedia_relationship_operator_algebra_v1.json");
const closed = read("claimipedia_spin_temple_closed_carrier_v1.json");
const programme = read("claimipedia_programme_core_source_v1.json");

const hashes = [ledger, relationship, closed, programme].map((item) => item.sourceHash);
insist(new Set(hashes).size === 1, "source hashes do not agree");

insist(ledger.relationshipLayer.carrierDimension === relationship.carrier.nodeCount, "relationship carrier mismatch");
insist(ledger.relationshipLayer.algebraDimension === relationship.generatedAlgebra.unitalDimension, "relationship algebra mismatch");
insist(ledger.relationshipLayer.jacobsonRadicalDimension === 58, "full relationship radical mismatch");
insist(ledger.relationshipLayer.algebraDimension - ledger.relationshipLayer.jacobsonRadicalDimension === 8, "full quotient dimension mismatch");
insist(relationship.spinTempleCorner.lieClosure === "sl2(Q)", "Spin--Temple sl2 missing");
insist(closed.interpretation.secondSimpleRootFound === false, "unexpected second relationship root");
insist(closed.interpretation.c2CartanSerreClosureFound === false, "unexpected relationship C2 closure");

insist(programme.families.length === 3 && programme.typedEdges.length === 12, "programme census mismatch");
insist(JSON.stringify(ledger.programmeLayer.cartanMatrix) === JSON.stringify([[2, -1], [-1, 2]]), "programme Cartan matrix is not A2");
insist(ledger.programmeLayer.c2 === false, "programme layer incorrectly promoted to C2");

const evidenceCount = Object.values(ledger.evidenceLayer.directionCounts).reduce((sum, count) => sum + count, 0);
insist(evidenceCount === ledger.evidenceLayer.recordCount, "evidence census mismatch");
insist(ledger.evidenceLayer.pathIdealSquareZero === true, "evidence ideal is not declared square-zero");

const provenance = ledger.provenanceLayer;
insist(provenance.declarationReceipts === provenance.contributions, "provenance receipt/contribution mismatch");
insist(provenance.contributions === provenance.contributionReviews, "provenance contribution/review mismatch");
insist(provenance.contributionReceiptBijection && provenance.reviewContributionBijection && provenance.allTargetTriplesAgree, "provenance chain is not bijective");
insist(provenance.invariantAlternatingFormSpaceDimension === 1, "provenance form-space mismatch");
insist(provenance.maximumInvariantAlternatingFormRank === 2 && provenance.nondegenerateInvariantAlternatingForm === false, "provenance symplectic no-go mismatch");

insist(ledger.combinedConclusion.authoredSemisimpleLieFactors === "sl2(Q) + sl3(Q)", "combined Lie factors mismatch");
insist(ledger.combinedConclusion.sp4Embedding === false, "sp4 was promoted without the gate packet");

console.log(JSON.stringify({
  status: "PASS",
  sourceHash: hashes[0],
  relationshipQuotientDimension: 8,
  relationshipSemisimpleLiePart: "sl2(Q)",
  programmeRootSystem: "A2",
  programmeSemisimpleLiePart: "sl3(Q)",
  evidenceSemisimpleLiePart: "0",
  provenanceSemisimpleLiePart: "0",
  combinedSemisimpleLiePart: "sl2(Q) + sl3(Q)",
  sp4Embedding: false,
  disposition: "EXHAUSTED_PENDING_NEW_AUTHORED_OPERATOR",
}));
