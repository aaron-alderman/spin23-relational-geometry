import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const evidence = JSON.parse(readFileSync(
  'evidence/data/spin23-four-carrier-route-comparison.json',
  'utf8',
));

assert.equal(evidence.schema, 'spin23.four-carrier-route-comparison/1');

const ps = evidence.branchings.patiSalamFamily;
const e6 = evidence.branchings.e6Matter;
const s32 = evidence.branchings.spin10OrdinaryReal;
const broken43 = evidence.branchings.brokenPatiSalamTruncationOf27;
const e54 = evidence.branchings.e6OrdinaryReal;
assert.equal(ps.dimensions.reduce((a, b) => a + b, 0), 16);
assert.equal(e6.dimensions.reduce((a, b) => a + b, 0), 27);
assert.equal(s32.dimensions.reduce((a, b) => a + b, 0), 32);
assert.equal(broken43.dimensions.reduce((a, b) => a + b, 0), 43);
assert.equal(e54.dimensions.reduce((a, b) => a + b, 0), 54);
assert.match(broken43.boundary, /not a complete E6 representation/);

// The Spin(10) x U(1)_psi branching of one 27 passes the three elementary
// abelian subgroup traces.  T(16)=2 and T(10)=1 in the chosen normalization.
const [{ dimensions, charges }] = [e6];
const linearTrace = dimensions.reduce((sum, d, i) => sum + d * charges[i], 0);
const cubicTrace = dimensions.reduce((sum, d, i) => sum + d * charges[i] ** 3, 0);
const mixedSpin10SquaredU1 = 2 * charges[0] + 1 * charges[1];
assert.equal(linearTrace, 0);
assert.equal(cubicTrace, 0);
assert.equal(mixedSpin10SquaredU1, 0);
assert.equal(evidence.anomalyChecks.e6Chiral27.spin10xU1LinearChargeTrace, linearTrace);
assert.equal(evidence.anomalyChecks.e6Chiral27.spin10xU1CubicChargeTrace, cubicTrace);
assert.equal(evidence.anomalyChecks.e6Chiral27.spin10SquaredU1UsingT16eq2T10, mixedSpin10SquaredU1);

const routes = Object.fromEntries(evidence.routes.map((route) => [route.id, route]));
assert.deepEqual(Object.keys(routes), [
  'PS16-twisted',
  'E6-27-chiral',
  'Spin10-32-ordinary-real',
  'E6-54-ordinary-real',
]);
assert.equal(routes['PS16-twisted'].ordinaryJ, false);
assert.equal(routes['PS16-twisted'].twistedJ, true);
assert.equal(routes['E6-27-chiral'].ordinaryJ, false);
assert.equal(routes['Spin10-32-ordinary-real'].ordinaryJ, true);
assert.equal(routes['E6-54-ordinary-real'].ordinaryJ, true);
assert.deepEqual(
  evidence.routes.map((route) => route.complexDimension),
  [16, 27, 32, 54],
);
assert(evidence.routes.every((route) => /not closed/.test(route.scalarClosure)));

// Ordinary closure doubles a complex representation; the 27 therefore does
// not interpolate as an ordinary-real carrier between the 16 and its 32.
assert.equal(2 * routes['PS16-twisted'].complexDimension, routes['Spin10-32-ordinary-real'].complexDimension);
assert.equal(2 * routes['E6-27-chiral'].complexDimension, routes['E6-54-ordinary-real'].complexDimension);
assert.match(evidence.categoryTheorem.nonEquivalence, /not a third ordinary-real solution/);
assert.match(evidence.comparativeDecision.claim1559MateriallyFalse, /unscoped yes/);
assert.match(evidence.comparativeDecision.noWinnerYet, /None of the four routes closes/);

console.log('PASS 1562: 16/27 are chiral-or-twisted counts, 32/54 are ordinary-J closures; claim 1559 is exhaustive only at fixed Pati-Salam matter content, and all four routes retain decisive scalar/reality or exotic-decoupling gates.');
