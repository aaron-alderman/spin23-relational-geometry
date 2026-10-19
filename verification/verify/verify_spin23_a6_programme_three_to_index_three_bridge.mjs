import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const audit = JSON.parse(await readFile(new URL("../../evidence/data/spin23-a6-programme-three-to-index-three-bridge.json", import.meta.url), "utf8"));
assert.equal(audit.schema, "spin23.a6-programme-three-to-index-three-bridge/1");
assert.equal(audit.documentId, 1397);

// Work in Pic(CP1)=Z. O(a) tensor O(b)=O(a+b), and c1 is degree.
const degree = {
  L: -1,
  Qfixed: 0,
  QmovingQuotient: 1
};
const tangentSummands = [
  -degree.L + degree.Qfixed,
  -degree.L + degree.QmovingQuotient
];
assert.deepEqual(tangentSummands, [1, 2]);
assert.equal(tangentSummands.reduce((a, b) => a + b, 0), 3);
assert.equal(audit.completionLineEmbedding.chernNumbers.integralC1Tangent, 3);
assert.equal(audit.completionLineEmbedding.chernNumbers.integralC1DetTangent, 3);
assert.equal(audit.completionLineEmbedding.normalBundle, "O(1)");
assert.equal(audit.completionLineEmbedding.intrinsicTangentOfCP1, "O(2)");

// Spin Dirac on CP1 twisted by O(k): S+=O(-1), hence ker+=H0(O(k-1)).
// For k>=0, index=k; for k=3 the explicit holomorphic basis is 1,z,z^2.
const twistDegree = 3;
const positiveDegree = twistDegree - 1;
const positiveKernel = positiveDegree >= 0 ? positiveDegree + 1 : 0;
const negativeKernel = positiveDegree >= -1 ? 0 : -positiveDegree - 1;
assert.equal(positiveKernel, audit.diracIndex.positiveKernelDimension);
assert.equal(negativeKernel, audit.diracIndex.negativeKernelDimension);
assert.equal(positiveKernel - negativeKernel, audit.diracIndex.index);
assert.deepEqual(audit.diracIndex.positiveKernelBasis, ["1", "z", "z^2"]);
assert.deepEqual(audit.diracIndex.alternativeTangentTwist.componentIndices, tangentSummands);

// The universal fundamental module restricts as O(-1)+O+O(1), so its total index is zero.
const fundamentalDegrees = [-1, 0, 1];
assert.deepEqual(fundamentalDegrees, audit.centerAndFundamentalAudit.fundamentalComponentIndices);
assert.equal(fundamentalDegrees.reduce((a, b) => a + b, 0), audit.centerAndFundamentalAudit.fundamentalTotalIndex);

// Center audit at t=2pi/3: weights divisible by three are center blind.
const centerPhaseIsTrivial = weight => weight % 3 === 0;
assert(centerPhaseIsTrivial(audit.centerAndFundamentalAudit.tangentWeight));
assert(centerPhaseIsTrivial(audit.centerAndFundamentalAudit.detTangentWeight));

// A tensor cube multiplies an existing degree; it cannot generate degree without R.
const cubeDegree = k => 3 * k;
assert.equal(cubeDegree(0), 0);
assert.equal(cubeDegree(1), 3);

// For the non-effective weight-three Hopf action, a physical charge q descends
// to ordinary coarse-space degree q/3 only when q is divisible by three.
const descendedCoarseDegree = q => q % 3 === 0 ? q / 3 : null;
assert.equal(descendedCoarseDegree(3), 1);
assert.equal(descendedCoarseDegree(1), null);

// CP1 has no nontrivial flat Z3 bundle: H1(S2,Z3)=0.
const h1Cp1Z3Dimension = 0;
assert.equal(h1Cp1Z3Dimension, 0);

assert.equal(audit.typedBridge.bundleLevelExists, true);
assert.equal(audit.typedBridge.physicalOperatorLevelExists, false);
assert.equal(audit.verdict.integerCoincidenceOnly, false);
assert.equal(audit.verdict.canonicalBundleBridgeExists, true);
assert.equal(audit.verdict.physicalFermionBridgeExists, false);
assert.equal(audit.verdict.generationThreeDerivedByProgramme, false);
assert.equal(audit.verdict.a6Passed, false);
assert.equal(audit.verdict.physicalAdmission, false);

console.log(JSON.stringify({
  passed: true,
  documentId: audit.documentId,
  restrictedUniversalLineDegree: degree.L,
  restrictedUniversalQuotientSplitting: [degree.Qfixed, degree.QmovingQuotient],
  restrictedTangentSplitting: tangentSummands,
  restrictedAnticanonicalDegree: tangentSummands.reduce((a, b) => a + b, 0),
  twistedDiracPositiveKernel: positiveKernel,
  twistedDiracNegativeKernel: negativeKernel,
  twistedDiracIndex: positiveKernel - negativeKernel,
  fundamentalModuleIndex: fundamentalDegrees.reduce((a, b) => a + b, 0),
  chargeThreeHopfCoarseDegree: descendedCoarseDegree(3),
  primitiveChargeOneCoarseDegree: descendedCoarseDegree(1),
  canonicalBundleBridgeExists: audit.verdict.canonicalBundleBridgeExists,
  physicalFermionBridgeExists: audit.verdict.physicalFermionBridgeExists,
  generationThreeDerivedByProgramme: audit.verdict.generationThreeDerivedByProgramme,
  a6Passed: audit.verdict.a6Passed
}, null, 2));
