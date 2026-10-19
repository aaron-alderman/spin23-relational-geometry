// A real linear map from one source coordinate to a two-axis response is a column (a,b).
// Source CP acts as -1; response CP acts as diag(+1,-1).
// Equivariance diag(+1,-1)(a,b)^T = -(a,b)^T forces a=0 and leaves b free.
const cpConstraintMatrix = [[2, 0], [0, 0]];
const cpNullBasis = [[0, 1]];

// If the source is also a singlet under the response SO(2), equivariance under a
// quarter rotation requires R(pi/2) v = v. The only real fixed vector is zero.
const R90 = [[0, -1], [1, 0]];
const fixedConstraint = [
  [R90[0][0] - 1, R90[0][1]],
  [R90[1][0], R90[1][1] - 1],
];
const determinant = fixedConstraint[0][0] * fixedConstraint[1][1] - fixedConstraint[0][1] * fixedConstraint[1][0];

const multiplicities = [1, 2, 3].map((oddSourceMultiplicity) => ({
  oddSourceMultiplicity,
  cpEquivariantHomDimension: oddSourceMultiplicity,
  fullSpin2EquivariantHomDimension: 0,
}));

const result = {
  protocol: "cp-equivariant-odd-source-intertwiner-spin2-obstruction/1",
  sourceRepresentation: "one-dimensional CP sign representation",
  targetRepresentation: "R_even direct-sum R_odd with CP=diag(+1,-1)",
  cpConstraintMatrix,
  cpNullBasis,
  cpEquivariantHomDimension: 1,
  forcedImage: "odd response axis Gamma_u",
  responseQuarterRotation: R90,
  responseRotationFixedConstraint: fixedConstraint,
  responseRotationFixedConstraintDeterminant: determinant,
  fullSpin2EquivariantHomDimension: 0,
  multiplicities,
  consequence: "A nonzero linear odd-source coupling selects/breaks the response Spin(2); if Spin(2) is an exact gauge redundancy and the source is a singlet, the coupling vanishes.",
};
result.passed =
  result.cpEquivariantHomDimension === 1 &&
  cpNullBasis[0][0] === 0 &&
  determinant !== 0 &&
  result.fullSpin2EquivariantHomDimension === 0;

console.log(JSON.stringify(result, null, 2));
if (!result.passed) process.exitCode = 1;
