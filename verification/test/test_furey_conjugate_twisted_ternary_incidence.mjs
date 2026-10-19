import assert from "node:assert/strict";

const blockDimensions = { O1: 1, O2: 3, H: 2, C: 1, R: 1 };
const blockOffsets = {};
let totalDimension = 0;
for (const [block, dimension] of Object.entries(blockDimensions)) {
  blockOffsets[block] = totalDimension;
  totalDimension += dimension;
}
assert.equal(totalDimension, 8);
const swapBlock = (block) => block === "O1" ? "R" : block === "R" ? "O1" : block;
const arrow = (name, target, source) => ({ name, target, source });
const arrowsA = [
  arrow("Q", "O2", "H"),
  arrow("uc", "C", "O2"),
  arrow("dc", "O1", "O2"),
  arrow("L", "H", "R"),
  arrow("ec", "R", "C"),
];
const arrowsB = arrowsA.map((edge) =>
  arrow(edge.name, swapBlock(edge.target), swapBlock(edge.source)));
const unitsForArrow = (edge) => {
  const units = [];
  for (let i = 0; i < blockDimensions[edge.target]; i += 1) {
    for (let j = 0; j < blockDimensions[edge.source]; j += 1) {
      units.push({
        arrow: edge.name,
        target: blockOffsets[edge.target] + i,
        source: blockOffsets[edge.source] + j,
        targetBlock: edge.target,
        sourceBlock: edge.source,
      });
    }
  }
  return units;
};
const basisA = arrowsA.flatMap(unitsForArrow);
const basisB = arrowsB.flatMap(unitsForArrow);
assert.equal(basisA.length, 15);
assert.equal(basisB.length, 15);
const thetaDagger = (unit) => {
  const swappedTarget = swapBlock(unit.targetBlock);
  const swappedSource = swapBlock(unit.sourceBlock);
  const targetWithin = unit.target - blockOffsets[unit.targetBlock];
  const sourceWithin = unit.source - blockOffsets[unit.sourceBlock];
  // Theta maps E_target,source to E_swap(target),swap(source);
  // dagger then reverses it.
  return {
    target: blockOffsets[swappedSource] + sourceWithin,
    source: blockOffsets[swappedTarget] + targetWithin,
  };
};
const multiplyUnits = (left, right) => {
  if (left.source !== right.target) return null;
  return { target: left.target, source: right.source };
};
const triple = (x, y, z) => {
  const first = multiplyUnits(x, thetaDagger(y));
  return first ? multiplyUnits(first, z) : null;
};
const termKey = (unit) => unit ? unit.target + "<-" + unit.source : null;
const addOutput = (output, unit, coefficient = 1) => {
  if (!unit) return;
  const key = termKey(unit);
  output.set(key, (output.get(key) ?? 0) + coefficient);
  if (output.get(key) === 0) output.delete(key);
};
const quadraticCoefficient = (x, y, z, symmetricJordan) => {
  const output = new Map();
  addOutput(output, triple(x, y, z));
  if (x !== y) addOutput(output, triple(y, x, z));
  if (symmetricJordan) {
    addOutput(output, triple(z, y, x));
    if (x !== y) addOutput(output, triple(z, x, y));
  }
  return output;
};
const analyzeSectorSubset = (basis, arrowNames, symmetricJordan) => {
  const selected = basis.filter((unit) => arrowNames.has(unit.arrow));
  const witnesses = [];
  for (let i = 0; i < selected.length; i += 1) {
    for (let j = i; j < selected.length; j += 1) {
      for (const z of basis) {
        const output = quadraticCoefficient(selected[i], selected[j], z, symmetricJordan);
        if (!output.size) continue;
        witnesses.push({
          xArrow: selected[i].arrow,
          yArrow: selected[j].arrow,
          zArrow: z.arrow,
          output: [...output.entries()],
        });
        if (witnesses.length >= 3) return { nullIncidence: false, witnesses };
      }
    }
  }
  return { nullIncidence: true, witnesses };
};
const unitLabel = (unit) =>
  `${unit.arrow}:${unit.targetBlock}[${unit.target - blockOffsets[unit.targetBlock]}]` +
  `<-${unit.sourceBlock}[${unit.source - blockOffsets[unit.sourceBlock]}]`;
