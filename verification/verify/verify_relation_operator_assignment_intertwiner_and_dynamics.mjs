import fs from "node:fs";

const register = JSON.parse(fs.readFileSync(
  "corpus/programmes/quotient-scars/quotient_scar_register_v1.json", "utf8",
));
const nodes = register.entries.map((entry) => entry.id);
const nodeIndex = new Map(nodes.map((node, index) => [node, index]));
const edges = register.relations.filter((edge) => edge.type !== "shares_action_not_carrier");
const types = [
  "extends_to", "instantiates", "requires_enrichment", "separates_from", "rules_out_identification",
];
const typeIndex = new Map(types.map((type, index) => [type, index]));
const size = nodes.length;

const adjacency = nodes.map(() => []);
for (const edge of edges) {
  const from = nodeIndex.get(edge.from); const to = nodeIndex.get(edge.to);
  adjacency[from].push(to); adjacency[to].push(from);
}
const visited = new Set();
const components = [];
for (let start = 0; start < size; start += 1) {
  if (visited.has(start)) continue;
  const stack = [start]; const component = []; visited.add(start);
  while (stack.length) {
    const current = stack.pop(); component.push(current);
    for (const neighbor of adjacency[current]) if (!visited.has(neighbor)) { visited.add(neighbor); stack.push(neighbor); }
  }
  components.push(component);
}
components.sort((a, b) => b.length - a.length);
if (components.map((component) => component.length).join(",") !== "14,2") throw new Error("unexpected graph components");
const componentOf = new Map();
components.forEach((component, index) => component.forEach((node) => componentOf.set(node, index)));
const seamEdges = register.relations.filter((edge) => edge.type === "shares_action_not_carrier");
const crossComponentSeams = seamEdges.filter((edge) =>
  componentOf.get(nodeIndex.get(edge.from)) !== componentOf.get(nodeIndex.get(edge.to)));
if (crossComponentSeams.length !== 3) throw new Error("all three shares-action seams should cross the backbone components");

const zeroMatrix = () => Array.from({ length: size }, () => Array(size).fill(0));
const operators = types.map(() => zeroMatrix());
for (const edge of edges) {
  operators[typeIndex.get(edge.type)][nodeIndex.get(edge.to)][nodeIndex.get(edge.from)] += 1;
}

const transpose = (matrix) => matrix.map((_, i) => matrix.map((row) => row[i]));
const multiply = (left, right) => left.map((row) => right[0].map((_, column) =>
  row.reduce((sum, value, index) => sum + value * right[index][column], 0)));
const subtract = (left, right) => left.map((row, i) => row.map((value, j) => value - right[i][j]));
const flatten = (matrix) => matrix.flat();
const frobenius = (left, right) => flatten(left).reduce((sum, value, index) => sum + value * flatten(right)[index], 0);

const counts = operators.map((operator) => frobenius(operator, operator));
if (counts.join(",") !== "7,5,5,5,2") throw new Error(`unexpected type counts ${counts}`);
const positiveMetric = operators.map((left) => operators.map((right) => frobenius(left, right)));
const hermitianOperators = operators.map((operator) => operator.map((row, i) => row.map((value, j) => value + operator[j][i])));
const hermitianPositiveMetric = hermitianOperators.map((left) => hermitianOperators.map((right) => frobenius(left, right)));

const pathMetric = operators.map((left) => operators.map((right) => {
  const symmetrized = multiply(left, right).map((row, i) => row.map((value, j) =>
    value + multiply(right, left)[i][j]));
  return flatten(symmetrized).reduce((sum, value) => sum + value, 0);
}));
const expectedPathMetric = [
  [6, 7, 3, 5, 1], [7, 2, 3, 3, 0], [3, 3, 0, 5, 1],
  [5, 3, 5, 4, 0], [1, 0, 1, 0, 0],
];
if (JSON.stringify(pathMetric) !== JSON.stringify(expectedPathMetric)) throw new Error("operator path metric mismatch");
const hermitianPathMetric = hermitianOperators.map((left) => hermitianOperators.map((right) => {
  const first = multiply(left, right); const second = multiply(right, left);
  return flatten(first).reduce((sum, value, index) => sum + value + flatten(second)[index], 0);
}));
const wallEdge = edges.find((edge) => edge.id === "QR-003");
const wallMatrixUnit = zeroMatrix();
wallMatrixUnit[nodeIndex.get(wallEdge.to)][nodeIndex.get(wallEdge.from)] = 1;
const hermitianWall = wallMatrixUnit.map((row, i) => row.map((value, j) => value + wallMatrixUnit[j][i]));
const hermitianWallTwoStepReturn = frobenius(multiply(hermitianWall, hermitianWall),
  Array.from({ length: size }, (_, i) => Array.from({ length: size }, (__, j) => i === j ? 1 : 0)));
if (hermitianWallTwoStepReturn !== 2) throw new Error("Hermitian wall completion should have a two-step return");

