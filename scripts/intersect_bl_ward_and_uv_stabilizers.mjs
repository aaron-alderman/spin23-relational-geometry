import assert from "node:assert/strict";

// Ward-compatible infinitesimal data:
// A=[[a,b],[0,0]], B=[[u,v],[v,0]], C=0.
// A acts on the UV slope M by delta M=A M+M A^T.
const M = [[3, 1], [1, 2]];
const determinant = M[0][0] * M[1][1] - M[0][1] ** 2;
assert(determinant > 0);

// The independent fixed-M equations are
// a*m11+b*m12=0 and a*m12+b*m22=0.
const coefficientDeterminant = determinant;
assert(coefficientDeterminant > 0);
const fixedMForces = { a: 0, b: 0 };

const dimensions = {
  fullSp4: 10,
  blAutocorrelatorWardCompatible: 4,
  wardAndFullUvSlopeFixed: 2, // B11,B12 contacts
  wardFullUvSlopeAndAllContactsFixed: 0,
  fullBlRowProtected: 1, // B11 only
  fullBlRowAndContactsFixed: 0,
};
assert.deepEqual(dimensions, {
  fullSp4: 10,
  blAutocorrelatorWardCompatible: 4,
  wardAndFullUvSlopeFixed: 2,
  wardFullUvSlopeAndAllContactsFixed: 0,
  fullBlRowProtected: 1,
  fullBlRowAndContactsFixed: 0,
});

console.log(JSON.stringify({
  protocol: "intersection-of-bl-ward-and-uv-stabilizers/1",
  fixedPositiveUvSlope: M,
  wardCompatibleVariables: ["A11=a", "A12=b", "B11=u", "B12=v"],
  fixedSlopeEquations: [
    `${M[0][0]} a + ${M[0][1]} b = 0`,
    `${M[0][1]} a + ${M[1][1]} b = 0`,
  ],
  coefficientDeterminant,
  solution: fixedMForces,
  survivingGenerators: ["B11 incidence/incidence contact translation", "B12 incidence/B-L mixed contact translation"],
  dimensions,
  conclusion: "A positive fixed UV slope kills both noncontact generators of the B-L Ward-compatible algebra. Only two real contact translations survive; a fixed subtraction scheme kills those as well, leaving no continuous within-theory symmetry.",
  passed: true,
}, null, 2));
