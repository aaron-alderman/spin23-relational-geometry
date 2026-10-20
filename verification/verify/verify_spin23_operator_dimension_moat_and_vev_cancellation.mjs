import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const evidence=JSON.parse(readFileSync('evidence/data/spin23-operator-dimension-moat.json','utf8'));

const scalarDimension=1;
const weylDimension=1.5;
const sCharge=3;

function minimumInsertions(baseCharge){
  for(let n=0;n<=6;n++){
    for(let signed=-n;signed<=n;signed+=2){
      if(baseCharge+signed*sCharge===0)return n;
    }
  }
  throw new Error(`no neutralization found for charge ${baseCharge}`);
}

const operators={
  neutralDirac:{baseCharge:0,baseDimension:2*weylDimension+scalarDimension},
  crossDirac:{baseCharge:3,baseDimension:2*weylDimension+scalarDimension},
  neutralMajorana:{baseCharge:0,baseDimension:2*weylDimension},
  crossMajorana:{baseCharge:3,baseDimension:2*weylDimension},
  selectedMajorana:{baseCharge:6,baseDimension:2*weylDimension},
};

for(const value of Object.values(operators)){
  value.minimumFlavonInsertions=minimumInsertions(value.baseCharge);
  value.minimumDimension=value.baseDimension+value.minimumFlavonInsertions*scalarDimension;
}

assert.equal(operators.crossMajorana.minimumDimension,4);
assert.equal(operators.crossDirac.minimumDimension,5);
assert.equal(operators.selectedMajorana.minimumDimension,5);
assert.equal(operators.crossDirac.minimumDimension-operators.crossMajorana.minimumDimension,1);

const parameters={yP:0.37,cD:0.23,lambdaM:0.61,v:246,Lambda:1.0e12};
const leadingLift=(vS)=>{
  const dP=parameters.yP*parameters.v;
  const rN=parameters.cD*parameters.v*vS/parameters.Lambda;
  const y=parameters.lambdaM*vS;
  return -2*dP*rN/y;
};
const samples=[1,7,100,1.0e6].map(vS=>({vS,lift:leadingLift(vS)}));
for(const sample of samples)assert.ok(Math.abs(sample.lift/samples[0].lift-1)<1e-12);
const closedForm=-2*parameters.yP*parameters.cD*parameters.v**2/(parameters.lambdaM*parameters.Lambda);
assert.ok(Math.abs(samples[0].lift/closedForm-1)<1e-12);

assert.equal(evidence.operatorAudit.crossMajorana.minimumDimension,4);
assert.equal(evidence.operatorAudit.crossDirac.minimumDimension,5);
assert.equal(evidence.leadingTextureLift.familyBreakingVevExponent,0);
assert.match(evidence.boundary,/dimension-five/i);

console.log('PASS 1495: the Majorana cross-face is renormalizable, Dirac leakage begins at dimension five, and its leading seesaw lift is independent of the charge-three VEV.');
