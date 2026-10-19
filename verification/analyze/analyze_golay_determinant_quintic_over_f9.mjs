import assert from "node:assert/strict";

const mod3 = (x) => ((x % 3) + 3) % 3;
// F_9 = F_3[u]/(u^2+1), encoded as a+3b for a+bu.
const F = {
  add: (x, y) => mod3((x % 3) + (y % 3))
    + 3 * mod3(Math.floor(x / 3) + Math.floor(y / 3)),
  neg: (x) => mod3(-(x % 3)) + 3 * mod3(-Math.floor(x / 3)),
  mul: (x, y) => {
    const a = x % 3, b = Math.floor(x / 3);
    const c = y % 3, d = Math.floor(y / 3);
    return mod3(a * c + 2 * b * d) + 3 * mod3(a * d + b * c);
  },
  pow: (x, exponent) => {
    let out = 1, base = x, power = exponent;
    while (power) {
      if (power & 1) out = F.mul(out, base);
      base = F.mul(base, base);
      power >>= 1;
    }
    return out;
  },
  inv: (x) => {
    assert.notEqual(x, 0);
    return F.pow(x, 7);
  },
};
const S = [
  [1, 2, 2, 2, 1, 0, 1, 0, 0, 0, 0],
  [0, 1, 2, 2, 2, 1, 0, 1, 0, 0, 0],
  [2, 1, 2, 0, 1, 2, 0, 0, 1, 0, 0],
  [1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0],
  [2, 2, 2, 1, 0, 1, 0, 0, 0, 0, 1],
];
const tauBasis = (a, b, c) => mod3(S[a].reduce(
  (sum, entry, i) => sum + 2 * entry * S[b][i] * S[c][i], 0));
const tensor = Array.from({ length: 5 }, (_, a) =>
  Array.from({ length: 5 }, (_, i) =>
    Array.from({ length: 5 }, (_, j) => tauBasis(a, i, j))));
const middleMatrix = (point) => Array.from({ length: 5 }, (_, i) =>
  Array.from({ length: 5 }, (_, j) => point.reduce(
    (sum, coordinate, a) => F.add(sum, F.mul(coordinate, tensor[a][i][j])), 0)));
const rref = (matrix) => {
  const a = matrix.map((row) => [...row]);
  const pivots = [];
  let rank = 0;
  for (let col = 0; col < (a[0]?.length ?? 0) && rank < a.length; col += 1) {
    let pivot = rank;
    while (pivot < a.length && a[pivot][col] === 0) pivot += 1;
    if (pivot === a.length) continue;
    [a[rank], a[pivot]] = [a[pivot], a[rank]];
    const inverse = F.inv(a[rank][col]);
    for (let j = col; j < a[rank].length; j += 1) {
      a[rank][j] = F.mul(a[rank][j], inverse);
    }
    for (let i = 0; i < a.length; i += 1) {
      if (i === rank || a[i][col] === 0) continue;
      const factor = a[i][col];
      for (let j = col; j < a[i].length; j += 1) {
        a[i][j] = F.add(a[i][j], F.neg(F.mul(factor, a[rank][j])));
      }
    }
    pivots.push(col);
    rank += 1;
  }
  return { matrix: a, pivots, rank };
};
const kernelLine = (matrix) => {
  const reduced = rref(matrix);
  if (reduced.rank !== 4) return null;
  const pivotSet = new Set(reduced.pivots);
  const free = Array.from({ length: 5 }, (_, i) => i).find((i) => !pivotSet.has(i));
  const vector = Array(5).fill(0);
  vector[free] = 1;
  for (let i = 0; i < reduced.pivots.length; i += 1) {
    vector[reduced.pivots[i]] = F.neg(reduced.matrix[i][free]);
  }
  return vector;
};
const kernelBasis = (matrix) => {
  const reduced = rref(matrix);
  const pivotSet = new Set(reduced.pivots);
  const free = Array.from({ length: 5 }, (_, i) => i).filter((i) => !pivotSet.has(i));
  return free.map((freeColumn) => {
    const vector = Array(5).fill(0);
    vector[freeColumn] = 1;
    for (let i = 0; i < reduced.pivots.length; i += 1) {
      vector[reduced.pivots[i]] = F.neg(reduced.matrix[i][freeColumn]);
    }
    return vector;
  });
};
const normalizeProjective = (point) => {
  const first = point.find((x) => x !== 0);
  assert.notEqual(first, undefined);
  const inverse = F.inv(first);
  return point.map((x) => F.mul(x, inverse));
};
const key = (point) => normalizeProjective(point).join(",");
const projectivePoints = [];
for (let first = 0; first < 5; first += 1) {
  const tailLength = 4 - first;
  for (let code = 0; code < 9 ** tailLength; code += 1) {
    let digits = code;
    const point = Array(5).fill(0);
    point[first] = 1;
    for (let j = first + 1; j < 5; j += 1) {
      point[j] = digits % 9;
      digits = Math.floor(digits / 9);
    }
    projectivePoints.push(point);
  }
}
assert.equal(projectivePoints.length, (9 ** 5 - 1) / 8);

