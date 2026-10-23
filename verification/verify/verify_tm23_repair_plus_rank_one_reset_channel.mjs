import assert from "node:assert/strict";

const labels = ["A0", "A1", "A2", "B0", "B1", "B2"];
const index = new Map(labels.map((label, i) => [label, i]));
const actual = {
  A0: "B1",
  A1: "A2",
  A2: "A1",
  B0: "A2",
  B1: "B2",
  B2: "A0",
};
const repaired = { ...actual, A1: "B0" };
const reset = Object.fromEntries(labels.map((label) => [label, label]));
reset.B0 = "A2";

for (const label of labels) assert.equal(reset[repaired[label]], actual[label]);
for (const label of labels) assert.equal(reset[reset[label]], reset[label]);

function mapMatrix(mapping) {
  return Array.from({ length: labels.length }, (_, row) =>
    Array.from({ length: labels.length }, (_, column) =>
      row === index.get(mapping[labels[column]]) ? 1 : 0));
}
function multiply(a, b) {
  return a.map((row) => b[0].map((_, j) =>
    row.reduce((sum, value, k) => sum + value * b[k][j], 0)));
}
function transpose(matrix) {
  return matrix[0].map((_, j) => matrix.map((row) => row[j]));
}
function add(a, b) {
  return a.map((row, i) => row.map((value, j) => value + b[i][j]));
}
function identity(n) {
  return Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)));
}
function rank(matrix) {
  const reduced = matrix.map((row) => [...row]);
  let rankValue = 0;
  for (let column = 0; column < reduced[0].length && rankValue < reduced.length; column += 1) {
    let pivot = rankValue;
    while (pivot < reduced.length && Math.abs(reduced[pivot][column]) < 1e-12) pivot += 1;
    if (pivot === reduced.length) continue;
    [reduced[rankValue], reduced[pivot]] = [reduced[pivot], reduced[rankValue]];
    const divisor = reduced[rankValue][column];
    for (let j = column; j < reduced[0].length; j += 1) reduced[rankValue][j] /= divisor;
    for (let i = 0; i < reduced.length; i += 1) {
      if (i === rankValue) continue;
      const factor = reduced[i][column];
      for (let j = column; j < reduced[0].length; j += 1) {
        reduced[i][j] -= factor * reduced[rankValue][j];
      }
    }
    rankValue += 1;
  }
  return rankValue;
}

const U = mapMatrix(repaired);
const R = mapMatrix(reset);
const P = mapMatrix(actual);
assert.deepEqual(multiply(R, U), P);
assert.deepEqual(multiply(transpose(U), U), identity(6));
assert.deepEqual(multiply(R, R), R);
assert.equal(rank(U), 6);
assert.equal(rank(R), 5);
assert.equal(rank(P), 5);

// Minimal CPTP extension of the reset: preserve the five-dimensional
// complement coherently and damp |B0> completely into |A2>.
const K0 = identity(6);
K0[index.get("B0")][index.get("B0")] = 0;
const K1 = Array.from({ length: 6 }, () => Array(6).fill(0));
K1[index.get("A2")][index.get("B0")] = 1;
assert.deepEqual(
  add(multiply(transpose(K0), K0), multiply(transpose(K1), K1)),
  identity(6),
);
assert.equal(rank([K0.flat(), K1.flat()]), 2);

function outer(column, row) {
  return column.map((value) => row.map((other) => value * other));
}
function column(matrix, j) {
  return matrix.map((row) => row[j]);
}
function channel(matrix) {
  return [K0, K1].reduce(
    (answer, kraus) => add(answer, multiply(multiply(kraus, matrix), transpose(kraus))),
    Array.from({ length: 6 }, () => Array(6).fill(0)),
  );
}

// The channel is itself an idempotent superoperator.  Its image is the full
// operator algebra on the five-dimensional B0-orthogonal subspace: 25 fixed
// operator directions and an 11-dimensional erased kernel.
const matrixUnits = [];
for (let i = 0; i < 6; i += 1) {
  for (let j = 0; j < 6; j += 1) {
    const unit = Array.from({ length: 6 }, () => Array(6).fill(0));
    unit[i][j] = 1;
    matrixUnits.push(unit);
    assert.deepEqual(channel(channel(unit)), channel(unit));
  }
}
const superoperator = Array.from({ length: 36 }, (_, row) =>
  matrixUnits.map((unit) => channel(unit).flat()[row]));
assert.equal(rank(superoperator), 25);
for (let i = 0; i < 6; i += 1) {
  if (i === index.get("B0")) continue;
  for (let j = 0; j < 6; j += 1) {
    if (j === index.get("B0")) continue;
    assert.deepEqual(channel(matrixUnits[6 * i + j]), matrixUnits[6 * i + j]);
  }
}

function trace(matrix) {
  return matrix.reduce((sum, row, i) => sum + row[i], 0);
}
function complementaryChannel(matrix) {
  return [K0, K1].map((leftKraus) => [K0, K1].map((rightKraus) =>
    trace(multiply(multiply(leftKraus, matrix), transpose(rightKraus)))));
}

