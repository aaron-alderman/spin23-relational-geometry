import assert from "node:assert/strict";

const weights = [];
for (let mask = 0; mask < 32; mask += 1) {
  const q = Array.from({ length: 5 }, (_, i) => ((mask >> i) & 1) ? -1 : 1);
  if (q.filter((x) => x < 0).length % 2 === 0) weights.push(q);
}
assert.equal(weights.length, 16);
const key = (q) => q.join(",");
const index = new Map(weights.map((q, i) => [key(q), i]));
const sigma = (q) => q.map((x, i) => i === 3 ? x : -x); // flips 1,2,3,5; leaves 4
const t3L2 = (q) => (q[3] - q[4]) / 2; // 2 T_3L
const t3R2 = (q) => (q[3] + q[4]) / 2; // 2 T_3R
const zchir = (q) => q[3] * q[4];

let plus = 0;
let minus = 0;
for (const q of weights) {
  const image = sigma(q);
  assert(index.has(key(image)));
  assert.deepEqual(sigma(image), q);
  assert.equal(t3L2(q) ** 2 + t3R2(q) ** 2, 1);
  assert.equal(zchir(q), t3R2(q) ** 2 - t3L2(q) ** 2);
  assert.equal(t3L2(q) ** 2, (1 - zchir(q)) / 2);
  assert.equal(t3R2(q) ** 2, (1 + zchir(q)) / 2);
  assert.equal(zchir(image), -zchir(q));
  if (zchir(q) === 1) plus += 1;
  else minus += 1;
}
assert.equal(plus, 8);
assert.equal(minus, 8);

// Matrix certificate: S is the Dirac-pair permutation and Z is chirality parity.
const S = Array.from({ length: 16 }, () => Array(16).fill(0));
const Z = Array.from({ length: 16 }, () => Array(16).fill(0));
for (let i = 0; i < 16; i += 1) {
  S[index.get(key(sigma(weights[i])))][i] = 1;
  Z[i][i] = zchir(weights[i]);
}
const mm = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const I = Array.from({ length: 16 }, (_, i) => Array.from({ length: 16 }, (_, j) => Number(i === j)));
assert.deepEqual(mm(S, S), I);
assert.deepEqual(mm(Z, Z), I);
assert.deepEqual(add(mm(S, Z), mm(Z, S)), Array.from({ length: 16 }, () => Array(16).fill(0)));

// Puncturing nu^c=(+,+,+,+,+) removes one Z=+ state and destroys closure under S.
const nuC = [1, 1, 1, 1, 1];
const nu = sigma(nuC);
assert.deepEqual(nu, [-1, -1, -1, 1, -1]);
assert.equal(zchir(nuC), 1);
assert.equal(zchir(nu), -1);
const retained = weights.filter((q) => key(q) !== key(nuC));
assert.equal(retained.filter((q) => zchir(q) === 1).length, 7);
assert.equal(retained.filter((q) => zchir(q) === -1).length, 8);
assert(!retained.some((q) => key(q) === key(nuC)));
assert(retained.some((q) => key(q) === key(nu)));
assert(!retained.every((q) => retained.some((r) => key(r) === key(sigma(q)))));

console.log(JSON.stringify({
  protocol: "weak-isospin-square-supplies-topology-parity/1",
  completeGeneration: 16,
  exchange: "S=sigma: flip q1,q2,q3,q5",
  parity: "Z_chir=(2T3R)^2-(2T3L)^2=q4 q5",
  leftProjector: "P_L=(2T3L)^2=(1-Z_chir)/2",
  rightProjector: "P_R=(2T3R)^2=(1+Z_chir)/2",
  pauliRelations: ["S^2=I", "Z_chir^2=I", "{S,Z_chir}=0"],
  multiplicitiesBeforePuncture: { plus, minus },
  afterNuCPuncture: { plus: 7, minus: 8 },
  punctureEffect: "nu remains without its Dirac partner nu^c, so the 15-state code is not closed under S",
  interpretation: "The full generation is C^2_topology tensor C^8_pair; puncturing moves one member of a topology pair into the logical/environment sector.",
  passed: true
}, null, 2));
