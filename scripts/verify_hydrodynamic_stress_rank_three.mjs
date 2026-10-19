import assert from 'node:assert/strict';

const constants = { w0: 1.7, eta0: 0.23, d0: 0.31, g0: 0.27, cs2: 1 / 3 };
const weights = ([omega, k, T]) => {
  const { w0, eta0, d0, g0, cs2 } = constants;
  const w = w0 * T ** 4;
  const eta = eta0 * T ** 3;
  const D = d0 / T;
  const Gamma = g0 / T;
  const a = eta * omega;
  const b = w * D * k ** 2 * omega / (omega ** 2 + (D * k ** 2) ** 2);
  const c = w * Gamma * k ** 4 * omega / ((omega ** 2 - cs2 * k ** 2) ** 2 + (Gamma * k ** 2 * omega) ** 2);
  return [a, b, c];
};
const det3 = M =>
  M[0][0] * (M[1][1] * M[2][2] - M[1][2] * M[2][1])
  - M[0][1] * (M[1][0] * M[2][2] - M[1][2] * M[2][0])
  + M[0][2] * (M[1][0] * M[2][1] - M[1][1] * M[2][0]);
const jacobian = (f, x, h = 1e-5) => {
  const cols = x.map((_, j) => {
    const xp = [...x], xm = [...x];
    xp[j] += h; xm[j] -= h;
    const fp = f(xp), fm = f(xm);
    return fp.map((v, i) => (v - fm[i]) / (2 * h));
  });
  return cols[0].map((_, i) => cols.map(col => col[i]));
};

const point = [0.8, 0.65, 1.4];
const [a, b, c] = weights(point);
assert(a > 0 && b > 0 && c > 0);

// rho = [[a+c,c],[c,b+c]] is positive for nonnegative channel weights.
const rho = [[a + c, c], [c, b + c]];
assert(rho[0][0] > 0 && rho[1][1] > 0);
assert(rho[0][0] * rho[1][1] - rho[0][1] ** 2 > 0);

const J = jacobian(weights, point);
const determinant = det3(J);
assert(Math.abs(determinant) > 1e-4);

console.log('Hydrodynamic stress local-rank certificate: PASS');
console.log(`weights=${[a, b, c].map(x => x.toFixed(8)).join(',')}; jacobian_det=${determinant.toFixed(8)}; local_rank=3`);
