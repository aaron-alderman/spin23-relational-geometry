import assert from "node:assert/strict";

const neutrinoCharges = [3, 0, 0];
const requiredScalarChargeMatrix = neutrinoCharges.map((qa) =>
  neutrinoCharges.map((qb) => {
    const charge = -(qa + qb);
    return charge === 0 ? 0 : charge;
  }),
);

assert.deepEqual(requiredScalarChargeMatrix, [
  [-6, -3, -3],
  [-3, 0, 0],
  [-3, 0, 0],
]);

const upperTriangle = [];
for (let i = 0; i < 3; i += 1) {
  for (let j = i; j < 3; j += 1) {
    upperTriangle.push({
      entry: String(i) + String(j),
      charge: requiredScalarChargeMatrix[i][j],
    });
  }
}

const multiplicities = Object.fromEntries(
  [-6, -3, 0].map((q) => [
    q,
    upperTriangle.filter((entry) => entry.charge === q).length,
  ]),
);
assert.deepEqual(multiplicities, { 0: 3, "-6": 1, "-3": 2 });

const pairSums = (charges) => {
  const sums = new Set();
  for (let i = 0; i < charges.length; i += 1) {
    for (let j = i; j < charges.length; j += 1) {
      sums.add(charges[i] + charges[j]);
    }
  }
  return [...sums].sort((a, b) => a - b);
};

const target = [-6, -3, 0];
for (let q = -6; q <= 6; q += 1) {
  assert.notDeepEqual(pairSums([q]), target);
}

const solutions = [];
for (let a = -6; a <= 6; a += 1) {
  for (let b = a; b <= 6; b += 1) {
    if (JSON.stringify(pairSums([a, b])) === JSON.stringify(target)) {
      solutions.push([a, b]);
    }
  }
}
assert.deepEqual(solutions, [[-3, 0]]);

const factorsForCharge = {
  "-6": ["Delta_-3", "Delta_-3"],
  "-3": ["Delta_-3", "Delta_0"],
  0: ["Delta_0", "Delta_0"],
};

for (const entry of upperTriangle) {
  const factors = factorsForCharge[entry.charge];
  const charges = factors.map((name) => (name === "Delta_-3" ? -3 : 0));
  assert.equal(charges[0] + charges[1], entry.charge);
}

console.log(
  JSON.stringify(
    {
      protocol: "two-Delta-charge-faces-full-Majorana-texture/1",
      selectedFamilyNeutrinoCharges: neutrinoCharges,
      requiredScalarChargeMatrix,
      independentSymmetricEntries: upperTriangle,
      sectorMultiplicities: multiplicities,
      requiredChargeSet: target,
      oneFaceSuffices: false,
      exhaustiveIntegralTwoFaceSolutions: solutions,
      uniqueMinimalAlphabet: {
        Delta_0: 0,
        Delta_minus: -3,
        pairSums: {
          "Delta_minus Delta_minus": -6,
          "Delta_minus Delta_0": -3,
          "Delta_0 Delta_0": 0,
        },
      },
      coverage: {
        selectedSelected: "Delta_minus Delta_minus",
        selectedOther: "Delta_minus Delta_0",
        otherOther: "Delta_0 Delta_0",
      },
      boundary:
        "Charge support does not prove that the represented Pati-Salam one-form calculus contains two independent (2_R,1_L,4) copies.",
      passed: true,
    },
    null,
    2,
  ),
);
