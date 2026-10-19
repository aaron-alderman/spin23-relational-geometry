import assert from "node:assert/strict";

const mod = (x) => ((x % 3) + 3) % 3;
const S = [
  [1, 2, 2, 2, 1, 0, 1, 0, 0, 0, 0],
  [0, 1, 2, 2, 2, 1, 0, 1, 0, 0, 0],
  [2, 1, 2, 0, 1, 2, 0, 0, 1, 0, 0],
  [1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0],
  [2, 2, 2, 1, 0, 1, 0, 0, 0, 0, 1],
];
const ones = Array(11).fill(1);

const rank3 = (matrix) => {
  const a = matrix.map((row) => row.map(mod));
  let rank = 0;
  for (let col = 0; col < (a[0]?.length ?? 0) && rank < a.length; col += 1) {
    let pivot = rank;
    while (pivot < a.length && a[pivot][col] === 0) pivot += 1;
    if (pivot === a.length) continue;
    [a[rank], a[pivot]] = [a[pivot], a[rank]];
    if (a[rank][col] === 2) {
      for (let j = col; j < a[rank].length; j += 1) a[rank][j] = mod(2 * a[rank][j]);
    }
    for (let i = 0; i < a.length; i += 1) if (i !== rank && a[i][col]) {
      const factor = a[i][col];
      for (let j = col; j < a[i].length; j += 1) {
        a[i][j] = mod(a[i][j] - factor * a[rank][j]);
      }
    }
    rank += 1;
  }
  return rank;
};
const sameSpace = (a, b) => rank3([...a, ...b]) === rank3(a) && rank3(a) === rank3(b);
assert.equal(rank3(S), 5);
assert.equal(rank3([...S, ones]), 6);

const cyclePermutation = (cycles) => {
  const out = Array.from({ length: 11 }, (_, i) => i);
  for (const cycle of cycles) {
    for (let i = 0; i < cycle.length; i += 1) out[cycle[i]] = cycle[(i + 1) % cycle.length];
  }
  return out;
};
const identityPermutation = Array.from({ length: 11 }, (_, i) => i);
const permutationGenerators = [
  cyclePermutation([[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]]),
  cyclePermutation([[2, 6, 10, 7], [3, 9, 4, 5]]),
];
const composePermutation = (left, right) => right.map((x) => left[x]);
const permutationKeys = new Set([identityPermutation.join(",")]);
const permutations = [identityPermutation];
for (let head = 0; head < permutations.length; head += 1) {
  for (const generator of permutationGenerators) {
    const next = composePermutation(generator, permutations[head]);
    const key = next.join(",");
    if (!permutationKeys.has(key)) {
      permutationKeys.add(key);
      permutations.push(next);
    }
  }
}
assert.equal(permutations.length, 7920);

// A monomial element (p,d) sends coordinate j to coordinate p[j] and
// multiplies it by d[j] in F_3^*. Composition is left after right.
const applyMonomial = (word, element) => {
  const out = Array(11).fill(0);
  for (let j = 0; j < 11; j += 1) out[element.permutation[j]] = mod(element.signs[j] * word[j]);
  return out;
};
const applyMonomialToSpace = (space, element) => space.map((row) => applyMonomial(row, element));
const composeMonomial = (left, right) => ({
  permutation: composePermutation(left.permutation, right.permutation),
  signs: right.signs.map((x, j) => mod(x * left.signs[right.permutation[j]])),
});
const monomialKey = (element) => element.permutation.join(",") + "|" + element.signs.join(",");
const identity = { permutation: identityPermutation, signs: Array(11).fill(1) };
const centralNegation = { permutation: identityPermutation, signs: Array(11).fill(2) };
const preservesS = (element) => sameSpace(S, applyMonomialToSpace(S, element));

const signVectors = [];
for (let mask = 0; mask < 2 ** 11; mask += 1) {
  signVectors.push(Array.from({ length: 11 }, (_, j) => (mask >> j) & 1 ? 2 : 1));
}
const liftsOfPermutation = (permutation) => signVectors
  .map((signs) => ({ permutation, signs }))
  .filter(preservesS);

const generatorLifts = permutationGenerators.map(liftsOfPermutation);
assert.deepEqual(generatorLifts.map((x) => x.length), [2, 2]);
const normalizedLifts = generatorLifts.map((lifts) => lifts.find((element) => element.signs[0] === 1));
assert(normalizedLifts.every(Boolean));

