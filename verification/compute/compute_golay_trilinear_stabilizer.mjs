import assert from "node:assert/strict";

const mod = (x) => ((x % 3) + 3) % 3;
const mu = [2, 2, 2, 2, 2, 2, -4, -4, -1, -1, -1].map(mod);
const S = [
  [1, 2, 2, 2, 1, 0, 1, 0, 0, 0, 0],
  [0, 1, 2, 2, 2, 1, 0, 1, 0, 0, 0],
  [2, 1, 2, 0, 1, 2, 0, 0, 1, 0, 0],
  [1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0],
  [2, 2, 2, 1, 0, 1, 0, 0, 0, 0, 1],
];

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
    for (let i = 0; i < a.length; i += 1) {
      if (i === rank || a[i][col] === 0) continue;
      const factor = a[i][col];
      for (let j = col; j < a[i].length; j += 1) {
        a[i][j] = mod(a[i][j] - factor * a[rank][j]);
      }
    }
    rank += 1;
  }
  return rank;
};

const ambient = (coordinates) => S[0].map((_, j) =>
  mod(coordinates.reduce((sum, scalar, i) => sum + scalar * S[i][j], 0)));
const tauAmbient = (x, y, z) => mod(x.reduce(
  (sum, entry, i) => sum + mu[i] * entry * y[i] * z[i], 0));
const tau = (x, y, z) => tauAmbient(ambient(x), ambient(y), ambient(z));

const standard = Array.from({ length: 5 }, (_, i) =>
  Array.from({ length: 5 }, (_, j) => Number(i === j)));
const vectors = [];
for (let code = 1; code < 3 ** 5; code += 1) {
  let digits = code;
  const vector = [];
  for (let j = 0; j < 5; j += 1) {
    vector.push(digits % 3);
    digits = Math.floor(digits / 3);
  }
  vectors.push(vector);
}

const target = Array.from({ length: 5 }, (_, i) =>
  Array.from({ length: 5 }, (_, j) =>
    Array.from({ length: 5 }, (_, k) => tau(standard[i], standard[j], standard[k]))));

const compatibleAtDepth = (images, depth) => {
  for (let i = 0; i <= depth; i += 1) {
    for (let j = i; j <= depth; j += 1) {
      for (let k = j; k <= depth; k += 1) {
        if (k !== depth) continue;
        if (tau(images[i], images[j], images[k]) !== target[i][j][k]) return false;
      }
    }
  }
  return true;
};

const automorphisms = [];
const nodeCounts = Array(6).fill(0);
const search = (images) => {
  const depth = images.length;
  nodeCounts[depth] += 1;
  if (depth === 5) {
    automorphisms.push(images.map((row) => [...row]));
    return;
  }
  for (const candidate of vectors) {
    const next = [...images, candidate];
    if (rank3(next) !== next.length) continue;
    if (!compatibleAtDepth(next, depth)) continue;
    search(next);
  }
};
search([]);

for (const images of automorphisms) {
  assert.equal(rank3(images), 5);
  for (let i = 0; i < 5; i += 1) {
    for (let j = 0; j < 5; j += 1) {
      for (let k = 0; k < 5; k += 1) {
        assert.equal(tau(images[i], images[j], images[k]), target[i][j][k]);
      }
    }
  }
}

const projectivePoint = (v) => {
  const first = v.find((x) => x !== 0);
  const scalar = first === 1 ? 1 : 2;
  return v.map((x) => mod(scalar * x)).join("");
};
const projectiveOrbits = (() => {
  const representatives = [...new Set(vectors.map(projectivePoint))];
  const unseen = new Set(representatives);
  const orbits = [];
  while (unseen.size) {
    const seed = unseen.values().next().value;
    const seedVector = [...seed].map(Number);
    const orbit = new Set();
    for (const images of automorphisms) {
      const image = Array(5).fill(0);
      for (let i = 0; i < 5; i += 1) {
        for (let j = 0; j < 5; j += 1) image[j] = mod(image[j] + seedVector[i] * images[i][j]);
      }
      orbit.add(projectivePoint(image));
    }
    for (const point of orbit) unseen.delete(point);
    orbits.push([...orbit].sort());
  }
  return orbits;
})();
const distinguishedOrbit = projectiveOrbits.find((orbit) => orbit.length === 11);
assert(distinguishedOrbit);
const coordinateFunctionals = Array.from({ length: 11 }, (_, coordinate) =>
  S.map((row) => row[coordinate]));
