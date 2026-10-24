const n = 5;
const zero = () => Array.from({ length: n }, () => Array(n).fill(0));
const unit = (row, column) => { const out = zero(); out[row][column] = 1; return out; };
const add = (left, right) => left.map((row, i) => row.map((value, j) => value + right[i][j]));
const sub = (left, right) => left.map((row, i) => row.map((value, j) => value - right[i][j]));
const mul = (left, right) => left.map((row, i) => row.map((_, j) => row.reduce((sum, __, k) => sum + left[i][k] * right[k][j], 0)));
const comm = (left, right) => sub(mul(left, right), mul(right, left));
const flatten = (matrix) => matrix.flat();
const diagonal = (...entries) => entries.map((value, i) => entries.map((_, j) => i === j ? value : 0));

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

function lieClosure(seed) {
  const basis = [];
  let spanRank = 0;
  const append = (matrix) => {
    const candidateRank = rank([...basis.map(flatten), flatten(matrix)]);
    if (candidateRank > spanRank) {
      basis.push(matrix);
      spanRank = candidateRank;
      return true;
    }
    return false;
  };
  seed.forEach(append);
  let changed = true;
  while (changed) {
    changed = false;
    const snapshot = [...basis];
    for (const left of snapshot) for (const right of snapshot) changed = append(comm(left, right)) || changed;
  }
  return basis;
}

const sl2 = [unit(0, 1), unit(1, 0), diagonal(1, -1, 0, 0, 0)];
const sl3Simple = [
  unit(2, 3), unit(3, 2), diagonal(0, 0, 1, -1, 0),
  unit(3, 4), unit(4, 3), diagonal(0, 0, 0, 1, -1),
];
const grading = diagonal(3, 3, -2, -2, -2);
const mediator = unit(0, 2);
const reverseMediator = unit(2, 0);

const levi = lieClosure([...sl2, ...sl3Simple, grading]);
const parabolic = lieClosure([...sl2, ...sl3Simple, grading, mediator]);
const completed = lieClosure([...sl2, ...sl3Simple, grading, mediator, reverseMediator]);

if (levi.length !== 12) throw new Error(`expected 12-dimensional Levi factor, got ${levi.length}`);
if (parabolic.length !== 18) throw new Error(`expected 18-dimensional parabolic, got ${parabolic.length}`);
if (completed.length !== 24) throw new Error(`expected full sl5 after reverse mediator, got ${completed.length}`);

const radicalUnits = [];
for (let row = 0; row < 2; row += 1) for (let column = 2; column < 5; column += 1) radicalUnits.push(unit(row, column));
if (rank(radicalUnits.map(flatten)) !== 6) throw new Error("cross bimodule should have dimension six");
for (const left of radicalUnits) for (const right of radicalUnits) {
  if (flatten(mul(left, right)).some((value) => value !== 0)) throw new Error("nilradical is not square-zero");
  if (flatten(comm(left, right)).some((value) => value !== 0)) throw new Error("nilradical is not abelian");
}
const gradingAction = comm(grading, mediator);
if (JSON.stringify(gradingAction) !== JSON.stringify(mediator.map((row) => row.map((value) => 5 * value)))) {
  throw new Error("grading weight should be five");
}

console.log(JSON.stringify({
  status: "PASS",
  carrierDimension: 5,
  blockShape: [2, 3],
  leviFactor: "sl2 + sl3 + gl1",
  leviDimension: levi.length,
  mediatorModule: "Hom(C^3,C^2) = (2,3bar)",
  mediatorDimension: radicalUnits.length,
  mediatorSquareZero: true,
  parabolic: "p_(2,3) in sl5",
  parabolicDimension: parabolic.length,
  reverseMediatorClosure: "sl5",
  reverseMediatorClosureDimension: completed.length,
  c2Closure: false,
}));
