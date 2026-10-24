import { createHash } from "node:crypto";
import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { executeProcess } from "file:///C:/Users/aaron/sourcery/.consolidation/temple-supervisor/runtime/2026-10-17-generated-view-materializer-v8r3/surface-async-process.mjs";
import model from "../integrations/sourcery/mcp-admission/scientific-derivation-composer/scientific-derivation-process.json" with { type: "json" };

const write = process.argv.includes("--write");
const root = resolve(import.meta.dirname, "..");

const SIEMENS = { mass: -1, length: -2, time: 3, current: 2, temperature: 0, amount: 0, luminousIntensity: 0 };
const VOLT = { mass: 1, length: 2, time: -3, current: -1, temperature: 0, amount: 0, luminousIntensity: 0 };
const AMPERE = { mass: 0, length: 0, time: 0, current: 1, temperature: 0, amount: 0, luminousIntensity: 0 };
const ZERO = { mass: 0, length: 0, time: 0, current: 0, temperature: 0, amount: 0, luminousIntensity: 0 };
const fields = ["domain", "rank", "variance", "basis", "regime", "order", "scheme", "symmetry", "cp", "support"];
const authority = { proposalOnly: true, entails: false, empiricalAuthority: false };

const signatures = {
  block: { domain: "physical-nodal-admittance", rank: 2, variance: "matrix", basis: "calibrated-two-node-voltage", regime: "finite-frequency-passive-rc", order: "exact-linear", scheme: "si-nodal", symmetry: "reciprocal", cp: "unrestricted", support: "full-rank" },
  effective: { domain: "effective-port-admittance", rank: 1, variance: "scalar", basis: "calibrated-external-port", regime: "finite-frequency-passive-rc", order: "exact-linear", scheme: "support-schur-si", symmetry: "reciprocal", cp: "unrestricted", support: "external-port" },
  current: { domain: "predicted-port-current", rank: 1, variance: "phasor", basis: "calibrated-external-port", regime: "held-out-frequency", order: "exact-linear", scheme: "si-current-positive-into-network", symmetry: "reciprocal", cp: "unrestricted", support: "external-port" },
};

const objects = [
  { id: "d02.rc.two-node-admittance-block", signature: signatures.block, dimension: SIEMENS },
  { id: "d02.rc.effective-port-admittance", signature: signatures.effective, dimension: SIEMENS },
  { id: "d02.rc.held-out-port-current", signature: signatures.current, dimension: AMPERE },
];

function rule({ id, kind, from, to, delta, assumptions, losses = [], evidenceRefs }) {
  const fromObject = objects.find(object => object.id === from);
  const toObject = objects.find(object => object.id === to);
  return {
    id, kind, from, to,
    fromSignature: fromObject.signature,
    toSignature: toObject.signature,
    fromDimension: fromObject.dimension,
    toDimension: toObject.dimension,
    dimensionRule: "si-base-exponent-delta",
    dimensionDelta: delta,
    changes: fields.filter(field => fromObject.signature[field] !== toObject.signature[field]).concat(JSON.stringify(fromObject.dimension) === JSON.stringify(toObject.dimension) ? [] : ["dimension"]),
    assumptions, losses, removes: [], evidenceRefs, analogyOnly: false, authority,
  };
}

const transformations = [
  rule({
    id: "apply-local-support-schur-theorem-to-calibrated-rc-network",
    kind: "schur-elimination",
    from: objects[0].id,
    to: objects[1].id,
    delta: ZERO,
    assumptions: ["all conductances and capacitances are positive SI quantities", "the internal nodal admittance is nonzero at the evaluated frequency", "the external voltage and current share one declared ground and current is positive into the network"],
    losses: ["the eliminated internal-node voltage is not retained"],
    evidenceRefs: ["integrations/claimipedia/research-method/D02-RESULT.md#1-exact-bounded-local-theorem", "integrations/claimipedia/research-method/execute-d02-local-strike.mjs"],
  }),
  rule({
    id: "apply-calibrated-voltage-probe",
    kind: "operator-application",
    from: objects[1].id,
    to: objects[2].id,
    delta: VOLT,
    assumptions: ["the held-out probe is 0.2 V RMS at 997 Hz", "phasors use exp(+i omega t)", "the component values and port convention were fixed before evaluating the held-out current"],
    evidenceRefs: ["scripts/run-claimipedia-d02-physical-admittance-witness.mjs"],
  }),
];

const graph = { objects, transformations };
const query = { id: "calibrated-rc-block-to-held-out-current", source: objects[0].id, target: objects[2].id, maxDepth: 2 };
const compose = async sourceGraph => (await executeProcess(model.program, { model, request: { graph: structuredClone(sourceGraph), query } }, { compute: {}, ports: {} })).result;

