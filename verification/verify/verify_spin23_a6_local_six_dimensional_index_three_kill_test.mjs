import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const evidencePath = path.join(
  root,
  "evidence/data/spin23-a6-local-six-dimensional-index-three-kill-test.json",
);
const data = JSON.parse(readFileSync(evidencePath, "utf8"));

assert.equal(data.documentId, 1450);
assert.equal(data.geometry.chernNumber, 3);
assert.equal(data.geometry.positiveKernelDimension, 3);
assert.equal(data.geometry.negativeKernelDimension, 0);
assert.equal(data.geometry.index, 3);
assert.equal(data.geometry.conjugateIndex, -3);

const rows = data.multiplets;
const componentSum = rows.reduce((sum, row) => sum + row.componentDimension, 0);
const smOnly = rows
  .filter((row) => row.name !== "N")
  .reduce((sum, row) => sum + row.componentDimension, 0);
assert.equal(componentSum, 16);
assert.equal(smOnly, 15);
assert.equal(data.modeCount.selectedSMWeylComponents, smOnly * data.geometry.index);
assert.equal(data.modeCount.selectedSterileComponents, 3);
assert.equal(data.modeCount.selectedTotalParticleComponents, componentSum * 3);
assert.equal(
  data.modeCount.nambuPresentationComponents,
  2 * data.modeCount.selectedTotalParticleComponents,
);

const weightedY = (power) =>
  rows.reduce(
    (sum, row) => sum + row.componentDimension * row.Y6 ** power,
    0,
  );
assert.equal(weightedY(1), 0);
assert.equal(weightedY(2), 120);
assert.equal(weightedY(3), 0);
assert.equal(weightedY(4), 2280);

const su3Quartic = rows
  .filter((row) => row.isColorFundamental)
  .reduce((sum, row) => sum + row.weakDimension, 0);
const su2Quartic = rows
  .filter((row) => row.isWeakDoublet)
  .reduce((sum, row) => sum + row.colorDimension, 0);
const su3Y2 = rows
  .filter((row) => row.isColorFundamental)
  .reduce((sum, row) => sum + row.weakDimension * row.Y6 ** 2, 0);
const su2Y2 = rows
  .filter((row) => row.isWeakDoublet)
  .reduce((sum, row) => sum + row.colorDimension * row.Y6 ** 2, 0);
const ySu3Cubed = rows
  .filter((row) => row.isColorFundamental)
  .reduce(
    (sum, row) =>
      sum + row.weakDimension * row.Y6 * row.colorCubicSign,
    0,
  );
assert.equal(su3Quartic, 4);
assert.equal(su2Quartic, 4);
assert.equal(su3Y2, 22);
assert.equal(su2Y2, 12);
assert.equal(ySu3Cubed, 4);

const six = data.sixDimensionalAnomalyRelativeTraces;
assert.equal(six.irreducibleGravitationalDimensionCoefficient, componentSum);
assert.equal(six.sumDimensionTimesY6, weightedY(1));
assert.equal(six.sumDimensionTimesY6Squared, weightedY(2));
assert.equal(six.sumDimensionTimesY6Cubed, weightedY(3));
assert.equal(six.sumDimensionTimesY6Fourth, weightedY(4));
assert.equal(six.su3QuarticFundamentalCount, su3Quartic);
assert.equal(six.su2QuarticDoubletCount, su2Quartic);
assert.equal(six.su3SquaredY6Squared, su3Y2);
assert.equal(six.su2SquaredY6Squared, su2Y2);
assert.equal(six.Y6Su3Cubed, ySu3Cubed);
assert.equal(six.irreducibleY6Su3CubedCancels, false);
assert.equal(six.globalSu2DoubletExcess, su2Quartic);
assert.notEqual(
  six.globalSu2DoubletExcess % six.globalSu2CancellationModulus,
  0,
);
assert.equal(six.globalSu2AnomalyCancels, false);
assert.equal(six.indexThreeDoesNotMultiplyBulkAnomalyCarriers, true);
assert.equal(six.localAnomalyCancels, false);

const su3Cubed4d = rows.reduce(
  (sum, row) => sum + row.weakDimension * row.colorCubicSign,
  0,
);
const su3SquaredY4d = rows
  .filter((row) => row.isColorFundamental)
  .reduce((sum, row) => sum + row.weakDimension * row.Y6, 0);
const su2SquaredY4d = rows
  .filter((row) => row.isWeakDoublet)
  .reduce((sum, row) => sum + row.colorDimension * row.Y6, 0);
assert.equal(su3Cubed4d, 0);
assert.equal(su3SquaredY4d, 0);
assert.equal(su2SquaredY4d, 0);
assert.equal(data.fourDimensionalAnomalies.Y6Cubed, weightedY(3));
assert.equal(data.fourDimensionalAnomalies.weakDoubletsPerFamily % 2, 0);

const family = data.dynamicalUniversalFamilyU1AnomaliesPerFamily;
assert.equal(family.gravitationalSquaredF, componentSum);
assert.equal(family.FCubed, componentSum);
assert.equal(family.su3SquaredF, su3Quartic);
assert.equal(family.su2SquaredF, su2Quartic);
assert.equal(family.Y6SquaredF, weightedY(2));
assert.equal(family.Y6FSquared, weightedY(1));
assert.equal(family.anomalyFree, false);

const n = data.kkSpectrum.monopoleNumber;
const k = data.kkSpectrum.firstK;
assert.equal(Math.sqrt(k * (k + Math.abs(n))), 2);
assert.equal(2 * k + Math.abs(n), 5);
assert.equal(data.kkSpectrum.firstMassInInverseRadiusUnits, 2);
assert.equal(data.kkSpectrum.firstDegeneracyPerSign, 5);

assert.equal(data.sterileMajorana.bilinearTwist, "O(6)");
assert.equal(data.sterileMajorana.requiredCoefficientTwist, "O(-6)");
assert.equal(data.sterileMajorana.majoranaMassDerived, false);
assert.equal(data.carReality.realStructureExchangesFluxBlocks, true);
assert.equal(data.verdict.formalGaugeEquivariantOperatorConstructed, true);
assert.equal(data.verdict.minimalLocalSixDimensionalTheoryRuledOut, true);
assert.equal(data.verdict.threePhysicalGenerationsDerived, false);
assert.equal(data.verdict.a6Passed, false);
assert.equal(data.verdict.physicalAdmission, false);

console.log(
  "PASS 1450: universal index-three formal operator verified; minimal local 6D parent fails anomaly/mirror/Majorana checks.",
);
