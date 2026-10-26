import assert from "node:assert/strict";
import fs from "node:fs";

const record=JSON.parse(fs.readFileSync(new URL("../../evidence/data/regulus-mub-selector-dynamics-v1.json",import.meta.url),"utf8"));
assert.equal(record.schemaVersion,"regulus-mub-selector-dynamics-v1");
assert.equal(record.finiteOperatorModel.hilbertDimension,9);
assert.equal(record.finiteOperatorModel.lagrangianCommutingClasses,40);
assert.equal(record.finiteOperatorModel.stabilizerStates,360);
assert.equal(record.finiteOperatorModel.frames,36);
assert.deepEqual(record.finiteOperatorModel.basesPerFrame,[10]);
assert.equal(record.finiteOperatorModel.statesPerFrame,90);
assert.equal(record.finiteOperatorModel.nonidentityPaulisCoveredPerFrame,80);
assert.equal(record.finiteOperatorModel.framePlaneIndices.length,36);
assert.ok(record.finiteOperatorModel.framePlaneIndices.every(frame=>frame.length===10));
for(const residual of Object.values(record.finiteOperatorModel.maximumNumericalResiduals))assert.ok(residual<record.finiteOperatorModel.tolerance);
assert.deepEqual(record.overlapAssociationScheme.framePairOverlapDistribution,{1:360,4:270});
assert.deepEqual(record.overlapAssociationScheme.degreeByOverlap,{1:[20],4:[15]});
assert.deepEqual(record.overlapAssociationScheme.fourBasisGraphParameters,[36,15,6,6]);
assert.deepEqual(record.overlapAssociationScheme.oneBasisGraphParameters,[36,20,10,12]);
assert.ok(record.overlapAssociationScheme.fourBasisNeighbors.every(neighbors=>neighbors.length===15));
assert.ok(record.overlapAssociationScheme.oneBasisNeighbors.every(neighbors=>neighbors.length===20));
assert.deepEqual(record.overlapAssociationScheme.adjacencyEigenvalues.fourBasis,{15:1,3:15,"-3":20});
assert.deepEqual(record.overlapAssociationScheme.adjacencyEigenvalues.oneBasis,{20:1,2:20,"-4":15});
assert.equal(record.overlapAssociationScheme.boseMesnerMultiplication.verifiedByExactMatrixProducts,true);
assert.deepEqual(record.overlapAssociationScheme.cliqueComplex,{
  fourBasisMaximalCliqueDistribution:{4:135},
  fourBasisEdgeK4Multiplicity:[3],
  oneBasisMaximalCliqueDistribution:{3:120,5:216},
  oneBasisEdgeMaximalK3Multiplicity:[1],
  oneBasisEdgeMaximalK5Multiplicity:[6],
});
assert.equal(record.overlapAssociationScheme.maximalOneBasisTriangles.length,120);
assert.equal(record.overlapAssociationScheme.maximalOneBasisFiveCliques.length,216);
assert.deepEqual(record.overlapAssociationScheme.exceptionalCliqueRecovery,{
  maximalOneBasisTriangles:120,
  triangleMeaning:"the 120 maximal K3s are exactly the symmetric-difference closures of azygetic double-six pairs",
  maximalOneBasisFiveCliques:216,
  fiveCliqueMeaning:"intersection of the five double-sixes is a unique skew pair of cubic lines; all 216 skew pairs occur once",
  maximalFourBasisFourCliques:135,
  fourCliqueMeaning:"the union of the four double-sixes omits one three-line tritangent; each of the 45 tritangents occurs for exactly three K4s",
  distinctRecoveredSkewPairs:216,
  distinctRecoveredTritangents:45,
});
assert.match(record.noiseChannel.boundary,/cannot select one frame/);
assert.equal(record.heckeCompression.fullWeylGroupOrder/record.heckeCompression.flagStabilizerOrder,432);
assert.equal(record.heckeCompression.fullWeylGroupOrder/record.heckeCompression.doubleSixStabilizerOrder,36);
assert.equal(record.heckeCompression.doubleSixStabilizerOrder/record.heckeCompression.flagStabilizerOrder,12);
assert.match(record.heckeCompression.interpretation,/fiber-constant Hecke compression/);
assert.match(record.selectorDynamics.uniqueSelectionBoundary,/requires an external field/);
assert.match(record.selectorDynamics.zeroTemperatureRelationOptimization.fourBasisAttraction,/135 K4-supported/);
assert.match(record.selectorDynamics.zeroTemperatureRelationOptimization.oneBasisAttraction,/216 K5-supported/);
assert.match(record.liftObstructions.noEquivariantIntegralSection,/maximal order 1152/);
assert.match(record.liftObstructions.noFaithfulRealFourCarrier,/impossible/);
assert.match(record.experimentalBoundary.negativeResult,/falsifies the relation-invariant dynamics/);

console.log(JSON.stringify({
  status:"PASS",
  operatorModel:"40 commuting classes give 360 stabilizer states; 36 spreads give complete ten-basis two-qutrit MUBs",
  associationScheme:"frame relations close on span{I,A4,A1} with sectors 1+15+20",
  cliqueClosure:"frame overlaps recover 120 azygetic closures, 216 skew line pairs and 45 tritangents",
  dynamics:"two decay rates identify every relation-invariant continuous Markov channel",
  selector:"linear symmetric noise mixes; frame selection needs symmetry breaking or nonlinear history",
  lift:"the carrier reduces from Sp(4,Z), but the full finite action has no integral or real four-dimensional equivariant section",
}));
