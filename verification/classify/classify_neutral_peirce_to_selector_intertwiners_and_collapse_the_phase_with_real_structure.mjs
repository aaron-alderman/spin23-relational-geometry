import assert from 'node:assert/strict';

const rt3 = Math.sqrt(3), rt2 = Math.sqrt(2);
const mm = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const mv = (A, v) => A.map(row => row.reduce((s, x, j) => s + x * v[j], 0));
const tr = A => A[0].map((_, j) => A.map(row => row[j]));
const scale = (a, A) => A.map(row => row.map(x => a * x));
const eq = (A, B, eps = 1e-11) => A.every((row, i) => row.every((x, j) => Math.abs(x - B[i][j]) < eps));
const det = A => A[0][0] * A[1][1] - A[0][1] * A[1][0];
const Jp = [[0, 1], [-1, 0]];
const Kp = [[1, 0], [0, -1]];
const Gn = [[2, -1], [-1, 2]];
const Cn0 = [[-1, 2], [-2, 1]];
const In = scale(1 / rt3, Cn0);
const Bn = [[1, -1], [0, -1]];
const P = [[1, -1 / 2], [0, rt3 / 2]];
const Pinv = [[1, 1 / rt3], [0, 2 / rt3]];
const S0 = scale(1 / rt2, Pinv);

assert.ok(eq(mm(In, In), scale(-1, [[1, 0], [0, 1]])));
assert.ok(eq(mm(mm(tr(Bn), Gn), Bn), Gn));
assert.ok(eq(mm(Bn, In), scale(-1, mm(In, Bn))));

// Every complex-linear intertwiner is S(v)=[v,-In v].
const intertwiner = v => {
  const w = mv(In, v).map(x => -x);
  return [[v[0], w[0]], [v[1], w[1]]];
};
for (const v of [[1, 0], [0.3, -0.7], [-1.2, 0.4]]) {
  const S = intertwiner(v);
  assert.ok(eq(mm(In, S), mm(S, Jp)));
  const lambda = mv(Gn, v).reduce((sum, x, i) => sum + v[i] * x, 0);
  assert.ok(eq(mm(mm(tr(S), Gn), S), scale(lambda, [[1, 0], [0, 1]])));
  assert.ok(Math.abs(det(S) - lambda / rt3) < 1e-11);
}

// Requiring the real structures to intertwine forces v into the +1 line of
// Bn. Metric normalization then leaves only the two signs.
assert.ok(eq(mm(In, S0), mm(S0, Jp)));
assert.ok(eq(mm(Bn, S0), mm(S0, Kp)));
assert.ok(eq(mm(mm(tr(S0), Gn), S0), [[1, 0], [0, 1]]));
assert.ok(Math.abs(det(S0) - 1 / rt3) < 1e-11);
assert.ok(eq(S0, scale(1 / rt2, Pinv)));

const Sm = scale(-1, S0);
assert.ok(eq(mm(In, Sm), mm(Sm, Jp)));
assert.ok(eq(mm(Bn, Sm), mm(Sm, Kp)));

console.log(JSON.stringify({
  protocol: 'neutral-peirce-selector-intertwiner-torsor/1',
  source: { complexStructure: Jp, conjugation: Kp, relation: 'Kp Jp = -Jp Kp' },
  target: { metric: Gn, normalizedComplexStructure: In, integralConjugation: Bn, relation: 'Bn In = -In Bn' },
  complexOnlyIntertwiners: {
    parameterization: 'S(v) = [v, -In v], v != 0',
    normalizedFamily: 'v^T Gn v = 1, a U(1) torsor',
    areaLaw: 'det S = (v^T Gn v)/sqrt(3)',
  },
  realStructureRefinement: {
    conditions: ['In S = S Jp', 'Bn S = S Kp', 'S^T Gn S = I'],
    solutions: ['+S0', '-S0'],
    S0,
    identity: 'S0 = P^{-1}/sqrt(2)',
  },
  consequence: 'The same mediator-to-A2 conjugator P canonically identifies the neutral Peirce complex/conjugation pair with the selector neutral block, conditional on identifying the source and target real structures physically.',
  passed: true,
}, null, 2));
