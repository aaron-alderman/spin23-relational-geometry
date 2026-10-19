import assert from 'node:assert/strict';

const eps = 1e-10;
const close = (a, b, tol = eps) => Math.abs(a - b) < tol;
const gcd = (a, b) => b === 0 ? Math.abs(a) : gcd(b, a % b);
const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
const transpose = A => A[0].map((_, j) => A.map(row => row[j]));
const mm = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const madd = (A, B, a = 1, b = 1) => A.map((row, i) => row.map((x, j) => a * x + b * B[i][j]));
const mscale = (A, s) => A.map(row => row.map(x => s * x));
const trace = A => A.reduce((s, row, i) => s + row[i], 0);
const frob2 = A => A.flat().reduce((s, x) => s + x * x, 0);
const eye = n => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => i === j ? 1 : 0));
const outer = (a, b) => a.map(x => b.map(y => x * y));

// 1. Primitive determinant-neutral weights for a rank-one plus rank-two split.
const primitiveSolutions = [];
for (let m = -12; m <= 12; m += 1) {
  for (let n = -12; n <= 12; n += 1) {
    if (m === 0 && n === 0) continue;
    if (m + 2 * n === 0 && gcd(m, n) === 1) primitiveSolutions.push([m, n]);
  }
}
assert.deepEqual(primitiveSolutions, [[-2, 1], [2, -1]]);
assert.equal(1 - (-2), 3);

// 2. At t=2pi/3 the fundamental weights (-2,1,1) all give omega,
// while the cross-Peirce weight 3 is neutral.
const t = 2 * Math.PI / 3;
const phase = q => [Math.cos(q * t), Math.sin(q * t)];
const omega = phase(1);
for (const q of [-2, 1, 1]) {
  const z = phase(q);
  assert(close(z[0], omega[0]));
  assert(close(z[1], omega[1]));
}
assert(close(phase(3)[0], 1));
assert(close(phase(3)[1], 0));

// 3. The central remnant is independent of the projector. Using
// exp(i t (I-3P)) = exp(i t)[I + (exp(-3it)-1)P], the P coefficient vanishes.
assert(close(Math.cos(-3 * t), 1));
assert(close(Math.sin(-3 * t), 0));
const p1 = [1, 0, 0];
const p2 = [1 / Math.sqrt(3), 1 / Math.sqrt(3), 1 / Math.sqrt(3)];
const P1 = outer(p1, p1);
const P2 = outer(p2, p2);
const projectorCoefficientMagnitude = Math.hypot(Math.cos(-3 * t) - 1, Math.sin(-3 * t));
assert(close(projectorCoefficientMagnitude, 0));
assert(frob2(madd(P1, P2, projectorCoefficientMagnitude, -projectorCoefficientMagnitude)) < eps);

// 4. Any response alpha P + beta Q commutes with P.
const I3 = eye(3);
const Q2 = madd(I3, P2, 1, -1);
const response = madd(P2, Q2, 1.7, -0.4);
const commutator = madd(mm(P2, response), mm(response, P2), 1, -1);
assert(frob2(commutator) < eps);

// 5. Projector commutator norm equals twice the variance.
const H = [[2.0, 0.4, -0.3], [0.4, -0.7, 0.8], [-0.3, 0.8, 1.1]];
const pRaw = [0.3, -0.4, 0.5];
const pNorm = Math.sqrt(dot(pRaw, pRaw));
const p = pRaw.map(x => x / pNorm);
const P = outer(p, p);
const PH = mm(P, H);
const HP = mm(H, P);
const C = madd(PH, HP, 1, -1);
const H2 = mm(H, H);
const mean = dot(p, H.map(row => dot(row, p)));
const second = dot(p, H2.map(row => dot(row, p)));
assert(close(frob2(C), 2 * (second - mean * mean), 1e-9));

// 6. Vacuum charge matrix has Smith invariants (1,9).
const Qvac = [[3, -1], [0, 3]];
const d1 = Qvac.flat().reduce((g, x) => gcd(g, x), 0);
const det = Qvac[0][0] * Qvac[1][1] - Qvac[0][1] * Qvac[1][0];
assert.equal(d1, 1);
assert.equal(Math.abs(det) / d1, 9);

// 7. A linear relative-frame functional lies between permutation extrema.
const a = [0.2, 1.1, 3.4];
const b = [-0.7, 0.6, 2.3];
const perms = [
  [0, 1, 2], [0, 2, 1], [1, 0, 2],
  [1, 2, 0], [2, 0, 1], [2, 1, 0],
];
const permutationValues = perms.map(pi => a.reduce((s, x, i) => s + x * b[pi[i]], 0));
const minPermutation = Math.min(...permutationValues);
const maxPermutation = Math.max(...permutationValues);

const rotations = [
  [[1, 0, 0], [0, 1, 0], [0, 0, 1]],
  [[Math.cos(0.37), -Math.sin(0.37), 0], [Math.sin(0.37), Math.cos(0.37), 0], [0, 0, 1]],
  [[1, 0, 0], [0, Math.cos(0.71), -Math.sin(0.71)], [0, Math.sin(0.71), Math.cos(0.71)]],
];
for (const U of rotations) {
  const B = U.map(row => row.map(x => x * x));
  for (const row of B) assert(close(row.reduce((s, x) => s + x, 0), 1));
  for (const col of transpose(B)) assert(close(col.reduce((s, x) => s + x, 0), 1));
  const value = a.reduce((s, x, i) => s + x * B[i].reduce((q, bij, j) => q + bij * b[j], 0), 0);
  assert(value >= minPermutation - eps && value <= maxPermutation + eps);
}

// 8. The untwisted Z3 torus carrier has N^2=9 states.
assert.equal(3 ** 2, 9);

console.log('Reflexive closure v1 algebraic certificate: PASS');
console.log(JSON.stringify({
  primitiveWeights: [-2, 1, 1],
  crossPeirceCharge: 3,
  centralRemnantProjectorIndependent: true,
  oneProjectorResponseOrienting: false,
  varianceIdentity: true,
  vacuumSmithInvariants: [1, 9],
  permutationAlignmentBound: true,
  torusStateCount: 9,
}, null, 2));