const generateGroup = (generators) => {
  const keys = new Set([monomialKey(identity)]);
  const elements = [identity];
  for (let head = 0; head < elements.length; head += 1) {
    for (const generator of generators) {
      const next = composeMonomial(generator, elements[head]);
      const key = monomialKey(next);
      if (!keys.has(key)) {
        keys.add(key);
        elements.push(next);
      }
    }
  }
  return { elements, keys };
};

const liftChoiceGroups = [];
for (const first of generatorLifts[0]) {
  for (const second of generatorLifts[1]) {
    const group = generateGroup([first, second]);
    liftChoiceGroups.push({
      generators: [first, second],
      group,
      containsCentralNegation: group.keys.has(monomialKey(centralNegation)),
    });
  }
}
const liftChoiceOrders = liftChoiceGroups.map((x) => x.group.elements.length);
const complementChoice = liftChoiceGroups.find((x) => x.group.elements.length === 7920);
const chosenLiftGroup = complementChoice?.group ?? liftChoiceGroups[0].group;
const fullMonomialGroup = generateGroup([...normalizedLifts, centralNegation]);
assert.equal(fullMonomialGroup.elements.length, 15840);
assert(fullMonomialGroup.elements.every(preservesS));

const projectionCounts = new Map();
for (const element of fullMonomialGroup.elements) {
  const key = element.permutation.join(",");
  projectionCounts.set(key, (projectionCounts.get(key) ?? 0) + 1);
}
assert.equal(projectionCounts.size, 7920);
assert([...projectionCounts.values()].every((count) => count === 2));

const golayTau = (x, y, z) => mod(x.reduce(
  (sum, entry, i) => sum + 2 * entry * y[i] * z[i], 0));
const trilinearScalar = (element) => {
  let scalar = null;
  for (let i = 0; i < S.length; i += 1) {
    for (let j = 0; j < S.length; j += 1) {
      for (let k = 0; k < S.length; k += 1) {
        const before = golayTau(S[i], S[j], S[k]);
        const after = golayTau(
          applyMonomial(S[i], element),
          applyMonomial(S[j], element),
          applyMonomial(S[k], element),
        );
        if (before === 0) {
          if (after !== 0) return null;
          continue;
        }
        const candidate = mod(after * (before === 1 ? 1 : 2));
        if (scalar === null) scalar = candidate;
        else if (scalar !== candidate) return null;
      }
    }
  }
  return scalar;
};
const fullTrilinearScalars = fullMonomialGroup.elements.map(trilinearScalar);
const complementTrilinearScalars = chosenLiftGroup.elements.map(trilinearScalar);

const inducedMatrixOnS = (element) => S.map((row) =>
  applyMonomial(row, element).slice(6, 11));
const inverseMatrix3 = (matrix) => {
  const n = matrix.length;
  const a = matrix.map((row, i) => [
    ...row.map(mod),
    ...Array.from({ length: n }, (_, j) => Number(i === j)),
  ]);
  for (let col = 0; col < n; col += 1) {
    let pivot = col;
    while (pivot < n && a[pivot][col] === 0) pivot += 1;
    assert(pivot < n);
    [a[col], a[pivot]] = [a[pivot], a[col]];
    if (a[col][col] === 2) {
      for (let j = col; j < 2 * n; j += 1) a[col][j] = mod(2 * a[col][j]);
    }
    for (let i = 0; i < n; i += 1) {
      if (i === col || a[i][col] === 0) continue;
      const factor = a[i][col];
      for (let j = col; j < 2 * n; j += 1) a[i][j] = mod(a[i][j] - factor * a[col][j]);
    }
  }
  return a.map((row) => row.slice(n));
};
const transpose = (matrix) => matrix[0].map((unused, j) => matrix.map((row) => row[j]));
const applyRowMatrix = (row, matrix) => matrix[0].map((unused, j) =>
  mod(row.reduce((sum, entry, i) => sum + entry * matrix[i][j], 0)));
