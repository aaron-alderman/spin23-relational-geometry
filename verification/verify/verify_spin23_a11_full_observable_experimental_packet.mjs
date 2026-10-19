import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const root = process.cwd();
const dataPath = path.join(root, 'evidence', 'data', 'spin23-a11-full-observable-experimental-packet.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const nearly = (a, b, tol = 1e-10) => Math.abs(a - b) <= tol;
const normalCdf = x => 0.5 * (1 + erf(x / Math.SQRT2));
function erf(x) {
  const sign = x < 0 ? -1 : 1;
  const a = Math.abs(x);
  const t = 1 / (1 + 0.3275911 * a);
  const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-a * a);
  return sign * y;
}

function eigMin2(m) {
  const tr = m[0][0] + m[1][1];
  const disc = Math.hypot(m[0][0] - m[1][1], 2 * m[0][1]);
  return (tr - disc) / 2;
}
function mul2(a, b) {
  return [
    [a[0][0] * b[0][0] + a[0][1] * b[1][0], a[0][0] * b[0][1] + a[0][1] * b[1][1]],
    [a[1][0] * b[0][0] + a[1][1] * b[1][0], a[1][0] * b[0][1] + a[1][1] * b[1][1]]
  ];
}
const transpose2 = a => [[a[0][0], a[1][0]], [a[0][1], a[1][1]]];
function inv2(a) {
  const d = a[0][0] * a[1][1] - a[0][1] * a[1][0];
  return [[a[1][1] / d, -a[0][1] / d], [-a[1][0] / d, a[0][0] / d]];
}
const quad2 = (s, c) => s[0] * (c[0][0] * s[0] + c[0][1] * s[1]) + s[1] * (c[1][0] * s[0] + c[1][1] * s[1]);

assert.equal(data.documentId, 1452);
assert.equal(data.claimBoundary.physicalAdmission, false);
assert.equal(data.predictionGate.physicalEffectPredictionAvailable, false);
assert.equal(data.protectedZ3Boundary.acThreePointSamplingIsProtectedZ3, false);
assert.ok(data.predictionGate.missingInputs.length >= 7);
assert.ok(data.literatureAnchors.every(x => x.primaryUrl.startsWith('https://arxiv.org/')));
const currentAc = data.literatureAnchors.find(x => x.id === 'Dunstan2026').facts;
assert.equal(currentAc.relaxationTimeNanoS, 20);
assert.equal(currentAc.destructiveInterferenceMinimumGHz, 0.4);
assert.ok(data.literatureAnchors.find(x => x.id === 'Dunstan2026').scope.includes('not a protected Z3 platform'));

// The published coherence ranges imply a very wide device-dependent homogeneous width range.
const rr = data.literatureAnchors.find(x => x.id === 'Randeria2024').facts;
const t2From = (t1us, tPhiUs) => 1 / (1 / (2 * t1us) + 1 / tPhiUs);
const fwhmMHzFromT2 = t2us => 1 / (Math.PI * t2us);
const broadT2 = t2From(rr.T1MicrosecondsRange[0], rr.RamseyPureDephasingMicrosecondsRange[0]);
const narrowT2 = t2From(rr.T1MicrosecondsRange[1], rr.RamseyPureDephasingMicrosecondsRange[1]);
const publishedWidthEnvelopeMHz = [fwhmMHzFromT2(narrowT2), fwhmMHzFromT2(broadT2)];
assert.ok(publishedWidthEnvelopeMHz[0] < 0.004);
assert.ok(publishedWidthEnvelopeMHz[1] > 1.5);

// Olivero-Longbothum Voigt FWHM approximation for the declared resolution fixture.
const f = data.resolutionFixture;
const gaussianSigma = Math.hypot(f.quasiStaticCenterStdMHz, f.instrumentGaussianStdMHz);
const gaussianFwhm = 2.354820045 * gaussianSigma;
const effectiveFwhmMHz = 0.5346 * f.homogeneousLorentzianFWHMMHz
  + Math.sqrt(0.2166 * f.homogeneousLorentzianFWHMMHz ** 2 + gaussianFwhm ** 2);
assert.ok(effectiveFwhmMHz > 0.62 && effectiveFwhmMHz < 0.64);
assert.ok(f.injectedContrastMHz > effectiveFwhmMHz);
assert.ok(f.nextModeSpacingMHz > effectiveFwhmMHz + f.guardBandMHz);

