import assert from "node:assert/strict";

const inverseCarrier = ({ a, x, y }) => {
  const determinant = a * a - x * x - y * y;
  assert(determinant > 0);
  return { diagonal: a / determinant, re: -x / determinant, im: -y / determinant, determinant: 1 / determinant };
};

const effectiveKernel = (carrier, gA, gB) => {
  const inv = inverseCarrier(carrier);
  return {
    aa: gA * gA * inv.diagonal,
    bb: gB * gB * inv.diagonal,
    reAB: gA * gB * inv.re,
    imAB: gA * gB * inv.im,
    determinant: gA * gA * gB * gB * inv.determinant,
  };
};

const tests = [
  { carrier: { a: 5, x: 3, y: 1 }, gA: 2, gB: 2 },
  { carrier: { a: 7, x: -2, y: 4 }, gA: 3, gB: 3 },
  { carrier: { a: 11, x: 6, y: -2 }, gA: 1, gB: 1 },
];

for (const test of tests) {
  const inv = inverseCarrier(test.carrier);
  assert(Math.abs(inv.determinant - (inv.diagonal ** 2 - inv.re ** 2 - inv.im ** 2)) < 1e-12);
  const eff = effectiveKernel(test.carrier, test.gA, test.gB);
  assert(Math.abs(eff.aa - eff.bb) < 1e-12);
  assert(eff.determinant > 0);
}

const brokenCoupling = effectiveKernel({ a: 5, x: 3, y: 1 }, 2, 3);
assert.notEqual(brokenCoupling.aa, brokenCoupling.bb);

console.log(JSON.stringify({
  protocol: "auxiliary-two-face-schur-response/1",
  quadraticAction: "S_aux = h^dagger M h - g(h^dagger O + O^dagger h), with no derivatives on h",
  carrierMatrix: "M=[[a,x-iy],[x+iy,a]], Delta=a^2-x^2-y^2>0",
  inverse: "M^-1=Delta^-1[[a,-x+iy],[-x-iy,a]]",
  tests: tests.map((test) => ({ ...test, effective: effectiveKernel(test.carrier, test.gA, test.gB) })),
  exchangeBrokenCouplingWitness: { gA: 2, gB: 3, effective: brokenCoupling },
  results: {
    jordanInverseClosure: "The algebraic inverse remains in the population-normal H2(R) real form.",
    schurComplementClosure: "For exchange-symmetric coupling gA=gB, integrating out h gives g^2 M^-1 in the same positive cone.",
    couplingGate: "Unequal face coupling produces unequal diagonal populations and leaves the exchange-fixed subspace.",
    degreeOfFreedomGate: "With no derivatives and invertible M, h is algebraically eliminated and contributes no propagating pole. Momentum dependence must come from existing composite correlators or a derived nonlocal kernel, not an inserted kinetic mirror field."
  },
  passed: true,
}, null, 2));
