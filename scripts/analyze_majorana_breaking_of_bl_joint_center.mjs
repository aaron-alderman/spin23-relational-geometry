import assert from "node:assert/strict";

const sectors = ["Q", "uc", "dc", "L", "ec", "nuc"];
const x = { Q: 1, uc: -1, dc: -1, L: -3, ec: 3, nuc: 3 }; // X=3(B-L)
const lambdaUnique = { Q: 5, uc: 5, dc: 1, L: 1, ec: 1, nuc: 0 };
const lambdaMultiplicity = { Q: 5, uc: 5, dc: 1, L: 1, ec: 3, nuc: 0 };
const mod = (n, m) => ((n % m) + m) % m;
const z6 = Object.fromEntries(sectors.map((sector) => [sector, mod(x[sector], 6)]));
const z3 = Object.fromEntries(sectors.map((sector) => [sector, mod(x[sector], 3)]));
const z2 = Object.fromEntries(sectors.map((sector) => [sector, mod(x[sector], 2)]));
assert(Object.values(z2).every((value) => value === 1));
assert.deepEqual(z3, { Q: 1, uc: 2, dc: 2, L: 0, ec: 0, nuc: 0 });

const classes = (observables) => {
  const grouped = new Map();
  for (const sector of sectors) {
    const key = observables.map((observable) => observable[sector]).join(",");
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(sector);
  }
  return [...grouped.values()];
};
const dimensions = {
  continuousX: classes([x]).length,
  residualZ6: classes([z6]).length,
  independentMatterParityZ2: classes([z2]).length,
  z6PlusIncidenceUnique: classes([z6, lambdaUnique]).length,
  z6PlusIncidenceMultiplicity: classes([z6, lambdaMultiplicity]).length,
  z2PlusIncidenceUnique: classes([z2, lambdaUnique]).length,
  z2PlusIncidenceMultiplicity: classes([z2, lambdaMultiplicity]).length,
};
assert.deepEqual(dimensions, {
  continuousX: 4,
  residualZ6: 3,
  independentMatterParityZ2: 1,
  z6PlusIncidenceUnique: 5,
  z6PlusIncidenceMultiplicity: 6,
  z2PlusIncidenceUnique: 3,
  z2PlusIncidenceMultiplicity: 4,
});

const majoranaCharge = 2 * x.nuc;
const weinbergCharge = 2 * x.L;
assert.equal(majoranaCharge, 6);
assert.equal(weinbergCharge, -6);

console.log(JSON.stringify({
  protocol: "majorana-breaking-of-bl-joint-center/1",
  integerCharge: x,
  operatorCharges: {
    nucNucMajorana: majoranaCharge,
    LHLHWeinberg: weinbergCharge,
  },
  residualSymmetry: {
    standaloneIntegerNormalizedGroup: "Z6",
    chargesMod6: z6,
    z3SubgroupCharges: z3,
    z2SubgroupCharges: z2,
    colorCenterIdentification: "The Z3 action is omega on Q, omega^-1 on uc and dc, and trivial on leptons, exactly matching the SU(3) color center on these representations.",
    independentRemnantAfterColorCenterQuotient: "Z2 matter parity (-1)^{3(B-L)}",
  },
  generatedAlgebraDimensions: dimensions,
  result: "Continuous B-L plus incidence robustly generates C^6. After charge-six Majorana breaking, the independent Z2 remnant is scalar on all matter sectors and adds no resolving power. Keeping the full Z6 plus incidence is normalization-sensitive: multiplicity incidence resolves six classes, deduplicated incidence only five.",
  physicalGate: "Specify the global gauge-group quotient and B-L-breaking sector. Do not claim the low-energy discrete remnant retains the continuous-current aggregation or joint-center theorem.",
  passed: true,
}, null, 2));
