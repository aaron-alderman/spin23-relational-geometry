import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const target = "corpus/programmes/frontier-physics-targets/corpus_completion_exit_criteria_v1.json";
const contract = JSON.parse(fs.readFileSync(path.join(root, target), "utf8"));
const objectExpansionTarget = "corpus/programmes/frontier-physics-targets/physics_math_object_expansion_v1.json";
const objectExpansion = JSON.parse(fs.readFileSync(path.join(root, objectExpansionTarget), "utf8"));
const theoryAuditTarget = "corpus/programmes/frontier-physics-targets/theory_bridge_audit_v1.json";
const theoryAudit = JSON.parse(fs.readFileSync(path.join(root, theoryAuditTarget), "utf8"));
const literatureAuditTarget = "corpus/programmes/frontier-physics-targets/literature_frontier_search_register_v1.json";
const literatureAudit = JSON.parse(fs.readFileSync(path.join(root, literatureAuditTarget), "utf8"));
const implicationGraphTarget = "corpus/programmes/frontier-physics-targets/claim_implication_defeat_graph_v1.json";
const implicationGraph = JSON.parse(fs.readFileSync(path.join(root, implicationGraphTarget), "utf8"));
const narrativeAuditTarget = "corpus/programmes/frontier-physics-targets/standalone_narrative_audit_v1.json";
const narrativeAudit = JSON.parse(fs.readFileSync(path.join(root, narrativeAuditTarget), "utf8"));
const failures = [];

if (contract.schema !== "frontier.corpus-completion-exit-criteria/1") failures.push("schema mismatch");
if (contract.status !== "active") failures.push("durable target is not active");
if (contract.completionClaimAllowed !== false) failures.push("completion is allowed before all exit gates pass");
if (!Array.isArray(contract.requiredAdjacencyFamilies) || contract.requiredAdjacencyFamilies.length !== 12) failures.push("adjacency universe is incomplete");
if (!Array.isArray(contract.requiredAdjacencyDispositions) || contract.requiredAdjacencyDispositions.length !== 8) failures.push("adjacency dispositions are incomplete");
if (!Array.isArray(contract.terminalNeighbourhoodMoves) || contract.terminalNeighbourhoodMoves.length !== 8) failures.push("terminal neighbourhood protocol is incomplete");
if (JSON.stringify(contract.experimentDecisionLayers) !== JSON.stringify(["build_go_no_go", "bridge_go_no_go", "physics_go_no_go"])) failures.push("experiment decision layers drifted");
if (!Array.isArray(contract.experimentRequiredFields) || contract.experimentRequiredFields.length < 18) failures.push("experiment programme contract is incomplete");
if (!Array.isArray(contract.gates) || contract.gates.length !== 9) failures.push("nine exit gates are required");

const expectedGateIds = Array.from({ length: 9 }, (_, index) => `EXIT-${String(index + 1).padStart(2, "0")}`);
const actualGateIds = contract.gates.map(gate => gate.id);
if (JSON.stringify(actualGateIds) !== JSON.stringify(expectedGateIds)) failures.push("exit gate identifiers drifted");
for (const gate of contract.gates ?? []) {
  if (!gate.name || !gate.exit || !gate.missingArtifact) failures.push(`${gate.id}: incomplete gate definition`);
  if (!Array.isArray(gate.currentEvidence) || !gate.currentEvidence.length) failures.push(`${gate.id}: no current evidence`);
  for (const source of gate.currentEvidence ?? []) if (!fs.existsSync(path.join(root, source))) failures.push(`${gate.id}: missing evidence ${source}`);
}

const adjacencyGate = contract.gates?.find(gate => gate.id === "EXIT-01");
const objectSummary = objectExpansion.summary ?? {};
const objectLayerPasses = objectSummary.topicLayerComplete === true
  && objectSummary.objectLayerComplete === true
  && objectSummary.unmappedReviewRequired === 0
  && objectSummary.conflictReviewRequired === 0
  && objectSummary.routingReviewRequired === 0;
