import assert from 'node:assert/strict';

const I = n => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => Number(i === j)));
const zero = (m, n = m) => Array.from({ length: m }, () => Array(n).fill(0));
const mm = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const scale = (a, A) => A.map(row => row.map(x => a * x));
const eq = (A, B, eps = 1e-10) => A.every((row, i) => row.every((x, j) => Math.abs(x - B[i][j]) < eps));
const pow = (A, n) => { let X = I(A.length); for (let i = 0; i < n; i++) X = mm(X, A); return X; };
const frob = (A, B) => A.flat().reduce((sum, x, i) => sum + x * B.flat()[i], 0);
const gram = vectors => vectors.map(u => vectors.map(v => u.reduce((sum, x, i) => sum + x * v[i], 0)));
const rt3 = Math.sqrt(3);
const LK3 = [[2, -1, -1], [-1, 2, -1], [-1, -1, 2]];

const edges = [[1, -1, 0], [0, 1, -1], [-1, 0, 1]];
const roots = [[1, rt3], [-2, 0], [1, -rt3]];
assert.ok(eq(gram(edges), LK3));
assert.ok(eq(gram(roots), scale(2, LK3)));
assert.ok(roots.reduce((u, v) => u.map((x, i) => x + v[i])).every(x => Math.abs(x) < 1e-12));

// Reconstruct the whitened handle triangle from document 879.
const R = [[1, 0, 0, 0], [0, 0, 0, -1], [0, 0, 1, 0], [0, 1, 0, -1]];
const H = [[0, 1, 0, 0], [1, 0, 0, 0], [0, 0, 0, 1], [0, 0, 1, 0]];
const R2 = pow(R, 2);
const handles = [H, mm(mm(R, H), R2), mm(mm(R2, H), R)];
const rs = Math.sqrt(2 / 3), rl = Math.sqrt(2), d = (rs + rl) / 2, o = (rs - rl) / 2;
const L = zero(4), Li = zero(4);
const is = (1 / rs + 1 / rl) / 2, io = (1 / rs - 1 / rl) / 2;
for (const [a, b] of [[0, 2], [1, 3]]) {
  L[a][a] = L[b][b] = d; L[a][b] = L[b][a] = o;
  Li[a][a] = Li[b][b] = is; Li[a][b] = Li[b][a] = io;
}
const O = handles.map(K => mm(mm(L, K), Li));
const handleGram = O.map(A => O.map(B => frob(A, B)));
assert.ok(eq(handleGram, scale(2, LK3)));
assert.ok(eq(O.reduce(add, zero(4)), zero(4)));

// Label cycling is common to all three frames.
const C = [[-1 / 2, -rt3 / 2], [rt3 / 2, -1 / 2]];
const mv = (A, v) => A.map(row => row.reduce((s, x, j) => s + x * v[j], 0));
for (let i = 0; i < 3; i++) {
  const next = mv(C, roots[i]);
  assert.ok(next.every((x, j) => Math.abs(x - roots[(i + 1) % 3][j]) < 1e-10));
}
const Rw = mm(mm(L, R), Li), RwInv = pow(Rw, 2);
for (let i = 0; i < 3; i++) assert.ok(eq(mm(mm(Rw, O[i]), RwInv), O[(i + 1) % 3]));

console.log(JSON.stringify({
  protocol: 'three-way-a2-frame-intertwiner/1',
  multiplicityEdges: { vectors: edges, gram: LK3 },
  mediatorRootOrbit: { vectors: roots, gram: scale(2, LK3), zeroSum: true },
  whitenedHandleOperators: { gram: handleGram, zeroSum: true },
  exactAssignments: ['edge_i -> root_i/sqrt(2)', 'root_i -> O_i', 'edge_i -> O_i/sqrt(2)'],
  cyclicEquivariance: { mediatorC3: true, handleConjugationC3: true, commonLabelCycle: true },
  tightFrameConsequence: 'the equal-weight mediator projector sum and the handle class-sum isotropy are the same abstract A2 frame identity',
  typingBoundary: 'matter-edge permutation, mediator boundary monodromy, and handle conjugation are distinct physical actions until a response-level intertwiner identifies them',
  passed: true,
}, null, 2));
