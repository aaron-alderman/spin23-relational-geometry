import assert from "node:assert/strict";

const dims = { O1: 1, O2: 3, H: 2, C: 1, R: 1 };
const offsets = {};
let ambient = 0;
for (const [name, dim] of Object.entries(dims)) { offsets[name] = ambient; ambient += dim; }
const swap = (block) => block === "O1" ? "R" : block === "R" ? "O1" : block;
const arrows = [
  ["Q", "O2", "H"], ["u", "C", "O2"], ["d", "O1", "O2"],
  ["L", "H", "R"], ["e", "R", "C"],
];
const basis = arrows.flatMap(([arrow, targetBlock, sourceBlock]) =>
  Array.from({ length: dims[targetBlock] }, (_, i) =>
    Array.from({ length: dims[sourceBlock] }, (_, j) => ({
      arrow, targetBlock, sourceBlock,
      target: offsets[targetBlock] + i,
      source: offsets[sourceBlock] + j,
      name: `${arrow}${i + 1}${j + 1}`,
    }))).flat());
assert.equal(basis.length, 15);

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
const responseVariables = new Set(unique.flatMap((p) => p.flatMap((term) => term.variables)));
assert(basis.filter((unit) => unit.arrow === "L").every((unit) => !responseVariables.has(unit.name)));

const positiveDiagonal = unique.filter((polynomial) => polynomial.length > 0 &&
  polynomial.every((term) => term.coefficient > 0 && term.i === term.j));
assert.equal(positiveDiagonal.length, 14);
const weights = Object.fromEntries(basis.map((unit) => [unit.name, 0]));
for (const polynomial of positiveDiagonal) for (const term of polynomial) {
  weights[basis[term.i].name] += term.coefficient;
}
const expectedByArrow = { Q: 5, u: 5, d: 1, L: 0, e: 1 };
for (const unit of basis) assert.equal(weights[unit.name], expectedByArrow[unit.arrow]);

// Retain every output/z occurrence instead of deduplicating identical equations.
// This is the natural coordinate Hilbert--Schmidt counting measure on the
// response components and is the relevant test of frame independence.
const rawPositiveDiagonal = normalized.filter((polynomial) => polynomial.length > 0 &&
  polynomial.every((term) => term.coefficient > 0 && term.i === term.j));
const rawWeights = Object.fromEntries(basis.map((unit) => [unit.name, 0]));
for (const polynomial of rawPositiveDiagonal) for (const term of polynomial) {
  rawWeights[basis[term.i].name] += term.coefficient;
}
const rawSectorWeightSets = Object.fromEntries(arrows.map(([arrow]) => [arrow,
  [...new Set(basis.filter((unit) => unit.arrow === arrow).map((unit) => rawWeights[unit.name]))].sort((a, b) => a - b)]));
assert.deepEqual(rawSectorWeightSets, { Q: [5], u: [5], d: [1], L: [0], e: [3] });
const rawSpectrum = [...new Set(Object.values(rawWeights))].sort((a, b) => a - b);
assert.deepEqual(rawSpectrum, [0, 1, 3, 5]);
const rawProjectorPolynomial = (lambda) => -((lambda - 1) * (lambda - 3) * (lambda - 5)) / 15;
for (const unit of basis) {
  const value = rawProjectorPolynomial(rawWeights[unit.name]);
  assert.equal(Object.is(value, -0) ? 0 : value, Number(unit.arrow === "L"));
}

const spectrum = [...new Set(Object.values(weights))].sort((a, b) => a - b);
assert.deepEqual(spectrum, [0, 1, 5]);
const projectorPolynomial = (lambda) => ((lambda - 1) * (lambda - 5)) / 5;
const projectorDiagonal = Object.fromEntries(basis.map((unit) => {
  const value = projectorPolynomial(weights[unit.name]);
  return [unit.name, Object.is(value, -0) ? 0 : value];
}));
for (const unit of basis) assert.equal(projectorDiagonal[unit.name], Number(unit.arrow === "L"));

console.log(JSON.stringify({
  protocol: "furey-incidence-laplacian-and-lepton-projector/1",
  responseSupport: [...responseVariables].sort(),
  leptonVariablesAbsentFromFullQuadraticResponse: basis.filter((unit) => unit.arrow === "L").map((unit) => unit.name),
  linearizationAtLeptonLocus: {
    response: "R(l+epsilon n)=epsilon^2 R(n)",
    jacobian: "zero",
    squaredResponsePotential: "||R(l+epsilon n)||^2=epsilon^4||R(n)||^2, so its Hessian is zero",
  },
  positiveDiagonalEquationCount: positiveDiagonal.length,
  multiplicityPreservingPositiveDiagonalEquationCount: rawPositiveDiagonal.length,
  multiplicityPreservingWeights: rawWeights,
  multiplicityPreservingSectorWeightSets: rawSectorWeightSets,
  multiplicityPreservingSpectrum: rawSpectrum,
  multiplicityPreservingProjector: "P_L=-(Lambda_raw-I)(Lambda_raw-3I)(Lambda_raw-5I)/15",
  incidenceLaplacian: {
    coordinateWeights: weights,
    sectorForm: "Lambda=5(P_Q+P_uc)+(P_dc+P_ec)+0 P_L",
    spectrum,
    kernel: "L",
  },
  derivedProjector: {
    polynomial: "P_L=(Lambda-I)(Lambda-5I)/5",
    diagonal: projectorDiagonal,
    exact: true,
  },
  normalizationRobustResult: "Deduplicated and multiplicity-preserving contractions have different nonzero spectra but the same kernel L and therefore the same zero-spectral projector P_L. More generally, any strictly positive weighting of the fourteen covering norm equations has kernel L.",
  interpretation: "The raw quadratic response is not a lepton source and has zero linear susceptibility on L. Its positive diagonal incidence form instead defines a linear gauge-invariant Laplacian whose spectral projector is exactly P_L.",
  limitation: "The sum and normalization of positive diagonal equations must still be derived as a basis-independent linking-algebra trace or action term; Lambda is an internal classifier, not automatically a Lorentz-invariant chiral-fermion mass operator.",
  passed: true,
}, null, 2));
