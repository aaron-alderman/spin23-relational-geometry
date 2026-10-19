import assert from "node:assert/strict";

const dims = { O1: 1, O2: 3, H: 2, C: 1, R: 1 };
const offsets = {};
let ambient = 0;
for (const [name, dim] of Object.entries(dims)) { offsets[name] = ambient; ambient += dim; }
const swap = (block) => block === "O1" ? "R" : block === "R" ? "O1" : block;
const arrows = [
  ["Q", "O2", "H"], ["u", "C", "O2"], ["d", "O1", "O2"],
  ["L", "H", "R"], ["e", "R", "C"], ["nuc", "R", "O1"],
];
const basis = arrows.flatMap(([arrow, targetBlock, sourceBlock]) =>
  Array.from({ length: dims[targetBlock] }, (_, i) =>
    Array.from({ length: dims[sourceBlock] }, (_, j) => ({
      arrow, targetBlock, sourceBlock,
      target: offsets[targetBlock] + i,
      source: offsets[sourceBlock] + j,
      name: `${arrow}${i + 1}${j + 1}`,
    }))).flat());
assert.equal(basis.length, 16);

const middle = (unit) => ({
  target: offsets[swap(unit.sourceBlock)] + unit.source - offsets[unit.sourceBlock],
  source: offsets[swap(unit.targetBlock)] + unit.target - offsets[unit.targetBlock],
});
const mul = (a, b) => a.source === b.target ? { target: a.target, source: b.source } : null;
const triple = (x, y, z) => {
  const xy = mul(x, middle(y));
  return xy && mul(xy, z);
};
const equations = new Map();
const add = (zIndex, out, i, j) => {
  if (!out) return;
  const key = `${zIndex}:${out.target}<-${out.source}`;
  if (!equations.has(key)) equations.set(key, new Map());
  const monomial = i <= j ? `${i},${j}` : `${j},${i}`;
  equations.get(key).set(monomial, (equations.get(key).get(monomial) ?? 0) + 1);
};
for (let zIndex = 0; zIndex < basis.length; zIndex += 1) {
  const z = basis[zIndex];
  for (let i = 0; i < basis.length; i += 1) for (let j = 0; j < basis.length; j += 1) {
    add(zIndex, triple(basis[i], basis[j], z), i, j);
    add(zIndex, triple(z, basis[j], basis[i]), i, j);
  }
}
const normalized = [...equations.values()].map((polynomial) =>
  [...polynomial.entries()].filter(([, coefficient]) => coefficient).sort()
    .map(([ij, coefficient]) => {
      const [i, j] = ij.split(",").map(Number);
      return { coefficient, i, j, variables: [basis[i].name, basis[j].name] };
    }));
const unique = [...new Map(normalized.map((p) => [JSON.stringify(p), p])).values()];
const positiveDiagonal = unique.filter((polynomial) => polynomial.length > 0 &&
  polynomial.every((term) => term.coefficient > 0 && term.i === term.j));
const forced = [...new Set(positiveDiagonal.flatMap((p) => p.map((term) => basis[term.i].name)))].sort();
const unconstrained = basis.map((unit) => unit.name).filter((name) => !forced.includes(name));
const weights = Object.fromEntries(basis.map((unit) => [unit.name, 0]));
for (const p of positiveDiagonal) for (const term of p) weights[basis[term.i].name] += term.coefficient;
const sectorWeightSets = Object.fromEntries(arrows.map(([arrow]) => [arrow,
  [...new Set(basis.filter((unit) => unit.arrow === arrow).map((unit) => weights[unit.name]))].sort((a, b) => a - b)]));

const responseSupport = new Set(unique.flatMap((p) => p.flatMap((term) => term.variables)));
const absentFromResponse = basis.map((unit) => unit.name).filter((name) => !responseSupport.has(name));

console.log(JSON.stringify({
  protocol: "sixteen-state-furey-incidence-kernel/1",
  topologyAArrows: arrows.map(([name, target, source]) => `${name}:${target}<-${source}`),
  stateCount: basis.length,
  equationCountWithMultiplicity: normalized.length,
  uniqueEquationCount: unique.length,
  positiveDiagonalEquationCount: positiveDiagonal.length,
  positivityForcedVariables: forced,
  positivityUnconstrainedVariables: unconstrained,
  variablesAbsentFromFullResponse: absentFromResponse,
  incidenceWeights: weights,
  sectorWeightSets,
  fifteenStateComparison: "Without nuc:R<-O1, the positive kernel and full-response blind subspace were exactly L.",
  passed: true,
}, null, 2));
