import assert from "node:assert/strict";

function onePole(z) {
  return 1 / (3 - z);
}

function twoPole(z) {
  return (1 / 3) / (2 - z) + (5 / 6) / (5 - z);
}

const calibrationPoints = [0, -1];
const calibrationErrors = calibrationPoints.map((z) => Math.abs(onePole(z) - twoPole(z)));
assert.ok(calibrationErrors.every((e) => e < 1e-15));

const heldOutZ = 1;
const heldOutScalarDifference = twoPole(heldOutZ) - onePole(heldOutZ);
assert.ok(Math.abs(heldOutScalarDifference - 1 / 24) < 1e-15);

function scalarImaginary(terms, z) {
  return terms.reduce((sum, term) => {
    const denominator = (term.pole - z.re) ** 2 + z.im ** 2;
    return sum + term.weight * z.im / denominator;
  }, 0);
}

const upper = { re: 0.7, im: 0.8 };
const onePoleImaginary = scalarImaginary([{ weight: 1, pole: 3 }], upper);
const twoPoleImaginary = scalarImaginary([
  { weight: 1 / 3, pole: 2 },
  { weight: 5 / 6, pole: 5 },
], upper);
assert.ok(onePoleImaginary > 0 && twoPoleImaginary > 0);

const rays = {
  T: [1, 0],
  V: [0, 1],
  S: [1, 1],
};
function outer(v) {
  return [[v[0] * v[0], v[0] * v[1]], [v[1] * v[0], v[1] * v[1]]];
}
const Q = Object.fromEntries(Object.entries(rays).map(([k, v]) => [k, outer(v)]));

function addScaled(M, scale, A) {
  for (let i = 0; i < 2; i += 1) {
    for (let j = 0; j < 2; j += 1) M[i][j] += scale * A[i][j];
  }
}

function matrixResponse(z, scalarModel) {
  const M = [[0, 0], [0, 0]];
  addScaled(M, 0.7 / (4 - z), Q.T);
  addScaled(M, 0.6 / (6 - z), Q.V);
  addScaled(M, scalarModel(z), Q.S);
  return M;
}

function maxDifference(A, B) {
  return Math.max(...A.flatMap((row, i) => row.map((x, j) => Math.abs(x - B[i][j]))));
}

for (const z of calibrationPoints) {
  assert.ok(maxDifference(matrixResponse(z, onePole), matrixResponse(z, twoPole)) < 1e-15);
}
const heldOutMatrixDifference = maxDifference(
  matrixResponse(heldOutZ, onePole),
  matrixResponse(heldOutZ, twoPole),
);
assert.ok(Math.abs(heldOutMatrixDifference - 1 / 24) < 1e-15);

function imaginaryMatrix(modelTerms) {
  const M = [[0, 0], [0, 0]];
  addScaled(M, scalarImaginary([{ weight: 0.7, pole: 4 }], upper), Q.T);
  addScaled(M, scalarImaginary([{ weight: 0.6, pole: 6 }], upper), Q.V);
  addScaled(M, scalarImaginary(modelTerms, upper), Q.S);
  return M;
}
function det2(M) {
  return M[0][0] * M[1][1] - M[0][1] * M[1][0];
}
const imOne = imaginaryMatrix([{ weight: 1, pole: 3 }]);
const imTwo = imaginaryMatrix([
  { weight: 1 / 3, pole: 2 },
  { weight: 5 / 6, pole: 5 },
]);
assert.ok(det2(imOne) > 0 && det2(imTwo) > 0);

console.log(JSON.stringify({
  scalarModels: {
    onePole: "1/(3-z)",
    twoPole: "(1/3)/(2-z)+(5/6)/(5-z)",
  },
  calibrationPoints,
  calibrationErrors,
  heldOutZ,
  heldOutScalarDifference,
  upperHalfPlaneImaginaryParts: {
    onePole: onePoleImaginary,
    twoPole: twoPoleImaginary,
  },
  matrixLift: {
    heldOutMaxEntryDifference: heldOutMatrixDifference,
    imaginaryDeterminantOnePole: det2(imOne),
    imaginaryDeterminantTwoPole: det2(imTwo),
  },
  verdict: {
    sameFiniteCalibrationData: true,
    distinctPositiveSpectralMeasures: true,
    bothStrictMatrixHerglotzAfterLift: true,
    candidateGenerationUnique: false,
  },
}, null, 2));
