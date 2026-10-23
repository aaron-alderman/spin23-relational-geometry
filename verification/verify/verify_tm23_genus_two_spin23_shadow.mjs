#!/usr/bin/env node

import assert from "node:assert/strict";

const labels = ["A0", "A1", "A2", "B0", "B1", "B2"];

function bits4(n) {
  return [(n >> 3) & 1, (n >> 2) & 1, (n >> 1) & 1, n & 1];
}

function dot2(a, b) {
  return (a[0] & b[0]) ^ (a[1] & b[1]);
}

function characteristicParity(m) {
  const z = bits4(m);
  return dot2(z.slice(0, 2), z.slice(2));
}

function symplecticPairing(x, y) {
  const X = bits4(x);
  const Y = bits4(y);
  return (
    dot2(X.slice(0, 2), Y.slice(2)) ^
    dot2(X.slice(2), Y.slice(0, 2))
  );
}

function quadraticValue(characteristic, x) {
  const M = bits4(characteristic);
  const X = bits4(x);
  const xa = X.slice(0, 2);
  const xb = X.slice(2);
  return (
    dot2(xa, xb) ^
    dot2(M.slice(0, 2), xb) ^
    dot2(M.slice(2), xa)
  );
}

function permutations(values) {
  const answer = [];
  function visit(remaining, prefix) {
    if (remaining.length === 0) {
      answer.push(prefix);
      return;
    }
    for (let i = 0; i < remaining.length; i += 1) {
      visit(
        remaining.slice(0, i).concat(remaining.slice(i + 1)),
        prefix.concat(remaining[i]),
      );
    }
  }
  visit(values, []);
  return answer;
}

function permutationParity(order, reference) {
  const positions = new Map(reference.map((value, index) => [value, index]));
  const p = order.map((value) => positions.get(value));
  let inversions = 0;
  for (let i = 0; i < p.length; i += 1) {
    for (let j = i + 1; j < p.length; j += 1) {
      if (p[i] > p[j]) inversions += 1;
    }
  }
  return inversions % 2 === 0 ? 1 : -1;
}

function cycleType(mapping) {
  const seen = new Set();
  const cycles = [];
  for (const start of labels) {
    if (seen.has(start)) continue;
    let current = start;
    let length = 0;
    while (!seen.has(current)) {
      seen.add(current);
      length += 1;
      current = mapping[current];
    }
    cycles.push(length);
  }
  return cycles.sort((a, b) => b - a);
}

// Genus-two theta-characteristic census.
const oddCharacteristics = [...Array(16).keys()].filter(
  (m) => characteristicParity(m) === 1,
);
assert.equal(oddCharacteristics.length, 6);

const allMarkings = permutations(oddCharacteristics);
assert.equal(allMarkings.length, 720);

const evenCharacteristics = new Set();
const lagrangians = new Set();
const compatiblePairs = new Set();
const compatibleTriples = new Set();
const tripleMultiplicities = new Map();

for (const marking of allMarkings) {
  const m = Object.fromEntries(labels.map((label, index) => [label, marking[index]]));
  const q = m.A0 ^ m.A1 ^ m.A2;
  const complementaryQ = m.B0 ^ m.B1 ^ m.B2;
  const L = [m.A0 ^ m.B0, m.A1 ^ m.B1, m.A2 ^ m.B2].sort(
    (a, b) => a - b,
  );
  const v = m.A0 ^ m.B0;
  const qDirection = m.B0 ^ m.A1 ^ m.A2;

  assert.equal(characteristicParity(q), 0);
  assert.equal(complementaryQ, q);
  assert.equal(new Set(L).size, 3);
  assert.ok(L.every((x) => x !== 0));
  assert.equal(L[0] ^ L[1] ^ L[2], 0);
  assert.equal(symplecticPairing(L[0], L[1]), 0);
  assert.equal(symplecticPairing(L[0], L[2]), 0);
  assert.equal(symplecticPairing(L[1], L[2]), 0);
  assert.ok(L.every((x) => quadraticValue(q, x) === 0));
  assert.equal(qDirection, q ^ v);
  assert.equal(quadraticValue(q, v), 0);
  assert.equal(characteristicParity(qDirection), 0);

  const lKey = L.join(",");
  const pairKey = `${q}|${lKey}`;
  const tripleKey = `${pairKey}|${v}`;
  evenCharacteristics.add(q);
  lagrangians.add(lKey);
  compatiblePairs.add(pairKey);
  compatibleTriples.add(tripleKey);
  tripleMultiplicities.set(tripleKey, (tripleMultiplicities.get(tripleKey) ?? 0) + 1);
}

