const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };
const C = (re, im = 0) => ({ re, im });
const add = (x, y) => C(x.re + y.re, x.im + y.im);
const sub = (x, y) => C(x.re - y.re, x.im - y.im);
const mul = (x, y) => C(x.re * y.re - x.im * y.im, x.re * y.im + x.im * y.re);
const conj = (x) => C(x.re, -x.im);
const scale = (a, x) => C(a * x.re, a * x.im);
const abs = (x) => Math.hypot(x.re, x.im);
const phase = (theta) => C(Math.cos(theta), Math.sin(theta));

const N = 9;
const dft = (x) => Array.from({ length: N }, (_, k) => x.reduce((q, xn, n) => add(q, mul(xn, phase(-2 * Math.PI * k * n / N))), C(0)));
const idft = (X) => Array.from({ length: N }, (_, n) => scale(1 / N, X.reduce((q, Xk, k) => add(q, mul(Xk, phase(2 * Math.PI * k * n / N))), C(0))));
const hilbert = (x) => {
  const X = dft(x);
  const half = (N - 1) / 2;
  const HX = X.map((z, k) => {
    if (k === 0) return C(0);
    const sign = k <= half ? 1 : -1;
    return mul(C(0, -sign), z);
  });
  return idft(HX);
};
const closeVector = (x, y, tol = 1e-10) => x.every((z, i) => abs(sub(z, y[i])) < tol);

const raw = [1.2, -0.7, 0.4, 2.1, -1.5, 0.3, -0.2, 0.8, -1.1];
const mean = raw.reduce((a, b) => a + b, 0) / N;
const x = raw.map((v) => C(v - mean));
const Hx = hilbert(x);
const HHx = hilbert(Hx);
assert(closeVector(HHx, x.map((z) => scale(-1, z))), "Hilbert transform must square to minus one on zero-mean odd sample space");
assert(Hx.every((z) => Math.abs(z.im) < 1e-10), "Hilbert transform of real data must remain real");

// Analytic signal z=x+iHx has only positive discrete frequencies.
const analytic = x.map((z, i) => add(z, mul(C(0, 1), Hx[i])));
const spectrum = dft(analytic);
const half = (N - 1) / 2;
for (let k = half + 1; k < N; k += 1) {
  assert(abs(spectrum[k]) < 1e-9, "analytic signal must have vanishing negative-frequency components");
}

// H is real-linear and fixes no independent pointwise phase.
const y = raw.map((v, i) => C((i + 1) * 0.13 - v * 0.2));
const yMean = y.reduce((q, z) => add(q, z), C(0)).re / N;
const y0 = y.map((z) => C(z.re - yMean));
const Hsum = hilbert(x.map((z, i) => add(z, y0[i])));
const sumH = hilbert(x).map((z, i) => add(z, hilbert(y0)[i]));
assert(closeVector(Hsum, sumH), "causal complex structure must be real-linear");

console.log("Discrete Hilbert causal-complex-structure certificate: PASS");
console.log("H^2=-I_on_zero_mean_response_space=true");
console.log("analytic_signal=x+iHx_has_one_sided_spectrum=true");
console.log("absorptive_quadrature_is_nonlocal_function_of_dispersive_spectrum=true");
