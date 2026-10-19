import assert from "node:assert/strict";

const eigenvalues = [1, 2.5, 4, 7];
const probeColumns = [
  [1.0, 0.2],
  [0.3, 0.9],
  [0.8, -0.4],
  [0.5, 0.7],
];
const z = { re: 0.8, im: 1.1 };

function zero2() {
  return [
    [0, 0],
    [0, 0],
  ];
}

function addOuterScaled(target, vector, scale) {
  for (let i = 0; i < 2; i += 1) {
    for (let j = 0; j < 2; j += 1) {
      target[i][j] += scale * vector[i] * vector[j];
    }
  }
}

const realPart = zero2();
const imaginaryPart = zero2();

for (let k = 0; k < eigenvalues.length; k += 1) {
  const delta = eigenvalues[k] - z.re;
  const denominator = delta ** 2 + z.im ** 2;
  addOuterScaled(realPart, probeColumns[k], delta / denominator);
  addOuterScaled(imaginaryPart, probeColumns[k], z.im / denominator);
}

const determinant =
  imaginaryPart[0][0] * imaginaryPart[1][1] -
  imaginaryPart[0][1] * imaginaryPart[1][0];
const trace = imaginaryPart[0][0] + imaginaryPart[1][1];

assert(imaginaryPart[0][0] > 0);
assert(imaginaryPart[1][1] > 0);
assert(determinant > 0);

const quadraticTests = [
  [1, 0],
  [0, 1],
  [1, 1],
  [1, -2],
  [Math.PI, Math.E],
].map(([x, y]) => {
  const value =
    x * x * imaginaryPart[0][0] +
    2 * x * y * imaginaryPart[0][1] +
    y * y * imaginaryPart[1][1];
  assert(value > 0);
  return value;
});

console.log(
  JSON.stringify(
    {
      protocol: "two-probe-self-adjoint-resolvent-is-h2-herglotz/1",
      hiddenSelfAdjointSpectrum: eigenvalues,
      spectralParameter: z,
      response: {
        realPart,
        imaginaryPart,
      },
      positivity: {
        trace,
        determinant,
        quadraticTests,
        strict: true,
      },
      interpretation:
        "For A=A* and R(z)=B(A-zI)^(-1)B*, Im R(z) is a positive two-face Jordan-cone matrix in the upper half-plane.",
      limitation:
        "This finite spectral certificate proves the resolvent/Herglotz mechanism, not the automorphic origin of A or the occurrence of zeta factors.",
    },
    null,
    2,
  ),
);
