import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const generated = resolve(here, "generated");
const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const dot4 = (a, b) => a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3];
const det2 = ([[a, b], [c, d]]) => a * d - b * c;
const outer = ([a, b], w) => [[w * a * a, w * a * b], [w * a * b, w * b * b]];
const add2 = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const phase2 = (s, mass) => s > 4 * mass ** 2 ? Math.sqrt(1 - 4 * mass ** 2 / s) / (16 * Math.PI) : 0;

const parameters = { v: 2, e: 0.4, lambda: 0.3 };
parameters.mA2 = parameters.e ** 2 * parameters.v ** 2;
parameters.mh2 = parameters.lambda * parameters.v ** 2;

function vectorPolarizations(s) {
  const m = Math.sqrt(parameters.mA2);
  const E = Math.sqrt(s) / 2;
  const p = Math.sqrt(E ** 2 - m ** 2);
  const p1 = [E, 0, 0, p];
  const p2 = [E, 0, 0, -p];
  const transverse1 = [0, 1, 0, 0];
  const transverse2 = [0, 1, 0, 0];
  const longitudinal1 = [p / m, 0, 0, E / m];
  const longitudinal2 = [p / m, 0, 0, -E / m];
  return { p1, p2, transverse1, transverse2, longitudinal1, longitudinal2 };
}

// With X_F=F^2/2, choose the real on-shell convention F_XF=2[(p1.p2)(e1.e2)-(p1.e2)(p2.e1)].
const gaugeKineticAmplitude = (p1, p2, e1, e2) => 2 * (dot4(p1, p2) * dot4(e1, e2) - dot4(p1, e2) * dot4(p2, e1));
const higgsSourceToVectors = (s, e1, e2) => 2 * parameters.mA2 * dot4(e1, e2) / (s - parameters.mh2);

function responseAt(s) {
  assert.ok(s > Math.max(4 * parameters.mA2, 4 * parameters.mh2));
  const pol = vectorPolarizations(s);
  const ampFT = gaugeKineticAmplitude(pol.p1, pol.p2, pol.transverse1, pol.transverse2);
  const ampFL = gaugeKineticAmplitude(pol.p1, pol.p2, pol.longitudinal1, pol.longitudinal2);
  const ampHT = higgsSourceToVectors(s, pol.transverse1, pol.transverse2);
  const ampHL = higgsSourceToVectors(s, pol.longitudinal1, pol.longitudinal2);
  const RFTransverse = ampFT / ampHT;
  const RFLongitudinal = ampFL / ampHL;

  const ampHhh = 1 + 3 * parameters.mh2 / (s - parameters.mh2);
  const ampLambdaHh = -3 * parameters.v ** 2 / 2 - 3 * parameters.lambda * parameters.v ** 4 / (2 * (s - parameters.mh2));
  const RLambdaHh = ampLambdaHh / ampHhh;
  const RLambdaVector = -(parameters.v ** 2) / 2;
  const analyticRLambdaHh = -3 * parameters.v ** 2 * s / (2 * (s + 2 * parameters.mh2));
  const analyticRFT = (s - 2 * parameters.mA2) * (s - parameters.mh2) / (2 * parameters.mA2);
  const analyticRFL = 2 * parameters.mA2 * (s - parameters.mh2) / (s - 2 * parameters.mA2);
  assert.ok(Math.abs(RLambdaHh - analyticRLambdaHh) < 1e-12);
  assert.ok(Math.abs(RFTransverse - analyticRFT) < 1e-10);
  assert.ok(Math.abs(RFLongitudinal - analyticRFL) < 1e-10);

  const deltaLambda = RLambdaVector - RLambdaHh;
  const responseMatrix = [[RFTransverse, deltaLambda], [RFLongitudinal, deltaLambda]];
  const determinant = det2(responseMatrix);
  const analyticDeterminant = parameters.v ** 2 * (s - parameters.mh2) / (s + 2 * parameters.mh2) *
    (s - parameters.mh2) * s * (s - 4 * parameters.mA2) / (2 * parameters.mA2 * (s - 2 * parameters.mA2));
  assert.ok(Math.abs(determinant - analyticDeterminant) < 1e-8 * Math.max(1, Math.abs(determinant)));
  return {
    s,
    polarizations: pol,
    amplitudes: { ampFT, ampFL, ampHT, ampHL, ampHhh, ampLambdaHh },
    responses: { hh: [0, RLambdaHh], vectorTransverse: [RFTransverse, RLambdaVector], vectorLongitudinal: [RFLongitudinal, RLambdaVector] },
    responseMatrix,
    determinant,
    analyticDeterminant
  };
}

