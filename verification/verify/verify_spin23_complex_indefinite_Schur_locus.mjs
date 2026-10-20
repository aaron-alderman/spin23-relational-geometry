import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const evidence=JSON.parse(readFileSync('evidence/data/spin23-complex-indefinite-Schur-locus.json','utf8'));

const z=(re=0,im=0)=>({re:BigInt(re),im:BigInt(im)});
const add=(a,b)=>({re:a.re+b.re,im:a.im+b.im});
const mul=(a,b)=>({re:a.re*b.re-a.im*b.im,im:a.re*b.im+a.im*b.re});
const scale=(n,a)=>({re:BigInt(n)*a.re,im:BigInt(n)*a.im});
const sq=a=>mul(a,a);
const eq=(a,b)=>a.re===b.re&&a.im===b.im;
const zero=a=>a.re===0n&&a.im===0n;
const det2=(a,b,c)=>add(mul(a,c),scale(-1,sq(b)));
const minor=(u,v)=>add(mul(u[0],v[1]),scale(-1,mul(v[0],u[1])));

function symmetricPacketSum(vectors,weights){
  let a=z(),b=z(),c=z();
  for(let i=0;i<vectors.length;i++){
    const [d,y]=vectors[i];
    const w=weights[i];
    a=add(a,scale(w,sq(d)));
    b=add(b,scale(w,mul(d,y)));
    c=add(c,scale(w,sq(y)));
  }
  return {a,b,c,det:det2(a,b,c)};
}

function minorFormula(vectors,weights){
  let q=z();
  for(let i=0;i<vectors.length;i++) for(let j=i+1;j<vectors.length;j++){
    q=add(q,scale(weights[i]*weights[j],sq(minor(vectors[i],vectors[j]))));
  }
  return q;
}

// Exact two-packet classification over a finite Gaussian-integer audit:
// with nonzero weights, det=0 iff the unique minor vanishes.
const scalars=[z(0),z(1),z(-1),z(0,1),z(0,-1),z(1,1)];
const vectors=[];
for(const d of scalars) for(const y of scalars) if(!zero(d)||!zero(y)) vectors.push([d,y]);
const nonzeroWeights=[-2,-1,1,2];
let twoCases=0;
for(const u of vectors) for(const v of vectors) for(const w1 of nonzeroWeights) for(const w2 of nonzeroWeights){
  const direct=symmetricPacketSum([u,v],[w1,w2]).det;
  const formula=minorFormula([u,v],[w1,w2]);
  const delta=minor(u,v);
  assert.ok(eq(direct,formula));
  assert.equal(zero(direct),zero(delta));
  twoCases++;
}
assert.ok(twoCases>1000);

// Three-packet Cauchy--Binet identity for real-indefinite and complex cases.
const complexVectors=[[z(3),z(0)],[z(0),z(3)],[z(0,-5),z(4)]];
const complexWeights=[1,1,1];
const complexMinors=[minor(complexVectors[0],complexVectors[1]),minor(complexVectors[0],complexVectors[2]),minor(complexVectors[1],complexVectors[2])];
assert.deepEqual(complexMinors,[z(9),z(12),z(0,15)]);
const complexSum=symmetricPacketSum(complexVectors,complexWeights);
assert.ok(eq(complexSum.det,minorFormula(complexVectors,complexWeights)));
assert.ok(zero(complexSum.det));
assert.ok(complexMinors.every(p=>!zero(p)));
assert.ok(!zero(complexSum.a)||!zero(complexSum.b)||!zero(complexSum.c));

const realVectors=[[z(5),z(0)],[z(0),z(5)],[z(3),z(4)]];
const mixedWeights=[1,1,-1];
const realMinors=[minor(realVectors[0],realVectors[1]),minor(realVectors[0],realVectors[2]),minor(realVectors[1],realVectors[2])];
assert.deepEqual(realMinors,[z(25),z(20),z(-15)]);
const realSum=symmetricPacketSum(realVectors,mixedWeights);
assert.ok(eq(realSum.det,minorFormula(realVectors,mixedWeights)));
assert.ok(zero(realSum.det));
assert.ok(realMinors.every(p=>!zero(p)));
assert.ok(!zero(realSum.a)||!zero(realSum.b)||!zero(realSum.c));

// Real same-sign triples have q=sum Delta^2, hence no nonaligned zero.
const realScalars=[-2,-1,0,1,2];
const realVectorsFinite=[];
for(const d of realScalars) for(const y of realScalars) if(d!==0||y!==0) realVectorsFinite.push([d,y]);
let positiveTripleCases=0;
for(const u of realVectorsFinite) for(const v of realVectorsFinite) for(const t of realVectorsFinite){
  const p12=u[0]*v[1]-v[0]*u[1];
  const p13=u[0]*t[1]-t[0]*u[1];
  const p23=v[0]*t[1]-t[0]*v[1];
  const q=p12*p12+p13*p13+p23*p23;
  assert.equal(q===0,p12===0&&p13===0&&p23===0);
  positiveTripleCases++;
}
assert.equal(positiveTripleCases,13824);

// Perturbative order: a nonzero null point has a linear transverse lift;
// the common-ray vertex begins quadratically in packet-minor coordinates.
// Complex q at p=(9,12,15i), perturbed in p12 by epsilon:
// q(epsilon)=18 epsilon+epsilon^2.
const p=[z(9),z(12),z(0,15)];
const eps=z(1);
const perturbed=add(add(sq(add(p[0],eps)),sq(p[1])),sq(p[2]));
assert.ok(eq(perturbed,z(19))); // 18(1)+1
const vertexPerturbed=add(add(sq(z(1)),sq(z(2))),sq(z(0,1)));
assert.ok(eq(vertexPerturbed,z(4))); // homogeneous order epsilon^2 coefficient

assert.equal(evidence.twoPacketClassification.zeroLocusForNonzeroWeights,'Delta_12=0');
assert.equal(evidence.threePacketClassification.geometryOverRealNumbers.sameSignWeights,'q_w is definite, so there is no nonaligned real zero.');
assert.equal(evidence.exactExamples.complexSymmetricSameWeights.allPairwiseNonaligned,true);
assert.equal(evidence.exactExamples.realSymmetricMixedWeights.allPairwiseNonaligned,true);
assert.match(evidence.perturbativeStratification.nonalignedCone,/first order|order epsilon/i);
assert.match(evidence.symmetryBoundary.whatStabilizerDoesNotDo,/does not by itself impose/);

console.log(`PASS 1513: ${twoCases} exact Gaussian-integer two-packet cases admit no nonaligned cancellation; three packets exhibit verified complex and real-indefinite null cones, with linear transverse lifting away from the common-ray vertex.`);
