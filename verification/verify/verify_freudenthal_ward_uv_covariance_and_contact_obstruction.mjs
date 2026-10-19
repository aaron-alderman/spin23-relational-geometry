import assert from "node:assert/strict";

const mul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const transpose = (A) => A[0].map((_, j) => A.map((r) => r[j]));
const add = (A, B) => A.map((r, i) => r.map((x, j) => x + B[i][j]));
const scale = (k, A) => A.map((r) => r.map((x) => k * x));
const det = (A) => A[0][0] * A[1][1] - A[0][1] * A[1][0];
const adj = (A) => [[A[1][1], -A[0][1]], [-A[1][0], A[0][0]]];
const inv = (A) => scale(1 / det(A), adj(A));
const tr = (A) => A[0][0] + A[1][1];
const pair = (A, C) => tr(mul(A, C));
const congruence = (G, A) => mul(mul(G, A), transpose(G));
const quartic = (A, C) => -2 * pair(A, C) ** 2 + 8 * det(A) * det(C);
const norm = (A) => Math.sqrt(A.flat().reduce((s, x) => s + x * x, 0));
const close = (A, B, eps = 1e-9) => norm(add(A, scale(-1, B))) < eps;

const A = [[3, 1], [1, 2]];
const C = scale(5, inv(A));
const G = [[2, 1], [-1, 3]];

// The natural dual action preserves trace, quartic and inverse matching.
const Ap = congruence(G, A);
const Gi = inv(G);
const Cp = congruence(transpose(Gi), C);
assert.ok(Math.abs(pair(Ap, Cp) - pair(A, C)) < 1e-9);
assert.ok(Math.abs(quartic(Ap, Cp) - quartic(A, C)) < 1e-9);
assert.ok(close(Cp, scale(5, inv(Ap))));

// Applying the same generic congruence to both slots breaks inverse matching and nullity.
const Csame = congruence(G, C);
const candidateScale = pair(Ap, Csame) / 2;
assert.ok(!close(Csame, scale(candidateScale, inv(Ap)), 1e-7));
assert.ok(Math.abs(quartic(Ap, Csame)) > 1e-7);

// A conformal-orthogonal same-congruence transformation preserves the inverse ray.
const R = [[0, -2], [2, 0]];
const Ar = congruence(R, A);
const Cr = congruence(R, C);
assert.ok(close(Cr, scale(80, inv(Ar))));
assert.ok(Math.abs(quartic(Ar, Cr)) < 1e-8);

// A generic contact shift destroys the critical-null relation.
const Q = [[1, 0.2], [0.2, -0.3]];
const Cq = add(C, Q);
assert.ok(Math.abs(quartic(A, Cq)) > 1e-7);
const rayScale = pair(A, Cq) / 2;
assert.ok(!close(Cq, scale(rayScale, inv(A)), 1e-7));

// A shift along the same inverse ray is the exceptional fine-tuned survivor.
const Qray = scale(2, inv(A));
const Cray = add(C, Qray);
assert.ok(close(Cray, scale(7, inv(A))));
assert.ok(Math.abs(quartic(A, Cray)) < 1e-8);

console.log("PASS Freudenthal Ward/UV covariance and contact obstruction");
console.log("  dual congruence preserves the paired invariant and inverse ray");
console.log("  same generic response congruence does not");
console.log("  conformal-orthogonal same congruence is the universal survivor");
console.log("  fixed contact translations generically leave the critical-null locus");
