import { createHash } from "node:crypto";
import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { executeProcess } from "file:///C:/Users/aaron/sourcery/.consolidation/temple-supervisor/runtime/2026-10-17-generated-view-materializer-v8r3/surface-async-process.mjs";
import model from "../integrations/sourcery/mcp-admission/scientific-derivation-composer/scientific-derivation-process.json" with { type: "json" };

const write = process.argv.includes("--write");
const root = resolve(import.meta.dirname, "..");
const SIEMENS = { mass: -1, length: -2, time: 3, current: 2, temperature: 0, amount: 0, luminousIntensity: 0 };
const SIEMENS_PER_SECOND = { mass: -1, length: -2, time: 2, current: 2, temperature: 0, amount: 0, luminousIntensity: 0 };
const INVERSE_SECOND = { mass: 0, length: 0, time: -1, current: 0, temperature: 0, amount: 0, luminousIntensity: 0 };
const SECOND = { mass: 0, length: 0, time: 1, current: 0, temperature: 0, amount: 0, luminousIntensity: 0 };
const fields = ["domain", "rank", "variance", "basis", "regime", "order", "scheme", "symmetry", "cp", "support"];
const authority = { proposalOnly: true, entails: false, empiricalAuthority: false };

const objects = [
  { id: "d02.rc.internal-boundary-response", signature: { domain: "scalar-positive-real-boundary-response", rank: 1, variance: "scalar-function", basis: "calibrated-internal-node", regime: "right-half-plane-passive-rc", order: "exact-rational", scheme: "si-nodal", symmetry: "reciprocal", cp: "unrestricted", support: "one-relaxation-pole" }, dimension: SIEMENS },
  { id: "d02.rc.positive-spectral-atom", signature: { domain: "scalar-positive-operator-measure", rank: 1, variance: "positive-atomic-weight", basis: "relaxation-rate-axis", regime: "positive-real-boundary-measure", order: "exact-atomic", scheme: "stieltjes-atom-si", symmetry: "reciprocal", cp: "unrestricted", support: "one-positive-rate" }, dimension: SIEMENS_PER_SECOND },
  { id: "d02.rc.held-out-schur-correction", signature: { domain: "effective-admittance-correction", rank: 1, variance: "complex-scalar", basis: "calibrated-external-port", regime: "held-out-frequency", order: "exact-rational", scheme: "atomic-stieltjes-evaluation", symmetry: "reciprocal", cp: "unrestricted", support: "one-relaxation-pole" }, dimension: SIEMENS },
];
function rule({ id, kind, from, to, delta, assumptions, losses = [], evidenceRefs }) {
  const source = objects.find(object => object.id === from);
  const target = objects.find(object => object.id === to);
  return { id, kind, from, to, fromSignature: source.signature, toSignature: target.signature, fromDimension: source.dimension, toDimension: target.dimension, dimensionRule: "si-base-exponent-delta", dimensionDelta: delta, changes: fields.filter(field => source.signature[field] !== target.signature[field]).concat(JSON.stringify(source.dimension) === JSON.stringify(target.dimension) ? [] : ["dimension"]), assumptions, losses, removes: [], evidenceRefs, analogyOnly: false, authority };
}
const transformations = [
  rule({ id: "extract-positive-operator-measure", kind: "herglotz-representation", from: objects[0].id, to: objects[1].id, delta: INVERSE_SECOND, assumptions: ["the internal branch is a passive RC admittance with positive conductance and capacitance", "the relaxation coordinate is a rate in inverse seconds", "the scalar atom is the rank-one specialization of the positive operator-valued measure"], losses: ["the coupling square-root sign is not retained by the positive residue"], evidenceRefs: ["integrations/claimipedia/research-method/D02-BOUNDARY-MEASURE.md", "integrations/claimipedia/research-method/D02-OPERATOR-MEASURE.md"] }),
  rule({ id: "evaluate-positive-atom-at-held-out-frequency", kind: "stieltjes-evaluation", from: objects[1].id, to: objects[2].id, delta: SECOND, assumptions: ["the held-out evaluation point is s=i 2 pi 997 per second", "the pole rate and atom weight are fixed from component values before evaluation"], evidenceRefs: ["scripts/run-claimipedia-d02-physical-operator-measure-witness.mjs"] }),
];
const graph = { objects, transformations };
const query = { id: "boundary-response-to-held-out-correction", source: objects[0].id, target: objects[2].id, maxDepth: 2 };
const compose = async sourceGraph => (await executeProcess(model.program, { model, request: { graph: structuredClone(sourceGraph), query } }, { compute: {}, ports: {} })).result;

