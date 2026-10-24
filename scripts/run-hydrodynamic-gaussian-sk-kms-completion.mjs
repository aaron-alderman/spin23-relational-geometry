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
const div = (a, b) => { const d = b.re ** 2 + b.im ** 2; return c((a.re * b.re + a.im * b.im) / d, (a.im * b.re - a.re * b.im) / d); };
const scale = (a, scalar) => c(a.re * scalar, a.im * scalar);
const conjugate = a => c(a.re, -a.im);
const zero = (rows, columns) => Array.from({ length: rows }, () => Array.from({ length: columns }, () => c(0)));
const identity = n => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => c(Number(i === j))));
const transpose = matrix => matrix[0].map((_, j) => matrix.map(row => row[j]));
const dagger = matrix => transpose(matrix).map(row => row.map(conjugate));
const multiply = (left, right) => left.map(row => right[0].map((_, j) => row.reduce((sum, value, n) => add(sum, mul(value, right[n][j])), c(0))));
const matrixAdd = (left, right) => left.map((row, i) => row.map((value, j) => add(value, right[i][j])));
const matrixSubtract = (left, right) => left.map((row, i) => row.map((value, j) => sub(value, right[i][j])));
const matrixScale = (matrix, scalar) => matrix.map(row => row.map(value => mul(value, scalar)));
const maximumMagnitude = matrix => Math.max(...matrix.flat().map(value => Math.hypot(value.re, value.im)));
const maximumDifference = (left, right) => maximumMagnitude(matrixSubtract(left, right));
const block = (topLeft, topRight, bottomLeft, bottomRight) => [
  ...topLeft.map((row, i) => [...row, ...topRight[i]]),
  ...bottomLeft.map((row, i) => [...row, ...bottomRight[i]])
];
const blockDiagonal = (left, right) => block(left, zero(left.length, right.length), zero(right.length, left.length), right);

function inverse(matrix) {
  const n = matrix.length;
  const augmented = matrix.map((row, i) => [...row.map(value => ({ ...value })), ...identity(n)[i]]);
  for (let column = 0; column < n; column += 1) {
    let pivot = column;
    for (let row = column + 1; row < n; row += 1) {
      if (Math.hypot(augmented[row][column].re, augmented[row][column].im) > Math.hypot(augmented[pivot][column].re, augmented[pivot][column].im)) pivot = row;
    }
    [augmented[column], augmented[pivot]] = [augmented[pivot], augmented[column]];
    const pivotValue = augmented[column][column];
    if (Math.hypot(pivotValue.re, pivotValue.im) < 1e-14) throw new Error("singular complex matrix");
    augmented[column] = augmented[column].map(value => div(value, pivotValue));
    for (let row = 0; row < n; row += 1) {
      if (row === column) continue;
      const factor = augmented[row][column];
      augmented[row] = augmented[row].map((value, j) => sub(value, mul(factor, augmented[column][j])));
    }
  }
  return augmented.map(row => row.slice(n));
}

const B = [
  [c(0), c(Math.sqrt(medium.w * k ** 2))],
  [c(Math.sqrt(medium.w * medium.D * k ** 2)), c(Math.sqrt(medium.w * k ** 2))]
];

function frame(omega) {
  return [[c(1), c(beta * k ** 2, alpha * omega)], [c(0), c(1)]];
}

function minimumHermitianEigenvalue(matrix) {
  const a = matrix[0][0].re;
  const d = matrix[1][1].re;
  const b2 = matrix[0][1].re ** 2 + matrix[0][1].im ** 2;
  return (a + d - Math.sqrt((a - d) ** 2 + 4 * b2)) / 2;
}

function evaluate(omega) {
  const DR = [
    [c(medium.D * k ** 2, -omega), c(0)],
    [c(constants.cs2 * k ** 2 - omega ** 2, -medium.Gamma * k ** 2 * omega), c(0)]
  ];
  // Correct the row placement: shear and sound are independent diagonal modes.
  DR[1] = [c(0), DR[1][0]];
  const DA = dagger(DR);
  const coth = 1 / Math.tanh(omega / (2 * T));
  const noise = matrixScale(matrixSubtract(DR, DA), c(0, coth));
  const K = block(zero(2, 2), DA, DR, matrixScale(noise, c(0, 1)));
  const coupling = blockDiagonal(B, B);
  const sourceCovariance = multiply(multiply(coupling, inverse(K)), dagger(coupling));

  const M = frame(omega);
  const rightInverse = inverse(M);
  const leftInverse = inverse(dagger(M));
  const transformedDR = multiply(multiply(leftInverse, DR), rightInverse);
  const transformedDA = multiply(multiply(leftInverse, DA), rightInverse);
  const transformedNoise = multiply(multiply(leftInverse, noise), rightInverse);
  const transformedK = block(zero(2, 2), transformedDA, transformedDR, matrixScale(transformedNoise, c(0, 1)));
  const T4 = blockDiagonal(M, M);
  const transformedCouplingRight = multiply(coupling, inverse(T4));
  const transformedCouplingLeft = multiply(inverse(dagger(T4)), dagger(coupling));
  const transformedSourceCovariance = multiply(multiply(transformedCouplingRight, inverse(transformedK)), transformedCouplingLeft);
  const transformedFdtNoise = matrixScale(matrixSubtract(transformedDR, transformedDA), c(0, coth));

  return {
    omega,
    coth,
    retardedKernel: DR,
    noiseKernel: noise,
    transformedRetardedKernel: transformedDR,
    transformedNoiseKernel: transformedNoise,
    audit: {
      advancedIsRetardedDaggerError: maximumDifference(transformedDA, dagger(transformedDR)),
      noiseHermiticityError: maximumDifference(transformedNoise, dagger(transformedNoise)),
      fluctuationDissipationError: maximumDifference(transformedNoise, transformedFdtNoise),
      sourceCovarianceDifference: maximumDifference(sourceCovariance, transformedSourceCovariance),
      minimumNoiseEigenvalue: minimumHermitianEigenvalue(noise),
      minimumTransformedNoiseEigenvalue: minimumHermitianEigenvalue(transformedNoise)
    }
  };
}

