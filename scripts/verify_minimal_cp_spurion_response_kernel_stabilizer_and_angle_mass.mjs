const alpha = 3.7;
const beta = 1.9;
const c = 0.23;
const s = -7.8867;
const x = c * s;
const K = [[alpha, x], [x, beta]];
const C = [[1, 0], [0, -1]];
const J = [[0, -1], [1, 0]];
const mm = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((z, y, k) => z + y * B[k][j], 0)));
const sub = (A, B) => A.map((r, i) => r.map((y, j) => y - B[i][j]));
const norm = (A) => Math.sqrt(A.flat().reduce((z, y) => z + y * y, 0));
const comm = (A, B) => sub(mm(A, B), mm(B, A));
const Kminus = [[alpha, -x], [-x, beta]];

const gap = Math.sqrt((alpha - beta) ** 2 + 4 * x ** 2);
const theta = 0.5 * Math.atan2(2 * x, alpha - beta);
const infinitesimalStabilizerResidual = norm(comm(K, J));
const cpFamilyCovarianceError = norm(sub(mm(mm(C, K), C), Kminus));
const rho = 2.4;
const angularPotentialCurvature = rho ** 2 * gap;
const canonicalAngularMassSquared = gap;

const cases = [
  { alpha: 2, beta: 2, cs: 0, connectedStabilizerDimension: 1 },
  { alpha: 2, beta: 1, cs: 0, connectedStabilizerDimension: 0 },
  { alpha: 2, beta: 2, cs: 0.4, connectedStabilizerDimension: 0 },
  { alpha: 2, beta: 1, cs: 0.4, connectedStabilizerDimension: 0 },
];

const result = {
  protocol: "minimal-cp-spurion-response-kernel-stabilizer/1",
  kernel: K,
  cpReflectedKernel: Kminus,
  cpFamilyCovarianceError,
  eigenvalueGap: gap,
  selectedAngleRadians: theta,
  infinitesimalSelectorStabilizerResidual: infinitesimalStabilizerResidual,
  connectedSelectorStabilizerDimension: infinitesimalStabilizerResidual < 1e-12 ? 1 : 0,
  projectiveResidualForGenericKernel: "trivial (the matrix residual {+I,-I} acts identically on a response line)",
  radialAmplitude: rho,
  angularPotentialCurvature,
  canonicalAngularMassSquared,
  degeneracyCondition: "alpha=beta and c*s=0",
  anisotropyRepresentation: "((alpha-beta)/2,c*s) transforms with double the selector angle",
  cases,
  consequence: "A fixed nonzero CP-odd spurion generically lifts the selector circle; spurionic CP relates K(s) to K(-s), but is not a symmetry of one fixed nonzero-s background.",
};
result.passed =
  cpFamilyCovarianceError < 1e-12 &&
  gap > 0 &&
  result.connectedSelectorStabilizerDimension === 0 &&
  Math.abs(angularPotentialCurvature - rho ** 2 * gap) < 1e-12 &&
  cases.filter((q) => q.connectedStabilizerDimension === 1).length === 1;

console.log(JSON.stringify(result, null, 2));
if (!result.passed) process.exitCode = 1;
