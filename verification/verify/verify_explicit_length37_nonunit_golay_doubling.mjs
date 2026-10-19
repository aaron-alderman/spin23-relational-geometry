import assert from "node:assert/strict";

let mu = [2, 2, 2, 2, 2, 2, -4, -4, -1, -1, -1];
let G = [
  [8, 10, 1, 1, 1, 1, 9, 1, 2, 0, 2],
  [-2, -4, -4, -2, -2, -4, -3, -3, -4, -4, -4],
  [3, 5, 4, 2, 4, 6, 4, 5, 4, 4, 4],
  [7, -9, 6, -10, -2, -4, -3, -2, 14, -18, 0],
  [10, -6, 1, -1, -7, 9, 0, 2, 0, -14, 18],
];
let pLatticeSymmetry = null;
const mathieuOrbit = process.argv.includes("--witt-block") ? "witt-block" : "generic";
if (mathieuOrbit === "witt-block") {
  mu = [2, 2, 2, 2, 2, -4, 2, -4, -1, -1, -1];
  G = [
    [1, 3, 4, 2, 0, 2, 2, 1, 4, 4, 4],
    [-9, -9, 0, -2, 1, -9, -3, -1, -4, -2, 2],
    [10, 10, 9, 7, 9, 8, 1, 10, 8, 10, 2],
    [11, -5, 9, -7, 0, 1, 4, 3, 20, -12, 0],
    [14, -2, 7, 9, -1, 8, 7, 6, 8, -10, 14],
  ];
}
const monomialSymmetric = process.argv.includes("--monomial-symmetric");
if (monomialSymmetric) {
  G = mathieuOrbit === "generic" ? [
      [1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0],
      [1, 0, -3, -3, 0, 1, -1, -1, -4, 4, 0],
      [5, 8, -13, 13, 0, -5, -9, 9, 0, 0, 16],
      [32, -50, 2, -2, 30, -32, 17, -17, -50, -50, 60],
      [-47, -46, -19, 19, -62, 47, -18, 18, -46, -46, -124],
    ] : [
      [2, 0, 0, 2, 0, 1, 0, 1, 0, -2, 2],
      [-11, 0, 1, -11, 0, -5, 1, -5, 0, 12, -12],
      [1, 16, -1, -1, 0, 1, 1, -1, 0, 16, 16],
      [-9, -26, 19, 9, 18, 2, -19, -2, 44, -30, -30],
      [1, -38, -27, -1, -34, -2, 27, 2, -76, -34, -34],
    ];
  const symmetryPermutation = mathieuOrbit === "generic"
    ? [5, 1, 3, 2, 4, 0, 7, 6, 9, 8, 10]
    : [3, 1, 6, 0, 4, 7, 2, 5, 8, 10, 9];
  const symmetrySigns = [1, -1, 1, 1, -1, 1, 1, 1, -1, -1, -1];
  pLatticeSymmetry = { permutation: symmetryPermutation, signs: symmetrySigns };
  const applySymmetry = (row) => {
    const out = Array(11).fill(0);
    for (let j = 0; j < 11; j += 1) out[symmetryPermutation[j]] = symmetrySigns[j] * row[j];
    return out;
  };
  for (let i = 0; i < G.length; i += 1) {
    assert.deepEqual(
      applySymmetry(G[i]).map((x) => x === 0 ? 0 : x),
      G[i].map((x) => {
        const value = i < 2 ? x : -x;
        return value === 0 ? 0 : value;
      }),
    );
  }
}
const T = [
  [-1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1],
  [0, -1, -1, -1, 1, 1, 1, 0, 0, 0, 1, -1, 0, 0, 0],
  [-1, 1, 0, 0, 0, -1, -1, 1, 1, 0, 0, 1, -1, 0, 0],
  [0, -1, 1, 0, -1, 1, 0, 0, -1, 1, 0, 0, 1, -1, 0],
  [0, 0, -1, 1, 0, -1, 1, -1, 1, 0, 0, 0, 0, 1, -1],
];
const y = T[0];
const seedStabilizers = T.slice(1);
const zeros11 = Array(11).fill(0);
const zeros15 = Array(15).fill(0);
const ones11 = Array(11).fill(1);
const logical = [...ones11.map((x) => -x), ...ones11, ...y];
const paired = G.map((row) => [...row, ...row.map((x) => -x), ...zeros15]);
const linking = [...zeros11, ...ones11, ...y];
const embeddedSeedStabilizers = seedStabilizers.map((row) => [...zeros11, ...zeros11, ...row]);
const stabilizers = [...paired, linking, ...embeddedSeedStabilizers];
const H = [logical, ...stabilizers];
const coefficients = [...mu, ...mu, ...Array(15).fill(1)];

