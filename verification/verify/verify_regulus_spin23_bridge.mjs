import assert from "node:assert/strict";
import fs from "node:fs";

const record=JSON.parse(fs.readFileSync(new URL("../../evidence/data/regulus-spin23-bridge-v1.json",import.meta.url),"utf8"));
assert.equal(record.schemaVersion,"regulus-spin23-bridge-v1");
assert.equal(record.finiteCarrier.totalTwoPlanes,130);
assert.equal(record.finiteCarrier.lagrangianPlanes,40);
assert.equal(record.finiteCarrier.projectiveNullPoints,40);
assert.equal(record.finiteCarrier.quadricLines,40);
assert.deepEqual(record.finiteCarrier.pointsPerLine,[4]);
assert.deepEqual(record.finiteCarrier.linesPerPoint,[4]);
assert.equal(record.finiteCarrier.eachQuadricLineIsLagrangianPencil,true);
assert.equal(record.finiteCarrier.spreads.count,0);
assert.deepEqual(record.hyperplaneSections.sizeDistribution,{10:36,13:40,16:45});
assert.equal(record.hyperplaneSections.hyperbolicSections,45);
assert.deepEqual(record.hyperplaneSections.rulingSizes,[4,4]);
assert.deepEqual(record.hyperplaneSections.sectionCountPerPoint,[18]);
assert.deepEqual(record.hyperplaneSections.sectionCountPerLine,[9]);
assert.deepEqual(record.hyperplaneSections.pairIntersectionDistribution,{4:270,7:720});
assert.deepEqual(record.hyperplaneSections.pairIntersectionDegrees,{4:[12],7:[32]});
assert.deepEqual(record.hyperplaneSections.fourPointIntersectionGraph.stronglyRegularParameters,[45,12,3,3]);
assert.equal(record.hyperplaneSections.reconstructedTwentySeven.maximalFiveCliques,27);
assert.deepEqual(record.hyperplaneSections.reconstructedTwentySeven.sectionsPerClique,[5]);
assert.deepEqual(record.hyperplaneSections.reconstructedTwentySeven.cliquesPerSection,[3]);
assert.deepEqual(record.hyperplaneSections.reconstructedTwentySeven.cliquesPerAdjacentPair,[1]);
assert.equal(record.hyperplaneSections.reconstructedThirtySix.ellipticSections,36);
assert.deepEqual(record.hyperplaneSections.reconstructedThirtySix.ellipticStabilizerOrbitOnTwentySeven,[12,15]);
assert.equal(record.hyperplaneSections.reconstructedThirtySix.incidencePairs,432);
assert.deepEqual(record.hyperplaneSections.reconstructedThirtySix.linesPerEllipticSection,[12]);
assert.deepEqual(record.hyperplaneSections.reconstructedThirtySix.ellipticSectionsPerLine,[16]);
assert.equal(record.hyperplaneSections.reconstructedThirtySix.verifiedForAllEllipticSections,true);
assert.equal(record.hyperplaneSections.reconstructedThirtySix.sixLineRows,72);
assert.deepEqual(record.hyperplaneSections.reconstructedThirtySix.pairIntersectionDistribution,{4:270,6:360});
assert.deepEqual(record.hyperplaneSections.reconstructedThirtySix.pairIntersectionDegrees,{4:[15],6:[20]});
assert.equal(record.hyperplaneSections.reconstructedThirtySix.azygeticTriads,120);
assert.deepEqual(record.hyperplaneSections.reconstructedThirtySix.azygeticPairClosureMultiplicity,[1]);
assert.equal(record.hyperplaneSections.reconstructedForty.steinerTrihedralPairs,120);
assert.deepEqual(record.hyperplaneSections.reconstructedForty.trihedraPerPair,[2]);
assert.equal(record.hyperplaneSections.reconstructedForty.steinerTriads,40);
assert.equal(record.hyperplaneSections.reconstructedForty.cubicLinesPartitionedByEachTriad,true);
assert.deepEqual(record.hyperplaneSections.reconstructedForty.tangentSectionStabilizerOrbitSizes,[1,12,27]);
assert.deepEqual(record.hyperplaneSections.reconstructedForty.polarLineStabilizerOrbitSizes,[4,36]);
assert.equal(record.hyperplaneSections.reconstructedForty.equivariantCarrier,"tangent sections / Lagrangian points");
assert.equal(record.hyperplaneSections.reconstructedForty.equivariantBijectionPairs,40);
assert.equal(record.hyperplaneSections.reconstructedTwoForty.trihedra,240);
assert.deepEqual(record.hyperplaneSections.reconstructedTwoForty.trihedraPerLagrangianPoint,[6]);
assert.deepEqual(record.hyperplaneSections.reconstructedTwoForty.pspOrbitSizes,[240]);
assert.deepEqual(record.hyperplaneSections.reconstructedTwoForty.corpusFiberPspOrbitSizes,[80,80,80]);
assert.equal(record.hyperplaneSections.reconstructedTwoForty.equivariantVerdict,"not the same PSp(4,3)-set");
assert.equal(record.closure.verifiedForEveryHyperbolicSection,true);
assert.equal(record.exceptionalComparison.sp4Order,51840);
assert.equal(record.exceptionalComparison.projectiveSp4Order,25920);
assert.equal(record.exceptionalComparison.hyperbolicSectionOrbit,45);
assert.equal(record.exceptionalComparison.projectiveStabilizerOrder,576);
assert.equal(record.exceptionalComparison.reconstructedLineOrbit,27);
assert.equal(record.exceptionalComparison.projectiveLineStabilizerOrder,960);
assert.equal(record.exceptionalComparison.ellipticSectionOrbit,36);
assert.equal(record.exceptionalComparison.projectiveEllipticStabilizerOrder,720);
assert.equal(record.outerCompletion.symplecticMultiplier,2);
assert.equal(record.outerCompletion.normalizesSp4,true);
assert.equal(record.outerCompletion.projectivelyOutsideSp4,true);
assert.equal(record.outerCompletion.extendedProjectiveOrder,51840);
assert.deepEqual(record.outerCompletion.actsOn,{cubicLines:27,doubleSixes:36,steinerTriads:40,tritangentPlanes:45});
assert.equal(record.outerCompletion.preservesCubicLineIncidence,true);
assert.equal(record.heckeCarrierJoin.flags,432);
assert.equal(record.heckeCarrierJoin.fullProjectiveStabilizerOrder,120);
assert.equal(record.heckeCarrierJoin.stabilizerPermutationOrder,120);
assert.equal(record.heckeCarrierJoin.homogeneousSpace,"W(E6)/S5");
assert.equal(record.heckeCarrierJoin.stabilizerOrbitalCount,26);
assert.equal(record.heckeCarrierJoin.commutantDimension,26);
assert.match(record.exceptionalComparison.boundary,/must not be identified/);
assert.match(record.verdict,/No dynamics or physical identification/);

console.log(JSON.stringify({
  status:"PASS",
  carrier:"Q(4,3) has 40 Lagrangian points and 40 four-point pencils",
  reguli:"45 hyperbolic sections each split into two four-line rulings",
  closure:"three lines recover exactly the opposite four-line regulus",
  graph:"section graph is SRG(45,12,3,3)",
  exceptional:"the carrier reconstructs 27 lines, 36 double-sixes, 40 Steiner triads and 45 tritangents",
  symmetry:"an anti-symplectic similitude completes PSp(4,3) to the order-51840 W(E6) action",
  hecke:"432 double-six/line flags form W(E6)/S5 with orbital rank 26",
  nearMiss:"240 trihedra have the right 40x3x2 typing but the wrong PSp(4,3) orbit structure for the phase fibers",
  boundary:"E6 comparison is exact at group-action type, not yet a canonical cubic-surface labelling",
}));
