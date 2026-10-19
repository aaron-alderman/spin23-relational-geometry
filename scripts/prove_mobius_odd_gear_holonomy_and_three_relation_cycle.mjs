import assert from "node:assert/strict";

const meshHolonomy = (gearCount) => (-1) ** gearCount;
const totalHolonomy = (gearCount, orientationTwist) => meshHolonomy(gearCount) * orientationTwist;

const census = Array.from({ length: 8 }, (_, k) => k + 2).map((n) => ({
  gears: n,
  planarOrientable: totalHolonomy(n, +1) === 1,
  mobiusOneHalfTwist: totalHolonomy(n, -1) === 1,
}));

for (const row of census) {
  assert.equal(row.planarOrientable, row.gears % 2 === 0);
  assert.equal(row.mobiusOneHalfTwist, row.gears % 2 === 1);
}

const triangle = census.find(({ gears }) => gears === 3);
assert.deepEqual(triangle, { gears: 3, planarOrientable: false, mobiusOneHalfTwist: true });

const result = {
  protocol: "mobius-odd-gear-holonomy/1",
  rule: {
    externalMeshSign: -1,
    nCycleMeshHolonomy: "(-1)^n",
    orientableClosureCondition: "(-1)^n=+1",
    mobiusTwistHolonomy: -1,
    twistedClosureCondition: "(-1)^n*(-1)=+1",
  },
  census,
  minimalOddCycle: {
    gears: 3,
    ordinaryLoop: "frustrated",
    oneHalfTwistLoop: "parity-consistent",
  },
  researchMapping: {
    vertices: ["P", "I", "N"],
    relations: ["P-I", "P-N", "I-N"],
    twoPrimaryWheels: ["Dirac P-I", "Majorana P-N"],
    thirdRelation: "I-N, induced after anchor-forgetting coarse closure",
    candidateTwistDatum: "opposite-anchor/reality transport; equivalence to Mobius holonomy remains to be proved",
  },
  theorem: "A single orientation-reversing holonomy changes the gear-cycle closure condition from even n to odd n; three is the minimal nontrivial twisted cycle.",
  boundary: "Parity consistency is not a CAD or contact-mechanics proof that three physical gears with realizable tooth geometry can be built.",
  passed: true,
};

console.log(JSON.stringify(result, null, 2));