assert.equal(coefficients.length, 37);
assert.equal(H.length, 11);
assert(H.every((row) => row.length === 37));
assert.equal(mu.reduce((a, b) => a + b, 0), 1);
assert.equal(y.reduce((a, b) => a + b ** 3, 0), -1);

const cubic = (a, b, c) => a.reduce((sum, x, i) => sum + coefficients[i] * x * b[i] * c[i], 0);
for (let i = 0; i < H.length; i += 1) {
  for (let j = 0; j < H.length; j += 1) {
    for (let k = 0; k < H.length; k += 1) {
      assert.equal(cubic(H[i], H[j], H[k]), i === 0 && j === 0 && k === 0 ? -1 : 0);
    }
  }
}

const mod = (x) => ((x % 3) + 3) % 3;
const rank3 = (matrix) => {
  if (!matrix.length || !matrix[0].length) return 0;
  const a = matrix.map((row) => row.map(mod));
  let rank = 0;
  for (let col = 0; col < a[0].length && rank < a.length; col += 1) {
    let pivot = rank;
    while (pivot < a.length && a[pivot][col] === 0) pivot += 1;
    if (pivot === a.length) continue;
    [a[rank], a[pivot]] = [a[pivot], a[rank]];
    if (a[rank][col] === 2) for (let j = col; j < a[rank].length; j += 1) a[rank][j] = mod(2 * a[rank][j]);
    for (let i = 0; i < a.length; i += 1) if (i !== rank && a[i][col] !== 0) {
      const factor = a[i][col];
      for (let j = col; j < a[i].length; j += 1) a[i][j] = mod(a[i][j] - factor * a[rank][j]);
    }
    rank += 1;
  }
  return rank;
};
let doubledMonomialSymmetryAudit = null;
if (monomialSymmetric) {
  const seedWeights = Array.from({ length: 15 }, (_, column) => {
    const q = [T[0][column]];
    for (let i = 1; i < 5; i += 1) q.push(q[i - 1] - 2 * T[i][column]);
    assert(q.every((x) => x === 1 || x === -1));
    return q;
  });
  const weightKey = (weight) => weight.join(",");
  const weightToColumn = new Map(seedWeights.map((weight, i) => [weightKey(weight), i]));
  const permutations5 = [];
  const buildPermutation = (chosen) => {
    if (chosen.length === 5) {
      permutations5.push(chosen);
      return;
    }
    for (let i = 0; i < 5; i += 1) if (!chosen.includes(i)) buildPermutation([...chosen, i]);
  };
  buildPermutation([]);
  const seedPermutations = permutations5.map((permutation) => seedWeights.map((weight) => {
    const transformedWeight = permutation.map((source) => weight[source]);
    const target = weightToColumn.get(weightKey(transformedWeight));
    assert.notEqual(target, undefined);
    return target;
  }));
  assert.equal(new Set(seedPermutations.map((x) => x.join(","))).size, 120);

  const transform = (
    row, swapGolayBlocks, firstUseH, firstScalar, secondUseH, secondScalar, seedPermutation, seedScalar,
  ) => {
    const out = Array(37).fill(0);
    for (let j = 0; j < 11; j += 1) {
      const firstTarget = firstUseH ? pLatticeSymmetry.permutation[j] : j;
      const secondTarget = secondUseH ? pLatticeSymmetry.permutation[j] : j;
      out[(swapGolayBlocks ? 11 : 0) + firstTarget] =
        firstScalar * (firstUseH ? pLatticeSymmetry.signs[j] : 1) * row[j];
      out[(swapGolayBlocks ? 0 : 11) + secondTarget] =
        secondScalar * (secondUseH ? pLatticeSymmetry.signs[j] : 1) * row[11 + j];
    }
    for (let j = 0; j < 15; j += 1) {
      out[22 + seedPermutation[j]] = seedScalar * row[22 + j];
    }
    return out;
  };
  const sameRowspace3 = (left, right) =>
    rank3([...left, ...right]) === rank3(left) && rank3(left) === rank3(right);
  const preservingChoices = [];
  for (const swapGolayBlocks of [false, true]) {
  for (const firstUseH of [false, true]) {
    for (const firstScalar of [1, -1]) {
      for (const secondUseH of [false, true]) {
        for (const secondScalar of [1, -1]) {
          for (let seedPermutationIndex = 0; seedPermutationIndex < seedPermutations.length; seedPermutationIndex += 1) {
            const seedPermutation = seedPermutations[seedPermutationIndex];
            for (const seedScalar of [1, -1]) {
            const transformedStabilizers = stabilizers.map((row) =>
              transform(
                row, swapGolayBlocks, firstUseH, firstScalar, secondUseH, secondScalar, seedPermutation, seedScalar));
            const transformedH = H.map((row) =>
              transform(
                row, swapGolayBlocks, firstUseH, firstScalar, secondUseH, secondScalar, seedPermutation, seedScalar));
            const stabilizerSpacePreserved = sameRowspace3(stabilizers, transformedStabilizers);
            const fullSpacePreserved = sameRowspace3(H, transformedH);
            let logicalScalar = null;
            if (stabilizerSpacePreserved && fullSpacePreserved) {
              const transformedLogical = transform(
                logical, swapGolayBlocks, firstUseH, firstScalar,
                secondUseH, secondScalar, seedPermutation, seedScalar);
              for (const scalar of [1, 2]) {
                const difference = transformedLogical.map((x, i) => mod(x - scalar * logical[i]));
                if (rank3([...stabilizers, difference]) === rank3(stabilizers)) logicalScalar = scalar;
              }
            }
            if (stabilizerSpacePreserved || fullSpacePreserved) {
              preservingChoices.push({
                firstScalar,
                swapGolayBlocks,
                firstUseH,
                secondScalar,
                secondUseH,
                seedPermutationIndex,
                seedScalar,
                stabilizerSpacePreserved,
                fullSpacePreserved,
                logicalScalar,
              });
            }
          }
          }
        }
      }
    }
  }
  }
  const fullyPreserving = preservingChoices.filter((x) =>
    x.stabilizerSpacePreserved && x.fullSpacePreserved);
  doubledMonomialSymmetryAudit = {
    seedAutomorphismCandidates: seedPermutations.length * 2,
    blockwiseCandidatesTested: 2 * 2 * 2 * 2 * 2 * seedPermutations.length * 2,
    fullyPreservingCount: fullyPreserving.length,
    fullyPreservingWithAnyGolayInvolution: fullyPreserving
      .filter((x) => x.firstUseH || x.secondUseH).length,
    stabilizerPreservingWithAnyGolayInvolution: preservingChoices
      .filter((x) => x.stabilizerSpacePreserved && (x.firstUseH || x.secondUseH)).length,
    fullSpacePreservingWithAnyGolayInvolution: preservingChoices
      .filter((x) => x.fullSpacePreserved && (x.firstUseH || x.secondUseH)).length,
    logicalScalarCounts: {
      plus: fullyPreserving.filter((x) => x.logicalScalar === 1).length,
      minus: fullyPreserving.filter((x) => x.logicalScalar === 2).length,
    },
  };
}