const coordinateFunctionalProjectiveSet = [...new Set(
  coordinateFunctionals.map(projectivePoint))].sort();
const distinguishedProjectiveSet = [...distinguishedOrbit].sort();
const coordinateFunctionalsEqualDistinguishedOrbit =
  JSON.stringify(coordinateFunctionalProjectiveSet) === JSON.stringify(distinguishedProjectiveSet);
const middleActionMatrix = (coordinates) =>
  standard.map((left) => standard.map((right) => tau(coordinates, left, right)));
const middleActionKernelPoint = (coordinates) => {
  const matrix = middleActionMatrix(coordinates);
  const kernelVectors = vectors.filter((candidate) => matrix.every((row) =>
    mod(row.reduce((sum, entry, j) => sum + entry * candidate[j], 0)) === 0));
  const projectiveKernel = [...new Set(kernelVectors.map(projectivePoint))];
  assert.equal(projectiveKernel.length, 1);
  return projectiveKernel[0];
};
const projectiveOrbitMiddleActionRanks = projectiveOrbits.map((orbit) => {
  const counts = {};
  for (const point of orbit) {
    const value = rank3(middleActionMatrix([...point].map(Number)));
    counts[value] = (counts[value] ?? 0) + 1;
  }
  return { orbitSize: orbit.length, rankCounts: counts };
});
const kernelMapAudit = projectiveOrbits.map((orbit) => {
  const image = orbit.map((point) => middleActionKernelPoint([...point].map(Number)));
  const imageSet = [...new Set(image)].sort();
  const imageByPoint = new Map(orbit.map((point, index) => [point, image[index]]));
  const unseen = new Set(orbit);
  const cycleLengths = [];
  while (unseen.size) {
    const start = unseen.values().next().value;
    let current = start;
    let length = 0;
    do {
      unseen.delete(current);
      current = imageByPoint.get(current);
      length += 1;
    } while (current !== start);
    cycleLengths.push(length);
  }
  return {
    sourceOrbitSize: orbit.length,
    imageSize: imageSet.length,
    imageOrbitSize: projectiveOrbits.find((candidate) =>
      candidate.includes(imageSet[0]))?.length,
    fixedPoints: orbit.filter((point, index) => point === image[index]).length,
    imageContainedInSourceOrbit: imageSet.every((point) => orbit.includes(point)),
    cycleLengths: cycleLengths.sort((a, b) => a - b),
  };
});
const distinguishedIndex = new Map(distinguishedOrbit.map((point, i) => [point, i]));
const applyLinear = (coordinates, images) => {
  const image = Array(5).fill(0);
  for (let i = 0; i < 5; i += 1) {
    for (let j = 0; j < 5; j += 1) {
      image[j] = mod(image[j] + coordinates[i] * images[i][j]);
    }
  }
  return image;
};
const distinguishedPermutations = automorphisms.map((images) =>
  distinguishedOrbit.map((point) => {
    const image = projectivePoint(applyLinear([...point].map(Number), images));
    assert(distinguishedIndex.has(image));
    return distinguishedIndex.get(image);
  }));
const identityPermutationKey = distinguishedOrbit.map((_, i) => i).join(",");
const faithfulKernelOrder = distinguishedPermutations.filter(
  (permutation) => permutation.join(",") === identityPermutationKey).length;
