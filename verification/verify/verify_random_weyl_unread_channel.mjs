import assert from "node:assert/strict";

const tolerance = 1e-12;
const mod = (value, modulus) => ((value % modulus) + modulus) % modulus;
const points = (prime) =>
  Array.from({ length: prime }, (_, x) =>
    Array.from({ length: prime }, (_, z) => [x, z]),
  ).flat();
const isZero = (point) => point.every((coordinate) => coordinate === 0);
const symplectic = ([x, z], [y, w], prime) => mod(z * y - w * x, prime);
const phase = (turns) => ({
  re: Math.cos(2 * Math.PI * turns),
  im: Math.sin(2 * Math.PI * turns),
});

const qubitLabels = points(2);
const qutritLabels = points(3);
const probability = (g, h, eta) =>
  (1 +
    eta *
      (4 * Number(isZero(g)) - 1) *
      (9 * Number(isZero(h)) - 1)) /
  36;

const channelEigenvalue = (u, a, eta) => {
  let re = 0;
  let im = 0;
  for (const g of qubitLabels) {
    for (const h of qutritLabels) {
      const weight = probability(g, h, eta);
      const character = phase(
        symplectic(g, u, 2) / 2 + symplectic(h, a, 3) / 3,
      );
      re += weight * character.re;
      im += weight * character.im;
    }
  }
  return { re, im };
};

const eta = 1 / 8;
const entries = qubitLabels.flatMap((g) =>
  qutritLabels.map((h) => ({ g, h, probability: probability(g, h, eta) })),
);
assert.equal(entries.length, 36);
assert.ok(entries.every((entry) => entry.probability >= -tolerance));
assert.ok(
  Math.abs(entries.reduce((sum, entry) => sum + entry.probability, 0) - 1) <
    tolerance,
);

const classes = {
  identityIdentity: entries.filter(({ g, h }) => isZero(g) && isZero(h)),
  identityNonidentity: entries.filter(({ g, h }) => isZero(g) && !isZero(h)),
  nonidentityIdentity: entries.filter(({ g, h }) => !isZero(g) && isZero(h)),
  nonidentityNonidentity: entries.filter(({ g, h }) => !isZero(g) && !isZero(h)),
};
assert.deepEqual(
  Object.values(classes).map((items) => items.length),
  [1, 8, 3, 24],
);
assert.ok(Math.abs(classes.identityIdentity[0].probability - 1 / 9) < tolerance);
assert.ok(
  classes.identityNonidentity.every(
    (entry) => Math.abs(entry.probability - 5 / 288) < tolerance,
  ),
);
assert.ok(
  classes.nonidentityIdentity.every(
    (entry) => Math.abs(entry.probability) < tolerance,
  ),
);
assert.ok(
  classes.nonidentityNonidentity.every(
    (entry) => Math.abs(entry.probability - 1 / 32) < tolerance,
  ),
);

const sectorEigenvalues = {};
for (const [name, u, a, expected] of [
  ["scalar", [0, 0], [0, 0], 1],
  ["qubitLocal", [1, 0], [0, 0], 0],
  ["qutritLocal", [0, 0], [1, 0], 0],
  ["connected", [1, 0], [1, 0], eta],
]) {
  const eigenvalue = channelEigenvalue(u, a, eta);
  assert.ok(Math.abs(eigenvalue.re - expected) < tolerance);
  assert.ok(Math.abs(eigenvalue.im) < tolerance);
  sectorEigenvalues[name] = eigenvalue.re;
}

// The random-unitary probabilities are nonnegative exactly on the Choi range.
const classNumerators = (value) => [
  1 + 24 * value,
  1 - 3 * value,
  1 - 8 * value,
  1 + value,
];
const allNonnegative = (value) =>
  classNumerators(value).every((number) => number >= -tolerance);
assert.equal(allNonnegative(-1 / 24), true);
assert.equal(allNonnegative(1 / 8), true);
assert.equal(allNonnegative(-1 / 24 - 1e-6), false);
assert.equal(allNonnegative(1 / 8 + 1e-6), false);

console.log(JSON.stringify({
  status: "PASS",
  distributionAtMaximum: {
    eta,
    identityIdentity: { entries: 1, perEntry: 1 / 9, total: 1 / 9 },
    identityNonidentity: { entries: 8, perEntry: 5 / 288, total: 5 / 36 },
    nonidentityIdentity: { entries: 3, perEntry: 0, total: 0 },
    nonidentityNonidentity: { entries: 24, perEntry: 1 / 32, total: 3 / 4 },
  },
  sectorEigenvalues,
  completePositivityIntervalFromProbabilitySimplex: [-1 / 24, 1 / 8],
  implementation: "correlated local random Weyl conjugations",
  verdict:
    "the maximal unread-correlation channel is an explicit random-unitary circuit with the exact Choi admissibility interval",
}));
