import assert from 'node:assert/strict';

const edge=(source,target,name)=>({source,target,name}),P=new Set(['D','E']);
const cycles={
  up:[edge('H','O2','Q'),edge('O2','C','uc'),edge('C','H','hC')],
  down:[edge('H','O2','Q'),edge('O2','D','dc'),edge('D','H','hDdag')],
  chargedLepton:[edge('C','E','ec'),edge('E','H','L'),edge('H','C','hCdag')],
  neutrino:[edge('H','D','hD'),edge('D','E','nc'),edge('E','H','L')]
};
const audit=Object.fromEntries(Object.entries(cycles).map(([name,edges])=>{
  const crossing=edges.filter(e=>P.has(e.source)!==P.has(e.target)).map(e=>e.name);
  const internal=edges.filter(e=>P.has(e.source)&&P.has(e.target)).map(e=>e.name);
  const external=edges.filter(e=>!P.has(e.source)&&!P.has(e.target)).map(e=>e.name);
  return [name,{crossing,internal,external}];
}));
assert.deepEqual(audit.up.crossing,[]);
assert.deepEqual(audit.up.internal,[]);
assert.equal(audit.down.crossing.length,2);
assert.equal(audit.chargedLepton.crossing.length,2);
assert.deepEqual(audit.neutrino.internal,['nc']);
assert.equal(audit.neutrino.crossing.length,2);
assert(Object.values(audit).every(x=>x.crossing.length>0||x.internal.length===0));
const fullyInternal=Object.entries(audit).filter(([,x])=>x.internal.length===3).map(([k])=>k);assert.equal(fullyInternal.length,0);

console.log('Furey Higgs-cycle/Peirce-incidence certificate: PASS');
console.log(JSON.stringify({audit,fullyInternalCycles:fullyInternal,responseMatterFactorSeparationRequired:true}));
