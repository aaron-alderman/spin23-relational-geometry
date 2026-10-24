import fs from "node:fs";

const register = JSON.parse(fs.readFileSync(
  "corpus/programmes/quotient-scars/quotient_scar_register_v1.json", "utf8",
));
const edges = register.relations.filter((edge) => edge.type !== "shares_action_not_carrier");
const types = [
  "extends_to", "instantiates", "requires_enrichment", "separates_from", "rules_out_identification",
];
const typeIndex = new Map(types.map((type, index) => [type, index]));
const nodes = register.entries.map((entry) => entry.id);
const pairToEdge = new Map(edges.map((edge, index) => [[edge.from, edge.to].sort().join("|"), index]));
const edgeTriangles = [];
for (let a = 0; a < nodes.length; a += 1) for (let b = a + 1; b < nodes.length; b += 1) for (let c = b + 1; c < nodes.length; c += 1) {
  const triangle = [
    pairToEdge.get([nodes[a], nodes[b]].sort().join("|")),
    pairToEdge.get([nodes[a], nodes[c]].sort().join("|")),
    pairToEdge.get([nodes[b], nodes[c]].sort().join("|")),
  ];
  if (triangle.every((index) => index !== undefined)) edgeTriangles.push(triangle);
}

function rank(matrix, tolerance = 1e-9) {
  const work = matrix.map((row) => row.map(Number));
  let pivotRow = 0;
  for (let column = 0; column < (work[0]?.length ?? 0) && pivotRow < work.length; column += 1) {
    let pivot = pivotRow;
    for (let row = pivotRow + 1; row < work.length; row += 1) {
      if (Math.abs(work[row][column]) > Math.abs(work[pivot][column])) pivot = row;
    }
    if (Math.abs(work[pivot][column]) < tolerance) continue;
    [work[pivotRow], work[pivot]] = [work[pivot], work[pivotRow]];
    const scale = work[pivotRow][column];
    for (let j = column; j < work[0].length; j += 1) work[pivotRow][j] /= scale;
    for (let row = 0; row < work.length; row += 1) {
      if (row === pivotRow) continue;
      const factor = work[row][column];
      for (let j = column; j < work[0].length; j += 1) work[row][j] -= factor * work[pivotRow][j];
    }
    pivotRow += 1;
  }
  return pivotRow;
}

function jacobiEigenvalues(matrix, tolerance = 1e-12, maxIterations = 100000) {
  const a = matrix.map((row) => row.map(Number));
  for (let iteration = 0; iteration < maxIterations; iteration += 1) {
    let p = 0; let q = 1; let maximum = 0;
    for (let i = 0; i < a.length; i += 1) for (let j = i + 1; j < a.length; j += 1) {
      if (Math.abs(a[i][j]) > maximum) { maximum = Math.abs(a[i][j]); p = i; q = j; }
    }
    if (maximum < tolerance) return a.map((row, index) => row[index]);
    const angle = 0.5 * Math.atan2(2 * a[p][q], a[q][q] - a[p][p]);
    const c = Math.cos(angle); const s = Math.sin(angle);
    for (let k = 0; k < a.length; k += 1) if (k !== p && k !== q) {
      const apk = a[p][k]; const aqk = a[q][k];
      a[p][k] = a[k][p] = c * apk - s * aqk;
      a[q][k] = a[k][q] = s * apk + c * aqk;
    }
    const app = a[p][p]; const aqq = a[q][q]; const apq = a[p][q];
    a[p][p] = c * c * app - 2 * s * c * apq + s * s * aqq;
    a[q][q] = s * s * app + 2 * s * c * apq + c * c * aqq;
    a[p][q] = a[q][p] = 0;
  }
  throw new Error("Jacobi eigenvalue iteration did not converge");
}

function determinantBareiss(matrix) {
  const work = matrix.map((row) => row.map(BigInt));
  let sign = 1n;
  let previous = 1n;
  for (let pivotIndex = 0; pivotIndex < work.length - 1; pivotIndex += 1) {
    let pivotRow = pivotIndex;
    while (pivotRow < work.length && work[pivotRow][pivotIndex] === 0n) pivotRow += 1;
    if (pivotRow === work.length) return 0n;
    if (pivotRow !== pivotIndex) {
      [work[pivotRow], work[pivotIndex]] = [work[pivotIndex], work[pivotRow]];
      sign = -sign;
    }
    const pivot = work[pivotIndex][pivotIndex];
    for (let i = pivotIndex + 1; i < work.length; i += 1) {
      for (let j = pivotIndex + 1; j < work.length; j += 1) {
        work[i][j] = (work[i][j] * pivot - work[i][pivotIndex] * work[pivotIndex][j]) / previous;
      }
    }
    previous = pivot;
  }
  return sign * work.at(-1).at(-1);
}

