const n = 4;
const zero = () => Array.from({ length: n }, () => Array(n).fill(0));
const unit = (row, column) => { const out = zero(); out[row][column] = 1; return out; };
const identity = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (__, j) => Number(i === j)));
const mul = (a, b) => a.map((row, i) => row.map((_, j) => row.reduce((sum, __, k) => sum + a[i][k] * b[k][j], 0)));
const add = (a, b) => a.map((row, i) => row.map((value, j) => value + b[i][j]));
const transpose = (a) => a[0].map((_, column) => a.map((row) => row[column]));
const flatten = (a) => a.flat();

// Stage order: Target, Receipt, Contribution, Review.
const generators = [
  unit(0, 1), // Receipt -> Target
  unit(0, 2), // Contribution -> Target
  unit(0, 3), // Review -> Target
  unit(1, 2), // Contribution -> Receipt
  unit(2, 3), // Review -> Contribution
];

function rank(columns) {
  if (columns.length === 0) return 0;
  const matrix = Array.from({ length: columns[0].length }, (_, row) => columns.map((column) => column[row]));
  let pivotRow = 0;
  for (let column = 0; column < matrix[0].length && pivotRow < matrix.length; column += 1) {
    let pivot = pivotRow;
    while (pivot < matrix.length && Math.abs(matrix[pivot][column]) < 1e-12) pivot += 1;
    if (pivot === matrix.length) continue;
    [matrix[pivotRow], matrix[pivot]] = [matrix[pivot], matrix[pivotRow]];
    const scale = matrix[pivotRow][column];
    matrix[pivotRow] = matrix[pivotRow].map((value) => value / scale);
    for (let row = 0; row < matrix.length; row += 1) {
      if (row === pivotRow) continue;
      const factor = matrix[row][column];
      matrix[row] = matrix[row].map((value, index) => value - factor * matrix[pivotRow][index]);
    }
    pivotRow += 1;
  }
  return pivotRow;
}

// Close the authored stage operators under multiplication.
const basis = [identity];
let spanRank = 1;
for (let cursor = 0; cursor < basis.length; cursor += 1) {
  for (const generator of generators) {
    const candidate = mul(generator, basis[cursor]);
    const nextRank = rank([...basis.map(flatten), flatten(candidate)]);
    if (nextRank > spanRank) {
      basis.push(candidate);
      spanRank = nextRank;
    }
  }
}
if (spanRank !== 7) throw new Error(`unexpected provenance stage-algebra dimension ${spanRank}`);

// Solve X^T J + J X = 0 over the six-dimensional skew-form space.
const skewBasis = [];
for (let i = 0; i < n; i += 1) {
  for (let j = i + 1; j < n; j += 1) {
    const form = zero();
    form[i][j] = 1;
    form[j][i] = -1;
    skewBasis.push(form);
  }
}
const constraintColumns = skewBasis.map((form) => generators.flatMap((generator) =>
  flatten(add(mul(transpose(generator), form), mul(form, generator))),
));
const constraintRank = rank(constraintColumns);
const invariantFormDimension = skewBasis.length - constraintRank;
if (invariantFormDimension !== 1) throw new Error(`unexpected invariant-form dimension ${invariantFormDimension}`);

// The surviving form is supported only on Contribution--Review, hence rank two.
const surviving = zero();
surviving[2][3] = 1;
surviving[3][2] = -1;
for (const generator of generators) {
  const defect = add(mul(transpose(generator), surviving), mul(surviving, generator));
  if (flatten(defect).some((value) => value !== 0)) throw new Error("declared surviving form is not invariant");
}
if (rank(surviving.map((_, column) => surviving.map((row) => row[column]))) !== 2) {
  throw new Error("surviving alternating form should have rank two");
}

console.log(JSON.stringify({
  status: "PASS",
  stageAlgebraDimension: spanRank,
  stageAlgebra: "Q*I + n4",
  invariantAlternatingFormDimension: invariantFormDimension,
  maximumInvariantAlternatingFormRank: 2,
  nondegenerateSymplecticForm: false,
}));
