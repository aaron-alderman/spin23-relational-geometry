import assert from 'node:assert/strict';

const rt3 = Math.sqrt(3);
const mm = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const transpose = A => A[0].map((_, j) => A.map(row => row[j]));
const scaleM = (r, A) => A.map(row => row.map(x => r * x));
const maxDefect = (A, B) => Math.max(...A.flatMap((row, i) => row.map((x, j) => Math.abs(x - B[i][j]))));
const I2 = [[1, 0], [0, 1]];
const roots = [[1, rt3], [-2, 0], [1, -rt3]]; // g+, g0, g-
const M = roots;
const Q = scaleM(1 / Math.sqrt(6), M); // Q^TQ=I, QQ^T=Pstd
const householderNormal = g => {
  const n = g[0] ** 2 + g[1] ** 2;
  return [[1 - 2 * g[0] * g[0] / n, -2 * g[0] * g[1] / n], [-2 * g[1] * g[0] / n, 1 - 2 * g[1] * g[1] / n]];
};
const permutation = (i, j) => {
  const S = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
  [S[i], S[j]] = [S[j], S[i]];
  return S;
};
const restrictions = [[0, 1, 2], [1, 2, 0], [0, 2, 1]].map(([i, j, untouched]) => {
  const S = permutation(i, j), restricted = mm(mm(transpose(Q), S), Q), target = scaleM(-1, householderNormal(roots[untouched]));
  return { swap: `S${i}${j}`, untouchedRoot: ['g+','g0','g-'][untouched], restricted, target: `-H_${['g+','g0','g-'][untouched]}`, defect: maxDefect(restricted, target) };
});
assert.ok(restrictions.every(x => x.defect < 1e-12));

const S01 = permutation(0, 1), S12 = permutation(1, 2);
const labelForward = mm(S01, S12), activeForward = mm(mm(transpose(Q), labelForward), Q);
const mediatorForward = mm(householderNormal(roots[2]), householderNormal(roots[0]));
const labelReverse = mm(S12, S01), activeReverse = mm(mm(transpose(Q), labelReverse), Q);
const mediatorReverse = mm(householderNormal(roots[0]), householderNormal(roots[2]));
assert.ok(maxDefect(activeForward, mediatorForward) < 1e-12);
assert.ok(maxDefect(activeReverse, mediatorReverse) < 1e-12);
assert.ok(maxDefect(mm(mm(activeForward, activeForward), activeForward), I2) < 1e-12);
assert.ok(maxDefect(activeReverse, transpose(activeForward)) < 1e-12);

console.log(JSON.stringify({
  protocol: 'label-swap-to-mediator-householder-intertwiner/1',
  isometry: 'Q=M/sqrt(6), with Q^TQ=I and QQ^T=Pstd',
  restrictions,
  orderedProducts: {
    labelForward: 'S01 S12', mediatorForward: 'H_g- H_g+', defect: maxDefect(activeForward, mediatorForward),
    labelReverse: 'S12 S01', mediatorReverse: 'H_g+ H_g-', defect: maxDefect(activeReverse, mediatorReverse),
    reverseIsInverse: maxDefect(activeReverse, transpose(activeForward)),
  },
  interpretation: 'A label swap reflects across the untouched root line, hence equals minus the Householder reflection with that root as normal. Two minus signs cancel, making the two ordered face products exactly identical.',
  limitation: 'The weak/Pfaffian ordering selects one orientation conditionally, but no microscopic clock or traversal mechanism is derived here.',
  passed: true,
}, null, 2));
