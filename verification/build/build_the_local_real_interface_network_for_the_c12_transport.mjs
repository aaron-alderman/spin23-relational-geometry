import assert from 'node:assert/strict';

const mm = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
const mv = (A, v) => A.map((r) => r.reduce((s, x, j) => s + x * v[j], 0));
const transpose = (A) => A[0].map((_, j) => A.map((r) => r[j]));
const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
const eye = (n) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => +(i === j)));
const scale = (s, A) => A.map((r) => r.map((x) => s * x));
const eq = (A, B) => A.every((r, i) => r.every((x, j) => x === B[i][j]));
const pow = (A, n) => { let R = eye(A.length); for (let i = 0; i < n; i++) R = mm(R, A); return R; };

const D = [[1, 0], [0, -1]];
const X = [[0, 1], [1, 0]];
const eps = mm(D, X);
const I = eye(2);
assert.ok(eq(eps, [[0, 1], [-1, 0]]));
assert.ok(eq(mm(transpose(eps), eps), I));
assert.ok(eq(pow(eps, 2), scale(-1, I)));
assert.ok(eq(pow(eps, 6), scale(-1, I)));
assert.ok(eq(pow(eps, 12), I));

// Local variational and flux checks for q_next=eps q and p_next=eps p.
const q = [0.4, -0.7], p = [1.2, 0.3], dq = [-0.2, 0.9], qdot = [0.8, -1.1];
const qn = mv(eps, q), pn = mv(eps, p), dqn = mv(eps, dq), qdotn = mv(eps, qdot);
assert.ok(Math.abs(-dot(p, dq) + dot(pn, dqn)) < 1e-12);
assert.ok(Math.abs(dot(pn, qdotn) - dot(p, qdot)) < 1e-12);

// Placement/sheet orbit and accumulated local matrix.
const orbit = [];
let i = 0, s = 0, accumulated = I;
for (let n = 0; n < 12; n++) {
  orbit.push({ n, placement: i, sheet: s });
  i = (i + 1) % 3;
  s ^= 1;
  accumulated = mm(eps, accumulated);
  if (n === 2) assert.ok(eq(accumulated, scale(-1, eps)));
  if (n === 5) assert.ok(eq(accumulated, scale(-1, I)));
}
assert.ok(eq(accumulated, I));

console.log(JSON.stringify({
  protocol: 'local-real-interface-network-for-c12-transport/1',
  localMatching: { matrix: 'epsilon=D X', configuration: 'q_next=epsilon q', momentum: 'p_next=epsilon p', orthogonal: true, variational: true, fluxPreserved: true },
  fourierSewing: 'for real q, q_next(-omega)=epsilon conjugate(q(+omega))=Gamma q(+omega)',
  powers: { epsilon2: '-I', epsilon3: '-epsilon', epsilon6: '-I', epsilon12: 'I' },
  orbit,
  bundleInterpretation: 'The six-cycle has anti-periodic central holonomy -I; the twelve-step cover is periodic.',
  theorem: 'A chain of local conservative real interfaces with matching epsilon=DX realizes one Gamma edge per placement step and the exact C12->C6->C3 transport at effective-field level.',
  boundary: 'This is boundary sewing on a twisted real-response bundle, not a deterministic complex-linear unitary implementation of conjugation. Microscopic derivation of the real fields and epsilon interface remains open.',
  passed: true,
}, null, 2));
