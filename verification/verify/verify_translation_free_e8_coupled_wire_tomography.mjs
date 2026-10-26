import assert from "node:assert/strict";
import fs from "node:fs";

const evidence = JSON.parse(fs.readFileSync(new URL(
  "../../evidence/data/translation-free-e8-coupled-wire-tomography-v1.json",
  import.meta.url,
), "utf8"));

const K = [
  [2,-1,0,0,0,0,0,0],
  [-1,2,-1,0,0,0,0,0],
  [0,-1,2,-1,0,0,0,-1],
  [0,0,-1,2,-1,0,0,0],
  [0,0,0,-1,2,-1,0,0],
  [0,0,0,0,-1,2,-1,0],
  [0,0,0,0,0,-1,2,0],
  [0,0,-1,0,0,0,0,2],
];

const dot = (a, b) => a.reduce((sum, x, i) => sum + x * b[i], 0);
const matVec = (A, x) => A.map(row => dot(row, x));
const inner = (a, b) => dot(a, matVec(K, b));
const key = vector => vector.join(",");

assert.equal(evidence.schemaVersion, "translation-free-e8-coupled-wire-tomography-v1");
assert.equal(evidence.carrier.rank, 8);
assert.equal(evidence.carrier.wires, 7);
assert.equal(evidence.carrier.modesPerWire, 16);
assert.equal(evidence.carrier.interactions, 48);

// Generate the complete E8 root shell from the eight declared simple roots.
// In simple-root coordinates a Weyl reflection is
// s_i(v) = v - (v,K e_i)e_i = v - (Kv)_i e_i.
const roots = new Map();
const queue = [];
for (let i = 0; i < 8; i += 1) {
  for (const sign of [-1, 1]) {
    const root = Array(8).fill(0);
    root[i] = sign;
    roots.set(key(root), root);
    queue.push(root);
  }
}
for (let cursor = 0; cursor < queue.length; cursor += 1) {
  const root = queue[cursor];
  const Kr = matVec(K, root);
  for (let i = 0; i < 8; i += 1) {
    const reflected = [...root];
    reflected[i] -= Kr[i];
    if (!roots.has(key(reflected))) {
      roots.set(key(reflected), reflected);
      queue.push(reflected);
    }
  }
}
assert.equal(roots.size, 240);
for (const root of roots.values()) assert.equal(inner(root, root), 2);

// Exact pair-distribution fingerprint for ordered distinct roots.
const pairCounts = new Map();
for (const a of roots.values()) {
  for (const b of roots.values()) {
    if (a === b) continue;
    const product = inner(a, b);
    pairCounts.set(product, (pairCounts.get(product) ?? 0) + 1);
  }
}
const pairDistribution = Object.fromEntries([...pairCounts.entries()].sort((a,b) => a[0] - b[0]));
assert.deepEqual(pairDistribution, evidence.tomography.orderedDistinctRootPairInnerProducts);

// Coupled-wire null vectors: the same K column couples R_y to L_{y+1}.
// Their bilinear is K_IJ - K_IJ=0 on a bond, and disjoint bonds either do
// not overlap or overlap on opposite fields, so the full family is null.
const wires = evidence.carrier.wires;
const dimensions = wires * 16;
const interactions = [];
for (let y = 0; y < wires - 1; y += 1) {
  for (let i = 0; i < 8; i += 1) {
    const row = Array(dimensions).fill(0);
    for (let j = 0; j < 8; j += 1) {
      row[16*y + j] = K[j][i];
      row[16*(y+1) + 8 + j] = K[j][i];
    }
    interactions.push(row);
  }
}
assert.equal(interactions.length, 8 * (wires - 1));

const bilinear = (a, b) => {
  let total = 0;
  for (let y = 0; y < wires; y += 1) {
    const ar = a.slice(16*y, 16*y + 8);
    const al = a.slice(16*y + 8, 16*y + 16);
    const br = b.slice(16*y, 16*y + 8);
    const bl = b.slice(16*y + 8, 16*y + 16);
    // Because each occupied block is a K column, K^{-1} maps it to e_i.
    // Recover the column index from exact equality and evaluate without floats.
    const column = block => K[0].map((_, i) => K.map(row => row[i])).findIndex(col => col.every((v,j) => v === block[j]));
    const zero = block => block.every(v => v === 0);
    if (!zero(ar) && !zero(br)) total += K[column(ar)][column(br)];
    if (!zero(al) && !zero(bl)) total -= K[column(al)][column(bl)];
  }
  return total;
};
for (const a of interactions) for (const b of interactions) assert.equal(bilinear(a,b), 0);

// Frozen aperiodic geometry and strictly positive couplings. These do not
// prove a microscopic many-body gap; they certify loss of transverse
// translation symmetry and an open strong-coupling pinning interval.
let state = evidence.disorder.seed >>> 0;
const random = () => {
  state = (1664525 * state + 1013904223) >>> 0;
  return state / 2**32;
};
const positions = [0];
for (let y = 1; y < wires; y += 1) positions.push(positions.at(-1) + 0.65 + 0.7 * random());
const couplings = Array.from({length: interactions.length}, () => 0.35 + 1.3 * random());
const spacings = positions.slice(1).map((x,i) => x - positions[i]);
assert.ok(new Set(spacings.map(x => x.toFixed(12))).size > 1);
assert.ok(Math.min(...couplings) > 0);
assert.deepEqual(positions.map(x => Number(x.toFixed(12))), evidence.disorder.positions);
assert.equal(Number(Math.min(...couplings).toFixed(12)), evidence.disorder.minimumCoupling);

assert.equal(evidence.boundary.left.form, "-E8");
assert.equal(evidence.boundary.right.form, "+E8");
assert.equal(evidence.boundary.totalUngappedModes, 16);
assert.equal(evidence.tomography.trainingRecord, "8x8 simple-current OPE exponent matrix K_E8");
assert.equal(evidence.tomography.heldOutPredictions.normTwoCurrents, 240);
assert.equal(evidence.claimBoundary.microscopicFewBodyHardwareClosed, false);
assert.equal(evidence.claimBoundary.thermodynamicGapClosed, false);

console.log(JSON.stringify({
  status: "PASS",
  wires,
  modes: dimensions,
  mutuallyNullInteractions: interactions.length,
  ungappedBoundaryModes: 16,
  irregularPositions: positions,
  minimumPositiveCoupling: Math.min(...couplings),
  reconstructedSimpleCurrentGram: K,
  heldOutNormTwoCurrents: roots.size,
  orderedDistinctRootPairInnerProducts: pairDistribution,
  downstreamPromotion: "the finite-qudit two-local gap is certified separately; clock-to-rotor convergence and continuum E8 response remain open",
}, null, 2));
