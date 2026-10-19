const n = 4;

function zeros(rows, cols) {
  return Array.from({ length: rows }, () => Array(cols).fill(0));
}

function add(A, B) {
  return A.map((row, i) => row.map((x, j) => x + B[i][j]));
}

function sub(A, B) {
  return A.map((row, i) => row.map((x, j) => x - B[i][j]));
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

// Stabilizer Lie algebra of L0 = {(q,0)}: C=0, with arbitrary A and symmetric B.
const parabolicBasis = [
  ...matrixUnits.map(A => spElement(A, Z2, Z2)),
  ...symmetricBasis.map(B => spElement(Z2, B, Z2)),
];

const constraints = [];
for (const H of parabolicBasis) {
  const columns = spBasis.map(K => flatten(sub(mul(K, H), mul(H, K))));
  for (let entry = 0; entry < n * n; entry++) {
    constraints.push(columns.map(column => column[entry]));
  }
}

const constraintRank = rank(constraints);
const invariantDimension = spBasis.length - constraintRank;

function graphResidualTest(X) {
  const G = [[1, 0], [0, 1], [...X[0]], [...X[1]]];
  const N = [[-X[0][0], -X[0][1], 1, 0], [-X[1][0], -X[1][1], 0, 1]];
  const S = mul(transpose(N), N);
  const K = mul(J, S);
  return {
    X,
    symmetryError: maxAbs(sub(S, transpose(S))),
    graphAnnihilationError: maxAbs(mul(K, G)),
  };
}

const graphTests = [
  [[0, 0], [0, 0]],
  [[1, 0], [0, 2]],
  [[2, -1], [-1, 3]],
  [[-2, 4], [4, 1]],
].map(graphResidualTest);

const passed =
  spBasis.length === 10 &&
  parabolicBasis.length === 7 &&
  constraintRank === 10 &&
  invariantDimension === 0 &&
  graphTests.every(test => test.symmetryError === 0 && test.graphAnnihilationError === 0);

console.log(JSON.stringify({
  theorem: "The adjoint representation of Sp(4,R) has no nonzero vector fixed by the Lagrangian stabilizer, so there is no nonzero fully Sp(4,R)-equivariant state-only map Lag(2,R) -> sp(4,R).",
  dimensions: {
    sp4: spBasis.length,
    lagrangianStabilizer: parabolicBasis.length,
    centralizerConstraintRank: constraintRank,
    invariantSubspace: invariantDimension,
  },
  graphResidualPenalty: graphTests,
  interpretation: "The metric-dependent quadratic penalty ||p-Xq||^2 is symmetric and positive semidefinite, but its Hamiltonian generator annihilates the graph p=Xq and therefore cannot update that state.",
  passed,
}, null, 2));

if (!passed) process.exitCode = 1;
