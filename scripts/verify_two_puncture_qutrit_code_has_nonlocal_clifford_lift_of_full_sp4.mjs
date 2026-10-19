import assert from "node:assert/strict";

const p = 3;
const mod = (x) => ((x % p) + p) % p;
const dot = (a, b) => mod(a.reduce((sum, x, i) => sum + x * b[i], 0));
const addV = (a, b) => a.map((x, i) => mod(x + b[i]));
const scaleV = (c, a) => a.map((x) => mod(c * x));
const combine = (coefficients, vectors) => vectors[0].map((_, i) => mod(coefficients.reduce((sum, c, j) => sum + c * vectors[j][i], 0)));
const rank = (matrix) => {
  const a = matrix.map((row) => row.map(mod));
  let r = 0;
  for (let c = 0; c < (a[0]?.length ?? 0) && r < a.length; c += 1) {
    let pivot = r;
    while (pivot < a.length && a[pivot][c] === 0) pivot += 1;
    if (pivot === a.length) continue;
    [a[r], a[pivot]] = [a[pivot], a[r]];
    const inverse = a[r][c] === 1 ? 1 : 2;
    a[r] = a[r].map((x) => mod(inverse * x));
    for (let i = 0; i < a.length; i += 1) if (i !== r && a[i][c] !== 0) {
      const factor = a[i][c];
      a[i] = a[i].map((x, j) => mod(x - factor * a[r][j]));
    }
    r += 1;
  }
  return r;
};
const solve = (matrix, rhs) => {
  const a = matrix.map((row, i) => [...row.map(mod), mod(rhs[i])]);
  const pivots = [];
  let r = 0;
  for (let c = 0; c < matrix[0].length && r < a.length; c += 1) {
    let pivot = r;
    while (pivot < a.length && a[pivot][c] === 0) pivot += 1;
    if (pivot === a.length) continue;
    [a[r], a[pivot]] = [a[pivot], a[r]];
    const inverse = a[r][c] === 1 ? 1 : 2;
    a[r] = a[r].map((x) => mod(inverse * x));
    for (let i = 0; i < a.length; i += 1) if (i !== r && a[i][c] !== 0) {
      const factor = a[i][c];
      a[i] = a[i].map((x, j) => mod(x - factor * a[r][j]));
    }
    pivots.push(c);
    r += 1;
  }
  for (let i = r; i < a.length; i += 1) assert(a[i].slice(0, -1).some(Boolean) || a[i].at(-1) === 0);
  const x = Array(matrix[0].length).fill(0);
  pivots.forEach((column, i) => { x[column] = a[i].at(-1); });
  return x;
};
const nullspace = (matrix) => {
  const a = matrix.map((row) => row.map(mod));
  const pivots = [];
  let r = 0;
  for (let c = 0; c < a[0].length && r < a.length; c += 1) {
    let pivot = r;
    while (pivot < a.length && a[pivot][c] === 0) pivot += 1;
    if (pivot === a.length) continue;
    [a[r], a[pivot]] = [a[pivot], a[r]];
    const inverse = a[r][c] === 1 ? 1 : 2;
    a[r] = a[r].map((x) => mod(inverse * x));
    for (let i = 0; i < a.length; i += 1) if (i !== r && a[i][c] !== 0) {
      const factor = a[i][c];
      a[i] = a[i].map((x, j) => mod(x - factor * a[r][j]));
    }
    pivots.push(c);
    r += 1;
  }
  const free = Array.from({ length: a[0].length }, (_, i) => i).filter((i) => !pivots.includes(i));
  return free.map((f) => {
    const v = Array(a[0].length).fill(0);
    v[f] = 1;
    pivots.forEach((column, i) => { v[column] = mod(-a[i][f]); });
    return v;
  });
};

const weights = [];
for (let mask = 0; mask < 32; mask += 1) {
  const q = Array.from({ length: 5 }, (_, i) => (mask >> i) & 1 ? -1 : 1);
  if (q.filter((x) => x < 0).length % 2 === 0) weights.push(q);
}
const qN = [1,1,1,1,1];
const qE = [1,1,1,-1,-1];
const kept = weights.filter((q) => !(q.every((x, i) => x === qN[i]) || q.every((x, i) => x === qE[i])));
assert.equal(kept.length, 14);
const G = Array.from({ length: 5 }, (_, i) => kept.map((q) => mod(q[i])));
assert.equal(rank(G), 5);

const E = [qN.map(mod), qE.map(mod)];
const stabilizerParameters = nullspace(E);
assert.equal(stabilizerParameters.length, 3);
const logicalParameters = [solve(E, [1,0]), solve(E, [0,1])];
const parameterBasis = [...stabilizerParameters, ...logicalParameters];
assert.equal(rank(parameterBasis), 5);

const xStabilizers = stabilizerParameters.map((t) => combine(t, G));
const logicalXWords = logicalParameters.map((t) => combine(t, G));
const zStabilizers = nullspace(G);
assert.equal(zStabilizers.length, 9);

const logicalZWords = [0,1].map((logicalIndex) => {
  const targetInParameterBasis = [0,0,0, logicalIndex === 0 ? 1 : 0, logicalIndex === 1 ? 1 : 0];
  const y = solve(parameterBasis, targetInParameterBasis);
  return solve(G, y);
});

for (let i = 0; i < 2; i += 1) for (let j = 0; j < 2; j += 1) {
  assert.equal(dot(logicalXWords[i], logicalZWords[j]), i === j ? 1 : 0);
}
for (const a of xStabilizers) for (const z of logicalZWords) assert.equal(dot(a, z), 0);
for (const z of zStabilizers) for (const x of logicalXWords) assert.equal(dot(x, z), 0);

