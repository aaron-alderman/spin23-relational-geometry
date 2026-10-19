import assert from 'node:assert/strict';

const tol = 1e-12;
const zero = (r, c) => Array.from({ length: r }, () => Array(c).fill(0));
const eye = (n) => Array.from({ length: n }, (_, i) =>
  Array.from({ length: n }, (_, j) => i === j ? 1 : 0));
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const mm = (A, B) => A.map((row) =>
  B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const scale = (s, A) => A.map((row) => row.map((x) => s * x));
const block = (A, B, C, D) => [
  ...A.map((row, i) => [...row, ...B[i]]),
  ...C.map((row, i) => [...row, ...D[i]]),
];
const maxDefect = (A, B) => Math.max(...A.flatMap((row, i) =>
  row.map((x, j) => Math.abs(x - B[i][j]))));

const rank = (A) => {
  const M = A.map((r) => [...r]);
  let row = 0;
  for (let col = 0; col < M[0].length && row < M.length; col++) {
    let p = row;
    while (p < M.length && Math.abs(M[p][col]) < tol) p++;
    if (p === M.length) continue;
    [M[row], M[p]] = [M[p], M[row]];
    const q = M[row][col];
    M[row] = M[row].map((x) => x / q);
    for (let i = 0; i < M.length; i++) if (i !== row) {
      const a = M[i][col];
      M[i] = M[i].map((x, j) => x - a * M[row][j]);
    }
    row++;
  }
  return row;
};

const generations = 3;
const I = eye(generations);
const O = zero(generations, generations);

// Real support matrices for Lambda_L=[I;I], Lambda_u=[I;0],
// Lambda_d=[0;I]. The physical u/d phases are +i and -i.
const L = [...I, ...I];
const U = [...I, ...O];
const D = [...O, ...I];
assert.equal(rank(U), generations);
assert.equal(rank(D), generations);
assert.equal(rank([...transpose(U), ...transpose(D)]), 2 * generations);
assert(maxDefect(mm(transpose(U), D), O) < tol);
assert(maxDefect(mm(transpose(L), U), I) < tol);
assert(maxDefect(mm(transpose(L), D), I) < tol);

// If the two desired arm matrices have ranks r_u,r_d and the U,D mediator
// spans are orthogonal in the inverse-mass metric, N is at least r_u+r_d.
const armRanks = { up: rank(mm(transpose(L), U)), down: rank(mm(transpose(L), D)) };
const minimumCopies = armRanks.up + armRanks.down;
assert.equal(minimumCopies, 2 * generations);

// Shared-left self energy. For M^2=m^2 I+kappa L L^T, the two g-dimensional
// blocks reduce to g copies of the same 2x2 inversion.
const LLt = mm(L, transpose(L));
assert(maxDefect(LLt, block(I, I, I, I)) < tol);
const m2 = 7;
const kappa = 0.4;
const denom = m2 * (m2 + 2 * kappa);
const inverseCorrected = add(
  scale(1 / m2, eye(2 * generations)),
  scale(-kappa / denom, LLt),
);
const realUdBlock = mm(mm(transpose(U), inverseCorrected), D);
assert(maxDefect(realUdBlock, scale(-kappa / denom, I)) < tol);
const physicalUdBlock = scale(-1, realUdBlock); // conj(+i)*(-i)=-1
assert(maxDefect(physicalUdBlock, scale(kappa / denom, I)) < tol);

const collectiveArmRank = 1;
const collectiveMinimumCopies = 2 * collectiveArmRank;
assert.equal(collectiveMinimumCopies, 2);

console.log(JSON.stringify({
  protocol: 'multigeneration-s1-block-gram-rank-loop-obstruction/1',
  theorem: {
    assumptions: [
      'C_Lu = Lambda_L^dagger K Lambda_u',
      'C_Ld = Lambda_L^dagger K Lambda_d',
      'Lambda_u^dagger K Lambda_d = 0',
      'K=(M^2)^-1 positive definite',
    ],
    bound: 'N_S1 >= rank(C_Lu) + rank(C_Ld)',
    proofKernel: 'after K^(1/2) whitening, the u and d column spans are orthogonal; each arm rank is bounded by the dimension of its corresponding span',
  },
  generationwiseTarget: {
    generations,
    desiredArms: ['C_Lu=+i I_3', 'C_Ld=-i I_3'],
    forbiddenBlock: 'C_ud=0',
    armRanks,
    minimumCopies,
    constructiveSupport: {
      LambdaL: '[I_3; I_3]',
      LambdaU: '[I_3; 0]',
      LambdaD: '[0; I_3]',
    },
  },
  collectiveFlavorTarget: {
    armRank: collectiveArmRank,
    minimumCopies: collectiveMinimumCopies,
    interpretation: 'two copies suffice only if the response acts on one selected flavor aggregate rather than three independent generation directions',
  },
  loopAudit: {
    deltaMassSquared: 'kappa [[I_3,I_3],[I_3,I_3]]',
    regeneratedCud: String(kappa / denom) + ' I_3',
    exactFormula: 'kappa/[m^2(m^2+2 kappa)] I_g',
  },
  phenomenologyGate: 'generic non-aligned flavor matrices produce off-diagonal four-fermion operators; identity arms require an additional flavor principle',
  passed: true,
}, null, 2));
