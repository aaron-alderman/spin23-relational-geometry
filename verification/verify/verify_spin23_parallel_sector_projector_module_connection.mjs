import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const evidence=JSON.parse(readFileSync('evidence/data/spin23-parallel-sector-projector-module-connection.json','utf8'));

const mul=(A,B)=>A.map(row=>B[0].map((_,j)=>row.reduce((s,x,k)=>s+x*B[k][j],0)));
const sub=(A,B)=>A.map((row,i)=>row.map((x,j)=>x-B[i][j]));
const comm=(A,B)=>sub(mul(A,B),mul(B,A));
const isZero=A=>A.every(row=>row.every(x=>x===0));
const act=(A,v)=>A.map(row=>row.reduce((s,x,j)=>s+x*v[j],0));

// The dangerous Dirac relation e_D and desired Majorana relation e_M both
// have charge +3.  Gauge covariance is therefore scalar on their fiber.
const chargeGenerator=[[3,0],[0,3]];
const majoranaProjector=[[0,0],[0,1]];
const majoranaVector=[0,1];
const values=[-1,0,1];
const connections=[];

for(const a of values){
  for(const b of values){
    for(const c of values){
      // A unitary connection is iK with K real symmetric.  It is enough to
      // enumerate K because multiplication by i changes none of the support
      // or commutator conditions.
      connections.push([[a,b],[b,c]]);
    }
  }
}

const gaugeCompatible=connections.filter(K=>isZero(comm(K,chargeGenerator)));
const maskPreserving=connections.filter(K=>act(K,majoranaVector)[0]===0);
const parallelProjector=connections.filter(K=>isZero(comm(K,majoranaProjector)));
const leaking=connections.filter(K=>act(K,majoranaVector)[0]!==0);

assert.equal(connections.length,27);
assert.equal(gaugeCompatible.length,27);
assert.equal(maskPreserving.length,9);
assert.equal(parallelProjector.length,9);
assert.equal(leaking.length,18);
assert.deepEqual(maskPreserving,parallelProjector);

// The off-diagonal entry is simultaneously the induced Dirac component and
// the nonzero component of the covariant derivative of the sector projector.
for(const K of connections){
  const inducedDirac=act(K,majoranaVector)[0];
  const nablaProjector=comm(K,majoranaProjector);
  assert.equal(inducedDirac,K[0][1]);
  assert.equal(nablaProjector[0][1],K[0][1]);
  assert.equal(nablaProjector[1][0],K[0][1]===0 ? 0 : -K[0][1]);
}

assert.equal(evidence.enumeration.totalHermitianGenerators,27);
assert.equal(evidence.enumeration.gaugeCompatible,27);
assert.equal(evidence.enumeration.parallelAndMaskPreserving,9);
assert.equal(evidence.enumeration.leaking,18);
assert.equal(evidence.theorem.gaugeChargeAloneSuffices,false);
assert.equal(evidence.theorem.parallelSectorProjectorSuffices,true);

console.log('PASS 1501: equal charge makes every 2x2 connection gauge-compatible, while exactly the 9 generators commuting with the Majorana-sector projector preserve the Dirac null mask; the other 18 are leakage spurions.');
