import assert from "node:assert/strict";

const violationMatrix = [
  [1, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, -1],
  [0, 0, 0, 1, 1, 0, -1],
  [0, 0, 0, 1, 0, 1, 1],
];
const sectors = ["Q", "u^c", "d^c", "L", "e^c", "nu^c", "H"];
const yukawas = ["y_u", "y_d", "y_e", "y_nu"];
const lambda = [5, 5, 1, 1, 1, 0, 0];
const hypercharge6 = [1, -4, 2, -3, 6, 0, 3];
const charge3BL = [1, -1, -1, -3, 3, 3, 0];
const apply = (A, x) => A.map((row) => row.reduce((s, a, i) => s + a * x[i], 0));

const rank = (input) => {
  const A = input.map((row) => row.map(Number));
  let r = 0;
  for (let c = 0; c < A[0].length && r < A.length; c += 1) {
    let p = r;
    while (p < A.length && Math.abs(A[p][c]) < 1e-12) p += 1;
    if (p === A.length) continue;
    [A[r], A[p]] = [A[p], A[r]];
    const pivot = A[r][c];
    A[r] = A[r].map((x) => x / pivot);
    for (let i = 0; i < A.length; i += 1) if (i !== r) {
      const f = A[i][c];
      A[i] = A[i].map((x, j) => x - f * A[r][j]);
    }
    r += 1;
  }
  return r;
};

const kernelBasis = [
  [1, -1, -1, 0, 0, 0, 0],
  [0, 0, 0, 1, -1, -1, 0],
  [0, -1, 1, 0, 1, -1, 1],
];
assert.equal(rank(violationMatrix), 4);
assert.equal(7 - rank(violationMatrix), 3);
for (const vector of kernelBasis) assert.deepEqual(apply(violationMatrix, vector), [0, 0, 0, 0]);
assert.deepEqual(apply(violationMatrix, hypercharge6), [0, 0, 0, 0]);
assert.deepEqual(apply(violationMatrix, charge3BL), [0, 0, 0, 0]);

const breakingClass = apply(violationMatrix, lambda);
assert.deepEqual(breakingClass, [10, 6, 2, 1]);
const spurionCharges = breakingClass.map((x) => -x);
assert.deepEqual(breakingClass.map((x, i) => x + spurionCharges[i]), [0, 0, 0, 0]);
assert.equal(new Set(spurionCharges).size, 4);

// Adding any conserved direction leaves the quotient representative unchanged.
for (const [a, b, c] of [[2, -3, 5], [-1, 4, 0]]) {
  const shifted = lambda.map((x, i) => x + a * hypercharge6[i] + b * charge3BL[i] + c * kernelBasis[2][i]);
  assert.deepEqual(apply(violationMatrix, shifted), breakingClass);
}

// One-generation spurion phases commute, so their Maurer-Cartan curvature
// commutator vanishes even though the parameter space is multidimensional.
const diagonalGenerators = spurionCharges.map((q, i) =>
  spurionCharges.map((_, r) => spurionCharges.map((__, s) => Number(r === s && r === i) * q))
);
for (let i = 0; i < diagonalGenerators.length; i += 1) for (let j = 0; j < diagonalGenerators.length; j += 1) {
  const AB = diagonalGenerators[i].map((row) => diagonalGenerators[0].map((_, col) => row.reduce((s, x, k) => s + x * diagonalGenerators[j][k][col], 0)));
  const BA = diagonalGenerators[j].map((row) => diagonalGenerators[0].map((_, col) => row.reduce((s, x, k) => s + x * diagonalGenerators[i][k][col], 0)));
  assert.deepEqual(AB, BA);
}

console.log(JSON.stringify({
  protocol: "incidence-spurion-ward-completion-and-breaking-quotient/1",
  sectors,
  yukawas,
  violationMatrix,
  rank: 4,
  conservedKernelDimension: 3,
  conservedKernelBasis: kernelBasis,
  incidenceBreakingClass: breakingClass,
  quotientStatement: "The violation map induces an isomorphism R^7/kernel(V) -> R^4, so (10,6,2,1) is the exact conserved-current-independent incidence class.",
  spurionCompletion: {
    spurionCharges,
    everyYukawaTermInvariantInExtendedSystem: true,
    distinctLinearSpurionChargesRequired: 4,
  },
  curvatureBoundary: "The four one-generation spurion phase generators commute. They provide a multidimensional parameter base but zero non-Abelian commutator curvature; noncommuting flavor matrices are required.",
  passed: true,
}, null, 2));
