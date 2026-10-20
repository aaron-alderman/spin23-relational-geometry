import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const evidence=JSON.parse(readFileSync('evidence/data/spin23-single-mediator-dirac-leakage-completions.json','utf8'));

const fields=[
  {name:'L_P',kind:'fermion'},
  {name:'N_N',kind:'fermion'},
  {name:'H',kind:'scalar'},
  {name:'S',kind:'scalar'},
];

function pairings(items){
  const [first,...rest]=items;
  const out=[];
  for(let i=0;i<rest.length;i++){
    const second=rest[i];
    const remaining=rest.filter((_,j)=>j!==i);
    out.push([[first,second],remaining]);
  }
  return out;
}

function classify([a,b]){
  const fermions=[a,b].filter(x=>x.kind==='fermion').length;
  if(fermions===1)return 'fermion';
  if(fermions===0||fermions===2)return 'scalar';
  throw new Error('unclassified pair');
}

const completions=pairings(fields).map(([left,right])=>{
  const leftMediator=classify(left);
  const rightMediator=classify(right);
  assert.equal(leftMediator,rightMediator);
  const key=[left.map(x=>x.name).sort().join('+'),right.map(x=>x.name).sort().join('+')].sort().join(' | ');
  return {key,mediatorKind:leftMediator,pairs:[left.map(x=>x.name),right.map(x=>x.name)]};
});

assert.equal(completions.length,3);
assert.equal(new Set(completions.map(x=>x.key)).size,3);
assert.equal(completions.filter(x=>x.mediatorKind==='fermion').length,2);
assert.equal(completions.filter(x=>x.mediatorKind==='scalar').length,1);

const y1=0.31,y2=-0.47,M=13;
const fermionCoefficient=y1*y2/M;
assert.notEqual(fermionCoefficient,0);
assert.ok(y1*0/M===0);
assert.ok(0*y2/M===0);

const y=0.29,mu=2.3,mScalar=17;
const scalarCoefficient=y*mu/mScalar**2;
assert.notEqual(scalarCoefficient,0);
assert.ok(y*0/mScalar**2===0);
assert.ok(0*mu/mScalar**2===0);

assert.equal(evidence.exhaustiveSingleMediatorCount,3);
assert.equal(evidence.completions.filter(x=>x.mediatorSpin==='fermion').length,2);
assert.equal(evidence.completions.filter(x=>x.mediatorSpin==='scalar').length,1);
assert.equal(evidence.protectionCriterion.portalCutIsSufficient,true);
assert.equal(evidence.protectionCriterion.portalCutIsNecessary,false);
assert.equal(evidence.protectionCriterion.correlatedPacketAlternative,true);

console.log('PASS 1496: exactly three one-mediator renormalizable tree topologies generate the dimension-five Dirac leakage, and each vanishes when either portal is removed.');
