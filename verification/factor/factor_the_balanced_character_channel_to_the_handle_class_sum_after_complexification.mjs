import assert from 'node:assert/strict';

const rt = Math.sqrt;
const c = (re, im = 0) => [re, im];
const addc = ([a, b], [d, e]) => [a + d, b + e];
const mulc = ([a, b], [d, e]) => [a * d - b * e, a * e + b * d];
const conjc = ([a, b]) => [a, -b];
const realToComplex = A => A.map(row => row.map(x => c(x)));
const dagger = A => A[0].map((_, j) => A.map(row => conjc(row[j])));
const mmc = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((z, x, k) => addc(z, mulc(x, B[k][j])), c(0))));
const addmc = (A, B) => A.map((row, i) => row.map((x, j) => addc(x, B[i][j])));
const scalec = (z, A) => A.map(row => row.map(x => mulc(z, x)));
const identityc = n => realToComplex(Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => Number(i === j))));
const maxDefectC = (A, B) => Math.max(...A.flatMap((row, i) => row.map((x, j) => Math.hypot(x[0] - B[i][j][0], x[1] - B[i][j][1]))));

const transpose = A => A[0].map((_, j) => A.map(row => row[j]));
const mm = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((z, x, k) => z + x * B[k][j], 0)));
const addm = (A, B, sign = 1) => A.map((row, i) => row.map((x, j) => x + sign * B[i][j]));
const identity = n => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => Number(i === j)));
const maxDefect = (A, B) => Math.max(...A.flatMap((row, i) => row.map((x, j) => Math.abs(x - B[i][j]))));

// Character-channel Kraus matrices from the explicit isometry of document 944.
const images = [
  [0, 0, 1], [2, 0, 2], [2, 1, 2],
  [0, 1, 2], [1, 0, 1], [1, 1, 1],
];
const targetIndex = (a, mu) => 2 * a + mu;
const A1 = Array.from({ length: 6 }, () => Array(6).fill(0));
const A2 = Array.from({ length: 6 }, () => Array(6).fill(0));
images.forEach(([a, mu, b], source) => (b === 1 ? A1 : A2)[targetIndex(a, mu)][source] = 1);
const A = addm(A1, A2);
assert.ok(maxDefect(mm(transpose(A), A), identity(6)) < 1e-12);
const D1 = mm(transpose(A), A1), D2 = mm(transpose(A), A2);

// Select two reflection pairs from the three source pairs.  Columns 0,4 lie in D1;
// columns 3,1 are their reflected partners in D2.  The omitted pair is 5<->2.
const selected = [0, 4, 3, 1];
const Jin = Array.from({ length: 6 }, (_, row) => selected.map(column => Number(row === column)));
const Jout = mm(A, Jin);
assert.ok(maxDefect(mm(transpose(Jin), Jin), identity(4)) < 1e-12);
assert.ok(maxDefect(mm(transpose(Jout), Jout), identity(4)) < 1e-12);
const Q1 = mm(mm(transpose(Jout), A1), Jin);
const Q2 = mm(mm(transpose(Jout), A2), Jin);
assert.deepEqual(Q1, [[1,0,0,0],[0,1,0,0],[0,0,0,0],[0,0,0,0]]);
assert.deepEqual(Q2, [[0,0,0,0],[0,0,0,0],[0,0,1,0],[0,0,0,1]]);

// Minimal handle-class Kraus pair from document 859.
const a = rt(3 / 8), b = rt(1 / 8);
const K1 = [[0,a,0,-b],[a,0,b,0],[0,b,0,a],[-b,0,a,0]];
const K2 = [[0,b,0,a],[b,0,-a,0],[0,-a,0,b],[a,0,b,0]];
const Oplus = addm(K1, K2), Ominus = addm(K1, K2, -1);
assert.ok(maxDefect(mm(transpose(Oplus), Oplus), identity(4)) < 1e-12);
assert.ok(maxDefect(mm(transpose(Ominus), Ominus), identity(4)) < 1e-12);
const T = mm(transpose(Oplus), Ominus);
assert.ok(maxDefect(mm(T, T), identity(4).map(row => row.map(x => -x))) < 1e-12);
assert.ok(maxDefect(transpose(T), T.map(row => row.map(x => -x))) < 1e-12);

// Complex environment rotation sends I/sqrt(2),T/sqrt(2) to complementary
// spectral projectors (I +/- iT)/2.
const I4c = identityc(4), Tc = realToComplex(T);
const Pplus = scalec(c(0.5), addmc(I4c, scalec(c(0, 1), Tc)));
const Pminus = scalec(c(0.5), addmc(I4c, scalec(c(0, -1), Tc)));
assert.ok(maxDefectC(mmc(Pplus, Pplus), Pplus) < 1e-12);
assert.ok(maxDefectC(mmc(Pminus, Pminus), Pminus) < 1e-12);
assert.ok(maxDefectC(mmc(Pplus, Pminus), scalec(c(0), I4c)) < 1e-12);
assert.ok(maxDefectC(addmc(Pplus, Pminus), I4c) < 1e-12);

// Columns: +iT eigenspace followed by -iT eigenspace.
const s = 1 / rt(2);
const S = [
  [c(s), c(0), c(s), c(0)],
  [c(0), c(s), c(0), c(s)],
  [c(0, -s), c(0), c(0, s), c(0)],
  [c(0), c(0, s), c(0), c(0, -s)],
];
assert.ok(maxDefectC(mmc(dagger(S), S), I4c) < 1e-12);
assert.ok(maxDefectC(mmc(mmc(dagger(S), Pplus), S), realToComplex(Q1)) < 1e-12);
assert.ok(maxDefectC(mmc(mmc(dagger(S), Pminus), S), realToComplex(Q2)) < 1e-12);

console.log(JSON.stringify({
  protocol: 'complexified-character-to-handle-kraus-factorization/1',
  characterChannel: { krausFormAfterOutputPermutation: 'D1,D2 complementary rank-three projections', selectedReflectionStableSubspace: selected, compressedKrausRanks: [2, 2], omittedReflectionPair: [5, 2] },
  handleChannel: { realKrausPair: 'K1,K2', hadamardPair: '(Oplus,Ominus)/sqrt(2)', relativeComplexStructure: T, complexSpectralKraus: '(I+iT)/2,(I-iT)/2' },
  factorization: 'After output orthogonal conjugation, complex environment rotation, and unitary S, both channels reduce to Q1 X Q1 + Q2 X Q2 on C^4.',
  nonuniqueness: 'Selecting a reflection-compatible two-plane inside each three-dimensional multiplicity space leaves a Grassmannian choice; the displayed coordinate selection is one witness.',
  physicalBoundary: 'Complex factorization is exact. A source-native real structure and a canonical choice of the discarded conjugate pair are not derived.',
  passed: true,
}, null, 2));
