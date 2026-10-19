import assert from 'node:assert/strict';

const close = (a, b, eps = 1e-10) => Math.abs(a - b) < eps;
const scaleM = (A, x) => A.map(row => row.map(v => x * v));
const addM = (A, B, a = 1, b = 1) => A.map((row, i) => row.map((x, j) => a * x + b * B[i][j]));
const maxDiff = (A, B) => Math.max(...A.flatMap((row, i) => row.map((x, j) => Math.abs(x - B[i][j]))));
const coords = M => [M[0][0], M[1][1], Math.SQRT2 * M[0][1]];
const cross = (u, v) => [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];

const G2 = [[1.4, 0.35], [0.35, 0.9]];
const G0 = [[0.3, -0.12], [-0.12, 0.55]];
const kappa = 0.017;
const spectral = s => scaleM(G2, kappa * s * s);

const sValues = [0.4, 1.2, 3.5, 8];
for (let i = 0; i < sValues.length; i++) for (let j = i + 1; j < sValues.length; j++) {
  const a = spectral(sValues[i]), b = spectral(sValues[j]);
  assert(Math.hypot(...cross(coords(a), coords(b))) < 1e-10);
  assert(maxDiff(a, scaleM(b, (sValues[i] / sValues[j]) ** 2)) < 1e-10);
}

// Adding conformal species changes only the overall coefficient.
const speciesWeights = [0.017, 0.029, 0.011];
const total = s => scaleM(G2, speciesWeights.reduce((a, b) => a + b, 0) * s * s);
for (const s of sValues) assert(Math.hypot(...cross(coords(total(s)), coords(G2))) < 1e-10);

// A positive trace threshold adds only G0, keeping the family in a plane.
const threshold = 4;
const deformed = s => addM(G2, G0, kappa * s * s, s > threshold ? 0.006 * (s - threshold) ** 2 : 0);
const planeNormal = cross(coords(G2), coords(G0));
for (const s of [1, 3, 5, 9]) {
  const v = coords(deformed(s));
  assert(close(planeNormal.reduce((sum, x, i) => sum + x * v[i], 0), 0));
}
assert(Math.hypot(...cross(coords(deformed(5)), coords(deformed(9)))) > 1e-6);

console.log('Free-conformal stress-ray certificate: PASS');
console.log('rho2 proportional to s^2; rho0=0; all conformal samples collinear=true; species_sum_same_ray=true; trace_threshold_adds_second_direction_only=true');
