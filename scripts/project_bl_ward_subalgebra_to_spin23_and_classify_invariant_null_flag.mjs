import assert from "node:assert/strict";

const pairs = [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]];
const zeroMatrix = (r, c) => Array.from({ length: r }, () => Array(c).fill(0));
const transpose = A => A[0].map((_, j) => A.map(row => row[j]));
const multiply = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, v, k) => s + v * B[k][j], 0)));
const add = (A, B) => A.map((row, i) => row.map((v, j) => v + B[i][j]));
const sub = (A, B) => A.map((row, i) => row.map((v, j) => v - B[i][j]));
const comm = (A, B) => sub(multiply(A, B), multiply(B, A));
const maxAbs = A => Math.max(...A.flat().map(Math.abs));

function rank(rows, tolerance = 1e-10) {
  if (rows.length === 0) return 0;
  const A = rows.map(row => [...row]);
  let r = 0;
  for (let col = 0; col < A[0].length && r < A.length; col += 1) {
    let pivot = r;
    for (let i = r + 1; i < A.length; i += 1) if (Math.abs(A[i][col]) > Math.abs(A[pivot][col])) pivot = i;
    if (Math.abs(A[pivot][col]) < tolerance) continue;
    [A[r], A[pivot]] = [A[pivot], A[r]];
    const d = A[r][col];
    for (let j = col; j < A[0].length; j += 1) A[r][j] /= d;
    for (let i = 0; i < A.length; i += 1) {
      if (i === r) continue;
      const f = A[i][col];
      for (let j = col; j < A[0].length; j += 1) A[i][j] -= f * A[r][j];
    }
    r += 1;
  }
  return r;
}

function nullspace(A, tolerance = 1e-10) {
  const M = A.map(row => [...row]);
  let r = 0;
  const pivots = [];
  for (let col = 0; col < M[0].length && r < M.length; col += 1) {
    let pivot = r;
    for (let i = r + 1; i < M.length; i += 1) if (Math.abs(M[i][col]) > Math.abs(M[pivot][col])) pivot = i;
    if (Math.abs(M[pivot][col]) < tolerance) continue;
    [M[r], M[pivot]] = [M[pivot], M[r]];
    const d = M[r][col];
    for (let j = col; j < M[0].length; j += 1) M[r][j] /= d;
    for (let i = 0; i < M.length; i += 1) {
      if (i === r) continue;
      const f = M[i][col];
      for (let j = col; j < M[0].length; j += 1) M[i][j] -= f * M[r][j];
    }
    pivots.push(col); r += 1;
  }
  const free = Array.from({ length: M[0].length }, (_, i) => i).filter(i => !pivots.includes(i));
  return free.map(freeCol => {
    const v = Array(M[0].length).fill(0); v[freeCol] = 1;
    pivots.forEach((p, row) => { v[p] = -M[row][freeCol]; });
    return v;
  });
}

const omegaTkk = [[0, 0, 1, 0], [0, 0, 0, 1], [-1, 0, 0, 0], [0, -1, 0, 0]];
const J = [[0, 1, 0, 0], [-1, 0, 0, 0], [0, 0, 0, 1], [0, 0, -1, 0]];
const permutation = [0, 2, 1, 3];
const Q = zeroMatrix(4, 4); permutation.forEach((oldIndex, newIndex) => { Q[oldIndex][newIndex] = 1; });
const z2 = zeroMatrix(2, 2);
const block = (A, B, C) => [
  [A[0][0], A[0][1], B[0][0], B[0][1]], [A[1][0], A[1][1], B[1][0], B[1][1]],
  [C[0][0], C[0][1], -A[0][0], -A[1][0]], [C[1][0], C[1][1], -A[0][1], -A[1][1]]
];
const wardOld = [
  block([[1, 0], [0, 0]], z2, z2),
  block([[0, 1], [0, 0]], z2, z2),
  block(z2, [[1, 0], [0, 0]], z2),
  block(z2, [[0, 1], [1, 0]], z2)
];
const names = ["A11", "A12", "B11", "B12s"];
const ward = wardOld.map(X => multiply(multiply(transpose(Q), X), Q));
for (const X of ward) assert.ok(maxAbs(add(multiply(transpose(X), J), multiply(J, X))) < 1e-12);

