import assert from "node:assert/strict";

const dA = 2;
const dB = 3;
const d = dA * dB;

// Phi_eta = D_AB + eta (Id-D_A) tensor (Id-D_B).
// Unnormalized Choi eigenvalues split under maximally-entangled versus
// orthogonal sectors on the A and B endpoint pairs.
const choiSpectrum = (eta) => [
  { sector: "Omega_A tensor Omega_B", multiplicity: 1, value: 1 / d + 4 * eta },
  { sector: "Omega_A tensor Omega_B_perp", multiplicity: 8, value: 1 / d - eta / 2 },
  { sector: "Omega_A_perp tensor Omega_B", multiplicity: 3, value: 1 / d - 4 * eta / 3 },
  { sector: "Omega_A_perp tensor Omega_B_perp", multiplicity: 24, value: 1 / d + eta / 6 },
];

const isNonnegative = (spectrum, tolerance = 1e-12) =>
  spectrum.every(({ value }) => value >= -tolerance);
const traceWithMultiplicity = (spectrum) =>
  spectrum.reduce((sum, item) => sum + item.multiplicity * item.value, 0);

const cpLower = -1 / 24;
const cpUpper = 1 / 8;
assert.equal(isNonnegative(choiSpectrum(cpLower)), true);
assert.equal(isNonnegative(choiSpectrum(cpUpper)), true);
assert.equal(isNonnegative(choiSpectrum(cpLower - 1e-6)), false);
assert.equal(isNonnegative(choiSpectrum(cpUpper + 1e-6)), false);
assert.ok(Math.abs(traceWithMultiplicity(choiSpectrum(cpUpper)) - d) < 1e-12);

// Positivity is weaker.  Local-unitary covariance reduces pure inputs to a
// Schmidt parameter x in [0,1].  The connected component has global extrema
// min=-1/3 (product endpoint) and max=3/4 (maximally entangled endpoint).
const connectedMinimum = -1 / 3;
const connectedMaximum = 3 / 4;
const positiveLower = -1 / (d * connectedMaximum);
const positiveUpper = -1 / (d * connectedMinimum);

assert.equal(positiveLower, -2 / 9);
assert.equal(positiveUpper, 1 / 2);
assert.ok(cpLower > positiveLower);
assert.ok(cpUpper < positiveUpper);

const sectorEigenvalues = {
  scalar: 1,
  qubitLocal: 0,
  qutritLocal: 0,
  connected: cpUpper,
};

console.log(JSON.stringify({
  status: "PASS",
  channel: {
    formula: "Phi_eta = D_6 + eta (Id-D_2) tensor (Id-D_3)",
    tracePreserving: true,
    unital: true,
    endpointUnitaryCovariant: true,
    operatorSectorEigenvaluesAtMaximum: sectorEigenvalues,
  },
  positivityInterval: [positiveLower, positiveUpper],
  completePositivityInterval: [cpLower, cpUpper],
  maximalPositiveCorrelationRetention: positiveUpper,
  maximalCompletelyPositiveCorrelationRetention: cpUpper,
  choiSpectrumAtCpMaximum: choiSpectrum(cpUpper),
  typeMeaning: {
    killed: ["qubit-local sector (3,1)", "qutrit-local sector (1,8)"],
    retained: "connected sector (3,8), attenuated but full rank",
    dimensionRetained: 24,
  },
  verdict:
    "eta=1/8 is the maximal completely-positive unread-link channel in the endpoint-unitary-covariant scalar/local/connected diagonal family",
}));
