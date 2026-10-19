import assert from "node:assert/strict";

const mod = (x, p = 3) => ((x % p) + p) % p;
const S = [
  [1, 2, 2, 2, 1, 0, 1, 0, 0, 0, 0],
  [0, 1, 2, 2, 2, 1, 0, 1, 0, 0, 0],
  [2, 1, 2, 0, 1, 2, 0, 0, 1, 0, 0],
  [1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0],
  [2, 2, 2, 1, 0, 1, 0, 0, 0, 0, 1],
];
const supportKey = (indices) => [...indices].sort((a, b) => a - b).join(",");
const supports = new Set();
for (let code = 1; code < 3 ** 5; code += 1) {
  let digits = code;
  const word = Array(11).fill(0);
  for (const row of S) {
    const coefficient = digits % 3;
    digits = Math.floor(digits / 3);
    for (let j = 0; j < 11; j += 1) word[j] = mod(word[j] + coefficient * row[j]);
  }
  const support = word.map((x, i) => x ? i : -1).filter((i) => i >= 0);
  if (support.length === 6) supports.add(supportKey(support));
}
const blocks = [...supports].map((key) => {
  const support = new Set(key.split(",").map(Number));
  return Array.from({ length: 11 }, (_, i) => i).filter((i) => !support.has(i));
});
const blockSet = new Set(blocks.map(supportKey));

const cyclePermutation = (cycles) => {
  const out = Array.from({ length: 11 }, (_, i) => i);
  for (const cycle of cycles) for (let i = 0; i < cycle.length; i += 1) out[cycle[i]] = cycle[(i + 1) % cycle.length];
  return out;
};
const generators = [
  cyclePermutation([[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]]),
  cyclePermutation([[2, 6, 10, 7], [3, 9, 4, 5]]),
];
assert(generators.every((g) => blocks.every((block) => blockSet.has(supportKey(block.map((x) => g[x]))))));
const compose = (left, right) => right.map((x) => left[x]);
const identity = Array.from({ length: 11 }, (_, i) => i);
const group = [identity];
const keys = new Set([identity.join(",")]);
for (let head = 0; head < group.length; head += 1) for (const generator of generators) {
  const next = compose(generator, group[head]);
  const key = next.join(",");
  if (!keys.has(key)) {
    keys.add(key);
    group.push(next);
  }
}
assert.equal(group.length, 7920);

const positive = new Set([0, 1, 2, 3, 4, 6]);
const heavy = new Set([5, 7]);
const light = new Set([8, 9, 10]);
const preserves = (permutation, set) => [...set].every((i) => set.has(permutation[i]));
const H = group.filter((g) => preserves(g, positive) && preserves(g, heavy) && preserves(g, light));
assert.equal(H.length, 12);

const permutationOrder = (g) => {
  let out = identity;
  for (let order = 1; order <= 12; order += 1) {
    out = compose(g, out);
    if (out.every((x, i) => x === i)) return order;
  }
  throw new Error("order not found");
};
const orderDistribution = {};
for (const g of H) orderDistribution[permutationOrder(g)] = (orderDistribution[permutationOrder(g)] ?? 0) + 1;
assert.deepEqual(orderDistribution, { 1: 1, 2: 7, 3: 2, 6: 2 });

const orbitOf = (point) => [...new Set(H.map((g) => g[point]))].sort((a, b) => a - b);
const coordinateOrbits = [];
const unseen = new Set(Array.from({ length: 11 }, (_, i) => i));
while (unseen.size) {
  const point = unseen.values().next().value;
  const orbit = orbitOf(point);
  coordinateOrbits.push(orbit);
  orbit.forEach((x) => unseen.delete(x));
}
assert.deepEqual(coordinateOrbits.map((x) => x.length).sort((a, b) => a - b), [2, 3, 6]);

// The action on the three light-negative points is S3 and the action on the
// two heavy-negative points supplies the independent C2 character.
const cycleTypeOn = (g, points) => {
  const fixed = points.filter((x) => g[x] === x).length;
  if (fixed === points.length) return "id";
  if (points.length === 3 && fixed === 1) return "transposition";
  if (points.length === 3 && fixed === 0) return "threeCycle";
  if (points.length === 2 && fixed === 0) return "swap";
  throw new Error("unexpected restricted cycle type");
};
const characterS3 = {
  trivial: { id: 1, transposition: 1, threeCycle: 1, dimension: 1 },
  sign: { id: 1, transposition: -1, threeCycle: 1, dimension: 1 },
  standard: { id: 2, transposition: 0, threeCycle: -1, dimension: 2 },
};

