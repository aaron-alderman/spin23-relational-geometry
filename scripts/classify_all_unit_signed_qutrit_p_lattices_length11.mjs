import assert from "node:assert/strict";

const p = 3;
const n = 5;
const mod = (x) => ((x % p) + p) % p;

const inverse = (x) => {
  assert.notEqual(mod(x), 0);
  return mod(x) === 1 ? 1 : 2;
};

const rref = (matrix) => {
  const a = matrix.map((row) => row.map(mod));
  let rank = 0;
  for (let col = 0; col < (a[0]?.length ?? 0) && rank < a.length; col += 1) {
    let pivot = rank;
    while (pivot < a.length && a[pivot][col] === 0) pivot += 1;
    if (pivot === a.length) continue;
    [a[rank], a[pivot]] = [a[pivot], a[rank]];
    const inv = inverse(a[rank][col]);
    for (let j = col; j < a[rank].length; j += 1) a[rank][j] = mod(inv * a[rank][j]);
    for (let i = 0; i < a.length; i += 1) {
      if (i === rank || a[i][col] === 0) continue;
      const factor = a[i][col];
      for (let j = col; j < a[i].length; j += 1) a[i][j] = mod(a[i][j] - factor * a[rank][j]);
    }
    rank += 1;
  }
  return a.slice(0, rank);
};

const rank = (matrix) => rref(matrix).length;
const key = (matrix) => rref(matrix).map((row) => row.join("")).join("|");
const fromKey = (value) => value.split("|").map((row) => [...row].map(Number));

const hyperbolicPair = (a, b) => {
  let out = 0;
  for (let i = 0; i < n; i += 1) out += a[i] * b[n + i] + a[n + i] * b[i];
  return mod(out);
};

// Twenty skew-root moves, eight elementary GL(5) moves, and the full swap.
// These generate the full orbit of maximal totally isotropic five-spaces.
const generators = [];
for (let i = 0; i < n; i += 1) for (let j = i + 1; j < n; j += 1) {
  generators.push({ type: "upper", i, j });
  generators.push({ type: "lower", i, j });
}
for (let i = 0; i < n - 1; i += 1) {
  generators.push({ type: "gl", i, j: i + 1 });
  generators.push({ type: "gl", i: i + 1, j: i });
}
generators.push({ type: "swap" });
assert.equal(generators.length, 29);

const actRow = (row, g) => {
  const out = [...row];
  if (g.type === "upper") {
    out[g.i] = mod(row[g.i] + row[n + g.j]);
    out[g.j] = mod(row[g.j] - row[n + g.i]);
  } else if (g.type === "lower") {
    out[n + g.i] = mod(row[n + g.i] + row[g.j]);
    out[n + g.j] = mod(row[n + g.j] - row[g.i]);
  } else if (g.type === "gl") {
    out[g.j] = mod(row[g.j] + row[g.i]);
    out[n + g.i] = mod(row[n + g.i] - row[n + g.j]);
  } else {
    for (let i = 0; i < n; i += 1) {
      out[i] = row[n + i];
      out[n + i] = row[i];
    }
  }
  return out;
};

const act = (matrix, g) => rref(matrix.map((row) => actRow(row, g)));

// Hyperbolic basis of the complement of the all-ones vector in
// diag(+,+,+,+,+,+,-,-,-,-,-) over F_3.
const mu = [1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1];
const e = [];
const f = [];
for (let i = 0; i < n; i += 1) {
  const ei = Array(11).fill(0);
  ei[1 + i] = 1;
  ei[6 + i] = 1;
  e.push(ei.map(mod));

  const fi = Array(11).fill(0);
  fi[0] = -1;
  fi[6 + i] = -1;
  for (let k = i + 1; k < n; k += 1) {
    fi[1 + k] -= 1;
    fi[6 + k] -= 1;
  }
  f.push(fi.map(mod));
}

