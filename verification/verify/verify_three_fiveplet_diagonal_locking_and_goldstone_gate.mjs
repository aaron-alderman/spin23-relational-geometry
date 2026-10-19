const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };
const near = (a, b, tolerance = 1e-9) => Math.abs(a - b) < tolerance;

const basis = [
  [[1,0,0],[0,-1,0],[0,0,0]],
  [[1,0,0],[0,1,0],[0,0,-2]],
  [[0,1,0],[1,0,0],[0,0,0]],
  [[0,0,1],[0,0,0],[1,0,0]],
  [[0,0,0],[0,0,1],[0,1,0]],
];
const generators = [
  [[0,0,0],[0,0,-1],[0,1,0]],
  [[0,0,1],[0,0,0],[-1,0,0]],
  [[0,-1,0],[1,0,0],[0,0,0]],
];
const transpose = (a) => a[0].map((_, j) => a.map((row) => row[j]));
const mul = (a, b) => a.map((row) => b[0].map((_, j) => row.reduce((s, x, k) => s + x * b[k][j], 0)));
const add = (a, b) => a.map((row, i) => row.map((x, j) => x + b[i][j]));
const scale = (s, a) => a.map((row) => row.map((x) => s * x));
const frobenius = (a, b) => a.reduce((s, row, i) => s + row.reduce((t, x, j) => t + x * b[i][j], 0), 0);
const coordinate = (q, index) => frobenius(q, basis[index]) / frobenius(basis[index], basis[index]);

const representation = (A) => {
  const result = Array.from({ length: 5 }, () => Array(5).fill(0));
  for (let column = 0; column < 5; column += 1) {
    const derivative = add(mul(A, basis[column]), mul(basis[column], transpose(A)));
    for (let row = 0; row < 5; row += 1) result[row][column] = coordinate(derivative, row);
  }
  return result;
};
const L = generators.map(representation);

const rank = (input) => {
  if (input.length === 0 || input[0].length === 0) return 0;
  const a = input.map((row) => row.slice());
  let r = 0;
  for (let column = 0; column < a[0].length && r < a.length; column += 1) {
    let pivot = r;
    while (pivot < a.length && Math.abs(a[pivot][column]) < 1e-10) pivot += 1;
    if (pivot === a.length) continue;
    [a[r], a[pivot]] = [a[pivot], a[r]];
    const divisor = a[r][column];
    for (let j = column; j < a[r].length; j += 1) a[r][j] /= divisor;
    for (let i = 0; i < a.length; i += 1) {
      if (i === r) continue;
      const factor = a[i][column];
      for (let j = column; j < a[i].length; j += 1) a[i][j] -= factor * a[r][j];
    }
    r += 1;
  }
  return r;
};

// No invariant vector in the irreducible fiveplet.
const vectorEquations = L.flatMap((generator) => generator);
assert(5 - rank(vectorEquations) === 0, "spin-two fiveplet must have no invariant vector");

// A bilinear C between two independent fiveplets would have to satisfy
// L_i^T C=0 already under rotations of the first factor alone.
const independentRows = [];
for (const generator of L) {
  for (let row = 0; row < 5; row += 1) {
    for (let column = 0; column < 5; column += 1) {
      const equation = Array(25).fill(0);
      for (let k = 0; k < 5; k += 1) equation[k * 5 + column] += generator[k][row];
      independentRows.push(equation);
    }
  }
}
assert(25 - rank(independentRows) === 0,
  "independent SO(3) factors must admit no nonzero fixed bilinear intertwiner");

// Under one diagonal SO(3), invariance is L_i^T C + C L_i=0.
const diagonalRows = [];
for (const generator of L) {
  for (let row = 0; row < 5; row += 1) {
    for (let column = 0; column < 5; column += 1) {
      const equation = Array(25).fill(0);
      for (let k = 0; k < 5; k += 1) {
        equation[k * 5 + column] += generator[k][row];
        equation[row * 5 + k] += generator[k][column];
      }
      diagonalRows.push(equation);
    }
  }
}
assert(25 - rank(diagonalRows) === 1,
  "diagonal SO(3) must have one bilinear invariant on an irreducible real fiveplet");

const quadrupole = (x) => {
  const r2 = x.reduce((s, value) => s + value * value, 0);
  return x.map((xi, i) => x.map((xj, j) => xi * xj - (i === j ? r2 / 3 : 0)));
};
const coordinates = (q) => basis.map((_, i) => coordinate(q, i));
const q = coordinates(quadrupole([1, 2, 3]));
const a = 1.7;
const b = -0.4;
const sigma = q.map((value) => a * value);
const external = q.map((value) => b * value);
const norm2 = (x) => x.reduce((s, value) => s + value * value, 0);
const potential = (s, r) => norm2(s.map((value, i) => value - a * q[i]))
  + 2 * norm2(r.map((value, i) => value - b * q[i]));
assert(near(potential(sigma, external), 0), "shared-group square potential must align both fiveplets");
assert(potential(sigma.map((value, i) => value + (i === 0 ? 0.1 : 0)), external) > 0,
  "aligned tensor deviations must be massive for positive square coefficients");

const dimProductGroup = 3 + 3 + 3;
const dimDiagonal = 3;
const dimDirectorStabilizer = 1;
assert(dimProductGroup - dimDiagonal === 6, "spontaneous product-to-diagonal locking must create six modes");
assert(dimDiagonal - dimDirectorStabilizer === 2, "director selection inside the diagonal group must create two modes");
assert(dimProductGroup - dimDirectorStabilizer === 8, "fully global spontaneous route must carry eight Goldstones");

console.log("Three-fiveplet diagonal-locking and Goldstone gate: PASS");
console.log("independent_SO3_bilinear_intertwiner_dimension=0");
console.log("diagonal_SO3_fiveplet_bilinear_dimension=1");
console.log("aligned_square_potential_exists_given_common_group=true");
console.log("global_product_to_diagonal_Goldstones=6");
console.log("diagonal_director_Goldstones=2");
console.log("fully_spontaneous_global_Goldstones=8");
console.log("derived_common_group_or_locking_field_not_supplied=true");