function combinations(values, size) {
  if (size === 0) return [[]];
  const result = [];
  for (let i = 0; i <= values.length - size; i += 1) {
    for (const tail of combinations(values.slice(i + 1), size - 1)) result.push([values[i], ...tail]);
  }
  return result;
}

function gcdBigInt(a, b) {
  let x = a < 0n ? -a : a; let y = b < 0n ? -b : b;
  while (y !== 0n) [x, y] = [y, x % y];
  return x;
}

function smithInvariantFactors(matrix) {
  const indices = Array.from({ length: matrix.length }, (_, index) => index);
  const determinantalDivisors = [1n];
  for (let size = 1; size <= matrix.length; size += 1) {
    let divisor = 0n;
    for (const rows of combinations(indices, size)) for (const columns of combinations(indices, size)) {
      const minor = rows.map((row) => columns.map((column) => matrix[row][column]));
      divisor = gcdBigInt(divisor, determinantBareiss(minor));
    }
    determinantalDivisors.push(divisor);
  }
  return determinantalDivisors.slice(1).map((divisor, index) => divisor / determinantalDivisors[index]);
}

function cofactor(matrix, row, column) {
  return ((row + column) % 2 === 0 ? 1n : -1n) * determinantBareiss(
    matrix.filter((_, index) => index !== row).map((values) => values.filter((_, index) => index !== column)),
  );
}

function reducedDenominator(numerator, denominator) {
  return denominator / gcdBigInt(numerator, denominator);
}

function lcmBigInt(a, b) {
  return a / gcdBigInt(a, b) * b;
}

function fraction(numerator, denominator = 1n) {
  if (denominator === 0n) throw new Error("zero fraction denominator");
  let n = BigInt(numerator); let d = BigInt(denominator);
  if (d < 0n) { n = -n; d = -d; }
  const divisor = gcdBigInt(n, d);
  return { n: n / divisor, d: d / divisor };
}

function addFraction(a, b) { return fraction(a.n * b.d + b.n * a.d, a.d * b.d); }
function multiplyFraction(a, b) { return fraction(a.n * b.n, a.d * b.d); }
function negateFraction(a) { return { n: -a.n, d: a.d }; }

function oneDimensionalNullVector(matrix) {
  const work = matrix.map((row) => row.map((value) => fraction(BigInt(value))));
  const pivots = [];
  let pivotRow = 0;
  for (let column = 0; column < work[0].length && pivotRow < work.length; column += 1) {
    const pivot = work.findIndex((row, index) => index >= pivotRow && row[column].n !== 0n);
    if (pivot < 0) continue;
    [work[pivotRow], work[pivot]] = [work[pivot], work[pivotRow]];
    const inversePivot = fraction(work[pivotRow][column].d, work[pivotRow][column].n);
    work[pivotRow] = work[pivotRow].map((value) => multiplyFraction(value, inversePivot));
    for (let row = 0; row < work.length; row += 1) {
      if (row === pivotRow || work[row][column].n === 0n) continue;
      const factor = work[row][column];
      work[row] = work[row].map((value, index) =>
        addFraction(value, negateFraction(multiplyFraction(factor, work[pivotRow][index]))));
    }
    pivots.push(column);
    pivotRow += 1;
  }
  const free = Array.from({ length: work[0].length }, (_, index) => index).filter((index) => !pivots.includes(index));
  if (free.length !== 1) throw new Error(`expected one-dimensional nullspace, received ${free.length}`);
  const vector = Array.from({ length: work[0].length }, () => fraction(0n));
  vector[free[0]] = fraction(1n);
  pivots.forEach((column, row) => { vector[column] = negateFraction(work[row][free[0]]); });
  const commonDenominator = vector.reduce((value, entry) => lcmBigInt(value, entry.d), 1n);
  const integers = vector.map((entry) => entry.n * (commonDenominator / entry.d));
  const commonDivisor = integers.reduce((value, entry) => gcdBigInt(value, entry), 0n);
  return integers.map((entry) => entry / commonDivisor);
}

const directed = edges.map((first) => edges.map((second) => first.to === second.from ? 1 : 0));
const symmetric = edges.map((_, i) => edges.map((__, j) => directed[i][j] + directed[j][i]));
const typeDirected = Array.from({ length: 5 }, () => Array(5).fill(0));
for (let i = 0; i < edges.length; i += 1) for (let j = 0; j < edges.length; j += 1) {
  typeDirected[typeIndex.get(edges[i].type)][typeIndex.get(edges[j].type)] += directed[i][j];
}
const typeSymmetric = typeDirected.map((row, i) => row.map((value, j) => value + typeDirected[j][i]));