const orderedTupleOrbitSizes = [];
for (let length = 1; length <= 4; length += 1) {
  const orbit = new Set(distinguishedPermutations.map(
    (permutation) => permutation.slice(0, length).join(",")));
  orderedTupleOrbitSizes.push(orbit.size);
}
assert.equal(faithfulKernelOrder, 1);
assert.deepEqual(orderedTupleOrbitSizes, [11, 110, 990, 7920]);
const composePermutation = (left, right) => right.map((x) => left[x]);
const permutationOrder = (permutation) => {
  let current = distinguishedOrbit.map((unused, i) => i);
  for (let order = 1; order <= 100; order += 1) {
    current = composePermutation(permutation, current);
    if (current.join(",") === identityPermutationKey) return order;
  }
  return null;
};
const generatePermutationGroup = (generators, stopAfter = 7920) => {
  const identityPermutation = distinguishedOrbit.map((unused, i) => i);
  const elements = [identityPermutation];
  const keys = new Set([identityPermutationKey]);
  for (let head = 0; head < elements.length; head += 1) {
    for (const generator of generators) {
      const next = composePermutation(generator, elements[head]);
      const nextKey = next.join(",");
      if (keys.has(nextKey)) continue;
      keys.add(nextKey);
      elements.push(next);
      if (elements.length > stopAfter) return elements;
    }
  }
  return elements;
};
const orderElevenIndex = distinguishedPermutations.findIndex(
  (permutation) => permutationOrder(permutation) === 11);
assert(orderElevenIndex >= 0);
let secondGeneratorIndex = -1;
for (let i = 0; i < distinguishedPermutations.length; i += 1) {
  if (permutationOrder(distinguishedPermutations[i]) !== 4) continue;
  const generated = generatePermutationGroup([
    distinguishedPermutations[orderElevenIndex],
    distinguishedPermutations[i],
  ]);
  if (generated.length === 7920) {
    secondGeneratorIndex = i;
    break;
  }
}
assert(secondGeneratorIndex >= 0);
const intrinsicM11Generators = [
  automorphisms[orderElevenIndex],
  automorphisms[secondGeneratorIndex],
];

const symmetricCoordinates = [];
for (let i = 0; i < 5; i += 1) {
  for (let j = i; j < 5; j += 1) symmetricCoordinates.push([i, j]);
}
const symmetricCoordinateIndex = new Map(
  symmetricCoordinates.map(([i, j], index) => [i + "," + j, index]));
const invariantEquationBasis = [];
const addEquation = (source) => {
  const row = source.map(mod);
  for (const pivotRow of invariantEquationBasis) {
    const pivot = pivotRow.findIndex((x) => x !== 0);
    if (row[pivot] === 0) continue;
    const factor = row[pivot];
    for (let j = pivot; j < row.length; j += 1) {
      row[j] = mod(row[j] - factor * pivotRow[j]);
    }
  }
  const pivot = row.findIndex((x) => x !== 0);
  if (pivot < 0) return;
  if (row[pivot] === 2) {
    for (let j = pivot; j < row.length; j += 1) row[j] = mod(2 * row[j]);
  }
  for (const pivotRow of invariantEquationBasis) {
    if (pivotRow[pivot] === 0) continue;
    const factor = pivotRow[pivot];
    for (let j = pivot; j < row.length; j += 1) {
      pivotRow[j] = mod(pivotRow[j] - factor * row[j]);
    }
  }
  invariantEquationBasis.push(row);
  invariantEquationBasis.sort(
    (left, right) => left.findIndex((x) => x !== 0) - right.findIndex((x) => x !== 0));
};
for (const images of automorphisms) {
  for (let i = 0; i < 5; i += 1) {
    for (let j = i; j < 5; j += 1) {
      const equation = Array(symmetricCoordinates.length).fill(0);
      for (let a = 0; a < 5; a += 1) {
        for (let b = 0; b < 5; b += 1) {
          const key = a <= b ? a + "," + b : b + "," + a;
          const index = symmetricCoordinateIndex.get(key);
          equation[index] = mod(equation[index] + images[i][a] * images[j][b]);
        }
      }
      const targetIndex = symmetricCoordinateIndex.get(i + "," + j);
      equation[targetIndex] = mod(equation[targetIndex] - 1);
      addEquation(equation);
    }
  }
  if (invariantEquationBasis.length === symmetricCoordinates.length) break;
}
const invariantSymmetricFormDimension =
  symmetricCoordinates.length - invariantEquationBasis.length;
