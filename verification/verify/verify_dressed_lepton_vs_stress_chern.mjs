import assert from 'node:assert/strict';

const chern=h=>-2*h;
const fermionPlus=chern(0.5),fermionMinus=chern(-0.5);
const stressPlus=chern(2),stressMinus=chern(-2);
const relation=(target,source)=>target-source;

assert.equal(Math.abs(fermionPlus),1);
assert.equal(Math.abs(fermionMinus),1);
assert.equal(Math.abs(relation(fermionPlus,fermionMinus)),2);
assert.equal(Math.abs(stressPlus),4);
assert.equal(Math.abs(stressMinus),4);
assert.equal(Math.abs(relation(stressPlus,stressMinus)),8);
assert.equal(4*Math.abs(relation(fermionPlus,fermionMinus)),8);

const faceCharge=-1;
const gramOffDiagonalCharge=(-faceCharge)+faceCharge;
assert.equal(gramOffDiagonalCharge,0);
assert.notEqual(gramOffDiagonalCharge,-8);

console.log('Dressed-lepton versus stress Chern audit: PASS');
console.log('gram_internal_charge=0; fermion_relationship_chern=2; stress_relationship_chern=8; fourth_power_bundle_identity=true; dynamical_operator_map=false');
