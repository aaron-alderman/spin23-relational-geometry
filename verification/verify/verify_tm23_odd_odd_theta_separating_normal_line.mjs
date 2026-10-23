import assert from "node:assert/strict";

// The characteristic q_*=(1,1,1,1) is odd on each elliptic factor.  With
// Omega=[[tau_1,epsilon],[epsilon,tau_2]], the theta-series definition gives
//
// theta[q_*](0|Omega)
//   = epsilon theta_1'(0|tau_1) theta_1'(0|tau_2)/(2 pi i)
//     + O(epsilon^3).
//
// This certificate checks the factorisation and oddness numerically and checks
// that the selected machine repair has an exact matched order-three action on
// the two handles.

function add(z, w) {
  return { re: z.re + w.re, im: z.im + w.im };
}

function multiply(z, w) {
  return {
    re: z.re * w.re - z.im * w.im,
    im: z.re * w.im + z.im * w.re,
  };
}

function scale(z, a) {
  return { re: a * z.re, im: a * z.im };
}

function exponential(z) {
  const radius = Math.exp(z.re);
  return { re: radius * Math.cos(z.im), im: radius * Math.sin(z.im) };
}

function divide(z, w) {
  const denominator = w.re * w.re + w.im * w.im;
  return {
    re: (z.re * w.re + z.im * w.im) / denominator,
    im: (z.im * w.re - z.re * w.im) / denominator,
  };
}

function absolute(z) {
  return Math.hypot(z.re, z.im);
}

const piI = { re: 0, im: Math.PI };
const twoPiI = { re: 0, im: 2 * Math.PI };

function oddThetaDerivative(tau, cutoff = 10) {
  let answer = { re: 0, im: 0 };
  for (let n = -cutoff; n <= cutoff; n += 1) {
    const x = n + 0.5;
    const exponent = add(
      scale(multiply(piI, tau), x * x),
      scale(twoPiI, 0.5 * x),
    );
    answer = add(answer, scale(exponential(exponent), 2 * Math.PI * x));
  }
  // Multiplication by i in d/dz exp(2 pi i x z).
  return { re: -answer.im, im: answer.re };
}

function oddOddThetaConstant(tau1, tau2, epsilon, cutoff = 8) {
  let answer = { re: 0, im: 0 };
  for (let n1 = -cutoff; n1 <= cutoff; n1 += 1) {
    for (let n2 = -cutoff; n2 <= cutoff; n2 += 1) {
      const x = n1 + 0.5;
      const y = n2 + 0.5;
      const quadratic = add(
        add(scale(tau1, x * x), scale(tau2, y * y)),
        { re: 2 * epsilon * x * y, im: 0 },
      );
      const phase = 0.5 * (x + y);
      const exponent = add(multiply(piI, quadratic), scale(twoPiI, phase));
      answer = add(answer, exponential(exponent));
    }
  }
  return answer;
}

function dedekindEta(tau, cutoff = 80) {
  const q = exponential(multiply(twoPiI, tau));
  let product = { re: 1, im: 0 };
  let qPower = { re: 1, im: 0 };
  for (let n = 1; n <= cutoff; n += 1) {
    qPower = multiply(qPower, q);
    product = multiply(product, add({ re: 1, im: 0 }, scale(qPower, -1)));
  }
  return multiply(exponential(scale(multiply(twoPiI, tau), 1 / 24)), product);
}

const tau1 = { re: 0.17, im: 1.1 };
const tau2 = { re: -0.11, im: 0.9 };
const derivativeProduct = multiply(
  oddThetaDerivative(tau1),
  oddThetaDerivative(tau2),
);
const linearCoefficient = divide(derivativeProduct, twoPiI);

// Jacobi's derivative formula in this characteristic convention is
// theta_odd'(0|tau)=-2*pi*eta(tau)^3.
for (const tau of [tau1, tau2]) {
  const eta = dedekindEta(tau);
  const jacobiPrediction = scale(multiply(multiply(eta, eta), eta), -2 * Math.PI);
  const jacobiRatio = divide(oddThetaDerivative(tau), jacobiPrediction);
  assert.ok(absolute(add(jacobiRatio, { re: -1, im: 0 })) < 2e-13);
}

const convergence = [];
for (const epsilon of [0.04, 0.02, 0.01, 0.005]) {
  const positive = oddOddThetaConstant(tau1, tau2, epsilon);
  const negative = oddOddThetaConstant(tau1, tau2, -epsilon);
  const ratio = divide(positive, scale(linearCoefficient, epsilon));
  const oddnessError = absolute(add(positive, negative));
  const relativeLinearError = absolute(add(ratio, { re: -1, im: 0 }));
  assert.ok(oddnessError < 2e-13);
  convergence.push({ epsilon, relativeLinearError, ratio });
}
assert.ok(
  convergence.every(
    (entry, index) =>
      index === 0 ||
      entry.relativeLinearError < convergence[index - 1].relativeLinearError / 3.9,
  ),
);
assert.ok(convergence.at(-1).relativeLinearError < 3e-5);

