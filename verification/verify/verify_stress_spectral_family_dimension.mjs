import assert from 'node:assert/strict';

const close = (a, b, eps = 1e-10) => Math.abs(a - b) < eps;
const addM = (A, B, a = 1, b = 1) => A.map((row, i) => row.map((x, j) => a * x + b * B[i][j]));
const det2 = A => A[0][0] * A[1][1] - A[0][1] ** 2;
const coords = M => [M[0][0], M[1][1], Math.SQRT2 * M[0][1]];
const dot = (u, v) => u.reduce((s, x, i) => s + x * v[i], 0);
const cross = (u, v) => [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
const T = A => A[0].map((_, j) => A.map(row => row[j]));
const mm = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));

const G2 = [[1.4, 0.35], [0.35, 0.9]];
const G0 = [[0.3, -0.12], [-0.12, 0.55]];
assert(det2(G2) > 0 && det2(G0) > 0);
const normal = cross(coords(G2), coords(G0));
assert(Math.hypot(...normal) > 1e-6);

const samples = [
  addM(G2, G0, 0.5, 1.2),
  addM(G2, G0, 1.7, 0.2),
  addM(G2, G0, 2.1, 0.9),
];
for (const R of samples) {
  assert(close(dot(normal, coords(R)), 0));
  assert(R[0][0] > 0 && det2(R) > 0);
}

// Conformal samples are all collinear with G2.
for (const rho2 of [0.2, 1.1, 4.3]) {
  const R = addM(G2, G0, rho2, 0);
  const v = coords(R), g = coords(G2);
  assert(Math.hypot(...cross(v, g)) < 1e-10);
}

// A generic cone congruence does not preserve the physical plane.
const Q = [[1.1, 0.4], [-0.2, 0.9]];
const transformed = mm(mm(Q, samples[0]), T(Q));
assert(Math.abs(dot(normal, coords(transformed))) > 1e-4);

// A third independent response structure fills H2(R) linearly.
const Gx = [[0.8, 0.41], [0.41, 1.2]];
const volume = dot(normal, coords(Gx));
assert(Math.abs(volume) > 1e-4);

console.log('Stress spectral-family dimension certificate: PASS');
console.log(`plane_normal=${JSON.stringify(normal)}; samples_in_plane=true; conformal_ray=true; generic_congruence_leaves_plane=true; third_direction_volume=${volume}`);
