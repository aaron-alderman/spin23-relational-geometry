import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const outputPath = path.join(root, "evidence", "data", "admissibility-cross-frequency-stieltjes-bound-v1.json");
const write = process.argv.includes("--write");

const xs = [1, 2, 3];
const epsilon = 1 / 100;
const relaxation = x => 1 / (x + 1);
const passiveMixed = x => relaxation(x) + epsilon * x;
const relaxationSlope = x => -1 / (x + 1) ** 2;
const passiveMixedSlope = x => relaxationSlope(x) + epsilon;

function loewnerKernel(fn, derivative) {
  return xs.map((xi, i) => xs.map((xj, j) => {
    if (i === j) return -derivative(xi);
    return (fn(xi) - fn(xj)) / (xj - xi);
  }));
}

function principalTwoByTwo(matrix, i, j) {
  return matrix[i][i] * matrix[j][j] - matrix[i][j] ** 2;
}

function determinant3(matrix) {
  const [a, b, c] = matrix;
  return a[0] * (b[1] * c[2] - b[2] * c[1])
    - a[1] * (b[0] * c[2] - b[2] * c[0])
    + a[2] * (b[0] * c[1] - b[1] * c[0]);
}

function matrixAudit(matrix) {
  const diagonal = matrix.map((row, i) => row[i]);
  const minors2 = [[0, 1], [0, 2], [1, 2]].map(([i, j]) => ({
    indices: [i, j],
    value: principalTwoByTwo(matrix, i, j)
  }));
  return {
    diagonal,
    twoByTwoPrincipalMinors: minors2,
    determinant: determinant3(matrix),
    positiveSemidefiniteByPrincipalMinors: diagonal.every(value => value >= -1e-12)
      && minors2.every(({ value }) => value >= -1e-12)
      && determinant3(matrix) >= -1e-12
  };
}

const relaxationKernel = loewnerKernel(relaxation, relaxationSlope);
const mixedKernel = loewnerKernel(passiveMixed, passiveMixedSlope);
const correctedKernel = mixedKernel.map(row => row.map(value => value + epsilon));

const result = {
  protocol: "admissibility-cross-frequency-stieltjes-bound/1",
  date: "2026-10-25",
  target: "OT-018",
  coordinate: {
    name: "positive Laplace / transformed imaginary-frequency coordinate x",
    samples: xs,
    warning: "The inequality applies only after the response and frequency variable have been typed so that a positive relaxation measure has kernel 1/(x+t)."
  },
  theorem: {
    premise: "f(x)=a+integral_0^infinity dmu(t)/(x+t), with dmu nonnegative",
    kernel: "K_ij=(f(x_i)-f(x_j))/(x_j-x_i), K_ii=-f'(x_i)",
    factorization: "K_ij=integral_0^infinity dmu(t)/((x_i+t)(x_j+t))",
    consequence: "K is positive semidefinite for every finite sample set",
    classification: "standard Stieltjes/Loewner shared-measure condition, not a new admissibility law"
  },
  positiveControl: {
    response: "f0(x)=1/(x+1)",
    interpretation: "one positive relaxation atom at t=1",
    values: xs.map(x => relaxation(x)),
    derivatives: xs.map(x => relaxationSlope(x)),
    kernel: relaxationKernel,
    audit: matrixAudit(relaxationKernel)
  },
  passiveCounterexample: {
    response: "f1(s)=1/(s+1)+s/100",
    interpretation: "a conventional positive-real relaxation branch plus a positive inductive term",
    positiveRealReason: "Both 1/(s+1) and s/100 have nonnegative real part for Re(s)>0; their sum is positive real.",
    values: xs.map(x => passiveMixed(x)),
    derivatives: xs.map(x => passiveMixedSlope(x)),
    positiveOnSamples: xs.every(x => passiveMixed(x) > 0),
    decreasingOnSampleInterval: xs.every(x => passiveMixedSlope(x) < 0),
    kernel: mixedKernel,
    audit: matrixAudit(mixedKernel),
    exactTwoPointFailure: "det K[{i,j}]=-(1/100)(1/(x_i+1)-1/(x_j+1))^2<0 for i!=j"
  },
  typedCorrection: {
    declaredInductiveCoefficient: epsilon,
    operation: "add the known inductive coefficient to every Loewner-kernel entry before testing the relaxation remainder",
    correctedKernel,
    audit: matrixAudit(correctedKernel),
    equalsPositiveControlKernel: correctedKernel.every((row, i) => row.every((value, j) => Math.abs(value - relaxationKernel[i][j]) < 1e-12))
  },
  decision: {
    crossFrequencySharedMeasureBoundEstablished: true,
    fullPointwisePassivitySufficientForSharedRelaxationMeasure: false,
    conventionalPassiveCounterexampleExists: true,
    extraPremiseIdentified: "one relaxation-only positive spectral measure after separately typing affine storage terms",
    novelFundamentalInequalityEstablished: false,
    newPhysicsEvidence: false,
    topicStatus: "open_with_first_cross_frequency_candidate_classified_as_standard_stieltjes_loewner_theory"
  },
  implication: "Cross-frequency context adds a real joint constraint, but its authority comes from the declared shared-measure carrier. It is a model-discrimination and data-quality tool, not a universal law beyond standard passive-system theory."
};

const serialized = `${JSON.stringify(result, null, 2)}\n`;
if (write) fs.writeFileSync(outputPath, serialized);
process.stdout.write(serialized);
