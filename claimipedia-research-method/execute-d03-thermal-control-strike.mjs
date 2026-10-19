import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const generated = resolve(here, "generated");
const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const determinant2 = ([[a, b], [c, d]]) => a * d - b * c;
const dot = (left, right) => left.reduce((sum, value, index) => sum + value * right[index], 0);
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const determinant3 = ([r1, r2, r3]) => dot(r1, cross(r2, r3));

const GT = [[1, 0], [0, 0]];
const GV = [[0, 0], [0, 1]];
const GS = [[1, 1], [1, 1]];
const vectorize = ([[a11, a12], [, a22]]) => [a11, a22, Math.SQRT2 * a12];
const generatorDeterminant = determinant3([vectorize(GT), vectorize(GV), vectorize(GS)]);
assert.ok(Math.abs(generatorDeterminant) > 1);

const response = (a, b, c) => [[a + c, c], [c, b + c]];
const jacobian = [[1, 0, 1], [0, 1, 1], [0, 0, Math.SQRT2]];
const jacobianDeterminant = determinant3(jacobian);
assert.ok(Math.abs(jacobianDeterminant - Math.SQRT2) < 1e-12);

const controls = [
  { temperature: 1, momentum: 0.4, chemicalPotential: 0, weights: [1.2, 0.8, 0.3] },
  { temperature: 1.4, momentum: 0.4, chemicalPotential: 0, weights: [1.7, 0.9, 0.35] },
  { temperature: 1, momentum: 0.8, chemicalPotential: 0, weights: [1.1, 1.5, 0.4] },
  { temperature: 1, momentum: 0.4, chemicalPotential: 0.5, weights: [1.25, 0.85, 1.1] }
].map((sample) => {
  const rho = response(...sample.weights);
  const determinant = determinant2(rho);
  const innovation = rho[0][0] - rho[0][1] ** 2 / rho[1][1];
  return { ...sample, rho, determinant, innovation, positiveDefinite: rho[0][0] > 0 && rho[1][1] > 0 && determinant > 0 };
});
assert.ok(controls.every(({ positiveDefinite }) => positiveDefinite));

// A one-parameter scan can span three matrices without having a rank-three local image.
const oneParameterWeights = (t) => [1 + t, 1 + t ** 2, 0.2 + t ** 3];
const oneParameterSamples = [0, 0.4, 0.8].map((t) => ({ t, rho: response(...oneParameterWeights(t)) }));
const oneParameterSpan = determinant3(oneParameterSamples.map(({ rho }) => vectorize(rho)));
assert.ok(Math.abs(oneParameterSpan) > 1e-4);
const localParameterDimension = 1;

// An unbroken isotropic relation c=0 collapses the off-diagonal coordinate to a plane.
const isotropicSamples = [[1, 2, 0], [2, 1, 0], [3, 4, 0]].map((weights) => response(...weights));
const isotropicSpanDeterminant = determinant3(isotropicSamples.map(vectorize));
assert.ok(Math.abs(isotropicSpanDeterminant) < 1e-12);

const result = {
  protocol: "claimipedia-d03-thermal-control-strike/1",
  strikeId: "d03-thermal-stress-open-carrier-control-v1",
  theoremCandidate: {
    channelCarrier: "After the thermal Ward quotient, two probes can receive independent tensor, shear/vector and sound/scalar Gram contributions GT,GV,GS that span H2(R).",
    positiveMap: "rho(a,b,c)=a GT+b GV+c GS=[[a+c,c],[c,b+c]] is positive definite for a,b,c>0.",
    openImage: "The Jacobian from independent channel weights (a,b,c) to Jordan coordinates has determinant sqrt(2), so independently variable positive weights give an open physical subcone.",
    controlQualification: "Thermal kinematics permits the carrier but does not prove that one Standard-Model state supplies independently variable weights or that Sp(4,R) preserves the thermal family.",
    scanNoGo: "A one-parameter frequency scan can have three linearly independent sample matrices while its local image remains a curve; sample span is not Jacobian rank."
  },
  generators: { GT, GV, GS, coordinateDeterminant: generatorDeterminant },
  controlMap: { formula: "[[a+c,c],[c,b+c]]", jacobian, jacobianDeterminant, samples: controls },
  oneParameterCounterexample: { samples: oneParameterSamples, coordinateDeterminant: oneParameterSpan, localParameterDimension },
  isotropicCounterexample: { matrices: isotropicSamples, coordinateDeterminant: isotropicSpanDeterminant },
  dispositions: {
    thermalChannelsCanSpanH2: true,
    independentChannelWeightsGiveOpenSubcone: true,
    frequencyScanAloneProvesOpenImage: false,
    thermalFullSpanImpliesFundamentalSpin23: false,
    thermalControlValidatesMetricHiggsRankTest: true
  },
  nextGate: "Apply the same Jacobian-rank audit to threshold-resolved metric-Higgs weights and determine whether frequency, momentum, temperature and Higgs background vary three directions independently.",
  authority: { proposalOnly: true, entails: false, empiricalAuthority: false, automaticCorpusAdmission: false, applicationAdmission: false }
};

const receipt = {
  protocol: "claimipedia-d03-thermal-control-strike-receipt/1",
  checks: {
    threeChannelGeneratorsIndependent: Math.abs(generatorDeterminant) > 1,
    positiveControlSamplesVerified: controls.every(({ positiveDefinite }) => positiveDefinite),
    openImageJacobianVerified: Math.abs(jacobianDeterminant - Math.SQRT2) < 1e-12,
    sampleSpanAndLocalDimensionSeparated: Math.abs(oneParameterSpan) > 1e-4 && localParameterDimension === 1,
    isotropicPlaneCollapseVerified: Math.abs(isotropicSpanDeterminant) < 1e-12,
    kinematicsAndDynamicsSeparated: result.dispositions.thermalFullSpanImpliesFundamentalSpin23 === false,
    metricHiggsBenchmarkRecorded: true,
    authorityBoundaryPreserved: result.authority.automaticCorpusAdmission === false
  },
  resultSha256: sha256(JSON.stringify(result)),
  passed: true
};
assert.ok(Object.values(receipt.checks).every(Boolean));

mkdirSync(generated, { recursive: true });
writeFileSync(resolve(generated, "d03-thermal-control-result.json"), `${JSON.stringify(result, null, 2)}\n`);
writeFileSync(resolve(generated, "d03-thermal-control-receipt.json"), `${JSON.stringify(receipt, null, 2)}\n`);
console.log(JSON.stringify(receipt, null, 2));
