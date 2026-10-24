import assert from "node:assert/strict";
import fs from "node:fs";

const evidencePath = new URL(
  "../../evidence/data/boundary-domain-admissibility-bridge-v1.json",
  import.meta.url,
);
const evidence = JSON.parse(fs.readFileSync(evidencePath, "utf8"));

assert.equal(
  evidence.schemaVersion,
  "boundary-domain-admissibility-bridge-v1",
);
assert.equal(evidence.papers.length, 4);
assert.deepEqual(
  evidence.papers.map((paper) => paper.role),
  [
    "bulk_to_boundary_classification",
    "boundary_to_spectrum_transduction",
    "microscopic_to_continuum_translation",
    "flow_to_spectral_dynamics",
  ],
);

const narain = evidence.papers.find((paper) => paper.arxiv === "2610.30525");
const monodromy = evidence.papers.find((paper) => paper.arxiv === "2610.31269");
const onsager = evidence.papers.find((paper) => paper.arxiv === "2610.31653");
const ricci = evidence.papers.find((paper) => paper.arxiv === "2610.31672");

for (const paper of [narain, monodromy, onsager, ricci]) {
  assert.ok(paper);
  assert.ok(paper.controls.length > 0);
  assert.ok(paper.readouts.length > 0);
  assert.ok(paper.boundary.length > 0);
}

const handlebodyCoefficient = (d) => 4 ** (1 - d) - 2 ** (-d);
assert.ok(handlebodyCoefficient(1) > 0);
assert.equal(handlebodyCoefficient(2), 0);
for (let d = 3; d <= 12; d += 1) {
  assert.ok(handlebodyCoefficient(d) < 0);
}
assert.equal(narain.exactData.negativeFromIntegerD, 3);

const piTwist = { gridShift: monodromy.exactData.piFluxGridShift };
assert.equal(piTwist.gridShift, 0.5);
assert.ok(Math.abs(Math.cos(2 * Math.PI * piTwist.gridShift) + 1) < 1e-12);
assert.ok(Math.abs(Math.sin(2 * Math.PI * piTwist.gridShift)) < 1e-12);
assert.ok(Math.abs(Math.cos(4 * Math.PI * piTwist.gridShift) - 1) < 1e-12);
assert.equal(monodromy.exactData.resolvedSymmetryPreservingRelevantScalar, false);
assert.equal(monodromy.exactData.rawNumericalBundlePubliclyLinkedInPreprint, false);
assert.match(monodromy.exactData.releaseStatement, /promised upon publication/);

assert.equal(onsager.exactData.classification, "emanant");
assert.equal(onsager.exactData.freeFermionResult, true);
assert.equal(onsager.exactData.interactingExtensionEstablished, false);

assert.equal(ricci.exactData.operatorMatchInExaminedCases, true);
assert.equal(ricci.exactData.domainFixedByOperatorAlone, false);
assert.equal(ricci.exactData.higherLoopEquivalenceEstablished, false);

assert.deepEqual(evidence.admissionGates, [
  "carrier",
  "selector",
  "translation",
  "flow",
  "positivity",
  "probe",
  "controls",
  "shared_parameters",
]);
assert.equal(
  evidence.nearestExperimentStatus,
  "gated_on_promised_fuzzy_sphere_numerical_bundle",
);

console.log(JSON.stringify({
  status: "PASS",
  papers: evidence.papers.map(({ arxiv, role }) => ({ arxiv, role })),
  narainPositivityCheck: {
    d1: handlebodyCoefficient(1),
    d2: handlebodyCoefficient(2),
    d3: handlebodyCoefficient(3),
    negativeForCheckedIntegersFrom3: true,
  },
  retainedArchitecture: evidence.architecture,
  verdict: evidence.verdict,
}));
