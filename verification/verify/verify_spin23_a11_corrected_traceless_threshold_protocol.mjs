import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const spec = JSON.parse(await readFile(new URL("../../evidence/data/spin23-a11-corrected-traceless-threshold-protocol.json", import.meta.url), "utf8"));
assert.equal(spec.documentId, 1399);
const s = [1 / Math.sqrt(2), -1 / Math.sqrt(2)];
const dot = (a, b) => a.reduce((x, y, i) => x + y * b[i], 0);
const matVec = (A, x) => A.map(row => dot(row, x));
const quad = (x, A) => dot(x, matVec(A, x));
const transpose = A => A[0].map((_, j) => A.map(row => row[j]));
const multiply = (A, B) => A.map(row => transpose(B).map(col => dot(row, col)));
const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const inverse2 = A => {
  const d = A[0][0] * A[1][1] - A[0][1] * A[1][0];
  assert.ok(Math.abs(d) > 1e-12);
  return [[A[1][1] / d, -A[0][1] / d], [-A[1][0] / d, A[0][0] / d]];
};
const minEig = A => ((A[0][0] + A[1][1]) - Math.hypot(A[0][0] - A[1][1], 2 * A[0][1])) / 2;

// Construct a full PSD two-port response whose differential projection equals w.
const matrixFromDifferentialWeight = w => {
  const common = 0.015;
  return [[common + w / 2, -w / 2], [-w / 2, common + w / 2]];
};
const bg = spec.syntheticFixtures.commonBackground;
const e12 = spec.syntheticFixtures.positiveH1H2Excess;
const e0 = spec.syntheticFixtures.positiveH0Excess;
const nullResponses = [0, 1, 2].map(() => bg.map(matrixFromDifferentialWeight));
const positiveResponses = [
  bg.map((b, i) => matrixFromDifferentialWeight(b + e0[i])),
  bg.map((b, i) => matrixFromDifferentialWeight(b + e12[i])),
  bg.map((b, i) => matrixFromDifferentialWeight(b + e12[i]))
];

for (const fixture of [nullResponses, positiveResponses]) {
  for (const sector of fixture) for (const C of sector) {
    assert.ok(minEig(C) >= -1e-14);
    assert.ok(quad(s, C) >= -1e-14);
  }
}

const projected = fixture => fixture.map(sector => sector.map(C => quad(s, C)));
const sectorExcess = fixture => {
  const p = projected(fixture);
  return p[0].map((x, i) => (p[1][i] + p[2][i]) / 2 - x);
};
const nullExcess = sectorExcess(nullResponses);
const positiveExcess = sectorExcess(positiveResponses);
assert.ok(Math.max(...nullExcess.map(Math.abs)) < 1e-14);
assert.deepEqual(positiveExcess.map(x => Math.round(x * 1e12) / 1e12), e12.map((x, i) => Math.round((x - e0[i]) * 1e12) / 1e12));

// The two preregistered subbands inside the toy threshold window are positive.
const f = spec.syntheticFixtures.frequencyCenters;
const subbandA = positiveExcess.reduce((sum, x, i) => sum + (f[i] >= 1.744 && f[i] < 2.15 ? x : 0), 0);
const subbandB = positiveExcess.reduce((sum, x, i) => sum + (f[i] >= 2.15 && f[i] < 2.562 ? x : 0), 0);
assert.ok(subbandA > 0 && subbandB > 0);

// A sector-independent additive contact cancels exactly in the contrast.
const K = spec.syntheticFixtures.commonContactMatrix;
const withContact = positiveResponses.map(sector => sector.map(C => add(C, K)));
const contactExcess = sectorExcess(withContact);
assert.ok(Math.max(...contactExcess.map((x, i) => Math.abs(x - positiveExcess[i]))) < 1e-14);

// A common nonsingular port recalibration preserves the physical scalar if the
// differential covector is transformed contragrediently.
const A = spec.syntheticFixtures.commonCalibrationMap;
const Ainv = inverse2(A);
const sPrime = matVec(transpose(Ainv), s);
let maximumCalibrationInvariantError = 0;
for (const sector of positiveResponses) for (const C of sector) {
  const Cprime = multiply(multiply(A, C), transpose(A));
  maximumCalibrationInvariantError = Math.max(maximumCalibrationInvariantError, Math.abs(quad(sPrime, Cprime) - quad(s, C)));
}
assert.ok(maximumCalibrationInvariantError < 1e-12);

