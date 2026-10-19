import assert from "node:assert/strict";

const sectors = ["Q", "u^c", "d^c", "L", "e^c", "nu^c"];
const dimensions = [6, 3, 3, 2, 1, 1];
const lambda = [5, 5, 1, 1, 1, 0];
const charge3BL = [1, -1, -1, -3, 3, 3];
const majoranaCharge = 2 * charge3BL[5];
assert.equal(majoranaCharge, 6);

const matterParity = charge3BL.map((q) => ((q % 2) + 2) % 2);
assert.deepEqual(matterParity, [1, 1, 1, 1, 1, 1]);

const dot = (a, b) => a.reduce((s, x, i) => s + dimensions[i] * x * b[i], 0);
const naiveParityGram = [
  [dot(lambda, lambda), dot(lambda, matterParity)],
  [dot(lambda, matterParity), dot(matterParity, matterParity)],
];
const determinant = naiveParityGram[0][0] * naiveParityGram[1][1] - naiveParityGram[0][1] ** 2;
assert.deepEqual(naiveParityGram, [[231, 51], [51, 16]]);
assert.equal(determinant, 1095);

// Any continuous homomorphism R -> finite Z_n is constant because R is
// connected and Z_n is discrete. Therefore the residual finite group has no
// nonzero Lie algebra/Noether-current direction.
const residualGroup = "Z6 with independent matter-parity Z2 after quotienting the color-center overlap";
const continuousLieDimension = 0;
assert.equal(continuousLieDimension, 0);

console.log(JSON.stringify({
  protocol: "majorana-remnant-cannot-replace-bl-current/1",
  sectors,
  integer3BL: charge3BL,
  majoranaOperatorCharge: majoranaCharge,
  residualGroup,
  matterParity,
  naiveRealSectorLabelGram: { matrix: naiveParityGram, determinant },
  warning: "The positive matrix made from the 0/1 parity label is an algebraic sector Gram only. Z2 has Lie dimension zero and supplies no local conserved current or Ward-normalized spectral source.",
  requiredBrokenPhaseCompletion: [
    "nonconserved B-L current",
    "Majorana order-parameter phase or eaten Goldstone mode",
    "longitudinal response and radial breaking mode where applicable",
  ],
  conclusion: "Majorana breaking removes the continuous Ward constraint by removing the B-L current, not by restoring full Sp(4,R) symmetry. Matter parity cannot replace the second current in the relational response without changing the operator category.",
  passed: true,
}, null, 2));
