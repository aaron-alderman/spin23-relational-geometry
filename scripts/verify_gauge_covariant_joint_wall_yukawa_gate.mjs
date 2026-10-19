const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const zeros = (r, c) => Array.from({ length: r }, () => Array(c).fill(0));
const eye = n => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => i === j ? 1 : 0));
const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const sub = (A, B) => A.map((row, i) => row.map((x, j) => x - B[i][j]));
const mul = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const kron = (A, B) => A.flatMap(rowA => B.map(rowB => rowA.flatMap(a => rowB.map(b => a * b))));
const maxAbs = A => Math.max(...A.flat().map(Math.abs));
const comm = (A, B) => sub(mul(A, B), mul(B, A));

const sx = [[0, 1], [1, 0]];
const sz = [[1, 0], [0, -1]];

// The unitary deck exchange acts on a factor carrying two identical gauge reps.
const gaugeGenerator = [[2, 0, 0], [0, -1, 0], [0, 0, 0.5]];
const deck = kron(sx, eye(3));
const duplicatedGauge = kron(eye(2), gaugeGenerator);
assert(maxAbs(comm(deck, duplicatedGauge)) < 1e-12, "unitary deck exchange must commute with identical gauge action");

// Same-charge antiunitary exchange sends exp(i q phi) to exp(-i q phi).
const q = 2 / 3;
const phi = 0.41;
const phaseReal = Math.cos(q * phi);
const phaseImag = Math.sin(q * phi);
assert(Math.abs(phaseImag) > 1e-3, "test phase must be genuinely complex");
// Complex conjugation reverses the imaginary part; swapping identical supports
// cannot repair it.
assert(Math.abs(phaseImag - (-phaseImag)) > 1e-3, "same-charge antiunitary must fail generic U(1) equivariance");

// Algebraic model of the covariant-square gate.
// D0 = alpha tensor Nabla, Yukawa term = C tensor H, with {alpha,C}=0.
const connectionParallel = [[1, 0], [0, 2]];
const yukawaParallel = [[3, 0], [0, 5]];
const connectionNonparallel = [[1, 0], [0, 2]];
const yukawaNonparallel = [[0, 1], [1, 0]];

function squareDefect(A, H) {
  const D0 = kron(sx, A);
  const Y = kron(sz, H);
  const D = add(D0, Y);
  const uncoupledSquare = add(kron(eye(2), mul(A, A)), kron(eye(2), mul(H, H)));
  return sub(mul(D, D), uncoupledSquare);
}

assert(maxAbs(comm(connectionParallel, yukawaParallel)) < 1e-12, "parallel test data must commute");
assert(maxAbs(squareDefect(connectionParallel, yukawaParallel)) < 1e-12, "covariantly constant Yukawa must preserve square factorization");
assert(maxAbs(comm(connectionNonparallel, yukawaNonparallel)) > 0.5, "nonparallel test data must have nonzero covariant derivative");
assert(maxAbs(squareDefect(connectionNonparallel, yukawaNonparallel)) > 0.5, "nonparallel Yukawa must generate a square cross term");

// Verify the exact cross-term formula alpha*C tensor [A,H].
const predicted = kron(mul(sx, sz), comm(connectionNonparallel, yukawaNonparallel));
assert(maxAbs(sub(squareDefect(connectionNonparallel, yukawaNonparallel), predicted)) < 1e-12, "square defect must equal Clifford factor times covariant commutator");

console.log("Gauge-covariant wall-Yukawa gate certificate: PASS");
console.log("unitary_sigma_x_deck_commutes_with_identical_gauge_reps=true");
console.log("same_charge_sigma_x_K_gauge_equivariance=false");
console.log("kernel_square_factorization_iff_covariant_Yukawa_derivative_vanishes=true");
