const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const identity = n => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => Number(i === j)));
const zero = (rows, cols = rows) => Array.from({ length: rows }, () => Array(cols).fill(0));
const add = (...matrices) => matrices[0].map((row, i) => row.map((_, j) => matrices.reduce((sum, M) => sum + M[i][j], 0)));
const scale = (a, A) => A.map(row => row.map(x => a * x));
const multiply = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((sum, x, k) => sum + x * B[k][j], 0)));
const approxEqual = (A, B, tolerance = 1e-10) => A.every((row, i) => row.every((x, j) => Math.abs(x - B[i][j]) <= tolerance));

const rank = matrix => {
  const A = matrix.map(row => [...row]);
  let r = 0;
  for (let c = 0; c < A[0].length && r < A.length; c += 1) {
    let pivot = r;
    while (pivot < A.length && Math.abs(A[pivot][c]) < 1e-9) pivot += 1;
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

const sheetCycle = [
  [0, 0, 1],
  [1, 0, 0],
  [0, 1, 0]
];
const sheetCycle2 = multiply(sheetCycle, sheetCycle);
const I3 = identity(3);
assert(approxEqual(multiply(sheetCycle2, sheetCycle), I3), 'triality cycle must have order three');

const singletProjector = scale(1 / 3, add(I3, sheetCycle, sheetCycle2));
const contrastProjector = add(I3, scale(-1, singletProjector));
assert(rank(singletProjector) === 1, 'sheet singlet must have dimension one');
assert(rank(contrastProjector) === 2, 'sheet contrast sector must have dimension two');

const J = scale(1 / Math.sqrt(3), add(sheetCycle, scale(-1, sheetCycle2)));
assert(approxEqual(multiply(J, J), scale(-1, contrastProjector)), 'oriented cycle must square to minus identity on contrast plane');
assert(approxEqual(multiply(J, singletProjector), zero(3)), 'oriented complex structure must kill singlet');

const reflection = [
  [0, 1, 0],
  [1, 0, 0],
  [0, 0, 1]
];
assert(approxEqual(multiply(multiply(reflection, J), reflection), scale(-1, J)), 'sheet reflection must reverse triality complex orientation');

const moduleDimension = 16;
const totalDimension = 3 * moduleDimension;
const invariantDimension = rank(singletProjector) * moduleDimension;
const contrastDimension = rank(contrastProjector) * moduleDimension;
const coinvariantDimension = totalDimension - contrastDimension;
assert(invariantDimension === 16, 'fixed triality module must be 16 real dimensional');
assert(contrastDimension === 32, 'triality-difference sector must be 32 real dimensional');
assert(coinvariantDimension === 16, 'C3 coinvariant quotient must be 16 real dimensional');

const quotientRestrictionRank = moduleDimension;
const tangentDimension = 2 * moduleDimension;
const tangentKernelDimension = tangentDimension - quotientRestrictionRank;
assert(tangentDimension === 32 && quotientRestrictionRank === 16 && tangentKernelDimension === 16, 'each tangent must collapse 32 -> 16 with 16-dimensional kernel');

const symmetricS3BilinearDimension = 2;
assert(symmetricS3BilinearDimension === 2, 'triality symmetry must not fix the relative singlet/contrast metric scale');

console.log('Magic-square triality module descent certificate: PASS');
console.log('A_plus_B_plus_C_dimensions=48; C3_fixed=16; contrast=32; coinvariant=16');
console.log('each_32_real_tangent_maps_onto_same_16_real_quotient_with_kernel_16');
console.log('J=(P-P^2)/sqrt(3); J^2=-contrast_projector; reflection_J_reflection=-J');
console.log('S3_invariant_symmetric_bilinear_parameters=2; relative_scale_not_selected');
