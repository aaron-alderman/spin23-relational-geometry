import assert from 'node:assert/strict';

const tol = 1e-9;
const close = (a, b, t = tol) => Math.abs(a - b) < t;
const sameMatrix = (A, B) => A.every((row, i) => row.every((x, j) => close(x, B[i][j])));

const wickMap = (p, x, y) => {
  const detC = p * p - x * x - y * y;
  return [
    [2 * detC + 4 * x * x, 4 * x * y],
    [4 * x * y, 2 * detC + 4 * y * y],
  ];
};

const eig2 = (M) => {
  const tr = M[0][0] + M[1][1];
  const disc = Math.sqrt((M[0][0] - M[1][1]) ** 2 + 4 * M[0][1] ** 2);
  const lp = (tr + disc) / 2;
  const lm = (tr - disc) / 2;
  let n;
  if (Math.abs(M[0][1]) > tol) {
    n = [M[0][1], lp - M[0][0]];
    const norm = Math.hypot(...n);
    n = n.map((v) => v / norm);
  } else {
    n = M[0][0] >= M[1][1] ? [1, 0] : [0, 1];
  }
  return { lp, lm, n };
};

const gaussianRoot = (M) => {
  const { lp, lm, n } = eig2(M);
  assert.ok(lm >= -tol);
  const p = 0.5 * Math.sqrt(Math.max(0, lp + lm));
  const r = 0.5 * Math.sqrt(Math.max(0, lp - lm));
  return { p, x: r * n[0], y: r * n[1], lp, lm };
};

for (const M of [
  [[0.9, 0.2], [0.2, 0.5]],
  [[1.2, -0.3], [-0.3, 0.8]],
  [[0.4, 0], [0, 1.1]],
  [[0.7, 0], [0, 0.7]],
]) {
  const root = gaussianRoot(M);
  assert.ok(root.p ** 2 >= root.x ** 2 + root.y ** 2 - tol);
  assert.ok(sameMatrix(wickMap(root.p, root.x, root.y), M));
}

// The root sign is invisible: r and -r give the same relationship covariance.
const sample = gaussianRoot([[0.9, 0.2], [0.2, 0.5]]);
assert.ok(sameMatrix(wickMap(sample.p, sample.x, sample.y), wickMap(sample.p, -sample.x, -sample.y)));

// Boundary maps to boundary.
const boundary = wickMap(1, 1, 0);
assert.ok(close(boundary[0][0] * boundary[1][1] - boundary[0][1] ** 2, 0));

// The determinant is not generally squared or preserved as a Jordan morphism.
const p = 0.9, x = 0.3, y = 0.2;
const Cdet = p * p - x * x - y * y;
const W = wickMap(p, x, y);
const Wdet = W[0][0] * W[1][1] - W[0][1] ** 2;
assert.ok(!close(Wdet, Cdet));
assert.ok(!close(Wdet, Cdet ** 2));
assert.ok(close(Wdet, 4 * Cdet * (p * p + x * x + y * y)));

console.log(JSON.stringify({
  protocol: 'proper-gaussian-furey-wick-surjection/1',
  sourceCone: 'XK-fixed population-normal H_2(R) real form',
  wickMap: 'M=2 det(C) I + 4 r r^T',
  targetCone: 'all Sym_2(R)_+ ~= H_2(R)_+',
  inverseEigenvalueFormula: 'p^2=(lambda_++lambda_-)/4, |r|^2=(lambda_+-lambda_-)/4',
  genericFiber: 'two roots r and -r',
  boundaryPreserved: true,
  jordanHomomorphism: false,
  microscopicGaussianStateDerived: false,
  passed: true,
}, null, 2));