// Fisher information for a known Lorentzian amplitude/baseline on the frozen grid.
const gamma = f.homogeneousLorentzianFWHMMHz / 2;
const ampNoise = 1 / f.peakAmplitudeSNRPerBin;
let fisher = 0;
for (let x = -4; x <= 4 + 1e-12; x += f.frequencyBinMHz) {
  const d = 2 * gamma * gamma * x / ((x * x + gamma * gamma) ** 2);
  fisher += d * d / (ampNoise * ampNoise);
}
const fitStdMHz = 1 / Math.sqrt(fisher);
const singleSweepStdMHz = Math.hypot(f.quasiStaticCenterStdMHz, fitStdMHz, f.sectorDifferentialDriftStdMHz);
const contrastStdMHz = n => Math.sqrt(3 * singleSweepStdMHz ** 2 / (2 * n));
const zAlpha = 2.326347874;
const powerAt = (delta, n) => normalCdf(delta / contrastStdMHz(n) - zAlpha);
const fixturePower = powerAt(f.injectedContrastMHz, f.independentSweepsPerSectorPerReplication);
assert.ok(fitStdMHz < 0.01);
assert.ok(fixturePower > 0.999);

const minimumShiftFor90PowerMHz = (zAlpha + 1.281551566) * contrastStdMHz(f.independentSweepsPerSectorPerReplication);
assert.ok(minimumShiftFor90PowerMHz < effectiveFwhmMHz);
const resolutionLimitedMinimumMHz = Math.max(minimumShiftFor90PowerMHz, effectiveFwhmMHz);
assert.ok(nearly(resolutionLimitedMinimumMHz, effectiveFwhmMHz));

// Symmetric sector confusion attenuates, but cannot create, a zero-sum contrast.
const epsilon = 0.1;
const attenuation = 1 - 1.5 * epsilon;
const truth = [0.4, 1.0, 1.0];
const mix = truth.map((_, h) => truth.reduce((sum, v, k) => sum + (h === k ? 1 - epsilon : epsilon / 2) * v, 0));
const contrast = x => (x[1] + x[2]) / 2 - x[0];
assert.ok(nearly(contrast(mix), attenuation * contrast(truth)));
assert.ok(nearly(contrast([0.7, 0.7, 0.7]), 0));

// A positive response and its differential scalar survive a common port-coordinate change.
const C = [[1.2, 0.25], [0.25, 0.8]];
const A = [[1.1, 0.2], [-0.1, 0.9]];
const s = [1 / Math.sqrt(2), -1 / Math.sqrt(2)];
assert.ok(eigMin2(C) > 0);
const Cp = mul2(mul2(A, C), transpose2(A));
const AinvT = transpose2(inv2(A));
const sp = [AinvT[0][0] * s[0] + AinvT[0][1] * s[1], AinvT[1][0] * s[0] + AinvT[1][1] * s[1]];
assert.ok(eigMin2(Cp) > 0);
assert.ok(nearly(quad2(s, C), quad2(sp, Cp)));

// The protocol must never convert its injected planning fixture into an absolute prediction.
assert.match(f.warning, /not Spin23 or device predictions/);
assert.equal(data.predictionGate.absoluteOnsetPowerAvailable, false);
assert.equal(data.predictionGate.sensitivityPowerAvailable, true);

const report = {
  result: 'PASS',
  protocolId: data.protocolId,
  publishedHomogeneousWidthEnvelopeMHz: publishedWidthEnvelopeMHz,
  fixture: {
    gaussianSigmaMHz: gaussianSigma,
    effectiveVoigtFWHMMHz: effectiveFwhmMHz,
    lineFitCramerRaoStdMHz: fitStdMHz,
    singleSweepCenterStdMHz: singleSweepStdMHz,
    contrastStdMHz: contrastStdMHz(f.independentSweepsPerSectorPerReplication),
    injectedContrastMHz: f.injectedContrastMHz,
    oneSidedFixturePower: fixturePower,
    statisticalMinimumShiftFor90PowerMHz: minimumShiftFor90PowerMHz,
    resolutionLimitedMinimumMHz
  },
  sectorMixing: { epsilon, attenuation },
  calibrationInvariantError: Math.abs(quad2(s, C) - quad2(sp, Cp)),
  predictionGate: data.predictionGate.noGo
};

console.log(JSON.stringify(report, null, 2));
