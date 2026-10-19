import assert from 'node:assert/strict';

const rt3 = Math.sqrt(3);
const mm = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const mv = (A, v) => A.map(row => row.reduce((s, x, j) => s + x * v[j], 0));
const tr = A => A[0].map((_, j) => A.map(row => row[j]));
const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const scale = (a, A) => A.map(row => row.map(x => a * x));
const outer = v => v.map(x => v.map(y => x * y));
const eq = (A, B, eps = 1e-11) => A.every((row, i) => row.every((x, j) => Math.abs(x - B[i][j]) < eps));
const eqV = (u, v, eps = 1e-11) => u.every((x, i) => Math.abs(x - v[i]) < eps);
const I = [[1, 0], [0, 1]];
const D = [[1, 0], [0, -1]];
const X = [[0, 1], [1, 0]];
const C = [[-1 / 2, -rt3 / 2], [rt3 / 2, -1 / 2]];
const gp = [1, rt3], gm = [1, -rt3], g0 = [-2, 0];

// Two simple-root faces generate C3 but their equal quadratic sum is not
// isotropic and is not invariant under channel exchange.
const K2 = add(outer(gp), outer(gm));
assert.ok(eq(K2, [[2, 0], [0, 6]]));
assert.ok(eq(mm(mm(tr(D), K2), D), K2));
assert.ok(!eq(mm(mm(tr(X), K2), X), K2));

// C3 orbit closure produces the third A2 root direction.
assert.ok(eqV(mv(C, gp), g0));
assert.ok(eqV(mv(C, g0), gm));
assert.ok(eqV(mv(C, gm), gp));

const K3 = add(K2, outer(g0));
assert.ok(eq(K3, scale(6, I)));
assert.ok(eq(mm(mm(tr(C), K3), C), K3));
assert.ok(eq(mm(mm(tr(D), K3), D), K3));
assert.ok(eq(mm(mm(tr(X), K3), X), K3));

// Unit-normal projectors form the A2 tight frame.
const projectorSum = scale(1 / 4, K3);
assert.ok(eq(projectorSum, scale(3 / 2, I)));

// With positive orbit weights, isotropy requires equal weights.
const weighted = (wp, wm, w0) => add(add(scale(wp, outer(gp)), scale(wm, outer(gm))), scale(w0, outer(g0)));
const W = weighted(1.2, 0.7, 2.1);
assert.ok(!eq(W, scale(W[0][0], I)));
const Weq = weighted(2.4, 2.4, 2.4);
assert.ok(eq(Weq, scale(14.4, I)));

console.log(JSON.stringify({
  protocol: 'two-mediator-faces-to-a2-tight-frame/1',
  twoFaceKernel: {
    normals: [gp, gm],
    projectorSum: K2,
    hChiInvariant: true,
    channelExchangeInvariant: false,
    verdict: 'the two faces generate C3 but do not protect an isotropic quadratic response metric',
  },
  coxeterOrbit: {
    cycle: 'g_plus -> g_zero -> g_minus -> g_plus',
    thirdNormal: g0,
    threeProjectorSum: K3,
    unitProjectorTightFrame: projectorSum,
  },
  protection: {
    equalOrbitWeights: 'K = 6 w I',
    unequalOrbitWeights: 'anisotropic',
    verdict: 'equal weighting of the complete three-root A2 orbit supplies the scalar counterterm required by the crossed-symmetry theorem',
  },
  qualification: 'The third direction may be an orbit/composite response rather than a new mediator particle. A microscopic calculation must show that the effective action sums the full orbit with equal weights.',
  passed: true,
}, null, 2));