const irreps = [];
for (const [s3Name, character] of Object.entries(characterS3)) {
  for (const eta of [1, -1]) irreps.push({ name: s3Name + (eta === 1 ? "_plus" : "_minus"), s3Name, eta, dimension: character.dimension });
}
const characterValue = (irrep, g) => {
  const s3Type = cycleTypeOn(g, [...light]);
  const c2 = cycleTypeOn(g, [...heavy]) === "swap" ? -1 : 1;
  return characterS3[irrep.s3Name][s3Type] * (irrep.eta === 1 ? 1 : c2);
};
for (const irrep of irreps) {
  irrep.multiplicity = H.reduce((sum, g) => sum + g.filter((x, i) => x === i).length * characterValue(irrep, g), 0) / H.length;
  assert(Number.isInteger(irrep.multiplicity));
}
assert.equal(irreps.reduce((sum, x) => sum + x.dimension * x.multiplicity, 0), 11);

const permutationMatrix = (g) => Array.from({ length: 11 }, (_, i) =>
  Array.from({ length: 11 }, (_, j) => Number(i === g[j])));
const scaledProjector = (irrep) => {
  const out = Array.from({ length: 11 }, () => Array(11).fill(0));
  for (const g of H) {
    const coefficient = irrep.dimension * characterValue(irrep, g);
    const R = permutationMatrix(g);
    for (let i = 0; i < 11; i += 1) for (let j = 0; j < 11; j += 1) out[i][j] += coefficient * R[i][j];
  }
  return out;
};

const rankMod = (matrix, prime = 1000003) => {
  if (!matrix.length) return 0;
  const pow = (a, n) => {
    let x = BigInt(mod(a, prime)), out = 1n, k = BigInt(n), P = BigInt(prime);
    while (k) {
      if (k & 1n) out = out * x % P;
      x = x * x % P;
      k >>= 1n;
    }
    return Number(out);
  };
  const a = matrix.map((row) => row.map((x) => mod(x, prime)));
  let rank = 0;
  for (let col = 0; col < a[0].length && rank < a.length; col += 1) {
    let pivot = rank;
    while (pivot < a.length && a[pivot][col] === 0) pivot += 1;
    if (pivot === a.length) continue;
    [a[rank], a[pivot]] = [a[pivot], a[rank]];
    const inverse = pow(a[rank][col], prime - 2);
    for (let j = col; j < a[rank].length; j += 1) a[rank][j] = Number(BigInt(a[rank][j]) * BigInt(inverse) % BigInt(prime));
    for (let i = 0; i < a.length; i += 1) if (i !== rank && a[i][col]) {
      const factor = a[i][col];
      for (let j = col; j < a[i].length; j += 1) a[i][j] = mod(a[i][j] - Number(BigInt(factor) * BigInt(a[rank][j]) % BigInt(prime)), prime);
    }
    rank += 1;
  }
  return rank;
};
const independentRows = (matrix) => {
  const out = [];
  for (const row of matrix) if (rankMod([...out, row]) > out.length) out.push(row);
  return out;
};

const mu = [2, 2, 2, 2, 2, -4, 2, -4, -1, -1, -1];
const weighted = (a, b) => a.reduce((sum, x, i) => sum + mu[i] * x * b[i], 0);
const ones = Array(11).fill(1);
assert.equal(weighted(ones, ones), 1);

const jacobiEigenvalues = (matrix) => {
  const a = matrix.map((row) => row.map(Number));
  for (let sweep = 0; sweep < 200; sweep += 1) {
    let p = 0, q = 1, maximum = 0;
    for (let i = 0; i < a.length; i += 1) for (let j = i + 1; j < a.length; j += 1) {
      if (Math.abs(a[i][j]) > maximum) {
        maximum = Math.abs(a[i][j]);
        p = i;
        q = j;
      }
    }
    if (maximum < 1e-10) break;
    const angle = 0.5 * Math.atan2(2 * a[p][q], a[q][q] - a[p][p]);
    const c = Math.cos(angle), s = Math.sin(angle);
    const app = c * c * a[p][p] - 2 * s * c * a[p][q] + s * s * a[q][q];
    const aqq = s * s * a[p][p] + 2 * s * c * a[p][q] + c * c * a[q][q];
    for (let k = 0; k < a.length; k += 1) if (k !== p && k !== q) {
      const akp = c * a[k][p] - s * a[k][q];
      const akq = s * a[k][p] + c * a[k][q];
      a[k][p] = a[p][k] = akp;
      a[k][q] = a[q][k] = akq;
    }
    a[p][p] = app;
    a[q][q] = aqq;
    a[p][q] = a[q][p] = 0;
  }
  return a.map((row, i) => row[i]);
};

