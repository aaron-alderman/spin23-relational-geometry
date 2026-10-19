import assert from "node:assert/strict";

const mu = [1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1];
const N = mu.reduce((a, b) => a + b, 0);
assert.equal(N, 1);

// Explicit rank-five integral P-lattice. It arises as the graph of the
// displayed skew matrix in a hyperbolic U^5 basis of 1^perp in I_{6,5}.
const skewA = [
  [0, 4, -2, 0, 3],
  [-4, 0, 4, -2, 0],
  [2, -4, 0, -2, 1],
  [0, 2, 2, 0, 4],
  [-3, 0, -1, -4, 0],
];
const G = [
  [-5, 1, 0, -4, -2, -2, 1, -4, -2, -2, -5],
  [2, 0, 5, 4, 0, 2, 4, 5, 0, 2, 2],
  [3, 0, -2, 3, 2, 4, -2, 2, 3, 4, 3],
  [-8, 0, 0, -2, -3, -4, 0, -2, -4, -3, -8],
  [8, 0, 3, 3, 4, 9, 3, 3, 4, 8, 9],
];

const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
const weightedDot = (a, b) => a.reduce((s, x, i) => s + mu[i] * x * b[i], 0);
const ones = Array(11).fill(1);

assert.deepEqual(G.map((row) => weightedDot(row, ones)), [0, 0, 0, 0, 0]);
assert.deepEqual(G.map((a) => G.map((b) => weightedDot(a, b))), Array.from({ length: 5 }, () => Array(5).fill(0)));

const mod = (x, p) => ((x % p) + p) % p;
const modPow = (a, n, p) => {
  let x = BigInt(mod(a, p)), out = 1n, k = BigInt(n), P = BigInt(p);
  while (k) {
    if (k & 1n) out = out * x % P;
    x = x * x % P;
    k >>= 1n;
  }
  return Number(out);
};
const rankMod = (matrix, p) => {
  if (matrix.length === 0 || matrix[0].length === 0) return 0;
  const a = matrix.map((row) => row.map((x) => mod(x, p)));
  let rank = 0;
  for (let col = 0; col < a[0].length && rank < a.length; col += 1) {
    let pivot = rank;
    while (pivot < a.length && a[pivot][col] === 0) pivot += 1;
    if (pivot === a.length) continue;
    [a[rank], a[pivot]] = [a[pivot], a[rank]];
    const inverse = modPow(a[rank][col], p - 2, p);
    for (let j = col; j < a[rank].length; j += 1) a[rank][j] = Number(BigInt(a[rank][j]) * BigInt(inverse) % BigInt(p));
    for (let i = 0; i < a.length; i += 1) if (i !== rank && a[i][col] !== 0) {
      const factor = a[i][col];
      for (let j = col; j < a[i].length; j += 1) {
        a[i][j] = mod(a[i][j] - Number(BigInt(factor) * BigInt(a[rank][j]) % BigInt(p)), p);
      }
    }
    rank += 1;
  }
  return rank;
};

const combinations = (n, k) => {
  const out = [];
  const visit = (start, chosen) => {
    if (chosen.length === k) {
      out.push(chosen);
      return;
    }
    for (let i = start; i < n; i += 1) visit(i + 1, [...chosen, i]);
  };
  visit(0, []);
  return out;
};

assert.equal(rankMod(G, 1000003), 5);

// Every four columns are independent modulo a large prime, hence independent
// over Q. This proves no rational logical error can have weight <=4.
const fourSubsets = combinations(11, 4);
assert.equal(fourSubsets.length, 330);
for (const J of fourSubsets) assert.equal(rankMod(G.map((row) => J.map((j) => row[j])), 1000003), 4);

// Exact weight-five rational logical witness, scaled to an integer relation.
const witnessSupport = [1, 2, 3, 5, 6];
const witnessCoefficients = [-5, -10, 2, -1, 11];
const witness = Array(11).fill(0);
witnessSupport.forEach((j, i) => { witness[j] = witnessCoefficients[i]; });
assert.deepEqual(G.map((row) => dot(row, witness)), [0, 0, 0, 0, 0]);
assert.equal(witness.reduce((a, b) => a + b, 0), -3);
const rationalDistance = 5;

const logicalDistanceMod = (p, maximum = 6) => {
  for (let k = 1; k <= maximum; k += 1) {
    for (const J of combinations(11, k)) {
      const restricted = G.map((row) => J.map((j) => row[j]));
      const rank = rankMod(restricted, p);
      const augmented = [...restricted, Array(k).fill(1)];
      if (rankMod(augmented, p) > rank) return k;
    }
  }
  return null;
};

const sampledPrimeDistances = Object.fromEntries([2, 3, 5, 7, 11, 13, 17, 19].map((p) => [p, logicalDistanceMod(p)]));
assert.deepEqual(sampledPrimeDistances, { 2: 3, 3: 3, 5: 3, 7: 3, 11: 4, 13: 5, 17: 5, 19: 5 });

