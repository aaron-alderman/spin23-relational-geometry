import assert from "node:assert/strict";

const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const scale = (c, A) => A.map((row) => row.map((x) => c * x));
const mul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const commutator = (A, B) => add(mul(A, B), scale(-1, mul(B, A)));
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const maxAbs = (A) => Math.max(...A.flat().map(Math.abs));
const frobenius = (A) => Math.sqrt(A.flat().reduce((s, x) => s + x * x, 0));
const eye = (n) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => Number(i === j)));
const kron = (A, B) => A.flatMap((aRow) => B.map((bRow) => aRow.flatMap((a) => bRow.map((b) => a * b))));

const X = [
  [0, 1, 0],
  [-1, 0, 0],
  [0, 0, 0],
];
const Y = [
  [0, 0, 0],
  [0, 0, 1],
  [0, -1, 0],
];
assert(maxAbs(add(X, transpose(X))) === 0);
assert(maxAbs(add(Y, transpose(Y))) === 0);

// At V=I for V(x,y)=exp(xX)exp(yY), theta=V dV^T has
// theta_x=-X and theta_y=-Y. The graph-frame connection is A=theta/2.
const thetaX = scale(-1, X);
const thetaY = scale(-1, Y);
const flavorCurvatureXY = scale(-0.25, commutator(thetaX, thetaY));
assert(frobenius(flavorCurvatureXY) > 0.1);
assert(maxAbs(add(flavorCurvatureXY, transpose(flavorCurvatureXY))) < 1e-12);

// A one-parameter base has no curvature two-form.
const oneParameterCurvatureTT = add(mul(scale(0.5, thetaX), scale(0.5, thetaX)), scale(-1, mul(scale(0.5, thetaX), scale(0.5, thetaX))));
assert(maxAbs(oneParameterCurvatureTT) === 0);

// For a tensor-product frame, face and flavor connection components commute,
// so their mixed curvature is exactly zero.
const faceGenerator = [
  [0, 1],
  [-1, 0],
];
const faceConnection = kron(scale(0.5, faceGenerator), eye(3));
const flavorConnection = kron(eye(2), scale(0.5, thetaX));
const mixedCurvature = commutator(faceConnection, flavorConnection);
assert(maxAbs(mixedCurvature) < 1e-12);

console.log(JSON.stringify({
  protocol: "flavor-graph-connection-curvature-and-factorization-boundary/1",
  graphFrame: "Q(V)=2^(-1/2)[I;V^dagger]",
  connection: "A=Q^dagger dQ=(1/2)V dV^dagger",
  curvature: "F=dA+A wedge A=-(1/4)(V dV^dagger) wedge (V dV^dagger)",
  twoParameterExample: {
    generators: { X, Y },
    curvatureXY: flavorCurvatureXY,
    frobeniusNorm: frobenius(flavorCurvatureXY),
    nonzero: true,
  },
  oneParameterResult: "A single scale or energy coordinate has identically zero curvature two-form; it supports transport but no local curvature invariant.",
  exactTensorFactorization: {
    mixedFaceFlavorCurvatureNorm: frobenius(mixedCurvature),
    mixedCurvatureZero: true,
  },
  discriminator: "Nonzero mixed face-flavor curvature requires a nonfactorizable projector or connection and is therefore a clean diagnostic of genuine face/flavor interaction.",
  passed: true,
}, null, 2));
