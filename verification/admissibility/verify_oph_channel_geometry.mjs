import { readFileSync } from "node:fs";

const data = JSON.parse(readFileSync("evidence/data/oph-channel-geometry-and-overlap-v1.json", "utf8"));
const requireCondition = (condition, message) => {
  if (!condition) throw new Error(message);
};

const multiplicity = data.fixedPointGeometry.seamKeyMultiplicities;
requireCondition(Object.values(multiplicity).reduce((a, b) => a + b, 0) === 78, "seam-key multiplicities do not cover the carrier");
requireCondition(data.source.matrixUnits === data.source.carrierStates ** 2, "matrix-unit count mismatch");

const tDimension = multiplicity["00"] ** 2
  + multiplicity["10"] ** 2 / 2
  + multiplicity["01"] ** 2 / 2
  + multiplicity["11"] ** 2;
const coherenceDifference = 2 * multiplicity["00"] * multiplicity["11"];
requireCondition(tDimension === data.fixedPointGeometry.T.fixedSpaceDimension, "T fixed-space dimension mismatch");
requireCondition(tDimension + coherenceDifference === data.fixedPointGeometry.E.fixedSpaceDimension, "E fixed-space dimension mismatch");
requireCondition(coherenceDifference === data.fixedPointGeometry.differenceDimension, "E/T difference mismatch");

requireCondition(data.choiGeometry.realParameters === 9, "wrong real dimension for five multipliers");
requireCondition(data.choiGeometry.blocks.join(",") === "2,4,2", "wrong Choi block partition");
requireCondition(data.continuousTimeEmbedding.allFamilyMembersNonInjective === true, "non-injectivity boundary missing");
requireCondition(data.continuousTimeEmbedding.finiteTimeBoundedGeneratorEmbedding === false, "finite-time generator no-go missing");

requireCondition(data.jordanCornerCensus.complexTwoLevelCornersRetainedByE === multiplicity["00"], "Jordan-corner count mismatch");
requireCondition(Object.values(data.jordanCornerCensus.spectatorPermutationOrbits).reduce((a, b) => a + b, 0) === multiplicity["00"], "spectator orbits do not cover the corners");
requireCondition(data.jordanCornerCensus.selfAdjointRealDimension === 4, "H2(C) dimension mismatch");
requireCondition(data.jordanCornerCensus.H2RRealDimension === 3, "H2(R) dimension mismatch");
requireCondition(data.jordanCornerCensus.canonicalH2RSelected === false, "canonical H2(R) boundary lost");

const laws = Object.values(data.twoSeamOverlapCensus.namedLaws);
requireCondition(laws.every(row => row.disjointDifferingMatrixUnits === 0), "a disjoint-seam law failed to commute");
requireCondition(laws.every(row => row.adjacentDifferingMatrixUnits > 0), "an adjacent-seam order was incorrectly identified");
requireCondition(data.twoSeamOverlapCensus.scheduleIndependentLocalClosure === false, "schedule boundary lost");

const sumFractions = record => Object.values(record).reduce((sum, value) => {
  const [numerator, denominator = "1"] = value.split("/");
  return sum + Number(numerator) / Number(denominator);
}, 0);
const witness = data.twoSeamOverlapCensus.diagonalWitness;
requireCondition(sumFractions(witness.first01Then05) === 1, "forward witness is not normalized");
requireCondition(sumFractions(witness.first05Then01) === 1, "reverse witness is not normalized");
requireCondition(JSON.stringify(witness.first01Then05) !== JSON.stringify(witness.first05Then01), "order witness collapsed");

console.log(JSON.stringify({
  result: "pass",
  carrierStates: data.source.carrierStates,
  matrixUnits: data.source.matrixUnits,
  choiRealDimension: data.choiGeometry.realParameters,
  fixedDimensions: { E: data.fixedPointGeometry.E.fixedSpaceDimension, T: data.fixedPointGeometry.T.fixedSpaceDimension },
  emptyFullDifference: data.fixedPointGeometry.differenceDimension,
  jordanCorners: data.jordanCornerCensus.complexTwoLevelCornersRetainedByE,
  adjacentScheduleDependentLaws: laws.length,
  disjointCommutingLaws: laws.length,
  finiteTimeGeneratorEmbedding: data.continuousTimeEmbedding.finiteTimeBoundedGeneratorEmbedding,
  canonicalH2RSelected: data.jordanCornerCensus.canonicalH2RSelected
}, null, 2));