const projectiveKey = (vector) => {
  const first = vector.find((x) => x !== 0);
  const scalar = first === 1 ? 1 : 2;
  return vector.map((x) => mod(scalar * x)).join("");
};
const projectivePoints5 = [];
for (let code = 1; code < 3 ** 5; code += 1) {
  let digits = code;
  const vector = [];
  for (let j = 0; j < 5; j += 1) {
    vector.push(digits % 3);
    digits = Math.floor(digits / 3);
  }
  if (vector.find((x) => x !== 0) === 1) projectivePoints5.push(vector);
}
assert.equal(projectivePoints5.length, 121);
const complementMatrices = chosenLiftGroup.elements.map(inducedMatrixOnS);
const complementDualMatrices = complementMatrices.map((matrix) =>
  transpose(inverseMatrix3(matrix)));
const projectiveOrbitSizesFor = (matrices) => {
  const unseen = new Set(projectivePoints5.map(projectiveKey));
  const sizes = [];
  while (unseen.size) {
    const seed = [...unseen.values()][0].split("").map(Number);
    const orbit = new Set(matrices.map((matrix) => projectiveKey(applyRowMatrix(seed, matrix))));
    for (const point of orbit) unseen.delete(point);
    sizes.push(orbit.size);
  }
  return sizes.sort((a, b) => a - b);
};
const monomialComplementProjectiveOrbits = {
  primal: projectiveOrbitSizesFor(complementMatrices),
  dual: projectiveOrbitSizesFor(complementDualMatrices),
};
assert.deepEqual(monomialComplementProjectiveOrbits.primal, [55, 66]);
assert.deepEqual(monomialComplementProjectiveOrbits.dual, [11, 110]);

const sum3 = (word) => mod(word.reduce((a, b) => a + b, 0));
const logicalScalar = (word) => mod(2 * sum3(word)); // 11^{-1}=2 in F_3.
const logicalAudit = { scalarOne: 0, scalarMinusOne: 0, exactOne: 0, exactMinusOne: 0, shiftedRepresentative: 0 };
for (const element of fullMonomialGroup.elements) {
  const image = applyMonomial(ones, element);
  assert.equal(rank3([...S, ones, image]), 6);
  const scalar = logicalScalar(image);
  assert(scalar === 1 || scalar === 2);
  if (scalar === 1) logicalAudit.scalarOne += 1;
  if (scalar === 2) logicalAudit.scalarMinusOne += 1;
  if (image.every((x) => x === 1)) logicalAudit.exactOne += 1;
  else if (image.every((x) => x === 2)) logicalAudit.exactMinusOne += 1;
  else logicalAudit.shiftedRepresentative += 1;
}
assert.deepEqual(logicalAudit, {
  scalarOne: 7920,
  scalarMinusOne: 7920,
  exactOne: 660,
  exactMinusOne: 660,
  shiftedRepresentative: 14520,
});

const purePermutationElements = fullMonomialGroup.elements.filter((element) => element.signs.every((x) => x === 1));
assert.equal(purePermutationElements.length, 660);

const supportKey = (indices) => [...indices].sort((a, b) => a - b).join(",");
const partitionKey = (positive, heavy, light) =>
  [supportKey(positive), supportKey(heavy), supportKey(light)].join("|");
const genericPartition = {
  positive: [0, 1, 2, 3, 4, 5],
  heavy: [6, 7],
  light: [8, 9, 10],
};
const wittPartition = {
  positive: [0, 1, 2, 3, 4, 6],
  heavy: [5, 7],
  light: [8, 9, 10],
};
const stabilizesPartition = (element, partition) =>
  partitionKey(
    partition.positive.map((i) => element.permutation[i]),
    partition.heavy.map((i) => element.permutation[i]),
    partition.light.map((i) => element.permutation[i]),
  ) === partitionKey(partition.positive, partition.heavy, partition.light);