// Exact candidate bad primes: for each four-column set take the gcd of its
// five maximal minors. Only primes dividing one such gcd can lower a four-column
// rank. This proves distance >=5 for every prime >=13; the exact witness proves
// distance <=5 there.
const abs = (x) => x < 0n ? -x : x;
const gcd = (a, b) => {
  let x = abs(a), y = abs(b);
  while (y) [x, y] = [y, x % y];
  return x;
};
const determinantBareiss = (matrix) => {
  const a = matrix.map((row) => row.map(BigInt));
  let sign = 1n, previous = 1n;
  for (let k = 0; k < a.length - 1; k += 1) {
    let pivot = k;
    while (pivot < a.length && a[pivot][k] === 0n) pivot += 1;
    if (pivot === a.length) return 0n;
    if (pivot !== k) {
      [a[k], a[pivot]] = [a[pivot], a[k]];
      sign = -sign;
    }
    for (let i = k + 1; i < a.length; i += 1) {
      for (let j = k + 1; j < a.length; j += 1) {
        a[i][j] = (a[i][j] * a[k][k] - a[i][k] * a[k][j]) / previous;
      }
    }
    previous = a[k][k];
  }
  return sign * a[a.length - 1][a.length - 1];
};
const fourRows = combinations(5, 4);
const badPrimeCandidates = new Set();
for (const J of fourSubsets) {
  let minorGcd = 0n;
  for (const R of fourRows) {
    const minor = R.map((i) => J.map((j) => G[i][j]));
    minorGcd = gcd(minorGcd, determinantBareiss(minor));
  }
  let n = Number(minorGcd);
  for (let p = 2; p * p <= n; p += 1) if (n % p === 0) {
    badPrimeCandidates.add(p);
    while (n % p === 0) n /= p;
  }
  if (n > 1) badPrimeCandidates.add(n);
}
assert.deepEqual([...badPrimeCandidates].sort((a, b) => a - b), [2, 3, 5, 7, 11]);

// Construct the hyperbolic basis of 1^perp in I_{6,5}.
const e = [], f = [];
for (let i = 0; i < 5; i += 1) {
  const ei = Array(11).fill(0);
  ei[1 + i] = 1;
  ei[6 + i] = 1;
  e.push(ei);

  const fi = Array(11).fill(0);
  fi[0] = -1;
  fi[6 + i] = -1;
  for (let k = i + 1; k < 5; k += 1) {
    fi[1 + k] -= 1;
    fi[6 + k] -= 1;
  }
  f.push(fi);
}
assert.deepEqual(e.map((a) => e.map((b) => weightedDot(a, b))), Array.from({ length: 5 }, () => Array(5).fill(0)));
assert.deepEqual(f.map((a) => f.map((b) => weightedDot(a, b))), Array.from({ length: 5 }, () => Array(5).fill(0)));
assert.deepEqual(e.map((a) => f.map((b) => weightedDot(a, b))), Array.from({ length: 5 }, (_, i) => Array.from({ length: 5 }, (_, j) => Number(i === j))));

const reconstructedG = e.map((row, i) => row.map((x, coordinate) =>
  x + f.reduce((sum, fj, j) => sum + skewA[i][j] * fj[coordinate], 0)));
assert.deepEqual(reconstructedG, G);

// Exhaust the whole transverse graph chart over F3: all 3^10 skew matrices.
// Every resulting maximal isotropic space has P-distance at most 3.
const subsetsThroughFour = Object.fromEntries([1, 2, 3, 4].map((k) => [k, combinations(11, k)]));
const chartDistance = (matrix) => {
  for (let k = 1; k <= 4; k += 1) for (const J of subsetsThroughFour[k]) {
    const restricted = matrix.map((row) => J.map((j) => row[j]));
    const rank = rankMod(restricted, 3);
    if (rankMod([...restricted, Array(k).fill(1)], 3) > rank) return k;
  }
  return 5;
};
const chartDistanceCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
for (let code = 0; code < 3 ** 10; code += 1) {
  let remaining = code;
  const A = Array.from({ length: 5 }, () => Array(5).fill(0));
  for (let i = 0; i < 5; i += 1) for (let j = i + 1; j < 5; j += 1) {
    const a = remaining % 3;
    remaining = Math.floor(remaining / 3);
    A[i][j] = a;
    A[j][i] = mod(-a, 3);
  }
  const matrix = e.map((row, i) => row.map((x, coordinate) =>
    mod(x + f.reduce((sum, fj, j) => sum + A[i][j] * fj[coordinate], 0), 3)));
  chartDistanceCounts[chartDistance(matrix)] += 1;
}
assert.deepEqual(chartDistanceCounts, { 1: 3645, 2: 7290, 3: 48114, 4: 0, 5: 0 });

console.log(JSON.stringify({
  protocol: "signed-integral-distance-five-p-lattice/1",
  coefficients: mu,
  N,
  generatorMatrix: G,
  exactPConditions: {
    weightedLinearSumsZero: true,
    weightedGramZero: true,
    rank: 5,
  },
  rationalDistance: {
    value: rationalDistance,
    lowerBoundCertificate: "all 330 four-column subsets are independent modulo 1000003",
    weightFiveWitness: { support: witnessSupport, coefficients: witnessCoefficients, coefficientSum: -3 },
  },
  reductions: {
    sampledPrimeDistances,
    onlyPossibleFourColumnBadPrimes: [...badPrimeCandidates].sort((a, b) => a - b),
    theorem: "distance exactly 5 for every prime p >= 13",
  },
  qutritTransverseChart: {
    chart: "graphs of all 5x5 skew matrices over F3 in the displayed U^5 splitting",
    spacesChecked: 3 ** 10,
    distanceCounts: chartDistanceCounts,
    distanceFiveFound: false,
  },
  doublingConsequence: "With the integral fifteen-coordinate Standard-Model seed of logical exponent -1 and kappa=1, this gives a length-37 integral triorthogonal lattice whose reductions are [[37,1,5]]_p for every prime p>=13.",
  qutritBoundary: "The displayed lattice has distance 3 modulo 3; any signed integral ternary-Golay lift must leave this transverse U^5 chart.",
  passed: true,
}, null, 2));
