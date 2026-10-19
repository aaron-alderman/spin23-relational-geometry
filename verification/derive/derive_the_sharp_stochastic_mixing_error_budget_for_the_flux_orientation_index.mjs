import assert from 'node:assert/strict';

const fields=['u','nu','d','e'],projectors=['P0','P1','P2','P3'];
const chi={u:1,nu:1,d:-1,e:-1};
const delta={P0:-0.4163709872197635,P1:0.3167483057741496,P2:0.9031562700070872,P3:-0.8035335885614723};
const ideal={u:'P1',nu:'P2',d:'P3',e:'P0'};
const opposite={u:'P0',nu:'P3',d:'P2',e:'P1'};
const weights={u:3,nu:.7,d:2,e:1.4};

const audit=M=>{
  let correct=0,wrong=0,numerator=0,denominator=0;
  for(const f of fields)for(const p of projectors){const x=weights[f]*M[p][f]*Math.abs(delta[p]);denominator+=x;numerator+=weights[f]*M[p][f]*chi[f]*delta[p];if(chi[f]*delta[p]>0)correct+=x;else wrong+=x;}
  assert.ok(Math.abs(numerator-(correct-wrong))<1e-12);
  assert.ok(Math.abs(denominator-(correct+wrong))<1e-12);
  const epsilon=wrong/denominator,index=numerator/denominator;
  assert.ok(Math.abs(index-(1-2*epsilon))<1e-12);
  return{correctAbsoluteFlux:correct,wrongAbsoluteFlux:wrong,wrongFraction:epsilon,index};
};
const mixture=q=>Object.fromEntries(projectors.map(p=>[p,Object.fromEntries(fields.map(f=>[f,(p===ideal[f]?1-q:0)+(p===opposite[f]?q:0)]))]));
for(const q of [0,.1,.25,.5,1])for(const f of fields)assert.ok(Math.abs(projectors.reduce((s,p)=>s+mixture(q)[p][f],0)-1)<1e-12);
const audits=[0,.1,.25,.5,1].map(q=>({q,...audit(mixture(q))}));

// Sharp one-channel threshold when u leaks between P1 (correct) and P0 (wrong).
const a=Math.abs(delta.P1),b=Math.abs(delta.P0),qStar=a/(a+b);
const oneChannel=q=>{
  const correct=(1-q)*a,wrong=q*b;return{q,epsilon:wrong/(correct+wrong),index:(correct-wrong)/(correct+wrong)};
};
const sharp=[qStar-.01,qStar,qStar+.01].map(oneChannel);
assert.ok(sharp[0].index>0&&Math.abs(sharp[1].index)<1e-12&&sharp[2].index<0);
assert.ok(Math.abs(sharp[1].epsilon-.5)<1e-12);

console.log(JSON.stringify({
  protocol:'stochastic-source-mixing-orientation-error-budget/1',
  formula:'nu_orient=(A-B)/(A+B)=1-2 epsilon, epsilon=B/(A+B)',
  exampleAudits:audits,
  sharpSingleChannelThreshold:{correctMagnitude:a,wrongMagnitude:b,probabilityLeakThreshold:qStar,audits:sharp},
  signStableCondition:'epsilon < 1/2',
  zeroCondition:'epsilon = 1/2',
  signFlippedCondition:'epsilon > 1/2',
  conclusion:'For any nonnegative dephased source-to-projector mixing, orientation-index degradation is exactly twice the wrong-side absolute-flux fraction. The sign is protected below 50 percent wrong-side weight and the threshold is sharp.',
  boundary:'Coherent amplitude interference is not a stochastic mixture and can generate cross terms. It requires a separate operator-norm or polar-decomposition bound.',
  passed:true,
},null,2));
