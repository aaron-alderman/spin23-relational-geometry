import assert from 'node:assert/strict';

const rt3 = Math.sqrt(3);
const mm = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const tr = A => A[0].map((_, j) => A.map(row => row[j]));
const blockDiag = (A, B) => [
  ...A.map((row, i) => [...row, ...Array(B.length).fill(0)]),
  ...B.map(row => [...Array(A.length).fill(0), ...row]),
];
const approx = (A, B, eps = 1e-12) => A.every((r, i) => r.every((x, j) => Math.abs(x - B[i][j]) < eps));

const eps = [[0, 1], [-1, 0]];
const X = [[0, 1], [1, 0]];
const D = [[1, 0], [0, -1]];
const C = [[-1 / 2, -rt3 / 2], [rt3 / 2, -1 / 2]];
const minus = A => A.map(row => row.map(x => -x));

assert.ok(approx(mm(mm(tr(X), eps), X), minus(eps)));
assert.ok(approx(mm(mm(tr(D), eps), D), minus(eps)));
assert.ok(approx(mm(mm(tr(C), eps), C), eps));

// Complex-linear realification in (x1,x2,p1,p2) order.
const J0 = [
  [0, 0, 1, 0], [0, 0, 0, 1],
  [-1, 0, 0, 0], [0, -1, 0, 0],
];
for (const U of [X, D, C]) {
  const R = blockDiag(U, U);
  assert.ok(approx(mm(mm(tr(R), J0), R), J0));
}

// But the doubled C3 has no fixed real plane, unlike the typed selector R.
const doubledC = blockDiag(C, C);
const A = [[0, -1], [1, -1]];
const selectorR = blockDiag([[1, 0], [0, 1]], A);
const trace4 = M => M.reduce((s, row, i) => s + row[i], 0);
assert.ok(Math.abs(trace4(doubledC) + 2) < 1e-12);
assert.equal(trace4(selectorR), 1);

console.log(JSON.stringify({
  protocol: 'hchi-real-active-plane-versus-complex-two-mode-typing/1',
  realTwoPlane: {
    D: 'anti-symplectic',
    X: 'anti-symplectic',
    C3: 'symplectic and suitable for the active rank-two plane',
  },
  complexTwoModeRealification: {
    D: 'symplectic on four real quadratures',
    X: 'symplectic mode exchange',
    C3: 'symplectic but doubled, with no fixed real plane',
  },
  characterObstruction: {
    doubledCTrace: trace4(doubledC),
    typedSelectorRTrace: trace4(selectorR),
    implication: 'the doubled complex C3 is not conjugate to the fixed-plus-active selector generator',
  },
  disciplinedUse: 'Use h*chi as a boundary/local-coefficient twist that constructs the real active C3 plane; obtain the selector handle only after separately adjoining and sewing the neutral fixed plane.',
  passed: true,
}, null, 2));
