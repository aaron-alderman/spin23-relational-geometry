import assert from "node:assert/strict";

const mod = (x, n) => ((x % n) + n) % n;

const fields = [
  { name: "Q", dim: 6, colourIndex2T: 2, weakIndex2T: 3, y6: 1 },
  { name: "uc", dim: 3, colourIndex2T: 1, weakIndex2T: 0, y6: -4 },
  { name: "dc", dim: 3, colourIndex2T: 1, weakIndex2T: 0, y6: 2 },
  { name: "L", dim: 2, colourIndex2T: 0, weakIndex2T: 1, y6: -3 },
  { name: "ec", dim: 1, colourIndex2T: 0, weakIndex2T: 0, y6: 6 },
  { name: "nuc", dim: 1, colourIndex2T: 0, weakIndex2T: 0, y6: 0 },
];

const parentQ = [1, -1, -1, 1, -1, -1];
const baryonTrialityQ = [0, 1, -1, 1, 1, 0];
const splitQ = [1, 0, 1, 1, 1, 0];
const colourCentreQ = [1, -1, -1, 0, 0, 0];

const trace = (charges, power = 1) =>
  fields.reduce(
    (sum, field, i) => sum + field.dim * charges[i] ** power,
    0,
  );
const mixed = (charges, key) =>
  fields.reduce((sum, field, i) => sum + field[key] * charges[i], 0);

const parent = {
  linear: trace(parentQ),
  cubic: trace(parentQ, 3),
  su3Squared: mixed(parentQ, "colourIndex2T"),
  su2LSquared: 4,
  su2RSquared: -4,
};
assert.deepEqual(parent, {
  linear: 0,
  cubic: 0,
  su3Squared: 0,
  su2LSquared: 4,
  su2RSquared: -4,
});

const broken = {
  linear: trace(baryonTrialityQ),
  cubic: trace(baryonTrialityQ, 3),
  su3Squared: mixed(baryonTrialityQ, "colourIndex2T"),
  su2Squared: mixed(baryonTrialityQ, "weakIndex2T"),
  ySquaredDiscrete: fields.reduce(
    (sum, field, i) =>
      sum + field.dim * baryonTrialityQ[i] * field.y6 ** 2,
    0,
  ),
  yDiscreteSquared: fields.reduce(
    (sum, field, i) =>
      sum + field.dim * baryonTrialityQ[i] ** 2 * field.y6,
    0,
  ),
};
assert.deepEqual(broken, {
  linear: 3,
  cubic: 3,
  su3Squared: 0,
  su2Squared: 1,
  ySquaredDiscrete: 90,
  yDiscreteSquared: -6,
});

assert.deepEqual(
  splitQ.map((q, i) => mod(q - baryonTrialityQ[i], 3)),
  colourCentreQ.map((q) => mod(q, 3)),
);
assert.equal(mod(trace(splitQ) - trace(baryonTrialityQ), 9), 0);
assert.equal(mod(trace(splitQ, 3) - trace(baryonTrialityQ, 3), 9), 0);
assert.equal(mod(trace(splitQ), 9), 3);
assert.equal(mod(trace(baryonTrialityQ), 9), 3);

const familyScan = [];
for (let nf = 1; nf <= 12; nf += 1) {
  const parentWeakLocal = [
    mod(nf * parent.su2LSquared, 3),
    mod(nf * parent.su2RSquared, 3),
  ];
  const brokenWeakLocal = mod(nf * broken.su2Squared, 3);
  const daiFreed = mod(nf * broken.linear, 9);
  const traditionalCancels =
    parentWeakLocal[0] === 0 &&
    parentWeakLocal[1] === 0 &&
    brokenWeakLocal === 0;
  const daiFreedCancels = daiFreed === 0;
  assert.equal(traditionalCancels, nf % 3 === 0);
  assert.equal(daiFreedCancels, nf % 3 === 0);
  familyScan.push({
    nf,
    parentWeakLocal,
    brokenWeakLocal,
    daiFreedMod9: daiFreed,
    traditionalCancels,
    daiFreedCancels,
    continuousGenerationIndependentLinear: nf * broken.linear,
    continuousGenerationIndependentCubic: nf * broken.cubic,
  });
}

const result = {
  protocol: "parent-broken-anomaly-ledgers-and-mod9-torsion-boundary/1",
  normalization:
    "Non-Abelian mixed coefficients use integer 2T normalization; y6=6Y.",
  parent,
  broken,
  representativeCheck: {
    baryonTrialitySignedSumMod9: mod(trace(baryonTrialityQ), 9),
    splitRepresentativeSignedSumMod9: mod(trace(splitQ), 9),
    difference: "SU(3) colour-centre character",
  },
  familyScan,
  theorem:
    "Parent and broken perturbative mixed weak congruences and the low-energy Dai-Freed invariant have the same zero locus Nf=0 mod 3, but the perturbative polynomial only carries the mod-3 shadow and cannot evaluate the mod-9 torsion class.",
  stop:
    "Do not infer the Z9-valued Dai-Freed invariant from a real degree-six anomaly polynomial without integral lift, bordism, eta-invariant, or fully specified UV completion data.",
  passed: true,
};

console.log(JSON.stringify(result, null, 2));
