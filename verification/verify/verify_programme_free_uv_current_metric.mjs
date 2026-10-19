import assert from "node:assert/strict";

const lambda = [5, 5, 1, 1, 1, 0];
const q = [1, -1, -1, -3, 3, 3];
const d = [6, 3, 3, 2, 1, 1];
const dot = (x, y) => x.reduce((s, xi, i) => s + d[i] * xi * y[i], 0);
const close = (a, b, eps = 1e-12) => Math.abs(a - b) <= eps * (1 + Math.abs(a) + Math.abs(b));

const Gll = dot(lambda, lambda);
const Glq = dot(lambda, q);
const Gqq = dot(q, q);
const det = Gll * Gqq - Glq ** 2;
assert.equal(Gll, 231);
assert.equal(Glq, 9);
assert.equal(Gqq, 48);
assert.equal(det, 11007);

const shear = -Glq / Gqq;
assert.equal(shear, -3 / 16);
const lambdaPerp = lambda.map((x, i) => x + shear * q[i]);
assert(close(dot(lambdaPerp, q), 0));
assert(close(dot(lambdaPerp, lambdaPerp), 3669 / 16));

const generations = 3;
const diracSpectral = 1 / (12 * Math.PI ** 2);
const weylSpectral = diracSpectral / 2;
const coefficient = generations * weylSpectral;
assert(close(coefficient, 1 / (8 * Math.PI ** 2)));

const rho = [
  [coefficient * Gll, coefficient * Glq],
  [coefficient * Glq, coefficient * Gqq],
];
assert(rho[0][0] > 0 && rho[1][1] > 0);
assert(rho[0][0] * rho[1][1] - rho[0][1] ** 2 > 0);

console.log("PASS free UV current metric");
console.log(`G=[[${Gll},${Glq}],[${Glq},${Gqq}]]`);
console.log(`detG=${det}`);
console.log(`lambda_perp_norm2=${dot(lambdaPerp, lambdaPerp)}`);
console.log(`three_generation_prefactor=1/(8*pi^2)=${coefficient.toFixed(12)}`);
console.log("finite_contact_tensor=unfixed");
