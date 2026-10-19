const t = 4.2;
const re = 2.3;
const im = -1.1;
const radius = Math.hypot(re, im);
const X = [[t + re, im], [im, t - re]];
const determinant = X[0][0] * X[1][1] - X[0][1] ** 2;
const trace = X[0][0] + X[1][1];
const eigenvalues = [t - radius, t + radius];
const cpReflected = [[t + re, -im], [-im, t - re]];
const C = [[1, 0], [0, -1]];
const mm = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
const sub = (A, B) => A.map((r, i) => r.map((x, j) => x - B[i][j]));
const norm = (A) => Math.sqrt(A.flat().reduce((s, x) => s + x * x, 0));

// A complex-linear map Phi:C->M_2(C) has Phi(z)=z A. Requiring Phi(i) to be
// Hermitian while A=Phi(1) is Hermitian gives iA=(iA)^dagger=-iA, hence A=0.
const directComplexLinearHermitianMapDimension = 0;
const hermitianPartRetainedCoordinates = ["Re(z)"];
const hermitianPartLostCoordinates = ["Im(z)"];

const result = {
  protocol: "complex-probe-positive-hermitian-realification/1",
  complexProbe: { re, im, modulus: radius },
  carrierCoordinate: t,
  h2rRealification: X,
  trace,
  determinant,
  expectedDeterminant: t ** 2 - radius ** 2,
  eigenvalues,
  positive: eigenvalues.every((x) => x >= 0),
  positivityCondition: "t >= |z|",
  cpReflectionError: norm(sub(mm(mm(C, X), C), cpReflected)),
  directComplexLinearAlwaysHermitianMapDimension: directComplexLinearHermitianMapDimension,
  naiveHermitianPart: {
    retained: hermitianPartRetainedCoordinates,
    lost: hermitianPartLostCoordinates,
  },
  cone: "H_2(R) positive cone with determinant t^2-Re(z)^2-Im(z)^2",
  consequence: "Keeping both quadratures in a positive Hermitian response requires a carrier coordinate and a rank-two real Jordan lift; a bare complex scalar CP map either is non-Hermitian or loses Im(z).",
};
result.passed =
  Math.abs(determinant - result.expectedDeterminant) < 1e-12 &&
  result.positive &&
  result.cpReflectionError < 1e-12 &&
  directComplexLinearHermitianMapDimension === 0;

console.log(JSON.stringify(result, null, 2));
if (!result.passed) process.exitCode = 1;
