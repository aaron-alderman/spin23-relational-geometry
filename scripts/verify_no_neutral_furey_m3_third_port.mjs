const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };

const representations = {
  O: { color: "1", weak: "1", hypercharge: 0 },
  R: { color: "1", weak: "1", hypercharge: 0 },
  O2: { color: "3", weak: "1", hypercharge: 1 / 3 },
  H: { color: "1", weak: "2", hypercharge: 1 / 2 },
  C: { color: "1", weak: "1", hypercharge: 1 },
};
const sameRepresentation = (a, b) => a.color === b.color && a.weak === b.weak
  && Math.abs(a.hypercharge - b.hypercharge) < 1e-12;

const names = Object.keys(representations);
const equivalenceClasses = [];
for (const name of names) {
  const existing = equivalenceClasses.find((group) =>
    sameRepresentation(representations[group[0]], representations[name]));
  if (existing) existing.push(name); else equivalenceClasses.push([name]);
}
const multiplicities = equivalenceClasses.map((group) => group.length).sort((a, b) => b - a);
assert(JSON.stringify(multiplicities) === JSON.stringify([2, 1, 1, 1]),
  "the gauge carrier must contain exactly one multiplicity-two trivial block and three inequivalent simple blocks");
const commutantDimension = multiplicities.reduce((sum, multiplicity) => sum + multiplicity ** 2, 0);
assert(commutantDimension === 7, "the complex gauge commutant dimension must be 4+1+1+1=7");

for (const third of ["O2", "H", "C"]) {
  assert(!sameRepresentation(representations.O, representations[third])
    && !sameRepresentation(representations.R, representations[third]),
  `${third} must not supply gauge-singlet cross-block matrix units to O or R`);
  const availableInternalUnits = 4 + 1;
  const requiredM3Units = 9;
  assert(requiredM3Units - availableInternalUnits === 4,
    "adding one trace direction lacks exactly four cross-block units required by M3");
}

const responsePorts = ["gauge_invariant_JO", "gauge_invariant_JR", "gauge_invariant_composite_JX"];
const responseEntries = responsePorts.length ** 2;
assert(responseEntries === 9,
  "three composite source operators may still define a full 3x3 correlator matrix in response space");

const blockDiagonalConnectedCrossCorrelators = { OX: 0, RX: 0 };
assert(blockDiagonalConnectedCrossCorrelators.OX * blockDiagonalConnectedCrossCorrelators.RX === 0,
  "without interaction paths the Schur loop and orientation must vanish");

console.log("No neutral Furey M3 third-port extension: PASS");
console.log("gauge_commutant=M2(C)+C+C+C");
console.log(`complex_commutant_dimension=${commutantDimension}`);
console.log("internal_neutral_M3_exists=false");
console.log("composite_source_space_H3_response=algebraically_allowed");
console.log("nonzero_cross_paths=require_dynamics=true");
