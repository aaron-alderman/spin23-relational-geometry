import assert from 'node:assert/strict';

const tol = 1e-10;
const close = (a, b, t = tol) => Math.abs(a - b) < t;

const A = 0.7;
const B = 0.4;
const nu = 1.3;
const determinantReal = (x) => A * B - x * x;
const actionReal = (x) => -nu * Math.log(determinantReal(x));
const gradientReal = (x) => 2 * nu * x / determinantReal(x);
const hessianAtCenter = 2 * nu / (A * B);

assert.ok(close(gradientReal(0), 0));
assert.ok(hessianAtCenter > 0);
assert.ok(actionReal(0) < actionReal(0.2));
assert.ok(actionReal(0) < actionReal(-0.2));

// Lorentz-coordinate form of the H_2(R) determinant.
const u = (A + B) / 2;
const v = (A - B) / 2;
for (const x of [0, 0.1, -0.2]) {
  assert.ok(close(A * B - x * x, u * u - v * v - x * x));
}

// Schur/Jordan decomposition of the same determinant and barrier.
for (const x of [0, 0.1, -0.2]) {
  const schur = B - x * x / A;
  assert.ok(close(A * schur, determinantReal(x)));
  assert.ok(close(-Math.log(determinantReal(x)), -Math.log(A) - Math.log(schur)));
}

// Rank-three block embedding diag(1,K): the cubic determinant restricts to det K.
const determinant3Block = (x) => 1 * (A * B - x * x);
assert.ok(close(determinant3Block(0.17), determinantReal(0.17)));

// Complex residual phase enlarges H_2(R) to H_2(C).
const determinantComplex = (x, y) => A * B - x * x - y * y;
assert.ok(close(determinantComplex(0.1, 0.2), u * u - v * v - 0.1 ** 2 - 0.2 ** 2));
assert.ok(determinantComplex(0, 0) > determinantComplex(0.1, 0.2));

// Dimension checks for the two conformal/TKK candidates.
const dimSp4 = 2 * (2 * 2 + 1); // dim sp(2n), n=2
const dimSo23 = 5 * 4 / 2;
const dimSu22 = 4 * 4 - 1;
const dimSo24 = 6 * 5 / 2;
assert.equal(dimSp4, 10);
assert.equal(dimSp4, dimSo23);
assert.equal(dimSu22, 15);
assert.equal(dimSu22, dimSo24);

console.log(JSON.stringify({
  protocol: 'gaussian-gram-jordan-barrier/1',
  realCone: 'H_2(R)_+',
  realDeterminant: 'AB-x^2 = u^2-v^2-x^2',
  influenceFunctional: '-nu log det(K_res)',
  uniqueSaddle: 'x=0',
  tkkClosure: 'sp(4,R) ~= so(2,3)',
  rankThreeEmbedding: 'det diag(1,K_res)=det K_res',
  complexExtension: 'H_2(C)_+ with su(2,2) ~= so(2,4)',
  physicalRealSelectorDerived: false,
  passed: true,
}, null, 2));
