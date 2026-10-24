import assert from "node:assert/strict";

const sum = (values) => values.reduce((total, value) => total + value, 0);
const traceFromJointSectors = (sectors) => ({
  first:
    sectors.pp + sectors.pm - sectors.mp - sectors.mm,
  second:
    sectors.pp - sectors.pm + sectors.mp - sectors.mm,
  product:
    sectors.pp - sectors.pm - sectors.mp + sectors.mm,
});

// Joint eigenspaces of the target read exchange X and far-link exchange Y.
const target = { pp: 79, pm: 48, mp: 42, mm: 3 };
const targetTraces = traceFromJointSectors(target);

assert.equal(sum(Object.values(target)), 172);
assert.deepEqual(targetTraces, { first: 82, second: 70, product: -8 });

// On Hom(C^3,C^2), separating the corpus endpoint involutions gives left
// central parity H2=-I2 and right sign-twisted reflection H3.  H3 has one
// +1 and two -1 eigenvectors, repeated for each of the two output rows.
const repairedEndpointHom = { pp: 0, pm: 0, mp: 2, mm: 4 };
const repairedEndpointTraces = traceFromJointSectors(repairedEndpointHom);

assert.equal(sum(Object.values(repairedEndpointHom)), 6);
assert.deepEqual(repairedEndpointTraces, { first: -6, second: -2, product: 2 });

// If the ordinary two-dimensional reflection is used instead, its +/-
// multiplicities are (1,1), while the sign-twisted three-reflection has
// multiplicities (1,2).  This fills four sectors but with the wrong spectrum.
const naiveEndpointHom = { pp: 1, pm: 2, mp: 1, mm: 2 };
const naiveEndpointTraces = traceFromJointSectors(naiveEndpointHom);

assert.equal(sum(Object.values(naiveEndpointHom)), 6);
assert.deepEqual(naiveEndpointTraces, { first: 0, second: -2, product: 0 });

const normalized = (sectors) =>
  Object.values(sectors).map((value) => value / sum(Object.values(sectors)));
const sameNormalizedSpectrum = (left, right) =>
  normalized(left).every((value, index) =>
    Math.abs(value - normalized(right)[index]) < 1e-12,
  );

assert.equal(sameNormalizedSpectrum(target, repairedEndpointHom), false);
assert.equal(sameNormalizedSpectrum(target, naiveEndpointHom), false);

console.log(JSON.stringify({
  status: "PASS",
  targetRecordExchanges: {
    groupType: "two independent commuting involutions (V4 on the supported record sectors)",
    jointSectors: target,
    traces: targetTraces,
    dimension: 172,
  },
  corpusEndpointActionsOnHom: {
    repairedParity: {
      jointSectors: repairedEndpointHom,
      traces: repairedEndpointTraces,
      dimension: 6,
      obstruction: "central -I2 parity leaves only two joint sectors",
    },
    naiveReflection: {
      jointSectors: naiveEndpointHom,
      traces: naiveEndpointTraces,
      dimension: 6,
      obstruction: "all four sectors occur, but with fingerprint 1:2:1:2",
    },
    orderThreeSelector:
      "R has order three and cannot itself be either target involution",
  },
  verdict:
    "direct identification fails; a typed two-copy record functor must lift endpoint channels to the 172-dimensional record representation",
}));
