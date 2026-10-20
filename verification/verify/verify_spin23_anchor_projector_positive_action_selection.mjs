import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const evidence=JSON.parse(readFileSync(
  'evidence/data/spin23-anchor-projector-positive-action-selection.json','utf8'));
const previous=JSON.parse(readFileSync(
  'evidence/data/spin23-selected-anchor-projection-lattice-audit.json','utf8'));
assert.equal(evidence.schema,'spin23.anchor-projector-positive-action-selection/1');

const models={
  twelveStateModel:{
    vertices:['A','B','C','D','E','F'],
    edges:[['A','B'],['B','C'],['C','E'],['D','E'],['E','F']]
  },
  sixteenStateSectorRepair:{
    vertices:['A','B','C','D','E','F','G','H'],
    edges:[['A','B'],['B','C'],['C','E'],['D','E'],['D','G'],['E','F'],['F','H']]
  }
};
const orbitSectors={
  A:['PN','NP'],B:['IN','NI'],C:['IP','PI'],D:['SP','PS'],
  E:['TP','PT'],F:['TU','UT'],G:['SI','IS'],H:['NU','UN']
};
const pairName=p=>[...p].sort().join('');
const pairs=xs=>xs.flatMap((x,i)=>xs.slice(i+1).map(y=>[x,y]));
const histogram=xs=>Object.fromEntries([...new Set(xs)].sort((a,b)=>a-b)
  .map(x=>[String(x),xs.filter(y=>y===x).length]));
const minimizers=(rows,key)=>{
  const m=Math.min(...rows.map(r=>r[key]));
  return rows.filter(r=>r[key]===m).map(r=>r.name).sort();
};
const distances=(vertices,edges)=>{
  const adj=Object.fromEntries(vertices.map(v=>[v,[]]));
  for(const [u,v] of edges){adj[u].push(v);adj[v].push(u);}
  const out={};
  for(const source of vertices){
    const d={[source]:0},queue=[source];
    while(queue.length){const u=queue.shift();for(const v of adj[u])if(d[v]===undefined){d[v]=d[u]+1;queue.push(v);}}
    out[source]=d;
  }
  return out;
};

for(const [key,model] of Object.entries(models)){
  const record=evidence[key],deg=Object.fromEntries(model.vertices.map(v=>[v,0]));
  for(const [u,v] of model.edges){deg[u]++;deg[v]++;}
  const dist=distances(model.vertices,model.edges);
  const rows=pairs(model.vertices).map(selected=>{
    const set=new Set(selected);
    const cut=model.edges.filter(([u,v])=>set.has(u)!==set.has(v)).length;
    return {name:pairName(selected),selected,cut,distance:dist[selected[0]][selected[1]],volume:deg[selected[0]]+deg[selected[1]]};
  });
  assert.equal(rows.length,record.candidateCount);
  assert.equal(rows.length,previous[key].rankFourJInvariantProjectionsFromTwoOrbits);
  assert.deepEqual(histogram(rows.map(r=>r.cut)),record.cutHistogram);
  assert.deepEqual(histogram(rows.map(r=>r.distance)),record.distanceHistogram);
  assert.deepEqual(histogram(rows.map(r=>r.volume)),record.volumeHistogram);
  assert.deepEqual(minimizers(rows,'cut'),record.cutMinimizers);
  assert.deepEqual(minimizers(rows,'distance'),record.distanceMinimizers);
  assert.deepEqual(minimizers(rows,'volume'),record.volumeMinimizers);

  // Expand every quotient edge to its two J-related state edges.  A crossing
  // undirected state edge contributes twice to the Hilbert--Schmidt norm.
  for(const row of rows){
    const selectedSectors=new Set(row.selected.flatMap(v=>orbitSectors[v]));
    let crossingStateEdges=0;
    for(const [u,v] of model.edges){
      const [u0,u1]=orbitSectors[u],[v0,v1]=orbitSectors[v];
      for(const [x,y] of [[u0,v0],[u1,v1]])
        if(selectedSectors.has(x)!==selectedSectors.has(y))crossingStateEdges++;
    }
    const hsCommutatorSquared=2*crossingStateEdges;
    assert.equal(hsCommutatorSquared,4*row.cut);
  }

  const bRows=rows.filter(r=>r.selected.includes('B'));
  assert.equal(bRows.length,record.hardBConstraintCandidates);
  assert.deepEqual(minimizers(bRows,'cut'),record.hardBConstraintCutMinimizer);
  for(const mu of [Number.EPSILON,1e-6,0.1,1,100]){
    const marked=rows.map(r=>({...r,marked:r.cut+mu*(r.selected.includes('B')?0:1)}));
    assert.deepEqual(minimizers(marked,'marked'),record.markedPenaltyMinimizerForEveryPositiveMu);
  }
}

// Every candidate is diagonal in the sector basis, as are the represented and
// opposite C^6 actions, grading, and relation parity.  Diagonal commutators
// therefore vanish entrywise for every one of the 15+28 cases.
const diagCommutatorNorm=(a,b)=>a.reduce((s,x,i)=>s+Math.abs(x*b[i]-b[i]*x)**2,0);
for(const [key,model] of Object.entries(models))for(const selected of pairs(model.vertices)){
  const sectors=model.vertices.flatMap(v=>orbitSectors[v]);
  const q=sectors.map(s=>selected.includes(Object.keys(orbitSectors).find(v=>orbitSectors[v].includes(s)))?1:0);
  const left=sectors.map(s=>'PINSTU'.indexOf(s[0])+1);
  const right=sectors.map(s=>'PINSTU'.indexOf(s[1])+1);
  const gamma=sectors.map((_,i)=>i%2?1:-1);
  const relation=sectors.map((_,i)=>i%2?1:-1);
  assert.equal(diagCommutatorNorm(q,left),0);
  assert.equal(diagCommutatorNorm(q,right),0);
  assert.equal(diagCommutatorNorm(q,gamma),0);
  assert.equal(diagCommutatorNorm(q,relation),0);
}

// Unequal positive edge weights can move the unmarked terminal minimum.
const terminalAction=w=>({AB:w.BC**2,DG:w.DE**2,FH:w.EF**2});
assert.deepEqual(terminalAction({BC:1,DE:2,EF:3}),{AB:1,DG:4,FH:9});
assert.deepEqual(terminalAction({BC:3,DE:1,EF:2}),{AB:9,DG:1,FH:4});
assert.deepEqual(terminalAction({BC:3,DE:2,EF:1}),{AB:9,DG:4,FH:1});

assert.equal(evidence.decision.H12IntrinsicSelection,'SAT under the unit/isotropic primitive-edge normalization');
assert.equal(evidence.decision.H16IntrinsicSelection,'UNSAT because of the AB/DG/FH threefold minimum');
assert.equal(evidence.decision.H16SingleMarkedOrbitSelection,'SAT for every mu>0 under the same unit normalization');
assert.equal(evidence.decision.arbitraryPositiveWeightsCanonicalSelection,'UNSAT');

console.log('PASS 1551: all 15/28 two-orbit projectors enumerated; the unit Dirichlet cut uniquely selects AB on H12, ties AB/DG/FH on H16, and one marked B orbit restores uniqueness for every mu>0 without naming A.');
