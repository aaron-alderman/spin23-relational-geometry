import fs from "node:fs";

const evidence = JSON.parse(fs.readFileSync(new URL(
  "../../evidence/data/admissibility-electrochemical-stochastic-gate-reset-v1.json",
  import.meta.url,
), "utf8"));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const tolerance = 1e-12;
const electro = evidence.electrochemicalWitness;
const nernstMillivolts = Object.fromEntries(electro.species.map((species) => [
  species.name,
  1000 * electro.gasConstant * electro.temperatureKelvin
    / (species.valence * electro.faradayConstant)
    * Math.log(species.outsideMillimolar / species.insideMillimolar),
]));
assert(nernstMillivolts.sodium > 60 && nernstMillivolts.sodium < 70,
  "declared sodium activities should give a positive 60-70 mV Nernst voltage");
assert(nernstMillivolts.potassium < -90 && nernstMillivolts.potassium > -100,
  "declared potassium activities should give a negative 90-100 mV Nernst voltage");

const gate = evidence.stochasticGateWitness;
const rateSum = gate.openingRatePerSecond + gate.closingRatePerSecond;
const openProbability = gate.openingRatePerSecond / rateSum;
const timeConstant = 1 / rateSum;
assert(Math.abs(timeConstant - gate.gateTimeConstantSeconds) < tolerance,
  "gate relaxation time mismatch");
const fractionVariances = gate.channelCounts.map((count) =>
  openProbability * (1 - openProbability) / count);
assert(Math.abs(fractionVariances[0] / fractionVariances[1]
  - gate.channelCounts[1] / gate.channelCounts[0]) < tolerance,
"finite-channel variance must scale as inverse channel count");

const frequencyResponse = gate.probeFrequenciesHertz.map((frequencyHertz) => {
  const omegaTau = 2 * Math.PI * frequencyHertz * timeConstant;
  return {
    frequencyHertz,
    normalizedGain: 1 / Math.sqrt(1 + omegaTau ** 2),
    phaseLagDegrees: -Math.atan(omegaTau) * 180 / Math.PI,
  };
});
assert(frequencyResponse[0].normalizedGain > frequencyResponse[1].normalizedGain
  && frequencyResponse[1].normalizedGain > frequencyResponse[2].normalizedGain,
"finite gating time must generate low-pass gain");
assert(frequencyResponse[0].phaseLagDegrees > frequencyResponse[1].phaseLagDegrees
  && frequencyResponse[1].phaseLagDegrees > frequencyResponse[2].phaseLagDegrees,
"finite gating time must generate increasing phase lag");

const recovery = evidence.recoveryWitness;
assert(recovery.metabolicResourceTimeConstantSeconds
  > 100 * recovery.channelRecoveryTimeConstantSeconds,
"fixture must preserve separated fast and slow recovery clocks");
const channelRecovery90Seconds = -recovery.channelRecoveryTimeConstantSeconds * Math.log(0.1);
const metabolicRecovery90Seconds = -recovery.metabolicResourceTimeConstantSeconds * Math.log(0.1);

const schumann = evidence.schumannMagnitudeWitness;
const environmentalFieldRms = schumann.representativeEnvironmentalElectricFieldASDVoltPerMeterRootHertz
  * Math.sqrt(schumann.comparisonEquivalentNoiseBandwidthHertz);
const amplitudeGap = schumann.representativeSlicePhaseEntrainmentFieldVoltPerMeter
  / environmentalFieldRms;
assert(amplitudeGap > 600 && amplitudeGap < 700,
"representative environmental-to-slice field gap mismatch");
assert(schumann.bodyTransferIncluded === false,
"fixture must not pretend that body-to-tissue transfer has been calculated");

const basis = [
  evidence.trifilarBasis.common,
  evidence.trifilarBasis.differential1,
  evidence.trifilarBasis.differential2,
];
const dot = (left, right) => left.reduce((sum, value, index) => sum + value * right[index], 0);
for (let row = 0; row < basis.length; row += 1) {
  for (let column = 0; column < basis.length; column += 1) {
    assert(Math.abs(dot(basis[row], basis[column]) - (row === column ? 1 : 0)) < tolerance,
      "trifilar common/differential basis must be orthonormal");
  }
}
assert(Math.abs(evidence.trifilarBasis.differential1.reduce((a, b) => a + b, 0)) < tolerance
  && Math.abs(evidence.trifilarBasis.differential2.reduce((a, b) => a + b, 0)) < tolerance,
"differential vectors must lie in the zero-sum quotient");

assert(evidence.maxwellDemonGate.length === 5
  && evidence.maxwellDemonGate.includes("record_reset"),
"Maxwell-demon language requires the complete information and reset ledger");

console.log(JSON.stringify({
  status: "PASS",
  nernstMillivolts,
  stochasticGate: { openProbability, timeConstant, fractionVariances },
  frequencyResponse,
  recovery: { channelRecovery90Seconds, metabolicRecovery90Seconds },
  representativeSchumannComparison: {
    equivalentNoiseBandwidthHertz: schumann.comparisonEquivalentNoiseBandwidthHertz,
    environmentalFieldRms,
    amplitudeGap,
  },
  trifilarDifferentialDimension: 2,
  verdict: "Electrochemical energy, stochastic gating, fast refractoriness and slow metabolic restoration remain distinct and jointly testable.",
}, null, 2));
