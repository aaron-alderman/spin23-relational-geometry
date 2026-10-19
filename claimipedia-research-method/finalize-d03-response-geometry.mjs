import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const generated = resolve(here, "generated");
const read = (name) => JSON.parse(readFileSync(resolve(generated, name), "utf8"));
const sha256 = (value) => createHash("sha256").update(value).digest("hex");

const receiptFiles = [
  "d03-free-metric-higgs-receipt.json",
  "d03-abelian-anomaly-receipt.json",
  "d03-projective-spectrum-receipt.json",
  "d03-mixed-scalar-cut-receipt.json",
  "d03-thermal-control-receipt.json",
  "d03-scheme-open-image-receipt.json",
  "d03-electroweak-closure-receipt.json"
];
const receipts = receiptFiles.map((file) => ({ file, receipt: read(file) }));
assert.ok(receipts.every(({ receipt }) => receipt.passed === true && Object.values(receipt.checks).every(Boolean)));
const review = read("d03-sourcery-review.json");
assert.equal(review.passed, true);

const docket = {
  protocol: "claimipedia-d03-response-geometry-exhaustion-docket/1",
  campaign: "D-03 metric-Higgs response geometry",
  strongestPositiveResult: "In the simplified running Abelian-Higgs scalar rung, gauge-pair, scalar-pair and mixed four-scalar state classes generically provide three distinct projective source directions and hence span H2 globally.",
  centralDemotion: "Full H2 span is generic carrier evidence, not evidence for Spin(2,3) dynamics; the vacuum family is locally one-dimensional and generic Sp(4,R) fractional maps do not preserve fixed QFT thresholds.",
  exactOrExecutableFindings: [
    "free improved Higgs response is a ray",
    "gauge trace anomaly opens a positive rank-two plane",
    "three distinct real projective source ratios span H2",
    "nonzero beta_lambda generically supplies the third ratio in the simplified four-scalar cut",
    "independent thermal tensor/shear/sound weights form an open positive-control subcone",
    "source congruence and fixed-s improvement preserve rank and projective distinctness",
    "a one-parameter vacuum scan has local image rank at most one",
    "a lower symplectic shear moves a fixed two-pole support and disproves generic physical closure",
    "the anomaly-orientation observable equals beta_lambda/(lambda sum_i D_i) in the declared rung"
  ],
  gateDispositions: {
    mixedFourParticleRatio: "closed structurally in simplified scalar rung; full charged/BRST normalization remains external",
    thermalPositiveControl: "closed",
    renormalizationAndContactTerms: "closed at covariance/absorptive-quotient level",
    gaugeAndBrst: "qualified frontier; simplified strike is not a BRST-complete amplitude",
    realStructure: "conditional H2(R); canonical carrier is H2(C) absent antiunitary certification",
    globalLinearSpan: "established in simplified interacting rung",
    vacuumOpenImage: "no-go",
    controlledOpenImage: "external three-control Jacobian frontier",
    electroweakLift: "genericity argument only; no full numerical spectral calculation",
    transformationClosure: "generic full Sp4 closure refuted; congruence/contact subgroup retained",
    typedA2Bridge: "no-go without threshold-preserving S3 action and intertwiners",
    constrainedObservable: "leading-order anomaly-orientation relation retained"
  },
  sourceryReview: review,
  externalFrontiers: [
    "BRST-complete electroweak form factors and normalized spectral densities",
    "finite-temperature, momentum and Higgs-background rank-three Jacobian",
    "search for a special physical non-congruence transformation preserving the exact spectrum",
    "lattice, dispersive or collider protocol for the anomaly-orientation relation"
  ],
  exhaustion: {
    everyTechnicallyActionableGateHasDisposition: true,
    unresolvedInScopeGateThatCanChangeCurrentClassification: false,
    remainingItemsRequireNewFieldTheoryCalculationOrEmpiricalInput: true,
    currentClassification: "ambient-response-geometry-with-constrained-anomaly-observable; no dynamical Spin23 or typed A2 bridge"
  },
  receiptHashes: Object.fromEntries(receipts.map(({ file, receipt }) => [file, receipt.resultSha256])),
  authority: { proposalOnly: true, entails: false, empiricalAuthority: false, automaticCorpusAdmission: false, applicationAdmission: false }
};
docket.docketSha256 = sha256(JSON.stringify(docket));
mkdirSync(generated, { recursive: true });
writeFileSync(resolve(generated, "d03-response-geometry-exhaustion-docket.json"), `${JSON.stringify(docket, null, 2)}\n`);
console.log(JSON.stringify({ protocol: docket.protocol, classification: docket.exhaustion.currentClassification, frontierCount: docket.externalFrontiers.length, docketSha256: docket.docketSha256, passed: true }, null, 2));