assert.equal(evenCharacteristics.size, 10);
assert.equal(lagrangians.size, 15);
assert.equal(compatiblePairs.size, 60);
assert.equal(compatibleTriples.size, 180);
assert.deepEqual(new Set(tripleMultiplicities.values()), new Set([4]));

// The state order and direction order differ by an odd permutation. Reversing
// the two direction blocks also has sign (-1)^(3*3) = -1.
const stateOrder = ["A0", "A1", "A2", "B0", "B1", "B2"];
const directionOrder = ["B0", "A1", "A2", "A0", "B1", "B2"];
const reversedDirectionOrder = ["A0", "B1", "B2", "B0", "A1", "A2"];
assert.equal(permutationParity(directionOrder, stateOrder), -1);
assert.equal(permutationParity(reversedDirectionOrder, directionOrder), -1);

// Local state-symbol output map of Wolfram machine 596440. Direction is
// intentionally omitted here; this tests reversibility of the six-point map.
const localOutput = {
  A0: "B1",
  A1: "A2",
  A2: "A1",
  B0: "A2",
  B1: "B2",
  B2: "A0",
};
assert.equal(new Set(Object.values(localOutput)).size, 5);

const reversibleCompletions = [];
for (const source of labels) {
  for (const target of labels) {
    const candidate = { ...localOutput, [source]: target };
    if (new Set(Object.values(candidate)).size === 6) {
      reversibleCompletions.push({ source, target, cycleType: cycleType(candidate) });
    }
  }
}
assert.deepEqual(reversibleCompletions, [
  { source: "A1", target: "B0", cycleType: [3, 3] },
  { source: "B0", target: "B0", cycleType: [3, 2, 1] },
]);

// Explicit integral symplectic lifts. Theta characteristics transform by the
// standard affine genus-two action. These matrices lift the two exact machine
// completions above, not merely elements with the same cycle types.
const integralJ = [
  [0, 0, 1, 0],
  [0, 0, 0, 1],
  [-1, 0, 0, 0],
  [0, -1, 0, 0],
];

function identity4() {
  return Array.from({ length: 4 }, (_, i) =>
    Array.from({ length: 4 }, (_, j) => (i === j ? 1 : 0)),
  );
}

function transpose(matrix) {
  return matrix[0].map((_, j) => matrix.map((row) => row[j]));
}

function matrixMultiply(a, b) {
  return a.map((row) =>
    b[0].map((_, j) =>
      row.reduce((sum, value, k) => sum + value * b[k][j], 0),
    ),
  );
}

function matrixPower(matrix, exponent) {
  let answer = identity4();
  let factor = matrix;
  let power = exponent;
  while (power > 0) {
    if (power & 1) answer = matrixMultiply(factor, answer);
    factor = matrixMultiply(factor, factor);
    power >>= 1;
  }
  return answer;
}

function mod2(n) {
  return ((n % 2) + 2) % 2;
}

function matrixMod2(matrix) {
  return matrix.map((row) => row.map(mod2));
}

function rankMod2(matrix) {
  const reduced = matrixMod2(matrix);
  let rank = 0;
  for (let column = 0; column < reduced[0].length && rank < reduced.length; column += 1) {
    let pivot = rank;
    while (pivot < reduced.length && reduced[pivot][column] === 0) pivot += 1;
    if (pivot === reduced.length) continue;
    [reduced[rank], reduced[pivot]] = [reduced[pivot], reduced[rank]];
    for (let row = 0; row < reduced.length; row += 1) {
      if (row === rank || reduced[row][column] === 0) continue;
      for (let j = column; j < reduced[row].length; j += 1) {
        reduced[row][j] ^= reduced[rank][j];
      }
    }
    rank += 1;
  }
  return rank;
}

