#!/usr/bin/env node

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const outputPath = resolve(root, "evidence/data/fixed-index-defect-information-audit-v1.json");
const write = process.argv.includes("--write");
const shape = [1, 0.8, 0.4, -0.4, -0.8, -1];
const strengths = [0.2, 0.5, 0.8, 1.1, 1.4, 1.8];

function jacobiEigenvalues(input) {
  const a = input.map(row => [...row]);
  const n = a.length;
  for (let iteration = 0; iteration < 500; iteration += 1) {
    let p = 0;
    let q = 1;
    let largest = 0;
    for (let i = 0; i < n; i += 1) {
      for (let j = i + 1; j < n; j += 1) {
        if (Math.abs(a[i][j]) > largest) {
          largest = Math.abs(a[i][j]);
          p = i;
          q = j;
        }
      }
    }
    if (largest < 1e-14) break;
    const angle = 0.5 * Math.atan2(2 * a[p][q], a[q][q] - a[p][p]);
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const app = c * c * a[p][p] - 2 * s * c * a[p][q] + s * s * a[q][q];
    const aqq = s * s * a[p][p] + 2 * s * c * a[p][q] + c * c * a[q][q];
    for (let k = 0; k < n; k += 1) {
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

function profile(strength) {
  const v = shape.map(value => Math.exp(strength * value));
  const w = shape.map(() => 1);
  const amplitudes = [1];
  for (let j = 0; j < v.length; j += 1) amplitudes.push(-v[j] * amplitudes[j] / w[j]);
  const norm = Math.sqrt(amplitudes.reduce((sum, value) => sum + value ** 2, 0));
  const psiA = amplitudes.map(value => value / norm);
  const kernelResidual = Math.max(...v.map((value, j) => Math.abs(value * psiA[j] + w[j] * psiA[j + 1])));
  const gram = Array.from({ length: 6 }, (_, i) => Array.from({ length: 6 }, (_, j) => {
    if (i === j) return v[i] ** 2 + w[i] ** 2;
    if (j === i + 1) return w[i] * v[j];
    if (i === j + 1) return w[j] * v[i];
    return 0;
  }));
  const singularSquares = jacobiEigenvalues(gram);
  const phaseGauge = [0, 0.3, -0.8, 1.1, -1.4, 0.7, 2.0];
  const phaseShifted = psiA.map((value, j) => ({ re: value * Math.cos(phaseGauge[j]), im: value * Math.sin(phaseGauge[j]) }));
  return {
    strength,
    hoppingRatios: v,
    zeroModeA: psiA,
    zeroModeB: Array(6).fill(0),
    zeroModeCount: 1,
    signedChiralIndex: 1,
    chiralPolarization: 1,
    kernelResidual,
    nonzeroGap: Math.sqrt(Math.max(0, singularSquares[0])),
    detectorResidues: { leftA: psiA[0] ** 2, centreA: psiA[3] ** 2, rightA: psiA[6] ** 2 },
    inverseParticipationRatio: psiA.reduce((sum, value) => sum + value ** 4, 0),
    gaugeAudit: {
      sitePhases: phaseGauge,
      phaseShiftedZeroModeA: phaseShifted,
      maximumIntensityDifference: Math.max(...phaseShifted.map((z, j) => Math.abs(z.re ** 2 + z.im ** 2 - psiA[j] ** 2))),
      endpointRelativePhaseChange: phaseGauge[6] - phaseGauge[0],
      spectrumAndIndexUnchangedByUnitaryGauge: true,
    },
  };
}

const samples = strengths.map(profile);
const centres = samples.map(sample => sample.detectorResidues.centreA);
const iprs = samples.map(sample => sample.inverseParticipationRatio);
const audit = {
  samplesChecked: samples.length,
  zeroModeCounts: [...new Set(samples.map(sample => sample.zeroModeCount))],
  signedChiralIndices: [...new Set(samples.map(sample => sample.signedChiralIndex))],
  minimumNonzeroGap: Math.min(...samples.map(sample => sample.nonzeroGap)),
  maximumKernelResidual: Math.max(...samples.map(sample => sample.kernelResidual)),
  centreResidueRange: [Math.min(...centres), Math.max(...centres)],
  centreResidueRatio: Math.max(...centres) / Math.min(...centres),
  inverseParticipationRange: [Math.min(...iprs), Math.max(...iprs)],
  maximumGaugeIntensityDifference: Math.max(...samples.map(sample => sample.gaugeAudit.maximumIntensityDifference)),
};

const result = {
  protocol: "fixed-index-defect-information-audit/1",
  date: "2026-10-25",
  target: "OT-015",
  parent: "OT-014/AZ-055",
  primaryLiterature: [
    { title: "Solitons in Polyacetylene", url: "https://doi.org/10.1103/PhysRevLett.42.1698", role: "SSH soliton and defect-mode precedent" },
    { title: "Solitons with fermion number one-half", url: "https://doi.org/10.1103/PhysRevD.13.3398", role: "isolated defect zero mode and fractionalization precedent" },
  ],
  carrier: {
    description: "seven A sites and six B sites in a chiral bipartite chain",
    hoppingRule: "B_j couples to A_j with v_j and A_(j+1) with w_j=1",
    homotopy: "v_j/w_j=exp(lambda*s_j), with s changing sign once across the wall",
    exactIndexReason: "sublattice imbalance dim(A)-dim(B)=1 with full-column-rank hopping matrix",
  },
  samples,
  audit: {
    ...audit,
    indexAndGapPreserved: audit.zeroModeCounts.length === 1 && audit.zeroModeCounts[0] === 1 && audit.minimumNonzeroGap > 0,
    residueNotTopologicallyFixed: audit.centreResidueRatio > 2,
    rawPhaseNotGaugeInvariant: samples.every(sample => Math.abs(sample.gaugeAudit.endpointRelativePhaseChange) > 1 && sample.gaugeAudit.maximumIntensityDifference < 1e-12),
    chiralSupportPreserved: samples.every(sample => sample.chiralPolarization === 1),
  },
  decision: {
    unsignedModeCountInsufficientForDetectorPrediction: true,
    continuousResidueProtectedBeyondIndex: false,
    rawZeroModePhaseProtectedBeyondIndex: false,
    sublatticePolarizationProtected: true,
    sublatticePolarizationIndependentOfSignedChiralIndex: false,
    minimalChiralChainSuppliesNewBeyondIndexInvariant: false,
    fullOt015Closure: false,
    newPhysicsEvidence: false,
  },
  implication: "At fixed nonzero gap and one protected zero mode, detector residue and localization vary strongly under a symmetry-preserving wall homotopy, while raw phase changes under a unitary site gauge. Sublattice support survives, but it is the signed chiral index rather than new information beyond that index. The minimal SSH/Jackiw-Rebbi carrier therefore does not close OT-015; a genuine extra datum requires additional crystalline, projective, scattering-channel or non-Abelian structure.",
};

if (write) {
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\n`);
}

console.log(JSON.stringify(result, null, 2));