const decomposition = [];
let maximumInvariantIsotropicDimension = 0;
for (const irrep of irreps) {
  let basis = independentRows(scaledProjector(irrep));
  assert.equal(basis.length, irrep.dimension * irrep.multiplicity);
  if (irrep.name === "trivial_plus") {
    const values = basis.map((row) => weighted(row, ones));
    const pivot = values.findIndex((x) => x !== 0);
    assert(pivot >= 0);
    const reduced = [];
    for (let i = 0; i < basis.length; i += 1) if (i !== pivot) {
      reduced.push(basis[i].map((x, j) => values[pivot] * x - values[i] * basis[pivot][j]));
    }
    basis = independentRows(reduced);
  }
  const gram = basis.map((a) => basis.map((b) => weighted(a, b)));
  const eigenvalues = jacobiEigenvalues(gram);
  assert(eigenvalues.every((x) => Math.abs(x) > 1e-7));
  const positive = eigenvalues.filter((x) => x > 0).length;
  const negative = eigenvalues.filter((x) => x < 0).length;
  assert.equal(positive % irrep.dimension, 0);
  assert.equal(negative % irrep.dimension, 0);
  const invariantIsotropicContribution = irrep.dimension * Math.min(positive / irrep.dimension, negative / irrep.dimension);
  maximumInvariantIsotropicDimension += invariantIsotropicContribution;
  decomposition.push({
    irrep: irrep.name,
    dimension: irrep.dimension,
    multiplicityInQ11: irrep.multiplicity,
    dimensionInsideOnesComplement: basis.length,
    signature: [positive, negative],
    maximumInvariantIsotropicContribution: invariantIsotropicContribution,
  });
}
assert.equal(maximumInvariantIsotropicDimension, 2);

// A K-invariant maximal isotropic graph exists exactly when the positive and
// negative five-dimensional K-representations are isomorphic.  Here their
// characters are especially simple: positive is the reduced permutation
// representation on the six +2 coordinates, while negative is the full
// permutation representation on the five negative coordinates.
const positivePoints = [...positive];
const negativePoints = [...heavy, ...light];
const lagrangianCharacterDefect = (g) =>
  positivePoints.filter((x) => g[x] === x).length - 1
  - negativePoints.filter((x) => g[x] === x).length;
