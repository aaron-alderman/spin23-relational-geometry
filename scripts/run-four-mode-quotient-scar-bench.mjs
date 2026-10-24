#!/usr/bin/env node

import fs from "node:fs";

const write = process.argv.includes("--write");
const output = "evidence/data/admissibility-four-mode-quotient-scar-bench-v1.json";
const design = {
  carrier: "four phase-coherent RF or microwave resonators with one hub and three individually addressable outer modes",
  centreFrequencyMHz: 100,
  couplingMHz: 2,
  linewidthMHz: 0.1,
  scanMHz: [94, 106],
  scanStepMHz: 0.01,
  exactDetuningsMHz: [0, 0, 0],
  weakPattern: [1, -0.15, -0.85],
  weakScalesMHz: [0.05, 0.1, 0.2, 0.4],
  resolvedDetuningsMHz: [2, -0.3, -1.7],
  tolerance: {
    outerFrequencyMHz: 0.02,
    couplingFraction: 0.01,
    linewidthFraction: 0.1,
    relativeGainDb: 0.25,
    relativePhaseDegree: 2,
    frequencyCalibrationMHz: 0.01
  }
};

function jacobi(matrix) {
  const A = matrix.map(row => [...row]);
  const n = A.length;
  const V = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => Number(i === j)));
  for (let iteration = 0; iteration < 200; iteration += 1) {
    let p = 0; let q = 1; let largest = 0;
    for (let i = 0; i < n; i += 1) for (let j = i + 1; j < n; j += 1) {
      if (Math.abs(A[i][j]) > largest) { largest = Math.abs(A[i][j]); p = i; q = j; }
    }
    if (largest < 1e-14) break;
    const angle = 0.5 * Math.atan2(2 * A[p][q], A[q][q] - A[p][p]);
    const c = Math.cos(angle); const s = Math.sin(angle);
    for (let k = 0; k < n; k += 1) if (k !== p && k !== q) {
      const ap = A[k][p]; const aq = A[k][q];
      A[k][p] = A[p][k] = c * ap - s * aq;
      A[k][q] = A[q][k] = s * ap + c * aq;
    }
    const app = A[p][p]; const aqq = A[q][q]; const apq = A[p][q];
    A[p][p] = c * c * app - 2 * s * c * apq + s * s * aqq;
    A[q][q] = s * s * app + 2 * s * c * apq + c * c * aqq;
    A[p][q] = A[q][p] = 0;
    for (let k = 0; k < n; k += 1) {
      const vp = V[k][p]; const vq = V[k][q];
      V[k][p] = c * vp - s * vq;
      V[k][q] = s * vp + c * vq;
    }
  }
  return A.map((row, i) => ({ value: row[i], vector: V.map(v => v[i]) })).sort((a, b) => a.value - b.value);
}

const matVec = (A, x) => A.map(row => row.reduce((sum, value, index) => sum + value * x[index], 0));
const hamiltonian = (detunings, couplings = [design.couplingMHz, design.couplingMHz, design.couplingMHz]) => [
  [0, ...couplings],
  [couplings[0], detunings[0], 0, 0],
  [couplings[1], 0, detunings[1], 0],
  [couplings[2], 0, 0, detunings[2]]
];

function normalizedKrylovSingularValues(H) {
  const columns = [[1, 0, 0, 0]];
  for (let i = 1; i < 4; i += 1) columns.push(matVec(H, columns[i - 1]));
  const normalized = columns.map(column => {
    const norm = Math.hypot(...column);
    return norm ? column.map(value => value / norm) : column;
  });
  const K = Array.from({ length: 4 }, (_, row) => normalized.map(column => column[row]));
  const gram = Array.from({ length: 4 }, (_, i) => Array.from({ length: 4 }, (_, j) => K.reduce((sum, row) => sum + row[i] * row[j], 0)));
  return jacobi(gram).map(item => Math.sqrt(Math.max(0, item.value)));
}

const eigenRecord = (detunings, couplings) => {
  const eigensystem = jacobi(hamiltonian(detunings, couplings));
  const eigenvaluesMHz = eigensystem.map(item => item.value);
  return {
    eigenvaluesMHz,
    adjacentGapsMHz: eigenvaluesMHz.slice(1).map((value, i) => value - eigenvaluesMHz[i]),
    hubResidues: eigensystem.map(item => item.vector[0] ** 2),
    normalizedKrylovSingularValues: normalizedKrylovSingularValues(hamiltonian(detunings, couplings))
  };
};

const complex = (re, im = 0) => ({ re, im });
const add = (a, b) => complex(a.re + b.re, a.im + b.im);
const sub = (a, b) => complex(a.re - b.re, a.im - b.im);
const div = (a, b) => {
  const denominator = b.re ** 2 + b.im ** 2;
  return complex((a.re * b.re + a.im * b.im) / denominator, (a.im * b.re - a.re * b.im) / denominator);
};
const magnitude = a => Math.hypot(a.re, a.im);
const selfEnergy = (scale, z = complex(1, 0.8)) => design.weakPattern.reduce((sum, p) => add(sum, div(complex(design.couplingMHz ** 2), sub(z, complex(scale * p, -design.linewidthMHz / 2)))), complex(0));
const symmetricSelfEnergy = (() => {
  const z = complex(1, 0.8);
  return div(complex(3 * design.couplingMHz ** 2), add(z, complex(0, design.linewidthMHz / 2)));
})();
const memoryScaling = design.weakScalesMHz.map(scale => {
  const difference = magnitude(sub(selfEnergy(scale), symmetricSelfEnergy));
  return { scaleMHz: scale, selfEnergyDifference: difference, differenceOverScaleSquared: difference / scale ** 2 };
});

