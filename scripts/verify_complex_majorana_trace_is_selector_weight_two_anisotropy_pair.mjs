const re = 2.73;
const im = -1.41;
const phi = 0.37;
const g = 0.19;
const c = Math.cos(phi);
const s = Math.sin(phi);
const R = [[c, -s], [s, c]];
const C = [[1, 0], [0, -1]];
const Q = (a, b) => [[a, b], [b, -a]];
const mm = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((z, y, k) => z + y * B[k][j], 0)));
const transpose = (A) => A[0].map((_, j) => A.map((r) => r[j]));
const sub = (A, B) => A.map((r, i) => r.map((y, j) => y - B[i][j]));
const norm = (A) => Math.sqrt(A.flat().reduce((z, y) => z + y * y, 0));
const scale = (a, A) => A.map((r) => r.map((x) => a * x));

const rotated = mm(mm(transpose(R), Q(re, im)), R);
const reRot = re * Math.cos(2 * phi) + im * Math.sin(2 * phi);
const imRot = -re * Math.sin(2 * phi) + im * Math.cos(2 * phi);
const weightTwoError = norm(sub(rotated, Q(reRot, imRot)));
const cpError = norm(sub(mm(mm(C, Q(re, im)), C), Q(re, -im)));
const modulus = Math.hypot(re, im);
const traceQ = Q(re, im)[0][0] + Q(re, im)[1][1];
const determinantQ = Q(re, im)[0][0] * Q(re, im)[1][1] - Q(re, im)[0][1] ** 2;
const kernelGap = 2 * Math.abs(g) * modulus;
const selectedAngle = 0.5 * Math.atan2(im, re);

const result = {
  protocol: "complex-majorana-trace-selector-weight-two-pair/1",
  complexInvariant: { re, im },
  anisotropyMatrix: Q(re, im),
  cpConjugationError: cpError,
  selectorAngle: phi,
  inducedComplexRotationAngle: -2 * phi,
  weightTwoTransformationError: weightTwoError,
  tracelessnessError: Math.abs(traceQ),
  determinant: determinantQ,
  expectedDeterminant: -(modulus ** 2),
  commonMatchingCoefficient: g,
  responseEigenvalueGap: kernelGap,
  selectedProjectiveAngle: selectedAngle,
  boundary: "The pair is a canonical weak-basis and CP package. Treating it as selector-charge two is spurionic unless a physical simultaneous selector action on Standard-Model data is constructed.",
};
result.passed =
  cpError < 1e-12 &&
  weightTwoError < 1e-12 &&
  result.tracelessnessError < 1e-12 &&
  Math.abs(determinantQ + modulus ** 2) < 1e-12;

console.log(JSON.stringify(result, null, 2));
if (!result.passed) process.exitCode = 1;
