import assert from "node:assert/strict";

const sectors = ["Q", "u^c", "d^c", "L", "e^c", "nu^c", "H"];
const lambda = [5, 5, 1, 1, 1, 0, 0];
const hypercharge6 = [1, -4, 2, -3, 6, 0, 3];
const charge3BL = [1, -1, -1, -3, 3, 3, 0];

// Yukawa charge sums in the convention:
// Q H u^c, Q H^dagger d^c, L H^dagger e^c, L H nu^c.
const violations = (x) => [
  x[0] + x[6] + x[1],
  x[0] - x[6] + x[2],
  x[3] - x[6] + x[4],
  x[3] + x[6] + x[5],
];
assert.deepEqual(violations(hypercharge6), [0, 0, 0, 0]);
assert.deepEqual(violations(charge3BL), [0, 0, 0, 0]);
assert.deepEqual(violations(lambda), [10, 6, 2, 1]);

const combine = (a, b, c, hExtra = 0) => lambda.map((x, i) => x + a * hypercharge6[i] + b * charge3BL[i] + (i === 6 ? c + hExtra : 0));
for (const [a, b] of [[0, 0], [2, -7], [-3, 4]]) {
  assert.deepEqual(violations(combine(a, b, 0)), [10, 6, 2, 1]);
}

// A further Higgs-only charge c would require simultaneously
// c=-10, c=6, c=2, c=-1.
const requiredHiggsCharges = [-10, 6, 2, -1];
assert(new Set(requiredHiggsCharges).size > 1);

// Linear system rank: the four equations for one c are inconsistent.
const residualAtBestLeastSquaresC = -0.75;
const bestResidual = violations(combine(0, 0, residualAtBestLeastSquaresC));
assert(bestResidual.some((x) => Math.abs(x) > 1e-12));

console.log(JSON.stringify({
  protocol: "incidence-current-conservation-obstruction/1",
  sectors,
  incidenceCharges: lambda,
  yukawaOperators: ["Q H u^c", "Q H^dagger d^c", "L H^dagger e^c", "L H nu^c"],
  incidenceViolationVector: violations(lambda),
  conservedDirections: {
    hypercharge6,
    charge3BL,
    bothHaveZeroViolation: true,
    addingEitherCannotChangeIncidenceViolation: true,
  },
  higgsOnlyRepair: {
    individuallyRequiredCharges: requiredHiggsCharges,
    simultaneousSolutionExists: false,
    leastSquaresHiggsCharge: residualAtBestLeastSquaresC,
    remainingViolation: bestResidual,
  },
  conclusion: "The incidence-weighted vector insertion cannot be made conserved by adding hypercharge, B-L, or one Higgs phase current. Its divergence contains four Yukawa operators with nonzero coefficients. It is an unprotected composite source, not a second conserved current.",
  passed: true,
}, null, 2));