const combinations = (length, size) => {
  const out = [];
  const visit = (start, chosen) => {
    if (chosen.length === size) {
      out.push(chosen);
      return;
    }
    for (let i = start; i < length; i += 1) visit(i + 1, [...chosen, i]);
  };
  visit(0, []);
  return out;
};

let distance = null;
let witnessSupport = null;
for (let weight = 1; weight <= 5 && distance === null; weight += 1) {
  for (const support of combinations(37, weight)) {
    const restrictedA = stabilizers.map((row) => support.map((j) => row[j]));
    const restrictedH = [restrictedA[0].map((_, j) => logical[support[j]]), ...restrictedA];
    if (rank3(restrictedH) > rank3(restrictedA)) {
      distance = weight;
      witnessSupport = support;
      break;
    }
  }
}
assert.equal(distance, 5);

console.log(JSON.stringify({
  protocol: "explicit-length37-nonunit-golay-doubling/1",
  mathieuOrbit,
  monomialSymmetric,
  monomialSymmetryAudit: monomialSymmetric ? {
    order: 2,
    rowEigenvalueMultiplicities: { plus: 2, minus: 3 },
    exact: true,
  } : null,
  pLattice: {
    coefficients: mu,
    N: 1,
    generatorMatrix: G,
    rationalDistance: 5,
    qutritDistance: 5,
  },
  seed: {
    length: 15,
    generatorMatrix: T,
    logicalExponent: -1,
    distance: 3,
  },
  doubling: {
    kappa: 1,
    compatibility: "N*kappa^3+lambda_T=1-1=0",
    length: 37,
    generatorRows: H.length,
    logicalRow: logical,
    stabilizerRows: stabilizers,
    coefficients,
    exactCubicAudit: "all 11^3 ordered row triples checked; only L,L,L is nonzero, with value -1",
    qutritDistance: distance,
    firstWeightFiveLogicalSupportZeroBased: witnessSupport,
    parameters: "[[37,1,5]]_3",
    doubledMonomialSymmetryAudit,
  },
  passed: true,
}, null, 2));
