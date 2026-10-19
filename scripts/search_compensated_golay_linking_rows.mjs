import assert from "node:assert/strict";

const mod = (x) => ((x % 3) + 3) % 3;
const mu = [2, 2, 2, 2, 2, 2, -4, -4, -1, -1, -1];
const S = [
  [1, 2, 2, 2, 1, 0, 1, 0, 0, 0, 0],
  [0, 1, 2, 2, 2, 1, 0, 1, 0, 0, 0],
  [2, 1, 2, 0, 1, 2, 0, 0, 1, 0, 0],
  [1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0],
  [2, 2, 2, 1, 0, 1, 0, 0, 0, 0, 1],
];
const T = [
  [-1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1],
  [0, -1, -1, -1, 1, 1, 1, 0, 0, 0, 1, -1, 0, 0, 0],
  [-1, 1, 0, 0, 0, -1, -1, 1, 1, 0, 0, 1, -1, 0, 0],
  [0, -1, 1, 0, -1, 1, 0, 0, -1, 1, 0, 0, 1, -1, 0],
  [0, 0, -1, 1, 0, -1, 1, -1, 1, 0, 0, 0, 0, 1, -1],
].map((row) => row.map(mod));
const y = T[0];
const seedStabilizers = T.slice(1);
const ones11 = Array(11).fill(1);
const zeros11 = Array(11).fill(0);
const zeros15 = Array(15).fill(0);
const coefficients = [...mu, ...mu, ...Array(15).fill(1)].map(mod);
const paired = S.map((row) => [...row, ...row.map((x) => mod(-x)), ...zeros15]);
const seedRows = seedStabilizers.map((row) => [...zeros11, ...zeros11, ...row]);
const logical = [...ones11.map((x) => mod(-x)), ...ones11, ...y];

const rank3 = (matrix) => {
  const a = matrix.map((row) => row.map(mod));
  let rank = 0;
  for (let col = 0; col < (a[0]?.length ?? 0) && rank < a.length; col += 1) {
    let pivot = rank;
    while (pivot < a.length && a[pivot][col] === 0) pivot += 1;
    if (pivot === a.length) continue;
    [a[rank], a[pivot]] = [a[pivot], a[rank]];
    if (a[rank][col] === 2) {
      for (let j = col; j < a[rank].length; j += 1) a[rank][j] = mod(2 * a[rank][j]);
    }
    for (let i = 0; i < a.length; i += 1) if (i !== rank && a[i][col]) {
      const factor = a[i][col];
      for (let j = col; j < a[i].length; j += 1) {
        a[i][j] = mod(a[i][j] - factor * a[rank][j]);
      }
    }
    rank += 1;
  }
  return rank;
};
const kernel3 = (matrix) => {
  const width = matrix[0]?.length ?? 0;
  const out = [];
  for (let code = 0; code < 3 ** width; code += 1) {
    let digits = code;
    const vector = [];
    for (let j = 0; j < width; j += 1) {
      vector.push(digits % 3);
      digits = Math.floor(digits / 3);
    }
    if (matrix.every((row) => mod(row.reduce(
      (sum, entry, j) => sum + entry * vector[j], 0)) === 0)) out.push(vector);
  }
  return out;
};
const cubic = (a, b, c) => mod(a.reduce(
  (sum, x, i) => sum + coefficients[i] * x * b[i] * c[i], 0));
const golayCubic = (a, b, c) => mod(a.reduce(
  (sum, x, i) => sum + mu[i] * x * b[i] * c[i], 0));
const enumerateSpace = (basis) => {
  const words = [];
  for (let code = 0; code < 3 ** basis.length; code += 1) {
    let digits = code;
    const word = Array(basis[0].length).fill(0);
    for (const row of basis) {
      const scalar = digits % 3;
      digits = Math.floor(digits / 3);
      for (let j = 0; j < word.length; j += 1) word[j] = mod(word[j] + scalar * row[j]);
    }
    words.push(word);
  }
  return words;
};
const sameSpace = (left, right) =>
  rank3([...left, ...right]) === rank3(left) && rank3(left) === rank3(right);
const combinations = (length, size) => {
  const out = [];
  const visit = (start, chosen) => {
    if (chosen.length === size) {
      out.push(chosen);
      return;
    }
    for (let i = start; i < length; i += 1) visit(i + 1, [...chosen, i]);
  };
  visit(0, []);
  return out;
};
const distance = (logicalRow, stabilizers) => {
  for (let weight = 1; weight <= 5; weight += 1) {
    for (const support of combinations(37, weight)) {
      const restrictedA = stabilizers.map((row) => support.map((j) => row[j]));
      const restrictedH = [support.map((j) => logicalRow[j]), ...restrictedA];
      if (rank3(restrictedH) > rank3(restrictedA)) return weight;
    }
  }
  return null;
};

const hData = {
  generic: {
    permutation: [5, 1, 3, 2, 4, 0, 7, 6, 9, 8, 10],
    signs: [1, -1, 1, 1, -1, 1, 1, 1, -1, -1, -1],
  },
  wittBlock: {
    permutation: [3, 1, 6, 0, 4, 7, 2, 5, 8, 10, 9],
    signs: [1, -1, 1, 1, -1, 1, 1, 1, -1, -1, -1],
  },
};

