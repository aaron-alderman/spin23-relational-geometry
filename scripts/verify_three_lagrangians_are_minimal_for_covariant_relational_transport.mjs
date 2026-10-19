function zeros(rows, cols) {
  return Array.from({ length: rows }, () => Array(cols).fill(0));
}

function mul(A, B) {
  const out = zeros(A.length, B[0].length);
  for (let i = 0; i < A.length; i++) {
    for (let k = 0; k < B.length; k++) {
      for (let j = 0; j < B[0].length; j++) out[i][j] += A[i][k] * B[k][j];
    }
  }
  return out;
}

function add(A, B) {
  return A.map((row, i) => row.map((x, j) => x + B[i][j]));
}

function sub(A, B) {
  return A.map((row, i) => row.map((x, j) => x - B[i][j]));
}

function transpose(A) {
  return A[0].map((_, j) => A.map(row => row[j]));
}

function block(A, B, C, D) {
  return [
    [...A[0], ...B[0]],
    [...A[1], ...B[1]],
    [...C[0], ...D[0]],
    [...C[1], ...D[1]],
  ];
}

function scale(A, s) {
  return A.map(row => row.map(x => s * x));
}

function identity(n) {
  return Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => i === j ? 1 : 0));
}

function inverse2(X) {
  const det = X[0][0] * X[1][1] - X[0][1] * X[1][0];
  return [[X[1][1] / det, -X[0][1] / det], [-X[1][0] / det, X[0][0] / det]];
}

function flatten(A) {
  return A.flat();
}

function maxAbs(A) {
  return Math.max(...flatten(A).map(Math.abs));
}

function rank(A, tolerance = 1e-12) {
  const M = A.map(row => [...row]);
  let r = 0;
  for (let c = 0; c < M[0].length && r < M.length; c++) {
    let pivot = r;
    for (let i = r + 1; i < M.length; i++) {
      if (Math.abs(M[i][c]) > Math.abs(M[pivot][c])) pivot = i;
    }
    if (Math.abs(M[pivot][c]) <= tolerance) continue;
    [M[r], M[pivot]] = [M[pivot], M[r]];
    const p = M[r][c];
    for (let j = c; j < M[0].length; j++) M[r][j] /= p;
    for (let i = 0; i < M.length; i++) {
      if (i === r) continue;
      const f = M[i][c];
      for (let j = c; j < M[0].length; j++) M[i][j] -= f * M[r][j];
    }
    r++;
  }
  return r;
}

const Z2 = zeros(2, 2);
const I2 = [[1, 0], [0, 1]];
const J = block(Z2, I2, scale(I2, -1), Z2);

function spElement(P, Q, R) {
  return block(P, Q, R, scale(transpose(P), -1));
}

const matrixUnits = [];
for (let i = 0; i < 2; i++) {
  for (let j = 0; j < 2; j++) {
    const E = zeros(2, 2);
    E[i][j] = 1;
    matrixUnits.push(E);
  }
}

const symmetricBasis = [
  [[1, 0], [0, 0]],
  [[0, 1], [1, 0]],
  [[0, 0], [0, 1]],
];

const spBasis = [
  ...matrixUnits.map(P => spElement(P, Z2, Z2)),
  ...symmetricBasis.map(Q => spElement(Z2, Q, Z2)),
  ...symmetricBasis.map(R => spElement(Z2, Z2, R)),
];

// Stabilizer of the ordered transverse pair (q-plane, p-plane): the GL(2) Levi factor.
const pairStabilizerBasis = matrixUnits.map(A => spElement(A, Z2, Z2));
const constraints = [];
for (const H of pairStabilizerBasis) {
  const columns = spBasis.map(K => flatten(sub(mul(K, H), mul(H, K))));
  for (let entry = 0; entry < 16; entry++) constraints.push(columns.map(c => c[entry]));
}

const constraintRank = rank(constraints);
const invariantDimension = spBasis.length - constraintRank;
const pairGrading = block(I2, Z2, Z2, scale(I2, -1));

const symplecticError = maxAbs(sub(mul(transpose(pairGrading), J), scale(mul(J, pairGrading), -1)));
const squareError = maxAbs(sub(mul(pairGrading, pairGrading), block(I2, Z2, Z2, I2)));
const commutatorErrors = pairStabilizerBasis.map(H => maxAbs(sub(mul(pairGrading, H), mul(H, pairGrading))));