function thetaAction(matrix, characteristic) {
  const A = matrix.slice(0, 2).map((row) => row.slice(0, 2));
  const B = matrix.slice(0, 2).map((row) => row.slice(2));
  const C = matrix.slice(2).map((row) => row.slice(0, 2));
  const D = matrix.slice(2).map((row) => row.slice(2));
  const z = bits4(characteristic);
  const mu = z.slice(0, 2);
  const nu = z.slice(2);
  const CDT = matrixMultiply(C, transpose(D));
  const ABT = matrixMultiply(A, transpose(B));
  const nextMu = [0, 1].map((i) =>
    mod2(
      D[i][0] * mu[0] +
        D[i][1] * mu[1] -
        C[i][0] * nu[0] -
        C[i][1] * nu[1] +
        CDT[i][i],
    ),
  );
  const nextNu = [0, 1].map((i) =>
    mod2(
      -B[i][0] * mu[0] -
        B[i][1] * mu[1] +
        A[i][0] * nu[0] +
        A[i][1] * nu[1] +
        ABT[i][i],
    ),
  );
  return nextMu.concat(nextNu).reduce((answer, bit) => 2 * answer + bit, 0);
}

const orderThreeLift = [
  [1, 0, -3, -3],
  [2, -1, -3, -2],
  [0, 1, -2, -2],
  [1, -1, 0, 0],
];
const orderTwelveLift = [
  [7, 6, -1, -3],
  [45, 36, -3, -22],
  [102, 81, -8, -48],
  [75, 61, -6, -36],
];

const characteristicByLabel = Object.fromEntries(
  labels.map((label, index) => [label, oddCharacteristics[index]]),
);
const expectedCompletionActions = [
  { ...localOutput, A1: "B0" },
  { ...localOutput, B0: "B0" },
];
const canonicalStateCharacteristic =
  characteristicByLabel.A0 ^ characteristicByLabel.A1 ^ characteristicByLabel.A2;
const canonicalDirectionCharacteristic =
  characteristicByLabel.B0 ^ characteristicByLabel.A1 ^ characteristicByLabel.A2;
assert.equal(canonicalStateCharacteristic, 8);
assert.equal(canonicalDirectionCharacteristic, 6);

const leftInputs = new Set(["B0", "A1", "A2"]);
for (const [input, output] of Object.entries(localOutput)) {
  assert.equal(leftInputs.has(input), leftInputs.has(output));
}

for (const [index, lift] of [orderThreeLift, orderTwelveLift].entries()) {
  assert.deepEqual(
    matrixMultiply(matrixMultiply(transpose(lift), integralJ), lift),
    integralJ,
  );
  const actualAction = Object.fromEntries(
    labels.map((label) => {
      const imageCharacteristic = thetaAction(lift, characteristicByLabel[label]);
      const imageIndex = oddCharacteristics.indexOf(imageCharacteristic);
      return [label, labels[imageIndex]];
    }),
  );
  assert.deepEqual(actualAction, expectedCompletionActions[index]);
  assert.equal(
    thetaAction(lift, canonicalDirectionCharacteristic),
    canonicalDirectionCharacteristic,
  );
  assert.notEqual(
    thetaAction(lift, canonicalStateCharacteristic),
    canonicalStateCharacteristic,
  );
}
assert.deepEqual(matrixPower(orderThreeLift, 3), identity4());
assert.notDeepEqual(orderThreeLift, identity4());
assert.deepEqual(matrixPower(orderTwelveLift, 12), identity4());
for (const properDivisor of [1, 2, 3, 4, 6]) {
  assert.notDeepEqual(matrixPower(orderTwelveLift, properDivisor), identity4());
}

// Forced order doubling. The cube of the mod-two (3)(2)(1) action is one
// transvection, hence rank(g^3-I)=1. Every integral symplectic involution is
// either central or has Yang's normal form
// [[x,a,0,c],[b,-x,-c,0],[0,d,x,b],[-d,0,a,-x]],
// with ab-cd+x^2=1. Exhausting its parity reductions gives ranks 0 or 2 only.
const completionCubeMod2 = matrixMod2(matrixPower(orderTwelveLift, 3));
const completionCubeMinusIdentity = completionCubeMod2.map((row, i) =>
  row.map((value, j) => value ^ (i === j ? 1 : 0)),
);
assert.equal(rankMod2(completionCubeMinusIdentity), 1);