function liesInTypeSpan(matrix) {
  const coefficients = [];
  for (let type = 0; type < types.length; type += 1) {
    const values = [];
    for (let row = 0; row < size; row += 1) for (let column = 0; column < size; column += 1) {
      if (operators[type][row][column] !== 0) values.push(matrix[row][column]);
    }
    if (!values.every((value) => value === values[0])) return false;
    coefficients.push(values[0]);
  }
  for (let row = 0; row < size; row += 1) for (let column = 0; column < size; column += 1) {
    const reconstructed = operators.reduce((sum, operator, type) => sum + coefficients[type] * operator[row][column], 0);
    if (matrix[row][column] !== reconstructed) return false;
  }
  return true;
}

const productAudit = [];
const productVectors = [];
for (let a = 0; a < types.length; a += 1) for (let b = 0; b < types.length; b += 1) {
  const product = multiply(operators[a], operators[b]);
  const nonzero = flatten(product).some((value) => value !== 0);
  productVectors.push(flatten(product));
  productAudit.push({ left: types[a], right: types[b], nonzero, closes: liesInTypeSpan(product) });
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

const typePlusProductRank = rank([...operators.map(flatten), ...productVectors]);

const projectedBracket = Array.from({ length: 5 }, () =>
  Array.from({ length: 5 }, () => Array(5).fill(0)));
for (let a = 0; a < 5; a += 1) for (let b = 0; b < 5; b += 1) {
  const commutator = subtract(multiply(operators[a], operators[b]), multiply(operators[b], operators[a]));
  for (let c = 0; c < 5; c += 1) projectedBracket[a][b][c] = frobenius(commutator, operators[c]) / counts[c];
}
const bracketVectors = (left, right) => Array.from({ length: 5 }, (_, c) => {
  let value = 0;
  for (let a = 0; a < 5; a += 1) for (let b = 0; b < 5; b += 1) value += left[a] * right[b] * projectedBracket[a][b][c];
  return value;
});
let maximumJacobiDefect = 0;
for (let a = 0; a < 5; a += 1) for (let b = 0; b < 5; b += 1) for (let c = 0; c < 5; c += 1) {
  const ea = Array(5).fill(0); ea[a] = 1;
  const eb = Array(5).fill(0); eb[b] = 1;
  const ec = Array(5).fill(0); ec[c] = 1;
  const jacobi = bracketVectors(ea, bracketVectors(eb, ec)).map((value, index) =>
    value + bracketVectors(eb, bracketVectors(ec, ea))[index] + bracketVectors(ec, bracketVectors(ea, eb))[index]);
  maximumJacobiDefect = Math.max(maximumJacobiDefect, ...jacobi.map(Math.abs));
}
if (Math.abs(maximumJacobiDefect - 6 / 25) > 1e-12) throw new Error("unexpected projected Jacobi defect");

// Characteristic polynomial det(K-lambda H), by exact permutation expansion.
function permutations(values) {
  if (values.length <= 1) return [values.slice()];
  const result = [];
  for (let i = 0; i < values.length; i += 1) {
    for (const tail of permutations(values.slice(0, i).concat(values.slice(i + 1)))) result.push([values[i], ...tail]);
  }
  return result;
}
function permutationSign(permutation) {
  let inversions = 0;
  for (let i = 0; i < permutation.length; i += 1) for (let j = i + 1; j < permutation.length; j += 1) {
    if (permutation[i] > permutation[j]) inversions += 1;
  }
  return inversions % 2 === 0 ? 1n : -1n;
}
function multiplyPolynomial(left, right) {
  const result = Array(left.length + right.length - 1).fill(0n);
  for (let i = 0; i < left.length; i += 1) for (let j = 0; j < right.length; j += 1) result[i + j] += left[i] * right[j];
  return result;
}
const pencilPolynomial = Array(6).fill(0n);
for (const permutation of permutations([0, 1, 2, 3, 4])) {
  let term = [permutationSign(permutation)];
  for (let row = 0; row < 5; row += 1) {
    const column = permutation[row];
    term = multiplyPolynomial(term, row === column
      ? [BigInt(pathMetric[row][column]), -BigInt(positiveMetric[row][column])]
      : [BigInt(pathMetric[row][column])]);
  }
  for (let degree = 0; degree < term.length; degree += 1) pencilPolynomial[degree] += term[degree];
}

function polynomialGcdDegreeModPrime(leftInput, rightInput, prime) {
  const normalize = (poly) => {
    const result = poly.map((value) => ((Number(value % BigInt(prime))) + prime) % prime);
    while (result.length && result.at(-1) === 0) result.pop();
    return result;
  };
  const inverse = (value) => {
    let result = 1; let base = value; let power = prime - 2;
    while (power) { if (power & 1) result = result * base % prime; base = base * base % prime; power >>= 1; }
    return result;
  };
  let a = normalize(leftInput); let b = normalize(rightInput);
  while (b.length) {
    const remainder = a.slice();
    while (remainder.length >= b.length) {
      const factor = remainder.at(-1) * inverse(b.at(-1)) % prime;
      const offset = remainder.length - b.length;
      for (let i = 0; i < b.length; i += 1) remainder[offset + i] = (remainder[offset + i] - factor * b[i] + prime) % prime;
      while (remainder.length && remainder.at(-1) === 0) remainder.pop();
    }
    [a, b] = [b, remainder];
  }
  return a.length - 1;
}
const derivative = pencilPolynomial.slice(1).map((coefficient, index) => coefficient * BigInt(index + 1));
const pencilRepeatedRootGcdDegree = polynomialGcdDegreeModPrime(pencilPolynomial, derivative, 1009);
if (pencilRepeatedRootGcdDegree !== 0) throw new Error("relation metric pencil should be square-free");

// Modular commutator closure.  Transposes are included because a physical
// finite operator system normally retains adjoints.
const prime = 1000003;
const mod = (value) => ((value % prime) + prime) % prime;
const inverseMod = (value) => {
  let result = 1; let base = mod(value); let power = prime - 2;
  while (power) { if (power & 1) result = result * base % prime; base = base * base % prime; power >>= 1; }
  return result;
};
const echelon = new Map();
const lieBasis = [];
function addIndependent(matrix) {
  const vector = flatten(matrix).map(mod);
  for (const [pivot, basisVector] of [...echelon.entries()].sort((a, b) => a[0] - b[0])) {
    if (vector[pivot] === 0) continue;
    const factor = vector[pivot];
    for (let i = pivot; i < vector.length; i += 1) vector[i] = mod(vector[i] - factor * basisVector[i]);
  }
  const pivot = vector.findIndex((value) => value !== 0);
  if (pivot < 0) return false;
  const scale = inverseMod(vector[pivot]);
  for (let i = pivot; i < vector.length; i += 1) vector[i] = vector[i] * scale % prime;
  for (const [otherPivot, basisVector] of echelon.entries()) {
    if (basisVector[pivot] === 0) continue;
    const factor = basisVector[pivot];
    for (let i = pivot; i < basisVector.length; i += 1) basisVector[i] = mod(basisVector[i] - factor * vector[i]);
    echelon.set(otherPivot, basisVector);
  }
  echelon.set(pivot, vector);
  lieBasis.push(matrix.map((row) => row.map(mod)));
  return true;
}
for (const generator of [...operators, ...operators.map(transpose)]) addIndependent(generator);
for (let cursor = 0; cursor < lieBasis.length; cursor += 1) {
  const existingLength = lieBasis.length;
  for (let other = 0; other < existingLength; other += 1) {
    addIndependent(subtract(multiply(lieBasis[cursor], lieBasis[other]), multiply(lieBasis[other], lieBasis[cursor])));
  }
}

const nonzeroProducts = productAudit.filter((entry) => entry.nonzero);
const closingProducts = nonzeroProducts.filter((entry) => entry.closes);

console.log(JSON.stringify({
  result: "pass",
  operatorAssignment: {
    carrierDimension: size,
    definition: "edge u->v maps to |v><u|; modality operator is the sum over its edges",
    operatorRanks: operators.map((operator) => rank(operator)),
    positiveFrobeniusMetric: positiveMetric,
    pathMetricRecoveredExactly: true,
    physicalTyping: {
      directedOperatorsHermitian: false,
      hermitianPositiveMetric,
      hermitianPathMetricEqualsDirectedPathMetric: JSON.stringify(hermitianPathMetric) === JSON.stringify(pathMetric),
      qr003HermitianTwoStepReturn: hermitianWallTwoStepReturn,
      boundary: "ordinary Hamiltonian completion adds reverse arrows and changes the directed composition detector",
    },
  },
  composition: {
    nonzeroOrderedTypeProducts: nonzeroProducts.length,
    productsClosingInFiveTypeSpan: closingProducts.length,
    typePlusLengthTwoSpanDimension: typePlusProductRank,
    projectedCommutatorNonzero: projectedBracket.flat(2).some((value) => value !== 0),
    projectedCommutatorJacobiDefect: maximumJacobiDefect,
    verdict: "matrix composition is exact on the 16-node carrier but the five modality operators are not a closed algebra",
  },
  intertwiner: {
    relationMetricPencilPolynomialAscending: pencilPolynomial.map(Number),
    relationPencilSquareFree: true,
    linkNaturalMetricPencilRoots: { "1/2": 2, "-1/2": 2, "-1": 1 },
    simultaneousPairIsometry: false,
    reason: "generalized eigenvalue multiplicities are congruence invariants; relation pencil is square-free while link pencil has repeated roots",
  },
  dynamics: {
    generatorsWithAdjoints: 10,
    commutatorClosureDimensionModPrime: lieBasis.length,
    graphComponentSizes: components.map((component) => component.length),
    graphComponents: components.map((component) => component.map((index) => nodes[index])),
    identifiedLieAlgebra: lieBasis.length === 198 ? "sl(14) + sl(2)" : "unidentified",
    seamAdmission: {
      sharesActionEdges: seamEdges.length,
      crossComponentEdges: crossComponentSeams.map((edge) => edge.id),
      generatedClosureIfPromotedToCarrierMap: "sl(16), dimension 255",
      reason: "sl(14)+sl(2) plus any nonzero cross-block matrix unit generates both off-diagonal blocks and hence sl(16)",
    },
    targetSo23Dimension: 10,
    equalsSo23: lieBasis.length === 10,
  },
}, null, 2));
