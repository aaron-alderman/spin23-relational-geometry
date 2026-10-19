import assert from "node:assert/strict";

const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const scale = (k, A) => A.map((row) => row.map((x) => k * x));
const mul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const tr = (A) => A[0][0] + A[1][1];
const pairing = (A, B) => tr(mul(A, B));
const det = (A) => A[0][0] * A[1][1] - A[0][1] * A[1][0];
const adj = (A) => [[A[1][1], -A[0][1]], [-A[1][0], A[0][0]]];
const eye = [[1, 0], [0, 1]];

const quartic = (A, C) => -2 * pairing(A, C) ** 2 + 8 * det(A) * det(C);

const triple = (A, C) => {
  const s = pairing(A, C);
  return [
    add(scale(-s, A), scale(2 * det(A), adj(C))),
    add(scale(s, C), scale(-2 * det(C), adj(A))),
  ];
};

const omega = ([A, C], [dA, dC]) => pairing(A, dC) - pairing(C, dA);
const close = (x, y, eps = 1e-7) => Math.abs(x - y) < eps;
const zero = (A, eps = 1e-9) => A.every((r) => r.every((x) => Math.abs(x) < eps));

// Source/response pairing is oriented.
const A = [[3, 1], [1, 2]];
const C = [[4, -1], [-1, 3]];
assert.equal(omega([A, [[0, 0], [0, 0]]], [[[0, 0], [0, 0]], C]), pairing(A, C));
assert.equal(omega([[[0, 0], [0, 0]], C], [A, [[0, 0], [0, 0]]]), -pairing(A, C));

// The cubic formula is the Hamiltonian vector of one quarter of dq.
const dA = [[2, -3], [-3, 1]];
const dC = [[-1, 2], [2, 5]];
const h = 1e-6;
const numerical = (quartic(add(A, scale(h, dA)), add(C, scale(h, dC))) - quartic(add(A, scale(-h, dA)), add(C, scale(-h, dC)))) / (2 * h) / 4;
assert.ok(close(omega(triple(A, C), [dA, dC]), numerical, 1e-5));

// Every inverse-matched positive pair is cubic-critical and quartic-null.
for (const P of [
  [[2, 0], [0, 5]],
  [[3, 1], [1, 2]],
  [[5, -2], [-2, 4]],
]) {
  const d = det(P);
  assert.ok(d > 0 && P[0][0] > 0);
  for (const lambda of [0.5, 1, 7]) {
    const R = scale(lambda / d, adj(P));
    const [TA, TC] = triple(P, R);
    assert.ok(zero(TA));
    assert.ok(zero(TC));
    assert.ok(close(quartic(P, R), 0));
    assert.ok(zero(add(mul(P, R), scale(-lambda, eye))));
  }
}

// A generic positive pair is neither null nor critical.
const G = [[2, 0.25], [0.25, 1.5]];
const [GA, GC] = triple(A, G);
assert.ok(!zero(GA) || !zero(GC));
assert.ok(quartic(A, G) < 0);

// Same-line link reversal changes both off-diagonal coefficients and leaves all invariants unchanged.
const flipLink = (M) => [[M[0][0], -M[0][1]], [-M[1][0], M[1][1]]];
assert.equal(pairing(flipLink(A), flipLink(C)), pairing(A, C));
assert.equal(quartic(flipLink(A), flipLink(C)), quartic(A, C));

console.log("PASS Freudenthal symplectic and triple restriction");
console.log("  source/response exchange reverses the symplectic sign");
console.log("  the cubic map is the Hamiltonian gradient of q/4");
console.log("  inverse-matched positive pairs are exactly the tested critical-null locus");
console.log("  simultaneous link reversal remains invisible");
