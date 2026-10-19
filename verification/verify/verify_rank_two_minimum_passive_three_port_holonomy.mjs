const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };
const C = (re, im = 0) => ({ re, im });
const addC = (a, b) => C(a.re + b.re, a.im + b.im);
const mulC = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conjC = (a) => C(a.re, -a.im);
const scaleC = (s, a) => C(s * a.re, s * a.im);
const dotDagger = (a, b) => a.reduce((sum, value, i) => addC(sum, mulC(conjC(value), b[i])), C(0));
const outer = (a) => a.map((x) => a.map((y) => mulC(x, conjC(y))));
const addM = (a, b) => a.map((row, i) => row.map((x, j) => addC(x, b[i][j])));
const closeC = (a, b, tolerance = 1e-10) => Math.abs(a.re - b.re) < tolerance && Math.abs(a.im - b.im) < tolerance;

for (const vector of [
  [C(1, 2), C(-0.5, 0.3), C(2, -1)],
  [C(0.7, -0.2), C(1.1, 0.9), C(-0.4, 1.3)],
]) {
  const rho1 = outer(vector);
  const loop = mulC(mulC(rho1[0][1], rho1[1][2]), rho1[2][0]);
  const expected = vector.reduce((product, value) => product * (value.re ** 2 + value.im ** 2), 1);
  assert(Math.abs(loop.im) < 1e-10 && Math.abs(loop.re - expected) < 1e-10,
    "every rank-one spectral residue must have a real nonnegative loop product");
}

const a = [C(1), C(1), C(1)];
const b = [C(1), C(0, 1), C(0)];
const rho2 = addM(outer(a), outer(b));
const I3 = [[C(1), C(0), C(0)], [C(0), C(1), C(0)], [C(0), C(0), C(1)]];
const rho = addM(rho2, I3);
const u = rho[0][1];
const v = rho[1][2];
const w = rho[2][0];
const loop = mulC(mulC(u, v), w);
assert(closeC(u, C(1, -1)) && closeC(v, C(1)) && closeC(w, C(1)),
  "rank-two Gram example must have the stated complex edges");
assert(closeC(loop, C(1, -1)), "rank-two Gram example must have nonzero loop orientation");

for (const x of [
  [C(1), C(0), C(0)],
  [C(1, 1), C(-2, 0.5), C(0.3, -0.7)],
  [C(0), C(1), C(0, 1)],
]) {
  const norm = x.reduce((sum, value) => sum + value.re ** 2 + value.im ** 2, 0);
  const gramValue = Math.abs(dotDagger(a, x).re) ** 2 + Math.abs(dotDagger(a, x).im) ** 2
    + Math.abs(dotDagger(b, x).re) ** 2 + Math.abs(dotDagger(b, x).im) ** 2 + norm;
  assert(gramValue > 0 && norm > 0, "Gram plus identity representation must be strictly positive");
}

const d3 = rho[2][2].re;
const qIndirect = scaleC(1 / d3, mulC(conjC(w), conjC(v)));
const omega = mulC(u, conjC(qIndirect)).im;
assert(closeC(qIndirect, C(0.5)) && Math.abs(omega + 0.5) < 1e-10,
  "Schur path and oriented area must equal the stated benchmark");
assert(Math.abs(omega - loop.im / d3) < 1e-10,
  "Schur orientation must equal loop orientation divided by eliminated diagonal");

for (const z of [C(0, 1), C(0.4, 2), C(-1.2, 0.3)]) {
  const omega0MinusZ = C(-z.re, -z.im);
  const denominator = omega0MinusZ.re ** 2 + omega0MinusZ.im ** 2;
  const scalar = C(omega0MinusZ.re / denominator, -omega0MinusZ.im / denominator);
  assert(scalar.im > 0, "one-pole Herglotz scalar must have positive imaginary part in the upper half-plane");
}

console.log("Rank-two minimum passive three-port holonomy: PASS");
console.log("rank_one_loop_imaginary_part=0");
console.log("minimum_nonzero_holonomy_spectral_rank=2");
console.log("strict_positive_example_loop=1-i");
console.log("Schur_Omega_OR=-1/2");
console.log("strict_Herglotz_completion=true");
