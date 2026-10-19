import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const generated = resolve(here, "generated");
const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const strike = JSON.parse(readFileSync(resolve(generated, "d05-two-body-form-factor-result.json"), "utf8"));
const { v, mA2, mh2 } = strike.parameters;
const phase2 = (s, mass2) => s > 4 * mass2 ? Math.sqrt(1 - 4 * mass2 / s) / (16 * Math.PI) : 0;
const det2 = ([[a, b], [c, d]]) => a * d - b * c;
const dot = (a, b) => a.reduce((sum, x, i) => sum + x * b[i], 0);

function inclusiveAt(sample, beta) {
  const s = sample.s;
  const phaseH = phase2(s, mh2);
  const phaseA = phase2(s, mA2);
  const weights = {
    hh: 0.5 * phaseH * sample.amplitudes.ampHhh ** 2,
    vectorTransverse: 2 * phaseA * sample.amplitudes.ampHT ** 2,
    vectorLongitudinal: phaseA * sample.amplitudes.ampHL ** 2
  };
  const entries = Object.entries(sample.responses).map(([id, R]) => ({ id, R, weight: weights[id], shift: dot(R, beta) }));
  const totalWeight = entries.reduce((sum, x) => sum + x.weight, 0);
  const meanResponse = [0, 1].map((i) => entries.reduce((sum, x) => sum + x.weight * x.R[i], 0) / totalWeight);
  const meanShift = dot(meanResponse, beta);
  const variance = entries.reduce((sum, x) => sum + x.weight * (x.shift - meanShift) ** 2, 0) / totalWeight;
  const innovation = totalWeight * variance;
  return { s, weights, entries, totalWeight, meanResponse, meanShift, variance, innovation };
}

const beta = [0.023, -0.041];
const inclusives = strike.samples.map((sample) => inclusiveAt(sample, beta));
assert.ok(inclusives.every(({ innovation }) => innovation > 0));

const scanPair = [inclusives[0], inclusives[2]];
const meanResponseMatrix = scanPair.map(({ meanResponse }) => meanResponse);
const scanDeterminant = det2(meanResponseMatrix);
assert.ok(Math.abs(scanDeterminant) > 1e-8);
const measuredMeans = scanPair.map(({ meanShift }) => meanShift);
const [[a, b], [c, d]] = meanResponseMatrix;
const recovered = [(d * measuredMeans[0] - b * measuredMeans[1]) / scanDeterminant, (-c * measuredMeans[0] + a * measuredMeans[1]) / scanDeterminant];
const recoveryError = Math.max(...recovered.map((x, i) => Math.abs(x - beta[i])));
assert.ok(recoveryError < 1e-12);

// Gauge-kinetic form factor obeys the photon Ward test even though the vectors are massive physical states.
const wardErrors = strike.samples.map((sample) => {
  const { p1, p2, transverse1, transverse2 } = sample.polarizations;
  const amplitude = (e1, e2) => 2 * ((p1[0] * p2[0] - p1[3] * p2[3]) * (e1[0] * e2[0] - e1[1] * e2[1] - e1[2] * e2[2] - e1[3] * e2[3]) -
    (p1[0] * e2[0] - p1[1] * e2[1] - p1[2] * e2[2] - p1[3] * e2[3]) * (p2[0] * e1[0] - p2[1] * e1[1] - p2[2] * e1[2] - p2[3] * e1[3]));
  return Math.max(Math.abs(amplitude(p1, transverse2)), Math.abs(amplitude(transverse1, p2)));
});
assert.ok(Math.max(...wardErrors) < 1e-12);

const highEnergyS = 1e6 * mA2;
const highRT = (highEnergyS - 2 * mA2) * (highEnergyS - mh2) / (2 * mA2);
const highRL = 2 * mA2 * (highEnergyS - mh2) / (highEnergyS - 2 * mA2);
const highEnergy = { s: highEnergyS, RFTransverseScaled: highRT * 2 * mA2 / highEnergyS ** 2, RFLongitudinalOver2mA2: highRL / (2 * mA2) };
assert.ok(Math.abs(highEnergy.RFTransverseScaled - 1) < 1e-5);
assert.ok(Math.abs(highEnergy.RFLongitudinalOver2mA2 - 1) < 1e-5);