const keyOfSubgroup = (subgroup) => subgroup.map((g) => g.join(",")).sort().join("|");
const closure = (seed) => {
  const out = [identity];
  const seen = new Set([identity.join(",")]);
  for (let head = 0; head < out.length; head += 1) for (const generator of seed) {
    const next = compose(generator, out[head]);
    const key = next.join(",");
    if (!seen.has(key)) {
      seen.add(key);
      out.push(next);
    }
  }
  return out;
};
const subgroups = [closure([])];
const subgroupKeys = new Set([keyOfSubgroup(subgroups[0])]);
for (let head = 0; head < subgroups.length; head += 1) {
  for (const g of H) {
    const candidate = closure([...subgroups[head], g]);
    const key = keyOfSubgroup(candidate);
    if (!subgroupKeys.has(key)) {
      subgroupKeys.add(key);
      subgroups.push(candidate);
    }
  }
}
const subgroupType = (subgroup) => {
  const orders = {};
  for (const g of subgroup) orders[permutationOrder(g)] = (orders[permutationOrder(g)] ?? 0) + 1;
  return { order: subgroup.length, elementOrders: orders };
};
const compatibleSubgroups = subgroups.filter((subgroup) => subgroup.every((g) => lagrangianCharacterDefect(g) === 0));
const maximumCompatibleSubgroupOrder = Math.max(...compatibleSubgroups.map((x) => x.length));
const compatibleTypeCounts = {};
for (const subgroup of compatibleSubgroups) {
  const type = JSON.stringify(subgroupType(subgroup));
  compatibleTypeCounts[type] = (compatibleTypeCounts[type] ?? 0) + 1;
}
assert.equal(maximumCompatibleSubgroupOrder, 2);
const cycleNotation = (g) => {
  const seen = new Set();
  const cycles = [];
  for (let i = 0; i < 11; i += 1) if (!seen.has(i)) {
    const cycle = [];
    let x = i;
    while (!seen.has(x)) {
      seen.add(x);
      cycle.push(x);
      x = g[x];
    }
    if (cycle.length > 1) cycles.push(cycle);
  }
  return cycles;
};
const compatibleInvolutions = compatibleSubgroups.filter((x) => x.length === 2).map((subgroup) => {
  const g = subgroup.find((x) => permutationOrder(x) === 2);
  const character = positivePoints.filter((x) => g[x] === x).length - 1;
  return {
    cyclesZeroBased: cycleNotation(g),
    commonPositiveNegativeCharacter: character,
    plusEigenspaceSignature: [(5 + character) / 2, (5 + character) / 2],
    minusEigenspaceSignature: [(5 - character) / 2, (5 - character) / 2],
  };
});
const permuteColumns = (matrix, permutation) => matrix.map((row) => {
  const out = Array(11);
  for (let j = 0; j < 11; j += 1) out[permutation[j]] = row[j];
  return out;
});
const pureSignedCodeStabilizer = H.filter((g) => rankMod([...S, ...permuteColumns(S, g)], 3) === 5);
assert.equal(pureSignedCodeStabilizer.length, 2);
const signedInvolution = pureSignedCodeStabilizer.find((g) => permutationOrder(g) === 2);
const signedPositiveCharacter = positivePoints.filter((x) => signedInvolution[x] === x).length - 1;
const signedNegativeCharacter = negativePoints.filter((x) => signedInvolution[x] === x).length;
const signedPlusSignature = [(5 + signedPositiveCharacter) / 2, (5 + signedNegativeCharacter) / 2];
const signedMinusSignature = [(5 - signedPositiveCharacter) / 2, (5 - signedNegativeCharacter) / 2];
const signedMaximumInvariantIsotropicDimension =
  Math.min(...signedPlusSignature) + Math.min(...signedMinusSignature);
assert.equal(signedMaximumInvariantIsotropicDimension, 3);

console.log(JSON.stringify({
  protocol: "witt-block-stabilizer-fixed-isotropic-no-go/1",
  stabilizer: {
    order: H.length,
    abstractType: "S3 x C2",
    elementOrderDistribution: orderDistribution,
    coordinateOrbitSizes: coordinateOrbits.map((x) => x.length).sort((a, b) => a - b),
  },
  rationalPermutationRepresentation: irreps.map(({ name, dimension, multiplicity }) => ({ irrep: name, dimension, multiplicity })),
  allOneComplement: {
    dimension: 10,
    signature: [5, 5],
    isotypicSignatureAudit: decomposition,
    maximumStabilizerInvariantTotallyIsotropicDimension: maximumInvariantIsotropicDimension,
  },
  properSubgroupFrontier: {
    subgroupsEnumerated: subgroups.length,
    lagrangianCriterion: "The reduced permutation character on the six positive coordinates must equal the permutation character on the five negative coordinates.",
    compatibleSubgroups: compatibleSubgroups.length,
    maximumCompatibleSubgroupOrder,
    compatibleTypeCounts,
    compatibleInvolutions,
  },
  actualSignedPCodeSymmetry: {
    purePermutationStabilizerOrder: pureSignedCodeStabilizer.length,
    nontrivialCyclesZeroBased: cycleNotation(signedInvolution),
    plusEigenspaceSignature: signedPlusSignature,
    minusEigenspaceSignature: signedMinusSignature,
    maximumInvariantTotallyIsotropicDimension: signedMaximumInvariantIsotropicDimension,
    theorem: "Even the surviving pure-permutation C2 of the signed Golay P-code cannot preserve a characteristic-zero maximal isotropic five-space.",
  },
  theorem: "No H-invariant rational or real maximal totally isotropic five-space exists. Every characteristic-zero rank-five lift necessarily breaks the full order-twelve Witt-block stabilizer.",
  passed: true,
}, null, 2));