const involutionReductionRanks = new Set();
let involutionParityClasses = 0;
for (let x = 0; x < 2; x += 1) {
  for (let a = 0; a < 2; a += 1) {
    for (let b = 0; b < 2; b += 1) {
      for (let c = 0; c < 2; c += 1) {
        for (let d = 0; d < 2; d += 1) {
          if ((a * b ^ c * d ^ x) !== 1) continue;
          const involution = [
            [x, a, 0, c],
            [b, x, c, 0],
            [0, d, x, b],
            [d, 0, a, x],
          ];
          const difference = involution.map((row, i) =>
            row.map((value, j) => value ^ (i === j ? 1 : 0)),
          );
          involutionReductionRanks.add(rankMod2(difference));
          involutionParityClasses += 1;
        }
      }
    }
  }
}
assert.equal(involutionParityClasses, 16);
assert.deepEqual(involutionReductionRanks, new Set([0, 2]));

// Compare the two completions with the independently derived matched-handle
// binary image S3 x_{Z2} S3 of order 18. Exhaust every symplectic marking that
// carries the machine characteristic 6 to the corpus characteristic 15.
function matrixKey(matrix) {
  return matrix.flat().join(",");
}

function enumerateMatrixGroup(generators) {
  const identity = identity4();
  const seen = new Map([[matrixKey(identity), identity]]);
  const queue = [identity];
  for (let head = 0; head < queue.length; head += 1) {
    for (const generator of generators) {
      const next = matrixMod2(matrixMultiply(generator, queue[head]));
      if (!seen.has(matrixKey(next))) {
        seen.set(matrixKey(next), next);
        queue.push(next);
      }
    }
  }
  return [...seen.values()];
}

const binaryJ = matrixMod2(integralJ);
function binaryTransvection(v) {
  const vTJ = matrixMultiply([v], binaryJ)[0];
  return identity4().map((row, i) =>
    row.map((value, j) => value ^ (v[i] & vTJ[j])),
  );
}

function binaryVector(n) {
  return [0, 1, 2, 3].map((i) => (n >> i) & 1);
}

function inverseBinarySymplectic(matrix) {
  return matrixMod2(
    matrixMultiply(matrixMultiply(binaryJ, transpose(matrix)), binaryJ),
  );
}

function embedHandle(matrix, handle) {
  if (handle === 0) {
    return [
      [matrix[0][0], 0, matrix[0][1], 0],
      [0, 1, 0, 0],
      [matrix[1][0], 0, matrix[1][1], 0],
      [0, 0, 0, 1],
    ];
  }
  return [
    [1, 0, 0, 0],
    [0, matrix[0][0], 0, matrix[0][1]],
    [0, 0, 1, 0],
    [0, matrix[1][0], 0, matrix[1][1]],
  ];
}

const sp4Binary = enumerateMatrixGroup(
  [...Array(15)].map((_, index) => binaryTransvection(binaryVector(index + 1))),
);
assert.equal(sp4Binary.length, 720);
const handleThreeCycle = [
  [0, 1],
  [1, 1],
];
const mutualShearBinary = [
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [1, 0, 1, 0],
  [0, 1, 0, 1],
];
const matchedHandleGroup = enumerateMatrixGroup([
  embedHandle(handleThreeCycle, 0),
  embedHandle(handleThreeCycle, 1),
  mutualShearBinary,
]);
assert.equal(matchedHandleGroup.length, 18);
const matchedHandleKeys = new Set(matchedHandleGroup.map(matrixKey));
const completionMatricesBinary = [
  matrixMod2(orderThreeLift),
  matrixMod2(orderTwelveLift),
];
const markingsToCorpusCharacteristic = sp4Binary.filter(
  (matrix) => thetaAction(matrix, canonicalDirectionCharacteristic) === 15,
);
assert.equal(markingsToCorpusCharacteristic.length, 72);
const matchedHandleHitCounts = completionMatricesBinary.map((completion) =>
  markingsToCorpusCharacteristic.filter((marking) => {
    const conjugate = matrixMod2(
      matrixMultiply(
        matrixMultiply(marking, completion),
        inverseBinarySymplectic(marking),
      ),
    );
    return matchedHandleKeys.has(matrixKey(conjugate));
  }).length,
);
assert.deepEqual(matchedHandleHitCounts, [72, 0]);