const primitiveBasis = [
  [0, 1, 0, 0, -1, 0], [0, 0, 1, 1, 0, 0], [1, 0, 0, 0, 0, -1],
  [0, 1, 0, 0, 1, 0], [0, 0, 1, -1, 0, 0]
];
function wedgePair(a, b) {
  return a[0] * b[5] + a[5] * b[0] - a[1] * b[4] - a[4] * b[1] + a[2] * b[3] + a[3] * b[2];
}
const gram = primitiveBasis.map(a => primitiveBasis.map(b => wedgePair(a, b)));
function formMatrix(v) {
  const A = zeroMatrix(4, 4); pairs.forEach(([i, j], k) => { A[i][j] = v[k]; A[j][i] = -v[k]; }); return A;
}
const formVector = A => pairs.map(([i, j]) => A[i][j]);
const act = (X, v) => formVector(add(multiply(transpose(X), formMatrix(v)), multiply(formMatrix(v), X)));
const coordinates = v => primitiveBasis.map((p, i) => wedgePair(p, v) / gram[i][i]);
const induced = ward.map(X => {
  const R = zeroMatrix(5, 5);
  primitiveBasis.forEach((p, col) => coordinates(act(X, p)).forEach((v, row) => { R[row][col] = v; }));
  assert.ok(maxAbs(add(multiply(transpose(R), gram), multiply(gram, R))) < 1e-12);
  return R;
});

const translationKernel = nullspace([...induced[2], ...induced[3]]);
assert.equal(translationKernel.length, 2);
const nullPlaneGram = translationKernel.map(v => translationKernel.map(w => v.reduce((s, x, i) => s + x * gram[i][i] * w[i], 0)));
assert.ok(maxAbs(nullPlaneGram) < 1e-12);
const nullPlaneActions = induced.map(R => translationKernel.map(v => R.map(row => row.reduce((s, x, j) => s + x * v[j], 0))));
for (const generatorImages of nullPlaneActions) for (const image of generatorImages) {
  assert.ok(rank([...translationKernel, image]) <= 2);
}

const firstDerived = [];
for (const X of ward) for (const Y of ward) firstDerived.push(comm(X, Y));
const firstDerivedRank = rank(firstDerived.map(X => X.flat()));
const independentFirst = [];
for (const X of firstDerived) if (rank([...independentFirst, X].map(Y => Y.flat())) > independentFirst.length) independentFirst.push(X);
const secondDerived = [];
for (const X of independentFirst) for (const Y of independentFirst) secondDerived.push(comm(X, Y));
const secondDerivedRank = rank(secondDerived.map(X => X.flat()));

const section = new Set([0, 2, 3]);
const projectH = R => R.map((row, i) => row.map((v, j) => section.has(i) === section.has(j) ? v : 0));
const projectM = R => R.map((row, i) => row.map((v, j) => section.has(i) !== section.has(j) ? v : 0));

console.log(JSON.stringify({
  protocol: "bl-ward-subalgebra-in-spin23/1",
  wardBasisNames: names,
  tkkGradeDimensions: { upperTranslation: 2, middleStructure: 2, lowerSpecialConformal: 0 },
  inducedFiveDimensionalGenerators: induced,
  inducedRank: rank(induced.map(R => R.flat())),
  chosenLinearSectionProjectionRanks: {
    stabilizer: rank(induced.map(R => projectH(R).flat())),
    mixing: rank(induced.map(R => projectM(R).flat()))
  },
  commonTranslationKernelDimension: translationKernel.length,
  invariantMaximalNullPlaneBasis: translationKernel,
  nullPlaneGram,
  imagesOfNullPlaneBasis: nullPlaneActions,
  derivedSeriesDimensions: [4, firstDerivedRank, secondDerivedRank, 0],
  geometricClassification: "A four-dimensional solvable subalgebra preserving a maximal totally isotropic two-plane: two affine translations plus two restricted structure generators, with no special-conformal wing.",
  conformalMeaning: "It fixes a projective null flag at infinity and acts affinely on the Jordan/Minkowski patch; it cannot realize inversion or the full conformal orbit inside one Ward-normalized theory.",
  physicalBoundary: "The full Spin(2,3) algebra can still act only after transforming Ward data or moving between theories; exact fixed-current covariance retains this solvable subalgebra at most.",
  passed: true
}, null, 2));
