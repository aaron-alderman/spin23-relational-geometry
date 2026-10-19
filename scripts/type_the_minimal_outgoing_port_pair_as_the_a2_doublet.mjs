import assert from 'node:assert/strict';

const s3 = Math.sqrt(3);
const I = [[1, 0], [0, 1]];
const C = [[-0.5, -s3 / 2], [s3 / 2, -0.5]];
const F = [[1, 0], [0, -1]];
const transpose = A => A[0].map((_, j) => A.map(row => row[j]));
const multiply = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((sum, value, k) => sum + value * B[k][j], 0)));
const add = (A, B) => A.map((row, i) => row.map((value, j) => value + B[i][j]));
const scale = (x, A) => A.map(row => row.map(value => x * value));
const close = (A, B, tolerance = 1e-11) => A.every((row, i) => row.every((value, j) => Math.abs(value - B[i][j]) < tolerance));
const power = (A, n) => { let result = I; for (let k = 0; k < n; k += 1) result = multiply(result, A); return result; };

assert.ok(close(power(C, 3), I));
assert.ok(close(power(F, 2), I));
assert.ok(close(multiply(multiply(F, C), F), transpose(C)));

const betaNormal = 0.37;
const betaTangent = 1.61;
const G0 = [[Math.sqrt(betaNormal), 0], [0, Math.sqrt(betaTangent)]];
const B0 = multiply(G0, transpose(G0));
assert.ok(close(multiply(multiply(F, G0), F), G0));

const couplings = [];
const densities = [];
const reflections = [];
for (let k = 0; k < 3; k += 1) {
  const R = power(C, k);
  const RT = transpose(R);
  const G = multiply(multiply(R, G0), RT);
  const B = multiply(G, transpose(G));
  const faceReflection = multiply(multiply(R, F), RT);
  couplings.push(G);
  densities.push(B);
  reflections.push(faceReflection);
  assert.ok(close(multiply(multiply(faceReflection, G), faceReflection), G));
}

assert.ok(close(multiply(multiply(C, densities[0]), transpose(C)), densities[1]));
assert.ok(close(multiply(multiply(C, densities[1]), transpose(C)), densities[2]));
assert.ok(close(multiply(multiply(C, densities[2]), transpose(C)), densities[0]));

const densitySum = densities.reduce(add, [[0, 0], [0, 0]]);
const isotropicTarget = scale(1.5 * (betaNormal + betaTangent), I);
assert.ok(close(densitySum, isotropicTarget));

const mean = scale((betaNormal + betaTangent) / 2, I);
const anisotropies = densities.map(B => add(B, scale(-1, mean)));
assert.ok(close(anisotropies.reduce(add, [[0, 0], [0, 0]]), [[0, 0], [0, 0]]));

// The reducible 1+sign representation has trivial C3 and cannot generate three faces.
const trivialCycleOrbit = [B0, B0, B0];
assert.ok(close(trivialCycleOrbit[0], trivialCycleOrbit[1]));
assert.ok(!close(densities[0], densities[1]));

console.log(JSON.stringify({
  protocol: 'minimal-outgoing-a2-port-typing/1',
  representation: 'C^3=F^2=I and FCF=C^-1: the real A2 standard doublet',
  faceCoupling: 'G0=sqrt(beta_n)P_+ + sqrt(beta_t)P_-',
  covariance: 'G_k=C^k G0 C^-k and B_k=G_k G_k^T',
  orbitSum: 'sum_k B_k = (3/2)(beta_n+beta_t) I',
  anisotropyCancellation: 'sum_k [B_k-(tr B0/2)I]=0',
  uniquenessBoundary: 'Among two-dimensional real S3 representations, nontrivial C3 transport excludes 1+sign and selects the irreducible A2 representation up to equivalence.',
  interpretation: 'The minimal two-port loss space can be typed canonically as A2 once the three-face C3 orbit and reflection covariance are required; this is representation typing, not particle identity.',
  passed: true
}, null, 2));
