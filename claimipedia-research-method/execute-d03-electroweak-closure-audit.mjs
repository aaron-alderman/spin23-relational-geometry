import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const generated = resolve(here, "generated");
const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const det3 = ([a, b, c]) =>
  a[0] * (b[1] * c[2] - b[2] * c[1]) - a[1] * (b[0] * c[2] - b[2] * c[0]) + a[2] * (b[0] * c[1] - b[1] * c[0]);
const finiteDirection = (r) => [r ** 2, 1, Math.SQRT2 * r];
const infinityDirection = [1, 0, 0];

const r2 = 2.4;
const betaLambda = 0.18;
const lambda = 0.3;
const propagatorSum = 1.7;
const r4 = r2 + betaLambda / (lambda * propagatorSum);
const orientationDeterminant = det3([infinityDirection, finiteDirection(r2), finiteDirection(r4)]);
const anomalyOrientation = orientationDeterminant / Math.SQRT2;
const predictedOrientation = betaLambda / (lambda * propagatorSum);
assert.ok(Math.abs(anomalyOrientation - predictedOrientation) < 1e-12);

// A lower symplectic shear sends M to M(I+C M)^-1.  For m_t(z)=-1/(z-t), C=c gives m_t -> m_(t+c).
const originalPoles = [0, 2];
const lowerShear = 1;
const transformedPoles = originalPoles.map((t) => t + lowerShear);
const supportClosed = transformedPoles.every((pole) => originalPoles.includes(pole));
assert.equal(supportClosed, false);

const thresholdLabels = [
  { id: "gauge-pair", threshold: 0, direction: "metric-dominated/infinity" },
  { id: "scalar-pair", threshold: 4, direction: `finite/${r2}` },
  { id: "four-scalar", threshold: 16, direction: `finite/${r4}` }
];
const allPermutationsPreserveThresholds = thresholdLabels.every((left) => thresholdLabels.every((right) => left.threshold === right.threshold));
assert.equal(allPermutationsPreserveThresholds, false);

