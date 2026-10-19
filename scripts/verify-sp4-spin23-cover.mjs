#!/usr/bin/env node

// Exact integer certificate for the five-dimensional orthogonal representation
// Sp(4,R) -> SO_0(3,2), equivalent by signature convention to SO_0(2,3).
// No floating-point tolerance or external dependency is used.

const add = (a, b) => a.map((row, i) => row.map((x, j) => x + b[i][j]));
const scale = (k, a) => a.map((row) => row.map((x) => k * x));
const transpose = (a) => a[0].map((_, j) => a.map((row) => row[j]));
const mul = (a, b) =>
  a.map((row) =>
    b[0].map((_, j) => row.reduce((sum, x, k) => sum + x * b[k][j], 0)),
  );
const equal = (a, b) => a.every((row, i) => row.every((x, j) => x === b[i][j]));
const zero = (n, m = n) => Array.from({ length: n }, () => Array(m).fill(0));
const flat = (a) => a.flat();

const rank = (rows) => {
  const a = rows.map((row) => row.map((x) => BigInt(x)));
  let r = 0;
  for (let c = 0; c < a[0].length && r < a.length; c += 1) {
    const pivot = a.findIndex((row, i) => i >= r && row[c] !== 0n);
    if (pivot < 0) continue;
    [a[r], a[pivot]] = [a[pivot], a[r]];
    for (let i = 0; i < a.length; i += 1) {
      if (i === r || a[i][c] === 0n) continue;
      const p = a[r][c];
      const q = a[i][c];
      a[i] = a[i].map((x, j) => p * x - q * a[r][j]);
    }
    r += 1;
  }
  return r;
};

const block = (a, b, c, d) => [
  [...a[0], ...b[0]],
  [...a[1], ...b[1]],
  [...c[0], ...d[0]],
  [...c[1], ...d[1]],
];

const Z2 = zero(2);
const symmetricBasis = [
  [[1, 0], [0, 0]],
  [[0, 1], [1, 0]],
  [[0, 0], [0, 1]],
];
const matrixUnitBasis = [
  [[1, 0], [0, 0]],
  [[0, 1], [0, 0]],
  [[0, 0], [1, 0]],
  [[0, 0], [0, 1]],
];
const E = (b) => block(Z2, b, Z2, Z2);
const F = (c) => block(Z2, Z2, c, Z2);
const H = (a) => block(a, Z2, Z2, scale(-1, transpose(a)));
const spBasis = [
  ...symmetricBasis.map(E),
  ...matrixUnitBasis.map(H),
  ...symmetricBasis.map(F),
];

// Ordered basis of Lambda^2(R^4):
// q1^q2, q1^p1, q1^p2, q2^p1, q2^p2, p1^p2.
const pairs = [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]];
const pairIndex = new Map(pairs.map(([i, j], k) => [`${i},${j}`, k]));

const addWedgeTerm = (vector, coefficient, i, j) => {
  if (i === j || coefficient === 0) return;
  if (i < j) vector[pairIndex.get(`${i},${j}`)] += coefficient;
  else vector[pairIndex.get(`${j},${i}`)] -= coefficient;
};

// Differential of the exterior-square representation on bivectors.
const exteriorSquareLie = (x) => {
  const out = zero(6);
  for (let col = 0; col < pairs.length; col += 1) {
    const [i, j] = pairs[col];
    const column = Array(6).fill(0);
    for (let k = 0; k < 4; k += 1) {
      addWedgeTerm(column, x[k][i], k, j);
      addWedgeTerm(column, x[k][j], i, k);
    }
    for (let row = 0; row < 6; row += 1) out[row][col] = column[row];
  }
  return out;
};

// Primitive bivectors orthogonal to pi=q1^p1+q2^p2 under wedge product:
// a1=q1^q2, a2=p1^p2, a3=q1^p2, a4=q2^p1,
// a5=q1^p1-q2^p2.
const primitiveBasis = [
  [1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1],
  [0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0],
  [0, 1, 0, 0, -1, 0],
];
const primitiveColumns = transpose(primitiveBasis); // 6 x 5
const pi = [[0], [1], [0], [0], [1], [0]];

