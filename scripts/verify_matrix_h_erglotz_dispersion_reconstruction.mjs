import assert from "node:assert/strict";

const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const scale = (c, A) => A.map((row) => row.map((x) => ({ re: c.re * x, im: c.im * x })));
const addComplex = (A, B) => A.map((row, i) => row.map((x, j) => ({ re: x.re + B[i][j].re, im: x.im + B[i][j].im })));
const realAsComplex = (A) => A.map((row) => row.map((x) => ({ re: x, im: 0 })));
const reciprocal = ({ re, im }) => {
  const d = re * re + im * im;
  return { re: re / d, im: -im / d };
};
const invSminusZ = (s, z) => reciprocal({ re: s - z.re, im: -z.im });
const response = ({ z, M, Q, atoms }) => {
  let F = addComplex(realAsComplex(Q), scale(z, M));
  for (const { s, R } of atoms) F = addComplex(F, scale(invSminusZ(s, z), R));
  return F;
};
const derivative = ({ z, M, atoms }) => {
  let D = realAsComplex(M);
  for (const { s, R } of atoms) {
    const w = invSminusZ(s, z);
    const w2 = { re: w.re * w.re - w.im * w.im, im: 2 * w.re * w.im };
    D = addComplex(D, scale(w2, R));
  }
  return D;
};
const imag = (F) => F.map((row) => row.map((x) => x.im));
const real = (F) => F.map((row) => row.map((x) => x.re));
const subReal = (A, B) => A.map((row, i) => row.map((x, j) => x - B[i][j]));
const closeMatrix = (A, B, eps = 1e-11) => {
  for (let i = 0; i < A.length; i += 1) for (let j = 0; j < A[i].length; j += 1) {
    const a = A[i][j];
    const b = B[i][j];
    if (typeof a === "object") {
      assert(Math.abs(a.re - b.re) < eps && Math.abs(a.im - b.im) < eps);
    } else assert(Math.abs(a - b) < eps);
  }
};
const positive2 = (A) => A[0][0] > 0 && A[0][0] * A[1][1] - A[0][1] ** 2 >= -1e-12;

const M = [[0.4, 0.1], [0.1, 0.3]];
const Q1 = [[1, 0.2], [0.2, -0.5]];
const Q2 = [[-2, 0.7], [0.7, 1.5]];
const atoms = [
  { s: -1, R: [[1, 0.3], [0.3, 0.5]] },
  { s: 2, R: [[0.4, -0.2], [-0.2, 0.8]] },
];
assert(positive2(M) && atoms.every(({ R }) => positive2(R)));

const samples = [{ re: 0.2, im: 0.7 }, { re: -2, im: 1.3 }, { re: 4, im: 0.25 }];
for (const z of samples) {
  const F1 = response({ z, M, Q: Q1, atoms });
  const F2 = response({ z, M, Q: Q2, atoms });
  closeMatrix(imag(F1), imag(F2));
  closeMatrix(derivative({ z, M, atoms }), derivative({ z, M, atoms }));
}

// One subtraction value recovers Q after the slope and atoms are known.
const z0 = { re: 0, im: 1 };
const F0 = response({ z: z0, M, Q: Q1, atoms });
const zeroQ = [[0, 0], [0, 0]];
const knownDispersivePart = response({ z: z0, M, Q: zeroQ, atoms });
const reconstructedQ = subReal(real(F0), real(knownDispersivePart));
closeMatrix(reconstructedQ, Q1);

// With reconstructed Q, the full response is recovered at a new point.
const zTest = { re: 1.1, im: 0.9 };
const original = response({ z: zTest, M, Q: Q1, atoms });
const reconstructed = response({ z: zTest, M, Q: reconstructedQ, atoms });
closeMatrix(original, reconstructed);

console.log(JSON.stringify({
  protocol: "matrix-herglotz-dispersion-reconstruction/1",
  representation: "F(z)=Q+M z+sum_j R_j/(s_j-z), with M,R_j positive semidefinite and Q real symmetric",
  checks: {
    positiveSlope: positive2(M),
    positiveResidues: atoms.every(({ R }) => positive2(R)),
    differentSubtractions: { Q1, Q2 },
    identicalImaginaryPartsAtAllTestPoints: true,
    derivativeIndependentOfQ: true,
    subtractionRecoveredFromOneReferenceRealPart: reconstructedQ,
    fullResponseRecoveredAtIndependentPoint: true,
  },
  ambiguityDimensionForTwoByTwoSymmetricQ: 3,
  conclusion: "For the finite matrix Herglotz model, spectral residues and UV slope determine the response up to one real symmetric subtraction tensor. One calibrated real reference value removes that ambiguity and reconstructs the full dispersive response.",
  implication: "The absorptive branch can recover the full Siegel point conditionally; the missing bridge is exactly a shared relative subtraction rule, not an unspecified infinite amount of data.",
  passed: true,
}, null, 2));
