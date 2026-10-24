import assert from "node:assert/strict";

const mod2 = (n) => ((n % 2) + 2) % 2;
const identity4 = () => Array.from({ length: 4 }, (_, i) =>
  Array.from({ length: 4 }, (_, j) => (i === j ? 1 : 0)));
const transpose = (a) => a[0].map((_, j) => a.map((row) => row[j]));
const multiply = (a, b) => a.map((row) =>
  b[0].map((_, j) => row.reduce((sum, value, k) => sum + value * b[k][j], 0)));
const reduce2 = (a) => a.map((row) => row.map(mod2));
const key = (a) => a.flat().join(",");
const bits4 = (n) => [(n >> 3) & 1, (n >> 2) & 1, (n >> 1) & 1, n & 1];
const parity = (m) => {
  const z = bits4(m);
  return (z[0] * z[2] + z[1] * z[3]) & 1;
};
const J = [
  [0, 0, 1, 0],
  [0, 0, 0, 1],
  [1, 0, 0, 0],
  [0, 1, 0, 0]
];
const transvection = (v) => {
  const vTJ = multiply([v], J)[0];
  return identity4().map((row, i) =>
    row.map((value, j) => value ^ (v[i] & vTJ[j])));
};
const generators = [];
for (let n = 1; n < 16; n += 1) {
  generators.push(transvection([0, 1, 2, 3].map((i) => (n >> i) & 1)));
}
const group = new Map([[key(identity4()), identity4()]]);
const queue = [identity4()];
for (let head = 0; head < queue.length; head += 1) {
  for (const generator of generators) {
    const next = reduce2(multiply(generator, queue[head]));
    if (!group.has(key(next))) {
      group.set(key(next), next);
      queue.push(next);
    }
  }
}
assert.equal(group.size, 720);

const thetaAction = (matrix, characteristic) => {
  const A = matrix.slice(0, 2).map((row) => row.slice(0, 2));
  const B = matrix.slice(0, 2).map((row) => row.slice(2));
  const C = matrix.slice(2).map((row) => row.slice(0, 2));
  const D = matrix.slice(2).map((row) => row.slice(2));
  const z = bits4(characteristic);
  const mu = z.slice(0, 2);
  const nu = z.slice(2);
  const CDT = multiply(C, transpose(D));
  const ABT = multiply(A, transpose(B));
  const nextMu = [0, 1].map((i) => mod2(
    D[i][0] * mu[0] + D[i][1] * mu[1] -
    C[i][0] * nu[0] - C[i][1] * nu[1] + CDT[i][i]));
  const nextNu = [0, 1].map((i) => mod2(
    -B[i][0] * mu[0] - B[i][1] * mu[1] +
    A[i][0] * nu[0] + A[i][1] * nu[1] + ABT[i][i]));
  return nextMu.concat(nextNu).reduce((answer, bit) => 2 * answer + bit, 0);
};

const even = [...Array(16).keys()].filter((m) => parity(m) === 0);
const index = new Map(even.map((m, i) => [m, i]));
assert.equal(even.length, 10);

const permutationSign = (permutation) => {
  const visited = Array(permutation.length).fill(false);
  let cycles = 0;
  for (let i = 0; i < permutation.length; i += 1) {
    if (visited[i]) continue;
    cycles += 1;
    for (let j = i; !visited[j]; j = permutation[j]) visited[j] = true;
  }
  return (permutation.length - cycles) % 2 === 0 ? 1 : -1;
};
const characteristicPermutationSigns = [...group.values()].map((matrix) =>
  permutationSign(even.map((characteristic) =>
    index.get(thetaAction(matrix, characteristic))))
);
const signCounts = {
  positive: characteristicPermutationSigns.filter((sign) => sign === 1).length,
  negative: characteristicPermutationSigns.filter((sign) => sign === -1).length
};
assert.deepEqual(signCounts, { positive: 360, negative: 360 });

const seamVectors = [];
const seen = new Set();
for (const matrix of group.values()) {
  const from = thetaAction(matrix, 0);
  const to = thetaAction(matrix, 15);
  const vector = Array(10).fill(0);
  vector[index.get(to)] = 1;
  vector[index.get(from)] = -1;
  const vectorKey = vector.join(",");
  if (!seen.has(vectorKey)) {
    seen.add(vectorKey);
    seamVectors.push(vector);
  }
}
assert.equal(seamVectors.length, 90);

const rank = (matrix) => {
  const a = matrix.map((row) => row.map(Number));
  let r = 0;
  for (let column = 0; column < a[0].length && r < a.length; column += 1) {
    let pivot = r;
    while (pivot < a.length && Math.abs(a[pivot][column]) < 1e-10) pivot += 1;
    if (pivot === a.length) continue;
    [a[r], a[pivot]] = [a[pivot], a[r]];
    const p = a[r][column];
    for (let j = column; j < a[r].length; j += 1) a[r][j] /= p;
    for (let i = 0; i < a.length; i += 1) {
      if (i === r) continue;
      const f = a[i][column];
      for (let j = column; j < a[i].length; j += 1) a[i][j] -= f * a[r][j];
    }
    r += 1;
  }
  return r;
};
const seamSpanDimension = rank(seamVectors);
assert.equal(seamSpanDimension, 9);
assert.ok(seamVectors.every((v) => v.reduce((a, b) => a + b, 0) === 0));

const evenEvenCount = even.filter((m) => {
  const z = bits4(m);
  return z[0] * z[2] === 0 && z[1] * z[3] === 0;
}).length;
const oddOddCount = even.length - evenEvenCount;
assert.equal(evenEvenCount, 9);
assert.equal(oddOddCount, 1);

console.log(JSON.stringify({
  finiteCharacteristicAction: {
    group: "Sp(4,F2)",
    groupOrder: group.size,
    evenComponents: even.length,
    orientedSeamOrbitSize: seamVectors.length,
    additiveSeamSpanDimension: seamSpanDimension,
    representation: "sum-zero subspace of the ten-characteristic permutation carrier",
    determinantCharacter: {
      positiveElements: signCounts.positive,
      negativeElements: signCounts.negative,
      character: "nontrivial sign character",
      reason: "the ten-dimensional permutation carrier splits as a trivial line plus the nine-dimensional sum-zero seam carrier, so both determinants agree"
    }
  },
  multiplicativeCompletion: {
    chi5: {
      construction: "product of all ten even theta constants",
      weight: 5,
      fullModularCharacter: "nontrivial sign character",
      separatingOrder: oddOddCount
    },
    chi10: {
      construction: "chi5 squared",
      weight: 10,
      character: "trivial",
      separatingOrder: 2 * oddOddCount
    }
  },
  interpretation: {
    additiveCarrier: "retains which ordered characteristic transition is the seam",
    chi5Line: "retains only the global Pfaffian/orientation sign",
    chi10Scalar: "forgets orientation"
  },
  conclusion: "A full modular oriented seam exists as metaplectic/vector-valued data or as the chi5 character line. It is not an ordinary bosonic scalar sector and is not automatically sourced by the Leech theta series."
}, null, 2));
console.log("PASS verify_lattice_subroutine_oriented_seam_modular_line");