const primitiveCoordinates = (v) => {
  const coordinates = [v[0], v[5], v[2], v[3], v[1]];
  const reconstructed = [
    coordinates[0],
    coordinates[4],
    coordinates[2],
    coordinates[3],
    -coordinates[4],
    coordinates[1],
  ];
  if (!reconstructed.every((x, i) => x === v[i])) {
    throw new Error(`non-primitive image: ${JSON.stringify(v)}`);
  }
  return coordinates;
};

const restrictToPrimitive = (x6) => {
  const images = mul(x6, primitiveColumns); // columns are images of a_i
  const out = zero(5);
  for (let col = 0; col < 5; col += 1) {
    const coordinates = primitiveCoordinates(images.map((row) => row[col]));
    for (let row = 0; row < 5; row += 1) out[row][col] = coordinates[row];
  }
  return out;
};

// alpha^beta = B(alpha,beta) q1^q2^p1^p2 on the primitive basis.
const gram = [
  [0, 1, 0, 0, 0],
  [1, 0, 0, 0, 0],
  [0, 0, 0, 1, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 0, 0, 2],
];

const induced = spBasis.map((x) => restrictToPrimitive(exteriorSquareLie(x)));
const invariantPiChecks = spBasis.map((x) => equal(mul(exteriorSquareLie(x), pi), zero(6, 1)));
const orthogonalChecks = induced.map((r) =>
  equal(add(mul(transpose(r), gram), mul(gram, r)), zero(5)),
);

// Columns give a1+a2, a1-a2, a3+a4, a3-a4, a5.
const diagonalizingBasis = [
  [1, 1, 0, 0, 0],
  [1, -1, 0, 0, 0],
  [0, 0, 1, 1, 0],
  [0, 0, 1, -1, 0],
  [0, 0, 0, 0, 1],
];
const diagonalGram = mul(mul(transpose(diagonalizingBasis), gram), diagonalizingBasis);
const expectedDiagonalGram = [
  [2, 0, 0, 0, 0],
  [0, -2, 0, 0, 0],
  [0, 0, 2, 0, 0],
  [0, 0, 0, -2, 0],
  [0, 0, 0, 0, 2],
];

const I4 = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
const minusI4 = scale(-1, I4);
const exteriorSquareGroup = (g) => {
  const out = zero(6);
  for (let col = 0; col < pairs.length; col += 1) {
    const [i, j] = pairs[col];
    const column = Array(6).fill(0);
    for (let k = 0; k < 4; k += 1) {
      for (let l = 0; l < 4; l += 1) {
        addWedgeTerm(column, g[k][i] * g[l][j], k, l);
      }
    }
    for (let row = 0; row < 6; row += 1) out[row][col] = column[row];
  }
  return out;
};

const centralKernelCheck = equal(exteriorSquareGroup(I4), exteriorSquareGroup(minusI4));

const report = {
  protocol: "sp4-spin23-exterior-square-certificate/1",
  symplecticCarrierDimension: 4,
  primitiveBivectorDimension: 5,
  primitiveMetricGram: gram,
  diagonalMetricGram: diagonalGram,
  metricSignature: { positive: 3, negative: 2, equivalentConvention: "(2,3) after overall sign" },
  invariantSymplecticBivector: {
    checked: invariantPiChecks.length,
    passed: invariantPiChecks.every(Boolean),
  },
  inducedOrthogonalCondition: {
    checked: orthogonalChecks.length,
    passed: orthogonalChecks.every(Boolean),
  },
  inducedLieAlgebraRank: rank(induced.map(flat)),
  expectedLieAlgebra: "so(3,2) = so(2,3)",
  centralElementsActIdentically: centralKernelCheck,
};

report.passed =
  equal(diagonalGram, expectedDiagonalGram) &&
  report.invariantSymplecticBivector.passed &&
  report.inducedOrthogonalCondition.passed &&
  report.inducedLieAlgebraRank === 10 &&
  report.centralElementsActIdentically;

console.log(JSON.stringify(report, null, 2));
if (!report.passed) process.exitCode = 1;
