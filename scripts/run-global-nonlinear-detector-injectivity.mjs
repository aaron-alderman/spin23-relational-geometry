#!/usr/bin/env node

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const outputPath = resolve(root, "evidence/data/global-nonlinear-detector-injectivity-v1.json");
const write = process.argv.includes("--write");

const domain = {
  rho: [-0.8, 0.8],
  betaMagnitude: [0.5, 2],
  gain: [0.5, 2],
  exclusions: ["beta=0"],
};

function records({ rho, beta, gain }) {
  const x1 = beta;
  const x2Decay = rho * x1;
  const x2Add = rho * x1 + beta;
  return {
    calibrationPower: gain,
    firstPulsePower: gain * x1 ** 2,
    delayedPower: gain * x2Decay ** 2,
    twoPulsePower: gain * x2Add ** 2,
    coherentFirstPulse: Math.sqrt(gain) * x1,
  };
}

function powerJacobian({ rho, beta, gain }) {
  return [
    [0, 0, 1],
    [0, 2 * gain * beta, beta ** 2],
    [2 * gain * rho * beta ** 2, 2 * gain * rho ** 2 * beta, rho ** 2 * beta ** 2],
    [2 * gain * beta ** 2 * (rho + 1), 2 * gain * beta * (rho + 1) ** 2, beta ** 2 * (rho + 1) ** 2],
  ];
}

function gram(matrix) {
  return Array.from({ length: 3 }, (_, i) => Array.from({ length: 3 }, (_, j) =>
    matrix.reduce((sum, row) => sum + row[i] * row[j], 0)));
}

function symmetricEigenvalues(input) {
  const a = input.map(row => [...row]);
  for (let iteration = 0; iteration < 100; iteration += 1) {
    let p = 0;
    let q = 1;
    let largest = 0;
    for (let i = 0; i < 3; i += 1) for (let j = i + 1; j < 3; j += 1) {
      if (Math.abs(a[i][j]) > largest) { largest = Math.abs(a[i][j]); p = i; q = j; }
    }
    if (largest < 1e-14) break;
    const angle = 0.5 * Math.atan2(2 * a[p][q], a[q][q] - a[p][p]);
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const app = c * c * a[p][p] - 2 * s * c * a[p][q] + s * s * a[q][q];
    const aqq = s * s * a[p][p] + 2 * s * c * a[p][q] + c * c * a[q][q];
    for (let k = 0; k < 3; k += 1) {
      if (k === p || k === q) continue;
      const akp = a[k][p];
      const akq = a[k][q];
      a[k][p] = a[p][k] = c * akp - s * akq;
      a[k][q] = a[q][k] = s * akp + c * akq;
    }
    a[p][p] = app;
    a[q][q] = aqq;
    a[p][q] = a[q][p] = 0;
  }
  return a.map((row, i) => row[i]).sort((x, y) => x - y);
}

function invertPower(record) {
  const gain = record.calibrationPower;
  const betaMagnitude = Math.sqrt(record.firstPulsePower / gain);
  const rho = Math.sqrt(record.twoPulsePower / record.firstPulsePower) - 1;
  const predictedDelayedPower = record.firstPulsePower * rho ** 2;
  return { gain, betaMagnitude, rho, predictedDelayedPower };
}

const rhos = Array.from({ length: 33 }, (_, i) => domain.rho[0] + i * (domain.rho[1] - domain.rho[0]) / 32);
const magnitudes = Array.from({ length: 31 }, (_, i) => domain.betaMagnitude[0] + i * (domain.betaMagnitude[1] - domain.betaMagnitude[0]) / 30);
const gains = Array.from({ length: 17 }, (_, i) => domain.gain[0] + i * (domain.gain[1] - domain.gain[0]) / 16);

let minimumLocalGramEigenvalue = Infinity;
let maximumPowerAliasResidual = 0;
let minimumCoherentAliasSeparation = Infinity;
let maximumInversionResidual = 0;
let pointsChecked = 0;

