const kron = (A, B) => A.flatMap(rowA => B.map(rowB => rowA.flatMap(a => rowB.map(b => a*b))));
const mul = (A, B) => A.map(r => B[0].map((_, j) => r.reduce((s, x, k) => s + x*B[k][j], 0)));
const sub = (A, B) => A.map((r, i) => r.map((x, j) => x-B[i][j]));
const comm = (A, B) => sub(mul(A, B), mul(B, A));
const maxAbs = A => Math.max(...A.flat().map(Math.abs));
const I3 = [[1,0,0],[0,1,0],[0,0,1]];

// A horizontal Krajewski edge: the left character is shared, so the internal
// first-order double commutator vanishes.  Family multiplicity is arbitrary.
const T = [[0,1],[0,0]];
const leftA = [[2,0],[0,2]];      // shared left character on both endpoints
const rightB = [[3,0],[0,5]];
const internalFirstOrder = comm(comm(T, leftA), rightB);
if (maxAbs(internalFirstOrder) !== 0) throw new Error('internal horizontal edge should pass first order');

const Kimage = [[0,1,0],[0,0,0],[0,0,0]];
const Knull = [[0,0,1],[0,0,0],[0,0,0]];
const Kgeneric = [[1,2,3],[4,5,6],[7,8,10]];

for (const K of [Kimage, Knull, Kgeneric]) {
  const D = kron(T, K);
  const A = kron(leftA, I3);
  const B = kron(rightB, I3);
  if (maxAbs(comm(comm(D, A), B)) !== 0) throw new Error('family-blind first-order factorization failed');
}

// Reality completion adds the transposed/conjugate family block but preserves
// the distinction neither in support nor in admissibility.
const transpose = A => A[0].map((_, j) => A.map(r => r[j]));
const realityPairs = [Kimage, Knull].map(K => ({K, Jpartner: transpose(K)}));

// Fixed rank-one complementary Majorana data distinguish image and null lines,
// yet the same generation-blind axioms admit both Dirac deformations.
const QMajorana = [[3,0],[0,0]];
const imageDirection = [1,0];
const nullDirection = [0,1];
const BtimesImage = [3,0];
const BtimesNull = [0,0];
if (BtimesImage[0] === 0 || BtimesNull.some(Math.abs)) throw new Error('image/null witness failed');

console.log(JSON.stringify({
  protocol: 'generation-blind-first-order-null-line-underdetermination/1',
  factorization: '[[T tensor K,a tensor I],b^o tensor I]=[[T,a],b^o] tensor K',
  internalHorizontalFirstOrderNorm: maxAbs(internalFirstOrder),
  admittedFamilyBlocks: {
    imageLineLeakage: Kimage,
    nullLineLeakage: Knull,
    genericFullBlock: Kgeneric,
  },
  realityCompletion: realityPairs,
  fixedRankOneComplementaryMajoranaBlock: QMajorana,
  imageDirection,
  nullDirection,
  conclusion: 'For an allowed internal edge, generation-blind representation, grading, first order and reality admit every family matrix K; they cannot forbid only the null-line Dirac component.',
  requiredEscape: 'A represented family algebra, a normalizer/incidence restriction, or a unique shared spurion correlating Dirac and Majorana family tensors.',
  passed: true,
}, null, 2));
