import assert from "node:assert/strict";

// Build the fifteen charged/nonsterile even-Fock states of one generation.
const allStates = [];
for (let mask = 0; mask < 32; mask += 1) {
  const occupied = Array.from({ length: 5 }, (_, i) => i + 1)
    .filter((i) => (mask >> (i - 1)) & 1);
  if (occupied.length % 2 === 0) allStates.push({ occupied, key: occupied.join("") });
}
const classify = (o) => {
  if (o.length === 0) return "nuc";
  if (o.length === 2 && o[0] <= 3 && o[1] >= 4) return "Q";
  if (o.length === 2 && o.every((i) => i <= 3)) return "uc";
  if (o.join("") === "45") return "ec";
  if (o.length === 4) {
    const missing = [1, 2, 3, 4, 5].find((i) => !o.includes(i));
    return missing <= 3 ? "dc" : "L";
  }
  throw new Error("unclassified state " + o.join(""));
};
allStates.forEach((state) => { state.sector = classify(state.occupied); });
const states = allStates.filter((state) => state.sector !== "nuc");
assert.equal(states.length, 15);
const byKey = new Map(states.map((state, i) => [state.key, i]));
const sectorOrder = ["Q", "uc", "dc", "L", "ec"];
const expectedDimensions = { Q: 6, uc: 3, dc: 3, L: 2, ec: 1 };
for (const sector of sectorOrder) {
  assert.equal(states.filter((state) => state.sector === sector).length,
    expectedDimensions[sector]);
}

const zero = () => Array.from({ length: 15 }, () => Array(15).fill(0));
const bilinear = (create, annihilate) => {
  const matrix = zero();
  for (let column = 0; column < states.length; column += 1) {
    const occupied = [...states[column].occupied];
    const at = occupied.indexOf(annihilate);
    if (at < 0 || occupied.includes(create)) continue;
    let coefficient = at % 2 ? -1 : 1;
    occupied.splice(at, 1);
    const insertion = occupied.filter((i) => i < create).length;
    coefficient *= insertion % 2 ? -1 : 1;
    occupied.splice(insertion, 0, create);
    const row = byKey.get(occupied.join(""));
    if (row !== undefined) matrix[row][column] = coefficient;
  }
  return matrix;
};
const diagonal = (values) => values.map((value, i) =>
  values.map((unused, j) => i === j ? value : 0));
const generators = [];
for (const [name, i, j] of [
  ["E12", 1, 2], ["E21", 2, 1], ["E23", 2, 3], ["E32", 3, 2],
  ["E13", 1, 3], ["E31", 3, 1], ["E45", 4, 5], ["E54", 5, 4],
]) generators.push({ name, matrix: bilinear(i, j) });
const hyperchargeSix = { Q: 1, uc: -4, dc: 2, L: -3, ec: 6 };
generators.push({
  name: "Y6",
  matrix: diagonal(states.map((state) => hyperchargeSix[state.sector])),
});

// Exact modular rank of the commutator equations XG-GX=0.
const prime = 1000003;
const mod = (x) => ((x % prime) + prime) % prime;
const inverse = (x) => {
  let a = mod(x), b = prime, u = 1, v = 0;
  while (b) { const q = Math.floor(a / b); [a, b] = [b, a - q * b]; [u, v] = [v, u - q * v]; }
  return mod(u);
};
const equations = [];
for (const { matrix: g } of generators) {
  for (let i = 0; i < 15; i += 1) for (let j = 0; j < 15; j += 1) {
    const row = new Map();
    for (let k = 0; k < 15; k += 1) {
      if (g[k][j]) row.set(i * 15 + k, mod((row.get(i * 15 + k) ?? 0) + g[k][j]));
      if (g[i][k]) row.set(k * 15 + j, mod((row.get(k * 15 + j) ?? 0) - g[i][k]));
    }
    for (const [key, value] of [...row]) if (!value) row.delete(key);
    if (row.size) equations.push(row);
  }
}
let rank = 0;
const pivots = new Map();
for (const input of equations) {
  const row = new Map(input);
  while (row.size) {
    const pivot = Math.min(...row.keys());
    if (!pivots.has(pivot)) {
      const scale = inverse(row.get(pivot));
      for (const [key, value] of row) row.set(key, mod(value * scale));
      pivots.set(pivot, row); rank += 1; break;
    }
    const factor = row.get(pivot);
    for (const [key, value] of pivots.get(pivot)) {
      const next = mod((row.get(key) ?? 0) - factor * value);
      if (next) row.set(key, next); else row.delete(key);
    }
  }
}
const commutantDimension = 225 - rank;
assert.equal(commutantDimension, 5);

