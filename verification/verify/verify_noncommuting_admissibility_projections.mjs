import assert from 'node:assert/strict';

const near = (a, b, tol = 1e-10) => assert.ok(Math.abs(a - b) < tol, String(a) + ' != ' + String(b));
const mul = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const mv = (A, x) => A.map(row => row.reduce((s, y, i) => s + y * x[i], 0));
const sub = (A, B) => A.map((row, i) => row.map((x, j) => x - B[i][j]));
const transpose = A => A[0].map((_, j) => A.map(row => row[j]));
const norm = x => Math.sqrt(x.reduce((s, y) => s + y * y, 0));
const frob = A => Math.sqrt(A.flat().reduce((s, x) => s + x * x, 0));
const eye = n => Array.from({length: n}, (_, i) => Array.from({length: n}, (_, j) => Number(i === j)));
const outer = x => x.map(a => x.map(b => a * b));
const projectorOntoNormalComplement = n => sub(eye(n.length), outer(n));

// Two planes in R3 share the x-axis. Their transverse normals are separated
// so that the Friedrichs angle between the planes is theta.
const theta = Math.PI / 3;
const nP = [0, 0, 1];
const nQ = [0, Math.sin(theta), Math.cos(theta)];
const P = projectorOntoNormalComplement(nP);
const Q = projectorOntoNormalComplement(nQ);

// Orthogonal projectors are symmetric idempotents.
for (const R of [P, Q]) {
  const RR = mul(R, R);
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) near(RR[i][j], R[i][j]);
  assert.deepEqual(R, transpose(R));
}

// The common x-axis is fixed by both.
const common = [1, 0, 0];
assert.deepEqual(mv(P, common), common);
assert.deepEqual(mv(Q, common), common);

// Order dependence is measured by the commutator.
const commutator = sub(mul(P, Q), mul(Q, P));
near(frob(commutator), Math.sqrt(2) * Math.abs(Math.sin(theta) * Math.cos(theta)));
assert.ok(frob(commutator) > 0);

// Alternating projections contract the non-common component by cos^2(theta)
// per full QP cycle when sampled back in range(P).
let x = [0, 1, 0];
const factor = Math.cos(theta) ** 2;
for (let step = 1; step <= 6; step++) {
  x = mv(P, mv(Q, x));
  near(norm(x), factor ** step);
}

// Transverse constraints isolate a one-dimensional intersection in R3.
// Repeating the same plane leaves a two-dimensional fixed manifold instead.
const trace = A => A.reduce((s, row, i) => s + row[i], 0);
near(trace(P), 2);
const alternating = mul(P, Q);
// Fixed-space dimension is one here: eigenvalue-one direction is the x-axis.
assert.deepEqual(mv(alternating, common), common);
assert.ok(norm(mv(alternating, [0, 1, 0])) < 1);
assert.deepEqual(mv(P, [0, 1, 0]), [0, 1, 0]);

console.log('Noncommuting admissibility projections certificate: PASS');
console.log('shared_fixed_space_dimension=1; repeated_single_constraint_fixed_dimension=2');
console.log('alternating_contraction=cos(theta)^2; commutator_norm=sqrt(2)|sin(theta)cos(theta)|');
console.log('order_dependence_is_transient_for_fixed_orthogonal_subspaces_but_can_seed_holonomy_in_parameter_families');
