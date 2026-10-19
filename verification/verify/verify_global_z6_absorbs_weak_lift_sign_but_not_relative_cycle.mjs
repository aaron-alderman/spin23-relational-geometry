import assert from "node:assert/strict";

const C = (re, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (a) => C(a.re, -a.im);
const eq = (a, b, eps = 1e-12) => Math.abs(a.re - b.re) < eps && Math.abs(a.im - b.im) < eps;
const phase = (theta) => C(Math.cos(theta), Math.sin(theta));
const mmul = (a, b) => a.map((row) => b[0].map((_, j) => row.reduce((s, x, k) => add(s, mul(x, b[k][j])), C(0))));
const scale = (z, a) => a.map((row) => row.map((x) => mul(z, x)));
const dagger = (a) => a[0].map((_, j) => a.map((row) => conj(row[j])));
const eye = (n) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => C(i === j ? 1 : 0)));
const meq = (a, b) => a.every((row, i) => row.every((x, j) => eq(x, b[i][j])));

const P2 = [[C(0), C(1)], [C(1), C(0)]];
const weakPlus = scale(C(0, 1), P2);
const weakMinus = scale(C(0, -1), P2);

// Faithful-kernel generator z=(omega3,-I2,exp(i*pi/3)). Its cube is
// z^3=(1,-I2,-1).
const zCubed = {
  color: "I3",
  weak: scale(C(-1), eye(2)),
  hypercharge: phase(Math.PI),
};
assert(eq(zCubed.hypercharge, C(-1)));

// Combine the two inverse weak lifts with inverse U(1) quarter turns.
const gPlus = { weak: weakPlus, phi: Math.PI / 2 };
const gMinus = { weak: weakMinus, phi: -Math.PI / 2 };

const squareGaugeElement = (g) => ({
  weak: mmul(g.weak, g.weak),
  hypercharge: phase(2 * g.phi),
});
for (const g of [gPlus, gMinus]) {
  const square = squareGaugeElement(g);
  assert(meq(square.weak, zCubed.weak));
  assert(eq(square.hypercharge, zCubed.hypercharge));
}

// gMinus * gPlus^{-1}=z^3, so the two representatives are identical in the
// quotient and their common quotient class has order two.
const ratioWeak = mmul(gMinus.weak, dagger(gPlus.weak));
const ratioHypercharge = phase(gMinus.phi - gPlus.phi);
assert(meq(ratioWeak, zCubed.weak));
assert(eq(ratioHypercharge, zCubed.hypercharge));

const species = [
  { name: "Q", weakDoublet: true, y6: 1 },
  { name: "uc", weakDoublet: false, y6: -4 },
  { name: "dc", weakDoublet: false, y6: 2 },
  { name: "L", weakDoublet: true, y6: -3 },
  { name: "ec", weakDoublet: false, y6: 6 },
  { name: "nuc", weakDoublet: false, y6: 0 },
];

const action = (g, state) => {
  const yPhase = phase(state.y6 * g.phi);
  return state.weakDoublet
    ? { type: "swap", scalar: mul(g.weak[0][1], yPhase) }
    : { type: "scalar", scalar: yPhase };
};

const actionsPlus = Object.fromEntries(species.map((s) => [s.name, action(gPlus, s)]));
const actionsMinus = Object.fromEntries(species.map((s) => [s.name, action(gMinus, s)]));
for (const s of species) {
  assert.equal(actionsPlus[s.name].type, actionsMinus[s.name].type);
  assert(eq(actionsPlus[s.name].scalar, actionsMinus[s.name].scalar));
}

const expectedScalars = { Q: -1, uc: 1, dc: -1, L: -1, ec: -1, nuc: 1 };
for (const [name, sign] of Object.entries(expectedScalars)) assert(eq(actionsPlus[name].scalar, C(sign)));

const cycleC = ["Q", "uc", "ec", "L"];
const cycleD = ["Q", "dc", "nuc", "L"];
const cycleScalar = (cycle) => cycle.reduce((z, name) => mul(z, actionsPlus[name].scalar), C(1));
assert(eq(cycleScalar(cycleC), C(-1)));
assert(eq(cycleScalar(cycleD), C(-1)));
assert(eq(mul(cycleScalar(cycleC), conj(cycleScalar(cycleD))), C(1)));

console.log(JSON.stringify({
  protocol: "global-z6-absorbs-weak-lift-sign/1",
  faithfulKernel: {
    generator: "(omega3,-I2,exp(i*pi/3))",
    cube: "(I3,-I2,-1)",
  },
  quotientWeylLift: {
    representatives: ["(+i P2, exp(+i*pi/2))", "(-i P2, exp(-i*pi/2))"],
    representativeRatio: "z^3",
    representativeSquare: "z^3",
    quotientOrder: 2,
    signAmbiguitySurvivesInFaithfulMatterAction: false,
  },
  oneGenerationAction: Object.fromEntries(Object.entries(expectedScalars).map(([name, scalar]) => [name, scalar === -1 ? "-1" : "+1"])),
  completedMatterCycles: {
    C: { edges: cycleC, scalar: "-1" },
    D: { edges: cycleD, scalar: "-1" },
    relativeScalar: "+1",
  },
  consequence: "The global Z6 quotient turns the apparent weak C4 lift into one order-two faithful quotient element, but its action is identical on the two completed cycles and supplies no map to the invisible Gaussian kernel class.",
  passed: true,
}, null, 2));
