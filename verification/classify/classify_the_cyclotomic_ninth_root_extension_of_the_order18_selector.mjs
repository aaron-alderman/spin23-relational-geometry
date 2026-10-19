import assert from 'node:assert/strict';

const I2 = [[1, 0], [0, 1]];
const C = [[1, 3], [-1, -2]];
const X = [[1, 1], [0, -1]];
const eps = [[0, 1], [-1, 0]];
const mul = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const scale = (a, A) => A.map(row => row.map(x => a * x));
const transpose = A => A[0].map((_, j) => A.map(row => row[j]));
const identity = n => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => Number(i === j)));
const pow = (A, n) => { let Z = identity(A.length); for (let j = 0; j < n; j++) Z = mul(A, Z); return Z; };
const inverse2 = A => { const d = A[0][0] * A[1][1] - A[0][1] * A[1][0]; return [[A[1][1] / d, -A[0][1] / d], [-A[1][0] / d, A[0][0] / d]]; };
const blockDiagonal = (A, B) => [
  [A[0][0], A[0][1], 0, 0], [A[1][0], A[1][1], 0, 0],
  [0, 0, B[0][0], B[0][1]], [0, 0, B[1][0], B[1][1]],
];
const maxDefect = (A, B) => Math.max(...A.flatMap((row, i) => row.map((x, j) => Math.abs(x - B[i][j]))));
const key = A => A.flat().map(x => Math.round(x * 1e10) / 1e10).join(',');
const closure = generators => {
  const I = identity(generators[0].length), seen = new Map([[key(I), I]]), queue = [I];
  while (queue.length) {
    const g = queue.shift();
    for (const h of generators) {
      const z = mul(h, g), k = key(z);
      if (!seen.has(k)) { seen.set(k, z); queue.push(z); }
    }
  }
  return [...seen.values()];
};
const order = A => { const I = identity(A.length); let Z = I; for (let n = 1; n <= 500; n++) { Z = mul(A, Z); if (maxDefect(Z, I) < 1e-8) return n; } throw new Error('order bound'); };
const commute = (A, B) => maxDefect(mul(A, B), mul(B, A)) < 1e-8;

const t = 2 * Math.cos(2 * Math.PI / 9);
assert.ok(Math.abs(t ** 3 - 3 * t + 1) < 1e-12);
const Q = scale(1 / (t * t - 1), add(C, scale(t, I2)));
assert.ok(maxDefect(pow(Q, 3), C) < 1e-10);
assert.ok(maxDefect(pow(Q, 9), I2) < 1e-10);
const transportedQ = mul(mul(X, Q), X);
const transportedC = mul(mul(X, C), X);
assert.ok(maxDefect(pow(transportedQ, 3), transportedC) < 1e-10);
assert.equal(order(transportedQ), 9);

const J = blockDiagonal(eps, scale(-1, eps));
const W = blockDiagonal(I2, Q);
const H = [[0, 0, X[0][0], X[0][1]], [0, 0, X[1][0], X[1][1]], [X[0][0], X[0][1], 0, 0], [X[1][0], X[1][1], 0, 0]];
assert.ok(maxDefect(mul(mul(transpose(W), J), W), J) < 1e-9);
assert.ok(maxDefect(mul(mul(transpose(H), J), H), J) < 1e-12);
assert.ok(maxDefect(pow(W, 3), blockDiagonal(I2, C)) < 1e-10);

const G162 = closure([W, H]);
const G18 = closure([pow(W, 3), H]);
assert.equal(G162.length, 162);
assert.equal(G18.length, 18);
const center162 = G162.filter(g => G162.every(h => commute(g, h)));
const center18 = G18.filter(g => G18.every(h => commute(g, h)));
assert.equal(center162.length, 9);
assert.equal(center18.length, 3);
const orders162 = [...new Set(G162.map(order))].sort((a, b) => a - b);
const orders18 = [...new Set(G18.map(order))].sort((a, b) => a - b);
assert.deepEqual(orders18, [1, 2, 3, 6]);
assert.ok(orders162.includes(9) && orders162.includes(18));

console.log(JSON.stringify({
  protocol: 'cyclotomic-ninth-root-selector-extension/1',
  realCubicField: { generator: 't=2cos(2pi/9)', minimalPolynomial: 't^3-3t+1' },
  activeRoot: { formula: 'Q=(C+tI)/(t^2-1)', order: order(Q), cube: 'C', handleTransport: '(XQX)^3=XCX on the conjugate face basis' },
  fullRoot: { W: 'I2 direct-sum Q', symplectic: true, order: order(W), cube: 'R=I2 direct-sum C' },
  liftedGroup: { structure: '(C9 x C9) semidirect C2 with face swap', order: G162.length, centerOrder: center162.length, elementOrders: orders162 },
  cubedSubgroup: { structure: '(C3 x C3) semidirect C2 ~= C3 x S3', order: G18.length, centerOrder: center18.length, elementOrders: orders18 },
  rationalObstruction: 'A rational order-nine matrix requires the primitive cyclotomic factor Phi_9 of degree 6, exceeding carrier dimension 4.',
  conclusion: 'The order-18 selector is exactly the cubed shadow of a real-cyclotomic order-162 face-paired ninth-root extension, but no rational or integral four-carrier realization of the ninth root exists.',
  passed: true,
}, null, 2));