const weightedPair = (a, b) => mod(a.reduce((sum, x, i) => sum + mu[i] * x * b[i], 0));
assert.deepEqual(e.map((a) => e.map((b) => weightedPair(a, b))), Array.from({ length: n }, () => Array(n).fill(0)));
assert.deepEqual(f.map((a) => f.map((b) => weightedPair(a, b))), Array.from({ length: n }, () => Array(n).fill(0)));
assert.deepEqual(e.map((a) => f.map((b) => weightedPair(a, b))), Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => Number(i === j))));

const toElevenCoordinates = (matrix) => matrix.map((row) => Array.from({ length: 11 }, (_, coordinate) => {
  let value = 0;
  for (let i = 0; i < n; i += 1) value += row[i] * e[i][coordinate] + row[n + i] * f[i][coordinate];
  return mod(value);
}));

const combinations = (length, size) => {
  const out = [];
  const visit = (start, selected) => {
    if (selected.length === size) {
      out.push(selected);
      return;
    }
    for (let i = start; i < length; i += 1) visit(i + 1, [...selected, i]);
  };
  visit(0, []);
  return out;
};

const supports = Object.fromEntries([1, 2, 3, 4].map((weight) => [weight, combinations(11, weight)]));
const pDistance = (matrix) => {
  for (let weight = 1; weight <= 4; weight += 1) {
    for (const support of supports[weight]) {
      const restricted = matrix.map((row) => support.map((j) => row[j]));
      const baseRank = rank(restricted);
      if (rank([...restricted, Array(weight).fill(1)]) > baseRank) return weight;
    }
  }
  return 5;
};

const start = Array.from({ length: n }, (_, i) => Array.from({ length: 2 * n }, (_, j) => Number(i === j)));
const startKey = key(start);
const seen = new Set([startKey]);
const queue = [startKey];
const distanceCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
const intersectionCounts = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

for (let head = 0; head < queue.length; head += 1) {
  const matrix = fromKey(queue[head]);
  assert.equal(matrix.length, 5);
  assert(matrix.every((a) => matrix.every((b) => hyperbolicPair(a, b) === 0)));

  const eleven = toElevenCoordinates(matrix);
  distanceCounts[pDistance(eleven)] += 1;
  const yRank = rank(matrix.map((row) => row.slice(n)));
  intersectionCounts[n - yRank] += 1;

  for (const generator of generators) {
    const nextKey = key(act(matrix, generator));
    if (!seen.has(nextKey)) {
      seen.add(nextKey);
      queue.push(nextKey);
    }
  }
  if ((head + 1) % 20000 === 0) console.log("classification_progress=" + (head + 1) + "/" + queue.length);
}

const expectedPerFamily = [1, 2, 3, 4].reduce((product, i) => product * (p ** i + 1), 1);
const expectedTotal = 2 * expectedPerFamily;
assert.equal(expectedPerFamily, 91840);
assert.equal(expectedTotal, 183680);
assert.equal(seen.size, expectedTotal);
assert.deepEqual(distanceCounts, { 1: 13440, 2: 22400, 3: 147840, 4: 0, 5: 0 });

console.log(JSON.stringify({
  protocol: "all-unit-signed-qutrit-p-lattices-length11/1",
  field: "F_3",
  coefficientPattern: "six +1 and five -1",
  quadraticSpace: "the split ten-dimensional space 1^perp isomorphic to H^5",
  generators: generators.length,
  expectedPerOrthogonalFamily: expectedPerFamily,
  expectedTotal,
  spacesEnumerated: seen.size,
  intersectionDimensionWithReferenceLagrangian: intersectionCounts,
  pDistanceCounts: distanceCounts,
  maximumDistance: 3,
  lowerRankConsequence: "Every lower-rank totally isotropic S extends to a maximal M. Since M^perp is contained in S^perp, a weight-at-most-three logical witness for M is also one for S. Hence every rank has distance at most three.",
  theorem: "No unit-signed length-eleven qutrit P-code with N=+/-1 has distance four or five.",
  passed: true,
}, null, 2));
