import assert from 'node:assert/strict';

const mm = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const tr = A => A[0].map((_, j) => A.map(row => row[j]));
const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const scale = (a, A) => A.map(row => row.map(x => a * x));
const block = (A, B, C, D) => A.map((row, i) => [...row, ...B[i]]).concat(C.map((row, i) => [...row, ...D[i]]));
const zero = (m, n) => Array.from({ length: m }, () => Array(n).fill(0));
const I = n => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => Number(i === j)));
const eq = (A, B, eps = 1e-10) => A.every((row, i) => row.every((x, j) => Math.abs(x - B[i][j]) < eps));
const inverse = A => {
  const n = A.length, M = A.map((row, i) => [...row, ...I(n)[i]]);
  for (let c = 0; c < n; c++) {
    let p = c; while (p < n && Math.abs(M[p][c]) < 1e-12) p++;
    assert.ok(p < n); [M[c], M[p]] = [M[p], M[c]];
    const d = M[c][c]; M[c] = M[c].map(x => x / d);
    for (let i = 0; i < n; i++) if (i !== c) {
      const f = M[i][c]; M[i] = M[i].map((x, j) => x - f * M[c][j]);
    }
  }
  return M.map(row => row.slice(n));
};
const rank = A => {
  const M = A.map(row => row.slice()); let r = 0;
  for (let c = 0; c < M[0].length && r < M.length; c++) {
    let p = r; while (p < M.length && Math.abs(M[p][c]) < 1e-10) p++;
    if (p === M.length) continue;
    [M[r], M[p]] = [M[p], M[r]];
    const d = M[r][c]; M[r] = M[r].map(x => x / d);
    for (let i = 0; i < M.length; i++) if (i !== r) {
      const f = M[i][c]; M[i] = M[i].map((x, j) => x - f * M[r][j]);
    }
    r++;
  }
  return r;
};

const eps = [[0, 1], [-1, 0]];
const J = block(eps, zero(2, 2), zero(2, 2), scale(-1, eps));
const A = [[1, 3], [-1, -2]], X = [[1, 1], [0, -1]];
const R = block(I(2), zero(2, 2), zero(2, 2), A);
const H = block(zero(2, 2), X, X, zero(2, 2));
const G0 = [[2, -1, 0, 0], [-1, 2, 0, 0], [0, 0, 2, 3], [0, 0, 3, 6]];
const C0 = scale(3, mm(inverse(G0), J));
const C = scale(1 / Math.sqrt(3), C0);
assert.ok(eq(mm(C0, C0), scale(-3, I(4))));
assert.ok(eq(mm(C, C), scale(-1, I(4))));
assert.ok(eq(mm(C, R), mm(R, C)));
assert.ok(eq(mm(C, H), mm(H, C)));
assert.ok(eq(mm(mm(tr(C), J), C), J));

// Dimension of the full real centralizer.
const basis = [];
for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) {
  const E = zero(4, 4); E[i][j] = 1; basis.push(E);
}
const equations = [];
for (const S of [R, H]) for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) {
  equations.push(basis.map(E => mm(E, S)[i][j] - mm(S, E)[i][j]));
}
const constraintRank = rank(equations);
assert.equal(16 - constraintRank, 2);

// The independent commuting matrices I and C span that two-space.
assert.equal(rank([I(4).flat(), C.flat()]), 2);

for (const [a, b] of [[1, 0], [0, 1], [0.6, 0.8], [1.2, -0.4]]) {
  const M = add(scale(a, I(4)), scale(b, C));
  assert.ok(eq(mm(mm(tr(M), J), M), scale(a * a + b * b, J)));
}

console.log(JSON.stringify({
  protocol: 'full-selector-centralizer-and-symplectic-centralizer/1',
  realCentralizer: {
    dimension: 2,
    basis: ['I', 'C'],
    relation: 'C^2 = -I',
    algebra: 'isomorphic to complex numbers',
  },
  integralGenerator: { C0, relation: 'C0^2 = -3 I' },
  symplecticCentralizer: {
    general: 'M = a I + b C',
    pullback: 'M^T J M = (a^2+b^2) J',
    condition: 'a^2+b^2=1',
    group: 'U(1)',
  },
  consequence: 'The selector canonically determines one complex structure, but its commuting continuous dynamics is only a circle. Full Sp(4,R) is the automorphism group of J, not the centralizer of the finite selector.',
  passed: true,
}, null, 2));
