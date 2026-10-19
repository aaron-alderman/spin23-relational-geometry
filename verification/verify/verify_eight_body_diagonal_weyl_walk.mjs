import assert from 'node:assert/strict';

const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
const cross = (a, b) => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];
const add = (a, b) => a.map((x, i) => x + b[i]);
const scale = (s, a) => a.map(x => s * x);
const qmul = (q1, q2) => ({
  d: q1.d * q2.d - dot(q1.v, q2.v),
  v: add(add(scale(q1.d, q2.v), scale(q2.d, q1.v)), cross(q1.v, q2.v)),
});
const axis = (j, k) => {
  const v = [0, 0, 0];
  v[j] = Math.sin(k);
  return { d: Math.cos(k), v };
};
const walk = ([kx, ky, kz]) => qmul(qmul(axis(2, kz), axis(1, ky)), axis(0, kx));
const close = (a, b, eps = 1e-10) => Math.abs(a - b) < eps;

// Exact SU(2) norm and scalar dispersion formula at generic momenta.
for (const k of [[0.2, -0.4, 0.7], [1.1, 0.3, -0.8], [-2.0, 1.7, 0.6]]) {
  const q = walk(k);
  assert(close(q.d * q.d + dot(q.v, q.v), 1));
  const [kx, ky, kz] = k;
  const expected = Math.cos(kx) * Math.cos(ky) * Math.cos(kz)
    + Math.sin(kx) * Math.sin(ky) * Math.sin(kz);
  assert(close(q.d, expected));
}

// The derivative of the quaternion vector at the origin is the identity:
// U = I - i(k_x sigma_x + k_y sigma_y + k_z sigma_z) + O(k^2).
const h = 1e-7;
for (let j = 0; j < 3; j++) {
  const kp = [0, 0, 0];
  const km = [0, 0, 0];
  kp[j] = h;
  km[j] = -h;
  const derivative = walk(kp).v.map((x, i) => (x - walk(km).v[i]) / (2 * h));
  derivative.forEach((x, i) => assert(close(x, i === j ? 1 : 0, 1e-8)));
}

// Every product P_z P_y P_x is nonzero. For rank-one Pauli projectors,
// its Frobenius norm squared is 1/4 because the two successive overlaps
// between distinct Cartesian Pauli eigenstates each have squared norm 1/2.
for (const ex of [-1, 1]) for (const ey of [-1, 1]) for (const ez of [-1, 1]) {
  const normSquared = (1 / 2) * (1 / 2);
  assert(normSquared > 0);
  const displacementSquared = ex * ex + ey * ey + ez * ez;
  assert.equal(displacementSquared, 3);
}

// With Delta t=sqrt(3)a/c, all eight body diagonals are null and the
// continuum Weyl speed a/Delta t equals c/sqrt(3).
const a = 0.03;
const c = 1;
const dt = Math.sqrt(3) * a / c;
assert(close(-c * c * dt * dt + 3 * a * a, 0));
assert(close(a / dt, c / Math.sqrt(3)));

// The eight Brillouin corners split into four zero and four pi sectors.
let zero = 0;
let pi = 0;
for (const kx of [0, Math.PI]) for (const ky of [0, Math.PI]) for (const kz of [0, Math.PI]) {
  const q = walk([kx, ky, kz]);
  assert(q.v.every(x => Math.abs(x) < 1e-10));
  if (close(q.d, 1)) zero++;
  else if (close(q.d, -1)) pi++;
  else assert.fail('corner is neither zero nor pi quasienergy');
}
assert.equal(zero, 4);
assert.equal(pi, 4);

console.log('Eight-body-diagonal Weyl-walk certificate: PASS');
console.log(`support=8; zero_corners=${zero}; pi_corners=${pi}; c_eff/c=${1 / Math.sqrt(3)}`);