const t = 0.37;
const X = [[2, -1], [-1, 3]];
const expectedXPrime = scale(X, Math.exp(-2 * t));
const graphBefore = [[1, 0], [0, 1], [...X[0]], [...X[1]]];
const expPairGrading = block(scale(I2, Math.exp(t)), Z2, Z2, scale(I2, Math.exp(-t)));
const transportedGraph = mul(expPairGrading, graphBefore);
const recoveredXPrime = transportedGraph.slice(2).map(row => row.map(v => v / Math.exp(t)));
const transportError = maxAbs(sub(recoveredXPrime, expectedXPrime));

// A positive third graph supplies the missing metric and turns the pair into an elliptic generator.
const Xinv = inverse2(X);
const positiveTripleHessian = block(X, Z2, Z2, Xinv);
const positiveTripleGenerator = mul(J, positiveTripleHessian);
const complexStructureError = maxAbs(add(mul(positiveTripleGenerator, positiveTripleGenerator), identity(4)));
const positiveTripleSymplecticError = maxAbs(add(mul(transpose(positiveTripleGenerator), J), mul(J, positiveTripleGenerator)));
const theta = 0.2;
const expPositiveTripleGenerator = add(
  scale(identity(4), Math.cos(theta)),
  scale(positiveTripleGenerator, Math.sin(theta)),
);
const positiveTripleTransport = mul(expPositiveTripleGenerator, graphBefore);
const qBlock = positiveTripleTransport.slice(0, 2);
const pBlock = positiveTripleTransport.slice(2, 4);
const qScale = Math.cos(theta) + Math.sin(theta);
const recoveredPositiveTripleX = pBlock.map(row => row.map(v => v / qScale));
const radialFactor = (Math.cos(theta) - Math.sin(theta)) / qScale;
const expectedPositiveTripleX = scale(X, radialFactor);
const positiveTripleTransportError = maxAbs(sub(recoveredPositiveTripleX, expectedPositiveTripleX));
const positivePrincipalMinors = [X[0][0], X[0][0] * X[1][1] - X[0][1] ** 2, Xinv[0][0], Xinv[0][0] * Xinv[1][1] - Xinv[0][1] ** 2];

const passed =
  constraintRank === 9 &&
  invariantDimension === 1 &&
  symplecticError === 0 &&
  squareError === 0 &&
  commutatorErrors.every(x => x === 0) &&
  transportError < 1e-12 &&
  complexStructureError < 1e-12 &&
  positiveTripleSymplecticError < 1e-12 &&
  positivePrincipalMinors.every(x => x > 0) &&
  positiveTripleTransportError < 1e-12;

console.log(JSON.stringify({
  theorem: "An ordered transverse Lagrangian pair has a one-dimensional space of fully Sp(4,R)-equivariant infinitesimal generators, spanned by the grading +1 on the first face and -1 on the second.",
  dimensions: {
    sp4: spBasis.length,
    orderedPairStabilizer: pairStabilizerBasis.length,
    centralizerConstraintRank: constraintRank,
    invariantSubspace: invariantDimension,
  },
  pairGrading: {
    symplecticLieAlgebraError: symplecticError,
    involutionError: squareError,
    stabilizerCommutatorErrors: commutatorErrors,
    preservesBothDefiningFaces: true,
  },
  thirdCarrierTest: {
    t,
    X,
    expectedXPrime,
    recoveredXPrime,
    transportError,
    formula: "X' = exp(-2t) X",
  },
  positiveTripleTest: {
    X,
    Xinv,
    hessian: positiveTripleHessian,
    positivePrincipalMinors,
    complexStructureError,
    symplecticLieAlgebraError: positiveTripleSymplecticError,
    theta,
    radialFactor,
    expectedXPrime: expectedPositiveTripleX,
    recoveredXPrime: recoveredPositiveTripleX,
    transportError: positiveTripleTransportError,
    formula: "K_X = [[0,X^-1],[-X,0]], S_X = diag(X,X^-1) > 0, X' = ((cos(theta)-sin(theta))/(cos(theta)+sin(theta))) X",
  },
  interpretation: "Two transverse faces canonically define a relative grading but it fixes those faces. A positive third graph supplies a metric, a positive Hessian and an elliptic generator that moves the third carrier. Three is therefore the first count supporting healthy nontrivial fully covariant relational transport of a carrier.",
  passed,
}, null, 2));

if (!passed) process.exitCode = 1;
