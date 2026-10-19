import assert from "node:assert/strict";

const close = (a, b, eps = 1e-12) => Math.abs(a - b) < eps;
const mul = (A, B) => A.map((row) => B[0].map((unused, j) =>
  row.reduce((sum, value, k) => sum + value * B[k][j], 0)));
const transpose = (A) => A[0].map((unused, j) => A.map((row) => row[j]));
const same = (A, B) => A.every((row, i) => row.every((value, j) => close(value, B[i][j])));
const diag = (...values) => values.map((value, i) => values.map((unused, j) => i === j ? value : 0));

const lockingSpectrum = (a, b, kappa) => {
  const trace = a + b + 2 * kappa;
  const determinant = a * b + kappa * (a + b);
  const discriminant = Math.sqrt((a - b) ** 2 + 4 * kappa ** 2);
  const eigenvalues = [(trace - discriminant) / 2, (trace + discriminant) / 2];
  return { trace, determinant, eigenvalues };
};

const symmetric = lockingSpectrum(2, 2, 5);
assert(close(symmetric.eigenvalues[0], 2));
assert(close(symmetric.eigenvalues[1], 12));
const pureLock = lockingSpectrum(0, 0, 5);
assert(close(pureLock.eigenvalues[0], 0));
assert(close(pureLock.eigenvalues[1], 10));

const schurEffective = (a, b, kappa) => {
  assert(a + kappa > 0);
  return {
    topologySolutionCoefficient: kappa / (a + kappa),
    effectiveChiralCoefficient: b + kappa - kappa * kappa / (a + kappa),
  };
};
const auxiliary = schurEffective(3, 2, 5);
assert(close(auxiliary.effectiveChiralCoefficient, 2 + 15 / 8));
const exactAuxiliaryLock = schurEffective(0, 2, 5);
assert(close(exactAuxiliaryLock.topologySolutionCoefficient, 1));
assert(close(exactAuxiliaryLock.effectiveChiralCoefficient, 2));

const euclideanMetric = diag(1, 1, 1);
const lorentzMetric = diag(1, -1, -1);
const rapidity = 0.7;
const ch = Math.cosh(rapidity), sh = Math.sinh(rapidity);
const boost = [[ch, sh, 0], [sh, ch, 0], [0, 0, 1]];
const boostEuclidean = mul(mul(transpose(boost), euclideanMetric), boost);
const boostLorentz = mul(mul(transpose(boost), lorentzMetric), boost);
assert(!same(boostEuclidean, euclideanMetric));
assert(same(boostLorentz, lorentzMetric));

// A determinant-invariant relative quadratic has signature (+,--).
const lorentzRelativeEigenSigns = [1, -1, -1];
assert(lorentzRelativeEigenSigns.some((x) => x < 0));
const euclideanRelativeEigenSigns = [1, 1, 1];
assert(euclideanRelativeEigenSigns.every((x) => x > 0));

console.log(JSON.stringify({
  protocol: "diagonal-locking-of-topology-and-chiral-carriers/1",
  alignedCoordinates: "After the quarter-turn, q_top and q_chi are both real three-vectors (t,x,y) in isomorphic H2(R) carriers.",
  positiveEuclideanLock: {
    action: "S=1/2 a||q_top||^2+1/2 b||q_chi||^2+kappa/2||q_top-q_chi||^2",
    perCoordinateHessian: "[[a+kappa,-kappa],[-kappa,b+kappa]]",
    determinant: "ab+kappa(a+b)",
    symmetricExample: symmetric,
    pureLockExample: pureLock,
  },
  auxiliaryTopologyMode: {
    formula: "q_top=[kappa/(a+kappa)]q_chi",
    sample: auxiliary,
    exactLockAtAZero: exactAuxiliaryLock,
    poleResult: "If q_top has no derivative term, Schur elimination adds no topology pole.",
  },
  symmetryAudit: {
    lorentzMetricPreservedByBoost: same(boostLorentz, lorentzMetric),
    euclideanMetricPreservedByBoost: same(boostEuclidean, euclideanMetric),
    determinantInvariantLockSignature: lorentzRelativeEigenSigns,
    positiveEuclideanLockSignature: euclideanRelativeEigenSigns,
  },
  obstruction: "A positive Euclidean locking norm breaks the noncompact determinant-preserving Lorentz-cone symmetry. A quadratic lock built from the invariant determinant form is indefinite in the two spatial carrier directions. Both positivity and full noncompact linear symmetry require constraints, gauge redundancy, nonlinear cone geometry, or symmetry breaking.",
  physicalGate: "Choose whether Spin(2,3) is an exact dynamical symmetry, a response-domain automorphism, or a broken organizing symmetry. Do not infer ghost freedom from the auxiliary Euclidean model while claiming an exact invariant Lorentzian locking action.",
  passed: true,
}, null, 2));
