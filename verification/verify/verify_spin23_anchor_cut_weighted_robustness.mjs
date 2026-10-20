import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const evidence=JSON.parse(readFileSync(
  'evidence/data/spin23-anchor-cut-weighted-robustness.json','utf8'));
const potential=JSON.parse(readFileSync(
  'evidence/data/spin23-six-link-renormalizable-potential-vacuum-audit.json','utf8'));
assert.equal(evidence.schema,'spin23.anchor-cut-weighted-robustness/1');

const models={
  H12:{vertices:['A','B','C','D','E','F'],edges:[['A','B','x'],['B','C','y'],['C','E','z'],['D','E','u'],['E','F','v']]},
  H16:{vertices:['A','B','C','D','E','F','G','H'],edges:[['A','B','x'],['B','C','y'],['C','E','z'],['D','E','u'],['D','G','r'],['E','F','v'],['F','H','s']]}
};
const pairs=xs=>xs.flatMap((x,i)=>xs.slice(i+1).map(y=>[x,y]));
const supportKey=xs=>[...xs].sort().join('+');
const cutSupport=(selected,edges)=>{
  const S=new Set(selected);
  return edges.filter(([a,b])=>S.has(a)!==S.has(b)).map(e=>e[2]);
};
const evalSupport=(support,rho)=>support.reduce((s,x)=>s+rho[x],0);

const expected={
  H12:[['x','z'],['x','u'],['x','v'],['z','u'],['z','v'],['u','v']],
  H16:[['u'],['v'],['x','z'],['x','r'],['x','s'],['r','s']]
};

for(const [name,model] of Object.entries(models)){
  const target=cutSupport(['A','B'],model.edges);
  assert.deepEqual(target,['y']);
  const threats=[];
  for(const pair of pairs(model.vertices)){
    if(pair.join('')==='AB')continue;
    const support=cutSupport(pair,model.edges);
    // A support containing y is automatically more expensive than y because
    // every other edge weight is strictly positive.
    if(support.includes('y'))continue;
    threats.push({pair:pair.join(''),support});
  }
  // Under positivity, a threat inequality is redundant when its support
  // strictly contains another threat support.  Inclusion-minimal supports are
  // exactly the irredundant facets of the AB chamber.
  const facets=threats.filter(t=>!threats.some(q=>q!==t&&q.support.length<t.support.length&&
    q.support.every(x=>t.support.includes(x))));
  assert.deepEqual(facets.map(f=>supportKey(f.support)).sort(),expected[name].map(supportKey).sort());
  assert.equal(facets.length,evidence[name].irredundantFacetCount);

  // Each listed facet is necessary: make its support coordinates small and
  // every other coordinate large.  The corresponding competitor then beats AB.
  for(const facet of facets){
    const rho=Object.fromEntries(model.edges.map(e=>[e[2],10]));
    rho.y=1;
    for(const x of facet.support)rho[x]=0.1/facet.support.length;
    assert.ok(evalSupport(facet.support,rho)<rho.y);
  }

  const uniqueAB=rho=>{
    const rows=pairs(model.vertices).map(pair=>({name:pair.join(''),cost:evalSupport(cutSupport(pair,model.edges),rho)}));
    const min=Math.min(...rows.map(r=>r.cost));
    return rows.filter(r=>Math.abs(r.cost-min)<1e-12).map(r=>r.name);
  };
  if(name==='H12')assert.deepEqual(uniqueAB({x:1,y:1,z:1,u:1,v:1}),['AB']);
  else{
    assert.deepEqual(uniqueAB({x:1,y:1,z:1,u:1,v:1,r:1,s:1}),['AB','DG','FH']);
    assert.deepEqual(uniqueAB(evidence.H16.exampleInteriorPoint),['AB']);
    assert.deepEqual(uniqueAB(evidence.H16.exampleOtherWinner),['DG']);
  }
}

// Repeated-charge plus tied-Yukawa equalities x=y and v=r reduce, but do not
// eliminate, the chamber inequalities.  Exhibit points obeying the equalities
// on each side of the remaining H16 ordering wall.
const h16=models.H16;
const winners=rho=>{
  const rows=pairs(h16.vertices).map(pair=>({name:pair.join(''),cost:evalSupport(cutSupport(pair,h16.edges),rho)}));
  const m=Math.min(...rows.map(r=>r.cost));return rows.filter(q=>q.cost===m).map(q=>q.name);
};
assert.deepEqual(winners({x:1,y:1,z:1,u:2,v:2,r:2,s:1}),['AB']);
assert.ok(winners({x:1,y:1,z:1,u:0.5,v:2,r:2,s:1}).includes('DG'));
assert.ok(winners({x:1,y:1,z:1,u:2,v:0.5,r:0.5,s:1}).includes('FH'));

// At the all-one H16 point, infinitesimal independent shifts select each of
// the three terminal branches.  Positivity and arbitrarily small size survive.
assert.deepEqual(winners({x:1,y:0.99,z:1,u:1,v:1,r:1,s:1}),['AB']);
assert.deepEqual(winners({x:1,y:1,z:1,u:0.99,v:1,r:1,s:1}),['DG']);
assert.deepEqual(winners({x:1,y:1,z:1,u:1,v:0.99,r:1,s:1}),['FH']);

assert.equal(potential.stableVacuumWitness.allRequiredChargedVevsNonzero,true);
assert.deepEqual(potential.stableVacuumWitness.vacuumRepresentative,{a:1,b:1,c:1,e:1,f:1,g:1});
assert.equal(potential.minimalRepeatedChargeIdentification.independentYukawaDecision.includes('arbitrary nonzero coefficients'),true);
assert.equal(evidence.decision.existingPotentialOrChargesForceChamber,false);
assert.equal(evidence.decision.newOrderingLawNeededForPrediction,true);

console.log('PASS 1553: exact irredundant weighted-cut chambers derived (six facets each); H12 contains the unit vacuum, H16 has an open AB chamber but the unit vacuum lies on y=u=v degeneracy walls, and independent positive shifts can select AB, DG, or FH.');
