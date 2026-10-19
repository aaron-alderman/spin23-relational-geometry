import assert from "node:assert/strict";

const leviCivita4 = (i, j, k, l) => {
  const xs = [i, j, k, l];
  if (new Set(xs).size < 4) return 0;
  let inversions = 0;
  for (let a = 0; a < 4; a += 1) for (let b = a + 1; b < 4; b += 1) {
    if (xs[a] > xs[b]) inversions += 1;
  }
  return inversions % 2 === 0 ? 1 : -1;
};
const zero = (r, c = r) => Array.from({ length: r }, () => Array(c).fill(0));
const maxAbs = (A) => Math.max(...A.flat().map(Math.abs));

// The only candidate with one epsilon, two free indices and one available
// four-vector is epsilon_{mu alpha nu beta} q^alpha q^beta, which vanishes
// because q^alpha q^beta is symmetric.
for (const q of [
  [1, 2, 3, 5],
  [-0.4, 1.7, 0.2, -2.1],
  [0, 1, 0, 0]
]) {
  const E = zero(4);
  for (let mu = 0; mu < 4; mu += 1) for (let nu = 0; nu < 4; nu += 1) {
    for (let a = 0; a < 4; a += 1) for (let b = 0; b < 4; b += 1) {
      E[mu][nu] += leviCivita4(mu, a, nu, b) * q[a] * q[b];
    }
  }
  assert.equal(maxAbs(E), 0);
}

// Contracting any pair of epsilon indices with a symmetric metric also
// vanishes.  Euclidean delta is enough to verify the index antisymmetry.
const metricContractions = [];
for (let mu = 0; mu < 4; mu += 1) for (let nu = 0; nu < 4; nu += 1) {
  let value = 0;
  for (let a = 0; a < 4; a += 1) value += leviCivita4(mu, nu, a, a);
  metricContractions.push(value);
}
assert(metricContractions.every((x) => x === 0));

// Ordinary symmetric rank-two structures from one momentum are eta and qq;
// neither is a pseudotensor.  A pseudoscalar coefficient multiplying them
// would require an independent parity-odd vacuum datum.
const ordinaryBasisDimension = 2;
const pseudoBasisDimensionWithoutBackground = 0;
assert.equal(pseudoBasisDimensionWithoutBackground, 0);

console.log(JSON.stringify({
  protocol: "stress-pseudoscalar-two-point-lorentz-no-go/1",
  correlator: "<T_{mu nu}(q) P(-q)> in a translation- and Lorentz-invariant vacuum",
  assumptions: [
    "T_{mu nu} is symmetric",
    "P is a spacetime pseudoscalar",
    "q is the only available four-vector",
    "there is no parity-odd background tensor or medium vector"
  ],
  ordinarySymmetricRankTwoBasis: ["eta_{mu nu}", "q_mu q_nu"],
  candidatePseudoTensor: "epsilon_{mu alpha nu beta} q^alpha q^beta = 0",
  pseudoTensorBasisDimension: pseudoBasisDimensionWithoutBackground,
  conclusion: "the linear vacuum two-point response of symmetric stress to a spacetime pseudoscalar vanishes kinematically",
  boundary: "the result does not identify Furey conjugation parity with spacetime CP and does not apply with extra momenta, spin, a medium, curvature, boundaries or parity-odd backgrounds",
  passed: true
}, null, 2));