const analyses = new Map();
for (const point of projectivePoints) {
  const matrix = middleMatrix(point);
  const reduced = rref(matrix);
  analyses.set(key(point), {
    point,
    rank: reduced.rank,
    kernel: reduced.rank === 4 ? normalizeProjective(kernelLine(matrix)) : null,
  });
}
const intrinsicM11Generators = [
  [
    [0, 1, 0, 0, 0],
    [1, 0, 1, 0, 0],
    [2, 0, 0, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0],
  ],
  [
    [2, 0, 0, 0, 0],
    [2, 1, 0, 0, 0],
    [2, 2, 0, 1, 0],
    [2, 0, 2, 2, 2],
    [2, 1, 1, 0, 0],
  ],
];
const multiplyMatrices3 = (left, right) => left.map((row) => right[0].map((unused, j) =>
  mod3(row.reduce((sum, entry, i) => sum + entry * right[i][j], 0))));
const matrixKey = (matrix) => matrix.flat().join(",");
const identityMatrix5 = Array.from({ length: 5 }, (_, i) =>
  Array.from({ length: 5 }, (_, j) => Number(i === j)));
const intrinsicM11Matrices = [identityMatrix5];
const intrinsicM11MatrixKeys = new Set([matrixKey(identityMatrix5)]);
for (let head = 0; head < intrinsicM11Matrices.length; head += 1) {
  for (const generator of intrinsicM11Generators) {
    const next = multiplyMatrices3(intrinsicM11Matrices[head], generator);
    const nextKey = matrixKey(next);
    if (intrinsicM11MatrixKeys.has(nextKey)) continue;
    intrinsicM11MatrixKeys.add(nextKey);
    intrinsicM11Matrices.push(next);
  }
}
assert.equal(intrinsicM11Matrices.length, 7920);
const matrixOrder3 = (matrix) => {
  let current = identityMatrix5;
  for (let order = 1; order <= 100; order += 1) {
    current = multiplyMatrices3(current, matrix);
    if (matrixKey(current) === matrixKey(identityMatrix5)) return order;
  }
  return null;
};
const applyGenerator = (point, matrix) => normalizeProjective(
  matrix[0].map((unused, j) => point.reduce(
    (sum, coordinate, i) => F.add(sum, F.mul(coordinate, matrix[i][j])), 0)));