const eigenvalues = jacobiEigenvalues(symmetric);
const typeEigenvalues = jacobiEigenvalues(typeSymmetric);
const inertia = (values) => [
  values.filter((value) => value > 1e-8).length,
  values.filter((value) => value < -1e-8).length,
  values.filter((value) => Math.abs(value) <= 1e-8).length,
];

const edgeRank = rank(symmetric);
const typeRank = rank(typeSymmetric);
const edgeInertia = inertia(eigenvalues);
const typeInertia = inertia(typeEigenvalues);
const typeDeterminant = determinantBareiss(typeSymmetric);
const typeSmithFactors = smithInvariantFactors(typeSymmetric);
const inverseNumerator = typeSymmetric.map((_, row) =>
  typeSymmetric.map((__, column) => cofactor(typeSymmetric, column, row)));
const dualColumnOrders = Array.from({ length: 5 }, (_, column) =>
  inverseNumerator.reduce((order, row) =>
    lcmBigInt(order, reducedDenominator(row[column], typeDeterminant)), 1n));
const cyclicGeneratorColumn = dualColumnOrders.findIndex((order) => order === 64n);
if (cyclicGeneratorColumn < 0) throw new Error("failed to find an order-64 discriminant generator");
const generatorNormNumerator = inverseNumerator[cyclicGeneratorColumn][cyclicGeneratorColumn];
// h=8g generates the unique order-eight subgroup of the cyclic discriminant group.
// h.h = 64 g.g, and q(h)=h.h/2 for this even lattice.
const glueNormNumerator = 64n * generatorNormNumerator;
const glueNormDenominator = typeDeterminant;
const glueNorm = glueNormNumerator / glueNormDenominator;
if (glueNormNumerator % glueNormDenominator !== 0n) throw new Error("order-eight subgroup is not bilinearly isotropic");
const glueCoordinateNumerators = inverseNumerator.map((row) => 8n * row[cyclicGeneratorColumn]);
const glueCoordinateDenominator = typeDeterminant;
const orthogonalBlock = typeSymmetric.slice(1).map((row) => row.slice(1));
const orthogonalBlockDeterminant = determinantBareiss(orthogonalBlock);
const orthogonalBlockInertia = inertia(jacobiEigenvalues(orthogonalBlock));
if (glueCoordinateNumerators[0] !== 8n || orthogonalBlockDeterminant !== 1n
    || orthogonalBlockInertia.join(",") !== "2,2,0") {
  throw new Error("unexpected unimodular glue splitting");
}

// The tensor contraction Phi*Phi is diagonal with twice the triangle
// participation count.  Its sum with the path form is a natural integer test,
// but the corpus does not fix the relative coefficient between the two tensors.
const triangleParticipation = edges.map((_, index) =>
  edgeTriangles.filter((triangle) => triangle.includes(index)).length);
const triangleContraction = edges.map((_, i) => edges.map((__, j) =>
  i === j ? 2 * triangleParticipation[i] : 0));
const unitMixedForm = symmetric.map((row, i) => row.map((value, j) => value + triangleContraction[i][j]));
const unitMixedRank = rank(unitMixedForm);
const unitMixedInertia = inertia(jacobiEigenvalues(unitMixedForm));
const unitMixedDeterminant = determinantBareiss(unitMixedForm);
const triangleSilentIndices = triangleParticipation
  .map((count, index) => count === 0 ? index : -1).filter((index) => index >= 0);
const pathRestrictedToTriangleRadical = symmetric.map((row) =>
  triangleSilentIndices.map((index) => row[index]));
const commonRadicalRestrictedVector = oneDimensionalNullVector(pathRestrictedToTriangleRadical);
const commonRadical = triangleSilentIndices.map((edgeIndex, index) => ({
  edge: edges[edgeIndex].id,
  coefficient: Number(commonRadicalRestrictedVector[index]),
})).filter((entry) => entry.coefficient !== 0);

if (edgeRank !== 18 || edgeInertia.join(",") !== "9,9,6") {
  throw new Error(`unexpected edge path form: rank=${edgeRank}, inertia=${edgeInertia}`);
}
if (typeRank !== 5 || typeInertia.join(",") !== "3,2,0") {
  throw new Error(`unexpected type path form: rank=${typeRank}, inertia=${typeInertia}`);
}
if (typeDeterminant !== 64n) throw new Error(`unexpected type determinant: ${typeDeterminant}`);