const [d1, d2, d3] = design.weakPattern;
const U = (d1 - d2) / Math.sqrt(2);
const V = (d1 + d2 - 2 * d3) / Math.sqrt(6);
const orientedCubic = U * (U ** 2 - 3 * V ** 2);
const swappedU = (d2 - d1) / Math.sqrt(2);
const swappedV = (d2 + d1 - 2 * d3) / Math.sqrt(6);
const swappedCubic = swappedU * (swappedU ** 2 - 3 * swappedV ** 2);

let randomState = 0x5eed1234;
const random = () => {
  randomState = (1664525 * randomState + 1013904223) >>> 0;
  return randomState / 2 ** 32;
};
const samples = 5000;
let minimumGapToLinewidth = Infinity;
let minimumHubResidue = Infinity;
let minimumKrylovSingularValue = Infinity;
let passing = 0;
for (let sample = 0; sample < samples; sample += 1) {
  const detunings = design.resolvedDetuningsMHz.map(value => value + (2 * random() - 1) * design.tolerance.outerFrequencyMHz);
  const couplings = [0, 1, 2].map(() => design.couplingMHz * (1 + (2 * random() - 1) * design.tolerance.couplingFraction));
  const linewidths = [0, 1, 2, 3].map(() => design.linewidthMHz * (1 + (2 * random() - 1) * design.tolerance.linewidthFraction));
  const record = eigenRecord(detunings, couplings);
  const gapToLinewidth = Math.min(...record.adjacentGapsMHz) / Math.max(...linewidths);
  const minResidue = Math.min(...record.hubResidues);
  const minSingular = Math.min(...record.normalizedKrylovSingularValues);
  minimumGapToLinewidth = Math.min(minimumGapToLinewidth, gapToLinewidth);
  minimumHubResidue = Math.min(minimumHubResidue, minResidue);
  minimumKrylovSingularValue = Math.min(minimumKrylovSingularValue, minSingular);
  if (gapToLinewidth > 12 && minResidue > 0.04 && minSingular > 0.05) passing += 1;
}

const record = {
  schema: "admissibility.four-mode-quotient-scar-bench/1",
  id: "AZ-059",
  date: "2026-10-25",
  design,
  exactSymmetry: eigenRecord(design.exactDetuningsMHz),
  resolvedBreaking: eigenRecord(design.resolvedDetuningsMHz),
  memoryScaling,
  orientation: {
    contrast: { U, V },
    orientedCubic,
    swappedCubic,
    evenQuadratic: d1 ** 2 + d2 ** 2 + d3 ** 2,
    evenProduct: d1 * d2 * d3
  },
  toleranceMonteCarlo: {
    seed: "0x5eed1234",
    samples,
    thresholds: { gapToLinewidth: 12, minimumHubResidue: 0.04, minimumNormalizedKrylovSingularValue: 0.05 },
    minimumGapToLinewidth,
    minimumHubResidue,
    minimumNormalizedKrylovSingularValue: minimumKrylovSingularValue,
    passing,
    passingFraction: passing / samples
  },
  detectorContract: {
    drives: ["hub", "outer_sum", "contrast_U", "contrast_V"],
    records: ["four complex port transfers", "sum channel", "two calibrated contrast channels", "ringdown"],
    controls: ["exact cyclic setting", "centred weak breaking", "resolved unequal breaking", "outer-port exchange", "gain-phase injection", "bandwidth restriction"],
    advance: "all four resolved poles, rank-two-to-rank-four release, quadratic memory onset and odd oriented cubic survive held-out calibration errors",
    stop: "a two-mode model fits resolved individual-port records, the cubic does not reverse under a physical port exchange, or the scars disappear after gain-phase and bandwidth calibration"
  },
  authority: {
    closesHardwareSpecification: true,
    closesLaboratoryExecution: false,
    entailsFundamentalD4OrG2Physics: false,
    interpretation: "a successful bench realizes the quotient-and-detector grammar in conventional coupled-mode physics; it does not prove that an observed natural system was generated by a D4 quotient"
  },
  sources: [
    { doi: "10.1103/PhysRevB.111.205412", role: "experimental precedent that higher-order records can expose hidden states while retaining model non-uniqueness" },
    { doi: "10.1038/s41534-023-00723-7", role: "four-module phase-coherent microwave routing and calibrated intermode transfer precedent" }
  ]
};

if (write) fs.writeFileSync(output, `${JSON.stringify(record, null, 2)}\n`);
console.log(JSON.stringify({ output: write ? output : null, exactRank: record.exactSymmetry.normalizedKrylovSingularValues.filter(value => value > 1e-7).length, resolvedRank: record.resolvedBreaking.normalizedKrylovSingularValues.filter(value => value > 1e-7).length, minimumGapToLinewidth, minimumHubResidue, minimumKrylovSingularValue, passing, samples }, null, 2));
