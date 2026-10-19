import assert from "node:assert/strict";

function multiply(a, b) {
  return a.map((row) =>
    b[0].map((_, j) => row.reduce((sum, value, k) => sum + value * b[k][j], 0)),
  );
}

function transpose(a) {
  return a[0].map((_, j) => a.map((row) => row[j]));
}

function power(a, n, identity) {
  let result = identity;
  for (let i = 0; i < n; i += 1) result = multiply(result, a);
  return result;
}

function matrixVector(a, v) {
  return a.map((row) => row.reduce((sum, value, i) => sum + value * v[i], 0));
}

const I4 = [
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1],
];
const minusI4 = I4.map((row) => row.map((x) => (x === 0 ? 0 : -x)));
const J4 = [
  [0, 0, 1, 0],
  [0, 0, 0, 1],
  [-1, 0, 0, 0],
  [0, -1, 0, 0],
];

const P = [
  [0, 1, 0, 0],
  [1, 0, 0, 0],
  [0, 0, 0, 1],
  [0, 0, 1, 0],
];
const S = [
  [1, 0, 0, 0],
  [0, 0, 0, 1],
  [0, 0, 1, 0],
  [0, -1, 0, 0],
];

for (const generator of [P, S]) {
  assert.deepEqual(multiply(multiply(transpose(generator), J4), generator), J4);
}

const PSPS = multiply(multiply(multiply(P, S), P), S);
const SPSP = multiply(multiply(multiply(S, P), S), P);
assert.deepEqual(PSPS, SPSP);
assert.deepEqual(PSPS, J4);

const coxeterLift = multiply(P, S);
assert.deepEqual(power(coxeterLift, 4, I4), minusI4);
assert.deepEqual(power(coxeterLift, 8, I4), I4);

const s1 = [
  [0, 1],
  [1, 0],
];
const s2 = [
  [1, 0],
  [0, -1],
];
const roots = {
  1: [1, -1],
  2: [0, 2],
};

function inversionSequence(word) {
  let prefix = [
    [1, 0],
    [0, 1],
  ];
  const sequence = [];
  for (const index of word) {
    sequence.push(matrixVector(prefix, roots[index]));
    prefix = multiply(prefix, index === 1 ? s1 : s2);
  }
  return sequence;
}

const sequence1212 = inversionSequence([1, 2, 1, 2]);
const sequence2121 = inversionSequence([2, 1, 2, 1]);
const normalizedRootSet = (sequence) =>
  sequence.map((root) => root.join(",")).sort();

assert.deepEqual(
  normalizedRootSet(sequence1212),
  normalizedRootSet(sequence2121),
);
assert.deepEqual(sequence1212, [
  [1, -1],
  [2, 0],
  [1, 1],
  [0, 2],
]);
assert.deepEqual(sequence2121, [
  [0, 2],
  [1, 1],
  [2, 0],
  [1, -1],
]);

console.log(
  JSON.stringify(
    {
      protocol: "physical-weyl-lifts-satisfy-c2-braid/1",
      braid: {
        leftWord: "PSPS",
        rightWord: "SPSP",
        exactEquality: true,
        commonValue: "J4 full Fourier transform",
      },
      coxeterLift: {
        fourthPower: "-I4",
        eighthPower: "I4",
        carrierOrder: 8,
        weylOrder: 4,
      },
      inversionSequences: {
        word1212: sequence1212,
        word2121: sequence2121,
        samePositiveRootSet: true,
      },
      conclusion:
        "The physical integral Weyl lifts obey the C2 braid exactly. Their common longest-word lift is the full Fourier transform, and the remaining order doubling is the central symplectic sign.",
    },
    null,
    2,
  ),
);
