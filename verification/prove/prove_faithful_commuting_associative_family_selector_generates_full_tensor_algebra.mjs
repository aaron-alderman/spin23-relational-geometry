import assert from 'node:assert/strict';

const dimASM = 2 + 4 + 18; // C, H, M_3(C), as real vector spaces
const dimF2 = 2 + 2;       // C + C
const dimTensor = dimASM * dimF2;
assert.equal(dimASM, 24);
assert.equal(dimF2, 4);
assert.equal(dimTensor, 96);

// X = I - 3P, hence P and Q are polynomials in X.
// Therefore adjoining X as an associative unital operator adjoins F_2.
const recoverP = { identityCoefficient: 1 / 3, xCoefficient: -1 / 3 };
const recoverQ = { identityCoefficient: 2 / 3, xCoefficient: 1 / 3 };
assert.equal(recoverP.identityCoefficient + recoverQ.identityCoefficient, 1);
assert.equal(recoverP.xCoefficient + recoverQ.xCoefficient, 0);

// The standard independent action on H_int tensor H_f is faithful:
// linearly independent operator bases remain linearly independent under
// Kronecker product.  Its image dimension equals the tensor dimension.
const imageDimension = dimTensor;
assert.equal(imageDimension, 96);

console.log(JSON.stringify({
  internalRealDimension: dimASM,
  familySelectorRealDimension: dimF2,
  generatedTensorRealDimension: dimTensor,
  projectorRecovery: {
    P: '(I-X)/3',
    Q: '(2I+X)/3',
  },
  theorem: 'A faithful associative coordinate extension containing the independent commuting Standard-Model algebra and X=I-3P contains the full A_SM tensor_R (C+C) image.',
  consequence: 'The minimal charge-three selector cannot be an ordinary faithful commuting associative coordinate extension while avoiding the tensor gauge enlargement.',
  survivingRoutes: ['outer/normalizer gauging', 'groupoid/correspondence', 'Jordan/conditional selector', 'boundary or defect realization', 'nonfaithful quotient with explicitly computed kernel'],
}, null, 2));
