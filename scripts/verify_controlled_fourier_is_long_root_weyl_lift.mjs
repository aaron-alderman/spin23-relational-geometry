import assert from "node:assert/strict";

function multiply(a, b) {
  return a.map((row) =>
    b[0].map((_, j) => row.reduce((sum, value, k) => sum + value * b[k][j], 0)),
  );
}

function transpose(a) {
  return a[0].map((_, j) => a.map((row) => row[j]));
}

function key(a) {
  return a.flat().join(",");
}

const I4 = [
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1],
];

const J4 = [
  [0, 0, 1, 0],
  [0, 0, 0, 1],
  [-1, 0, 0, 0],
  [0, -1, 0, 0],
];

const longLift = [
  [1, 0, 0, 0],
  [0, 0, 0, 1],
  [0, 0, 1, 0],
  [0, -1, 0, 0],
];

const expectedSquare = [
  [1, 0, 0, 0],
  [0, -1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, -1],
];

assert.deepEqual(multiply(multiply(transpose(longLift), J4), longLift), J4);
assert.deepEqual(multiply(longLift, longLift), expectedSquare);
assert.deepEqual(multiply(expectedSquare, expectedSquare), I4);

function torus(t1, t2) {
  return [
    [t1, 0, 0, 0],
    [0, t2, 0, 0],
    [0, 0, 1 / t1, 0],
    [0, 0, 0, 1 / t2],
  ];
}

const inverseLongLift = [
  [1, 0, 0, 0],
  [0, 0, 0, -1],
  [0, 0, 1, 0],
  [0, 1, 0, 0],
];
assert.deepEqual(
  multiply(multiply(longLift, torus(2, 3)), inverseLongLift),
  torus(2, 1 / 3),
);

const shortReflection = [
  [0, 1],
  [1, 0],
];
const longReflection = [
  [1, 0],
  [0, -1],
];

const queue = [
  [
    [1, 0],
    [0, 1],
  ],
];
const seen = new Map();
while (queue.length > 0) {
  const current = queue.shift();
  const currentKey = key(current);
  if (seen.has(currentKey)) continue;
  seen.set(currentKey, current);
  queue.push(multiply(current, shortReflection));
  queue.push(multiply(current, longReflection));
}

assert.equal(seen.size, 8);

console.log(
  JSON.stringify(
    {
      protocol: "controlled-fourier-is-long-root-weyl-lift/1",
      rootSystem: "C2",
      longSimpleRoot: "2e2",
      inducedWeightAction: "(e1,e2) -> (e1,-e2)",
      lift: {
        symplectic: true,
        square: "diag(1,-1,1,-1)=D",
        fourthPowerIdentity: true,
      },
      weylQuotient: {
        reflectionOrder: 2,
        groupGeneratedWithChannelExchange: "W(C2) isomorphic to D8",
        groupOrder: seen.size,
      },
      conclusion:
        "The passive controlled Fourier quarter-turn is an integral symplectic lift of the long-root simple Weyl reflection; its square is the torus grading sign forgotten in the Weyl quotient.",
    },
    null,
    2,
  ),
);