// The linker equations have a five-dimensional linear core.  If
// K_s=(0,1+s,y), then the cubic triples (K_s,P_r,P_t) differ from those for
// K_0 by tau_mu(s,r,t).  Hence every admissible shift lies in the first-slot
// radical of the polarized Golay cubic.  The following 15 x 5 matrix is the
// coordinate matrix of Phi:S -> Sym^2(S*), Phi(s)(r,t)=tau_mu(s,r,t).
const symmetricPairs = [];
for (let b = 0; b < S.length; b += 1) {
  for (let c = b; c < S.length; c += 1) symmetricPairs.push([b, c]);
}
const cubicPolarizationMatrix = symmetricPairs.map(([b, c]) =>
  S.map((basisVector) => golayCubic(basisVector, S[b], S[c])));
const cubicRadicalCoordinates = kernel3(cubicPolarizationMatrix);
const golayWords = enumerateSpace(S);
const nonzeroDiagonalWords = golayWords.filter((word) => golayCubic(word, word, word) !== 0);
assert.equal(rank3(cubicPolarizationMatrix), S.length);
assert.deepEqual(cubicRadicalCoordinates, [Array(S.length).fill(0)]);
assert.equal(nonzeroDiagonalWords.length, 0);
assert.ok(cubicPolarizationMatrix.some((row) => row.some((entry) => entry !== 0)));
const transformBothGolayBlocks = (row, data, firstScalar, secondScalar, seedScalar) => {
  const out = Array(37).fill(0);
  for (let j = 0; j < 11; j += 1) {
    out[data.permutation[j]] = mod(firstScalar * data.signs[j] * row[j]);
    out[11 + data.permutation[j]] = mod(secondScalar * data.signs[j] * row[11 + j]);
  }
  for (let j = 0; j < 15; j += 1) out[22 + j] = mod(seedScalar * row[22 + j]);
  return out;
};

const triorthogonalLinkers = [];
for (const shift of enumerateSpace(S)) {
  const linkerWord = ones11.map((x, i) => mod(x + shift[i]));
  const linker = [...zeros11, ...linkerWord, ...y];
  const stabilizers = [...paired, linker, ...seedRows];
  const H = [logical, ...stabilizers];
  if (rank3(stabilizers) !== 10 || rank3(H) !== 11) continue;
  let valid = true;
  for (let i = 0; i < H.length && valid; i += 1) {
    for (let j = 0; j < H.length && valid; j += 1) {
      for (let k = 0; k < H.length; k += 1) {
        const expected = i === 0 && j === 0 && k === 0 ? cubic(logical, logical, logical) : 0;
        if (cubic(H[i], H[j], H[k]) !== expected) {
          valid = false;
          break;
        }
      }
    }
  }
  if (!valid) continue;

  const symmetryAudit = {};
  for (const [name, data] of Object.entries(hData)) {
    const preserving = [];
    for (const firstScalar of [1, -1]) {
      for (const secondScalar of [1, -1]) {
        for (const seedScalar of [1, -1]) {
          const transformedStabilizers = stabilizers.map((row) =>
            transformBothGolayBlocks(row, data, firstScalar, secondScalar, seedScalar));
          const transformedH = H.map((row) =>
            transformBothGolayBlocks(row, data, firstScalar, secondScalar, seedScalar));
          if (sameSpace(stabilizers, transformedStabilizers) && sameSpace(H, transformedH)) {
            preserving.push({ firstScalar, secondScalar, seedScalar });
          }
        }
      }
    }
    symmetryAudit[name] = preserving;
  }
  triorthogonalLinkers.push({
    shift,
    linkerWord,
    symmetryAudit,
    distance: distance(logical, stabilizers),
  });
}

console.log(JSON.stringify({
  protocol: "compensated-golay-linking-row-search/2",
  cubicPolarizationCertificate: {
    codomainCoordinates: symmetricPairs.map(([b, c]) => [b + 1, c + 1]),
    matrix: cubicPolarizationMatrix,
    rank: rank3(cubicPolarizationMatrix),
    domainDimension: S.length,
    radicalCoordinates: cubicRadicalCoordinates,
    conclusion: "The first-slot radical of tau_mu on S is zero.",
  },
  characteristicThreeAudit: {
    wordsTested: golayWords.length,
    nonzeroDiagonalWords: nonzeroDiagonalWords.length,
    trilinearTensorNonzero: cubicPolarizationMatrix.some(
      (row) => row.some((entry) => entry !== 0)),
    conclusion: "tau_mu is nonzero but tau_mu(s,s,s)=0 for every s in S; in characteristic three it is not recoverable by ordinary diagonal polarization.",
  },
  affineLinkersTested: 3 ** S.length,
  triorthogonalLinkers: triorthogonalLinkers.length,
  results: triorthogonalLinkers,
  theorem: triorthogonalLinkers.length === 1
    ? "Within K=(0,1+s,y), s in S, triorthogonality uniquely selects the original uncompensated linker."
    : "The affine linker family contains multiple triorthogonal candidates.",
  passed: true,
}, null, 2));
