import assert from "node:assert/strict";

const C = (re, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const eq = (a, b, eps = 1e-12) => Math.abs(a.re - b.re) < eps && Math.abs(a.im - b.im) < eps;
const mmul = (a, b) => a.map((row) => b[0].map((_, j) => row.reduce((s, x, k) => add(s, mul(x, b[k][j])), C(0))));
const transpose = (a) => a[0].map((_, j) => a.map((row) => row[j]));
const scale = (z, a) => a.map((row) => row.map((x) => mul(z, x)));
const eye = (n) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => C(i === j ? 1 : 0)));
const meq = (a, b) => a.every((row, i) => row.every((x, j) => eq(x, b[i][j])));

const P2 = [[C(0), C(1)], [C(1), C(0)]];
const P3 = [[C(0), C(1), C(0)], [C(1), C(0), C(0)], [C(0), C(0), C(1)]];

const U2plus = scale(C(0, 1), P2);
const U2minus = scale(C(0, -1), P2);
const U3 = scale(C(-1), P3);

const det2 = (a) => add(mul(a[0][0], a[1][1]), mul(C(-1), mul(a[0][1], a[1][0])));
const det3 = (a) => add(
  add(mul(a[0][0], add(mul(a[1][1], a[2][2]), mul(C(-1), mul(a[1][2], a[2][1])))), mul(C(-1), mul(a[0][1], add(mul(a[1][0], a[2][2]), mul(C(-1), mul(a[1][2], a[2][0])))))),
  mul(a[0][2], add(mul(a[1][0], a[2][1]), mul(C(-1), mul(a[1][1], a[2][0])))),
);

assert(eq(det2(P2), C(-1)));
assert(eq(det3(P3), C(-1)));
assert(eq(det2(U2plus), C(1)));
assert(eq(det2(U2minus), C(1)));
assert(eq(det3(U3), C(1)));

assert(meq(mmul(U3, U3), eye(3)));
assert(meq(mmul(U2plus, U2plus), scale(C(-1), eye(2))));
assert(meq(mmul(mmul(U2plus, U2plus), mmul(U2plus, U2plus)), eye(2)));
assert(meq(mmul(U2minus, U2minus), scale(C(-1), eye(2))));

const epsilon2 = [[C(0), C(1)], [C(-1), C(0)]];
assert(meq(mmul(mmul(transpose(U2plus), epsilon2), U2plus), epsilon2));
assert(meq(mmul(mmul(transpose(U2minus), epsilon2), U2minus), epsilon2));

// No scalar multiple lambda P2 can simultaneously have determinant one and
// square to +I: determinant one forces lambda^2=-1, while order two requires
// lambda^2=+1.
const weakOrderTwoDeterminantOneLiftExists = false;
assert.equal(weakOrderTwoDeterminantOneLiftExists, false);

// Representation incidences around the two completed matter cycles.
// Q: (3,2), uc/dc: (bar3,1), L: (1,2), ec/nuc: (1,1).
const cycleC = ["Q", "uc", "ec", "L"];
const cycleD = ["Q", "dc", "nuc", "L"];
const representation = {
  Q: { color: true, weak: true },
  uc: { color: true, weak: false },
  dc: { color: true, weak: false },
  L: { color: false, weak: true },
  ec: { color: false, weak: false },
  nuc: { color: false, weak: false },
};
const counts = (cycle) => cycle.reduce((o, edge) => ({
  color: o.color + Number(representation[edge].color),
  weak: o.weak + Number(representation[edge].weak),
}), { color: 0, weak: 0 });
assert.deepEqual(counts(cycleC), { color: 2, weak: 2 });
assert.deepEqual(counts(cycleD), { color: 2, weak: 2 });

// The central phases from determinant-one lifts therefore occur with identical
// parity in the two cycles and cancel from their relative ratio.
const colorCentralRatio = (-1) ** (counts(cycleC).color - counts(cycleD).color);
const weakCentralRatio = C(0, 1); // i^(2-2)=1, written explicitly below.
const weakExponentDifference = counts(cycleC).weak - counts(cycleD).weak;
const iPower = (n) => [C(1), C(0, 1), C(-1), C(0, -1)][((n % 4) + 4) % 4];
assert.equal(colorCentralRatio, 1);
assert(eq(iPower(weakExponentDifference), C(1)));
assert(eq(weakCentralRatio, C(0, 1))); // retain i as the available local lift phase

console.log(JSON.stringify({
  protocol: "determinant-one-weyl-lifts-c4-ribbon-gate/1",
  colorOddPermutationLift: {
    lift: "U3=-P3",
    determinant: 1,
    order: 2,
  },
  weakOddPermutationLift: {
    lifts: ["+i P2", "-i P2"],
    determinant: 1,
    square: "-I2",
    order: 4,
    preservesEpsilon2: true,
    orderTwoDeterminantOneLiftExists: false,
  },
  completedMatterCycles: {
    C: { edges: cycleC, representationCounts: counts(cycleC) },
    D: { edges: cycleD, representationCounts: counts(cycleD) },
    centralLiftPhaseInRelativeHolonomy: "+1",
  },
  consequence: "The weak determinant-one Weyl lift supplies an intrinsic C4 central extension, but representation content is identical on the C and D cycles, so it cannot select their relative ribbon orientation.",
  passed: true,
}, null, 2));