// Lift the 72 compatible binary markings through explicit integral
// transvections and test the selected exact order-three completion against the
// independently generated equal-discriminant-five group modulo four.
function matrixMultiplyMod(a, b, modulus) {
  return matrixMultiply(a, b).map((row) =>
    row.map((value) => ((value % modulus) + modulus) % modulus),
  );
}

function enumerateMatrixGroupMod(generators, modulus) {
  const identity = identity4();
  const seen = new Map([[matrixKey(identity), identity]]);
  const queue = [identity];
  for (let head = 0; head < queue.length; head += 1) {
    for (const generator of generators) {
      const next = matrixMultiplyMod(generator, queue[head], modulus);
      if (!seen.has(matrixKey(next))) {
        seen.set(matrixKey(next), next);
        queue.push(next);
      }
    }
  }
  return seen;
}

function integralTransvection(v) {
  const vTJ = matrixMultiply([v], integralJ)[0];
  return identity4().map((row, i) =>
    row.map((value, j) => value + v[i] * vTJ[j]),
  );
}

function inverseIntegralSymplectic(matrix) {
  return matrixMultiply(matrixMultiply(integralJ, transpose(matrix)), integralJ)
    .map((row) => row.map((value) => -value));
}

const transvectionGenerators = [...Array(15)].map((_, index) => {
  const vector = binaryVector(index + 1);
  return {
    binary: binaryTransvection(vector),
    integral: integralTransvection(vector),
  };
});
const sp4WithIntegralLifts = new Map([
  [matrixKey(identity4()), { binary: identity4(), integral: identity4() }],
]);
const liftQueue = [sp4WithIntegralLifts.values().next().value];
for (let head = 0; head < liftQueue.length; head += 1) {
  for (const generator of transvectionGenerators) {
    const binary = matrixMod2(
      matrixMultiply(generator.binary, liftQueue[head].binary),
    );
    if (sp4WithIntegralLifts.has(matrixKey(binary))) continue;
    const entry = {
      binary,
      integral: matrixMultiply(generator.integral, liftQueue[head].integral),
    };
    sp4WithIntegralLifts.set(matrixKey(binary), entry);
    liftQueue.push(entry);
  }
}
assert.equal(sp4WithIntegralLifts.size, 720);

const companionTraceThree = [
  [0, -1],
  [1, 3],
];
const mutualShearIntegral = [
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [3, 2, 1, 0],
  [2, 3, 0, 1],
];
const equalDiscriminantFiveMod4 = enumerateMatrixGroupMod(
  [
    embedHandle(companionTraceThree, 0),
    embedHandle(companionTraceThree, 1),
    mutualShearIntegral,
  ].map((matrix) =>
    matrix.map((row) => row.map((value) => ((value % 4) + 4) % 4)),
  ),
  4,
);
assert.equal(equalDiscriminantFiveMod4.size, 9216);

const selectedOrderThreeMod4Hits = [];
for (const marking of markingsToCorpusCharacteristic) {
  const liftedMarking = sp4WithIntegralLifts.get(matrixKey(marking)).integral;
  const conjugatedLift = matrixMultiply(
    matrixMultiply(liftedMarking, orderThreeLift),
    inverseIntegralSymplectic(liftedMarking),
  );
  const reductionMod4 = conjugatedLift.map((row) =>
    row.map((value) => ((value % 4) + 4) % 4),
  );
  if (equalDiscriminantFiveMod4.has(matrixKey(reductionMod4))) {
    selectedOrderThreeMod4Hits.push({ marking, conjugatedLift, reductionMod4 });
  }
}
assert.equal(selectedOrderThreeMod4Hits.length, 72);

// Rule 60 on the cyclic binary Golay code G_23. The generator is
// x^11+x^9+x^7+x^6+x^5+x+1. Coordinates fit in a 23-bit integer.
const golayLength = 23;
const golayMask = (1 << golayLength) - 1;
const golayGenerator =
  (1 << 11) |
  (1 << 9) |
  (1 << 7) |
  (1 << 6) |
  (1 << 5) |
  (1 << 1) |
  1;

