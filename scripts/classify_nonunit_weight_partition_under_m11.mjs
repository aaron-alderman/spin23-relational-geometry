import assert from "node:assert/strict";

const mod = (x) => ((x % 3) + 3) % 3;
const S = [
  [1, 2, 2, 2, 1, 0, 1, 0, 0, 0, 0],
  [0, 1, 2, 2, 2, 1, 0, 1, 0, 0, 0],
  [2, 1, 2, 0, 1, 2, 0, 0, 1, 0, 0],
  [1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0],
  [2, 2, 2, 1, 0, 1, 0, 0, 0, 0, 1],
];
const supportKey = (indices) => [...indices].sort((a, b) => a - b).join(",");
const weightSixSupports = new Set();
for (let code = 1; code < 3 ** 5; code += 1) {
  let digits = code;
  const word = Array(11).fill(0);
  for (const row of S) {
    const coefficient = digits % 3;
    digits = Math.floor(digits / 3);
    for (let j = 0; j < 11; j += 1) word[j] = mod(word[j] + coefficient * row[j]);
  }
  const support = word.map((x, i) => x ? i : -1).filter((i) => i >= 0);
  if (support.length === 6) weightSixSupports.add(supportKey(support));
}
assert.equal(weightSixSupports.size, 66);

const blocks = [...weightSixSupports].map((key) => {
  const support = new Set(key.split(",").map(Number));
  return Array.from({ length: 11 }, (_, i) => i).filter((i) => !support.has(i));
});
const blockSet = new Set(blocks.map(supportKey));
const fourToFifth = new Map();
for (const block of blocks) {
  for (let omitted = 0; omitted < 5; omitted += 1) {
    const four = block.filter((_, i) => i !== omitted);
    const key = supportKey(four);
    assert(!fourToFifth.has(key));
    fourToFifth.set(key, block[omitted]);
  }
}
assert.equal(fourToFifth.size, 330);

const cyclePermutation = (cycles) => {
  const out = Array.from({ length: 11 }, (_, i) => i);
  for (const cycle of cycles) for (let i = 0; i < cycle.length; i += 1) out[cycle[i]] = cycle[(i + 1) % cycle.length];
  return out;
};
const generators = [
  cyclePermutation([[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]]),
  cyclePermutation([[2, 6, 10, 7], [3, 9, 4, 5]]),
];
assert(generators.every((permutation) => blocks.every((block) => blockSet.has(supportKey(block.map((x) => permutation[x]))))));
const compose = (left, right) => right.map((x) => left[x]);
const identity = Array.from({ length: 11 }, (_, i) => i);
const permutationKeys = new Set([identity.join(",")]);
const permutations = [identity];
for (let head = 0; head < permutations.length; head += 1) {
  for (const generator of generators) {
    const next = compose(generator, permutations[head]);
    const key = next.join(",");
    if (!permutationKeys.has(key)) {
      permutationKeys.add(key);
      permutations.push(next);
    }
  }
}
assert.equal(permutations.length, 7920);

const rank3Early = (matrix) => {
  const a = matrix.map((row) => row.map(mod));
  let rank = 0;
  for (let col = 0; col < a[0].length && rank < a.length; col += 1) {
    let pivot = rank;
    while (pivot < a.length && a[pivot][col] === 0) pivot += 1;
    if (pivot === a.length) continue;
    [a[rank], a[pivot]] = [a[pivot], a[rank]];
    if (a[rank][col] === 2) for (let j = col; j < a[rank].length; j += 1) a[rank][j] = mod(2 * a[rank][j]);
    for (let i = 0; i < a.length; i += 1) if (i !== rank && a[i][col]) {
      const factor = a[i][col];
      for (let j = col; j < a[i].length; j += 1) a[i][j] = mod(a[i][j] - factor * a[rank][j]);
    }
    rank += 1;
  }
  return rank;
};
const permuteColumnsEarly = (matrix, permutation) => matrix.map((row) => {
  const out = Array(11);
  for (let j = 0; j < 11; j += 1) out[permutation[j]] = row[j];
  return out;
});
const pureGolayPermutationGroup = permutations.filter((permutation) =>
  rank3Early([...S, ...permuteColumnsEarly(S, permutation)]) === 5);

