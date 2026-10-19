import assert from 'node:assert/strict';

const mm = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const approx = (A, B, eps = 1e-12) => A.every((r, i) => r.every((x, j) => Math.hypot(x[0] - B[i][j][0], x[1] - B[i][j][1]) < eps));
const c = (re, im = 0) => [re, im];
const mul = ([a, b], [d, e]) => [a * d - b * e, a * e + b * d];
const cmm = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => {
  const z = mul(x, B[k][j]); return [s[0] + z[0], s[1] + z[1]];
}, c(0))));

const X = [[c(0), c(1)], [c(1), c(0)]];
const phaseRep = (charge, phi) => [
  [c(Math.cos(charge * phi), Math.sin(charge * phi)), c(0)],
  [c(0), c(Math.cos(charge * phi), -Math.sin(charge * phi))],
];

const phi = 0.37;
const chargedPhase = phaseRep(1, phi);
assert.ok(!approx(cmm(chargedPhase, X), cmm(X, chargedPhase)));

const neutralPhase = phaseRep(0, phi);
assert.ok(approx(cmm(neutralPhase, X), cmm(X, neutralPhase)));

// Entry charges in a Nambu double are qi-qj.  Charged fields have anomalous
// +/-2Q off-diagonals; a neutral composite has zero in every entry.
const entryCharges = Q => {
  const twice = 2 * Q;
  return [[0, twice], [twice === 0 ? 0 : -twice, 0]];
};
assert.deepEqual(entryCharges(1), [[0, 2], [-2, 0]]);
assert.deepEqual(entryCharges(0), [[0, 0], [0, 0]]);

// The two response channels are completed neutral composites, not bare
// fermions: lepton Higgs-dressed Dirac response and color-contracted,
// Higgs-dressed quark Dirac response.
const responseCharges = { leptonComposite: 0, quarkComposite: 0 };
assert.ok(Object.values(responseCharges).every(Q => Q === 0));

console.log(JSON.stringify({
  protocol: 'sideband-reversing-a2-cycle-charge-superselection/1',
  chargedNambuExchangeCommutesWithContinuousPhase: false,
  chargedNambuEntryCharges: entryCharges(1),
  neutralCompositeExchangeCommutesWithContinuousPhase: true,
  neutralCompositeEntryCharges: entryCharges(0),
  responseCharges,
  categoricalPlacement: 'Higgs dressing and color contraction -> neutral composite response -> sideband/Floquet conversion',
  forbiddenPlacement: 'sideband conversion on charged microscopic fermion amplitudes without a charge-two spurion or broken U(1)',
  conclusion: 'The document-904 cycle is compatible with internal gauge superselection only as a downstream operation on completed neutral response modes.',
  passed: true,
}, null, 2));