if (!objectLayerPasses) failures.push("EXIT-01: object-level adjacency expansion is not complete");
if (adjacencyGate?.status !== (objectLayerPasses ? "passed" : "open")) failures.push("EXIT-01: contract status is inconsistent with the object-level adjacency verifier summary");

const theoryGate = contract.gates?.find(gate => gate.id === "EXIT-04");
const theoryLayerPasses = theoryAudit.summary?.unresolvedStructuralRecords === 0
  && theoryAudit.summary?.bridgeClusters === objectExpansion.summary?.claimFamilyClusters
  && theoryAudit.summary?.coveredObjectFamilyCells === objectExpansion.summary?.objectFamilyCells
  && Array.isArray(theoryAudit.records)
  && theoryAudit.records.length === theoryAudit.summary.bridgeClusters;
if (!theoryLayerPasses) failures.push("EXIT-04: theory-bridge audit is not structurally complete");
if (theoryGate?.status !== (theoryLayerPasses ? "passed" : "open")) failures.push("EXIT-04: contract status is inconsistent with the theory-bridge audit summary");

const literatureGate = contract.gates?.find(gate => gate.id === "EXIT-05");
const literatureLayerPasses = literatureAudit.summary?.branches === 22
  && literatureAudit.summary?.receiptsComplete === 22
  && literatureAudit.summary?.missingReceipts === 0
  && Array.isArray(literatureAudit.records)
  && literatureAudit.records.length === 22;
if (!literatureLayerPasses) failures.push("EXIT-05: literature-frontier register is incomplete");
if (literatureGate?.status !== (literatureLayerPasses ? "passed" : "open")) failures.push("EXIT-05: contract status is inconsistent with the literature register summary");

const implicationGate = contract.gates?.find(gate => gate.id === "EXIT-06");
const implicationLayerPasses = implicationGraph.summary?.claims === 1573
  && implicationGraph.summary?.unresolvedClaims === 0
  && Array.isArray(implicationGraph.nodes)
  && implicationGraph.nodes.length === implicationGraph.summary.claims
  && Array.isArray(implicationGraph.dependencyEdges)
  && implicationGraph.dependencyEdges.length === implicationGraph.summary.explicitDependencyEdges;
if (!implicationLayerPasses) failures.push("EXIT-06: claim implication/defeat graph is incomplete");
if (implicationGate?.status !== (implicationLayerPasses ? "passed" : "open")) failures.push("EXIT-06: contract status is inconsistent with the implication graph summary");

const narrativeGate = contract.gates?.find(gate => gate.id === "EXIT-07");
const narrativeLayerPasses = narrativeAudit.summary?.routes === 3
  && narrativeAudit.summary?.passingRoutes === 3
  && narrativeAudit.summary?.unresolvedRoutes === 0
  && narrativeAudit.summary?.forbiddenHistoryMarkers === 0
  && narrativeAudit.summary?.bookOrderPass === true
  && narrativeAudit.summary?.theologyAssumptionPass === true;
if (!narrativeLayerPasses) failures.push("EXIT-07: standalone narrative audit is incomplete");
if (narrativeGate?.status !== (narrativeLayerPasses ? "passed" : "open")) failures.push("EXIT-07: contract status is inconsistent with the narrative audit summary");

const allPass = contract.gates?.every(gate => gate.status === "passed") ?? false;
if (contract.globalExit?.allGatesMustPass !== true) failures.push("global exit does not require every gate");
if (!Array.isArray(contract.globalExit?.externalBlockerContract) || contract.globalExit.externalBlockerContract.length !== 6) failures.push("external blocker contract is incomplete");
if (allPass !== contract.completionClaimAllowed) failures.push("completion flag is inconsistent with gate states");
if (contract.globalExit?.presentStatus !== "current_input_computational_exhaustion_only") failures.push("present status overclaims completion");

if (failures.length) {
  console.error(JSON.stringify({ result: "fail", failures }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  result: "pass",
  target,
  gates: contract.gates.length,
  open: contract.gates.filter(gate => gate.status === "open").length,
  completionClaimAllowed: contract.completionClaimAllowed,
  presentStatus: contract.globalExit.presentStatus
}, null, 2));
