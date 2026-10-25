import assert from "node:assert/strict";
import fs from "node:fs";

const evidencePath = new URL(
  "../../evidence/data/z9-discrete-screw-and-paired-twist-helix-v1.json",
  import.meta.url,
);
const evidence = JSON.parse(fs.readFileSync(evidencePath, "utf8"));

assert.equal(
  evidence.schemaVersion,
  "z9-discrete-screw-and-paired-twist-helix-v1",
);

const mod = (value, modulus) => ((value % modulus) + modulus) % modulus;
const gcd = (a, b) => {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) [x, y] = [y, x % y];
  return x;
};
const gcdAll = (values) => values.reduce((acc, value) => gcd(acc, value), 0);

function smith2(matrix) {
  const [[a, b], [c, d]] = matrix;
  const determinant = Math.abs(a * d - b * c);
  const d1 = gcdAll([a, b, c, d]);
  return [d1, determinant / d1];
}

for (const record of evidence.kMatrices) {
  assert.deepEqual(smith2(record.matrix), record.smith);
  assert.equal(Math.abs(
    record.matrix[0][0] * record.matrix[1][1]
      - record.matrix[0][1] * record.matrix[1][0],
  ), 9);
}

const carry = (p, a, b) => mod(p * Math.floor((a + b) / 3), 3);
for (const p of [0, 1, 2]) {
  for (const a of [0, 1, 2]) {
    for (const b of [0, 1, 2]) {
      for (const c of [0, 1, 2]) {
        const left = mod(carry(p, a, b) + carry(p, mod(a + b, 3), c), 3);
        const right = mod(carry(p, b, c) + carry(p, a, mod(b + c, 3)), 3);
        assert.equal(left, right, `cocycle failure for p=${p}, ${a},${b},${c}`);
      }
    }
  }
}

function step(p, [q, fibre]) {
  return [mod(q + 1, 3), mod(fibre + (q === 2 ? p : 0), 3)];
}
function applyStep(p, state, count) {
  let result = [...state];
  for (let index = 0; index < count; index += 1) result = step(p, result);
  return result;
}
function permutationCycles(p) {
  const states = [];
  for (let q = 0; q < 3; q += 1) {
    for (let fibre = 0; fibre < 3; fibre += 1) states.push([q, fibre]);
  }
  const key = ([q, fibre]) => `${q},${fibre}`;
  const unseen = new Set(states.map(key));
  const cycles = [];
  for (const state of states) {
    if (!unseen.has(key(state))) continue;
    const cycle = [];
    let cursor = state;
    do {
      cycle.push(cursor);
      unseen.delete(key(cursor));
      cursor = step(p, cursor);
    } while (key(cursor) !== key(state));
    cycles.push(cycle);
  }
  return cycles;
}

for (const p of [0, 1, 2]) {
  for (let q = 0; q < 3; q += 1) {
    for (let fibre = 0; fibre < 3; fibre += 1) {
      assert.deepEqual(applyStep(p, [q, fibre], 3), [q, mod(fibre + p, 3)]);
      assert.deepEqual(applyStep(p, [q, fibre], 9), [q, fibre]);
    }
  }
}

assert.deepEqual(permutationCycles(0).map((cycle) => cycle.length).sort(), [3, 3, 3]);
assert.deepEqual(permutationCycles(1).map((cycle) => cycle.length), [9]);
assert.deepEqual(permutationCycles(2).map((cycle) => cycle.length), [9]);

const reflectFibre = ([q, fibre]) => [q, mod(-fibre, 3)];
for (let q = 0; q < 3; q += 1) {
  for (let fibre = 0; fibre < 3; fibre += 1) {
    const state = [q, fibre];
    assert.deepEqual(reflectFibre(reflectFibre(state)), state);
    assert.deepEqual(
      reflectFibre(step(1, reflectFibre(state))),
      step(2, state),
    );
  }
}
assert.equal(evidence.minimalPairedEmulator.dimension, 18);

function pairedStep([strand, q, fibre]) {
  const p = strand === "+" ? 1 : 2;
  const [nextQ, nextFibre] = step(p, [q, fibre]);
  return [strand, nextQ, nextFibre];
}
function exchangeStrand([strand, q, fibre]) {
  return [strand === "+" ? "-" : "+", q, mod(-fibre, 3)];
}
for (const strand of ["+", "-"]) {
  for (let q = 0; q < 3; q += 1) {
    for (let fibre = 0; fibre < 3; fibre += 1) {
      const state = [strand, q, fibre];
      assert.deepEqual(exchangeStrand(exchangeStrand(state)), state);
      assert.deepEqual(
        exchangeStrand(pairedStep(state)),
        pairedStep(exchangeStrand(state)),
      );
    }
  }
}

// The discriminant-group quotient maps for p=1,2 are phi_p(x,y)=x+3py mod 9.
for (const p of [1, 2]) {
  const phi = ([x, y]) => mod(x + 3 * p * y, 9);
  assert.equal(phi([0, 3]), 0);
  assert.equal(phi([3, 2 * p]), 0);
  assert.equal(phi([1, 0]), 1);
  assert.equal(phi([0, 1]), mod(3 * p, 9));
}

const T = (n) => mod(n + 1, 9);
const T4 = (n) => mod(n + 4, 9);
const D = (n) => mod(2 * n, 9);
const Dinv = (n) => mod(5 * n, 9);
const iterate = (fn, value, count) => {
  let result = value;
  for (let index = 0; index < count; index += 1) result = fn(result);
  return result;
};

for (let n = 0; n < 9; n += 1) {
  assert.equal(T4(n), iterate(T, n, 4));
  assert.equal(Dinv(D(n)), n);
  assert.equal(D(T(Dinv(n))), iterate(T, n, 2));
  assert.equal(iterate(T, n, 9), n);
  assert.equal(iterate(D, n, 6), n);
  assert.equal(iterate(D, n, 3), mod(-n, 9));
}
assert.equal(evidence.affineAction.order, 9 * 6);

const summary = {
  status: "PASS",
  smith: Object.fromEntries(evidence.kMatrices.map(({ p, smith }) => [p, smith])),
  cycleLengths: {
    split: permutationCycles(0).map((cycle) => cycle.length),
    positiveScrew: permutationCycles(1).map((cycle) => cycle.length),
    negativeScrew: permutationCycles(2).map((cycle) => cycle.length),
  },
  cubicReturns: {
    p0: applyStep(0, [0, 0], 3),
    p1: applyStep(1, [0, 0], 3),
    pMinus1: applyStep(2, [0, 0], 3),
  },
  affineGroupOrder: evidence.affineAction.order,
  pairedEmulator: {
    dimension: evidence.minimalPairedEmulator.dimension,
    involutiveExchange: true,
    exchangeCommutesWithPairedStep: true,
  },
  verdict: evidence.verdict,
};

console.log(JSON.stringify(summary));
