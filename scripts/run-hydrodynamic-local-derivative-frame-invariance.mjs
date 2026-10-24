import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const write = process.argv.includes("--write");
const constants = { w0: 1.7, eta0: 0.23, d0: 0.31, g0: 0.27, cs2: 1 / 3 };
const k = 0.65;
const T = 1.4;
const alpha = 0.37;
const beta = 0.22;
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
const scale = (a, scalar) => c(a.re * scalar, a.im * scalar);
const div = (a, b) => { const denominator = b.re ** 2 + b.im ** 2; return c((a.re * b.re + a.im * b.im) / denominator, (a.im * b.re - a.re * b.im) / denominator); };
const transpose = matrix => matrix[0].map((_, j) => matrix.map(row => row[j]));
const multiply = (left, right) => left.map(row => right[0].map((_, j) => row.reduce((sum, value, n) => add(sum, mul(value, right[n][j])), c(0))));
const matrixAdd = (left, right) => left.map((row, i) => row.map((value, j) => add(value, right[i][j])));
const inverse2 = matrix => {
  const determinant = sub(mul(matrix[0][0], matrix[1][1]), mul(matrix[0][1], matrix[1][0]));
  return [
    [div(matrix[1][1], determinant), div(scale(matrix[0][1], -1), determinant)],
    [div(scale(matrix[1][0], -1), determinant), div(matrix[0][0], determinant)]
  ];
};
const determinant2 = matrix => sub(mul(matrix[0][0], matrix[1][1]), mul(matrix[0][1], matrix[1][0]));
const maximumDifference = (left, right) => Math.max(...left.flatMap((row, i) => row.map((value, j) => Math.hypot(value.re - right[i][j].re, value.im - right[i][j].im))));
const realToComplex = matrix => matrix.map(row => row.map(value => c(value)));

const BRight = realToComplex([
  [0, Math.sqrt(medium.w * k ** 2)],
  [Math.sqrt(medium.w * medium.D * k ** 2), Math.sqrt(medium.w * k ** 2)]
]);
const BLeft = transpose(BRight);

function frame(z, momentumSign) {
  // phi'(p)=M(p)phi(p). The upper-right entry is a finite local derivative
  // operator. Its triangular form has determinant one and a polynomial inverse.
  const signedZ = scale(z, momentumSign);
  const temporalDerivative = mul(c(0, alpha), signedZ);
  const spatialDerivative = c(beta * k ** 2);
  return [[c(1), add(temporalDerivative, spatialDerivative)], [c(0), c(1)]];
}

function kernels(z) {
  const tensor = scale(c(-z.im, z.re), medium.eta);
  const A = [[tensor, c(0)], [c(0), c(0)]];
  const shearDenominator = sub(c(medium.D * k ** 2), mul(c(0, 1), z));
  const soundDenominator = sub(sub(c(constants.cs2 * k ** 2), mul(z, z)), scale(mul(c(0, 1), z), medium.Gamma * k ** 2));
  const D = [[shearDenominator, c(0)], [c(0), soundDenominator]];
  const response = matrixAdd(A, multiply(multiply(BRight, inverse2(D)), BLeft));

  const MRight = frame(z, 1);
  const MLeft = frame(z, -1);
  const rightInverse = inverse2(MRight);
  const leftInverseTranspose = transpose(inverse2(MLeft));
  const transformedD = multiply(multiply(leftInverseTranspose, D), rightInverse);
  const transformedBRight = multiply(BRight, rightInverse);
  const transformedBLeft = multiply(leftInverseTranspose, BLeft);
  const transformedResponse = matrixAdd(A, multiply(multiply(transformedBRight, inverse2(transformedD)), transformedBLeft));

  return {
    z,
    MRight,
    MLeft,
    rightFrameDeterminant: determinant2(MRight),
    leftFrameDeterminant: determinant2(MLeft),
    response,
    transformedResponse,
    maximumResponseDifference: maximumDifference(response, transformedResponse)
  };
}

const samples = [c(0.8, 0), c(0.45, 0.07), c(-0.3, 0.11), c(0, 0.2), c(1.1, -0.04)].map(kernels);
const maximumResponseDifference = Math.max(...samples.map(sample => sample.maximumResponseDifference));
const maximumDeterminantError = Math.max(...samples.flatMap(sample => [sample.rightFrameDeterminant, sample.leftFrameDeterminant].map(value => Math.hypot(value.re - 1, value.im))));

const output = {
  protocol: "hydrodynamic-local-derivative-frame-invariance/1",
  date: "2026-10-25",
  target: "OT-016",
  parent: "AZ-098",
  sourceFunctional: {
    bilinearForm: "W[J]=1/2 J_L^T A J_R + 1/2 J_L^T B_R D^{-1} B_L J_R",
    momentumLegs: "left fields carry -p and right fields carry p",
    sourceResponse: "A+B_R D^{-1} B_L"
  },
  localFrame: {
    form: "M(p)=[[1, i alpha z + beta k^2],[0,1]]",
    alpha,
    beta,
    rightRule: "phi'_R(p)=M(p) phi_R(p)",
    leftRule: "phi'_L(-p)=M(-p) phi_L(-p)",
    transformedKernel: "D'=M(-p)^{-T} D M(p)^{-1}",
    transformedCouplings: "B'_R=B_R M(p)^{-1}; B'_L=M(-p)^{-T} B_L",
    locality: "M and M^{-1} are finite polynomials in the declared derivatives because the off-diagonal generator squares to zero",
    realityCondition: "for real frequency and momentum, M(-p)=M(p)^*",
    exactDeterminant: 1
  },
  physicalParameters: { k, T, ...medium },
  samples,
  audit: {
    samplesChecked: samples.length,
    maximumFrameDeterminantError: maximumDeterminantError,
    maximumResponseDifference,
    unimodularLocalFrame: maximumDeterminantError < 1e-12,
    sourceHessianInvariant: maximumResponseDifference < 1e-12,
    spectralAndKmsResponseInvariantReason: "the complete retarded source response is equal, hence its spectral matrix and any common-temperature KMS transform are equal",
    poleResidueInvariantReason: "equality of the complete meromorphic source response preserves physical poles and residues; internal kernel entries remain coordinate-dependent"
  },
  decision: {
    localDerivativeFrameConstructed: true,
    polynomialInverseConstructed: true,
    separateMomentumLegsTyped: true,
    gaussianDerivativeFrameInvarianceEstablished: maximumResponseDifference < 1e-12,
    wardCompleteSchwingerKeldyshActionEstablished: false,
    nonlinearHydrodynamicFrameTheoremEstablished: false,
    microscopicMatchingEstablished: false,
    fullOt016Closure: false,
    generatedSpin23DynamicsEstablished: false,
    newPhysicsEvidence: false
  },
  implication: "A finite local derivative mixing of the retained Gaussian shear and sound coordinates cannot create, remove or rotate a source-facing response direction when both momentum legs, the kernel and source couplings transform consistently. The remaining ambiguity is not generic derivative-coordinate choice but Ward-complete nonlinear hydrodynamic improvement/contact structure and microscopic matching."
};

const serialized = `${JSON.stringify(output, null, 2)}\n`;
if (write) await writeFile(resolve(root, "evidence/data/hydrodynamic-local-derivative-frame-invariance-v1.json"), serialized, "utf8");
process.stdout.write(serialized);
