import assert from "node:assert/strict";

const weights = [0.8, 0.65, 0.5];
const rays = [[1, 0], [0, 1], [1, 1]];
const B = [
  rays.map((v, i) => Math.sqrt(weights[i]) * v[0]),
  rays.map((v, i) => Math.sqrt(weights[i]) * v[1]),
];
const D0 = [2.0, 3.0, 4.5];
const lambda = [0.45, 0.35, 0.25];
const A = [[1.4, 0.08], [0.08, 1.3]];

const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
const matVec = (M, v) => M.map((row) => dot(row, v));
const transposeMatVec = (M, v) => M[0].map((_, j) => M.reduce((s, row, i) => s + row[j] * v[i], 0));
const minEig2 = (M) => {
  const tr = M[0][0] + M[1][1];
  const disc = Math.hypot(M[0][0] - M[1][1], 2 * M[0][1]);
  return (tr - disc) / 2;
};

function schur(stiffness) {
  return A.map((row, i) => row.map((aij, j) =>
    aij - stiffness.reduce((s, d, k) => s + B[i][k] * B[j][k] / d, 0)));
}

function bathTangent(xi) {
  return D0.map((d, i) => d + 3 * lambda[i] * xi[i] ** 2);
}

function potential(x, xi) {
  const ax = dot(x, matVec(A, x)) / 2;
  const bath = xi.reduce((s, q, i) => s + D0[i] * q * q / 2 + lambda[i] * q ** 4 / 4, 0);
  return ax + bath - dot(x, matVec(B, xi));
}

function energy(state) {
  return (dot(state.px, state.px) + dot(state.pi, state.pi)) / 2
    + potential(state.x, state.xi);
}

function forces(x, xi) {
  const ax = matVec(A, x);
  const fx = matVec(B, xi).map((v, i) => v - ax[i]);
  const btX = transposeMatVec(B, x);
  const fxi = xi.map((q, i) => -D0[i] * q - lambda[i] * q ** 3 + btX[i]);
  return { fx, fxi };
}

function hStep(state, dt) {
  const f0 = forces(state.x, state.xi);
  const pxh = state.px.map((p, i) => p + 0.5 * dt * f0.fx[i]);
  const pih = state.pi.map((p, i) => p + 0.5 * dt * f0.fxi[i]);
  const x = state.x.map((q, i) => q + dt * pxh[i]);
  const xi = state.xi.map((q, i) => q + dt * pih[i]);
  const f1 = forces(x, xi);
  return {
    x,
    xi,
    px: pxh.map((p, i) => p + 0.5 * dt * f1.fx[i]),
    pi: pih.map((p, i) => p + 0.5 * dt * f1.fxi[i]),
  };
}

const baselineSchurMin = minEig2(schur(D0));
assert.ok(baselineSchurMin > 0);

let state = {
  x: [0.28, -0.22],
  px: [0.09, 0.04],
  xi: [0.36, -0.27, 0.31],
  pi: [-0.08, 0.11, 0.06],
};
const initialEnergy = energy(state);
const initialPoles = bathTangent(state.xi);
let maximumEnergyError = 0;
let minimumStaticSchurEigenvalue = Infinity;
let maximumPoleShift = 0;
const dt = 0.0015;

for (let step = 0; step < 40000; step += 1) {
  state = hStep(state, dt);
  const tangent = bathTangent(state.xi);
  minimumStaticSchurEigenvalue = Math.min(
    minimumStaticSchurEigenvalue,
    minEig2(schur(tangent)),
  );
  maximumPoleShift = Math.max(
    maximumPoleShift,
    ...tangent.map((p, i) => Math.abs(p - initialPoles[i])),
  );
  maximumEnergyError = Math.max(
    maximumEnergyError,
    Math.abs(energy(state) - initialEnergy),
  );
}

assert.ok(maximumEnergyError < 2e-6, "energy drift " + maximumEnergyError);
assert.ok(minimumStaticSchurEigenvalue > 0, "lost static positivity " + minimumStaticSchurEigenvalue);
assert.ok(maximumPoleShift > 1e-2, "poles did not backreact " + maximumPoleShift);

const z = { re: 1.1, im: 0.7 };
const tangent = bathTangent(state.xi);
const imSigma = [[0, 0], [0, 0]];
for (let k = 0; k < 3; k += 1) {
  const denom = (tangent[k] - z.re) ** 2 + z.im ** 2;
  const alpha = z.im / denom;
  for (let i = 0; i < 2; i += 1) {
    for (let j = 0; j < 2; j += 1) {
      imSigma[i][j] += alpha * B[i][k] * B[j][k];
    }
  }
}
const imDet = imSigma[0][0] * imSigma[1][1] - imSigma[0][1] ** 2;
assert.ok(imSigma[0][0] > 0 && imDet > 0);

console.log(JSON.stringify({
  baselineSchurMin,
  minimumStaticSchurEigenvalue,
  maximumEnergyError,
  maximumPoleShift,
  finalTangentPoles: tangent,
  upperHalfPlaneImaginaryPartDeterminant: imDet,
  verdict: {
    energyBoundedHamiltonian: true,
    endogenousPoleBackreaction: true,
    positiveResponseDomainPreserved: true,
    learningOrSelfModel: false,
  },
}, null, 2));
