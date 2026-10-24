const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const multiply = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((sum, x, k) => sum + x * B[k][j], 0)));
const subtract = (A, B) => A.map((row, i) => row.map((x, j) => x - B[i][j]));
const flatten = A => A.flat();

const rank = rows => {
  const A = rows.map(row => [...row]);
  let r = 0;
  for (let c = 0; c < A[0].length && r < A.length; c += 1) {
    let pivot = r;
    while (pivot < A.length && Math.abs(A[pivot][c]) < 1e-10) pivot += 1;
    if (pivot === A.length) continue;
    [A[r], A[pivot]] = [A[pivot], A[r]];
    const p = A[r][c];
    A[r] = A[r].map(x => x / p);
    for (let i = 0; i < A.length; i += 1) {
      if (i === r) continue;
      const factor = A[i][c];
      A[i] = A[i].map((x, j) => x - factor * A[r][j]);
    }
    r += 1;
  }
  return r;
};

const J = [
  [0, -1],
  [1, 0]
];
const K = [
  [1, 0],
  [0, -1]
];

// Linear constraints on T=[[a,b],[c,d]]. Build them by evaluating the
// commutator on each matrix-unit parameter basis.
const parameterBases = [
  [[1, 0], [0, 0]],
  [[0, 1], [0, 0]],
  [[0, 0], [1, 0]],
  [[0, 0], [0, 1]]
];
const constraintMatrix = operation => {
  const columns = parameterBases.map(operation).map(flatten);
  return columns[0].map((_, row) => columns.map(column => column[row]));
};

const complexLinearConstraints = constraintMatrix(T => subtract(multiply(T, J), multiply(J, T)));
const complexLinearDimension = 4 - rank(complexLinearConstraints);
assert(complexLinearDimension === 2, 'complex-linear intertwiner space must have two real dimensions');

const reflectionConstraints = constraintMatrix(T => subtract(multiply(T, K), multiply(K, T)));
const jointConstraints = [...complexLinearConstraints, ...reflectionConstraints];
const jointDimension = 4 - rank(jointConstraints);
assert(jointDimension === 1, 'complex-linear reflection-compatible intertwiner space must be one real dimensional');

// Explicit forms: complex-linear maps are aI+bJ; reflection compatibility
// forces b=0. Unit normalization leaves the two signs.
const Tcomplex = (a, b) => [
  [a, -b],
  [b, a]
];
const normSquared = (a, b) => a * a + b * b;
assert(normSquared(3, 4) === 25, 'complex scalar normalization must be radial');
const reflected = Tcomplex(1, 0);
assert(JSON.stringify(multiply(reflected, K)) === JSON.stringify(multiply(K, reflected)), 'real scalar ray must respect reflection');
const phaseMap = Tcomplex(0, 1);
assert(JSON.stringify(multiply(phaseMap, K)) !== JSON.stringify(multiply(K, phaseMap)), 'quarter-turn phase must violate matched reflection');

console.log('Triality-Furey complex intertwiner boundary certificate: PASS');
console.log('Hom_complex(real_dimension)=2; normalized_family=U(1)');
console.log('Hom_complex_plus_matched_reflection(real_dimension)=1; normalized_family={plus,minus}');
console.log('critical_missing_input=identification_of_sheet_reflection_with_Furey_conjugation');