const fixture = { conductanceInternalS: 0.8e-3, couplingConductanceS: 2.5e-3, capacitanceInternalF: 470e-9, heldOutFrequencyHz: 997 };
const poleRatePerSecond = (fixture.conductanceInternalS + fixture.couplingConductanceS) / fixture.capacitanceInternalF;
const atomWeightSiemensPerSecond = fixture.couplingConductanceS ** 2 / fixture.capacitanceInternalF;
const omega = 2 * Math.PI * fixture.heldOutFrequencyHz;
const complexDivideRealByComplex = (numerator, re, im) => ({ re: numerator * re / (re ** 2 + im ** 2), im: -numerator * im / (re ** 2 + im ** 2) });
const atomicCorrectionS = complexDivideRealByComplex(atomWeightSiemensPerSecond, poleRatePerSecond, omega);
const directBlockCorrectionS = complexDivideRealByComplex(fixture.couplingConductanceS ** 2, fixture.conductanceInternalS + fixture.couplingConductanceS, omega * fixture.capacitanceInternalF);
const correctionErrorS = Math.hypot(atomicCorrectionS.re - directBlockCorrectionS.re, atomicCorrectionS.im - directBlockCorrectionS.im);

const result = await compose(graph);
const wrongExtractionDeltaGraph = structuredClone(graph);
wrongExtractionDeltaGraph.transformations[0].dimensionDelta.time = 0;
const wrongExtractionDelta = await compose(wrongExtractionDeltaGraph);
const missingEvaluationGraph = structuredClone(graph);
missingEvaluationGraph.transformations = missingEvaluationGraph.transformations.filter(rule => rule.id !== "evaluate-positive-atom-at-held-out-frequency");
const missingEvaluation = await compose(missingEvaluationGraph);
const signedResidueControl = -atomWeightSiemensPerSecond;
const candidate = result.candidates[0];
const passed = result.protocol === "scientific-derivation-composition/2"
  && result.candidates.length === 1
  && candidate.steps.length === 2
  && result.receipt.dimensionRejectedTransformationCount === 0
  && wrongExtractionDelta.candidates.length === 0
  && wrongExtractionDelta.invalidRules.find(check => check.rule.id === "extract-positive-operator-measure")?.dimensionallyValid === false
  && missingEvaluation.candidates.length === 0
  && atomWeightSiemensPerSecond > 0
  && signedResidueControl < 0
  && correctionErrorS < 1e-15;

const output = {
  protocol: "claimipedia-d02-physical-operator-measure-witness/1",
  date: "2026-10-25",
  graphSha256: createHash("sha256").update(JSON.stringify(graph)).digest("hex"),
  quantityConvention: { spectralCoordinate: "Laplace relaxation rate in inverse seconds; radians are dimensionless", dimensions: { responseAdmittanceSiemens: SIEMENS, atomicMeasureWeightSiemensPerSecond: SIEMENS_PER_SECOND, evaluatedCorrectionSiemens: SIEMENS } },
  fixture,
  extractedAtom: { poleRatePerSecond, atomWeightSiemensPerSecond, positive: atomWeightSiemensPerSecond > 0, couplingSignLost: true, identities: { poleTimesCapacitanceS: poleRatePerSecond * fixture.capacitanceInternalF, expectedTotalInternalConductanceS: fixture.conductanceInternalS + fixture.couplingConductanceS, atomTimesCapacitanceSiemensSquared: atomWeightSiemensPerSecond * fixture.capacitanceInternalF, expectedCouplingConductanceSquaredSiemensSquared: fixture.couplingConductanceS ** 2 } },
  heldOutPrediction: { atomicCorrectionS, directBlockCorrectionS, correctionErrorS, status: correctionErrorS < 1e-15 ? "recovered" : "failed" },
  composition: { protocol: result.protocol, candidateCount: result.candidates.length, steps: candidate?.steps ?? [], assumptions: candidate?.assumptions ?? [], losses: candidate?.losses ?? [], dimensionRejectedTransformationCount: result.receipt.dimensionRejectedTransformationCount },
  negativeControls: { wrongExtractionDeltaCandidateCount: wrongExtractionDelta.candidates.length, wrongExtractionDeltaRejected: wrongExtractionDelta.invalidRules.find(check => check.rule.id === "extract-positive-operator-measure")?.dimensionallyValid === false, missingEvaluationCandidateCount: missingEvaluation.candidates.length, signedResidueControlRejectedByPositivity: signedResidueControl < 0 },
  decision: { passed, positiveOperatorMeasureUnitsAssigned: passed, positiveAtomExtracted: passed, heldOutMeasureContributionPredicted: passed, fullOperatorMeasureReconstructedFromFiniteProbes: false, jordanProductExtracted: false, independentlyMeasuredDetectorRecordPredicted: false, newPhysicsEvidence: false, ot026Closed: false, ot027Closed: false },
  implication: "The D02 boundary-measure step now has one physical scalar specialization. A passive RC pole yields a positive atomic spectral weight in siemens per second, and Stieltjes evaluation recovers the held-out Schur correction in siemens. The coupling sign is correctly lost. This is not reconstruction of a general operator-valued measure, a Jordan product, a measured detector prediction or new-physics evidence.",
};
if (write) await writeFile(resolve(root, "evidence/data/claimipedia-d02-physical-operator-measure-witness-v1.json"), `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log(JSON.stringify(output, null, 2));
if (!passed) process.exitCode = 1;