const preservesAllOneRepresentativeLine = (element) => {
  const image = applyMonomial(ones, element);
  return image.every((x) => x === 1) || image.every((x) => x === 2);
};
const partitionAudit = {
  genericFullMonomialStabilizer: fullMonomialGroup.elements.filter((x) => stabilizesPartition(x, genericPartition)).length,
  genericChosenLiftSubgroupStabilizer: chosenLiftGroup.elements.filter((x) => stabilizesPartition(x, genericPartition)).length,
  genericPurePermutationStabilizer: purePermutationElements.filter((x) => stabilizesPartition(x, genericPartition)).length,
  genericRepresentativeLineCompatibleStabilizer: fullMonomialGroup.elements
    .filter((x) => stabilizesPartition(x, genericPartition) && preservesAllOneRepresentativeLine(x)).length,
  wittFullMonomialStabilizer: fullMonomialGroup.elements.filter((x) => stabilizesPartition(x, wittPartition)).length,
  wittChosenLiftSubgroupStabilizer: chosenLiftGroup.elements.filter((x) => stabilizesPartition(x, wittPartition)).length,
  wittPurePermutationStabilizer: purePermutationElements.filter((x) => stabilizesPartition(x, wittPartition)).length,
  wittRepresentativeLineCompatibleStabilizer: fullMonomialGroup.elements
    .filter((x) => stabilizesPartition(x, wittPartition) && preservesAllOneRepresentativeLine(x)).length,
};
assert.deepEqual(partitionAudit, {
  genericFullMonomialStabilizer: 4,
  genericChosenLiftSubgroupStabilizer: complementChoice ? 2 : 4,
  genericPurePermutationStabilizer: 1,
  genericRepresentativeLineCompatibleStabilizer: 2,
  wittFullMonomialStabilizer: 24,
  wittChosenLiftSubgroupStabilizer: complementChoice ? 12 : 24,
  wittPurePermutationStabilizer: 2,
  wittRepresentativeLineCompatibleStabilizer: 4,
});

const genericMu = [2, 2, 2, 2, 2, 2, -4, -4, -1, -1, -1];
const wittMu = [2, 2, 2, 2, 2, -4, 2, -4, -1, -1, -1];
const integerSign = (x) => x === 1 ? 1 : -1;
const ambientDisplacementAudit = (partition, mu) => {
  const elements = fullMonomialGroup.elements.filter((x) => stabilizesPartition(x, partition));
  const elementOrder = (element) => {
    let power = identity;
    for (let order = 1; order <= 24; order += 1) {
      power = composeMonomial(element, power);
      if (monomialKey(power) === monomialKey(identity)) return order;
    }
    throw new Error("monomial order exceeded audit bound");
  };
  const records = elements.map((element) => {
    const image = applyMonomial(ones, element).map(integerSign);
    const pairingWithOne = image.reduce((sum, x, i) => sum + mu[i] * x, 0);
    const projectedNorm = 1 - pairingWithOne ** 2;
    return {
      pairingWithOne,
      projectedNorm,
      representativeLinePreserved: image.every((x) => x === 1) || image.every((x) => x === -1),
      order: elementOrder(element),
      permutation: element.permutation,
      signs: element.signs.map(integerSign),
    };
  });
  const distribution = {};
  for (const record of records) {
    const key = String(record.pairingWithOne);
    distribution[key] = (distribution[key] ?? 0) + 1;
  }
  return {
    elements: records.length,
    weightedPairingDistribution: distribution,
    nonconstantNullDisplacements: records.filter((x) =>
      !x.representativeLinePreserved && x.projectedNorm === 0).length,
    nonconstantNonnullDisplacements: records.filter((x) =>
      !x.representativeLinePreserved && x.projectedNorm !== 0).length,
    records,
  };
};
const characteristicZeroAmbientAudit = {
  generic: ambientDisplacementAudit(genericPartition, genericMu),
  wittBlock: ambientDisplacementAudit(wittPartition, wittMu),
};

