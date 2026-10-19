import assert from "node:assert/strict";

const mod = (x) => ((x % 3) + 3) % 3;
const S = [
  [1, 2, 2, 2, 1, 0, 1, 0, 0, 0, 0],
  [0, 1, 2, 2, 2, 1, 0, 1, 0, 0, 0],
  [2, 1, 2, 0, 1, 2, 0, 0, 1, 0, 0],
  [1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0],
  [2, 2, 2, 1, 0, 1, 0, 0, 0, 0, 1],
];
const standard = Array.from({ length: 5 }, (_, i) =>
  Array.from({ length: 5 }, (_, j) => Number(i === j)));
const ambient = (coordinates) => S[0].map((unused, j) =>
  mod(coordinates.reduce((sum, scalar, i) => sum + scalar * S[i][j], 0)));
const tau = (x, y, z) => {
  const ax = ambient(x), ay = ambient(y), az = ambient(z);
  return mod(ax.reduce((sum, entry, i) => sum + 2 * entry * ay[i] * az[i], 0));
};
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
const inverse3 = (matrix) => {
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
const multiply = (left, right) => left.map((row) => right[0].map((unused, j) =>
  mod(row.reduce((sum, entry, i) => sum + entry * right[i][j], 0))));
const applyMatrix = (row, matrix) => matrix[0].map((unused, j) =>
  mod(row.reduce((sum, entry, i) => sum + entry * matrix[i][j], 0)));
const projectiveKey = (vector) => {
  const first = vector.find((x) => x !== 0);
  assert(first);
  const scalar = first === 1 ? 1 : 2;
  return vector.map((x) => mod(scalar * x)).join("");
};
const projectivePoints = [];
for (let code = 1; code < 3 ** 5; code += 1) {
  let digits = code;
  const vector = [];
  for (let j = 0; j < 5; j += 1) {
    vector.push(digits % 3);
    digits = Math.floor(digits / 3);
  }
  if (vector.find((x) => x !== 0) === 1) projectivePoints.push(vector);
}
assert.equal(projectivePoints.length, 121);

const middleMatrix = (s) => standard.map((x) => standard.map((z) => tau(s, x, z)));
const kernelPoint = (s) => {
  const matrix = middleMatrix(s);
  assert.equal(rank3(matrix), 4);
  const kernel = projectivePoints.filter((candidate) => matrix.every((row) =>
    mod(row.reduce((sum, entry, j) => sum + entry * candidate[j], 0)) === 0));
  assert.equal(kernel.length, 1);
  return kernel[0];
};
const kernelMap = new Map(projectivePoints.map((point) =>
  [projectiveKey(point), projectiveKey(kernelPoint(point))]));
for (const [point, image] of kernelMap) assert.equal(kernelMap.get(image), point);
const fixedLocus = projectivePoints.filter((point) =>
  kernelMap.get(projectiveKey(point)) === projectiveKey(point));
assert.equal(fixedLocus.length, 11);
const twoCycles = (projectivePoints.length - fixedLocus.length) / 2;
assert.equal(twoCycles, 55);
const secantExteriorPoints = new Set();
let secantsWhoseExteriorPairIsKernelCycle = 0;
for (let i = 0; i < fixedLocus.length; i += 1) {
  for (let j = i + 1; j < fixedLocus.length; j += 1) {
    const plus = projectiveKey(fixedLocus[i].map((entry, k) => mod(entry + fixedLocus[j][k])));
    const minus = projectiveKey(fixedLocus[i].map((entry, k) => mod(entry - fixedLocus[j][k])));
    assert(!fixedLocus.some((point) => projectiveKey(point) === plus));
    assert(!fixedLocus.some((point) => projectiveKey(point) === minus));
    secantExteriorPoints.add(plus);
    secantExteriorPoints.add(minus);
    if (kernelMap.get(plus) === minus && kernelMap.get(minus) === plus) {
      secantsWhoseExteriorPairIsKernelCycle += 1;
    }
  }
}
assert.equal(secantExteriorPoints.size, 110);
assert.equal(secantsWhoseExteriorPairIsKernelCycle, 55);

const coordinateFunctionals = Array.from({ length: 11 }, (_, coordinate) =>
  S.map((row) => row[coordinate]));
const coordinateSet = new Set(coordinateFunctionals.map(projectiveKey));
assert.equal(coordinateSet.size, 11);
const fixedSet = new Set(fixedLocus.map(projectiveKey));
assert.notDeepEqual([...fixedSet].sort(), [...coordinateSet].sort());

const sourceBasis = [];
for (const point of fixedLocus) {
  if (rank3([...sourceBasis, point]) > sourceBasis.length) sourceBasis.push(point);
  if (sourceBasis.length === 5) break;
}
assert.equal(sourceBasis.length, 5);
const sourceInverse = inverse3(sourceBasis);
let equivalence = null;
let targetTuplesTested = 0;
const visitTargets = (chosen, remaining) => {
  if (equivalence) return;
  if (chosen.length === 5) {
    if (rank3(chosen) < 5) return;
    targetTuplesTested += 1;
    for (let mask = 0; mask < 2 ** 5 && !equivalence; mask += 1) {
      const scaled = chosen.map((row, i) =>
        row.map((entry) => mod(entry * ((mask >> i) & 1 ? 2 : 1))));
      const matrix = multiply(sourceInverse, scaled);
      const imageSet = new Set(fixedLocus.map((point) =>
        projectiveKey(applyMatrix(point, matrix))));
      if (imageSet.size === coordinateSet.size
        && [...imageSet].every((point) => coordinateSet.has(point))) {
        equivalence = matrix;
      }
    }
    return;
  }
  for (let i = 0; i < remaining.length && !equivalence; i += 1) {
    visitTargets([...chosen, remaining[i]], [
      ...remaining.slice(0, i),
      ...remaining.slice(i + 1),
    ]);
  }
};
visitTargets([], coordinateFunctionals);
assert(equivalence);
assert.equal(rank3(equivalence), 5);

console.log(JSON.stringify({
  protocol: "golay-tensor-code-cocode-duality/1",
  projectivePoints: projectivePoints.length,
  middleActionRank: 4,
  kernelMap: {
    involution: true,
    fixedPoints: fixedLocus.length,
    twoCycles,
  },
  coxeterCapGeometry: {
    capPoints: fixedLocus.length,
    secants: 55,
    distinctExteriorSecantPoints: secantExteriorPoints.size,
    completeCap: secantExteriorPoints.size === 110,
    kernelInvolutionSwapsExteriorPointsOnEverySecant:
      secantsWhoseExteriorPairIsKernelCycle === 55,
  },
  tensorFixedLocus: [...fixedSet].sort(),
  coordinateFunctionalCap: [...coordinateSet].sort(),
  equalInDisplayedBasis: false,
  projectivelyEquivalent: true,
  equivalenceMatrix: equivalence,
  targetTuplesTested,
  interpretation: "The tensor fixed 11-cap is a primal 5a configuration; the coordinate-evaluation 11-cap belongs naturally to the dual of the monomial 5b module. They are projectively equivalent but not canonically identified by the displayed basis.",
  passed: true,
}, null, 2));