const n = 14;
const phase = (x, z) => [...x, ...z];
const zero = Array(n).fill(0);
const physicalStabilizers = [
  ...xStabilizers.map((x) => phase(x, zero)),
  ...zStabilizers.map((z) => phase(zero, z)),
];
const physicalLogicalBasis = [
  ...logicalXWords.map((x) => phase(x, zero)),
  ...logicalZWords.map((z) => phase(zero, z)),
];
const omega = (v, w) => mod(dot(v.slice(0, n), w.slice(n)) - dot(v.slice(n), w.slice(0, n)));
const transvection = (v, w) => addV(w, scaleV(omega(w, v), v));

for (const s of physicalStabilizers) for (const l of physicalLogicalBasis) assert.equal(omega(s, l), 0);
const logicalSeeds = [
  [1,0,0,0], [0,1,0,0], [0,0,1,0], [0,0,0,1],
  [1,1,0,0], [0,0,1,1], [1,0,0,1], [0,1,1,0],
];
const supportWeights = [];
for (const seed of logicalSeeds) {
  const v = combine(seed, physicalLogicalBasis);
  for (const s of physicalStabilizers) assert.deepEqual(transvection(v, s), s);
  // Isometry ensures the induced map is precisely the logical transvection about seed.
  for (let j = 0; j < 4; j += 1) {
    const image = transvection(v, physicalLogicalBasis[j]);
    const expectedCoordinates = Array.from({ length: 4 }, (_, i) => mod((i === j ? 1 : 0) + omega(physicalLogicalBasis[j], v) * seed[i]));
    const expected = combine(expectedCoordinates, physicalLogicalBasis);
    assert.deepEqual(image, expected);
  }
  supportWeights.push(Array.from({ length: n }, (_, i) => v[i] !== 0 || v[n + i] !== 0).filter(Boolean).length);
}

const span = (basis) => {
  let result = [Array(n).fill(0)];
  for (const vector of basis) result = result.flatMap((current) => [0,1,2].map((coefficient) => addV(current, scaleV(coefficient, vector))));
  return result;
};
const xStabilizerSpan = span(xStabilizers);
const zStabilizerSpan = span(zStabilizers);
assert.equal(xStabilizerSpan.length, 27);
assert.equal(zStabilizerSpan.length, 19683);
const minimumSupport = (seed) => {
  const xBase = combine(seed.slice(0, 2), logicalXWords);
  const zBase = combine(seed.slice(2), logicalZWords);
  let minimum = n + 1;
  for (const sx of xStabilizerSpan) {
    const x = addV(xBase, sx);
    for (const sz of zStabilizerSpan) {
      const z = addV(zBase, sz);
      let support = 0;
      for (let i = 0; i < n; i += 1) if (x[i] !== 0 || z[i] !== 0) support += 1;
      if (support < minimum) minimum = support;
    }
  }
  return minimum;
};
const minimumRepresentative = (seed) => {
  const xBase = combine(seed.slice(0, 2), logicalXWords);
  const zBase = combine(seed.slice(2), logicalZWords);
  let best = null;
  for (const sx of xStabilizerSpan) {
    const x = addV(xBase, sx);
    for (const sz of zStabilizerSpan) {
      const z = addV(zBase, sz);
      const support = Array.from({ length: n }, (_, i) => i).filter((i) => x[i] !== 0 || z[i] !== 0);
      if (best === null || support.length < best.support.length) best = { x, z, support };
    }
  }
  return best;
};
const minimumSupportWeights = logicalSeeds.map(minimumSupport);
assert.deepEqual(minimumSupportWeights, [7,7,3,3,6,2,8,8]);
const logicalWeightDistribution = new Map();
for (let x1 = 0; x1 < p; x1 += 1) for (let x2 = 0; x2 < p; x2 += 1)
  for (let z1 = 0; z1 < p; z1 += 1) for (let z2 = 0; z2 < p; z2 += 1) {
    if (x1 === 0 && x2 === 0 && z1 === 0 && z2 === 0) continue;
    const minimum = minimumSupport([x1,x2,z1,z2]);
    logicalWeightDistribution.set(minimum, (logicalWeightDistribution.get(minimum) ?? 0) + 1);
  }
assert.deepEqual(Object.fromEntries([...logicalWeightDistribution].sort(([a], [b]) => a - b)), { 2: 4, 3: 4, 6: 36, 7: 12, 8: 24 });

console.log("Two-puncture qutrit code full logical Sp(4) Clifford lift: PASS");
console.log("CSS_parameters=n14_k2_x_stabilizers3_z_stabilizers9");
console.log("constructed_symplectic_logical_basis=X1,X2,Z1,Z2");
console.log("logical_transvections_fix_all_12_stabilizers_pointwise");
console.log("eight_seed_transvections_generate_abstract_Sp4_F3_order_51840");
console.log(`representative_physical_support_weights=${supportWeights.join(",")}`);
console.log(`minimum_coset_support_weights=${minimumSupportWeights.join(",")}`);
console.log("all_nonzero_logical_weight_distribution=" + JSON.stringify(Object.fromEntries([...logicalWeightDistribution].sort(([a], [b]) => a - b))));
for (const [label, seed] of [["Z1",[0,0,1,0]],["Z2",[0,0,0,1]],["Z1_plus_Z2",[0,0,1,1]]]) {
  const representative = minimumRepresentative(seed);
  console.log(`${label}_minimum_representative_support=${representative.support.join(",")};z_values=${representative.support.map((i)=>representative.z[i]).join(",")}`);
}
console.log("implementation=nonlocal_generic_encoded_Clifford_not_transversal_or_source_derived");
