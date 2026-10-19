import assert from 'node:assert/strict';

const tr = A => A[0].map((_, j) => A.map(r => r[j]));
const mul = (A, B) => A.map(r => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
const add = (A, B) => A.map((r, i) => r.map((x, j) => x + B[i][j]));
const scale = (c, A) => A.map(r => r.map(x => c * x));
const eq = (A, B, tol = 1e-10) => A.every((r, i) => r.every((x, j) => Math.abs(x - B[i][j]) < tol));
const pf = A => A[0][1] * A[2][3] - A[0][2] * A[1][3] + A[0][3] * A[1][2];

// Basis b_i=e_i-e_5, i=1,...,4, for the S5 standard module.
function rep(p) {
  return Array.from({ length: 4 }, (_, r) =>
    Array.from({ length: 4 }, (_, c) => (p[c] === r ? 1 : 0) - (p[4] === r ? 1 : 0)));
}
const pull = (R, J) => mul(mul(tr(R), J), R);

const Jcolor = [
  [0, 1, -1, 0],
  [-1, 0, 1, 0],
  [1, -1, 0, 0],
  [0, 0, 0, 0],
];
const Jfixed = [
  [0, 0, 0, 1],
  [0, 0, 0, 1],
  [0, 0, 0, 1],
  [-1, -1, -1, 0],
];

const c3 = rep([1, 2, 0, 3, 4]);       // (123)
const colorReflection = rep([1, 0, 2, 3, 4]); // (12)
const weakSwap = rep([0, 1, 2, 4, 3]);       // (45)
const pairedReflection = rep([1, 0, 2, 4, 3]); // (12)(45)

assert.ok(eq(pull(c3, Jcolor), Jcolor));
assert.ok(eq(pull(c3, Jfixed), Jfixed));
assert.ok(eq(pull(colorReflection, Jcolor), scale(-1, Jcolor)));
assert.ok(eq(pull(colorReflection, Jfixed), Jfixed));
assert.ok(eq(pull(pairedReflection, Jcolor), scale(-1, Jcolor)));
assert.ok(eq(pull(pairedReflection, Jfixed), scale(-1, Jfixed)));

const samples = [
  [1, 1], [2, -3], [-4, 5], [1, 0], [0, 1],
].map(([a, b]) => {
  const J = add(scale(a, Jcolor), scale(b, Jfixed));
  const p = pf(J);
  assert.equal(p, 3 * a * b);
  return { a, b, pfaffian: p, determinant: p * p, nondegenerate: p !== 0 };
});

// Generate the order-six signed extension <(123),(12)(45)>.
const compose = (p, q) => q.map(i => p[i]);
const id = [0, 1, 2, 3, 4];
const gens = [[1, 2, 0, 3, 4], [1, 0, 2, 4, 3]];
const seen = new Map([[id.join(''), id]]); const queue = [id];
while (queue.length) {
  const x = queue.shift();
  for (const g of gens) {
    const y = compose(g, x); const k = y.join('');
    if (!seen.has(k)) { seen.set(k, y); queue.push(y); }
  }
}
assert.equal(seen.size, 6);
const genericJ = add(scale(2, Jcolor), scale(3, Jfixed));
const signedActions = [...seen.values()].map(p => {
  const pulled = pull(rep(p), genericJ);
  const sign = eq(pulled, genericJ) ? 1 : eq(pulled, scale(-1, genericJ)) ? -1 : 0;
  assert.notEqual(sign, 0);
  return { permutation: p, sign };
});
assert.equal(signedActions.filter(x => x.sign === 1).length, 3);
assert.equal(signedActions.filter(x => x.sign === -1).length, 3);

console.log(JSON.stringify({
  protocol: 'oriented-color-c3-symplectic-family-signed-extension/1',
  basis: 'b_i=e_i-e_5 for the sum-zero S5 standard module',
  invariantForms: {
    colorDifferencePlaneArea: Jcolor,
    fixedComplementPlaneArea: Jfixed,
    generic: 'J(a,b)=a J_color+b J_fixed',
    pfaffian: 'Pf J(a,b)=3ab',
    nondegenerateExactlyWhen: 'a*b != 0',
  },
  transformations: {
    colorThreeCycle: 'preserves both areas',
    colorTransposition: 'J_color -> -J_color, J_fixed -> +J_fixed; neither symplectic nor anti-symplectic for generic J',
    pairedColorWeakTransposition: 'J_color -> -J_color, J_fixed -> -J_fixed; anti-symplectic for every generic J',
  },
  signedOrderSixExtension: {
    order: seen.size,
    symplecticElements: signedActions.filter(x => x.sign === 1).length,
    antiSymplecticElements: signedActions.filter(x => x.sign === -1).length,
    actions: signedActions,
  },
  samples,
  conclusion: 'An oriented color C3 permits a two-area symplectic family. Pairing each color reflection with the weak-coordinate swap extends it to an order-six signed symplectic/anti-symplectic covariance, but does not fix the area ratio a:b.',
  passed: true,
}, null, 2));
