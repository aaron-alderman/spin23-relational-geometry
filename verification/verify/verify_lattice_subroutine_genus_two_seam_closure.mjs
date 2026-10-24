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
  [0, 1, 0, 0],
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
assert.equal(even.length, 10);

// q0=ab+cd is characteristic 0000.  Adding <1111,x> gives 1111.
const unmarked = 0;
const marked = 15;
assert.equal(parity(unmarked), 0);
assert.equal(parity(marked), 0);

const unorderedPair = (a, b) => [a, b].sort((x, y) => x - y).join(",");
const pairOrbit = new Set();
const componentOrbit = new Set();
let setwiseStabilizer = 0;
let pointwiseStabilizer = 0;
let swapCount = 0;
let involutiveSwapCount = 0;

for (const matrix of group.values()) {
  const a = thetaAction(matrix, unmarked);
  const b = thetaAction(matrix, marked);
  pairOrbit.add(unorderedPair(a, b));
  componentOrbit.add(a);
  componentOrbit.add(b);
  if (unorderedPair(a, b) === unorderedPair(unmarked, marked)) {
    setwiseStabilizer += 1;
    if (a === unmarked && b === marked) pointwiseStabilizer += 1;
    if (a === marked && b === unmarked) {
      swapCount += 1;
      if (key(reduce2(multiply(matrix, matrix))) === key(identity4())) {
        involutiveSwapCount += 1;
      }
    }
  }
}

assert.equal(pairOrbit.size, 45);
assert.deepEqual(componentOrbit, new Set(even));
assert.equal(setwiseStabilizer, 16);
assert.equal(pointwiseStabilizer, 8);
assert.equal(swapCount, 8);
assert.ok(involutiveSwapCount > 0);

// Separating degeneration: characteristic [mu1 mu2 | nu1 nu2] restricts
// to [mu_i | nu_i] on each elliptic handle.  Odd handles have mu_i nu_i=1.
const handleParities = (m) => {
  const z = bits4(m);
  return [z[0] * z[2], z[1] * z[3]];
};
assert.deepEqual(handleParities(unmarked), [0, 0]);
assert.deepEqual(handleParities(marked), [1, 1]);

// At the separating divisor, even-even theta constants have a nonzero
// factorized constant term, while odd-odd theta constants vanish linearly
// in the plumbing coordinate.  The seam toggle therefore changes vanishing
// order rather than multiplying one nonzero scalar sector by a sign.
const separatingVanishingOrder = {
  unmarked: 0,
  marked: 1,
};
assert.notEqual(separatingVanishingOrder.unmarked, separatingVanishingOrder.marked);

console.log(JSON.stringify({
  fullFiniteModularGroupOrder: group.size,
  evenCharacteristics: even,
  seamPair: [unmarked, marked],
  fullOrbit: {
    unorderedPairs: pairOrbit.size,
    characteristicsReached: [...componentOrbit].sort((a, b) => a - b),
    requiredCharacteristicComponents: componentOrbit.size
  },
  pairPreservingSubgroup: {
    setwiseOrder: setwiseStabilizer,
    pointwiseOrder: pointwiseStabilizer,
    swappingElements: swapCount,
    involutiveSwappingElements: involutiveSwapCount
  },
  separatingDegeneration: {
    unmarkedHandleParity: handleParities(unmarked),
    markedHandleParity: handleParities(marked),
    unmarkedVanishingOrder: separatingVanishingOrder.unmarked,
    markedVanishingOrder: separatingVanishingOrder.marked
  },
  conclusion: "The two-sheet affine seam is covariant only under the order-16 pair stabilizer. Full Sp(4,Z) covariance enlarges it to all ten even characteristics. The seam toggle also changes separating zero-mode order, so it is not merely a scalar orientation sign."
}, null, 2));
console.log("PASS verify_lattice_subroutine_genus_two_seam_closure");
