import fs from "node:fs";

const register = JSON.parse(fs.readFileSync(
  "corpus/programmes/quotient-scars/quotient_scar_register_v1.json", "utf8",
));
const nodes = register.entries.map((entry) => entry.id);
const edges = register.relations.filter((edge) => edge.type !== "shares_action_not_carrier");
const typeOrder = [
  "extends_to", "instantiates", "requires_enrichment", "separates_from", "rules_out_identification",
];
const typeIndex = new Map(typeOrder.map((type, index) => [type, index]));
const counts = Object.fromEntries(typeOrder.map((type) => [type, edges.filter((edge) => edge.type === type).length]));
const expectedCounts = [7, 5, 5, 5, 2];
if (typeOrder.some((type, index) => counts[type] !== expectedCounts[index])) {
  throw new Error(`unexpected backbone type counts: ${JSON.stringify(counts)}`);
}

function rank(matrix, tolerance = 1e-9) {
  const work = matrix.map((row) => row.map(Number));
  let pivotRow = 0;
  for (let column = 0; column < (work[0]?.length ?? 0) && pivotRow < work.length; column += 1) {
    let pivot = pivotRow;
    for (let row = pivotRow + 1; row < work.length; row += 1) {
      if (Math.abs(work[row][column]) > Math.abs(work[pivot][column])) pivot = row;
    }
    if (Math.abs(work[pivot][column]) < tolerance) continue;
    [work[pivotRow], work[pivot]] = [work[pivot], work[pivotRow]];
    const scale = work[pivotRow][column];
    for (let j = column; j < work[0].length; j += 1) work[pivotRow][j] /= scale;
    for (let row = 0; row < work.length; row += 1) {
      if (row === pivotRow) continue;
      const factor = work[row][column];
      for (let j = column; j < work[0].length; j += 1) work[row][j] -= factor * work[pivotRow][j];
    }
    pivotRow += 1;
  }
  return pivotRow;
}

function rankModPrime(matrix, prime) {
  const work = matrix.map((row) => row.map((value) => ((value % prime) + prime) % prime));
  let pivotRow = 0;
  const inverse = (value) => {
    for (let candidate = 1; candidate < prime; candidate += 1) if ((value * candidate) % prime === 1) return candidate;
    throw new Error(`no inverse for ${value} modulo ${prime}`);
  };
  for (let column = 0; column < (work[0]?.length ?? 0) && pivotRow < work.length; column += 1) {
    const pivot = work.findIndex((row, index) => index >= pivotRow && row[column] !== 0);
    if (pivot < 0) continue;
    [work[pivotRow], work[pivot]] = [work[pivot], work[pivotRow]];
    const scale = inverse(work[pivotRow][column]);
    work[pivotRow] = work[pivotRow].map((value) => (value * scale) % prime);
    for (let row = 0; row < work.length; row += 1) {
      if (row === pivotRow) continue;
      const factor = work[row][column];
      work[row] = work[row].map((value, index) => ((value - factor * work[pivotRow][index]) % prime + prime) % prime);
    }
    pivotRow += 1;
  }
  return pivotRow;
}

const edgeByPair = new Map(edges.map((edge, index) => [[edge.from, edge.to].sort().join("|"), index]));
const triangles = [];
for (let a = 0; a < nodes.length; a += 1) {
  for (let b = a + 1; b < nodes.length; b += 1) {
    for (let c = b + 1; c < nodes.length; c += 1) {
      const indices = [
        edgeByPair.get([nodes[a], nodes[b]].sort().join("|")),
        edgeByPair.get([nodes[a], nodes[c]].sort().join("|")),
        edgeByPair.get([nodes[b], nodes[c]].sort().join("|")),
      ];
      if (indices.every((index) => index !== undefined)) triangles.push(indices);
    }
  }
}
if (triangles.length !== 11) throw new Error(`expected 11 triangles, received ${triangles.length}`);