// On span{|A2>,|B0>} the system is reset to |A2>, while the complete input
// qubit is transferred coherently to the environment.  Thus the reset exports
// information; the joint unitary does not destroy it.
const seamQubit = Array(6).fill(0);
seamQubit[index.get("A2")] = 3 / 5;
seamQubit[index.get("B0")] = 4 / 5;
const seamDensity = outer(seamQubit, seamQubit);
const a2Ket = Array(6).fill(0);
a2Ket[index.get("A2")] = 1;
assert.deepEqual(channel(seamDensity), outer(a2Ket, a2Ket));
const expectedEnvironmentQubit = [
  [9 / 25, 12 / 25],
  [12 / 25, 16 / 25],
];
const environmentQubit = complementaryChannel(seamDensity);
for (let i = 0; i < 2; i += 1) {
  for (let j = 0; j < 2; j += 1) {
    assert.ok(Math.abs(environmentQubit[i][j] - expectedEnvironmentQubit[i][j]) < 1e-12);
  }
}
for (const label of labels) {
  const ket = Array(6).fill(0);
  ket[index.get(label)] = 1;
  const afterU = multiply(U, ket.map((value) => [value])).map(([value]) => value);
  const density = outer(afterU, afterU);
  const output = channel(density);
  const expected = Array(6).fill(0);
  expected[index.get(actual[label])] = 1;
  assert.deepEqual(output, outer(expected, expected));
}

// Minimal Stinespring dilation.  Start a qubit environment in |0> and swap
// |B0,0> with |A2,1>.  Tracing the qubit produces exactly K0,K1 (the phase of
// K1 is irrelevant and can be supplied by a resonant exchange Hamiltonian).
const jointDimension = 12;
const jointIndex = (system, environment) => 2 * system + environment;
const collisionUnitary = identity(jointDimension);
const b0Vacuum = jointIndex(index.get("B0"), 0);
const a2Excited = jointIndex(index.get("A2"), 1);
collisionUnitary[b0Vacuum][b0Vacuum] = 0;
collisionUnitary[a2Excited][a2Excited] = 0;
collisionUnitary[b0Vacuum][a2Excited] = 1;
collisionUnitary[a2Excited][b0Vacuum] = 1;
assert.deepEqual(
  multiply(transpose(collisionUnitary), collisionUnitary),
  identity(jointDimension),
);
const dilatedKraus = [0, 1].map((environmentOutput) =>
  Array.from({ length: 6 }, (_, systemOutput) =>
    Array.from({ length: 6 }, (_, systemInput) =>
      collisionUnitary[
        jointIndex(systemOutput, environmentOutput)
      ][jointIndex(systemInput, 0)])));
assert.deepEqual(dilatedKraus, [K0, K1]);

// A finite-rate amplitude-damping Lindblad semigroup with jump
// |A2><B0| retains exp(-gamma*t)>0 of the B0 population for every finite
// gamma*t.  The exact deterministic reset is therefore a collision/full-swap
// step (or the infinite-time/singular-rate limit), not a generic finite-time
// homogeneous Markov decay.
for (const gammaTime of [0.1, 1, 10, 100]) {
  assert.ok(Math.exp(-gammaTime) > 0);
}

// Direction partition is preserved by both the repaired gate and reset.
const left = new Set(["B0", "A1", "A2"]);
for (const mapping of [repaired, reset, actual]) {
  for (const label of labels) assert.equal(left.has(mapping[label]), left.has(label));
}

function iterate(mapping, start, steps) {
  let current = start;
  for (let i = 0; i < steps; i += 1) current = mapping[current];
  return current;
}
const repairedCycles = [
  ["A0", "B1", "B2"],
  ["A1", "B0", "A2"],
];
for (const cycle of repairedCycles) {
  for (const label of cycle) assert.equal(iterate(repaired, label, 3), label);
}
assert.equal(iterate(actual, "A1", 2), "A1");
assert.equal(iterate(actual, "A2", 2), "A2");
assert.notEqual(iterate(actual, "B0", 6), "B0");
for (const label of ["A0", "B1", "B2"]) assert.equal(iterate(actual, label, 3), label);

console.log(JSON.stringify({
  exactFactorization: "P_actual = R_(B0->A2) * U_repaired",
  repairedDynamics: "C3 disjoint union C3",
  actualDynamics: "C3 disjoint union C2 with one depth-one transient",
  ranks: { repaired: rank(U), reset: rank(R), actual: rank(P) },
  quantumReset: {
    krausRank: 2,
    K0: "I-|B0><B0|",
    K1: "|A2><B0|",
    tracePreserving: true,
    unital: false,
    effect: "erase coherences involving B0 and transfer its population to A2",
  },
  superoperator: {
    idempotent: true,
    fixedOperatorDimension: rank(superoperator),
    kernelDimension: 36 - rank(superoperator),
    noiselessSystemDimension: 5,
    entanglementBreaking: false,
  },
  minimalDilation: {
    environmentDimension: 2,
    collision:
      "swap |B0,0_env> with |A2,1_env>, then trace the environment",
    exactAtFiniteStep: true,
    repeatedDynamics: "requires a fresh/reset environment qubit per TM step",
    seamQubitTransfer:
      "alpha|A2>+beta|B0> becomes |A2> tensor (alpha|0>+beta|1>)",
  },
  lindbladBoundary: {
    jump: "L=|A2><B0|",
    finiteRateFiniteTimeExactReset: false,
    survivalPopulation: "exp(-gamma*t)",
    exactLimits: ["full collision swap", "gamma*t -> infinity"],
  },
  preservedDatum: "left/right direction partition and q_direction",
  interpretation:
    "the irreversible machine is the selected symplectic gate followed by one rank-one open-system reset defect",
}, null, 2));
console.log("PASS verify_tm23_repair_plus_rank_one_reset_channel");
