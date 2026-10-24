import assert from "node:assert/strict";

const dimension = 24 * 36 ** 2;
const sectors = [
  { name: "neither", multiplicity: 79, eigenvalue: 1 },
  { name: "binary orbit", multiplicity: 48, eigenvalue: Math.sqrt(2) },
  { name: "ternary orbit", multiplicity: 42, eigenvalue: Math.sqrt(3) },
  { name: "both", multiplicity: 3, eigenvalue: Math.sqrt(6) },
];
const activeDimension = sectors.reduce(
  (sum, sector) => sum + sector.multiplicity,
  0,
);
const inactiveDimension = dimension - activeDimension;
assert.equal(activeDimension, 172);
assert.equal(inactiveDimension, 30932);

const maximumEigenvalue = Math.sqrt(6);
const effectSpectrum = [
  { eigenvalue: 0, multiplicity: inactiveDimension },
  ...sectors.map((sector) => ({
    eigenvalue: sector.eigenvalue / maximumEigenvalue,
    multiplicity: sector.multiplicity,
  })),
];
assert.ok(
  effectSpectrum.every(
    ({ eigenvalue }) => eigenvalue >= 0 && eigenvalue <= 1,
  ),
);

const traceEffect = effectSpectrum.reduce(
  (sum, item) => sum + item.multiplicity * item.eigenvalue,
  0,
);
const clickProbability = traceEffect / dimension;
const finiteInvariant = maximumEigenvalue * clickProbability;
const targetInvariant =
  (79 + 48 * Math.sqrt(2) + 42 * Math.sqrt(3) + 3 * Math.sqrt(6)) /
  dimension;
assert.ok(Math.abs(finiteInvariant - targetInvariant) < 1e-15);

const probabilityForFinalMultiplicity = (multiplicity) =>
  (79 / Math.sqrt(6) +
    48 / Math.sqrt(3) +
    42 / Math.sqrt(2) +
    multiplicity) /
  dimension;
const alternatives = {
  noCommutator: probabilityForFinalMultiplicity(0),
  binaryCharacter: probabilityForFinalMultiplicity(3),
  phaseCompleteBracketImage: probabilityForFinalMultiplicity(11),
};
assert.ok(
  Math.abs(alternatives.binaryCharacter - clickProbability) < 1e-15,
);

const nearestSeparation =
  alternatives.binaryCharacter - alternatives.noCommutator;
assert.ok(Math.abs(nearestSeparation - 1 / 10368) < 1e-15);
const idealFiveSigmaTrials = Math.ceil(
  (25 * clickProbability * (1 - clickProbability)) /
    nearestSeparation ** 2,
);

console.log(JSON.stringify({
  status: "PASS",
  recordSpace: {
    dimension,
    activeDimension,
    inactiveDimension,
  },
  povm: {
    effect: "E=K/sqrt(6)",
    spectrum: effectSpectrum,
    isPositiveContraction: true,
    uniformStateClickProbability: clickProbability,
    recoveredFiniteInvariant: finiteInvariant,
  },
  alternatives,
  idealStatistics: {
    nearestAlternative: "no additional commutator records",
    probabilitySeparation: nearestSeparation,
    approximateFiveSigmaUniformTrials: idealFiveSigmaTrials,
  },
  verdict:
    "the finite fingerprint is an exact monitorable POVM expectation, but no photon-pole identification follows",
}));