assert.equal(invariantSymmetricFormDimension, 0);

const symmetricEquationBasisFor = (elements) => {
  const basis = [];
  const add = (source) => {
    const row = source.map(mod);
    for (const pivotRow of basis) {
      const pivot = pivotRow.findIndex((x) => x !== 0);
      if (row[pivot] === 0) continue;
      const factor = row[pivot];
      for (let j = pivot; j < row.length; j += 1) row[j] = mod(row[j] - factor * pivotRow[j]);
    }
    const pivot = row.findIndex((x) => x !== 0);
    if (pivot < 0) return;
    if (row[pivot] === 2) {
      for (let j = pivot; j < row.length; j += 1) row[j] = mod(2 * row[j]);
    }
    for (const pivotRow of basis) {
      if (pivotRow[pivot] === 0) continue;
      const factor = pivotRow[pivot];
      for (let j = pivot; j < row.length; j += 1) {
        pivotRow[j] = mod(pivotRow[j] - factor * row[j]);
      }
    }
    basis.push(row);
    basis.sort((left, right) =>
      left.findIndex((x) => x !== 0) - right.findIndex((x) => x !== 0));
  };
  for (const images of elements) {
    for (let i = 0; i < 5; i += 1) {
      for (let j = i; j < 5; j += 1) {
        const equation = Array(symmetricCoordinates.length).fill(0);
        for (let a = 0; a < 5; a += 1) {
          for (let b = 0; b < 5; b += 1) {
            const key = a <= b ? a + "," + b : b + "," + a;
            const index = symmetricCoordinateIndex.get(key);
            equation[index] = mod(equation[index] + images[i][a] * images[j][b]);
          }
        }
        const targetIndex = symmetricCoordinateIndex.get(i + "," + j);
        equation[targetIndex] = mod(equation[targetIndex] - 1);
        add(equation);
      }
    }
  }
  return basis;
};
const nullspaceFromRref = (rref, width) => {
  const pivots = rref.map((row) => row.findIndex((x) => x !== 0));
  const pivotSet = new Set(pivots);
  const free = Array.from({ length: width }, (_, i) => i).filter((i) => !pivotSet.has(i));
  return free.map((freeColumn) => {
    const vector = Array(width).fill(0);
    vector[freeColumn] = 1;
    for (let i = 0; i < pivots.length; i += 1) vector[pivots[i]] = mod(-rref[i][freeColumn]);
    return vector;
  });
};
const symmetricMatrix = (coordinates) => {
  const matrix = Array.from({ length: 5 }, () => Array(5).fill(0));
  for (let index = 0; index < symmetricCoordinates.length; index += 1) {
    const [i, j] = symmetricCoordinates[index];
    matrix[i][j] = coordinates[index];
    matrix[j][i] = coordinates[index];
  }
  return matrix;
};
const pointStabilizer = automorphisms.filter((_, index) => distinguishedPermutations[index][0] === 0);
assert.equal(pointStabilizer.length, 720);
const pointStabilizerEquations = symmetricEquationBasisFor(pointStabilizer);
const pointStabilizerFormBasis = nullspaceFromRref(
  pointStabilizerEquations, symmetricCoordinates.length);
