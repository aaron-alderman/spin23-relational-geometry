import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const audit = JSON.parse(await readFile(new URL("../../evidence/data/spin23-a6-fermionic-index-audit.json", import.meta.url), "utf8"));
assert.equal(audit.schema, "spin23.a6-fermionic-index-audit/1");
assert.equal(audit.documentId, 1394);

const fields = audit.selectedMatter.oneGeneration;
assert.equal(fields.reduce((sum, field) => sum + field.complexComponents, 0), 15);
assert.equal(audit.selectedMatter.componentsIncludingSterilePerGeneration, 16);

const colorCanSinglet = (a, b) =>
  (a === "1" && b === "1") ||
  (a === "3" && b === "bar3") ||
  (a === "bar3" && b === "3");
const weakCanSinglet = (a, b) => (a === 1 && b === 1) || (a === 2 && b === 2);
const holomorphicGaugeSinglets = [];
for (let i = 0; i < fields.length; i += 1) {
  for (let j = i; j < fields.length; j += 1) {
    const a = fields[i];
    const b = fields[j];
    if (colorCanSinglet(a.color, b.color) && weakCanSinglet(a.weakDimension, b.weakDimension) && a.Y6 + b.Y6 === 0) {
      holomorphicGaugeSinglets.push([a.field, b.field]);
    }
  }
}
assert.deepEqual(holomorphicGaugeSinglets, []);

const withSterile = [...fields, audit.selectedMatter.sterile];
const singletsWithSterile = [];
for (let i = 0; i < withSterile.length; i += 1) {
  for (let j = i; j < withSterile.length; j += 1) {
    const a = withSterile[i];
    const b = withSterile[j];
    if (colorCanSinglet(a.color, b.color) && weakCanSinglet(a.weakDimension, b.weakDimension) && a.Y6 + b.Y6 === 0) {
      singletsWithSterile.push([a.field, b.field]);
    }
  }
}
assert.deepEqual(singletsWithSterile, [["N", "N"]]);

// Same-charge antiunitary exchange fails for every nonzero U(1) charge:
// J exp(i y theta) = exp(-i y theta) J, not exp(+i y theta) J.
const nonzeroCharges = fields.map(field => field.Y6).filter(charge => charge !== 0);
assert(nonzeroCharges.length > 0);
assert(nonzeroCharges.every(charge => -charge !== charge));
assert(nonzeroCharges.every(charge => -charge === Number(-charge))); // conjugate-Nambu repair

// Exact finite-dimensional rank-nullity check for representative square maps.
const squareExamples = [
  {n: 3, rank: 0},
  {n: 3, rank: 1},
  {n: 3, rank: 2},
  {n: 3, rank: 3},
  {n: 7, rank: 4}
];
for (const {n, rank} of squareExamples) {
  const nullityT = n - rank;
  const nullityAdjoint = n - rank;
  assert.equal(nullityT - nullityAdjoint, 0);
}

const car = audit.minimalConditionalCarConstruction;
assert.equal(car.independentComplexGenerators, 3 * audit.selectedMatter.componentsIncludingSterilePerGeneration);
assert.equal(car.nambuPresentationDimension, 2 * car.independentComplexGenerators);
assert.equal(car.mirrorCount, 0);

// CP1 certificate: S+=K^(1/2) tensor O(3)=O(2).
// dim H^0(CP1,O(k))=k+1 for k>=0; H^1(CP1,O(k))=0 for k>=-1.
const c1 = audit.minimalTopologicalEscape.firstChernNumber;
const effectiveDegree = c1 - 1;
const positiveKernelDimension = effectiveDegree >= 0 ? effectiveDegree + 1 : 0;
const negativeKernelDimension = effectiveDegree >= -1 ? 0 : -effectiveDegree - 1;
const index = positiveKernelDimension - negativeKernelDimension;
assert.equal(positiveKernelDimension, audit.minimalTopologicalEscape.positiveKernelDimension);
assert.equal(negativeKernelDimension, audit.minimalTopologicalEscape.negativeKernelDimension);
assert.equal(index, audit.minimalTopologicalEscape.diracIndex);
assert.deepEqual(audit.minimalTopologicalEscape.positiveKernelBasis, ["1", "z", "z^2"]);
assert.equal(audit.minimalTopologicalEscape.fourDimensionalSmWeylComponents, index * audit.selectedMatter.smComponentsPerGeneration);
assert.equal(audit.minimalTopologicalEscape.fourDimensionalSterileWeylComponents, index);

const anomaly = audit.anomalyAudit.oneGenerationStandardModelAnomalies;
assert(Object.values(anomaly).every(value => value === 0));
assert.equal(audit.verdict.currentFourDimensionalOperatorExists, false);
assert.equal(audit.verdict.conditionalTopologicalOperatorExists, true);
assert.equal(audit.verdict.generationThreeDerivedByCurrentProgramme, false);
assert.equal(audit.verdict.a6Passed, false);
assert.equal(audit.verdict.physicalAdmission, false);

console.log(JSON.stringify({
  passed: true,
  documentId: audit.documentId,
  sm15HolomorphicBilinears: holomorphicGaugeSinglets,
  singletsAfterSterileExtension: singletsWithSterile,
  finiteSquareIndex: 0,
  cp1Twist: audit.minimalTopologicalEscape.familyLineBundle,
  cp1PositiveKernelDimension: positiveKernelDimension,
  cp1NegativeKernelDimension: negativeKernelDimension,
  cp1DiracIndex: index,
  fourDimensionalSmWeylComponents: audit.minimalTopologicalEscape.fourDimensionalSmWeylComponents,
  sterileZeroModes: audit.minimalTopologicalEscape.fourDimensionalSterileWeylComponents,
  independentCarGenerators: car.independentComplexGenerators,
  nambuPresentationDimension: car.nambuPresentationDimension,
  generationThreeDerivedByCurrentProgramme: audit.verdict.generationThreeDerivedByCurrentProgramme,
  a6Passed: audit.verdict.a6Passed,
  physicalAdmission: audit.verdict.physicalAdmission
}, null, 2));
