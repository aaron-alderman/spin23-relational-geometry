import assert from "node:assert/strict";

const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const scale = (c, A) => A.map((row) => row.map((x) => c * x));
const frobenius = (A) => Math.sqrt(A.flat().reduce((s, x) => s + x * x, 0));
const det2 = (A) => A[0][0] * A[1][1] - A[0][1] ** 2;
const R0 = [[1, 0], [0, 0]];
const R1 = [[1, 1], [1, 1]];
const rho = (s) => add(R0, scale(s, R1));

const exactEuclidean = (t) => {
  const I0 = Math.log((2 + t) / (1 + t));
  const I1 = 1 - t * I0;
  return add(scale(I0, R0), scale(I1, R1));
};
const quadratureEuclidean = (t, n) => {
  let K = [[0, 0], [0, 0]];
  for (let i = 0; i < n; i += 1) {
    const s = 1 + (i + 0.5) / n;
    const weight = 1 / n;
    const residue = scale(weight, rho(s));
    assert(residue[0][0] > 0 && det2(residue) > 0);
    K = add(K, scale(1 / (s + t), residue));
  }
  return K;
};

const ns = [2, 4, 8, 16, 32, 64];
const sampleTs = [0.2, 1, 5];
const convergence = sampleTs.map((t) => {
  const exact = exactEuclidean(t);
  const errors = ns.map((n) => frobenius(add(quadratureEuclidean(t, n), scale(-1, exact))));
  for (let i = 1; i < errors.length; i += 1) assert(errors[i] < errors[i - 1]);
  assert(errors.at(-1) < errors[0] / 500);
  return { t, exact, errors: Object.fromEntries(ns.map((n, i) => [n, errors[i]])) };
});

// Direct check of positive imaginary part at z=x+iy for the rational approximants.
const imaginaryPartAt = (x, y, n) => {
  let ImK = [[0, 0], [0, 0]];
  for (let i = 0; i < n; i += 1) {
    const s = 1 + (i + 0.5) / n;
    const weight = 1 / n;
    const scalarImaginaryPart = y / ((s - x) ** 2 + y ** 2);
    ImK = add(ImK, scale(weight * scalarImaginaryPart, rho(s)));
  }
  return ImK;
};
for (const n of ns) {
  const ImK = imaginaryPartAt(0.3, 0.7, n);
  assert(ImK[0][0] > 0 && det2(ImK) > 0);
}

console.log(JSON.stringify({
  protocol: "positive-matrix-stieltjes-continuum-quadrature/1",
  continuumDensity: "rho(s)=R0+s R1 on [1,2], with rho(s)>0",
  exactKernel: "K(z)=integral_1^2 rho(s)/(s-z) ds",
  quadrature: "positive midpoint spectral quadrature with n nodes",
  convergence,
  positivity: "Every quadrature residue is positive definite and Im K_n(z)>0 for Im z>0.",
  realizationDimensions: Object.fromEntries(ns.map((n) => [n, { internal: 2 * n, withTwoFaceCarrier: 2 + 2 * n }])),
  continuumLimit: "The finite Hermitian dilations converge off the cut while their dimension diverges, approaching an infinite-dimensional self-adjoint dilation.",
  passed: true,
}, null, 2));