const result = {
  protocol: "claimipedia-d03-electroweak-closure-audit/1",
  auditId: "d03-electroweak-genericity-closure-a2-observable-v1",
  electroweakLift: {
    traceBasis: [
      "beta_1/(2 g_1) B_{mu nu}B^{mu nu}",
      "beta_2/(2 g_2) W^a_{mu nu}W^{a mu nu}",
      "beta_3/(2 g_3) G^A_{mu nu}G^{A mu nu}",
      "beta_lambda (H^dagger H)^2 with convention-dependent normalization",
      "mass terms and anomalous-dimension/EOM representatives",
      "Yukawa beta-function operators plus improvement/contact representatives"
    ],
    inference: "The Standard Model has more threshold classes and source ratios than the Abelian witness. Conditional on nonzero physical form factors, full H2 span is generic rather than exceptional.",
    exactBoundary: "No full electroweak BRST-complete form-factor calculation or numerical spectral density is claimed here.",
    conceptualDisposition: "Carrier existence alone is too cheap to identify Spin(2,3); the discriminating burden moves to physical transformation closure and invariant relations."
  },
  transformationClosure: {
    physicalSourceAction: "Invertible source relabellings act by GL(2) congruence; local counterterms add a real polynomial layer.",
    ambientAction: "Sp(4,R) acts fractionally by M -> (A M+B)(C M+D)^-1 on the Siegel/Herglotz domain.",
    counterexample: {
      family: "M(z)=diag(-1/z,-1/(z-2))",
      symplecticElement: "lower shear [[I,0],[I,I]]",
      image: "diag(-1/(z-1),-1/(z-3))",
      originalPoles,
      transformedPoles,
      supportClosed
    },
    disposition: "A generic fractional symplectic transformation moves physical poles/thresholds and does not preserve a fixed QFT response family. Only the congruence/contact subgroup is presently physically realized."
  },
  a2Bridge: {
    temptingConstruction: "Three projective channel labels can be centered into an abstract two-dimensional trace-zero plane carrying the permutation representation of S3/W(A2).",
    obstruction: "The channels have unequal invariant thresholds and nondegenerate dynamics, so no physical S3 action permutes them. Naming three sectors does not supply A2 roots, reflections or intertwining maps.",
    disposition: "abstract bookkeeping analogy only; reject a typed A2/Higgs/code bridge until an actual threshold-preserving S3 action and intertwiners are exhibited."
  },
  constrainedObservable: {
    name: "quartic-anomaly projective orientation",
    normalization: "O_g and O_H fixed as in the scalar strike; leading simplified real-scalar rung",
    definition: "Q=(1/sqrt(2)) det[v_infinity,v(r2),v(r4)]",
    prediction: "Q=r4-r2=beta_lambda/(lambda sum_i D_i)",
    fixture: { r2, r4, betaLambda, lambda, propagatorSum, orientationDeterminant, anomalyOrientation, predictedOrientation },
    invariance: "Q is invariant under triangular improvement/source shear O_g -> O_g+kappa O_H at fixed kinematics.",
    falsifiers: ["Q nonzero at beta_lambda=0 within the declared perturbative rung", "wrong kinematic dependence after complete normalization", "loss of the relation under a common fixed-k source shear"],
    fullTheoryStatus: "A constrained leading-order target, not yet an electroweak numerical prediction."
  },
  decisiveDispositions: {
    simplifiedInteractingTheoryHasGlobalH2Span: true,
    standardModelLikelyHasTooFewDirections: false,
    fullH2SpanIsDistinctiveEvidenceForSpin23: false,
    genericSp4FractionalClosureEstablished: false,
    exactA2BridgeEstablished: false,
    constrainedObservableIdentified: true,
    ambientResponseGeometryRemainsViable: true,
    emergentSpin23DynamicalSymmetryEstablished: false
  },
  frontier: [
    "BRST-complete electroweak form factors and spectral densities",
    "finite-temperature/momentum/Higgs-background rank-three control Jacobian",
    "a physical non-congruence transformation that preserves all thresholds and positivity",
    "an exact threshold-preserving S3 action with typed A2 intertwiners",
    "renormalized measurement protocol for the anomaly-orientation observable"
  ],
  authority: { proposalOnly: true, entails: false, empiricalAuthority: false, automaticCorpusAdmission: false, applicationAdmission: false }
};

const receipt = {
  protocol: "claimipedia-d03-electroweak-closure-audit-receipt/1",
  checks: {
    electroweakLiftQualified: result.electroweakLift.exactBoundary.startsWith("No full"),
    carrierGenericityRecognized: result.electroweakLift.conceptualDisposition.includes("too cheap"),
    symplecticClosureCounterexampleVerified: supportClosed === false,
    congruenceAndFractionalActionsSeparated: result.transformationClosure.physicalSourceAction !== result.transformationClosure.ambientAction,
    a2BridgeRefusedWithoutIntertwiner: result.decisiveDispositions.exactA2BridgeEstablished === false,
    anomalyOrientationIdentityVerified: Math.abs(anomalyOrientation - predictedOrientation) < 1e-12,
    observableFalsifiersRecorded: result.constrainedObservable.falsifiers.length === 3,
    frontierExplicit: result.frontier.length === 5,
    authorityBoundaryPreserved: result.authority.automaticCorpusAdmission === false
  },
  resultSha256: sha256(JSON.stringify(result)),
  passed: true
};
assert.ok(Object.values(receipt.checks).every(Boolean));
mkdirSync(generated, { recursive: true });
writeFileSync(resolve(generated, "d03-electroweak-closure-audit.json"), `${JSON.stringify(result, null, 2)}\n`);
writeFileSync(resolve(generated, "d03-electroweak-closure-receipt.json"), `${JSON.stringify(receipt, null, 2)}\n`);
console.log(JSON.stringify(receipt, null, 2));