const energies = [6, 8, 12, 20];
const samples = energies.map(responseAt);
assert.ok(samples.every(({ determinant }) => Math.abs(determinant) > 1e-8));

const beta = { gauge: 0.023, quartic: -0.041 };
const inversionSamples = samples.map((sample) => {
  const [[a, b], [c, d]] = sample.responseMatrix;
  const measured = [a * beta.gauge + b * beta.quartic, c * beta.gauge + d * beta.quartic];
  const determinant = a * d - b * c;
  const recovered = { gauge: (d * measured[0] - b * measured[1]) / determinant, quartic: (-c * measured[0] + a * measured[1]) / determinant };
  return { s: sample.s, measuredProjectiveDifferences: measured, recovered, error: Math.max(Math.abs(recovered.gauge - beta.gauge), Math.abs(recovered.quartic - beta.quartic)) };
});
assert.ok(inversionSamples.every(({ error }) => error < 1e-12));

const spectralSample = samples[1];
const phaseH = phase2(spectralSample.s, Math.sqrt(parameters.mh2));
const phaseA = phase2(spectralSample.s, Math.sqrt(parameters.mA2));
const weights = {
  hh: 0.5 * phaseH * spectralSample.amplitudes.ampHhh ** 2,
  vectorTransverse: 2 * phaseA * spectralSample.amplitudes.ampHT ** 2,
  vectorLongitudinal: phaseA * spectralSample.amplitudes.ampHL ** 2
};
const cH = -parameters.mh2;
const ratioFor = (R) => cH + beta.gauge * R[0] + beta.quartic * R[1];
const states = Object.entries(spectralSample.responses).map(([id, R]) => ({ id, R, ratio: ratioFor(R), weight: weights[id] }));
const rho = states.reduce((sum, state) => add2(sum, outer([state.ratio, 1], state.weight)), [[0, 0], [0, 0]]);
const gramDeterminant = det2(rho);
const pairwiseDeterminant = states.reduce((sum, left, i) => sum + states.slice(i + 1).reduce((inner, right) => inner + left.weight * right.weight * (left.ratio - right.ratio) ** 2, 0), 0);
assert.ok(gramDeterminant > 0);
assert.ok(Math.abs(gramDeterminant - pairwiseDeterminant) < 1e-10);

const zeroBetaStates = states.map((state) => ({ ...state, ratio: cH }));
const zeroBetaRho = zeroBetaStates.reduce((sum, state) => add2(sum, outer([state.ratio, 1], state.weight)), [[0, 0], [0, 0]]);
assert.ok(Math.abs(det2(zeroBetaRho)) < 1e-12);

const vectorThreshold = 4 * parameters.mA2;
const thresholdRFT = (vectorThreshold - 2 * parameters.mA2) * (vectorThreshold - parameters.mh2) / (2 * parameters.mA2);
const thresholdRFL = 2 * parameters.mA2 * (vectorThreshold - parameters.mh2) / (vectorThreshold - 2 * parameters.mA2);
assert.ok(Math.abs(thresholdRFT - thresholdRFL) < 1e-12);

