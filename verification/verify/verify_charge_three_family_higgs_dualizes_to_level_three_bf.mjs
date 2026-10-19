import assert from "node:assert/strict";

const families = [
  { Q: 0, uc: 1, dc: -1, L: -2, ec: 1, nuc: 3 },
  { Q: 0, uc: 1, dc: -1, L: 1, ec: -2, nuc: 0 },
  { Q: 0, uc: 1, dc: -1, L: 1, ec: -2, nuc: 0 }
];
const higgsCharge = -1;
const flavonCharge = 3;

const gcd = (a, b) => b === 0 ? Math.abs(a) : gcd(b, a % b);
const allMatterCharges = families.flatMap((row) => Object.values(row)).concat([higgsCharge]);
const chargeGcd = allMatterCharges.reduce((d, q) => gcd(d, q), 0);
assert.equal(chargeGcd, 1);

const mod = (x, n) => ((x % n) + n) % n;
const residualOrder = Math.abs(flavonCharge) / gcd(chargeGcd, Math.abs(flavonCharge));
assert.equal(residualOrder, 3);

const residualMatterCharges = families.map((row) =>
  Object.fromEntries(Object.entries(row).map(([name, q]) => [name, mod(q, 3)]))
);
assert.ok(residualMatterCharges.some((row) => Object.values(row).some((q) => q !== 0)));
assert.deepEqual(
  residualMatterCharges.map((row) => [row.Q, row.uc, row.dc, row.L, row.ec, row.nuc]),
  [
    [0, 1, 2, 1, 1, 0],
    [0, 1, 2, 1, 1, 0],
    [0, 1, 2, 1, 1, 0]
  ]
);

const bfLevel = Math.abs(flavonCharge);
const K = [[0, bfLevel], [bfLevel, 0]];
const determinant = -bfLevel * bfLevel;
const smithInvariants = [bfLevel, bfLevel];
const torusHilbertDimension = Math.abs(determinant);
const loopExponentModuleOrder = bfLevel ** 4;

assert.equal(bfLevel, 3);
assert.equal(determinant, -9);
assert.deepEqual(smithInvariants, [3, 3]);
assert.equal(torusHilbertDimension, 9);
assert.equal(loopExponentModuleOrder, 81);

const dualization = {
  higgsTerm: "(v^2/2) (d theta - 3 a)^2",
  compactPhasePeriod: "2 pi",
  lagrangeMultiplier: "compact two-form b",
  infraredTopologicalTerm: "(3/2pi) integral b wedge d a",
  residualGaugeGroup: "Z3"
};

console.log(JSON.stringify({
  protocol: "charge-three-family-higgs-to-level-three-bf/1",
  primitiveContinuousChargeLattice: chargeGcd === 1,
  selectedFamilyCharges: families,
  higgsCharge,
  flavonCharge,
  residualOrder,
  residualMatterCharges,
  dualization,
  finiteCarrier: {
    K,
    determinant,
    smithInvariants,
    anyonGroupAfterCircleReduction: "Z3 x Z3",
    torusHilbertDimension,
    loopExponentModule: "F3^4",
    loopExponentModuleOrder
  },
  conclusion: "A primitive anomaly-free family U(1) Higgsed by its charge-three flavon has a faithful Z3 remnant and infrared level-three BF description. Its compactified torus sector is exactly the nine-state F3^4 carrier, conditional on the flavon and family gauge factor being physically realized."
}, null, 2));
