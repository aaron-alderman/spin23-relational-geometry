#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const parentPath = resolve(root, "evidence/data/hydrodynamic-causal-relaxation-wedge-v1.json");
const outputPath = resolve(root, "evidence/data/hydrodynamic-relaxation-gaussian-kms-v1.json");
const write = process.argv.includes("--write");
const parentBytes = readFileSync(parentPath);
const parent = JSON.parse(parentBytes);
const parentSha256 = createHash("sha256").update(parentBytes).digest("hex");

const { D, Gamma, cs2, tauShear, tauSound } = parent.parameters;
const C = (re, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = z => C(z.re, -z.im);
const zero = n => Array.from({ length: n }, () => Array.from({ length: n }, () => C(0)));
const diagonal = values => values.map((value, i) => values.map((_, j) => C(i === j ? value : 0)));
const multiply = (a, b) => a.map((row, i) => b[0].map((_, j) => row.reduce((sum, value, q) => add(sum, mul(value, b[q][j])), C(0))));
const dagger = a => a[0].map((_, j) => a.map(row => conj(row[j])));
const matrixAdd = (...matrices) => matrices.reduce((out, matrix) => out.map((row, i) => row.map((value, j) => add(value, matrix[i][j]))));
const matrixSubtract = (a, b) => a.map((row, i) => row.map((value, j) => add(value, C(-b[i][j].re, -b[i][j].im))));
const parityTransform = (matrix, signs) => matrix.map((row, i) => row.map((value, j) => C(value.re * signs[i] * signs[j], value.im * signs[i] * signs[j])));
const maxAbs = matrix => Math.max(...matrix.flat().map(z => Math.hypot(z.re, z.im)));

const shearCovariance = diagonal([1, D / tauShear]);
const shearNoise = diagonal([0, 2 * D / tauShear ** 2]);
const soundCovariance = diagonal([1 / cs2, 1, Gamma / tauSound]);
const soundNoise = diagonal([0, 0, 2 * Gamma / tauSound ** 2]);
const shearTimeReversalParity = [-1, 1];
const soundTimeReversalParity = [1, -1, 1];

const samples = parent.samples.map(({ k }) => {
  const shearGenerator = [
    [C(0), C(0, -k)],
    [C(0, -D * k / tauShear), C(-1 / tauShear)],
  ];
  const soundGenerator = [
    [C(0), C(0, -k), C(0)],
    [C(0, -cs2 * k), C(0), C(0, -k)],
    [C(0), C(0, -Gamma * k / tauSound), C(-1 / tauSound)],
  ];
  const shearResidual = matrixAdd(multiply(shearGenerator, shearCovariance), multiply(shearCovariance, dagger(shearGenerator)), shearNoise);
  const soundResidual = matrixAdd(multiply(soundGenerator, soundCovariance), multiply(soundCovariance, dagger(soundGenerator)), soundNoise);
  const shearOnsagerCasimirResidual = matrixSubtract(
    multiply(shearGenerator, shearCovariance),
    parityTransform(multiply(shearCovariance, dagger(shearGenerator)), shearTimeReversalParity),
  );
  const soundOnsagerCasimirResidual = matrixSubtract(
    multiply(soundGenerator, soundCovariance),
    parityTransform(multiply(soundCovariance, dagger(soundGenerator)), soundTimeReversalParity),
  );
  return {
    k,
    shearGenerator,
    shearStationaryCovariance: shearCovariance,
    shearNoise,
    shearLyapunovResidual: maxAbs(shearResidual),
    shearOnsagerCasimirResidual: maxAbs(shearOnsagerCasimirResidual),
    soundGenerator,
    soundStationaryCovariance: soundCovariance,
    soundNoise,
    soundLyapunovResidual: maxAbs(soundResidual),
    soundOnsagerCasimirResidual: maxAbs(soundOnsagerCasimirResidual),
  };
});

const audit = {
  samplesChecked: samples.length,
  maximumShearLyapunovResidual: Math.max(...samples.map(sample => sample.shearLyapunovResidual)),
  maximumSoundLyapunovResidual: Math.max(...samples.map(sample => sample.soundLyapunovResidual)),
  maximumShearOnsagerCasimirResidual: Math.max(...samples.map(sample => sample.shearOnsagerCasimirResidual)),
  maximumSoundOnsagerCasimirResidual: Math.max(...samples.map(sample => sample.soundOnsagerCasimirResidual)),
  minimumStationaryCovarianceEigenvalue: Math.min(1, D / tauShear, 1 / cs2, Gamma / tauSound),
  minimumNoiseEigenvalue: 0,
  positiveShearNoiseEigenvalue: 2 * D / tauShear ** 2,
  positiveSoundNoiseEigenvalue: 2 * Gamma / tauSound ** 2,
};

const result = {
  protocol: "hydrodynamic-relaxation-gaussian-kms/1",
  date: "2026-10-25",
  target: "OT-016",
  parent: "AZ-103",
  parentEvidence: {
    path: "evidence/data/hydrodynamic-causal-relaxation-wedge-v1.json",
    sha256: parentSha256,
  },
  primaryLiterature: parent.primaryLiterature,
  enlargedState: {
    shear: ["conserved transverse momentum", "relaxing shear flux"],
    sound: ["conserved density", "longitudinal velocity", "relaxing viscous stress"],
    gaussianAction: "S=a_dagger(partial_t-A)r+(i/2)a_dagger Q a",
    equilibriumCondition: "A C+C A_dagger+Q=0",
    timeReversalParity: { shear: shearTimeReversalParity, sound: soundTimeReversalParity },
    onsagerCasimirCondition: "A C=E C A_dagger E",
    interpretation: "classical stationary Gaussian fluctuation-dissipation compatibility with an explicit Onsager-Casimir parity audit",
  },
  parameters: { D, Gamma, cs2, tauShear, tauSound },
  samples,
  audit: {
    ...audit,
    stationaryCovariancePositive: audit.minimumStationaryCovarianceEigenvalue > 0,
    noisePositiveSemidefinite: audit.minimumNoiseEigenvalue >= 0 && audit.positiveShearNoiseEigenvalue > 0 && audit.positiveSoundNoiseEigenvalue > 0,
    onsagerCasimirPassed: audit.maximumShearOnsagerCasimirResidual < 1e-12 && audit.maximumSoundOnsagerCasimirResidual < 1e-12,
    stationaryGaussianFdtPassed: audit.maximumShearLyapunovResidual < 1e-12 && audit.maximumSoundLyapunovResidual < 1e-12,
  },
  decision: {
    auxiliaryRelaxationNoiseConstructed: true,
    stationaryFluctuationDissipationEstablished: true,
    positiveGaussianDoubledActionAvailable: true,
    exactQuantumCothKmsEstablished: false,
    nonlinearDynamicalKmsEstablished: false,
    stressWardImprovementClassificationEstablished: false,
    microscopicMatchingEstablished: false,
    fullOt016Closure: false,
    newPhysicsEvidence: false,
  },
  implication: "The causal relaxation poles of AZ-103 admit positive stationary Gaussian fluctuations: noise acts only on the relaxing flux and stress, conservation transports it into the hydrodynamic variables, and the declared time-reversal parities satisfy Onsager-Casimir reciprocity. This establishes classical Gaussian FDT compatibility, not exact quantum-frequency or nonlinear dynamical KMS. Improvement/contact classification and physical relaxation data remain open.",
};

if (write) {
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\n`);
}

console.log(JSON.stringify(result, null, 2));
