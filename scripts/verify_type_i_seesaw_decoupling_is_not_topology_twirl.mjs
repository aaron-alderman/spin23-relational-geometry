import assert from "node:assert/strict";

const mD = 1.0;
const gaps = [4, 8, 16, 32, 64];
const checks = gaps.map((MR) => {
  const disc = Math.sqrt(MR * MR + 4 * mD * mD);
  const lambdaLight = (MR - disc) / 2;
  const lambdaHeavy = (MR + disc) / 2;
  const schur = -mD * mD / MR;
  const cos2theta = MR / disc;
  const rightProbability = (1 - cos2theta) / 2;
  const zExpectation = -cos2theta; // Z=diag(-1,+1)
  const sExpectation = -2 * mD / disc;
  const topologyDistanceFromMaximallyMixed = Math.sqrt(zExpectation ** 2 + sExpectation ** 2);
  assert(Math.abs(topologyDistanceFromMaximallyMixed - 1) < 1e-12); // pure topology state
  assert(rightProbability < 0.1);
  return {
    MR,
    lambdaLight,
    lambdaHeavy,
    schur,
    schurError: Math.abs(lambdaLight - schur),
    rightProbability,
    zExpectation,
    sExpectation,
    topologyDistanceFromMaximallyMixed
  };
});

for (let i = 1; i < checks.length; i += 1) {
  assert(checks[i].rightProbability < checks[i - 1].rightProbability);
  assert(Math.abs(checks[i].zExpectation + 1) < Math.abs(checks[i - 1].zExpectation + 1));
  assert(checks[i].schurError < checks[i - 1].schurError);
}

// General exchange decomposition: M=mPlus I + mD S + mMinus Z.
const decompose = (mL, mR) => ({ mPlus: (mL + mR) / 2, mMinus: (mR - mL) / 2 });
const typeI = decompose(0, 6);
assert.equal(typeI.mPlus, 3);
assert.equal(typeI.mMinus, 3);
const exchanged = decompose(6, 0);
assert.equal(exchanged.mPlus, typeI.mPlus);
assert.equal(exchanged.mMinus, -typeI.mMinus);

// Balanced exchange-invariant masses have equal face weights but no generic seesaw hierarchy.
const balancedM = 6;
const balancedMasses = [Math.abs(balancedM - mD), Math.abs(balancedM + mD)];
assert.equal(balancedMasses[0], 5);
assert.equal(balancedMasses[1], 7);

console.log(JSON.stringify({
  protocol: "type-i-seesaw-decoupling-is-not-topology-twirl/1",
  typeIMatrix: "M=[[0,mD],[mD,MR]]",
  schurLightMass: "-mD^2/MR",
  lightStateFaceParity: "<Z>=-MR/sqrt(MR^2+4mD^2) -> -1",
  heavyFaceLeakage: "P_R=(1-MR/sqrt(MR^2+4mD^2))/2 = O(mD^2/MR^2)",
  topologyTwirlTarget: "<S>=<Y>=<Z>=0",
  mismatch: "seesaw decoupling purifies onto one face; the Pauli twirl depolarizes/removes the topology factor",
  exchangeDecomposition: "mPlus=(mL+mR)/2 even, mMinus=(mR-mL)/2 odd",
  rightOnlyMass: typeI,
  exchangedLeftOnlyMass: exchanged,
  balancedExchangeInvariantMasses: balancedMasses,
  checks,
  passed: true
}, null, 2));
