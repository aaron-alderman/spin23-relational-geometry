import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const evidence=JSON.parse(readFileSync('evidence/data/spin23-sector-reflection-relational-lift.json','utf8'));

const signs=[-1,1];
const assignments=vertices=>{
  const out=[];
  for(let mask=0;mask<2**vertices.length;mask++){
    const a={};
    vertices.forEach((v,i)=>{a[v]=(mask&(1<<i)) ? 1 : -1;});
    out.push(a);
  }
  return out;
};
const satisfies=(a,edges)=>edges.every(([u,v,p])=>a[u]*a[v]===p);

// Coarse family graph: the Majorana and dangerous Dirac relations have the
// same P-N endpoints but demand opposite parities.
const coarseVertices=['P','I','N'];
const coarseEdges=[
  ['P','I',1],   // retained ordinary/safe Dirac support
  ['P','N',1],   // desired Majorana sewing
  ['P','N',-1],  // forbidden dangerous Dirac relation
];
const coarseSolutions=assignments(coarseVertices).filter(a=>satisfies(a,coarseEdges));
assert.equal(coarseSolutions.length,0);
assert.equal(coarseEdges[1][2]*coarseEdges[2][2],-1); // unbalanced parallel-edge cycle

// Typed relational lift: sector/opposite-anchor labels separate the edges.
const typedVertices=['D_P','D_I','D_N','M_P','M_N'];
const typedEdges=[
  ['D_P','D_I',1],
  ['D_P','D_N',-1],
  ['M_P','M_N',1],
];
const typedSolutions=assignments(typedVertices).filter(a=>satisfies(a,typedEdges));
assert.equal(typedSolutions.length,4);

// Every solution is destroyed if both visible-family lifts are glued back
// together, recovering the coarse obstruction.
const gluedSolutions=typedSolutions.filter(a=>a.D_P===a.M_P&&a.D_N===a.M_N);
assert.equal(gluedSolutions.length,0);

// One explicit typed witness.
const witness={D_P:1,D_I:1,D_N:-1,M_P:1,M_N:1};
assert.equal(satisfies(witness,typedEdges),true);

assert.deepEqual(signs,[-1,1]);
assert.equal(evidence.enumeration.coarseAssignments,8);
assert.equal(evidence.enumeration.coarseSolutions,0);
assert.equal(evidence.enumeration.typedAssignments,32);
assert.equal(evidence.enumeration.typedSolutions,4);
assert.equal(evidence.theorem.familyOnlyLiftExists,false);
assert.equal(evidence.theorem.relationalTypedLiftExists,true);

console.log('PASS 1504: the coarse P-N Majorana/Dirac pair is an unbalanced signed 2-cycle with 0 of 8 lifts, while the sector-typed graph has 4 of 32 vertex-parity lifts; gluing the relational copies restores the obstruction.');
