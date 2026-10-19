function zeros(rows, cols) {
  return Array.from({ length: rows }, () => Array(cols).fill(0));
}

function add(A, B) {
  return A.map((row, i) => row.map((x, j) => x + B[i][j]));
}

function scale(A, s) {
  return A.map(row => row.map(x => s * x));
}

function outer(v) {
  return v.map(x => v.map(y => x * y));
}

function det2(X) {
  return X[0][0] * X[1][1] - X[0][1] * X[1][0];
}

function area(u, v) {
  return u[0] * v[1] - u[1] * v[0];
}

function weightedRaySum(vectors, weights) {
  return vectors.reduce((sum, v, i) => add(sum, scale(outer(v), weights[i])), zeros(2, 2));
}

const vectors = [[1, 0], [0, 1], [1, 1]];
const residues = [2, 3, 5];
const poles = [1, 4, 9];

function responseParts(x, y) {
  const realWeights = poles.map((m, i) => residues[i] * (m - x) / ((m - x) ** 2 + y ** 2));
  const imagWeights = poles.map((m, i) => residues[i] * y / ((m - x) ** 2 + y ** 2));
  return {
    realWeights,
    imagWeights,
    real: weightedRaySum(vectors, realWeights),
    imag: weightedRaySum(vectors, imagWeights),
  };
}

const upperHalfPlaneTests = [
  [0, 0.5],
  [2.5, 1.25],
  [8, 0.1],
  [-3, 4],
].map(([x, y]) => {
  const parts = responseParts(x, y);
  return {
    z: { x, y },
    imagWeights: parts.imagWeights,
    imagTrace: parts.imag[0][0] + parts.imag[1][1],
    imagDeterminant: det2(parts.imag),
    strictlyPositive: parts.imag[0][0] > 0 && det2(parts.imag) > 0,
  };
});

const staticPoint = -2;
const staticWeights = poles.map((m, i) => residues[i] / (m - staticPoint));
const staticResponse = weightedRaySum(vectors, staticWeights);
const staticDeterminant = det2(staticResponse);
let staticCauchyBinet = 0;
for (let i = 0; i < vectors.length; i++) {
  for (let j = i + 1; j < vectors.length; j++) {
    staticCauchyBinet += staticWeights[i] * staticWeights[j] * area(vectors[i], vectors[j]) ** 2;
  }
}

// B has columns sqrt(w_i) b_i. The response is B (M-zI)^-1 B^T.
const B = [
  vectors.map((v, i) => Math.sqrt(residues[i]) * v[0]),
  vectors.map((v, i) => Math.sqrt(residues[i]) * v[1]),
];

const reconstructedStatic = zeros(2, 2);
for (let i = 0; i < poles.length; i++) {
  const coefficient = 1 / (poles[i] - staticPoint);
  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 2; c++) reconstructedStatic[r][c] += coefficient * B[r][i] * B[c][i];
  }
}

const reconstructionError = Math.max(...staticResponse.flatMap((row, i) => row.map((x, j) => Math.abs(x - reconstructedStatic[i][j]))));

const distinctPoleResidueRanks = vectors.map(v => (v[0] === 0 && v[1] === 0 ? 0 : 1));
const realizationDegree = distinctPoleResidueRanks.reduce((a, b) => a + b, 0);

const passed =
  upperHalfPlaneTests.every(test => test.strictlyPositive) &&
  staticResponse[0][0] > 0 &&
  staticDeterminant > 0 &&
  Math.abs(staticDeterminant - staticCauchyBinet) < 1e-12 &&
  reconstructionError < 1e-12 &&
  realizationDegree === 3;

console.log(JSON.stringify({
  response: {
    formula: "R(z) = sum_i w_i b_i b_i^T / (m_i-z) = B (M-zI)^-1 B^T",
    vectors,
    positiveResidueWeights: residues,
    realPoles: poles,
    couplingMatrixB: B,
  },
  upperHalfPlaneHerglotzTests: upperHalfPlaneTests,
  staticPositiveRegion: {
    x: staticPoint,
    effectivePositiveWeights: staticWeights,
    response: staticResponse,
    determinant: staticDeterminant,
    cauchyBinetDeterminant: staticCauchyBinet,
    resolventCompressionReconstructionError: reconstructionError,
  },
  realization: {
    selfAdjointBathMatrix: poles.map((m, i) => poles.map((_, j) => i === j ? m : 0)),
    degreeFromDistinctRankOneResidues: realizationDegree,
    interpretation: "The bath state carries exact linear memory. Eliminating it produces the dispersive two-face response, but fixed M and B do not create adaptive feedback.",
  },
  verdict: "Three positive relationship rays admit a minimal three-mode self-adjoint resolvent realization with a strictly positive matrix Herglotz response. This supplies conservative linear memory, not state-dependent pole or residue evolution.",
  passed,
}, null, 2));

if (!passed) process.exitCode = 1;
