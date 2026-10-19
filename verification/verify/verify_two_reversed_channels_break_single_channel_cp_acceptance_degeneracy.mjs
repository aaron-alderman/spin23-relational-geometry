import assert from "node:assert/strict";

const baseInformation = 0.12982650378676153;

function fisher(exposurePlus, exposureMinus) {
  const sum = exposurePlus + exposureMinus;
  const difference = exposurePlus - exposureMinus;
  const iCpCp = baseInformation * sum;
  const iNuisNuis = baseInformation * sum;
  const iCpNuis = baseInformation * difference;
  const efficient = iCpCp - iCpNuis ** 2 / iNuisNuis;
  const closedForm = baseInformation * 4 * exposurePlus * exposureMinus / sum;
  return {
    exposurePlus,
    exposureMinus,
    fisherMatrix: [[iCpCp, iCpNuis], [iCpNuis, iNuisNuis]],
    determinant: iCpCp * iNuisNuis - iCpNuis ** 2,
    efficientInformation: efficient,
    closedForm,
    retainedFraction: efficient / iCpCp
  };
}

const plusOnly = fisher(1, 0);
const minusOnly = fisher(0, 1);
const balanced = fisher(1, 1);
const imbalanced = fisher(3, 1);

assert.ok(Math.abs(plusOnly.efficientInformation) < 1e-14);
assert.ok(Math.abs(minusOnly.efficientInformation) < 1e-14);
assert.ok(balanced.determinant > 0);
assert.ok(Math.abs(balanced.efficientInformation - 2 * baseInformation) < 1e-14);
assert.ok(Math.abs(balanced.retainedFraction - 1) < 1e-14);
assert.ok(Math.abs(imbalanced.efficientInformation - imbalanced.closedForm) < 1e-14);
assert.ok(imbalanced.efficientInformation > 0 && imbalanced.retainedFraction < 1);

console.log(JSON.stringify({
  protocol: "two-reversed-channel-degeneracy-breaking/1",
  scorePattern: {
    channelPlus: "(s_CP,s_A)=(g,g)",
    channelMinus: "(s_CP,s_A)=(g,-g)"
  },
  plusOnly,
  minusOnly,
  balanced,
  imbalanced,
  theorem: "Each channel alone has rank-one Fisher geometry, but any positive exposure in both reversed channels gives determinant 4 I_g^2 L_+ L_->0 and efficient CP information 4 I_g L_+ L_-/(L_++L_-).",
  designResult: "Balanced exposure makes the common CP direction orthogonal to the reversing acceptance direction and retains all joint raw CP information.",
  physicalBoundary: "The reversal must be established from the actual CP/polarization/geometry transformation; assuming the sign pattern would beg the experimental question.",
  passed: true
}, null, 2));