const unseenOrbitPoints = new Set(analyses.keys());
const m11Orbits = [];
while (unseenOrbitPoints.size) {
  const seedKey = unseenOrbitPoints.values().next().value;
  const orbitKeys = [seedKey];
  const orbitSet = new Set([seedKey]);
  for (let head = 0; head < orbitKeys.length; head += 1) {
    const point = analyses.get(orbitKeys[head]).point;
    for (const generator of intrinsicM11Generators) {
      const imageKey = key(applyGenerator(point, generator));
      if (orbitSet.has(imageKey)) continue;
      orbitSet.add(imageKey);
      orbitKeys.push(imageKey);
    }
  }
  for (const pointKey of orbitSet) unseenOrbitPoints.delete(pointKey);
  const ranks = [...new Set(orbitKeys.map((pointKey) => analyses.get(pointKey).rank))];
  assert.equal(ranks.length, 1);
  m11Orbits.push({ keys: orbitKeys, rank: ranks[0] });
}
const orbitIndexByPoint = new Map();
m11Orbits.forEach((orbit, index) => {
  for (const pointKey of orbit.keys) orbitIndexByPoint.set(pointKey, index);
});
const frobeniusIncidenceByOrbit = {};
let frobeniusIncidencePoints = 0;
for (const [pointKey, analysis] of analyses) {
  const frobenius = analysis.point.map((coordinate) => F.pow(coordinate, 3));
  const incident = middleMatrix(analysis.point).every((row) =>
    row.reduce((sum, entry, j) => F.add(sum, F.mul(entry, frobenius[j])), 0) === 0);
  if (!incident) continue;
  frobeniusIncidencePoints += 1;
  const orbitIndex = orbitIndexByPoint.get(pointKey);
  frobeniusIncidenceByOrbit[orbitIndex] = (frobeniusIncidenceByOrbit[orbitIndex] ?? 0) + 1;
}
const m11OrbitRecords = m11Orbits.map((orbit, index) => {
  const kernelTargetCounts = {};
  const frobeniusTargetCounts = {};
  let frobeniusFixedPoints = 0;
  let kernelEqualsFrobenius = 0;
  if (orbit.rank === 4) {
    for (const pointKey of orbit.keys) {
      const target = key(analyses.get(pointKey).kernel);
      const targetOrbit = orbitIndexByPoint.get(target);
      kernelTargetCounts[targetOrbit] = (kernelTargetCounts[targetOrbit] ?? 0) + 1;
    }
  }
  for (const pointKey of orbit.keys) {
    const point = analyses.get(pointKey).point;
    const frobeniusKey = key(point.map((coordinate) => F.pow(coordinate, 3)));
    const targetOrbit = orbitIndexByPoint.get(frobeniusKey);
    frobeniusTargetCounts[targetOrbit] = (frobeniusTargetCounts[targetOrbit] ?? 0) + 1;
    if (frobeniusKey === pointKey) frobeniusFixedPoints += 1;
    if (orbit.rank === 4 && frobeniusKey === key(analyses.get(pointKey).kernel)) {
      kernelEqualsFrobenius += 1;
    }
  }
  return {
    id: index,
    rank: orbit.rank,
    size: orbit.keys.length,
    stabilizerOrder: 7920 / orbit.keys.length,
    kernelTargetCounts,
    frobeniusTargetCounts,
    frobeniusFixedPoints,
    kernelEqualsFrobenius,
  };
}).sort((left, right) => left.rank - right.rank || left.size - right.size);
const invertibleOrbitStabilizers = m11Orbits.filter((orbit) => orbit.rank === 5).map((orbit) => {
  const representative = analyses.get(orbit.keys[0]).point;
  const stabilizer = intrinsicM11Matrices.filter((matrix) =>
    key(applyGenerator(representative, matrix)) === key(representative));
  assert.equal(stabilizer.length, 7920 / orbit.keys.length);
  const orderDistribution = {};
  for (const element of stabilizer) {
    const order = matrixOrder3(element);
    orderDistribution[order] = (orderDistribution[order] ?? 0) + 1;
  }
  return {
    orbitSize: orbit.keys.length,
    stabilizerOrder: stabilizer.length,
    elementOrderDistribution: orderDistribution,
    structure: stabilizer.length === 4
      ? ((orderDistribution[4] ?? 0) > 0 ? "C4" : "C2 x C2")
      : "C2",
  };
}).sort((left, right) => left.orbitSize - right.orbitSize);
const reciprocal220 = m11Orbits.find((orbit) => orbit.rank === 4 && orbit.keys.length === 220);
assert(reciprocal220);
const kleinPackets = new Set();
let kernelFrobeniusCommutingPoints = 0;
let kernelFrobeniusProductFixedPoints = 0;
for (const pointKey of reciprocal220.keys) {
  const analysis = analyses.get(pointKey);
  const frobeniusKey = key(analysis.point.map((coordinate) => F.pow(coordinate, 3)));
  const kernelKey = key(analysis.kernel);
  const kernelAfterFrobenius = key(analyses.get(frobeniusKey).kernel);
  const frobeniusAfterKernel = key(
    analyses.get(kernelKey).point.map((coordinate) => F.pow(coordinate, 3)));
  if (kernelAfterFrobenius === frobeniusAfterKernel) kernelFrobeniusCommutingPoints += 1;
  if (kernelAfterFrobenius === pointKey) kernelFrobeniusProductFixedPoints += 1;
  kleinPackets.add([pointKey, frobeniusKey, kernelKey, kernelAfterFrobenius].sort().join("|"));
}
assert.equal(kernelFrobeniusCommutingPoints, 220);
assert.equal(kernelFrobeniusProductFixedPoints, 0);
assert.equal(kleinPackets.size, 55);
const singularOrbit = m11Orbits.find((orbit) => orbit.rank === 3 && orbit.keys.length === 110);
assert(singularOrbit);
const singularPartner = new Map();
const singularKernelRankProfiles = {};
for (const pointKey of singularOrbit.keys) {
  const basis = kernelBasis(middleMatrix(analyses.get(pointKey).point));
  assert.equal(basis.length, 2);
  const kernelPoints = [basis[1]];
  for (let scalar = 0; scalar < 9; scalar += 1) {
    kernelPoints.push(basis[0].map((entry, i) => F.add(entry, F.mul(scalar, basis[1][i]))));
  }
  const kernelKeys = [...new Set(kernelPoints.map(key))];
  assert.equal(kernelKeys.length, 10);
  const profile = {};
  const rankThreeTargets = [];
  for (const targetKey of kernelKeys) {
    const rank = analyses.get(targetKey).rank;
    profile[rank] = (profile[rank] ?? 0) + 1;
    if (rank === 3) rankThreeTargets.push(targetKey);
  }
  const profileKey = JSON.stringify(profile);
  singularKernelRankProfiles[profileKey] = (singularKernelRankProfiles[profileKey] ?? 0) + 1;
  assert.equal(rankThreeTargets.length, 1);
  singularPartner.set(pointKey, rankThreeTargets[0]);
}
let singularPartnerFixedPoints = 0;
let singularPartnerEqualsFrobenius = 0;
const singularPartnerCycles = new Set();
for (const pointKey of singularOrbit.keys) {
  const partner = singularPartner.get(pointKey);
  assert.equal(singularPartner.get(partner), pointKey);
  if (partner === pointKey) singularPartnerFixedPoints += 1;
  const point = analyses.get(pointKey).point;
  const frobeniusKey = key(point.map((coordinate) => F.pow(coordinate, 3)));
  if (partner === frobeniusKey) singularPartnerEqualsFrobenius += 1;
  singularPartnerCycles.add([pointKey, partner].sort().join("|"));
}
const rankCounts = {};
for (const analysis of analyses.values()) {
  rankCounts[analysis.rank] = (rankCounts[analysis.rank] ?? 0) + 1;
}
let rankFourMapsInsideQuintic = 0;
let rankFourSquaresToIdentity = 0;
let rankFourMapsToLowerRank = 0;
const rankFourCycleKeys = new Set();
let rankFourFixedPoints = 0;
const lowerRankPreimages = new Map();
for (const [pointKey, analysis] of analyses) {
  if (analysis.rank !== 4) continue;
  const image = analyses.get(key(analysis.kernel));
  assert(image);
  if (image.rank <= 4) rankFourMapsInsideQuintic += 1;
  if (image.rank < 4) {
    rankFourMapsToLowerRank += 1;
    const imageKey = key(analysis.kernel);
    lowerRankPreimages.set(imageKey, (lowerRankPreimages.get(imageKey) ?? 0) + 1);
    continue;
  }
  const second = key(image.kernel);
  if (second === pointKey) rankFourSquaresToIdentity += 1;
  if (key(analysis.kernel) === pointKey) rankFourFixedPoints += 1;
  rankFourCycleKeys.add([pointKey, key(analysis.kernel)].sort().join("|"));
}
const lowerRankPreimageDistribution = {};
for (const count of lowerRankPreimages.values()) {
  lowerRankPreimageDistribution[count] = (lowerRankPreimageDistribution[count] ?? 0) + 1;
}

