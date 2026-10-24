#!/usr/bin/env node

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const outputPath = resolve(root, "evidence/data/nonlinear-stochastic-frame-detailed-balance-v1.json");
const write = process.argv.includes("--write");

const parameters = { T: 0.8, a: 1.3, b: 0.9, epsilon: 0.28 };
const y1Values = [-1.2, -0.4, 0.3, 1.1];
const y2Values = [-0.9, -0.2, 0.5, 1.0];

const eigenvalues2 = ([[a, b], [, d]]) => {
  const disc = Math.sqrt((a - d) ** 2 + 4 * b ** 2);
  return [(a + d - disc) / 2, (a + d + disc) / 2];
};

const samples = [];
for (const y1 of y1Values) {
  for (const y2 of y2Values) {
    const { T, a, b, epsilon } = parameters;
    const x1 = y1 - epsilon * y2 ** 2;
    const x2 = y2;
    const potential = 0.5 * (a * x1 ** 2 + b * x2 ** 2);
    const jacobian = [[1, 2 * epsilon * y2], [0, 1]];
    const diffusion = [
      [T * (1 + 4 * epsilon ** 2 * y2 ** 2), T * 2 * epsilon * y2],
      [T * 2 * epsilon * y2, T],
    ];
    const diffusionDivergence = [2 * epsilon * T, 0];
    const gradientPotential = [a * x1, -2 * epsilon * y2 * a * x1 + b * y2];
    const pushedDrift = [-a * x1 - 2 * epsilon * b * y2 ** 2, -b * y2];
    const itoDrift = [pushedDrift[0] + 2 * epsilon * T, pushedDrift[1]];
    const equilibriumDrift = [
      diffusionDivergence[0] - (diffusion[0][0] * gradientPotential[0] + diffusion[0][1] * gradientPotential[1]) / T,
      diffusionDivergence[1] - (diffusion[1][0] * gradientPotential[0] + diffusion[1][1] * gradientPotential[1]) / T,
    ];
    const correctCurrentOverDensity = itoDrift.map((v, i) => v - equilibriumDrift[i]);
    const naiveCurrentOverDensity = pushedDrift.map((v, i) => v - equilibriumDrift[i]);
    const eigenvalues = eigenvalues2(diffusion);
    samples.push({
      y: [y1, y2],
      x: [x1, x2],
      potential,
      jacobian,
      jacobianDeterminant: 1,
      diffusion,
      diffusionEigenvalues: eigenvalues,
      diffusionDivergence,
      gradientPotential,
      pushedDriftWithoutItoCorrection: pushedDrift,
      itoCorrectedDrift: itoDrift,
      detailedBalanceDrift: equilibriumDrift,
      correctCurrentOverDensity,
      naiveCurrentOverDensity,
    });
  }
}

const norm = vector => Math.hypot(...vector);
const audit = {
  samplesChecked: samples.length,
  maximumCorrectDetailedBalanceResidual: Math.max(...samples.map(s => norm(s.correctCurrentOverDensity))),
  minimumNaiveDetailedBalanceResidual: Math.min(...samples.map(s => norm(s.naiveCurrentOverDensity))),
  expectedMissingItoDriftMagnitude: 2 * parameters.epsilon * parameters.T,
  minimumDiffusionEigenvalue: Math.min(...samples.flatMap(s => s.diffusionEigenvalues)),
  maximumJacobianDeterminantError: Math.max(...samples.map(s => Math.abs(s.jacobianDeterminant - 1))),
};

const result = {
  protocol: "nonlinear-stochastic-frame-detailed-balance/1",
  date: "2026-10-25",
  target: "OT-016",
  parent: "AZ-101",
  primaryLiterature: [
    { title: "Effective field theory for dissipative fluids (II)", url: "https://arxiv.org/abs/1701.07817", role: "nonlinear dynamical KMS and hydrodynamic frame choices" },
    { title: "Schwinger-Keldysh effective field theory for stable and causal relativistic hydrodynamics", url: "https://arxiv.org/abs/2309.00511", role: "fully nonlinear KMS-realizing stable and causal stochastic hydrodynamics" },
    { title: "Covariant Formulation of Non-linear Langevin Theory with Multiplicative Gaussian White Noises", url: "https://arxiv.org/abs/2007.16131", role: "nonlinear coordinate covariance and noise-induced drift in Ito dynamics" },
  ],
  model: {
    originalDynamics: "dx=-grad(U)dt+sqrt(2T)dW",
    originalPotential: "U=(a*x1^2+b*x2^2)/2",
    nonlinearFrame: "y1=x1+epsilon*x2^2; y2=x2",
    transformedDiffusion: "D_y=T*J*J^T",
    detailedBalanceCondition: "b_i=partial_j D_ij-(D_ij/T)partial_j U",
    inducedItoDrift: "T times the contracted Hessian of the nonlinear frame map",
  },
  parameters,
  samples,
  audit: {
    ...audit,
    transformedDiffusionPositive: audit.minimumDiffusionEigenvalue > 0,
    correctedDetailedBalancePassed: audit.maximumCorrectDetailedBalanceResidual < 1e-12,
    naivePushforwardFailsDetailedBalance: audit.minimumNaiveDetailedBalanceResidual > 1e-3,
  },
  decision: {
    nonlinearCoordinateEquilibriumCovarianceEstablished: true,
    noiseInducedDriftNecessary: true,
    finiteDimensionalDynamicalKmsAnalogClosed: true,
    hydrodynamicStressWardIdentityEstablished: false,
    derivativeOrderedFieldTheoryCompletionEstablished: false,
    entropyCurrentEstablished: false,
    causalStableValidityWindowEstablished: false,
    microscopicMatchingEstablished: false,
    fullOt016Closure: false,
    newPhysicsEvidence: false,
  },
  implication: "Even a unit-Jacobian nonlinear frame turns additive noise into multiplicative noise. The induced Ito drift is required for zero equilibrium probability current; pushing only the deterministic drift creates a false nonequilibrium residue. A nonlinear hydrodynamic frame audit must therefore transform the noise/action measure and prescription together, not only the retarded equations.",
};

if (write) {
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\n`);
}

console.log(JSON.stringify(result, null, 2));