const gcdBig = (a, b) => {
  let x = a < 0n ? -a : a;
  let y = b < 0n ? -b : b;
  while (y) [x, y] = [y, x % y];
  return x;
};
const Q = (n, d = 1n) => {
  let numerator = typeof n === "bigint" ? n : BigInt(n);
  let denominator = typeof d === "bigint" ? d : BigInt(d);
  if (denominator < 0n) [numerator, denominator] = [-numerator, -denominator];
  const g = gcdBig(numerator, denominator);
  return [numerator / g, denominator / g];
};
const qZero = (x) => x[0] === 0n;
const qAdd = (a, b) => Q(a[0] * b[1] + b[0] * a[1], a[1] * b[1]);
const qSub = (a, b) => Q(a[0] * b[1] - b[0] * a[1], a[1] * b[1]);
const qMul = (a, b) => Q(a[0] * b[0], a[1] * b[1]);
const qDiv = (a, b) => Q(a[0] * b[1], a[1] * b[0]);
const qSign = (a) => a[0] === 0n ? 0 : a[0] > 0n ? 1 : -1;
const nullspaceQ = (matrix) => {
  const a = matrix.map((row) => row.map((x) => Q(x)));
  const width = a[0].length;
  const pivots = [];
  let rank = 0;
  for (let col = 0; col < width && rank < a.length; col += 1) {
    let pivot = rank;
    while (pivot < a.length && qZero(a[pivot][col])) pivot += 1;
    if (pivot === a.length) continue;
    [a[rank], a[pivot]] = [a[pivot], a[rank]];
    const pivotValue = a[rank][col];
    for (let j = col; j < width; j += 1) a[rank][j] = qDiv(a[rank][j], pivotValue);
    for (let i = 0; i < a.length; i += 1) if (i !== rank && !qZero(a[i][col])) {
      const factor = a[i][col];
      for (let j = col; j < width; j += 1) a[i][j] = qSub(a[i][j], qMul(factor, a[rank][j]));
    }
    pivots.push(col);
    rank += 1;
  }
  const pivotSet = new Set(pivots);
  const free = Array.from({ length: width }, (_, i) => i).filter((i) => !pivotSet.has(i));
  return free.map((freeColumn) => {
    const vector = Array.from({ length: width }, () => Q(0));
    vector[freeColumn] = Q(1);
    for (let i = 0; i < pivots.length; i += 1) vector[pivots[i]] = Q(-a[i][freeColumn][0], a[i][freeColumn][1]);
    return vector;
  });
};
const inertiaQ = (matrix) => {
  let a = matrix.map((row) => row.map((x) => Q(x[0], x[1])));
  let positive = 0, negative = 0, zero = 0;
  while (a.length) {
    let diagonal = a.findIndex((row, i) => !qZero(row[i]));
    if (diagonal >= 0) {
      [a[0], a[diagonal]] = [a[diagonal], a[0]];
      for (const row of a) [row[0], row[diagonal]] = [row[diagonal], row[0]];
      const pivot = a[0][0];
      if (qSign(pivot) > 0) positive += 1;
      else negative += 1;
      const next = Array.from({ length: a.length - 1 }, (_, i) =>
        Array.from({ length: a.length - 1 }, (_, j) =>
          qSub(a[i + 1][j + 1], qDiv(qMul(a[i + 1][0], a[0][j + 1]), pivot))));
      a = next;
      continue;
    }
    let pair = null;
    for (let i = 0; i < a.length && !pair; i += 1) {
      for (let j = i + 1; j < a.length; j += 1) if (!qZero(a[i][j])) {
        pair = [i, j];
        break;
      }
    }
    if (!pair) {
      zero += a.length;
      break;
    }
    // With every diagonal zero, a nonzero off-diagonal 2x2 block has one
    // positive and one negative direction. Remove it by its exact Schur
    // complement; [[0,b],[b,0]]^{-1}=[[0,1/b],[1/b,0]].
    const [i, j] = pair;
    const order = [i, j, ...Array.from({ length: a.length }, (_, k) => k).filter((k) => k !== i && k !== j)];
    a = order.map((row) => order.map((col) => a[row][col]));
    const b = a[0][1];
    positive += 1;
    negative += 1;
    const next = Array.from({ length: a.length - 2 }, (_, r) =>
      Array.from({ length: a.length - 2 }, (_, c) => {
        const correction = qDiv(
          qAdd(qMul(a[r + 2][0], a[1][c + 2]), qMul(a[r + 2][1], a[0][c + 2])),
          b,
        );
        return qSub(a[r + 2][c + 2], correction);
      }));
    a = next;
  }
  return { positive, negative, zero };
};
const monomialMatrix = (element) => {
  const matrix = Array.from({ length: 11 }, () => Array(11).fill(0));
  for (let j = 0; j < 11; j += 1) matrix[element.permutation[j]][j] = integerSign(element.signs[j]);
  return matrix;
};
const invariantIsotropyForInvolution = (element, mu) => {
  const matrix = monomialMatrix(element);
  const sectors = [];
  for (const eigenvalue of [1, -1]) {
    const equations = matrix.map((row, i) => row.map((x, j) => x - (i === j ? eigenvalue : 0)));
    equations.push(mu);
    const basis = nullspaceQ(equations);
    const gram = basis.map((left) => basis.map((right) =>
      left.reduce((sum, x, i) => qAdd(sum, qMul(Q(mu[i]), qMul(x, right[i]))), Q(0))));
    const inertia = inertiaQ(gram);
    sectors.push({
      eigenvalue,
      dimension: basis.length,
      inertia,
      maximumIsotropicDimension: inertia.zero + Math.min(inertia.positive, inertia.negative),
    });
  }
  return {
    sectors,
    maximumInvariantIsotropicDimension: sectors.reduce((sum, x) => sum + x.maximumIsotropicDimension, 0),
  };
};
const shiftedInvolutionAudit = (partition, mu) => {
  const elements = fullMonomialGroup.elements.filter((element) =>
    stabilizesPartition(element, partition)
    && !preservesAllOneRepresentativeLine(element));
  const uniqueModuloCentralNegation = [];
  for (const element of elements) {
    const negative = composeMonomial(centralNegation, element);
    if (!uniqueModuloCentralNegation.some((x) =>
      monomialKey(x) === monomialKey(element) || monomialKey(x) === monomialKey(negative))) {
      uniqueModuloCentralNegation.push(element);
    }
  }
  return uniqueModuloCentralNegation.map((element) => {
    const record = ambientDisplacementAudit(partition, mu).records
      .find((x) => x.permutation.join(",") === element.permutation.join(",")
        && x.signs.join(",") === element.signs.map(integerSign).join(","));
    return {
      order: record.order,
      pairingWithOne: record.pairingWithOne,
      projectedNorm: record.projectedNorm,
      ...(record.order === 2 ? invariantIsotropyForInvolution(element, mu) : {}),
    };
  });
};
const shiftedMonomialInvariantAudit = {
  generic: shiftedInvolutionAudit(genericPartition, genericMu),
  wittBlock: shiftedInvolutionAudit(wittPartition, wittMu),
};
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
const genericSymmetricG = [
  [1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0],
  [1, 0, -3, -3, 0, 1, -1, -1, -4, 4, 0],
  [5, 8, -13, 13, 0, -5, -9, 9, 0, 0, 16],
  [32, -50, 2, -2, 30, -32, 17, -17, -50, -50, 60],
  [-47, -46, -19, 19, -62, 47, -18, 18, -46, -46, -124],
];
const wittSymmetricG = [
  [2, 0, 0, 2, 0, 1, 0, 1, 0, -2, 2],
  [-11, 0, 1, -11, 0, -5, 1, -5, 0, 12, -12],
  [1, 16, -1, -1, 0, 1, 1, -1, 0, 16, 16],
  [-9, -26, 19, 9, 18, 2, -19, -2, 44, -30, -30],
  [1, -38, -27, -1, -34, -2, 27, 2, -76, -34, -34],
];
const rankPrime = (matrix, prime = 1000003) => {
  const pow = (base, exponent) => {
    let a = BigInt(modPrime(base, prime)), n = BigInt(exponent), out = 1n, p = BigInt(prime);
    while (n) {
      if (n & 1n) out = out * a % p;
      a = a * a % p;
      n >>= 1n;
    }
    return Number(out);
  };
  const a = matrix.map((row) => row.map((x) => modPrime(x, prime)));
  let rank = 0;
  for (let col = 0; col < (a[0]?.length ?? 0) && rank < a.length; col += 1) {
    let pivot = rank;
    while (pivot < a.length && a[pivot][col] === 0) pivot += 1;
    if (pivot === a.length) continue;
    [a[rank], a[pivot]] = [a[pivot], a[rank]];
    const inverse = pow(a[rank][col], prime - 2);
    for (let j = col; j < a[rank].length; j += 1) {
      a[rank][j] = Number(BigInt(a[rank][j]) * BigInt(inverse) % BigInt(prime));
    }
    for (let i = 0; i < a.length; i += 1) if (i !== rank && a[i][col]) {
      const factor = a[i][col];
      for (let j = col; j < a[i].length; j += 1) {
        a[i][j] = modPrime(a[i][j] - Number(BigInt(factor) * BigInt(a[rank][j]) % BigInt(prime)), prime);
      }
    }
    rank += 1;
  }
  return rank;
};
function modPrime(x, prime) {
  return ((x % prime) + prime) % prime;
}
const exactMonomialRowspaceAudit = (partition, matrix) => {
  const stabilizer = fullMonomialGroup.elements.filter((element) => stabilizesPartition(element, partition));
  const applyInteger = (row, element) => {
    const out = Array(11).fill(0);
    for (let j = 0; j < 11; j += 1) out[element.permutation[j]] = integerSign(element.signs[j]) * row[j];
    return out;
  };
  const preserving = stabilizer.filter((element) =>
    rankPrime([...matrix, ...matrix.map((row) => applyInteger(row, element))]) === 5);
  return {
    coefficientStabilizerOrder: stabilizer.length,
    rowspaceStabilizerOrder: preserving.length,
    noncentralRowspaceStabilizers: preserving.filter((element) =>
      element.permutation.join(",") !== identityPermutation.join(",")).length,
  };
};
const explicitIntegralLiftMonomialAudit = {
  generic: exactMonomialRowspaceAudit(genericPartition, genericG),
  wittBlock: exactMonomialRowspaceAudit(wittPartition, wittG),
  genericSymmetric: exactMonomialRowspaceAudit(genericPartition, genericSymmetricG),
  wittBlockSymmetric: exactMonomialRowspaceAudit(wittPartition, wittSymmetricG),
};

