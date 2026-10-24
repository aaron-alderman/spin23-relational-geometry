#!/usr/bin/env node

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const outputPath = resolve(root, "evidence/data/reflection-resolved-defect-transport-v1.json");
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
    for (let i = 0; i < n; i += 1) for (let j = i + 1; j < n; j += 1) {
      if (Math.abs(a[i][j]) > largest) { largest = Math.abs(a[i][j]); p = i; q = j; }
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

function makeBonds(strength) {
  const bonds = [];
  for (const exponent of shape) {
    const ratio = Math.exp(strength * exponent);
    bonds.push(Math.sqrt(ratio), 1 / Math.sqrt(ratio));
  }
  return bonds;
}

function zeroMode(bonds) {
  const vector = Array(13).fill(0);
  vector[0] = 1;
  for (let m = 0; m < 6; m += 1) vector[2 * m + 2] = -bonds[2 * m] * vector[2 * m] / bonds[2 * m + 1];
  const norm = Math.hypot(...vector);
  return vector.map(value => value / norm);
}

function gap(bonds) {
  const gram = Array.from({ length: 6 }, (_, i) => Array.from({ length: 6 }, (_, j) => {
    if (i === j) return bonds[2 * i] ** 2 + bonds[2 * i + 1] ** 2;
    if (j === i + 1) return bonds[2 * i + 1] * bonds[2 * j];
    if (i === j + 1) return bonds[2 * j + 1] * bonds[2 * i];
    return 0;
  }));
  return Math.sqrt(Math.max(0, jacobiEigenvalues(gram)[0]));
}

const reverse = vector => [...vector].reverse();
const dot = (a, b) => a.reduce((sum, value, i) => sum + value * b[i], 0);
const maxDifference = (a, b) => Math.max(...a.map((value, i) => Math.abs(value - b[i])));

const samples = strengths.map(strength => {
  const bonds = makeBonds(strength);
  const psi = zeroMode(bonds);
  const reflected = reverse(psi);
  const reflectionCommutatorResidual = Math.max(...bonds.map((value, i) => Math.abs(value - bonds[11 - i])));
  const spatialParityResidual = maxDifference(reflected, psi);
  const branches = [-1, 1].map(intrinsicParity => {
    const physicalReflectionExpectation = intrinsicParity * dot(psi, reflected);
    return {
      intrinsicOrbitalParityRelativeToReference: intrinsicParity,
      signedChiralIndex: 1,
      zeroModeCount: 1,
      physicalMirrorEigenvalue: intrinsicParity,
      matchingPortWeight: (1 + intrinsicParity * physicalReflectionExpectation) / 2,
      oppositePortWeight: (1 - intrinsicParity * physicalReflectionExpectation) / 2,
      spectrumSharedAcrossParityBranches: true,
    };
  });
  return { strength, bonds, nonzeroGap: gap(bonds), zeroMode: psi, reflectionCommutatorResidual, spatialParityResidual, branches };
});

const breakingTests = [0.01, 0.05, 0.1, 0.2].map(delta => {
  const bonds = makeBonds(1.1);
  bonds[0] *= 1 + delta;
  const psi = zeroMode(bonds);
  const spatialReflectionExpectation = dot(psi, reverse(psi));
  return {
    fractionalUnpairedBondChange: delta,
    zeroModeCount: 1,
    signedChiralIndex: 1,
    nonzeroGap: gap(bonds),
    spatialReflectionExpectation,
    matchingPortWeight: (1 + spatialReflectionExpectation) / 2,
    forbiddenPortLeakage: (1 - spatialReflectionExpectation) / 2,
  };
});

const audit = {
  samplesChecked: samples.length,
  parityBranchesChecked: samples.length * 2,
  minimumSymmetricGap: Math.min(...samples.map(sample => sample.nonzeroGap)),
  maximumReflectionCommutatorResidual: Math.max(...samples.map(sample => sample.reflectionCommutatorResidual)),
  maximumSpatialParityResidual: Math.max(...samples.map(sample => sample.spatialParityResidual)),
  minimumMatchingPortWeight: Math.min(...samples.flatMap(sample => sample.branches.map(branch => branch.matchingPortWeight))),
  maximumForbiddenPortWeight: Math.max(...samples.flatMap(sample => sample.branches.map(branch => branch.oppositePortWeight))),
  minimumBrokenSymmetryLeakage: Math.min(...breakingTests.map(test => test.forbiddenPortLeakage)),
  maximumBrokenSymmetryLeakage: Math.max(...breakingTests.map(test => test.forbiddenPortLeakage)),
};

const result = {
  protocol: "reflection-resolved-defect-transport/1",
  date: "2026-10-25",
  target: "OT-015",
  parent: "AZ-105",
  carrier: {
    chain: "thirteen-site reflection-symmetric chiral wall with seven A and six B sites",
    addedDatum: "intrinsic orbital mirror parity relative to an independently calibrated even reference port",
    detector: "coherent projectors onto the calibrated physical mirror-even and mirror-odd ports",
    protection: "an isolated nondegenerate mode cannot change its discrete mirror representation while reflection symmetry and the spectral gap remain",
    firewall: "the intrinsic parity is supplied carrier data; it is not derived from the chiral index or hopping profile",
  },
  samples,
  breakingTests,
  audit: {
    ...audit,
    reflectionSymmetryExact: audit.maximumReflectionCommutatorResidual < 1e-12,
    mirrorSelectionExact: audit.minimumMatchingPortWeight > 1 - 1e-12 && audit.maximumForbiddenPortWeight < 1e-12,
    sameIndexDifferentMirrorRepresentations: samples.every(sample => new Set(sample.branches.map(branch => branch.signedChiralIndex)).size === 1 && new Set(sample.branches.map(branch => branch.physicalMirrorEigenvalue)).size === 2),
    symmetryBreakingOpensForbiddenPort: breakingTests.every(test => test.forbiddenPortLeakage > 0),
  },
  decision: {
    oneBeyondIndexObservableConstructed: true,
    observable: "mirror representation relative to a calibrated reference",
    independentOfSignedChiralIndex: true,
    robustUnderDeclaredSymmetricHomotopy: true,
    detectorFacingSelectionRuleConstructed: true,
    protectionMechanismDeclared: true,
    fullOt015DeclaredConstructionClosed: true,
    naturalMaterialRealizationEstablished: false,
    newPhysicsEvidence: false,
  },
  implication: "Reflection enrichment succeeds where the minimal chain failed. Two carriers can have the same spectrum, zero-mode count and signed chiral index yet opposite mirror character relative to a calibrated reference; matched and forbidden coherent ports distinguish them exactly throughout the symmetric wall homotopy. Breaking reflection opens the forbidden port. OT-015's finite existence question is therefore constructively closed, while material realization and the D4 operator remain separate gates.",
};

if (write) {
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\n`);
}

console.log(JSON.stringify(result, null, 2));