console.log(JSON.stringify({
  protocol: "golay-determinant-quintic-over-f9/1",
  field: "F9=F3[u]/(u^2+1)",
  projectivePoints: projectivePoints.length,
  rankCounts,
  intrinsicM11Orbits: m11OrbitRecords,
  frobeniusIncidenceLocus: {
    equation: "tau(s,F(s),-)=0",
    points: frobeniusIncidencePoints,
    orbitCounts: frobeniusIncidenceByOrbit,
  },
  invertibleOrbitStabilizers,
  conjugationVersusKernelInvolution: {
    frobeniusFixedProjectivePoints: 121,
    kernelFixedProjectivePointsOverF9: 11,
    reciprocal220Orbit: {
      commutingPoints: kernelFrobeniusCommutingPoints,
      productFixedPoints: kernelFrobeniusProductFixedPoints,
      freeKleinFourPackets: kleinPackets.size,
      conclusion: "Frobenius conjugation and the relational kernel involution are distinct commuting involutions; on the 220-orbit they generate a free C2 x C2 action, not C4.",
    },
  },
  rankThreeKernelLines: {
    points: singularOrbit.keys.length,
    rankProfileDistribution: singularKernelRankProfiles,
    uniqueRankThreePartner: true,
    partnerFixedPoints: singularPartnerFixedPoints,
    partnerTwoCycles: singularPartnerCycles.size,
    partnerEqualsFrobeniusPoints: singularPartnerEqualsFrobenius,
  },
  quinticRationalPoints: projectivePoints.length - (rankCounts[5] ?? 0),
  rankFourKernelCorrespondence: {
    domainPoints: rankCounts[4] ?? 0,
    mapsInsideQuintic: rankFourMapsInsideQuintic,
    mapsToLowerRank: rankFourMapsToLowerRank,
    squaresToIdentity: rankFourSquaresToIdentity,
    fixedPoints: rankFourFixedPoints,
    twoCycles: (rankFourSquaresToIdentity - rankFourFixedPoints) / 2,
    unorderedRankFourPairs: rankFourCycleKeys.size,
    lowerRankImagePoints: lowerRankPreimages.size,
    lowerRankPreimageDistribution,
  },
  passed: true,
}, null, 2));