// Local zero-mode model.  Each odd elliptic spin structure contributes one
// zero mode.  Plumbing couples the two real modes by a 2x2 skew form.  Its
// Pfaffian is orientation-sensitive and its determinant forgets the sign.
function pfaffian2(matrix) {
  assert.equal(matrix[0][0], 0);
  assert.equal(matrix[1][1], 0);
  assert.equal(matrix[0][1], -matrix[1][0]);
  return matrix[0][1];
}

for (const t of [1, -1, 3, -3]) {
  const zeroModeCoupling = [[0, t], [-t, 0]];
  assert.equal(pfaffian2(zeroModeCoupling), t);
  assert.equal(
    zeroModeCoupling[0][0] * zeroModeCoupling[1][1] -
      zeroModeCoupling[0][1] * zeroModeCoupling[1][0],
    t * t,
  );
}

function multiply2(a, b) {
  return a.map((row) =>
    b[0].map((_, j) => row.reduce((sum, value, k) => sum + value * b[k][j], 0)),
  );
}

function power2(matrix, exponent) {
  let answer = [[1, 0], [0, 1]];
  for (let i = 0; i < exponent; i += 1) answer = multiply2(matrix, answer);
  return answer;
}

// This is the selected exact order-three lift after a compatible marking sends
// the machine's q_direction to q_*=(1,1,1,1).
const selectedLift = [
  [-2, 0, -3, 0],
  [0, -2, 0, 3],
  [1, 0, 1, 0],
  [0, -1, 0, 1],
];
const handleIndices = [[0, 2], [1, 3]];
const handleBlocks = handleIndices.map((indices) =>
  indices.map((i) => indices.map((j) => selectedLift[i][j])),
);
assert.deepEqual(handleBlocks, [
  [[-2, -3], [1, 1]],
  [[-2, 3], [-1, 1]],
]);
const reflection = [[1, 0], [0, -1]];
const symplectic2 = [[0, 1], [-1, 0]];
const eisensteinMultiplication = [[0, -1], [1, -1]];
const eisensteinBases = [
  [[1, -2], [0, 1]],
  [[1, -2], [0, -1]],
];
for (let i = 0; i < 2; i += 1) {
  assert.deepEqual(
    multiply2(handleBlocks[i], eisensteinBases[i]),
    multiply2(eisensteinBases[i], eisensteinMultiplication),
  );
}
assert.equal(
  eisensteinBases[0][0][0] * eisensteinBases[0][1][1] -
    eisensteinBases[0][0][1] * eisensteinBases[0][1][0],
  1,
);
assert.equal(
  eisensteinBases[1][0][0] * eisensteinBases[1][1][1] -
    eisensteinBases[1][0][1] * eisensteinBases[1][1][0],
  -1,
);
assert.deepEqual(
  multiply2(multiply2(reflection, handleBlocks[0]), reflection),
  handleBlocks[1],
);
assert.deepEqual(
  multiply2(multiply2(reflection, symplectic2), reflection),
  symplectic2.map((row) => row.map((value) => (value === 0 ? 0 : -value))),
);
for (const block of handleBlocks) {
  const trace = block[0][0] + block[1][1];
  const determinant = block[0][0] * block[1][1] - block[0][1] * block[1][0];
  assert.equal(trace, -1);
  assert.equal(determinant, 1);
  assert.deepEqual(power2(block, 3), [[1, 0], [0, 1]]);
  assert.deepEqual(
    multiply2(block, block).map((row, i) =>
      row.map((value, j) => value + block[i][j] + (i === j ? 1 : 0)),
    ),
    [[0, 0], [0, 0]],
  );
}

// The matched order-three action has paired elliptic fixed points.  The two
// automorphy factors are inverse, so the separating normal coordinate is fixed
// to first order rather than acquiring a residual phase.
function mobius(block, tau) {
  const numerator = add(scale(tau, block[0][0]), { re: block[0][1], im: 0 });
  const denominator = add(scale(tau, block[1][0]), { re: block[1][1], im: 0 });
  return divide(numerator, denominator);
}

const sqrt3 = Math.sqrt(3);
const ellipticFixedPoints = [
  { re: -1.5, im: sqrt3 / 2 },
  { re: 1.5, im: sqrt3 / 2 },
];
for (let i = 0; i < 2; i += 1) {
  assert.ok(absolute(add(mobius(handleBlocks[i], ellipticFixedPoints[i]), scale(ellipticFixedPoints[i], -1))) < 2e-15);
}
const automorphyFactors = handleBlocks.map((block, i) =>
  add(scale(ellipticFixedPoints[i], block[1][0]), { re: block[1][1], im: 0 }),
);
assert.ok(absolute(add(multiply(...automorphyFactors), { re: -1, im: 0 })) < 2e-15);
const separatingNormalEigenvalue = divide({ re: 1, im: 0 }, multiply(...automorphyFactors));
assert.ok(absolute(add(separatingNormalEigenvalue, { re: -1, im: 0 })) < 2e-15);

