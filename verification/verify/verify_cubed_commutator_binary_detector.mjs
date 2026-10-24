import assert from "node:assert/strict";

const tolerance = 1e-10;
const omega = { re: -1 / 2, im: Math.sqrt(3) / 2 };

const complex = (re, im = 0) => ({ re, im });
const add = (left, right) =>
  complex(left.re + right.re, left.im + right.im);
const multiply = (left, right) =>
  complex(
    left.re * right.re - left.im * right.im,
    left.re * right.im + left.im * right.re,
  );
const conjugate = (value) => complex(value.re, -value.im);
const close = (left, right) =>
  Math.abs(left.re - right.re) < tolerance &&
  Math.abs(left.im - right.im) < tolerance;

const matrix = (rows) => rows.map((row) => row.map((value) =>
  typeof value === "number" ? complex(value) : value));
const identity = (dimension) =>
  matrix(Array.from({ length: dimension }, (_, row) =>
    Array.from({ length: dimension }, (_, column) => row === column ? 1 : 0)));
const dagger = (value) =>
  value[0].map((_, column) => value.map((row) => conjugate(row[column])));
const product = (left, right) =>
  left.map((row) =>
    right[0].map((_, column) =>
      row.reduce(
        (sum, item, index) => add(sum, multiply(item, right[index][column])),
        complex(0),
      ),
    ),
  );
const power = (value, exponent) => {
  let result = identity(value.length);
  for (let index = 0; index < exponent; index += 1) result = product(result, value);
  return result;
};
const scalarMatrix = (scalar, dimension) =>
  identity(dimension).map((row) => row.map((value) => multiply(scalar, value)));
const matricesClose = (left, right) =>
  left.every((row, i) => row.every((value, j) => close(value, right[i][j])));
const commutator = (left, right) =>
  product(product(product(left, right), dagger(left)), dagger(right));

const qubitX = matrix([[0, 1], [1, 0]]);
const qubitZ = matrix([[1, 0], [0, -1]]);
const qubitCommutator = commutator(qubitX, qubitZ);
assert.ok(matricesClose(qubitCommutator, scalarMatrix(complex(-1), 2)));
assert.ok(
  matricesClose(power(qubitCommutator, 3), scalarMatrix(complex(-1), 2)),
);

// X|j> = |j+1>, Z|j> = omega^j |j>.
const qutritX = matrix([[0, 0, 1], [1, 0, 0], [0, 1, 0]]);
const omegaSquared = multiply(omega, omega);
const qutritZ = matrix([
  [1, 0, 0],
  [0, omega, 0],
  [0, 0, omegaSquared],
]);
const qutritCommutator = commutator(qutritX, qutritZ);
const qutritPhase = qutritCommutator[0][0];
assert.ok(
  close(qutritPhase, omega) || close(qutritPhase, omegaSquared),
);
assert.ok(matricesClose(qutritCommutator, scalarMatrix(qutritPhase, 3)));
assert.ok(
  matricesClose(power(qutritCommutator, 3), identity(3)),
);

// Exhaust the abstract cross-prime commutator exponents.
const mod = (value, modulus) => ((value % modulus) + modulus) % modulus;
const projectionRows = [];
for (let binaryPairing = 0; binaryPairing < 2; binaryPairing += 1) {
  for (let qutritPairing = 0; qutritPairing < 3; qutritPairing += 1) {
    const exponent = mod(3 * binaryPairing + 2 * qutritPairing, 6);
    const cubedExponent = mod(3 * exponent, 6);
    const expectedCubedExponent = binaryPairing === 0 ? 0 : 3;
    assert.equal(cubedExponent, expectedCubedExponent);
    projectionRows.push({ binaryPairing, qutritPairing, exponent, cubedExponent });
  }
}

console.log(JSON.stringify({
  status: "PASS",
  detector: {
    character: "chi(z)=z^3 on mu_6",
    circuit: "repeat the controlled Weyl commutator loop three times",
    systemStateIndependentWhenCentral: true,
  },
  directMatrices: {
    qubitCommutator: "-I_2",
    qubitCubed: "-I_2",
    qutritCommutatorPhase: qutritPhase,
    qutritCubed: "+I_3",
  },
  exhaustiveCrossPrimeProjection: projectionRows,
  idealAncillaReadout: {
    pauliAnticommutingPairX: -1,
    qutritCubicPairAfterCubeX: 1,
    uncubedQutritQuadratures: [
      [-1 / 2, Math.sqrt(3) / 2],
      [-1 / 2, -Math.sqrt(3) / 2],
    ],
  },
  verdict:
    "the binary record character is an explicit unitary cubed-commutator circuit, not an abstract nonlinear phase classifier",
}));
