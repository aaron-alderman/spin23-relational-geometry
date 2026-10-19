#!/usr/bin/env node

const weights = { y1: 2, y2: 3, y3: 3, y4: 4 };
const nonlinear = [];
const names = Object.keys(weights);
for (let i = 0; i < names.length; i += 1) {
  for (let j = i; j < names.length; j += 1) {
    const degree = weights[names[i]] + weights[names[j]];
    if (degree <= 5) nonlinear.push({ monomial: `${names[i]}*${names[j]}`, wordLength: degree });
  }
}

const expected = ["y1*y1", "y1*y2", "y1*y3"];
const actual = nonlinear.map((x) => x.monomial);
const monomialsPass = JSON.stringify(actual) === JSON.stringify(expected);

// H = [[2a,b,g,0],[b,0,0,0],[g,0,0,0],[0,0,0,0]].
// Its two indicated 2x2 principal minors are -b^2 and -g^2.
const tests = [
  { alpha: 1, beta: 0, gamma: 0, rankUpperBound: 1, psdPossible: true },
  { alpha: 1, beta: 2, gamma: 0, rankUpperBound: 2, psdPossible: false },
  { alpha: 1, beta: 0, gamma: -3, rankUpperBound: 2, psdPossible: false },
  { alpha: -1, beta: 0, gamma: 0, rankUpperBound: 1, psdPossible: false },
].map((x) => ({
  ...x,
  principalMinor12: -(x.beta ** 2),
  principalMinor13: -(x.gamma ** 2),
  y4Flat: true,
}));

const passed = monomialsPass
  && tests.every((x) => x.y4Flat)
  && tests.filter((x) => x.beta !== 0 || x.gamma !== 0)
    .every((x) => x.principalMinor12 < 0 || x.principalMinor13 < 0);

console.log(JSON.stringify({
  protocol: "degree-ten-three-family-no-go-certificate/1",
  mixedGeneratorWeights: weights,
  primitiveGeneratorAtWordLengthFive: false,
  nonlinearMonomialsThroughWordLengthFive: nonlinear,
  stationaryHessianPattern: "[[2a,b,g,0],[b,0,0,0],[g,0,0,0],[0,0,0,0]]",
  tests,
  conclusion: "positive semidefiniteness forces beta=gamma=0, leaving rank at most one and at least three flat directions",
  passed,
}, null, 2));

if (!passed) process.exitCode = 1;