const positive = [0, 1, 2, 3, 4, 5];
const heavyNegative = [6, 7];
const lightNegative = [8, 9, 10];
const partitionKey = (p, h, l) => [supportKey(p), supportKey(h), supportKey(l)].join("|");
const baseKey = partitionKey(positive, heavyNegative, lightNegative);
const orbit = new Set();
let stabilizerSize = 0;
for (const permutation of permutations) {
  const key = partitionKey(
    positive.map((i) => permutation[i]),
    heavyNegative.map((i) => permutation[i]),
    lightNegative.map((i) => permutation[i]),
  );
  orbit.add(key);
  if (key === baseKey) stabilizerSize += 1;
}
assert.equal(orbit.size * stabilizerSize, 7920);

const combinations = (items, size) => {
  const out = [];
  const visit = (start, chosen) => {
    if (chosen.length === size) {
      out.push(chosen);
      return;
    }
    for (let i = start; i < items.length; i += 1) visit(i + 1, [...chosen, items[i]]);
  };
  visit(0, []);
  return out;
};
const allPartitions = [];
for (const pset of combinations(Array.from({ length: 11 }, (_, i) => i), 6)) {
  const remaining = Array.from({ length: 11 }, (_, i) => i).filter((i) => !pset.includes(i));
  for (const hset of combinations(remaining, 2)) {
    const lset = remaining.filter((i) => !hset.includes(i));
    allPartitions.push(partitionKey(pset, hset, lset));
  }
}
assert.equal(allPartitions.length, 4620);

const unclassified = new Set(allPartitions);
const orbitSizes = [];
const representativeInvariants = [];
while (unclassified.size) {
  const representative = unclassified.values().next().value;
  const [ptext, htext, ltext] = representative.split("|");
  const pset = ptext.split(",").map(Number);
  const hset = htext.split(",").map(Number);
  const lset = ltext.split(",").map(Number);
  const currentOrbit = new Set(permutations.map((permutation) => partitionKey(
    pset.map((i) => permutation[i]),
    hset.map((i) => permutation[i]),
    lset.map((i) => permutation[i]),
  )));
  for (const key of currentOrbit) unclassified.delete(key);
  orbitSizes.push(currentOrbit.size);
  representativeInvariants.push({
    representative,
    orbitSize: currentOrbit.size,
    positiveComplementIsWittBlock: blockSet.has(supportKey([...hset, ...lset])),
  });
}
orbitSizes.sort((a, b) => a - b);

const genericG = [
  [8, 10, 1, 1, 1, 1, 9, 1, 2, 0, 2],
  [-2, -4, -4, -2, -2, -4, -3, -3, -4, -4, -4],
  [3, 5, 4, 2, 4, 6, 4, 5, 4, 4, 4],
  [7, -9, 6, -10, -2, -4, -3, -2, 14, -18, 0],
  [10, -6, 1, -1, -7, 9, 0, 2, 0, -14, 18],
];
const wittG = [
  [1, 3, 4, 2, 0, 2, 2, 1, 4, 4, 4],
  [-9, -9, 0, -2, 1, -9, -3, -1, -4, -2, 2],
  [10, 10, 9, 7, 9, 8, 1, 10, 8, 10, 2],
  [11, -5, 9, -7, 0, 1, 4, 3, 20, -12, 0],
  [14, -2, 7, 9, -1, 8, 7, 6, 8, -10, 14],
];
const rankMod = (matrix, prime = 1000003) => {
  const pow = (a, n) => {
    let x = BigInt(((a % prime) + prime) % prime), out = 1n, k = BigInt(n), P = BigInt(prime);
    while (k) {
      if (k & 1n) out = out * x % P;
      x = x * x % P;
      k >>= 1n;
    }
    return Number(out);
  };
  const a = matrix.map((row) => row.map((x) => ((x % prime) + prime) % prime));
  let rank = 0;
  for (let col = 0; col < a[0].length && rank < a.length; col += 1) {
    let pivot = rank;
    while (pivot < a.length && a[pivot][col] === 0) pivot += 1;
    if (pivot === a.length) continue;
    [a[rank], a[pivot]] = [a[pivot], a[rank]];
    const inv = pow(a[rank][col], prime - 2);
    for (let j = col; j < a[rank].length; j += 1) a[rank][j] = Number(BigInt(a[rank][j]) * BigInt(inv) % BigInt(prime));
    for (let i = 0; i < a.length; i += 1) if (i !== rank && a[i][col]) {
      const factor = a[i][col];
      for (let j = col; j < a[i].length; j += 1) a[i][j] = ((a[i][j] - Number(BigInt(factor) * BigInt(a[rank][j]) % BigInt(prime))) % prime + prime) % prime;
    }
    rank += 1;
  }
  return rank;
};
const permuteColumns = (matrix, permutation) => matrix.map((row) => {
  const out = Array(11);
  for (let j = 0; j < 11; j += 1) out[permutation[j]] = row[j];
  return out;
});
const exactLatticeStabilizer = (matrix, pset, hset, lset) => permutations.filter((permutation) => {
  if (partitionKey(pset.map((i) => permutation[i]), hset.map((i) => permutation[i]), lset.map((i) => permutation[i])) !== partitionKey(pset, hset, lset)) return false;
  return rankMod([...matrix, ...permuteColumns(matrix, permutation)]) === 5;
}).length;
const genericExactStabilizer = exactLatticeStabilizer(genericG, positive, heavyNegative, lightNegative);
const wittPositive = [0, 1, 2, 3, 4, 6];
const wittHeavy = [5, 7];
const wittLight = [8, 9, 10];
const wittExactStabilizer = exactLatticeStabilizer(wittG, wittPositive, wittHeavy, wittLight);
const coefficientStabilizerInside = (groupElements, pset, hset, lset) => groupElements.filter((permutation) =>
  partitionKey(pset.map((i) => permutation[i]), hset.map((i) => permutation[i]), lset.map((i) => permutation[i]))
  === partitionKey(pset, hset, lset)).length;