function cyclicShift23(word) {
  return ((word << 1) & golayMask) | (word >>> 22);
}

function rule60(word) {
  return (word ^ cyclicShift23(word)) & golayMask;
}

const golayCode = [];
for (let message = 0; message < 1 << 12; message += 1) {
  let word = 0;
  for (let bit = 0; bit < 12; bit += 1) {
    if ((message >>> bit) & 1) word ^= golayGenerator << bit;
  }
  golayCode.push(word & golayMask);
}
const golaySet = new Set(golayCode);
assert.equal(golaySet.size, 4096);
assert.ok(golayCode.every((word) => golaySet.has(rule60(word))));

const rule60Image = new Set(golayCode.map(rule60));
const rule60Kernel = golayCode.filter((word) => rule60(word) === 0);
assert.equal(rule60Image.size, 2048);
assert.deepEqual(rule60Kernel.sort((a, b) => a - b), [0, golayMask]);

function rule60Power(word, exponent) {
  let answer = word;
  for (let i = 0; i < exponent; i += 1) answer = rule60(answer);
  return answer;
}

const imageSample = [...rule60Image].find((word) => word !== 0);
assert.equal(rule60Power(imageSample, 2047), imageSample);
assert.notEqual(rule60Power(imageSample, 2047 / 23), imageSample);
assert.notEqual(rule60Power(imageSample, 2047 / 89), imageSample);

const report = {
  thetaCharacteristicCensus: {
    oddCharacteristics: oddCharacteristics.length,
    labelledMarkings: allMarkings.length,
    evenCharacteristics: evenCharacteristics.size,
    lagrangians: lagrangians.size,
    compatibleEvenCharacteristicLagrangianPairs: compatiblePairs.size,
    compatibleTriplesWithDistinguishedVector: compatibleTriples.size,
    markingsPerTriple: [...new Set(tripleMultiplicities.values())][0],
    identity: "q_direction = q_state + v with q_state restricted to L equal to zero",
  },
  orientation: {
    stateToDirectionSign: permutationParity(directionOrder, stateOrder),
    directionReversalSign: permutationParity(
      reversedDirectionOrder,
      directionOrder,
    ),
  },
  localOutput: {
    rankAsFiniteSetMap: new Set(Object.values(localOutput)).size,
    reversible: false,
    hammingDistanceOneReversibleCompletions: reversibleCompletions,
  },
  integralLifts: {
    invariantEvenCharacteristic: {
      canonicalCoordinate: canonicalDirectionCharacteristic,
      preservedByIrreversibleRuleAsPartition: true,
      preservedByBothReversibleCompletions: true,
      stabilizerOrder: 72,
    },
    cycleType33: {
      integralOrder: 3,
      matrix: orderThreeLift,
    },
    cycleType321: {
      integralOrder: 12,
      mod2Order: 6,
      matrix: orderTwelveLift,
      forcedMinimumFiniteOrder: 12,
      obstruction:
        "An order-6 lift would cube to an integral involution reducing to a rank-1 transvection, but integral symplectic involutions reduce with rank(g-I) 0 or 2.",
    },
  },
  matchedHandleSelection: {
    targetCharacteristic: 15,
    compatibleSymplecticMarkingsTested: markingsToCorpusCharacteristic.length,
    cycleType33Hits: matchedHandleHitCounts[0],
    cycleType321Hits: matchedHandleHitCounts[1],
    selectedCompletion: "redirect A1 to B0, giving cycle type (3)(3)",
    exactOrderThreeIntegralLiftMod4HitsFromCanonicalBfsLifts:
      selectedOrderThreeMod4Hits.length,
    exampleExactIntegralLift:
      selectedOrderThreeMod4Hits[0].conjugatedLift,
    exampleReductionMod4:
      selectedOrderThreeMod4Hits[0].reductionMod4,
    mod4GroupOrder: equalDiscriminantFiveMod4.size,
  },
  rule60Golay: {
    codeSize: golaySet.size,
    imageSize: rule60Image.size,
    kernel: rule60Kernel,
    imageDimension: 11,
    orderOnNonzeroImage: 2047,
    factorization: "2047 = 23 * 89",
  },
};

console.log(JSON.stringify(report, null, 2));
console.log("PASS verify_tm23_genus_two_spin23_shadow");