for (const rho of rhos) for (const betaMagnitude of magnitudes) for (const gain of gains) {
  const positive = { rho, beta: betaMagnitude, gain };
  const negative = { rho, beta: -betaMagnitude, gain };
  const positiveRecord = records(positive);
  const negativeRecord = records(negative);
  const powerFields = ["calibrationPower", "firstPulsePower", "delayedPower", "twoPulsePower"];
  maximumPowerAliasResidual = Math.max(maximumPowerAliasResidual,
    ...powerFields.map(field => Math.abs(positiveRecord[field] - negativeRecord[field])));
  minimumCoherentAliasSeparation = Math.min(minimumCoherentAliasSeparation,
    Math.abs(positiveRecord.coherentFirstPulse - negativeRecord.coherentFirstPulse));

  for (const beta of [betaMagnitude, -betaMagnitude]) {
    const point = { rho, beta, gain };
    const record = records(point);
    const inversion = invertPower(record);
    maximumInversionResidual = Math.max(maximumInversionResidual,
      Math.abs(inversion.gain - gain),
      Math.abs(inversion.betaMagnitude - Math.abs(beta)),
      Math.abs(inversion.rho - rho),
      Math.abs(inversion.predictedDelayedPower - record.delayedPower));
    minimumLocalGramEigenvalue = Math.min(minimumLocalGramEigenvalue,
      symmetricEigenvalues(gram(powerJacobian(point)))[0]);
    pointsChecked += 1;
  }
}

const representative = { rho: -0.35, beta: 1.4, gain: 1.3 };
const representativeAlias = { ...representative, beta: -representative.beta };

const output = {
  protocol: "global-nonlinear-detector-injectivity/1",
  packet: "AZ-107",
  target: "OT-034",
  parent: "AZ-057",
  frozenFamily: {
    latentUpdate: "x[n+1] = rho*x[n] + beta*u[n], with x[0]=0",
    nonlinearDetector: "P[n] = gain*x[n]^2",
    coherentReference: "Q[1] = sqrt(gain)*x[1]",
    compactDomain: domain,
    interventions: {
      gainCalibration: "known unit-amplitude reference gives calibrationPower=gain",
      onePulse: "u[0]=1 gives firstPulsePower=gain*beta^2",
      pulseThenWait: "u=[1,0] gives delayedPower=gain*rho^2*beta^2",
      twoPulses: "u=[1,1] gives twoPulsePower=gain*beta^2*(rho+1)^2",
      coherentFirstPulse: "phase-referenced amplitude after u[0]=1 gives sqrt(gain)*beta",
    },
  },
  analyticResult: {
    powerOnlyInversion: {
      gain: "calibrationPower",
      betaMagnitude: "sqrt(firstPulsePower/calibrationPower)",
      rho: "sqrt(twoPulsePower/firstPulsePower)-1, unique because rho+1>0 on the declared domain",
      delayedPowerRole: "held-out history consistency check",
    },
    residualPowerQuotient: "(rho,beta,gain) ~ (rho,-beta,gain)",
    quotientDiameterInDeclaredParameterMetric: 4,
    localRankDoesNotRemoveGlobalQuotient: true,
    coherentAugmentation: "beta=coherentFirstPulse/sqrt(calibrationPower), so the five-record bundle is globally injective",
  },
  adversarialAudit: {
    pointsChecked,
    gridShape: [rhos.length, magnitudes.length, gains.length, 2],
    minimumPowerOnlyLocalGramEigenvalue: minimumLocalGramEigenvalue,
    maximumPowerAliasResidual,
    minimumCoherentAliasSeparation,
    maximumAnalyticInversionResidual: maximumInversionResidual,
    representativePair: [representative, representativeAlias],
    representativeRecords: [records(representative), records(representativeAlias)],
  },
  decision: {
    powerOnlyFamilyGloballyInjective: false,
    powerOnlyResidualQuotientCharacterized: true,
    finiteAugmentedBundleGloballyInjectiveOnDeclaredCompactFamily: true,
    ot034DeclaredClosureCriterionMet: true,
    universalNonlinearIdentifiabilityTheorem: false,
    physicalCarrierMeasured: false,
    newPhysicsEvidence: false,
  },
  nextGate: "Run the same adversarial quotient audit on a calibrated physical carrier with bounded phase-reference drift, detector nonlinearity and model discrepancy.",
};

if (write) {
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
  console.log(`wrote ${outputPath}`);
}

console.log(JSON.stringify({
  pointsChecked,
  minimumPowerOnlyLocalGramEigenvalue: minimumLocalGramEigenvalue,
  maximumPowerAliasResidual,
  minimumCoherentAliasSeparation,
  maximumInversionResidual,
  powerQuotient: output.analyticResult.residualPowerQuotient,
  augmentedBundleInjective: output.decision.finiteAugmentedBundleGloballyInjectiveOnDeclaredCompactFamily,
}, null, 2));