// Test the joint infinitesimal stabilizer directly in all 25 matrix entries.
// Metric equations use A^T K + K A = 0; cubic equations use the triangle tensor.
const typeTensor = Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => Array(5).fill(0)));
for (const triangle of edgeTriangles) {
  const triple = triangle.map((index) => typeIndex.get(edges[index].type));
  const permutations = new Set([
    [triple[0], triple[1], triple[2]], [triple[0], triple[2], triple[1]],
    [triple[1], triple[0], triple[2]], [triple[1], triple[2], triple[0]],
    [triple[2], triple[0], triple[1]], [triple[2], triple[1], triple[0]],
  ].map((entry) => entry.join(",")));
  for (const encoded of permutations) {
    const [i, j, k] = encoded.split(",").map(Number);
    typeTensor[i][j][k] += 1;
  }
}
const metricRows = [];
for (let i = 0; i < 5; i += 1) for (let j = i; j < 5; j += 1) {
  const row = Array(25).fill(0);
  for (let p = 0; p < 5; p += 1) {
    row[p * 5 + i] += typeSymmetric[p][j];
    row[p * 5 + j] += typeSymmetric[i][p];
  }
  metricRows.push(row);
}
const cubicRows = [];
for (let i = 0; i < 5; i += 1) for (let j = i; j < 5; j += 1) for (let k = j; k < 5; k += 1) {
  const row = Array(25).fill(0);
  for (let p = 0; p < 5; p += 1) {
    row[p * 5 + i] += typeTensor[p][j][k];
    row[p * 5 + j] += typeTensor[i][p][k];
    row[p * 5 + k] += typeTensor[i][j][p];
  }
  cubicRows.push(row);
}
const metricConstraintRank = rank(metricRows);
const jointConstraintRank = rank([...metricRows, ...cubicRows]);
if (metricConstraintRank !== 15 || jointConstraintRank !== 25) {
  throw new Error(`unexpected stabilizer ranks: metric=${metricConstraintRank}, joint=${jointConstraintRank}`);
}

const rulesOutIndex = 4;
if (typeSymmetric[rulesOutIndex].every((value) => value === 0)) {
  throw new Error("two-step path form should couple the rules-out direction");
}

console.log(JSON.stringify({
  result: "pass",
  directedTwoStepPaths: directed.flat().reduce((sum, value) => sum + value, 0),
  edgePathForm: {
    definition: "D + transpose(D), where D_ef=1 iff target(e)=source(f)",
    rank: edgeRank,
    inertia: edgeInertia,
    radicalDimension: edges.length - edgeRank,
  },
  typePathForm: {
    order: types,
    matrix: typeSymmetric,
    rank: typeRank,
    inertia: typeInertia,
    determinant: Number(typeDeterminant),
    smithInvariantFactors: typeSmithFactors.map(Number),
    discriminantGroup: "Z/64Z",
    dualColumnOrders: dualColumnOrders.map(Number),
    order64GeneratorColumn: cyclicGeneratorColumn,
    order8GlueGeneratorNorm: Number(glueNorm),
    unimodularGlueParity: glueNorm % 2n === 0n ? "even" : "odd",
    glueVector: "(1,16,-1,-12,9)/8",
    unimodularCompletion: {
      index: 8,
      orthogonalSplitting: "<+1> + even unimodular signature-(2,2) block",
      orthogonalBlock,
      orthogonalBlockDeterminant: Number(orthogonalBlockDeterminant),
      isometryClass: "I_(3,2); after overall sign I_(2,3)",
    },
    rulesOutRow: typeSymmetric[rulesOutIndex],
  },
  commonMetricCubicSymmetry: {
    metricLieAlgebraDimension: 25 - metricConstraintRank,
    jointLieAlgebraDimension: 25 - jointConstraintRank,
  },
  fullCarrierMixedForm: {
    definition: "K_path + Phi_triangle^* Phi_triangle at unit relative coefficient",
    rank: unitMixedRank,
    inertia: unitMixedInertia,
    determinant: unitMixedDeterminant.toString(),
    commonRadicalDimension: 1,
    commonRadical,
    relativeCoefficientDerived: false,
  },
  boundary: {
    graphNative: true,
    fillsTriangleTypeRadical: true,
    positive: false,
    operatorComposition: false,
    reason: "The register declares typed arrows but no operator-valued edge maps, domains, codomains, or Schur blocks.",
  },
}, null, 2));