const c = (re, im = 0) => ({ re, im });
const add = (a, b) => c(a.re + b.re, a.im + b.im);
const sub = (a, b) => c(a.re - b.re, a.im - b.im);
const mul = (a, b) => c(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const div = (a, b) => { const q = b.re * b.re + b.im * b.im; return c((a.re * b.re + a.im * b.im) / q, (a.im * b.re - a.re * b.im) / q); };
const abs = value => Math.hypot(value.re, value.im);

const fixture = {
  conductanceExternalS: 1.2e-3,
  conductanceInternalS: 0.8e-3,
  couplingConductanceS: 2.5e-3,
  capacitanceExternalF: 220e-9,
  capacitanceInternalF: 470e-9,
  heldOutFrequencyHz: 997,
  probeVoltageRmsV: 0.2,
};
const omega = 2 * Math.PI * fixture.heldOutFrequencyHz;
const A = c(fixture.conductanceExternalS + fixture.couplingConductanceS, omega * fixture.capacitanceExternalF);
const B = c(-fixture.couplingConductanceS);
const D = c(fixture.conductanceInternalS + fixture.couplingConductanceS, omega * fixture.capacitanceInternalF);
const schurAdmittanceS = sub(A, div(mul(B, B), D));
const predictedCurrentA = mul(schurAdmittanceS, c(fixture.probeVoltageRmsV));

// Independent Kirchhoff route: solve the zero-current internal row first, then
// substitute its voltage into the external current row.
const externalVoltageV = c(fixture.probeVoltageRmsV);
const internalVoltageV = div(c(fixture.couplingConductanceS * fixture.probeVoltageRmsV), D);
const directNodalCurrentA = add(mul(A, externalVoltageV), mul(B, internalVoltageV));
const predictionErrorA = abs(sub(predictedCurrentA, directNodalCurrentA));

const result = await compose(graph);
const missingProbeGraph = structuredClone(graph);
missingProbeGraph.transformations = missingProbeGraph.transformations.filter(rule => rule.id !== "apply-calibrated-voltage-probe");
const missingProbe = await compose(missingProbeGraph);
const wrongVoltageDimensionGraph = structuredClone(graph);
wrongVoltageDimensionGraph.transformations[1].dimensionDelta.time = -2;
const wrongVoltageDimension = await compose(wrongVoltageDimensionGraph);

const candidate = result.candidates[0];
const passed = result.protocol === "scientific-derivation-composition/2"
  && result.candidates.length === 1
  && candidate.steps.length === 2
  && result.receipt.dimensionRejectedTransformationCount === 0
  && missingProbe.candidates.length === 0
  && wrongVoltageDimension.candidates.length === 0
  && wrongVoltageDimension.invalidRules.find(check => check.rule.id === "apply-calibrated-voltage-probe")?.dimensionallyValid === false
  && schurAdmittanceS.re > 0
  && predictionErrorA < 1e-15;

const output = {
  protocol: "claimipedia-d02-physical-admittance-witness/1",
  date: "2026-10-25",
  graphSha256: createHash("sha256").update(JSON.stringify(graph)).digest("hex"),
  quantityConvention: {
    carrier: "two-node reciprocal passive RC nodal admittance",
    portNormalization: "external voltage relative to declared ground; current positive into network; RMS phasors use exp(+i omega t)",
    dimensions: { admittanceSiemens: SIEMENS, probeVoltageVolt: VOLT, predictedCurrentAmpere: AMPERE },
  },
  fixture,
  heldOutPrediction: { schurAdmittanceS, predictedCurrentA, directNodalCurrentA, predictionErrorA, passiveRealPartPositive: schurAdmittanceS.re > 0, status: predictionErrorA < 1e-15 ? "recovered" : "failed" },
  composition: { protocol: result.protocol, candidateCount: result.candidates.length, steps: candidate?.steps ?? [], assumptions: candidate?.assumptions ?? [], losses: candidate?.losses ?? [], dimensionRejectedTransformationCount: result.receipt.dimensionRejectedTransformationCount },
  negativeControls: { missingProbeCandidateCount: missingProbe.candidates.length, wrongVoltageDimensionCandidateCount: wrongVoltageDimension.candidates.length, wrongVoltageDimensionRejected: wrongVoltageDimension.invalidRules.find(check => check.rule.id === "apply-calibrated-voltage-probe")?.dimensionallyValid === false },
  decision: {
    passed,
    physicalResponseUnitsAssigned: passed,
    portNormalizationDeclared: passed,
    physicalOperatorAssignmentExtracted: passed,
    computationallyHeldOutCurrentPredicted: passed,
    independentlyMeasuredDetectorRecordPredicted: false,
    jordanProductExtracted: false,
    newPhysicsEvidence: false,
    ot026Closed: false,
    ot027Closed: false,
  },
  implication: "The local D02 Schur step now has one physical SI instantiation: a calibrated admittance operator maps volts to amperes and recovers a computationally held-out current by an independent nodal solve. This closes the quantity-unit and operator-assignment gate for this RC witness only. It is not a Jordan-product extraction, an independently measured detector prediction or evidence of new physics.",
};

if (write) await writeFile(resolve(root, "evidence/data/claimipedia-d02-physical-admittance-witness-v1.json"), `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log(JSON.stringify(output, null, 2));
if (!passed) process.exitCode = 1;
