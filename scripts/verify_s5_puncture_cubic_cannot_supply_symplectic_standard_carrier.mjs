import assert from 'node:assert/strict';

const n = 5;

function identity(m) {
  return Array.from({ length: m }, (_, i) =>
    Array.from({ length: m }, (_, j) => (i === j ? 1 : 0)));
}

function transpose(A) {
  return A[0].map((_, j) => A.map(row => row[j]));
}

function multiply(A, B) {
  return A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
}

function add(A, B) {
  return A.map((row, i) => row.map((x, j) => x + B[i][j]));
}

function maxAbs(A) {
  return Math.max(...A.flat().map(Math.abs));
}

function permMatrix(p) {
  const P = Array.from({ length: n }, () => Array(n).fill(0));
  for (let i = 0; i < n; i++) P[p[i]][i] = 1;
  return P;
}

// Columns b_i=e_i-e_5 span the sum-zero standard S5 module.
const B = Array.from({ length: n }, (_, r) =>
  Array.from({ length: 4 }, (_, c) => (r === c ? 1 : r === 4 ? -1 : 0)));
const G = multiply(transpose(B), B);

function standardRep(p) {
  const PB = multiply(permMatrix(p), B);
  // A sum-zero vector v has coordinates (v_1,...,v_4) in this basis.
  return PB.slice(0, 4);
}

const generators = [
  [1, 0, 2, 3, 4],
  [1, 2, 3, 4, 0],
];
const reps = generators.map(standardRep);
for (const R of reps) assert.ok(maxAbs(add(multiply(multiply(transpose(R), G), R), G.map(row => row.map(x => -x)))) === 0);

const skewBasis = [];
for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) {
  const E = Array.from({ length: 4 }, () => Array(4).fill(0));
  E[i][j] = 1;
  E[j][i] = -1;
  skewBasis.push(E);
}

const symBasis = [];
for (let i = 0; i < 4; i++) for (let j = i; j < 4; j++) {
  const E = Array.from({ length: 4 }, () => Array(4).fill(0));
  E[i][j] = 1;
  E[j][i] = 1;
  symBasis.push(E);
}

function constraintMatrix(basis) {
  const rows = [];
  for (const R of reps) {
    const deltas = basis.map(E => add(multiply(multiply(transpose(R), E), R), E.map(row => row.map(x => -x))));
    for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) rows.push(deltas.map(D => D[i][j]));
  }
  return rows;
}

function rank(A, tol = 1e-10) {
  const M = A.map(row => row.map(Number));
  let r = 0;
  for (let c = 0; c < (M[0]?.length ?? 0) && r < M.length; c++) {
    let pivot = r;
    while (pivot < M.length && Math.abs(M[pivot][c]) < tol) pivot++;
    if (pivot === M.length) continue;
    [M[r], M[pivot]] = [M[pivot], M[r]];
    const d = M[r][c];
    for (let j = c; j < M[r].length; j++) M[r][j] /= d;
    for (let i = 0; i < M.length; i++) if (i !== r) {
      const f = M[i][c];
      for (let j = c; j < M[i].length; j++) M[i][j] -= f * M[r][j];
    }
    r++;
  }
  return r;
}

const skewRank = rank(constraintMatrix(skewBasis));
const symRank = rank(constraintMatrix(symBasis));
assert.equal(skewBasis.length - skewRank, 0);
assert.equal(symBasis.length - symRank, 1);

function parity(x) { return x.reduce((a, b) => a + b, 0) % 2; }
const weights = [];
for (let mask = 0; mask < 32; mask++) {
  const bits = Array.from({ length: 5 }, (_, i) => (mask >> i) & 1);
  if (parity(bits) === 0) weights.push(bits.map(b => b ? -1 : 1));
}
assert.equal(weights.length, 16);

const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
const tau = (set, x, y, z) => set.reduce((s, q) => s + dot(q, x) * dot(q, y) * dot(q, z), 0);
const puncture = [1, 1, 1, 1, 1];
const retained = weights.filter(q => q.some((x, i) => x !== puncture[i]));
const samples = [
  [[1, 2, -1, 0, 3], [0, 1, 4, -2, 1], [2, -1, 0, 3, 1]],
  [[1, -1, 0, 0, 0], [0, 1, -1, 0, 0], [0, 0, 1, -1, 0]],
];
const cubicChecks = samples.map(([x, y, z]) => {
  const full = tau(weights, x, y, z);
  const punctured = tau(retained, x, y, z);
  const rankOneResidue = -x.reduce((a, b) => a + b, 0) * y.reduce((a, b) => a + b, 0) * z.reduce((a, b) => a + b, 0);
  assert.equal(full, 0);
  assert.ok(Math.abs(punctured - rankOneResidue) < 1e-10);
  return { x, y, z, full, punctured, rankOneResidue };
});
assert.equal(cubicChecks[1].punctured, 0);

const output = {
  protocol: 's5-puncture-cubic-versus-symplectic-standard-carrier/1',
  decomposition: 'R^5 = trivial line <(1,1,1,1,1)> plus the four-dimensional sum-zero standard S5 module',
  invariantFormsOnStandard4: {
    symmetricDimension: symBasis.length - symRank,
    alternatingDimension: skewBasis.length - skewRank,
    symmetricGram: G,
  },
  punctureCubic: 'tau_15(x,y,z)=-(sum x)(sum y)(sum z)',
  cubicChecks,
  conclusion: 'The puncture anomaly cubic lives entirely on the trivial S5 line, vanishes on the standard four-module, and the standard four-module has no S5-invariant alternating form. It cannot be the required symplectic carrier without extra symmetry-breaking or doubled/central-extension data.',
  stopCondition: 'Do not identify the natural four-dimensional S5 standard quotient with the Sp(4,R) carrier merely by dimension.',
  passed: true,
};

console.log(JSON.stringify(output, null, 2));
