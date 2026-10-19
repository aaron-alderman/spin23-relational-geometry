function zeros(rows, cols) {
  return Array.from({ length: rows }, () => Array(cols).fill(0));
}

function identity(n) {
  return Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => i === j ? 1 : 0));
}

function add(A, B) {
  return A.map((row, i) => row.map((x, j) => x + B[i][j]));
}

function scale(A, s) {
  return A.map(row => row.map(x => s * x));
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

function outer(v) {
  return v.map(x => v.map(y => x * y));
}

function det2(X) {
  return X[0][0] * X[1][1] - X[0][1] * X[1][0];
}

function inverse2(X) {
  const d = det2(X);
  return [[X[1][1] / d, -X[0][1] / d], [-X[1][0] / d, X[0][0] / d]];
}

function area(u, v) {
  return u[0] * v[1] - u[1] * v[0];
}

function maxAbs(A) {
  return Math.max(...A.flat().map(Math.abs));
}

function weightedRaySum(vectors, weights) {
  return vectors.reduce((sum, v, i) => add(sum, scale(outer(v), weights[i])), zeros(2, 2));
}

function cauchyBinetRhs(vectors, weights) {
  let sum = 0;
  for (let i = 0; i < vectors.length; i++) {
    for (let j = i + 1; j < vectors.length; j++) {
      sum += weights[i] * weights[j] * area(vectors[i], vectors[j]) ** 2;
    }
  }
  return sum;
}

function E(n, i, j) {
  const out = zeros(n, n);
  out[i][j] = 1;
  return out;
}

const EP = E(3, 0, 0);
const EI = E(3, 1, 1);
const EN = E(3, 2, 2);
const XPI = add(E(3, 0, 1), E(3, 1, 0));
const XPN = add(E(3, 0, 2), E(3, 2, 0));
const XIN = add(E(3, 1, 2), E(3, 2, 1));
const coarseBasis = [EP, EI, EN, XPI, XPN, XIN];

const XD = add(E(4, 0, 1), E(4, 1, 0));
const XM = add(E(4, 2, 3), E(4, 3, 2));
const typedMixedProductError = maxAbs(mul(XD, XM));

const localNaturalCandidates = [
  [[1, 0], [0, 0]],
  [[0, 0], [0, 1]],
  [[0, 1], [1, 0]],
];
const localCandidateDeterminants = localNaturalCandidates.map(det2);

const canonicalVectors = [[1, 0], [0, 1], [1, 1]];
const [a, b, c] = [2, 3, 5];
const rho = weightedRaySum(canonicalVectors, [a, b, c]);
const rhoDet = det2(rho);
const canonicalExpectedDet = a * b + a * c + b * c;

const generalTests = [
  { vectors: [[1, 0], [0, 1], [1, 1]], weights: [2, 3, 5] },
  { vectors: [[1, 2], [-1, 3], [4, -2]], weights: [7, 2, 3] },
  { vectors: [[2, -1], [3, 4], [-2, 5], [1, 1]], weights: [1, 4, 2, 6] },
].map(({ vectors, weights }) => {
  const X = weightedRaySum(vectors, weights);
  const lhs = det2(X);
  const rhs = cauchyBinetRhs(vectors, weights);
  return { vectors, weights, lhs, rhs, error: Math.abs(lhs - rhs) };
});

const rhoInv = inverse2(rho);
const Z2 = zeros(2, 2);
const I2 = identity(2);
const J = block(Z2, I2, scale(I2, -1), Z2);
const S = block(rho, Z2, Z2, rhoInv);
const K = mul(J, S);
const KSquaredPlusIdentity = add(mul(K, K), identity(4));
const positivePrincipalMinors = [rho[0][0], det2(rho), rhoInv[0][0], det2(rhoInv)];

const oneRayBoundaryDeterminants = canonicalVectors.map((_, i) => {
  const weights = [0, 0, 0];
  weights[i] = 1;
  return det2(weightedRaySum(canonicalVectors, weights));
});

const twoRayInteriorDeterminants = [
  det2(weightedRaySum(canonicalVectors, [1, 1, 0])),
  det2(weightedRaySum(canonicalVectors, [1, 0, 1])),
  det2(weightedRaySum(canonicalVectors, [0, 1, 1])),
];

const passed =
  coarseBasis.length === 6 &&
  typedMixedProductError === 0 &&
  JSON.stringify(localCandidateDeterminants) === JSON.stringify([0, 0, -1]) &&
  rhoDet === canonicalExpectedDet &&
  generalTests.every(test => test.error < 1e-10) &&
  positivePrincipalMinors.every(x => x > 0) &&
  maxAbs(KSquaredPlusIdentity) < 1e-12 &&
  oneRayBoundaryDeterminants.every(x => x === 0) &&
  twoRayInteriorDeterminants.every(x => x > 0);

console.log(JSON.stringify({
  PINAudit: {
    coarseUntypedClosureDimension: coarseBasis.length,
    coarseUntypedAmbient: "Sym(3,R), whose conformal algebra is sp(6,R)",
    typedDiracMajoranaMixedProductError: typedMixedProductError,
    typedAmbient: "H2(R)_D direct-sum H2(R)_M; no cross-block symplectic pairing is supplied",
    localNaturalCandidateDeterminants: localCandidateDeterminants,
    interpretation: "P,I,N are vertex/type data and their natural population/coherence matrices do not constitute a positive Lagrangian triple in one four-dimensional symplectic carrier.",
  },
  weightedRayIdentity: {
    formula: "det(sum_i w_i b_i b_i^T) = sum_{i<j} w_i w_j det(b_i,b_j)^2",
    generalTests,
  },
  canonicalThermalChannels: {
    weights: { a, b, c },
    rho,
    determinant: rhoDet,
    expectedDeterminant: canonicalExpectedDet,
    oneRayBoundaryDeterminants,
    twoRayInteriorDeterminants,
  },
  positiveTripleLift: {
    rhoInv,
    hessian: S,
    positivePrincipalMinors,
    complexStructureError: maxAbs(KSquaredPlusIdentity),
  },
  verdict: "The current P,I,N labels do not supply the positive Maslov triple. Positive stress/defect relationship rays do supply its third graph whenever at least two nonparallel channels have positive weight; the physical weight-update law remains missing.",
  passed,
}, null, 2));

if (!passed) process.exitCode = 1;
