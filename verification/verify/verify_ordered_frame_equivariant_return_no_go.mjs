#!/usr/bin/env node

function transpose(A) { return A[0].map((_, j) => A.map((row) => row[j])); }
function mul(A, B) { return A.map((row, i) => B[0].map((_, j) => row.reduce((s, _, k) => s + A[i][k] * B[k][j], 0))); }
function add(A, B) { return A.map((row, i) => row.map((x, j) => x + B[i][j])); }
function scale(c, A) { return A.map((row) => row.map((x) => c * x)); }
function sub(A, B) { return add(A, scale(-1, B)); }
function norm(A) { return Math.sqrt(A.flat().reduce((s, x) => s + x * x, 0)); }
function rot12(t) { return [[Math.cos(t), -Math.sin(t), 0], [Math.sin(t), Math.cos(t), 0], [0, 0, 1]]; }
function rot23(t) { return [[1, 0, 0], [0, Math.cos(t), -Math.sin(t)], [0, Math.sin(t), Math.cos(t)]]; }

const basisProjectors = [0, 1, 2].map((j) => Array.from({ length: 3 }, (_, r) => Array.from({ length: 3 }, (_, c) => r === j && c === j ? 1 : 0)));
const rotations = [
  mul(rot12(0.37), rot23(0.71)),
  mul(rot23(-0.42), rot12(1.03)),
  mul(rot12(-0.88), rot23(0.29)),
];
const responseEigenvalues = [-2, 0.5, 4];
const carrierLabels = [1, 3, 8];

const tests = rotations.map((U) => {
  const Ut = transpose(U);
  const frame = basisProjectors.map((P) => mul(mul(U, P), Ut));
  const R = frame.reduce((S, F, j) => add(S, scale(responseEigenvalues[j], F)), scale(0, frame[0]));
  const C = frame.reduce((S, F, j) => add(S, scale(carrierLabels[j], F)), scale(0, frame[0]));
  const commutatorNorm = norm(sub(mul(C, R), mul(R, C)));
  const projectorResiduals = frame.map((F, j) => norm(sub(mul(R, F), scale(responseEigenvalues[j], F))));
  return { commutatorNorm, projectorResiduals };
});

const tolerance = 1e-12;
const passed = tests.every((t) => t.commutatorNorm < tolerance && t.projectorResiduals.every((x) => x < tolerance));

console.log(JSON.stringify({
  protocol: "ordered-frame-equivariant-return-no-go-certificate/1",
  testedFrameCount: tests.length,
  responseEigenvalues,
  carrierLabels,
  tests,
  theorem: "a frame-only U(3)-equivariant Hermitian response is diagonal in that frame with orbit-constant coefficients",
  conclusion: "its spectral-frame return is the identity on every frame, not an orientation selector",
  passed,
}, null, 2));

if (!passed) process.exitCode = 1;
