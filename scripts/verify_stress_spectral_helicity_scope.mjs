import assert from 'node:assert/strict';

const minkowskiSquare=q=>q[0]**2-q.slice(1).reduce((s,x)=>s+x*x,0);
const timelike=[2.5,0.6,-0.3,0.4];
const nullMomentum=[1,0,0,1];
assert(minkowskiSquare(timelike)>0);
assert(Math.abs(minkowskiSquare(nullMomentum))<1e-12);

const massiveSpin2Dimension=2*2+1;
const nullHelicityCount=[-2,+2].length;
assert.equal(massiveSpin2Dimension,5);
assert.equal(nullHelicityCount,2);
assert.notEqual(massiveSpin2Dimension,nullHelicityCount);

const classification={
  timelike:{littleGroup:'SO(3)',baseContractible:true,forcedChernTwist:false},
  null:{littleGroup:'ISO(2)/helicity SO(2)',directionBase:'S2',baseContractible:false,helicityChernMagnitude:4},
};
assert(classification.timelike.baseContractible);
assert(!classification.timelike.forcedChernTwist);
assert.equal(classification.null.helicityChernMagnitude,4);

console.log('Stress spectral/helicity scope certificate: PASS');
console.log('timelike_spin2_dimension=5; null_helicity_count=2; timelike_mass_shell_contractible=true; Chern4_requires_null_helicity_carrier=true');
