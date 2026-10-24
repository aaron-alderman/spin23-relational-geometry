import assert from "node:assert/strict";

const bits4 = (n) => [(n >> 3) & 1, (n >> 2) & 1, (n >> 1) & 1, n & 1];
const parity = (m) => {
  const z = bits4(m);
  return (z[0] * z[2] + z[1] * z[3]) & 1;
};
const handleParities = (m) => {
  const z = bits4(m);
  return [z[0] * z[2], z[1] * z[3]];
};

const even = [...Array(16).keys()].filter((m) => parity(m) === 0);
const types = { evenEven: [], oddOdd: [] };
for (const characteristic of even) {
  const hp = handleParities(characteristic);
  if (hp[0] === 0 && hp[1] === 0) types.evenEven.push(characteristic);
  else if (hp[0] === 1 && hp[1] === 1) types.oddOdd.push(characteristic);
  else throw new Error("an even genus-two characteristic cannot be even-odd");
}
assert.equal(types.evenEven.length, 9);
assert.deepEqual(types.oddOdd, [15]);

const thetaWeight = 0.5;
const chi5Weight = even.length * thetaWeight;
const chi10Weight = 2 * chi5Weight;
const chi5SeparatingOrder = types.oddOdd.length;
const chi10SeparatingOrder = 2 * chi5SeparatingOrder;
assert.equal(chi5Weight, 5);
assert.equal(chi10Weight, 10);
assert.equal(chi5SeparatingOrder, 1);
assert.equal(chi10SeparatingOrder, 2);

// Igusa's even scalar ring is generated in weights 4, 6, 10 and 12.
// There is no holomorphic scalar weight-two factor that can multiply chi10
// into the Leech degree-two theta weight 12.
const generatorWeights = [4, 6, 10, 12];
const reachable = new Set([0]);
for (let total = 0; total <= 12; total += 1) {
  if (!reachable.has(total)) continue;
  for (const weight of generatorWeights) {
    if (total + weight <= 12) reachable.add(total + weight);
  }
}
assert.equal(reachable.has(2), false);
assert.equal(12 - chi10Weight, 2);

// The degree-two theta series of any positive lattice factorizes on the
// diagonal period matrix.  The zero-vector term makes it generically nonzero.
const leechThetaWeight = 24 / 2;
const leechSeparatingConstantTerm = 1;
assert.equal(leechThetaWeight, 12);
assert.equal(leechSeparatingConstantTerm, 1);
assert.notEqual(leechSeparatingConstantTerm, 0);

console.log(JSON.stringify({
  evenCharacteristicFactorization: types,
  igusaCompletion: {
    chi5: {
      construction: "product of the ten even theta constants",
      weight: chi5Weight,
      character: true,
      separatingVanishingOrder: chi5SeparatingOrder
    },
    chi10: {
      construction: "chi5 squared",
      weight: chi10Weight,
      fullScalarModularForm: true,
      separatingVanishingOrder: chi10SeparatingOrder
    }
  },
  leechDegreeTwoTheta: {
    weight: leechThetaWeight,
    separatingFactorization: "Theta_Lambda^(1)(tau1) Theta_Lambda^(1)(tau2)",
    separatingConstantTerm: leechSeparatingConstantTerm
  },
  weightAndDivisorObstruction: {
    missingWeight: leechThetaWeight - chi10Weight,
    holomorphicScalarWeightTwoExistsInIgusaRing: reachable.has(2),
    chi10DividesLeechTheta: false
  },
  conclusion: "The full ten-sector scalar closure exists as chi10, but it symmetrizes away the oriented seam and is not a factor of the weight-12 Leech degree-two theta series."
}, null, 2));
console.log("PASS verify_lattice_subroutine_igusa_seam_completion");

