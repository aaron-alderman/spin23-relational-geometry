import assert from 'node:assert/strict';

const sqrt3 = Math.sqrt(3);
const I = [[1, 0], [0, 1]];
const minusI = [[-1, 0], [0, -1]];
const C = [[-0.5, -sqrt3 / 2], [sqrt3 / 2, -0.5]];
const F = [[1, 0], [0, -1]];
const J = [[0, -1], [1, 0]];
const multiply = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((sum, value, k) => sum + value * B[k][j], 0)));
const transpose = A => A[0].map((_, j) => A.map(row => row[j]));
const close = (A, B, tolerance = 1e-12) => A.every((row, i) => row.every((value, j) => Math.abs(value - B[i][j]) < tolerance));

assert.ok(close(multiply(J, J), minusI));
assert.ok(close(multiply(multiply(J, F), transpose(J)), [[-1, 0], [0, 1]]));
assert.ok(close(multiply(J, C), multiply(C, J)));
assert.ok(close(multiply(multiply(F, C), F), transpose(C)));

const chartNormalEven = (normal, tangent) => ({ valid: 3 * normal > tangent, a: (3 * normal - tangent) / 2, b: tangent });
const chartTangentEven = (normal, tangent) => ({ valid: 3 * tangent > normal, a: (3 * tangent - normal) / 2, b: normal });

for (const [normal, tangent] of [[1, 1], [10, 1], [1, 10], [3, 1], [1, 3], [0.01, 200], [200, 0.01]]) {
  const n = chartNormalEven(normal, tangent);
  const t = chartTangentEven(normal, tangent);
  assert.ok(n.valid || t.valid, 'the two positive-cone charts must cover every positive density');
  if (n.valid) assert.ok(n.a > 0 && n.b > 0);
  if (t.valid) assert.ok(t.a > 0 && t.b > 0);
}

const overlap = ratio => ratio > 1 / 3 && ratio < 3;
assert.ok(overlap(1));
assert.ok(!overlap(4));
assert.ok(!overlap(0.2));

const rho = 1 + Math.sqrt(2);
const gN = rho * rho;
const gT = 1 / gN;
const beta = (z, g, ell) => {
  const c = Math.cosh(2 * ell);
  const s = Math.sinh(2 * ell);
  return s * g * (z + g * c) / (z * z - 2 * g * z + g * g * c * c);
};
for (const ell of [0.01, 0.1, 0.4, 1]) {
  for (const z of [0, 0.01, 0.17, 1, 5.83, 100, 1e6]) {
    const normal = beta(z, gN, ell);
    const tangent = beta(z, gT, ell);
    assert.ok(chartNormalEven(normal, tangent).valid || chartTangentEven(normal, tangent).valid);
  }
}

console.log(JSON.stringify({
  protocol: 'two-chart-jordan-hopf-atlas/1',
  charts: {
    normalEven: '3 beta_n > beta_t',
    tangentEven: '3 beta_t > beta_n'
  },
  cover: 'Every positive pair is in at least one chart because both failures would imply 9 beta_n beta_t <= beta_n beta_t.',
  overlap: '1/3 < beta_n/beta_t < 3',
  transition: 'J=[[0,-1],[1,0]], J^2=-I, JFJ^-1=-F, JC=CJ',
  groupBoundary: 'J has order four and is not an S3 Weyl element; it is the invariant complex/Hopf quarter-turn relating the two S3 reflection embeddings.',
  silverMeaning: 'Weak-loss silver response moves from the normal-even chart through the overlap into the tangent-even chart near the tangent pole and back.',
  boundary: 'This constructs an atlas for positive densities. It does not derive why physical evolution follows its chart transition or identify J with a microscopic Hopf field.',
  passed: true
}, null, 2));