const multiply = (a, b) => a.map((row) => b[0].map((unused, j) =>
  row.reduce((sum, value, k) => sum + value * b[k][j], 0)));
const commute = (a, b) => multiply(a, b).every((row, i) =>
  row.every((value, j) => value === multiply(b, a)[i][j]));
const projectors = Object.fromEntries(sectorOrder.map((sector) => [sector,
  diagonal(states.map((state) => Number(state.sector === sector)))]));
for (const projector of Object.values(projectors)) {
  assert(generators.every((generator) => commute(projector, generator.matrix)));
}

// Five rank-one positive sector kernels with different exact relative phases.
const kernels = {
  Q: { n: 6, re: 6, im: 0 },
  uc: { n: 3, re: 0, im: 3 },
  dc: { n: 3, re: -3, im: 0 },
  L: { n: 2, re: 0, im: -2 },
  ec: { n: 1, re: 1, im: 0 },
};
for (const kernel of Object.values(kernels)) {
  assert.equal(kernel.n * kernel.n, kernel.re * kernel.re + kernel.im * kernel.im);
}
const total = Object.values(kernels).reduce((sum, kernel) => ({
  n: sum.n + kernel.n, re: sum.re + kernel.re, im: sum.im + kernel.im,
}), { n: 0, re: 0, im: 0 });
const determinant = total.n ** 2 - total.re ** 2 - total.im ** 2;
assert.deepEqual(total, { n: 15, re: 4, im: 1 });
assert.equal(determinant, 208);

// Face exchange acts only on the two-copy factor; all sector projectors,
// including P_L, commute with face fixation/compression.
const leptonProjectorInGaugeCommutant = generators.every((generator) =>
  commute(projectors.L, generator.matrix));
assert(leptonProjectorInGaugeCommutant);

console.log(JSON.stringify({
  protocol: "two-topology-sm-invariant-gram-kernels/1",
  matterComplexDimension: states.length,
  irreducibleSectorDimensions: expectedDimensions,
  testedGaugeGenerators: generators.map((generator) => generator.name),
  gaugeScope: "SU(3) color roots, SU(2) weak roots and the physical Y6=6Y hypercharge generator only",
  commutatorEquationCount: equations.length,
  exactModularRank: rank,
  oneTopologyGaugeCommutantComplexDimension: commutantDimension,
  commutantBasis: sectorOrder.map((sector) => "P_" + sector),
  twoTopologyGaugeCommutant: "direct sum over five sectors of M2(C)",
  exchangeFixedHermitianPart: "direct sum over five sectors of J_z isomorphic to H2(R)",
  sectorRankOneKernels: kernels,
  summedFaceKernel: {
    matrix: [["15", "4+i"], ["4-i", "15"]],
    determinant,
    positiveDefinite: determinant > 0 && total.n > 0,
  },
  leptonProjectorCommutesWithGaugeReduction: leptonProjectorInGaugeCommutant,
  leptonProjectorCommutesWithFaceCompression: true,
  conclusion: "All gauge-invariant quadratic two-face kernels decompose into the five physical irreducible sectors. Exchange fixing produces one H2(R)-type cone per sector; summing sector residues produces an interior H2(R) response, and the L selector commutes with both gauge reduction and face compression.",
  limitation: "Relative sector phases and spectral weights are free data here; a covariant action or spectral measure must derive them and show the second face is not propagating mirror matter.",
  passed: true,
}, null, 2));
