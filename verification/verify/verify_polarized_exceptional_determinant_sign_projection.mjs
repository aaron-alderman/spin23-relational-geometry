const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const C = (re = 0, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = a => C(a.re, -a.im);
const scale = (s, a) => C(s * a.re, s * a.im);
const sub = (a, b) => C(a.re - b.re, a.im - b.im);
const csum = values => values.reduce((s, z) => add(s, z), C());
const madd = (...As) => As[0].map((row, i) => row.map((_, j) => csum(As.map(A => A[i][j]))));
const mscale = (s, A) => A.map(row => row.map(z => scale(s, z)));
const mconj = A => A.map(row => row.map(conj));

const det3 = M => {
  const t1 = mul(M[0][0], sub(mul(M[1][1], M[2][2]), mul(M[1][2], M[2][1])));
  const t2 = mul(M[0][1], sub(mul(M[1][0], M[2][2]), mul(M[1][2], M[2][0])));
  const t3 = mul(M[0][2], sub(mul(M[1][0], M[2][1]), mul(M[1][1], M[2][0])));
  return add(sub(t1, t2), t3);
};

const polarizedDet = (A, B, Cc) => scale(1 / 6, csum([
  det3(madd(A, B, Cc)),
  scale(-1, det3(madd(A, B))),
  scale(-1, det3(madd(A, Cc))),
  scale(-1, det3(madd(B, Cc))),
  det3(A), det3(B), det3(Cc)
]));

const zero = () => Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => C()));
const diagonal = entries => entries.map((z, i) => entries.map((_, j) => i === j ? z : C()));

function signCoefficient(Z) {
  const [Z1, Z2, Z3] = Z;
  const D112 = polarizedDet(Z1, Z1, Z2);
  const D113 = polarizedDet(Z1, Z1, Z3);
  const D122 = polarizedDet(Z1, Z2, Z2);
  const D133 = polarizedDet(Z1, Z3, Z3);
  const D223 = polarizedDet(Z2, Z2, Z3);
  const D233 = polarizedDet(Z2, Z3, Z3);
  return scale(0.5, csum([
    scale(-1, D112), D113, D122,
    scale(-1, D133), scale(-1, D223), D233
  ]));
}

const w = C(-6, -6);
const Z1 = diagonal([C(1), C(1), C()]);
const Z2 = diagonal([C(), C(), w]);
const Z3 = zero();
const coefficient = signCoefficient([Z1, Z2, Z3]);
assert(Math.abs(coefficient.re - 1) < 1e-12 && Math.abs(coefficient.im - 1) < 1e-12, "sign coefficient normalization failed");

const permutations = [
  { p: [0, 1, 2], sign: 1 },
  { p: [1, 0, 2], sign: -1 },
  { p: [0, 2, 1], sign: -1 },
  { p: [2, 1, 0], sign: -1 },
  { p: [1, 2, 0], sign: 1 },
  { p: [2, 0, 1], sign: 1 }
];
const matrixLinearCombination = (x, Z) => madd(...Z.map((M, i) => mscale(x[i], M)));
const F = (x, Z) => det3(matrixLinearCombination(x, Z));
const altF = (x, Z) => scale(1 / 6, csum(permutations.map(({ p, sign }) =>
  scale(sign, F(p.map(i => x[i]), Z))
)));
const vandermonde = x => (x[0] - x[1]) * (x[1] - x[2]) * (x[2] - x[0]);
const testX = [0.2, -1.3, 2.1];
const projected = altF(testX, [Z1, Z2, Z3]);
const expected = scale(vandermonde(testX), coefficient);
assert(Math.hypot(projected.re - expected.re, projected.im - expected.im) < 1e-10, "alternating projector must equal c times Vandermonde");

const swapped = signCoefficient([Z2, Z1, Z3]);
assert(Math.hypot(swapped.re + coefficient.re, swapped.im + coefficient.im) < 1e-12, "sheet transposition must reverse c");
const conjugated = signCoefficient([mconj(Z1), mconj(Z2), mconj(Z3)]);
assert(Math.hypot(conjugated.re - coefficient.re, conjugated.im + coefficient.im) < 1e-12, "antiunitary conjugation must send c to c-bar");

const alpha = coefficient.re;
const beta = coefficient.im;
assert(Math.abs(alpha * beta - 1) < 1e-12, "exceptional complex coefficient must give nonzero CP area");

const equalSheets = signCoefficient([Z1, Z1, Z3]);
assert(Math.hypot(equalSheets.re, equalSheets.im) < 1e-12, "sign projection must vanish when two sheets coincide");

console.log("Polarized exceptional determinant sign-projection certificate: PASS");
console.log("Alt_det_sum=c_times_Vandermonde; c=1+i in checkpoint");
console.log("sheet_transposition_c_to_minus_c=true; antiunitary_c_to_conjugate_c=true");
console.log("Delta_c=Re_c_A_plus_Im_c_B; CP_area=Re_c_Im_c=1");