// CP-even sectors h=1 and h=2 are identical in the fixture.
const p = projected(positiveResponses);
const cpError = Math.max(...p[1].map((x, i) => Math.abs(x - p[2][i])));
assert.equal(cpError, 0);

// Acklam inverse-normal approximation for the one-sided power budget.
function normalQuantile(probability) {
  assert.ok(probability > 0 && probability < 1);
  const a = [-39.69683028665376, 220.9460984245205, -275.9285104469687, 138.357751867269, -30.66479806614716, 2.506628277459239];
  const b = [-54.47609879822406, 161.5858368580409, -155.6989798598866, 66.80131188771972, -13.28068155288572];
  const c = [-0.007784894002430293, -0.3223964580411365, -2.400758277161838, -2.549732539343734, 4.374664141464968, 2.938163982698783];
  const d = [0.007784695709041462, 0.3224671290700398, 2.445134137142996, 3.754408661907416];
  const plow = 0.02425;
  const phigh = 1 - plow;
  if (probability < plow) {
    const q = Math.sqrt(-2 * Math.log(probability));
    return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
  }
  if (probability > phigh) return -normalQuantile(1 - probability);
  const q = probability - 0.5;
  const r = q * q;
  return (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
}
const power = spec.powerModel;
const alphaBin = power.familywiseAlpha / power.preregisteredIndependentSubbands;
const requiredEvents = power.requiredSubbands * power.requiredReplications;
const eventMiss = (1 - power.targetJointPower) / requiredEvents;
const zCritical = normalQuantile(1 - alphaBin);
const zPower = normalQuantile(1 - eventMiss);
const netEffect = power.nuisanceRetention * power.normalizedBandEffect - power.worstCaseRelativeBias;
assert.ok(netEffect > 0);
const runsPerSectorPerReplication = Math.ceil(3 * power.singleRunRelativeNoise ** 2 * (zCritical + zPower) ** 2 / (2 * netEffect ** 2));
assert.ok(runsPerSectorPerReplication > 0);

assert.equal(spec.secondaryObservable.cannotOverridePrimaryNull, true);
assert.equal(spec.platformMapping.aharonovCasher.topologyClass, 1);
assert.equal(spec.platformMapping.protectedZ3.topologyClass, 2);
assert.equal(spec.claimBoundary.primaryEndpointSchemeRobust, true);
assert.equal(spec.claimBoundary.secondaryThirdDirectionSchemeRobust, false);
assert.equal(spec.claimBoundary.physicalAdmission, false);

console.log(JSON.stringify({
  passed: true,
  documentId: spec.documentId,
  protocolId: spec.protocolId,
  nullMaximumSupportContrast: Math.max(...nullExcess.map(Math.abs)),
  positiveSupportContrastByFrequency: positiveExcess,
  firstPreregisteredSubbandContrast: subbandA,
  secondPreregisteredSubbandContrast: subbandB,
  maximumCommonContactCancellationError: Math.max(...contactExcess.map((x, i) => Math.abs(x - positiveExcess[i])), 0),
  maximumCommonCalibrationInvariantError: maximumCalibrationInvariantError,
  cpConjugateSectorError: cpError,
  alphaPerSubband: alphaBin,
  requiredPerEventPower: 1 - eventMiss,
  oneSidedCriticalZ: zCritical,
  oneSidedPowerZ: zPower,
  syntheticRunsPerSectorPerReplication: runsPerSectorPerReplication,
  syntheticTotalSectorRunsAcrossTwoReplications: runsPerSectorPerReplication * 3 * power.requiredReplications,
  primaryEndpoint: "traceless/differential spectral support and onset contrast",
  secondaryEndpoint: "xi- and port-calibrated signed third matrix direction",
  aharonovCasherClaimClass: "continuous-U1 operational holonomy test",
  protectedZ3ClaimClass: "protected-sector test conditional on verified algebra and scaling",
  physicalAdmission: false
}, null, 2));