const analyzeAllCoordinateSubspaces = (basis, symmetricJordan) => {
  // A coordinate span is null exactly when every quadratic coefficient belonging
  // to a selected unordered pair of matrix units vanishes against every probe.
  const compatible = Array.from({ length: basis.length }, () =>
    Array(basis.length).fill(true));
  for (let i = 0; i < basis.length; i += 1) {
    for (let j = i; j < basis.length; j += 1) {
      compatible[i][j] = basis.every((z) =>
        quadraticCoefficient(basis[i], basis[j], z, symmetricJordan).size === 0);
    }
  }
  const nullMasks = [];
  for (let mask = 1; mask < 2 ** basis.length; mask += 1) {
    let isNull = true;
    for (let i = 0; isNull && i < basis.length; i += 1) {
      if (!((mask >> i) & 1)) continue;
      for (let j = i; j < basis.length; j += 1) {
        if (((mask >> j) & 1) && !compatible[i][j]) {
          isNull = false;
          break;
        }
      }
    }
    if (isNull) nullMasks.push(mask);
  }
  const maximalMasks = nullMasks.filter((mask) =>
    !nullMasks.some((other) => other !== mask && (mask & other) === mask));
  const describe = (mask) => ({
    complexDimension: basis.filter((unused, i) => (mask >> i) & 1).length,
    units: basis.filter((unused, i) => (mask >> i) & 1).map(unitLabel),
    arrows: [...new Set(basis.filter((unused, i) => (mask >> i) & 1)
      .map((unit) => unit.arrow))],
  });
  return {
    testedNonzeroCoordinateSubspaces: 2 ** basis.length - 1,
    nullCoordinateSubspaceCount: nullMasks.length,
    nullCoordinateSubspacesByDimension: Object.fromEntries(
      [...new Set(nullMasks.map((mask) =>
        basis.filter((unused, i) => (mask >> i) & 1).length))]
        .sort((a, b) => a - b)
        .map((dimension) => [dimension, nullMasks.filter((mask) =>
          basis.filter((unused, i) => (mask >> i) & 1).length === dimension).length])),
    maximalNullCoordinateSubspaces: maximalMasks.map(describe),
  };
};
const arrowNames = arrowsA.map((edge) => edge.name);
const auditTopology = (id, basis) => {
  const subsetAudits = [];
  for (let mask = 1; mask < 2 ** arrowNames.length; mask += 1) {
    const names = new Set(arrowNames.filter((unused, i) => (mask >> i) & 1));
    subsetAudits.push({
      arrows: [...names],
      complexDimension: basis.filter((unit) => names.has(unit.arrow)).length,
      oneSided: analyzeSectorSubset(basis, names, false),
      symmetricJordan: analyzeSectorSubset(basis, names, true),
    });
  }
  return {
    id,
    individualSectors: subsetAudits.filter((entry) => entry.arrows.length === 1),
    oneSidedNullSectorSubspaces: subsetAudits
      .filter((entry) => entry.oneSided.nullIncidence)
      .map((entry) => ({ arrows: entry.arrows, complexDimension: entry.complexDimension })),
    symmetricJordanNullSectorSubspaces: subsetAudits
      .filter((entry) => entry.symmetricJordan.nullIncidence)
      .map((entry) => ({ arrows: entry.arrows, complexDimension: entry.complexDimension })),
    oneSidedCoordinateAudit: analyzeAllCoordinateSubspaces(basis, false),
    symmetricJordanCoordinateAudit: analyzeAllCoordinateSubspaces(basis, true),
  };
};
const topologyAudits = [
  auditTopology("A", basisA),
  auditTopology("B", basisB),
];
assert(topologyAudits.every((audit) =>
  JSON.stringify(audit.oneSidedNullSectorSubspaces) ===
    JSON.stringify([{ arrows: ["L"], complexDimension: 2 }])
  && JSON.stringify(audit.symmetricJordanNullSectorSubspaces) ===
    JSON.stringify([{ arrows: ["L"], complexDimension: 2 }])));
for (const audit of topologyAudits) {
  for (const coordinateAudit of [
    audit.oneSidedCoordinateAudit,
    audit.symmetricJordanCoordinateAudit,
  ]) {
    assert.equal(coordinateAudit.testedNonzeroCoordinateSubspaces, 32767);
    assert.equal(coordinateAudit.nullCoordinateSubspaceCount, 3);
    assert.deepEqual(coordinateAudit.nullCoordinateSubspacesByDimension, { 1: 2, 2: 1 });
    assert.equal(coordinateAudit.maximalNullCoordinateSubspaces.length, 1);
    assert.deepEqual(coordinateAudit.maximalNullCoordinateSubspaces[0].arrows, ["L"]);
    assert.equal(coordinateAudit.maximalNullCoordinateSubspaces[0].complexDimension, 2);
  }
}

console.log(JSON.stringify({
  protocol: "furey-conjugate-twisted-ternary-incidence/1",
  ambientDimension: totalDimension,
  troComplexDimension: basisA.length,
  antiunitaryExchange: "Theta swaps O1 and R and conjugates coefficients",
  complexLinearMiddleMap: "J(x)=Theta(x)^dagger",
  probes: "all fifteen matrix units of the surviving TRO A",
  topologyAudits,
  conclusion: "In both exchange-related one-generation TRO topologies, the lepton doublet L is the unique nonzero union of physical arrow sectors and the unique maximal nonzero coordinate matrix-unit subspace satisfying both conjugate-twisted ternary incidence laws against all physical probes.",
  passed: true,
}, null, 2));
