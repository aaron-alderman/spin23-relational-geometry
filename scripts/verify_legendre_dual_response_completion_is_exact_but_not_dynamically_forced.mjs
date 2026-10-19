function zeros(rows, cols) {
  return Array.from({ length: rows }, () => Array(cols).fill(0));
}

function identity(n) {
  return Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => i === j ? 1 : 0));
}

function add(A, B) {
  return A.map((row, i) => row.map((x, j) => x + B[i][j]));
}

function sub(A, B) {
  return A.map((row, i) => row.map((x, j) => x - B[i][j]));
}

function scale(A, s) {
  return A.map(row => row.map(x => s * x));
}

function mul(A, B) {
  const out = zeros(A.length, B[0].length);
  for (let i = 0; i < A.length; i++) {
    for (let k = 0; k < B.length; k++) {
      for (let j = 0; j < B[0].length; j++) out[i][j] += A[i][k] * B[k][j];
    }
  }
  return out;
}

function mv(A, v) {
  return A.map(row => row.reduce((s, x, j) => s + x * v[j], 0));
}

function dot(u, v) {
  return u.reduce((s, x, i) => s + x * v[i], 0);
}

function vsub(u, v) {
  return u.map((x, i) => x - v[i]);
}

function block(A, B, C, D) {
  return [
    [...A[0], ...B[0]],
    [...A[1], ...B[1]],
    [...C[0], ...D[0]],
    [...C[1], ...D[1]],
  ];
}

function inverse2(X) {
  const d = X[0][0] * X[1][1] - X[0][1] * X[1][0];
  return [[X[1][1] / d, -X[0][1] / d], [-X[1][0] / d, X[0][0] / d]];
}

function maxAbs(A) {
  return Math.max(...A.flat().map(Math.abs));
}

const rho = [[7, 5], [5, 8]];
const rhoInv = inverse2(rho);
const q = [1.2, -0.7];
const p = [0.4, 2.1];
const pOnShell = mv(rho, q);

const W = 0.5 * dot(q, mv(rho, q));
const WStar = 0.5 * dot(p, mv(rhoInv, p));
const fenchelGap = W + WStar - dot(p, q);
const residual = vsub(p, mv(rho, q));
const residualGap = 0.5 * dot(residual, mv(rhoInv, residual));
const onShellWStar = 0.5 * dot(pOnShell, mv(rhoInv, pOnShell));
const onShellLegendreError = Math.abs(W + onShellWStar - dot(pOnShell, q));

const Z2 = zeros(2, 2);
const I2 = identity(2);
const J = block(Z2, I2, scale(I2, -1), Z2);
const selfDualS = block(rho, Z2, Z2, rhoInv);
const selfDualK = mul(J, selfDualS);
const universalOscillatorError = maxAbs(add(mul(selfDualK, selfDualK), identity(4)));

const lambda = 3.5;
const scaledDualS = block(rho, Z2, Z2, scale(rhoInv, lambda));
const scaledDualK = mul(J, scaledDualS);
const scaledFrequencyError = maxAbs(add(mul(scaledDualK, scaledDualK), scale(identity(4), lambda)));

const omega = 2.25;
const clockScaledS = scale(selfDualS, omega);
const clockScaledK = mul(J, clockScaledS);
const clockScaleError = maxAbs(add(mul(clockScaledK, clockScaledK), scale(identity(4), omega ** 2)));

const alternativePositiveG = [[2, 0.25], [0.25, 1.5]];
const alternativeS = block(rho, Z2, Z2, alternativePositiveG);
const alternativeAccelerationMatrix = scale(mul(alternativePositiveG, rho), -1);

const passed =
  Math.abs(fenchelGap - residualGap) < 1e-12 &&
  fenchelGap >= 0 &&
  onShellLegendreError < 1e-12 &&
  universalOscillatorError < 1e-12 &&
  scaledFrequencyError < 1e-12 &&
  clockScaleError < 1e-12;

console.log(JSON.stringify({
  quadraticLegendreDuality: {
    rho,
    rhoInv,
    q,
    p,
    W,
    WStar,
    fenchelGap,
    residualGap,
    identity: "W(q)+W*(p)-p.q = 1/2 (p-rho q)^T rho^-1 (p-rho q) >= 0",
    onShellLegendreError,
  },
  selfDualHamiltonian: {
    hessian: selfDualS,
    generatorSquareError: universalOscillatorError,
    equation: "q_ddot = -q",
  },
  relativeNormalizationFreedomWithoutSelfDuality: {
    lambda,
    generatorSquareTarget: "K_lambda^2 = -lambda I",
    error: scaledFrequencyError,
    frequency: Math.sqrt(lambda),
  },
  overallClockFreedomEvenWithSelfDuality: {
    omega,
    generatorSquareTarget: "K_omega^2 = -omega^2 I",
    error: clockScaleError,
    frequency: omega,
  },
  nonuniquenessWithoutDuality: {
    alternativePositiveKineticBlock: alternativePositiveG,
    alternativeHessian: alternativeS,
    qAccelerationMatrix: alternativeAccelerationMatrix,
    interpretation: "Positivity permits many kinetic blocks G>0. Equal-weight Legendre self-duality selects G=rho^-1; without it, even the relative normalization is free.",
  },
  verdict: "The inverse block is exactly the Hessian of the Legendre-dual quadratic response. Treating primal and dual forms with equal weight as one canonical Hamiltonian is an additional self-dual completion. Even then, multiplying the whole Hamiltonian by an overall clock scale remains free.",
  passed,
}, null, 2));

if (!passed) process.exitCode = 1;
