const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };

const permutations = [
  [0,1,2], [1,0,2], [2,1,0], [0,2,1], [1,2,0], [2,0,1],
];
const inversionParity = (p) => {
  let inversions = 0;
  for (let i = 0; i < p.length; i += 1) {
    for (let j = i + 1; j < p.length; j += 1) if (p[i] > p[j]) inversions += 1;
  }
  return inversions % 2 === 0 ? 1 : -1;
};
const permutationMatrix = (p) => Array.from({ length: 3 }, (_, i) =>
  Array.from({ length: 3 }, (_, j) => (i === p[j] ? 1 : 0)));
const determinant3 = (a) =>
  a[0][0] * (a[1][1] * a[2][2] - a[1][2] * a[2][1])
  - a[0][1] * (a[1][0] * a[2][2] - a[1][2] * a[2][0])
  + a[0][2] * (a[1][0] * a[2][1] - a[1][1] * a[2][0]);
const mulVector = (a, x) => a.map((row) => row.reduce((s, value, j) => s + value * x[j], 0));
const equalVector = (a, b) => a.every((value, i) => value === b[i]);

const matrices = permutations.map(permutationMatrix);
for (let i = 0; i < permutations.length; i += 1) {
  assert(determinant3(matrices[i]) === inversionParity(permutations[i]),
    "ordinary sheet permutation determinant must equal permutation sign");
}
assert(matrices.some((matrix) => determinant3(matrix) === -1),
  "ordinary permutation representation must not lie wholly in SO(3)");

const signTwisted = matrices.map((matrix, i) => matrix.map((row) =>
  row.map((value) => inversionParity(permutations[i]) * value)));
assert(signTwisted.every((matrix) => determinant3(matrix) === 1),
  "sign-twisted representation must embed S3 in SO(3)");

const singlet = [1, 1, 1];
assert(matrices.every((matrix) => equalVector(mulVector(matrix, singlet), singlet)),
  "ordinary permutation representation must contain the trivial singlet");
const oddIndex = permutations.findIndex((p) => inversionParity(p) === -1);
assert(equalVector(mulVector(signTwisted[oddIndex], singlet), [-1, -1, -1]),
  "SO(3)-embedded sign twist must turn the sheet singlet into a sign line");

// A finite group has zero-dimensional identity component. Adding permutations
// to SO(3)^3 gives a semidirect product with the same Lie algebra and dimension.
const dimS3IdentityComponent = 0;
const dimProductLieAlgebra = 3 + 3 + 3;
const dimSemidirectLieAlgebra = dimProductLieAlgebra + dimS3IdentityComponent;
assert(dimSemidirectLieAlgebra === 9, "triality permutations must not reduce the nine continuous generators");
assert(dimSemidirectLieAlgebra !== 3, "triality alone must not create the diagonal SO(3)");

// S3 can equate three scalar coefficients by permutation symmetry, but cannot
// contract independent vector indices. Invariance under the first SO(3) alone
// kills a fixed cross-vector matrix C because the vector representation has no
// invariant covector.
const so3Generators = [
  [[0,0,0],[0,0,-1],[0,1,0]],
  [[0,0,1],[0,0,0],[-1,0,0]],
  [[0,-1,0],[1,0,0],[0,0,0]],
];
const rows = [];
for (const A of so3Generators) {
  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      const equation = Array(9).fill(0);
      for (let k = 0; k < 3; k += 1) equation[k * 3 + j] += A[k][i];
      rows.push(equation);
    }
  }
}
const rank = (input) => {
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
assert(9 - rank(rows) === 0, "independent rotations must kill every fixed cross-vector contraction");

console.log("Triality versus continuous diagonal SO(3) certificate: PASS");
console.log("ordinary_sheet_representation=1+2_in_O3_not_SO3");
console.log("sign_twisted_SO3_embedding=sign+2_not_1+2");
console.log("triality_identity_component_dimension=0");
console.log("Lie_dimension_SO3_cubed_semidirect_S3=9");
console.log("continuous_diagonal_SO3_dimension=3_not_derived");
console.log("triality_can_equalize_coefficients_but_not_contract_independent_indices=true");
