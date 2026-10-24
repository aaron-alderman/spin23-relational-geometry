import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const write = process.argv.includes("--write");
const constants = { w0: 1.7, eta0: 0.23, d0: 0.31, g0: 0.27, cs2: 1 / 3 };
const k = 0.65;
const T = 1.4;
const medium = {
  w: constants.w0 * T ** 4,
  eta: constants.eta0 * T ** 3,
  D: constants.d0 / T,
  Gamma: constants.g0 / T
};

const c = (re, im = 0) => ({ re, im });
const add = (a, b) => c(a.re + b.re, a.im + b.im);
const sub = (a, b) => c(a.re - b.re, a.im - b.im);
const mul = (a, b) => c(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const scale = (a, s) => c(a.re * s, a.im * s);
const div = (a, b) => { const d = b.re ** 2 + b.im ** 2; return c((a.re * b.re + a.im * b.im) / d, (a.im * b.re - a.re * b.im) / d); };
const zeroMatrix = () => [[c(0), c(0)], [c(0), c(0)]];
const transpose = matrix => [[matrix[0][0], matrix[1][0]], [matrix[0][1], matrix[1][1]]];
const matmul = (left, right) => left.map((row, i) => right[0].map((_, j) => row.reduce((sum, value, n) => add(sum, mul(value, right[n][j])), c(0))));
const matrixAdd = (left, right) => left.map((row, i) => row.map((value, j) => add(value, right[i][j])));
const inverse2 = matrix => {
  const determinant = sub(mul(matrix[0][0], matrix[1][1]), mul(matrix[0][1], matrix[1][0]));
  return [[div(matrix[1][1], determinant), div(scale(matrix[0][1], -1), determinant)], [div(scale(matrix[1][0], -1), determinant), div(matrix[0][0], determinant)]];
};
const realToComplex = matrix => matrix.map(row => row.map(value => c(value)));
const maximumDifference = (left, right) => Math.max(...left.flatMap((row, i) => row.map((value, j) => Math.hypot(value.re - right[i][j].re, value.im - right[i][j].im))));

const B = realToComplex([
  [0, Math.sqrt(medium.w * k ** 2)],
  [Math.sqrt(medium.w * medium.D * k ** 2), Math.sqrt(medium.w * k ** 2)]
]);
const frame = realToComplex([[1, 0.35], [-0.2, 1.1]]);
const frameInverse = inverse2(frame);

function kernels(z) {
  const tensor = scale(c(-z.im, z.re), medium.eta);
  const A = [[tensor, c(0)], [c(0), c(0)]];
  const shearDenominator = sub(c(medium.D * k ** 2), mul(c(0, 1), z));
  const soundDenominator = sub(sub(c(constants.cs2 * k ** 2), mul(z, z)), scale(mul(c(0, 1), z), medium.Gamma * k ** 2));
  const D = [[shearDenominator, c(0)], [c(0), soundDenominator]];
  const response = matrixAdd(A, matmul(matmul(B, inverse2(D)), transpose(B)));

  const transformedD = matmul(matmul(transpose(frameInverse), D), frameInverse);
  const transformedB = matmul(B, frameInverse);
  const transformedResponse = matrixAdd(A, matmul(matmul(transformedB, inverse2(transformedD)), transpose(transformedB)));
  return { z, A, D, B, response, transformedD, transformedB, transformedResponse, maximumResponseDifference: maximumDifference(response, transformedResponse) };
}

const samples = [c(0.8, 0), c(0.45, 0.07), c(-0.3, 0.11), c(0, 0.2)].map(kernels);
const maxDifference = Math.max(...samples.map(sample => sample.maximumResponseDifference));
const output = {
  protocol: "hydrodynamic-gaussian-source-frame-invariance/1",
  date: "2026-10-25",
  target: "OT-016",
  sourceFunctional: {
    form: "W[J]=1/2 J^T A J + 1/2 J^T B D^{-1} B^T J",
    internalModes: ["shear diffusion", "attenuated sound"],
    localTerm: "A carries the first-order tensor response",
    sourceHessian: "delta^2 W / delta J delta J = A+B D^{-1} B^T"
  },
  physicalParameters: { k, T, ...medium },
  frameTransformation: {
    matrix: frame,
    rule: "phi'=M phi; D'=M^{-T} D M^{-1}; B'=B M^{-1}",
    determinant: frame[0][0].re * frame[1][1].re - frame[0][1].re * frame[1][0].re,
    interpretation: "invertible frequency-independent mixing of the two retained Gaussian internal hydrodynamic modes"
  },
  samples,
  audit: {
    samplesChecked: samples.length,
    maximumResponseDifference: maxDifference,
    sourceHessianInvariant: maxDifference < 1e-12,
    polesInvariantReason: "det(D')=det(M)^{-2} det(D), so the zero set and pole multiplicities are unchanged",
    residuesInvariantReason: "the complete source response is equal as a meromorphic matrix function, so its pole residues are equal"
  },
  decision: {
    quadraticSourceFunctionalConstructed: true,
    gaussianInternalFrameInvarianceEstablished: maxDifference < 1e-12,
    sourceResponsePolesAndResiduesInvariant: maxDifference < 1e-12,
    arbitraryHydrodynamicFrameTheoremEstablished: false,
    wardCompleteNonlinearGeneratingFunctionalEstablished: false,
    microscopicMatchingEstablished: false,
    fullOt016Closure: false,
    generatedSpin23DynamicsEstablished: false,
    newPhysicsEvidence: false
  },
  implication: "The two effective internal modes may be mixed without changing any source-facing response, pole or residue when kernels and couplings transform together. This removes Gaussian coordinate choice as an explanation of the extra channel, but not derivative-dependent/nonlinear hydrodynamic-frame ambiguity or microscopic matching."
};

const serialized = `${JSON.stringify(output, null, 2)}\n`;
if (write) await writeFile(resolve(root, "evidence/data/hydrodynamic-gaussian-source-frame-invariance-v1.json"), serialized, "utf8");
process.stdout.write(serialized);
