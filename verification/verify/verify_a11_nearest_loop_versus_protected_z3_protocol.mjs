#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.resolve(here, "../../evidence/data/a11-nearest-loop-versus-protected-z3-protocol.json");
const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
const tolerance = 1e-12;

const c = (re, im = 0) => ({ re, im });
const mul = (a, b) => c(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const add = (a, b) => c(a.re + b.re, a.im + b.im);
const expi = (x) => c(Math.cos(x), Math.sin(x));
const abs = (z) => Math.hypot(z.re, z.im);

const nearSettings = data.nearProtocol.controlKnob.sectorSettings;
const roots = nearSettings.map((ng) => expi(2 * Math.PI * ng));
const rootSum = roots.reduce(add, c(0, 0));
const rootProduct = roots.reduce(mul, c(1, 0));
const rootCubes = roots.map((z) => mul(mul(z, z), z));
const intermediateU1 = expi(2 * Math.PI * 0.2);
const intermediateIsZ3Root = rootCubes.some((_, i) => abs(c(intermediateU1.re - roots[i].re, intermediateU1.im - roots[i].im)) < tolerance);

// Verify that local edge-phase redistribution leaves only the total loop product.
const phaseTriples = [
  [0.2, 0.7, 2 * Math.PI / 3 - 0.9],
  [-0.4, 1.1, 2 * Math.PI / 3 - 0.7],
  [2 * Math.PI / 3, 0, 0],
];
const loopProducts = phaseTriples.map((phases) => phases.map(expi).reduce(mul, c(1, 0)));
const redistributionError = Math.max(...loopProducts.map((z) => abs(c(z.re - roots[1].re, z.im - roots[1].im))));

// Verify the conditional Z3 clock-branch permutation and fixed-branch 6pi period.
const branchEnergy = (m, phi, Ep = 1) => -Ep * Math.cos((phi + 2 * Math.PI * m) / 3);
const samplePhases = [-1.7, -0.2, 0, 0.8, 2.6];
let branchPermutationError = 0;
let fixedBranchPeriodError = 0;
for (const phi of samplePhases) for (let m = 0; m < 3; m += 1) {
  branchPermutationError = Math.max(
    branchPermutationError,
    Math.abs(branchEnergy(m, phi + 2 * Math.PI) - branchEnergy((m + 1) % 3, phi)),
  );
  fixedBranchPeriodError = Math.max(
    fixedBranchPeriodError,
    Math.abs(branchEnergy(m, phi + 6 * Math.PI) - branchEnergy(m, phi)),
  );
}

const commonFieldsComplete = [
  "rawObservable",
  "admittanceEquation",
  "positiveResponseEquation",
  "fixedProbeLabels",
  "requiredChecks",
].every((key) => Object.hasOwn(data.commonMeasurement, key));
const nearFieldsComplete = [
  "controlKnob",
  "threePreparations",
  "nuisanceControls",
  "billOfMaterials",
  "missingQuantitativeInputs",
].every((key) => Object.hasOwn(data.nearProtocol, key));
const protectedFieldsComplete = [
  "lowEnergyModel",
  "controlKnobs",
  "threePreparations",
  "observables",
  "nuisanceControls",
  "billOfMaterials",
  "missingQuantitativeInputs",
  "admissionConditions",
].every((key) => Object.hasOwn(data.protectedProtocol, key));
const noInventedEffectSize = data.nearProtocol.missingQuantitativeInputs.length >= 5
  && data.protectedProtocol.missingQuantitativeInputs.length >= 8;
const topologyClaimsSeparated = data.nearProtocol.topologyClass === 1
  && data.topolectricalAlternative.topologyClass === 1
  && data.protectedProtocol.topologyClass === 2;

const report = {
  protocol: data.protocol,
  continuousLoop: {
    rootSumMagnitude: abs(rootSum),
    rootProductError: abs(c(rootProduct.re - 1, rootProduct.im)),
    rootCubeErrors: rootCubes.map((z) => abs(c(z.re - 1, z.im))),
    intermediatePhaseIsOneOfThreeRoots: intermediateIsZ3Root,
    redistributionErrorAtFixedLoopPhase: redistributionError,
    conclusion: "The three settings are exact cube roots and the closed-loop product is gauge-distribution invariant, but intermediate U(1) phases remain available.",
  },
  protectedClockModel: {
    branchPermutationError,
    fixedBranchSixPiPeriodError: fixedBranchPeriodError,
    conclusion: "The declared conditional Z3 branch model permutes sectors after 2pi and returns a fixed sector after 6pi; no physical amplitude is inferred without E_P and the missing device inputs.",
  },
  checks: {
    commonFieldsComplete,
    nearFieldsComplete,
    protectedFieldsComplete,
    noInventedEffectSize,
    topologyClaimsSeparated,
    threeNearSettings: nearSettings.length === 3,
    cubeRootsClose: abs(rootSum) < tolerance && abs(c(rootProduct.re - 1, rootProduct.im)) < tolerance && rootCubes.every((z) => abs(c(z.re - 1, z.im)) < tolerance),
    continuousU1NotCollapsedToZ3: !intermediateIsZ3Root,
    loopRedistributionInvariant: redistributionError < tolerance,
    protectedBranchPermutation: branchPermutationError < tolerance,
    protectedFixedBranchSixPiPeriod: fixedBranchPeriodError < tolerance,
    explicitStopLine: data.continuousEmulationStopLine.length >= 5,
  },
};
report.passed = Object.values(report.checks).every(Boolean);
process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
if (!report.passed) process.exitCode = 1;
