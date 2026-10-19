#!/usr/bin/env node

import assert from "node:assert/strict";

// All fields are left-handed Weyl fields. Hypercharge is stored as Y6=6Y,
// baryon number as B3=3B, and lepton number as L.
const fields = {
  Q:   { color: "3",    weak: "2", Y6: 1,  B3: 1,  L: 0, left: "O2", right: "H" },
  uc:  { color: "bar3", weak: "1", Y6: -4, B3: -1, L: 0, left: "C",  right: "O2" },
  dc:  { color: "bar3", weak: "1", Y6: 2,  B3: -1, L: 0, left: "D",  right: "O2" },
  L:   { color: "1",    weak: "2", Y6: -3, B3: 0,  L: 1, left: "H",  right: "E" },
  ec:  { color: "1",    weak: "1", Y6: 6,  B3: 0,  L: -1,left: "E",  right: "C" },
  nuc: { color: "1",    weak: "1", Y6: 0,  B3: 0,  L: -1,left: "E",  right: "D" },
};

for (const f of Object.values(fields)) f.BL3 = f.B3 - 3 * f.L;

const desired = [["Q", "uc"], ["Q", "dc"], ["L", "ec"], ["L", "nuc"]];
const extras = [["Q", "L"], ["uc", "ec"], ["dc", "nuc"]];
const allLinks = [...desired, ...extras];

const colorProducts = new Map([
  ["1x1", ["1"]], ["1x3", ["3"]], ["3x1", ["3"]],
  ["1xbar3", ["bar3"]], ["bar3x1", ["bar3"]],
  ["3xbar3", ["1", "8"]], ["bar3x3", ["1", "8"]],
  ["3x3", ["bar3", "6"]], ["bar3xbar3", ["3", "bar6"]],
]);
const weakProducts = new Map([
  ["1x1", ["1"]], ["1x2", ["2"]], ["2x1", ["2"]], ["2x2", ["1", "3"]],
]);
const conjugateColor = { "1": "1", "3": "bar3", "bar3": "3", "6": "bar6", "bar6": "6", "8": "8" };

const product = (map, a, b) => {
  const answer = map.get(`${a}x${b}`);
  assert(answer, `missing tensor product ${a} x ${b}`);
  return answer;
};

const dress = ([aName, bName]) => {
  const a = fields[aName], b = fields[bName];
  const bilinearColor = product(colorProducts, a.color, b.color);
  const bilinearWeak = product(weakProducts, a.weak, b.weak);
  const scalarIrreps = [];
  for (const c of bilinearColor) for (const w of bilinearWeak) {
    scalarIrreps.push({ color: conjugateColor[c], weak: w, Y6: -(a.Y6 + b.Y6) });
  }
  return {
    link: `${aName}-${bName}`,
    fields: [aName, bName],
    bilinear: {
      color: bilinearColor,
      weak: bilinearWeak,
      Y6: a.Y6 + b.Y6,
      B3: a.B3 + b.B3,
      L: a.L + b.L,
      BL3: a.BL3 + b.BL3,
    },
    requiredScalarIrreps: scalarIrreps,
    conservingScalarCharges: {
      B3: -(a.B3 + b.B3),
      L: -(a.L + b.L),
      BL3: -(a.BL3 + b.BL3),
    },
    hasColorSingletScalar: scalarIrreps.some((x) => x.color === "1"),
    admitsBLNeutralScalar: a.BL3 + b.BL3 === 0,
  };
};

const dressed = allLinks.map(dress);
const byLink = new Map(dressed.map((x) => [x.link, x]));

const repKeys = (x) => new Set(x.requiredScalarIrreps.map((r) => `${r.color},${r.weak},${r.Y6}`));
const expectReps = (link, reps) => assert.deepEqual(repKeys(byLink.get(link)), new Set(reps));

expectReps("Q-uc", ["1,2,3", "8,2,3"]);
expectReps("Q-dc", ["1,2,-3", "8,2,-3"]);
expectReps("L-ec", ["1,2,-3"]);
expectReps("L-nuc", ["1,2,3"]);
expectReps("Q-L", ["bar3,1,2", "bar3,3,2"]);
expectReps("uc-ec", ["3,1,-2"]);
expectReps("dc-nuc", ["3,1,-2"]);

assert(dressed.slice(0, 4).every((x) => x.hasColorSingletScalar));
assert(dressed.slice(4).every((x) => !x.hasColorSingletScalar));
assert(dressed.slice(0, 4).every((x) => x.admitsBLNeutralScalar));
assert(dressed.slice(4).every((x) => !x.admitsBLNeutralScalar));