const result = {
  protocol: "claimipedia-d05-two-body-form-factor-strike/1",
  strikeId: "d05-physical-polarization-anomaly-tomography-v1",
  conventions: {
    potential: "L_potential=-m^2 Phi^dagger Phi-(lambda/2)(Phi^dagger Phi)^2 with m^2+lambda v^2/2=0",
    operators: ["O_H=Phi^dagger Phi-v^2/2", "X_F=F^2/2", "X_lambda=-(Phi^dagger Phi)^2/2"],
    masses: "m_A^2=e^2 v^2 and m_h^2=lambda v^2",
    normalizationQualification: "Signs and overall operator factors are convention-bound; rank, declared dual pairing and threshold degeneracy are invariant when beta coefficients transform dually."
  },
  formFactorTheorem: {
    hh: "R_hh=(0,-3 v^2 s/[2(s+2m_h^2)]) at tree level in the declared convention.",
    vectorTransverse: "R_T=((s-2m_A^2)(s-m_h^2)/(2m_A^2),-v^2/2).",
    vectorLongitudinal: "R_L=(2m_A^2(s-m_h^2)/(s-2m_A^2),-v^2/2).",
    determinant: "det[ R_T-R_hh ; R_L-R_hh ] = v^2(s-m_h^2)/(s+2m_h^2) * (s-m_h^2)s(s-4m_A^2)/[2m_A^2(s-2m_A^2)].",
    genericRank: "For common physical continuum s>max(4m_h^2,4m_A^2), the response matrix has rank two.",
    thresholdLoss: "At s=4m_A^2 the transverse and longitudinal gauge-kinetic ratios coincide; polarization tomography loses one direction exactly at threshold."
  },
  parameters,
  samples,
  inversion: { beta, samples: inversionSamples },
  spectralGramWitness: { s: spectralSample.s, weights, states, rho, gramDeterminant, pairwiseDeterminant, zeroBetaDeterminant: det2(zeroBetaRho) },
  perturbativeGrading: {
    projectiveDifference: "tree physical form factors times one-loop beta coefficients; bi-grade (cut loop 1, beta loop 1), uniform order two in the mixed T-O_H spectral response",
    positiveInnovation: "the Gram determinant is quadratic in ratio differences; bi-grade (cut loop 1, beta power 2), first visible at uniform order three",
    comparison: "This precedes the four-particle quartic strike, whose corresponding bi-grade is (cut loop 3, beta loop 1)."
  },
  dispositions: {
    twoBodyPhysicalResponseMatrixFullRankGenerically: true,
    fourBodyCutRequiredForBetaVectorTomography: false,
    polarizationResolutionEssential: true,
    exactVectorThresholdFullRank: false,
    betaVectorRecoverableFromTwoProjectiveDifferences: true,
    positiveMetricHiggsInnovationAtNonzeroBeta: true,
    oneLoopUniformInnovationEstablished: false
  },
  nextGate: "Audit BRST and equivalence-theorem stability of the transverse/longitudinal physical form factors, then determine whether inclusive polarization sums retain enough information or require polarization-resolved observables.",
  authority: { proposalOnly: true, entails: false, empiricalAuthority: false, automaticCorpusAdmission: false, applicationAdmission: false }
};

const receipt = {
  protocol: "claimipedia-d05-two-body-form-factor-strike-receipt/1",
  checks: {
    onShellPolarizationsVerified: samples.every(({ polarizations }) => Math.abs(dot4(polarizations.p1, polarizations.transverse1)) < 1e-12 && Math.abs(dot4(polarizations.p1, polarizations.longitudinal1)) < 1e-12),
    analyticFormFactorsVerified: samples.every(({ determinant, analyticDeterminant }) => Math.abs(determinant - analyticDeterminant) < 1e-8 * Math.max(1, Math.abs(determinant))),
    genericRankTwoVerified: samples.every(({ determinant }) => Math.abs(determinant) > 1e-8),
    betaInversionVerified: inversionSamples.every(({ error }) => error < 1e-12),
    gramDeterminantIdentityVerified: Math.abs(gramDeterminant - pairwiseDeterminant) < 1e-10,
    nonzeroBetaInnovationVerified: gramDeterminant > 0,
    fixedPointCollapseVerified: Math.abs(det2(zeroBetaRho)) < 1e-12,
    thresholdPolarizationDegeneracyVerified: Math.abs(thresholdRFT - thresholdRFL) < 1e-12,
    loopGradingsSeparated: result.dispositions.oneLoopUniformInnovationEstablished === false,
    authorityBoundaryPreserved: result.authority.automaticCorpusAdmission === false
  },
  resultSha256: sha256(JSON.stringify(result)),
  passed: true
};
assert.ok(Object.values(receipt.checks).every(Boolean));
mkdirSync(generated, { recursive: true });
writeFileSync(resolve(generated, "d05-two-body-form-factor-result.json"), `${JSON.stringify(result, null, 2)}\n`);
writeFileSync(resolve(generated, "d05-two-body-form-factor-receipt.json"), `${JSON.stringify(receipt, null, 2)}\n`);
console.log(JSON.stringify(receipt, null, 2));
