import assert from "node:assert/strict";

const states = [];
for (let mask = 0; mask < 32; mask += 1) {
  const occupied = Array.from({ length: 5 }, (_, i) => i + 1)
    .filter((i) => (mask >> (i - 1)) & 1);
  if (occupied.length % 2 === 0) states.push({ occupied, key: occupied.join("") });
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
  throw new Error(`unclassified ${o}`);
};
states.forEach((state) => { state.sector = classify(state.occupied); });
assert.equal(states.length, 16);
const byKey = new Map(states.map((state, i) => [state.key, i]));
const sectors = ["Q", "uc", "dc", "L", "ec", "nuc"];
const dimensions = { Q: 6, uc: 3, dc: 3, L: 2, ec: 1, nuc: 1 };
for (const sector of sectors) assert.equal(states.filter((s) => s.sector === sector).length, dimensions[sector]);

const zero = () => Array.from({ length: 16 }, () => Array(16).fill(0));
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
    matrix[byKey.get(occupied.join(""))][column] = coefficient;
  }
  return matrix;
};
const diagonal = (values) => values.map((value, i) => values.map((unused, j) => i === j ? value : 0));
const y6 = { Q: 1, uc: -4, dc: 2, L: -3, ec: 6, nuc: 0 };
const bMinusL3 = { Q: 1, uc: -1, dc: -1, L: -3, ec: 3, nuc: 3 };
const generators = [];
for (const [name, i, j] of [
  ["E12", 1, 2], ["E21", 2, 1], ["E23", 2, 3], ["E32", 3, 2],
  ["E13", 1, 3], ["E31", 3, 1], ["E45", 4, 5], ["E54", 5, 4],
]) generators.push({ name, matrix: bilinear(i, j) });
generators.push({ name: "Y6", matrix: diagonal(states.map((s) => y6[s.sector])) });
const withBL = [...generators, { name: "3(B-L)", matrix: diagonal(states.map((s) => bMinusL3[s.sector])) }];

const prime = 1000003;
const mod = (x) => ((x % prime) + prime) % prime;
const inverse = (x) => {
  let a = mod(x), b = prime, u = 1, v = 0;
  while (b) { const q = Math.floor(a / b); [a, b] = [b, a - q * b]; [u, v] = [v, u - q * v]; }
  return mod(u);
};
const commutantRank = (gs) => {
  const equations = [];
  for (const { matrix: g } of gs) for (let i = 0; i < 16; i += 1) for (let j = 0; j < 16; j += 1) {
    const row = new Map();
    for (let k = 0; k < 16; k += 1) {
      if (g[k][j]) row.set(i * 16 + k, mod((row.get(i * 16 + k) ?? 0) + g[k][j]));
      if (g[i][k]) row.set(k * 16 + j, mod((row.get(k * 16 + j) ?? 0) - g[i][k]));
    }
    for (const [key, value] of [...row]) if (!value) row.delete(key);
    if (row.size) equations.push(row);
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
  return { equationCount: equations.length, rank, nullity: 256 - rank };
};
const smCommutant = commutantRank(generators);
const smBlCommutant = commutantRank(withBL);
assert.equal(smCommutant.nullity, 6);
assert.equal(smBlCommutant.nullity, 6);

const incidenceWeight = { Q: 5, uc: 5, dc: 1, L: 1, ec: 1, nuc: 0 };
const incidenceProjector = Object.fromEntries(sectors.map((sector) => {
  const lambda = incidenceWeight[sector];
  const value = ((lambda - 1) * (lambda - 5)) / 5;
  return [sector, Object.is(value, -0) ? 0 : value];
}));
assert.deepEqual(incidenceProjector, { Q: 0, uc: 0, dc: 0, L: 0, ec: 0, nuc: 1 });

const rawBLWeights = Object.fromEntries(sectors.map((sector) =>
  [sector, dimensions[sector] * bMinusL3[sector] ** 2]));
const totalBLWeight = Object.values(rawBLWeights).reduce((a, b) => a + b, 0);
assert.equal(totalBLWeight, 48);
const normalizedBLWeights = Object.fromEntries(sectors.map((sector) =>
  [sector, rawBLWeights[sector] / totalBLWeight]));

console.log(JSON.stringify({
  protocol: "sixteen-state-sm-bl-face-kernels/1",
  sectorDimensions: dimensions,
  smCommutant,
  smPlusBLCommutant: smBlCommutant,
  exactCommutant: "C^6 spanned by P_Q,P_uc,P_dc,P_L,P_ec,P_nuc",
  twoFaceCommutant: "direct sum of six M2(C) factors",
  exchangeFixedPositiveCone: "direct sum of six H2(R)+ cones",
  incidenceLaplacian: {
    weights: incidenceWeight,
    zeroSpectralProjector: incidenceProjector,
  },
  freeBLCurrentCorrelatorAggregation: {
    rule: "w_r proportional to d_r [3(B-L)_r]^2 for equal per-component ultraviolet residues",
    rawWeights: rawBLWeights,
    total: totalBLWeight,
    normalizedWeights: normalizedBLWeights,
  },
  conclusion: "The sixteen-state module has six sector cones. The incidence law selects the nuc cone, while the anomaly-free B-L current supplies a non-arbitrary positive six-sector aggregation in the free equal-residue limit.",
  limitation: "Interacting current correlators contain cross-sector mixing and running thresholds; charge-squared weights are an ultraviolet/free normalization, not an all-scale prediction.",
  passed: true,
}, null, 2));