let pointStabilizerMaximumFormRank = 0;
for (let code = 1; code < 3 ** pointStabilizerFormBasis.length; code += 1) {
  let digits = code;
  const coordinates = Array(symmetricCoordinates.length).fill(0);
  for (const basisVector of pointStabilizerFormBasis) {
    const scalar = digits % 3;
    digits = Math.floor(digits / 3);
    for (let j = 0; j < coordinates.length; j += 1) {
      coordinates[j] = mod(coordinates[j] + scalar * basisVector[j]);
    }
  }
  pointStabilizerMaximumFormRank = Math.max(
    pointStabilizerMaximumFormRank, rank3(symmetricMatrix(coordinates)));
}
const stabilizerFormChain = [];
for (let fixedPoints = 1; fixedPoints <= 3; fixedPoints += 1) {
  const subgroup = automorphisms.filter((_, index) =>
    Array.from({ length: fixedPoints }, (unused, point) =>
      distinguishedPermutations[index][point] === point).every(Boolean));
  const equations = symmetricEquationBasisFor(subgroup);
  const formBasis = nullspaceFromRref(equations, symmetricCoordinates.length);
  let maximumRank = null;
  if (formBasis.length <= 10) {
    maximumRank = 0;
    for (let code = 1; code < 3 ** formBasis.length; code += 1) {
      let digits = code;
      const coordinates = Array(symmetricCoordinates.length).fill(0);
      for (const basisVector of formBasis) {
        const scalar = digits % 3;
        digits = Math.floor(digits / 3);
        for (let j = 0; j < coordinates.length; j += 1) {
          coordinates[j] = mod(coordinates[j] + scalar * basisVector[j]);
        }
      }
      maximumRank = Math.max(maximumRank, rank3(symmetricMatrix(coordinates)));
    }
  }
  stabilizerFormChain.push({
    fixedDistinguishedPoints: fixedPoints,
    subgroupOrder: subgroup.length,
    invariantDimension: formBasis.length,
    maximumRank,
  });
}
stabilizerFormChain.push({
  fixedDistinguishedPoints: 4,
  subgroupOrder: 1,
  invariantDimension: symmetricCoordinates.length,
  maximumRank: 5,
});

console.log(JSON.stringify({
  protocol: "golay-trilinear-stabilizer/1",
  field: 3,
  dimension: 5,
  nonzeroVectors: vectors.length,
  searchNodeCountsByDepth: nodeCounts,
  automorphismOrder: automorphisms.length,
  projectiveOrbitSizes: projectiveOrbits.map((orbit) => orbit.length).sort((a, b) => a - b),
  intrinsicElevenPointConfiguration: {
    points: distinguishedProjectiveSet,
    coordinateFunctionals: coordinateFunctionalProjectiveSet,
    equalsCoordinateFunctionalsUnderBasisIdentification:
      coordinateFunctionalsEqualDistinguishedOrbit,
    middleActionRankDistributions: projectiveOrbitMiddleActionRanks,
    middleActionKernelMap: kernelMapAudit,
  },
  distinguishedElevenPointAction: {
    faithfulKernelOrder,
    orderedTupleOrbitSizes,
    stabilizerChainOrders: orderedTupleOrbitSizes.map((size) => automorphisms.length / size),
    sharplyFourTransitive: orderedTupleOrbitSizes[3] === automorphisms.length,
    identification: "M11 in its sharply four-transitive degree-eleven action",
    generatorOrders: [
      permutationOrder(distinguishedPermutations[orderElevenIndex]),
      permutationOrder(distinguishedPermutations[secondGeneratorIndex]),
    ],
    generators: intrinsicM11Generators,
  },
  invariantSymmetricForms: {
    ambientDimension: symmetricCoordinates.length,
    equationRank: invariantEquationBasis.length,
    invariantDimension: invariantSymmetricFormDimension,
    conclusion: "The intrinsic M11 preserves no nonzero symmetric bilinear form on this five-dimensional F3 module.",
  },
  distinguishedPointStabilizerForms: {
    subgroupOrder: pointStabilizer.length,
    invariantDimension: pointStabilizerFormBasis.length,
    maximumRank: pointStabilizerMaximumFormRank,
  },
  distinguishedFlagStabilizerForms: stabilizerFormChain,
  containsIdentity: automorphisms.some((images) =>
    JSON.stringify(images) === JSON.stringify(standard)),
  containsCentralNegation: automorphisms.some((images) =>
    JSON.stringify(images) === JSON.stringify(standard.map((row) => row.map((x) => mod(-x))))),
  passed: true,
}, null, 2));