// The extra channels are one S1/S1^dagger family plus an optional S3 branch.
// S1=(bar3,1,1/3), S3=(bar3,3,1/3), with Y6=2.
assert(repKeys(byLink.get("Q-L")).has("bar3,1,2"));
assert(repKeys(byLink.get("Q-L")).has("bar3,3,2"));
assert(repKeys(byLink.get("uc-ec")).has("3,1,-2"));
assert(repKeys(byLink.get("dc-nuc")).has("3,1,-2"));

// Check that the endpoint first-order rule excludes the two basic diquark
// links which could couple to the same S1 field.
const firstOrderAllowed = (aName, bName) => {
  const a = fields[aName], b = fields[bName];
  return a.left === b.right || a.right === b.left;
};
assert(!firstOrderAllowed("Q", "Q"));
assert(!firstOrderAllowed("uc", "dc"));
const diquarkGaugeDressings = [dress(["Q", "Q"]), dress(["uc", "dc"])];
assert(repKeys(diquarkGaugeDressings[0]).has("3,1,-2"));
assert(repKeys(diquarkGaugeDressings[1]).has("bar3,1,2"));

const colorLinearSurvivors = dressed.filter((x) => x.hasColorSingletScalar).map((x) => x.link);
const BLNeutralSurvivors = dressed.filter((x) => x.admitsBLNeutralScalar).map((x) => x.link);
assert.deepEqual(colorLinearSurvivors, desired.map((x) => x.join("-")));
assert.deepEqual(BLNeutralSurvivors, desired.map((x) => x.join("-")));

const report = {
  protocol: "gauge-dressed-seven-doubled-furey-arrow-links/1",
  conventions: {
    fermions: "all left-handed Weyl",
    gaugeOrder: "SU(3)c, SU(2)L, Y6=6Y",
    sectorOrder: Object.keys(fields),
    BL3: Object.fromEntries(Object.entries(fields).map(([k, v]) => [k, v.BL3])),
  },
  dressedLinks: dressed,
  identification: {
    standardHiggs: ["(1,2,+1/2) for Q-uc and L-nuc", "(1,2,-1/2) for Q-dc and L-ec"],
    colorOctetHiggsBranches: ["(8,2,+1/2) for Q-uc", "(8,2,-1/2) for Q-dc"],
    S1: "(bar3,1,+1/3) on Q-L, with its conjugate (3,1,-1/3) on uc-ec and dc-nuc",
    S3: "(bar3,3,+1/3) optional Q-L-only branch",
  },
  baryonLeptonAssignmentForLeptoquarkBranch: {
    S1_or_S3: { B: -1 / 3, L: -1, BL: 2 / 3 },
    conjugate: { B: 1 / 3, L: 1, BL: -2 / 3 },
  },
  protonStabilityCheckpoint: {
    gaugeTheoryFact: "S1/S3 quantum numbers can also support diquark operators in a generic scalar extension.",
    endpointResult: "The minimal doubled Furey first-order rule excludes Q-Q and uc-dc Dirac links, the two basic S1-compatible diquark channels.",
    caveat: "This protects only the classified finite Dirac-link sector; a larger algebra, scalar potential, higher-dimensional operators or radiative completion must be audited separately.",
    diquarkGaugeDressings,
  },
  refinements: {
    minimalWithinStandardModelAlgebra: {
      rule: "retain the noncommutative color action and require the finite Dirac operator to be color-linear (equivalently keep only color-singlet scalar intertwiners)",
      survivors: colorLinearSurvivors,
      removed: extras.map((x) => x.join("-")),
    },
    independentChargeCheck: {
      rule: "require the finite Dirac operator/scalar background to preserve continuous B-L",
      survivors: BLNeutralSurvivors,
      removed: extras.map((x) => x.join("-")),
      integerCharges: "3(B-L)=(1,-1,-1,-3,3,3)",
      matterParitySufficient: false,
      note: "all extra bilinears carry even nonzero 3(B-L)=+/-2, so matter parity alone does not remove them",
    },
  },
  verdict: {
    mandatoryExtraScalars: "no-go: the three links disappear under the minimal color-linear refinement",
    optionalAlternative: "interesting: if colored finite fluctuations are admitted, the extras organize into standard S1 plus optional S3 scalar-leptoquark channels",
    predictiveStatus: "not yet a prediction because the endpoint model does not choose between color-linearity and colored fluctuations or fix any coupling",
  },
  passed: true,
};

console.log(JSON.stringify(report, null, 2));