function symmetricPairs(size) {
  const pairs = [];
  for (let i = 0; i < size; i += 1) for (let j = i; j < size; j += 1) pairs.push([i, j]);
  return pairs;
}

// Each pair of edges in a simple triangle identifies its third edge uniquely.
const edgeMiddleMatrix = symmetricPairs(edges.length).map(([j, k]) =>
  edges.map((_, i) => triangles.some((triangle) =>
    triangle.includes(i) && triangle.includes(j) && triangle.includes(k) && new Set([i, j, k]).size === 3) ? 1 : 0));
const edgeTensorRank = rank(edgeMiddleMatrix);
if (edgeTensorRank !== 17) throw new Error(`expected edge tensor rank 17, received ${edgeTensorRank}`);
const radicalEdges = edges.filter((_, index) => edgeMiddleMatrix.every((row) => row[index] === 0)).map((edge) => edge.id);
const expectedRadical = ["QR-001", "QR-003", "QR-005", "QR-007", "QR-010", "QR-020", "QR-026"];
if (radicalEdges.join(",") !== expectedRadical.join(",")) throw new Error(`unexpected edge radical: ${radicalEdges}`);

const typePatterns = new Map();
for (const triangle of triangles) {
  const pattern = triangle.map((index) => edges[index].type).sort().join("*");
  typePatterns.set(pattern, (typePatterns.get(pattern) ?? 0) + 1);
}

const typeTensor = Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => Array(5).fill(0)));
for (const triangle of triangles) {
  const triple = triangle.map((index) => typeIndex.get(edges[index].type));
  const permutations = new Set([
    [triple[0], triple[1], triple[2]], [triple[0], triple[2], triple[1]],
    [triple[1], triple[0], triple[2]], [triple[1], triple[2], triple[0]],
    [triple[2], triple[0], triple[1]], [triple[2], triple[1], triple[0]],
  ].map((entry) => entry.join(",")));
  for (const encoded of permutations) {
    const [i, j, k] = encoded.split(",").map(Number);
    typeTensor[i][j][k] += 1;
  }
}
const typeMiddleMatrix = symmetricPairs(5).map(([j, k]) =>
  Array.from({ length: 5 }, (_, i) => typeTensor[i][j][k]));
const typeTensorRank = rank(typeMiddleMatrix);
const typeTensorRankMod3 = rankModPrime(typeMiddleMatrix, 3);
if (typeTensorRank !== 4) throw new Error(`expected type tensor rank 4, received ${typeTensorRank}`);
if (typeTensorRankMod3 !== 4) throw new Error(`expected type tensor rank 4 modulo three, received ${typeTensorRankMod3}`);
if (!typeMiddleMatrix.every((row) => row[4] === 0) || rank(typeMiddleMatrix.map((row) => row.slice(0, 4))) !== 4) {
  throw new Error("the type-tensor radical should be exactly the rules-out direction");
}

// Build a basis of so(2,3) for eta=diag(1,1,-1,-1,-1).
const signs = [1, 1, -1, -1, -1];
const soBasis = [];
for (let a = 0; a < 5; a += 1) for (let b = a + 1; b < 5; b += 1) {
  const generator = Array.from({ length: 5 }, () => Array(5).fill(0));
  generator[a][b] = 1;
  generator[b][a] = -signs[a] / signs[b];
  soBasis.push(generator);
}
const invarianceRows = [];
for (let i = 0; i < 5; i += 1) for (let j = 0; j < 5; j += 1) for (let k = 0; k < 5; k += 1) {
  invarianceRows.push(soBasis.map((generator) => {
    let value = 0;
    for (let p = 0; p < 5; p += 1) {
      value += generator[p][i] * typeTensor[p][j][k];
      value += generator[p][j] * typeTensor[i][p][k];
      value += generator[p][k] * typeTensor[i][j][p];
    }
    return value;
  }));
}
const invarianceRank = rank(invarianceRows);
if (soBasis.length !== 10 || invarianceRank !== 10) throw new Error("common Lie stabilizer should be zero-dimensional");

