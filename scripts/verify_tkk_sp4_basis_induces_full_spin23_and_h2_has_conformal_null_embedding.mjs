import assert from "node:assert/strict";

const pairs = [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]];
const zeroMatrix = (r, c) => Array.from({ length: r }, () => Array(c).fill(0));
const transpose = A => A[0].map((_, j) => A.map(row => row[j]));
const multiply = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, v, k) => s + v * B[k][j], 0)));
const add = (A, B) => A.map((row, i) => row.map((v, j) => v + B[i][j]));
const maxAbs = A => Math.max(...A.flat().map(Math.abs));

const omegaTkk = [[0, 0, 1, 0], [0, 0, 0, 1], [-1, 0, 0, 0], [0, -1, 0, 0]];
const J = [[0, 1, 0, 0], [-1, 0, 0, 0], [0, 0, 0, 1], [0, 0, -1, 0]];
const permutation = [0, 2, 1, 3];
const Q = zeroMatrix(4, 4);
permutation.forEach((oldIndex, newIndex) => { Q[oldIndex][newIndex] = 1; });
assert.ok(maxAbs(add(multiply(multiply(transpose(Q), omegaTkk), Q), J.map(row => row.map(v => -v)))) < 1e-12);

const symmetric2 = [
  [[1, 0], [0, 0]],
  [[0, 1], [1, 0]],
  [[0, 0], [0, 1]]
];
const matrixUnits2 = [];
for (let i = 0; i < 2; i += 1) for (let j = 0; j < 2; j += 1) {
  const A = zeroMatrix(2, 2); A[i][j] = 1; matrixUnits2.push(A);
}
const block = (A, B, C, D) => [
  [...A[0], ...B[0]], [...A[1], ...B[1]], [...C[0], ...D[0]], [...C[1], ...D[1]]
];
const z2 = zeroMatrix(2, 2);
const tkkOld = [
  ...symmetric2.map(B => block(z2, B, z2, z2)),
  ...matrixUnits2.map(A => block(A, z2, z2, transpose(A).map(row => row.map(v => -v)))),
  ...symmetric2.map(C => block(z2, z2, C, z2))
];
const tkkNames = ["E11", "E12s", "E22", "H11", "H12", "H21", "H22", "F11", "F12s", "F22"];
for (const X of tkkOld) assert.ok(maxAbs(add(multiply(transpose(X), omegaTkk), multiply(omegaTkk, X))) < 1e-12);
const tkk = tkkOld.map(X => multiply(multiply(transpose(Q), X), Q));
for (const X of tkk) assert.ok(maxAbs(add(multiply(transpose(X), J), multiply(J, X))) < 1e-12);

const primitiveBasis = [
  [0, 1, 0, 0, -1, 0], [0, 0, 1, 1, 0, 0], [1, 0, 0, 0, 0, -1],
  [0, 1, 0, 0, 1, 0], [0, 0, 1, -1, 0, 0]
];
function wedgePair(a, b) {
  return a[0] * b[5] + a[5] * b[0] - a[1] * b[4] - a[4] * b[1] + a[2] * b[3] + a[3] * b[2];
}
const gram = primitiveBasis.map(a => primitiveBasis.map(b => wedgePair(a, b)));
function formMatrix(v) {
  const A = zeroMatrix(4, 4);
  pairs.forEach(([i, j], k) => { A[i][j] = v[k]; A[j][i] = -v[k]; });
  return A;
}
const formVector = A => pairs.map(([i, j]) => A[i][j]);
const act = (X, v) => formVector(add(multiply(transpose(X), formMatrix(v)), multiply(formMatrix(v), X)));
const coordinates = v => primitiveBasis.map((p, i) => wedgePair(p, v) / gram[i][i]);
const induced = tkk.map(X => {
  const R = zeroMatrix(5, 5);
  primitiveBasis.forEach((p, col) => coordinates(act(X, p)).forEach((v, row) => { R[row][col] = v; }));
  assert.ok(maxAbs(add(multiply(transpose(R), gram), multiply(gram, R))) < 1e-12);
  return R;
});

function rank(rows, tolerance = 1e-10) {
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
const section = new Set([0, 2, 3]);
const projectH = R => R.map((row, i) => row.map((v, j) => section.has(i) === section.has(j) ? v : 0));
const projectM = R => R.map((row, i) => row.map((v, j) => section.has(i) !== section.has(j) ? v : 0));
const totalRank = rank(induced.map(R => R.flat()));
const stabilizerProjectionRank = rank(induced.map(R => projectH(R).flat()));
const mixingProjectionRank = rank(induced.map(R => projectM(R).flat()));
assert.equal(totalRank, 10);
assert.equal(stabilizerProjectionRank, 4);
assert.equal(mixingProjectionRank, 6);

const etaDot = (x, y) => x[0] * y[0] - x[1] * y[1] - x[2] * y[2];
const q = x => etaDot(x, x);
const embed = x => [1, -q(x) / 2, ...x];
const ambientPair = (X, Y) => X[0] * Y[1] + X[1] * Y[0] + etaDot(X.slice(2), Y.slice(2));
const samples = [[0.7, -0.2, 0.4], [1.1, 0.3, -0.5], [-0.4, 0.8, 0.1]];
const embedded = samples.map(embed);
for (const X of embedded) assert.ok(Math.abs(ambientPair(X, X)) < 1e-12);
const distanceChecks = [];
for (let i = 0; i < samples.length; i += 1) for (let j = i + 1; j < samples.length; j += 1) {
  const difference = samples[i].map((v, k) => v - samples[j][k]);
  const ambient = ambientPair(embedded[i], embedded[j]);
  const expected = -q(difference) / 2;
  assert.ok(Math.abs(ambient - expected) < 1e-12);
  distanceChecks.push({ pair: [i, j], ambientPair: ambient, minusHalfMinkowskiSeparation: expected });
}

console.log(JSON.stringify({
  protocol: "tkk-to-primitive-spin23-and-null-embedding/1",
  tkkBasisNames: tkkNames,
  tkkBasisDimension: totalRank,
  primitiveMetric: gram,
  projectionRelativeToChosenLinearSection: {
    stabilizerProjectionRank,
    mixingProjectionRank
  },
  conformalEmbedding: "x -> [X+=1, X-=-q(x)/2, x]",
  ambientLightconeMetric: "Q=2 X+ X- + t^2-x^2-y^2",
  embeddedSamples: embedded,
  distanceChecks,
  representationDistinction: "H2(R) is the three-dimensional Jordan/Minkowski patch; the five-dimensional primitive-form space is the linear conformal ambient representation. The patch embeds projectively in the null cone, not canonically as a linear three-plane.",
  corpusReconciliation: "Any response family spanning H2(R), including the declared threshold family of documents 653-654, reconstructs the ten TKK generators and therefore induces all four stabilizer and six mixing directions in the ambient vector representation.",
  physicalBoundary: "Algebraic generation still does not prove that the ten transformations preserve one Standard-Model action, spectral measure, Ward normalization or Furey module.",
  passed: true
}, null, 2));
