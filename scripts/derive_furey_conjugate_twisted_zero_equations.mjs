import assert from "node:assert/strict";

const dims = { O1: 1, O2: 3, H: 2, C: 1, R: 1 };
const offsets = {};
let ambient = 0;
for (const [name, dim] of Object.entries(dims)) { offsets[name] = ambient; ambient += dim; }
const swap = (b) => b === "O1" ? "R" : b === "R" ? "O1" : b;
const arrows = [
  ["Q", "O2", "H"], ["u", "C", "O2"], ["d", "O1", "O2"],
  ["L", "H", "R"], ["e", "R", "C"],
];
const basis = arrows.flatMap(([arrow, targetBlock, sourceBlock]) =>
  Array.from({ length: dims[targetBlock] }, (_, i) =>
    Array.from({ length: dims[sourceBlock] }, (_, j) => ({
      arrow, targetBlock, sourceBlock,
      target: offsets[targetBlock] + i, source: offsets[sourceBlock] + j,
      name: `${arrow}${i + 1}${j + 1}`,
    }))).flat());
assert.equal(basis.length, 15);
const J = (u) => ({
  target: offsets[swap(u.sourceBlock)] + u.source - offsets[u.sourceBlock],
  source: offsets[swap(u.targetBlock)] + u.target - offsets[u.targetBlock],
});
const mul = (a, b) => a.source === b.target
  ? { target: a.target, source: b.source } : null;
const triple = (x, y, z) => { const xy = mul(x, J(y)); return xy && mul(xy, z); };
const equationsFor = (jordan) => {
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
    for (let i = 0; i < basis.length; i += 1) {
      for (let j = 0; j < basis.length; j += 1) {
        add(zIndex, triple(basis[i], basis[j], z), i, j);
        if (jordan) add(zIndex, triple(z, basis[j], basis[i]), i, j);
      }
    }
  }
  const normalized = [...equations.values()].map((poly) =>
    [...poly.entries()].filter(([, c]) => c).sort().map(([ij, coefficient]) => {
      const [i, j] = ij.split(",").map(Number);
      return { coefficient, variables: [basis[i].name, basis[j].name] };
    }));
  const unique = new Map(normalized.map((p) => [JSON.stringify(p), p]));
  return [...unique.values()];
};
const summarize = (equations) => ({
  equationCount: equations.length,
  monomialEquationCount: equations.filter((p) => p.length === 1).length,
  multiTermEquationCount: equations.filter((p) => p.length > 1).length,
  equations,
});
const oneSided = summarize(equationsFor(false));
const jordan = summarize(equationsFor(true));
assert(oneSided.equationCount > 0 && jordan.equationCount > 0);
// If the second coefficient slot is made Hermitian rather than complex-bilinear,
// every diagonal-only polynomial with positive coefficients is a sum of norms.
// Their joint vanishing forces each variable occurring in them to vanish.
const positiveDiagonalEquations = jordan.equations.filter((polynomial) =>
  polynomial.length > 0 && polynomial.every((term) =>
    term.coefficient > 0 && term.variables[0] === term.variables[1]));
const positivityForcedVariables = [...new Set(positiveDiagonalEquations
  .flatMap((polynomial) => polynomial.map((term) => term.variables[0])))].sort();
const expectedNonLeptonicVariables = basis.filter((unit) => unit.arrow !== "L")
  .map((unit) => unit.name).sort();
assert.deepEqual(positivityForcedVariables, expectedNonLeptonicVariables);
assert(basis.filter((unit) => unit.arrow === "L")
  .every((unit) => !positivityForcedVariables.includes(unit.name)));
console.log(JSON.stringify({
  protocol: "furey-conjugate-twisted-zero-equations/1",
  variables: basis.map((u) => u.name), oneSided, jordan,
  hermitianResponseCandidate: {
    status: "candidate law, not derived from the source Furey action",
    positiveDiagonalEquationCount: positiveDiagonalEquations.length,
    positivityForcedVariables,
    unconstrainedVariables: basis.map((unit) => unit.name)
      .filter((name) => !positivityForcedVariables.includes(name)),
    conclusion: "Hermitianizing the second coefficient slot converts the displayed diagonal equations into positive norm sums; their common zero locus forces Q, u, d and e to vanish while leaving precisely L unconstrained.",
  },
  passed: true,
}, null, 2));
