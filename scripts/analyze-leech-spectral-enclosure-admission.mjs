#!/usr/bin/env node
const norm = vector => Math.sqrt(vector.reduce((sum, x) => sum + x * x, 0));
const matvec = (diagonal, vector) => diagonal.map((x, i) => x * vector[i]);
const dot = (a, b) => a.reduce((sum, x, i) => sum + x * b[i], 0);
const residual = (diagonal, vector) => {
  const rho = dot(vector, matvec(diagonal, vector));
  const r = matvec(diagonal, vector).map((x, i) => x - rho * vector[i]);
  return {rayleigh: rho, residualNorm: norm(r)};
};

const excited = residual([0, 1, 10], [0, 0, 1]);
const epsilon = 0.1;
const templeVector = [Math.sqrt(1 - epsilon ** 2), epsilon, 0];
const temple = residual([0, 2, 5], templeVector);
const certifiedNextLower = 2;
const templeLower = temple.rayleigh
  - temple.residualNorm ** 2 / (certifiedNextLower - temple.rayleigh);

const sectorIntervals = {
  even: {lower: 1.0, upper: 1.01},
  odd: {lower: 1.30, upper: 1.32},
};
const gapInterval = {
  lower: sectorIntervals.odd.lower - sectorIntervals.even.upper,
  upper: sectorIntervals.odd.upper - sectorIntervals.even.lower,
};

console.log(JSON.stringify({
  schemaVersion: "leech-spectral-enclosure-admission-analysis-v1",
  residualCounterexample: {
    spectrum: [0, 1, 10],
    vector: [0, 0, 1],
    ...excited,
    isGroundState: false,
    lesson: "zero residual proves an eigenpair but does not identify the ground state",
  },
  templeControl: {
    spectrum: [0, 2, 5],
    epsilon,
    rayleigh: temple.rayleigh,
    residualNorm: temple.residualNorm,
    certifiedNextEigenvalueLowerBound: certifiedNextLower,
    lowerBound: templeLower,
    exactGround: 0,
  },
  sectorIntervalComposition: {sectorIntervals, gapInterval},
  admissionRules: [
    "a Ritz energy is an upper bound for the lowest eigenvalue only when the vector is in the declared sector",
    "a residual norm alone certifies proximity to some eigenvalue, not its ordinal index",
    "a Temple-Kato lower bound requires a certified lower bound above the target Rayleigh quotient for the next eigenvalue",
    "a certified parity-gap interval is [L_odd-U_even, U_odd-L_even]",
    "positive gap promotion requires L_odd-U_even>0 at every admitted cutoff and convergence control",
  ],
}, null, 2));