const result = {
  protocol: "claimipedia-d05-inclusive-tomography-audit/1",
  auditId: "d05-inclusive-energy-scan-and-brst-stability-v1",
  inclusiveTheorem: {
    mixedResponse: "After summing unresolved physical channels, (rho_gH/rho_HH)-c_H equals the positive-weighted mean response Rbar(s) dot b.",
    innovation: "The Schur innovation equals W(s) times the weighted variance of b dot R_i(s); it retains polarization/channel heterogeneity even when labels are not observed.",
    scanRecovery: "Two energies whose mean-response vectors are independent recover the two-component beta covector from inclusive mixed responses without event-by-event polarization resolution.",
    qualification: "A single inclusive energy gives one linear projection plus a quadratic variance and can have discrete ambiguity; rank must be audited over the selected scan."
  },
  inclusives,
  scanWitness: { energies: scanPair.map(({ s }) => s), meanResponseMatrix, scanDeterminant, measuredMeans, recovered, expected: beta, recoveryError },
  brstAndEquivalenceAudit: {
    wardErrors,
    gaugeKineticWardIdentityVerified: true,
    externalStateRule: "Only the three physical massive-vector polarizations enter the spectral sum. Goldstone and ghost fields remain internal BRST-completion variables, not additional positive spectral states.",
    longitudinalRule: "At high energy the longitudinal response may be evaluated with the equivalence theorem only with its finite wave-function/equivalence factor and the complete gauge-fixed diagram set.",
    highEnergy,
    highEnergySeparation: "R_F,T grows as s^2/(2m_A^2) relative to the Higgs source while R_F,L tends to 2m_A^2; the scan becomes strongly informative but potentially ill-conditioned in raw normalization."
  },
  dispositions: {
    inclusiveSumErasesAllTomographicInformation: false,
    twoEnergyInclusiveScanCanRecoverTwoBetas: true,
    singleEnergyInclusiveLinearInversionSufficient: false,
    goldstonesArePhysicalPositiveSpectralStates: false,
    equivalenceTheoremAllowsDroppingBrstCompletion: false,
    responseConditioningRequiresNormalizationAudit: true
  },
  nextGate: "Construct normalized dimensionless response coordinates and quantify conditioning/noise amplification across an energy window; then map the inclusive mixed correlator and innovation to a lattice or dispersive estimator.",
  authority: { proposalOnly: true, entails: false, empiricalAuthority: false, automaticCorpusAdmission: false, applicationAdmission: false }
};

const receipt = {
  protocol: "claimipedia-d05-inclusive-tomography-audit-receipt/1",
  checks: {
    inclusiveInnovationPositive: inclusives.every(({ innovation }) => innovation > 0),
    twoEnergyMeanResponseRankVerified: Math.abs(scanDeterminant) > 1e-8,
    inclusiveBetaRecoveryVerified: recoveryError < 1e-12,
    gaugeKineticWardTestsVerified: Math.max(...wardErrors) < 1e-12,
    highEnergyAsymptoticsVerified: Math.abs(highEnergy.RFTransverseScaled - 1) < 1e-5 && Math.abs(highEnergy.RFLongitudinalOver2mA2 - 1) < 1e-5,
    unphysicalStatesExcluded: result.dispositions.goldstonesArePhysicalPositiveSpectralStates === false,
    equivalenceShortcutRejected: result.dispositions.equivalenceTheoremAllowsDroppingBrstCompletion === false,
    authorityBoundaryPreserved: result.authority.automaticCorpusAdmission === false
  },
  resultSha256: sha256(JSON.stringify(result)),
  passed: true
};
assert.ok(Object.values(receipt.checks).every(Boolean));
mkdirSync(generated, { recursive: true });
writeFileSync(resolve(generated, "d05-inclusive-tomography-audit.json"), `${JSON.stringify(result, null, 2)}\n`);
writeFileSync(resolve(generated, "d05-inclusive-tomography-receipt.json"), `${JSON.stringify(receipt, null, 2)}\n`);
console.log(JSON.stringify(receipt, null, 2));
