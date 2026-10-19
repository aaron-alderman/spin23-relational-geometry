import assert from 'node:assert/strict';

const chars = ['P', 'I', 'N'];
const key = ([l, r]) => `${l}${r}`;
const Jkey = k => `${k[1]}${k[0]}`;

const valid = [];
for (const dCommon of chars) {
  for (const dNull of chars) {
    for (const mCommon of chars) {
      if (dNull === dCommon) continue;
      const endpoints = [
        ['P', dCommon], ['I', dCommon], ['N', dNull],
        ['P', mCommon], ['N', mCommon],
      ];
      const selfConjugate = endpoints.some(([l, r]) => l === r);
      const closure = new Set(endpoints.map(key));
      for (const k of [...closure]) closure.add(Jkey(k));
      valid.push({ dCommon, dNull, mCommon, selfConjugate, closure: [...closure].sort() });
    }
  }
}
assert.equal(valid.length, 18);

const orientableCandidates = valid.filter(v => !v.selfConjugate);
assert.equal(orientableCandidates.length, 2);
const fullTriangle = ['IN', 'IP', 'NI', 'NP', 'PI', 'PN'];
for (const v of orientableCandidates) assert.deepEqual(v.closure, fullTriangle);

// Canonical KO-6 chirality fixed by gamma(PN)=+1, oddness of the retained
// Dirac/Majorana edges, and J gamma = - gamma J.
const gamma = { PN: 1, NP: -1, IN: -1, NI: 1, PI: -1, IP: 1 };
for (const k of fullTriangle) assert.equal(gamma[Jkey(k)], -gamma[k]);
assert.equal(gamma.PN, -gamma.IN); // Dirac P-I edge with common N anchor
assert.equal(gamma.PI, -gamma.NI); // Majorana P-N edge with common I anchor

const order3 = ['P', 'I', 'N'];
const intersection = order3.map(i => order3.map(j => gamma[`${i}${j}`] ?? 0));
assert.deepEqual(intersection, [
  [0, -1, 1],
  [1, 0, -1],
  [-1, 1, 0],
]);

const determinant = M => {
  if (M.length === 1) return M[0][0];
  return M[0].reduce((sum, x, j) => {
    const minor = M.slice(1).map(row => row.filter((_, k) => k !== j));
    return sum + (j % 2 ? -1 : 1) * x * determinant(minor);
  }, 0);
};
const rank = M => {
  const A = M.map(r => r.map(Number));
  let r = 0;
  for (let c = 0; c < A[0].length && r < A.length; c++) {
    let p = r;
    while (p < A.length && Math.abs(A[p][c]) < 1e-12) p++;
    if (p === A.length) continue;
    [A[p], A[r]] = [A[r], A[p]];
    const q = A[r][c];
    A[r] = A[r].map(x => x / q);
    for (let i = 0; i < A.length; i++) if (i !== r) {
      const f = A[i][c];
      A[i] = A[i].map((x, j) => x - f * A[r][j]);
    }
    r++;
  }
  return r;
};
assert.equal(determinant(intersection), 0);
assert.equal(rank(intersection), 2);
assert.deepEqual(intersection.map(row => row.reduce((s, x) => s + x, 0)), [0, 0, 0]);

// Add S through the real pair (P,S)+ and (S,P)-. This repairs the
// antisymmetric intersection form. A real edge pair SP<->IP and PS<->PI
// then connects the spectator character to the existing triangle.
const order4 = ['P', 'I', 'N', 'S'];
const gamma4 = { ...gamma, PS: 1, SP: -1 };
const intersection4 = order4.map(i => order4.map(j => gamma4[`${i}${j}`] ?? 0));
assert.equal(determinant(intersection4), 1);
assert.equal(rank(intersection4), 4);

const firstOrderAllowed = (a, b) => a[0] === b[0] || a[1] === b[1];
const edges = [
  { name: 'Dirac P-I', a: ['P', 'N'], b: ['I', 'N'] },
  { name: 'Majorana P-N', a: ['P', 'I'], b: ['N', 'I'] },
  { name: 'spectator connector', a: ['S', 'P'], b: ['I', 'P'] },
  { name: 'J spectator connector', a: ['P', 'S'], b: ['P', 'I'] },
];
for (const e of edges) {
  assert.equal(firstOrderAllowed(e.a, e.b), true, e.name);
  assert.equal(gamma4[key(e.a)], -gamma4[key(e.b)], `${e.name} must be odd`);
}

// Left-algebra connectedness constraints induced by nonzero edges.
const equalities = [['P', 'I'], ['P', 'N'], ['S', 'I']];
const parent = Object.fromEntries(order4.map(x => [x, x]));
const find = x => parent[x] === x ? x : (parent[x] = find(parent[x]));
const join = (a, b) => { parent[find(a)] = find(b); };
for (const [a, b] of equalities) join(a, b);
assert.equal(new Set(order4.map(find)).size, 1);

console.log(JSON.stringify({
  protocol: 'KO6-A2-null-mask-four-character-completion/1',
  anchorEnumeration: {
    validIncidenceMasks: valid.length,
    selfConjugateFreeMasks: orientableCandidates.length,
    selfConjugateFreeAssignments: orientableCandidates.map(({ dCommon, dNull, mCommon }) => ({ dCommon, dNull, mCommon })),
    commonRealClosure: fullTriangle,
  },
  threeCharacterKO6: {
    chirality: gamma,
    intersection,
    determinant: determinant(intersection),
    rank: rank(intersection),
    kernelGenerator: [1, 1, 1],
    interpretation: 'oriented A2 triangle; orientable but Poincare-degenerate',
  },
  fourCharacterRepair: {
    addedRealPair: ['PS(+)', 'SP(-)'],
    intersection: intersection4,
    determinant: determinant(intersection4),
    rank: rank(intersection4),
    addedRealEdgePair: ['SP<->IP', 'PS<->PI'],
    firstOrderAndOdd: true,
    leftDiracCommutantConstraints: equalities.map(([a, b]) => `${a}=${b}`),
    connectedCharacterComponents: new Set(order4.map(find)).size,
  },
  theorem: 'The self-conjugate-free real closure of the null mask is the full oriented A2 triangle. Its odd antisymmetric intersection form is singular. One spectator J-pair repairs duality, and one real first-order edge pair connects the fourth character.',
  boundary: 'This is a finite complex-character toy completion; identifying S and the connector with physical Pati-Salam sectors and computing the junk quotient remain open.',
  passed: true,
}, null, 2));