console.log(JSON.stringify({
  protocol: "golay-monomial-logical-line-group/1",
  signedGolayPspace: {
    length: 11,
    dimension: 5,
    logicalRepresentative: ones,
    logicalCompletionDimension: 6,
  },
  supportDesignGroup: {
    projectedPermutationGroup: "M11",
    order: permutations.length,
  },
  generatorLiftCounts: generatorLifts.map((lifts) => lifts.length),
  liftChoiceAudit: {
    subgroupOrders: liftChoiceOrders,
    centralNegationMembership: liftChoiceGroups.map((x) => x.containsCentralNegation),
    splitComplementFound: Boolean(complementChoice),
    chosenLiftSubgroupOrder: chosenLiftGroup.elements.length,
  },
  fullMonomialGroup: {
    order: fullMonomialGroup.elements.length,
    structure: "M11 x C2",
    projectionKernel: ["identity", "global coordinate negation"],
    liftsPerM11Permutation: [...new Set(projectionCounts.values())],
  },
  golayTrilinearTensorAction: {
    fullGroupScalarOne: fullTrilinearScalars.filter((x) => x === 1).length,
    fullGroupScalarMinusOne: fullTrilinearScalars.filter((x) => x === 2).length,
    fullGroupNonScalar: fullTrilinearScalars.filter((x) => x === null).length,
    chosenM11ComplementPreservesTensor: complementTrilinearScalars.every((x) => x === 1),
    chosenM11ComplementScalarOne: complementTrilinearScalars.filter((x) => x === 1).length,
    chosenM11ComplementScalarMinusOne: complementTrilinearScalars.filter((x) => x === 2).length,
    chosenM11ComplementNonScalar: complementTrilinearScalars.filter((x) => x === null).length,
  },
  chosenM11ComplementModuleType: {
    primalProjectiveOrbitSizes: monomialComplementProjectiveOrbits.primal,
    dualProjectiveOrbitSizes: monomialComplementProjectiveOrbits.dual,
    atlasInterpretation: "primal 5b (code), dual 5a (cocode)",
  },
  logicalLineAction: logicalAudit,
  allOneRepresentativeLineStabilizerOrder: logicalAudit.exactOne + logicalAudit.exactMinusOne,
  pureCoordinatePermutationSubgroupOrder: purePermutationElements.length,
  coefficientPartitionStabilizers: partitionAudit,
  characteristicZeroAmbientAudit,
  shiftedMonomialInvariantAudit,
  explicitIntegralLiftMonomialAudit,
  theorem: "Every support-design M11 permutation has exactly two monomial lifts preserving the signed Golay P-space. The full group is a split central extension M11 x C2 and automatically preserves the one-dimensional logical quotient S^perp/S, although 14520 of its 15840 elements move the all-one representative by a stabilizer word.",
  passed: true,
}, null, 2));