function permutations(values) {
  if (values.length <= 1) return [values.slice()];
  const result = [];
  for (let i = 0; i < values.length; i += 1) {
    const rest = values.slice(0, i).concat(values.slice(i + 1));
    for (const tail of permutations(rest)) result.push([values[i], ...tail]);
  }
  return result;
}

// Exhaust the signed coordinate permutations preserving eta.  These are the
// source-native discrete frame changes: they may exchange the two constructive
// types or the three guardrail types and independently reverse coordinates.
const etaPermutations = [];
for (const positive of permutations([0, 1])) {
  for (const negative of permutations([2, 3, 4])) etaPermutations.push([...positive, ...negative]);
}
let signedMetricCubicStabilizer = 0;
let signedMetricCubicLineStabilizer = 0;
const stabilizerElements = [];
for (const permutation of etaPermutations) {
  for (let mask = 0; mask < 32; mask += 1) {
    const coordinateSigns = Array.from({ length: 5 }, (_, i) => ((mask >> i) & 1) ? -1 : 1);
    const tensorScalar = (i, j, k) => coordinateSigns[i] * coordinateSigns[j] * coordinateSigns[k]
      * typeTensor[permutation[i]][permutation[j]][permutation[k]];
    let preserves = true;
    let reverses = true;
    for (let i = 0; i < 5; i += 1) for (let j = 0; j < 5; j += 1) for (let k = 0; k < 5; k += 1) {
      const transformed = tensorScalar(i, j, k);
      if (transformed !== typeTensor[i][j][k]) preserves = false;
      if (transformed !== -typeTensor[i][j][k]) reverses = false;
    }
    if (preserves) {
      signedMetricCubicStabilizer += 1;
      stabilizerElements.push({ permutation, coordinateSigns });
    }
    if (preserves || reverses) signedMetricCubicLineStabilizer += 1;
  }
}

// Incidence rank gives the canonical Hodge sector dimensions.
const incidence = nodes.map((node) => edges.map((edge) =>
  (edge.to === node ? 1 : 0) - (edge.from === node ? 1 : 0)));
const cutRank = rank(incidence);
const cycleRank = edges.length - cutRank;
if (cutRank !== 14 || cycleRank !== 10) throw new Error("unexpected Hodge ranks");

console.log(JSON.stringify({
  result: "pass",
  typeQuotient: {
    dimension: 5,
    counts,
    semanticSignature: [2, 3],
    normalizedMetric: "diag(+1,+1,-1,-1,-1)",
  },
  triangleCubic: {
    triangles: triangles.length,
    edgeMiddleRank: edgeTensorRank,
    edgeRadicalDimension: edges.length - edgeTensorRank,
    edgeRadical: radicalEdges,
    typePatterns: Object.fromEntries(typePatterns),
    typeMiddleRank: typeTensorRank,
    typeMiddleRankMod3: typeTensorRankMod3,
    typeRadical: ["rules_out_identification"],
  },
  hodgePairing: {
    cutRank, cycleRank,
    positiveFamily: "a P_cut + b P_cycle, a>0, b>0",
    unresolvedDatum: "a/b",
  },
  commonContinuousSymmetry: {
    so23Dimension: soBasis.length,
    constraintRank: invarianceRank,
    commonLieAlgebraDimension: soBasis.length - invarianceRank,
  },
  signedCoordinateSymmetry: {
    ambientMetricGroupOrder: etaPermutations.length * 32,
    tensorStabilizerOrder: signedMetricCubicStabilizer,
    tensorLineStabilizerOrder: signedMetricCubicLineStabilizer,
    elements: stabilizerElements,
  },
  verdict: "source_native_spin23_type_envelope_plus_degenerate_cubic_selector_not_exceptional_completion",
}, null, 2));

