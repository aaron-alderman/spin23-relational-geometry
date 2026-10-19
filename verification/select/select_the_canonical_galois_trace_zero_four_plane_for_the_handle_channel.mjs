import assert from 'node:assert/strict';

const rt = Math.sqrt;
const identity = n => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => Number(i === j)));
const transpose = A => A[0].map((_, j) => A.map(row => row[j]));
const mul = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((sum, x, k) => sum + x * B[k][j], 0)));
const maxDefect = (A, B) => Math.max(...A.flatMap((row, i) => row.map((x, j) => Math.abs(x - B[i][j]))));
const permutation = image => image.map((_, row) => image.map(columnImage => Number(columnImage === row)));
const column = values => values.map(x => [x]);
const columns = vectors => vectors[0].map((_, row) => vectors.map(vector => vector[row]));

// Character-channel source blocks from document 945.
const block1 = [0, 4, 5], block2 = [3, 1, 2];
const D1 = Array.from({ length: 6 }, (_, i) => Array.from({ length: 6 }, (_, j) => Number(i === j && block1.includes(i))));
const D2 = identity(6).map((row, i) => row.map((x, j) => x - D1[i][j]));

// Galois generator cycles embeddings in each fixed cubed-character sector.
const gImage = [4, 2, 3, 1, 5, 0]; // (0 4 5)(3 1 2)
const reflectionImage = [3, 4, 5, 0, 1, 2]; // pair corresponding embeddings
const G = permutation(gImage), F = permutation(reflectionImage);
assert.ok(maxDefect(mul(mul(G, G), G), identity(6)) < 1e-12);
assert.ok(maxDefect(mul(F, F), identity(6)) < 1e-12);
assert.ok(maxDefect(mul(G, F), mul(F, G)) < 1e-12);
assert.ok(maxDefect(mul(G, D1), mul(D1, G)) < 1e-12);

const vector = entries => entries;
const u1 = vector([1 / rt(2), 0, 0, 0, -1 / rt(2), 0]);
const u2 = vector([1 / rt(6), 0, 0, 0, 1 / rt(6), -2 / rt(6)]);
const v1 = vector([0, -1 / rt(2), 0, 1 / rt(2), 0, 0]);
const v2 = vector([0, 1 / rt(6), -2 / rt(6), 1 / rt(6), 0, 0]);
const Jin = columns([u1, u2, v1, v2]);
assert.ok(maxDefect(mul(transpose(Jin), Jin), identity(4)) < 1e-12);

const Q1 = mul(mul(transpose(Jin), D1), Jin);
const Q2 = mul(mul(transpose(Jin), D2), Jin);
assert.ok(maxDefect(Q1, [[1,0,0,0],[0,1,0,0],[0,0,0,0],[0,0,0,0]]) < 1e-12);
assert.ok(maxDefect(Q2, [[0,0,0,0],[0,0,0,0],[0,0,1,0],[0,0,0,1]]) < 1e-12);

// Invariance and induced A2 rotation on each trace-zero plane.
const inducedG = mul(mul(transpose(Jin), G), Jin);
assert.ok(maxDefect(mul(mul(inducedG, inducedG), inducedG), identity(4)) < 1e-12);
assert.ok(maxDefect(mul(G, Jin), mul(Jin, inducedG)) < 1e-12);
const inducedF = mul(mul(transpose(Jin), F), Jin);
assert.ok(maxDefect(mul(F, Jin), mul(Jin, inducedF)) < 1e-12);

const l1 = vector([1 / rt(3), 0, 0, 0, 1 / rt(3), 1 / rt(3)]);
const l2 = vector([0, 1 / rt(3), 1 / rt(3), 1 / rt(3), 0, 0]);
const L = columns([l1, l2]);
assert.ok(maxDefect(mul(transpose(L), L), identity(2)) < 1e-12);
assert.ok(maxDefect(mul(transpose(L), Jin), Array.from({ length: 2 }, () => Array(4).fill(0))) < 1e-12);
assert.ok(maxDefect(mul(G, L), L) < 1e-12);
assert.ok(maxDefect(mul(F, L), mul(L, [[0,1],[1,0]])) < 1e-12);

// Reconstruct the character-channel output permutation and verify the same
// simultaneous compression as document 945 with the canonical Jin.
const images = [[0,0,1],[2,0,2],[2,1,2],[0,1,2],[1,0,1],[1,1,1]];
const A = Array.from({ length: 6 }, () => Array(6).fill(0));
images.forEach(([a, mu], source) => { A[2 * a + mu][source] = 1; });
const Jout = mul(A, Jin);
const A1 = mul(A, D1), A2 = mul(A, D2);
assert.ok(maxDefect(mul(mul(transpose(Jout), A1), Jin), Q1) < 1e-12);
assert.ok(maxDefect(mul(mul(transpose(Jout), A2), Jin), Q2) < 1e-12);

console.log(JSON.stringify({
  protocol: 'galois-trace-zero-four-plane-selector/1',
  galoisGroup: 'Gal(Q(zeta_9)/Q(omega)) ~= C3',
  multiplicityAction: '(0 4 5)(3 1 2)',
  decompositionPerCharacter: 'C^3 = trace line plus A2 trace-zero plane',
  selectedFourPlane: { dimension: 4, galoisInvariant: true, reflectionInvariant: true, inducedGaloisMatrix: inducedG, inducedReflectionMatrix: inducedF },
  discardedPair: { dimension: 2, description: 'one Galois trace singlet in each conjugate cubed-character sector', reflectionSwapsPair: true },
  compressedKraus: 'Q1,Q2 complementary rank-two projections, hence the handle factorization of document 945 applies canonically under Galois covariance',
  physicalBoundary: 'Galois covariance is arithmetically canonical but is not yet derived as a symmetry or selection rule of the Standard-Model/Furey boundary dynamics.',
  passed: true,
}, null, 2));