const genericPureCodeCoefficientStabilizer = coefficientStabilizerInside(pureGolayPermutationGroup, positive, heavyNegative, lightNegative);
const wittPureCodeCoefficientStabilizer = coefficientStabilizerInside(pureGolayPermutationGroup, wittPositive, wittHeavy, wittLight);
const cyclesOf = (permutation) => {
  const seen = new Set();
  const cycles = [];
  for (let i = 0; i < 11; i += 1) if (!seen.has(i)) {
    const cycle = [];
    let x = i;
    while (!seen.has(x)) {
      seen.add(x);
      cycle.push(x);
      x = permutation[x];
    }
    if (cycle.length > 1) cycles.push(cycle);
  }
  return cycles;
};
const wittPureCodeStabilizerElements = pureGolayPermutationGroup.filter((permutation) =>
  partitionKey(wittPositive.map((i) => permutation[i]), wittHeavy.map((i) => permutation[i]), wittLight.map((i) => permutation[i]))
  === partitionKey(wittPositive, wittHeavy, wittLight));

console.log(JSON.stringify({
  protocol: "nonunit-weight-partition-under-m11/1",
  golayDualWeightSixSupports: weightSixSupports.size,
  wittDesign: { parameters: "S(4,5,11)", blocks: blocks.length, fourSubsets: fourToFifth.size },
  permutationAutomorphismGroup: { name: "M11", order: permutations.length, sharplyFourTransitive: true },
  signedCodeAudit: {
    pureCoordinatePermutationSubgroupOrder: pureGolayPermutationGroup.length,
    warning: "The full M11 preserves the Witt support design. In this signed cyclic realization, elements outside the reported subgroup require monomial coordinate signs and do not preserve the all-one P-code logical vector by bare permutation.",
  },
  selectedPartition: {
    labels: "six +2, two -4, three -1",
    orbitSize: orbit.size,
    stabilizerSize,
    fractionOfAllPartitions: orbit.size + "/" + allPartitions.length,
    exactIntegralLatticeStabilizerSize: genericExactStabilizer,
    coefficientStabilizerInsidePureCodePermutations: genericPureCodeCoefficientStabilizer,
  },
  wittBlockLift: {
    coefficientPartitionStabilizerSize: 12,
    coefficientStabilizerInsidePureCodePermutations: wittPureCodeCoefficientStabilizer,
    nontrivialPureCodeStabilizerCyclesZeroBased: wittPureCodeStabilizerElements.filter((g) => !g.every((x, i) => x === i)).map(cyclesOf),
    exactIntegralLatticeStabilizerSize: wittExactStabilizer,
    generatorHeight: Math.max(...wittG.flat().map(Math.abs)),
  },
  allPartitionOrbitSizes: orbitSizes,
  orbitRepresentatives: representativeInvariants,
  passed: true,
}, null, 2));
