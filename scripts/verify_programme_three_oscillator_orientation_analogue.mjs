import assert from "node:assert/strict";

const C = (re, im = 0) => ({ re, im });
const add = (x, y) => C(x.re + y.re, x.im + y.im);
const sub = (x, y) => C(x.re - y.re, x.im - y.im);
const mul = (x, y) => C(x.re * y.re - x.im * y.im, x.re * y.im + x.im * y.re);
const div = (x, y) => {
  const q = y.re ** 2 + y.im ** 2;
  return C((x.re * y.re + x.im * y.im) / q, (x.im * y.re - x.re * y.im) / q);
};
const close = (x, y, tolerance = 1e-10) => assert(Math.abs(x - y) < tolerance, `${x} != ${y}`);
const inv2 = (A) => {
  const determinant = sub(mul(A[0][0], A[1][1]), mul(A[0][1], A[1][0]));
  return [
    [div(A[1][1], determinant), div(C(-A[0][1].re, -A[0][1].im), determinant)],
    [div(C(-A[1][0].re, -A[1][0].im), determinant), div(A[0][0], determinant)],
  ];
};

const K0 = [[3, 0.5], [0.5, 3]];
const d = 5;
const b = [1, 2];
const reversed = [2, 1];
const effective = (coupling, z) => {
  // A=K0+bb^T/d makes the zero-frequency Schur complement exactly K0.
  const A = K0.map((row, i) => row.map((x, j) => x + coupling[i] * coupling[j] / d));
  return A.map((row, i) => row.map((x, j) => {
    const diagonalShift = i === j ? z : C(0);
    const internal = div(C(coupling[i] * coupling[j]), sub(C(d), z));
    return sub(sub(C(x), diagonalShift), internal);
  }));
};
const response = (coupling, z) => inv2(effective(coupling, z));
const swap = (A) => [[A[1][1], A[1][0]], [A[0][1], A[0][0]]];

const zero = C(0);
const S0 = effective(b, zero);
const S0r = effective(reversed, zero);
for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) {
  close(S0[i][j].re, K0[i][j]); close(S0[i][j].im, 0);
  close(S0r[i][j].re, K0[i][j]); close(S0r[i][j].im, 0);
}

const z = C(0.8, 0.35);
const G = response(b, z);
const Gr = response(reversed, z);
const swappedG = swap(G);
for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) {
  close(Gr[i][j].re, swappedG[i][j].re);
  close(Gr[i][j].im, swappedG[i][j].im);
}

const odd = sub(G[0][0], G[1][1]);
const oddReversed = sub(Gr[0][0], Gr[1][1]);
close(oddReversed.re, -odd.re); close(oddReversed.im, -odd.im);
assert(Math.hypot(odd.re, odd.im) > 1e-3);

// Im G is positive definite for Im z>0, as follows from the projected
// resolvent identity; verify it directly in the two-port response.
const im00 = G[0][0].im, im11 = G[1][1].im;
const im01 = (G[0][1].im + G[1][0].im) / 2;
assert(im00 > 0 && im11 > 0 && im00 * im11 - im01 ** 2 > 0);

// The full static stiffness is positive: d>0 and its Schur complement K0 is SPD.
assert(d > 0 && K0[0][0] > 0 && K0[0][0] * K0[1][1] - K0[0][1] ** 2 > 0);

console.log("PASS three-oscillator orientation analogue");
console.log("same_static_two_port_response=true");
console.log(`dynamic_orientation_odd_G11_minus_G22=${odd.re}+${odd.im}i`);
console.log("port_swap_flips_odd_response=true");
console.log("projected_response_Herglotz_positive=true");
console.log("effect_requires_asymmetric_internal_couplings_b=(1,2)");
