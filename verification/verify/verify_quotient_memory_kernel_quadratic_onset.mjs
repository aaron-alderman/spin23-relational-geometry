import assert from "node:assert/strict";

const near = (a, b, tol = 1e-9) => assert.ok(Math.abs(a - b) < tol, `${a} != ${b}`);

// One visible and one hidden coordinate:
// v' = a v + eps b h, h' = eps c v + d h.
// Exact hidden elimination gives K(t)=eps^2 b c exp(d t).
const a = -4;
const b = 2;
const c = -3;
const d = -1;
const kernel = (eps, t) => eps * eps * b * c * Math.exp(d * t);

for (const t of [0, 0.2, 1, 3]) {
  near(kernel(0, t), 0);
  near(kernel(0.1, t) / kernel(0.05, t), 4);
  near(kernel(-0.1, t), kernel(0.1, t));
}

// The first derivative at the symmetric point vanishes; the second does not.
for (const t of [0, 0.5, 2]) {
  const h = 1e-5;
  const first = (kernel(h, t) - kernel(-h, t)) / (2 * h);
  const second = (kernel(h, t) - 2 * kernel(0, t) + kernel(-h, t)) / (h * h);
  near(first, 0, 1e-12);
  near(second, 2 * b * c * Math.exp(d * t), 1e-5);
}

// Exact lumpability is invariance of the detector kernel.  For the D4 star,
// both hidden outer differences remain in ker(Q) under L.
const L = [
  [-3, 1, 1, 1],
  [1, -1, 0, 0],
  [1, 0, -1, 0],
  [1, 0, 0, -1],
];
const hidden = [[0, 1, -1, 0], [0, 1, 0, -1]];
const mv = (M, x) => M.map(row => row.reduce((s, y, i) => s + y * x[i], 0));
const Q = x => [x[0], x[1] + x[2] + x[3]];
for (const h of hidden) {
  assert.deepEqual(Q(h), [0, 0]);
  assert.deepEqual(Q(mv(L, h)), [0, 0]);
}

console.log("Quotient memory-kernel certificate: PASS");
console.log("K(t)=A_vh exp(A_hh t) A_hv; weak_bidirectional_coupling_gives_K=O(epsilon^2)");
console.log("exact_lumpability=kernel_of_detector_invariant_under_generator");
