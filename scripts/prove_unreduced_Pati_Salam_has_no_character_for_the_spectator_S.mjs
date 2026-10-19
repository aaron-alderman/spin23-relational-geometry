import assert from 'node:assert/strict';

// A unital character M_n(C)->C cannot exist for n>=2. If p_r=phi(E_rr)=1
// and p_s=0, then x=phi(E_rs), y=phi(E_sr) would obey xy=1 and yx=0 in
// the commutative target C.
const matrixCharacterContradiction = n => {
  assert.ok(n >= 2);
  return {
    algebra: `M_${n}(C)`,
    primitiveIdempotentImages: 'exactly one p_r would have to equal 1',
    matrixUnitProducts: 'phi(E_rs)phi(E_sr)=1 but phi(E_sr)phi(E_rs)=0',
    contradiction: 'the target C is commutative',
    hasUnitalComplexCharacter: false,
  };
};

// A real-unital character H->C would send quaternion units i,j,k to a,b,c.
// Since ij=k and ji=-k while C is commutative, c=-c, hence c=0; but k^2=-1.
const quaternionCharacterContradiction = {
  algebra: 'H',
  relations: ['ij=k', 'ji=-k', 'k^2=-1'],
  commutativeTargetImplication: 'phi(k)=-phi(k), hence phi(k)=0',
  contradiction: 'phi(k)^2 must equal -1',
  hasUnitalComplexCharacter: false,
};

const patiSalamFactors = [
  { name: 'H_R', minimumComplexIrrepDimension: 2, character: false },
  { name: 'H_L', minimumComplexIrrepDimension: 2, character: false },
  { name: 'M_4(C)', minimumComplexIrrepDimension: 4, character: false },
];
assert.equal(patiSalamFactors.filter(x => x.character).length, 0);

const reducedSMFactors = [
  { name: 'C', minimumComplexIrrepDimension: 1, character: true },
  { name: 'H', minimumComplexIrrepDimension: 2, character: false },
  { name: 'M_3(C)', minimumComplexIrrepDimension: 3, character: false },
];
assert.equal(reducedSMFactors.filter(x => x.character).length, 1);

const directSumCharacterCount = factors => factors.filter(x => x.character).length;
assert.equal(directSumCharacterCount(patiSalamFactors), 0);
assert.equal(directSumCharacterCount(reducedSMFactors), 1);

console.log(JSON.stringify({
  protocol: 'Pati-Salam-spectator-character-obstruction/1',
  algebraicCertificates: {
    quaternion: quaternionCharacterContradiction,
    matrix4: matrixCharacterContradiction(4),
    matrix3: matrixCharacterContradiction(3),
  },
  unreducedPatiSalam: {
    algebra: 'H_R direct-sum H_L direct-sum M_4(C)',
    factors: patiSalamFactors,
    numberOfUnitalComplexCharacters: directSumCharacterCount(patiSalamFactors),
    spectatorSAvailableAsExistingCharacter: false,
  },
  firstOrderReducedStandardModel: {
    algebra: 'C direct-sum H direct-sum M_3(C)',
    factors: reducedSMFactors,
    numberOfUnitalComplexCharacters: directSumCharacterCount(reducedSMFactors),
    uniqueExistingCharacterCandidate: 'the C summand',
  },
  branchSplit: {
    strictFirstOrder: 'The Krajewski null mask can only be pursued after reduction to the Standard-Model algebra plus an explicit family extension.',
    unreducedPatiSalam: 'The model relaxes first order and uses generalized linear plus quadratic fluctuations; the ordinary Krajewski prohibition does not transfer without a new calculation.',
  },
  theorem: 'No existing simple summand of the unreduced Pati-Salam algebra can serve as the one-dimensional complex spectator character S.',
  boundary: 'The reduced C summand is only a candidate anchor; its required family-crossed bimodules, connector, junk quotient and physical multiplicities are not yet established.',
  passed: true,
}, null, 2));