function complexSquareRoot(z) {
  const radius = absolute(z);
  const re = Math.sqrt((radius + z.re) / 2);
  const im = (z.im < 0 ? -1 : 1) * Math.sqrt((radius - z.re) / 2);
  return { re, im };
}

function multiplyComplex2(a, b) {
  return a.map((row) =>
    b[0].map((_, j) =>
      row.reduce((sum, value, k) => add(sum, multiply(value, b[k][j])), { re: 0, im: 0 }),
    ),
  );
}

function inverseComplex2(matrix) {
  const determinant = add(
    multiply(matrix[0][0], matrix[1][1]),
    scale(multiply(matrix[0][1], matrix[1][0]), -1),
  );
  return [
    [divide(matrix[1][1], determinant), divide(scale(matrix[0][1], -1), determinant)],
    [divide(scale(matrix[1][0], -1), determinant), divide(matrix[0][0], determinant)],
  ];
}

function selectedSiegelAction(omega) {
  const numerator = [
    [add(scale(omega[0][0], -2), { re: -3, im: 0 }), scale(omega[0][1], -2)],
    [scale(omega[1][0], -2), add(scale(omega[1][1], -2), { re: 3, im: 0 })],
  ];
  const denominator = [
    [add(omega[0][0], { re: 1, im: 0 }), omega[0][1]],
    [scale(omega[1][0], -1), add(scale(omega[1][1], -1), { re: 1, im: 0 })],
  ];
  return multiplyComplex2(numerator, inverseComplex2(denominator));
}

const fixedCurveSamples = [];
for (const z of [0, 0.05, 0.1, 0.2]) {
  // Fixed curve: y=x+3 and z^2=x^2+3x+3.  Select the branch through
  // x=(-3+i*sqrt(3))/2.
  const discriminant = { re: 4 * z * z - 3, im: 0 };
  const x = scale(add({ re: -3, im: 0 }, complexSquareRoot(discriminant)), 0.5);
  const y = add(x, { re: 3, im: 0 });
  const omega = [[x, { re: z, im: 0 }], [{ re: z, im: 0 }, y]];
  const transformed = selectedSiegelAction(omega);
  const maximumError = Math.max(
    ...omega.flatMap((row, i) => row.map((value, j) => absolute(add(transformed[i][j], scale(value, -1))))),
  );
  const imaginaryDeterminant = x.im * y.im;
  assert.ok(x.im > 0 && imaginaryDeterminant > 0);
  assert.ok(maximumError < 3e-15);
  fixedCurveSamples.push({ z, x, y, maximumError });
}

console.log(JSON.stringify({
  characteristic: "q_*=(1,1,1,1)=odd x odd",
  separatingExpansion:
    "theta[q_*](0|Omega)=epsilon*theta_1'(0|tau_1)*theta_1'(0|tau_2)/(2*pi*i)+O(epsilon^3)",
  sewingConvention:
    "Omega_12=2*pi*i*t gives 4*pi^2*t*eta(tau_1)^3*eta(tau_2)^3+O(t^3)",
  modularWeights: {
    sewingParameter: [-1, -1],
    etaCubedProduct: [1.5, 1.5],
    leadingThetaTerm: [0.5, 0.5],
  },
  seamReversal: "epsilon -> -epsilon reverses the theta-normal line",
  zeroModeModel: {
    coupling: "[[0,t],[-t,0]]",
    pfaffian: "t (orientation-sensitive)",
    determinant: "t^2 (orientation-blind)",
  },
  convergence,
  selectedLift,
  handleBlocks,
  handleAction: "matched SL(2,Z) order-three blocks",
  orderThreeFixedFibre: {
    ellipticFixedPoints,
    automorphyFactors,
    separatingNormalEigenvalue,
    residualNormalPhase: 1,
  },
  exactSiegelFixedCurve: {
    equations: ["y=x+3", "z^2=x^2+3*x+3"],
    complexDimension: 1,
    containsSeparatingPoint: true,
    samples: fixedCurveSamples,
  },
  continuousCentralizerPortal: {
    representation:
      "two copies of the order-three complex line with opposite symplectic signs",
    realSymplecticCentralizer: "U(1,1)",
    semisimpleFactor: "SU(1,1) ~= SL(2,R) ~= Spin_0(2,1)",
    fixedDomain: "U(1,1)/(U(1) x U(1)) ~= unit disk",
    ambientGroup: "Sp(4,R) ~= Spin_0(2,3)",
  },
  arithmeticCentralizerPortal: {
    coefficientRing: "Z[omega], omega^2+omega+1=0",
    eisensteinBases,
    hermitianSignature: [1, -1],
    integralCentralizer: "U(diag(1,-1); Z[omega])",
    quotient: "noncompact Eisenstein unitary Shimura/modular curve",
  },
}, null, 2));
console.log("PASS verify_tm23_odd_odd_theta_separating_normal_line");