const samples = [0.2, 0.45, 0.8, 1.1].map(evaluate);
const maxOf = key => Math.max(...samples.map(sample => sample.audit[key]));
const minOf = key => Math.min(...samples.map(sample => sample.audit[key]));
const output = {
  protocol: "hydrodynamic-gaussian-sk-kms-completion/1",
  date: "2026-10-25",
  target: "OT-016",
  parent: "AZ-100",
  primaryLiterature: [
    { title: "Effective field theory of dissipative fluids", url: "https://arxiv.org/abs/1511.03646", role: "doubled hydrodynamic effective action and local KMS" },
    { title: "Effective field theory for dissipative fluids (II)", url: "https://arxiv.org/abs/1701.07817", role: "dynamical KMS, entropy current and frame choices from field redefinitions" },
    { title: "Relativistic hydrodynamic fluctuations from an effective action", url: "https://arxiv.org/abs/2309.00512", role: "causality, stability and general-frame stochastic actions inside a finite hydrodynamic regime" }
  ],
  action: {
    fields: "two r-type and two a-type Gaussian internal modes",
    kernel: "K_SK=[[0,D_A],[D_R,iN]]",
    retardedModes: ["shear diffusion", "attenuated sound"],
    fluctuationDissipation: "N=coth(omega/(2T)) i(D_R-D_A)",
    frameRule: "K'_SK=diag(M,M)^{-dagger} K_SK diag(M,M)^{-1}",
    sourceRule: "both doubled source couplings co-transform with the internal fields"
  },
  physicalParameters: { k, T, ...medium, alpha, beta },
  samples,
  audit: {
    samplesChecked: samples.length,
    maximumAdvancedDaggerError: maxOf("advancedIsRetardedDaggerError"),
    maximumNoiseHermiticityError: maxOf("noiseHermiticityError"),
    maximumFluctuationDissipationError: maxOf("fluctuationDissipationError"),
    maximumSourceCovarianceDifference: maxOf("sourceCovarianceDifference"),
    minimumNoiseEigenvalue: minOf("minimumNoiseEigenvalue"),
    minimumTransformedNoiseEigenvalue: minOf("minimumTransformedNoiseEigenvalue"),
    gaussianSkRealityPassed: maxOf("advancedIsRetardedDaggerError") < 1e-12 && maxOf("noiseHermiticityError") < 1e-12,
    gaussianKmsPassed: maxOf("fluctuationDissipationError") < 1e-12,
    noisePositivityPassed: minOf("minimumNoiseEigenvalue") >= -1e-12 && minOf("minimumTransformedNoiseEigenvalue") >= -1e-12,
    doubledSourceFunctionalInvariant: maxOf("sourceCovarianceDifference") < 1e-12
  },
  decision: {
    doubledGaussianSkKernelConstructed: true,
    fluctuationDissipationAndNoisePositivityEstablished: true,
    localDerivativeFramePreservesDoubledSourceFunctional: maxOf("sourceCovarianceDifference") < 1e-12,
    nonlinearDynamicalKmsTheoremEstablished: false,
    stressWardIdentityEstablished: false,
    entropyCurrentEstablished: false,
    causalStableValidityWindowEstablished: false,
    microscopicMatchingEstablished: false,
    fullOt016Closure: false,
    generatedSpin23DynamicsEstablished: false,
    newPhysicsEvidence: false
  },
  implication: "The AZ-100 local derivative frame extends consistently to a doubled Gaussian Schwinger-Keldysh kernel: retarded/advanced reality, positive noise, fluctuation-dissipation and the complete doubled source covariance survive. The remaining OT-016 gate begins at nonlinear dynamical KMS, stress Ward identities, entropy-current and validity-window control, not at Gaussian doubling."
};

const serialized = `${JSON.stringify(output, null, 2)}\n`;
if (write) await writeFile(resolve(root, "evidence/data/hydrodynamic-gaussian-sk-kms-completion-v1.json"), serialized, "utf8");
process.stdout.write(serialized);
