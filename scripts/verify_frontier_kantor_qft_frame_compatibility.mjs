import assert from 'node:assert/strict';

const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const mv=(A,x)=>A.map(r=>r.reduce((s,a,i)=>s+a*x[i],0));
const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const det=A=>A[0][0]*A[1][1]-A[0][1]*A[1][0];
const same=(A,B)=>A.every((r,i)=>r.every((x,j)=>Math.abs(x-B[i][j])<1e-12));
const rowTimes=(r,A)=>A[0].map((_,j)=>r.reduce((s,x,i)=>s+x*A[i][j],0));
const bilinear=(x,G,y)=>x.reduce((s,a,i)=>s+a*mv(G,y)[i],0);

const c=7/5;
// Coordinates are ordered (incidence, q). T sends incidence -> incidence+c q
// and fixes q.
const T=[[1,0],[c,1]],q=[0,1],incidence=[1,0];
assert.deepEqual(mv(T,q),q);
assert.equal(det(T),1);
const omega=[[0,1],[-1,0]];
assert.ok(same(mm(mm(tr(T),omega),T),omega));

// Every Yukawa-divergence coordinate is a multiple of the quotient covector
// d=(1,0), because it annihilates B-L. Charged leptons distinguish the two
// incidence forks by 2 versus 4 but remain shear blind.
const channelsDedup=[[10,0],[6,0],[2,0],[1,0]];
const channelsMultiplicity=[[10,0],[6,0],[4,0],[1,0]];
for(const d of [...channelsDedup,...channelsMultiplicity])assert.deepEqual(rowTimes(d,T),d);
assert.notDeepEqual(channelsDedup,channelsMultiplicity);

// A fixed QFT Gram is not shear invariant and selects the orthogonal
// representative inside either declared affine incidence class.
const Gd=[[231,9],[9,48]],Gm=[[239,15],[15,48]];
for(const G of [Gd,Gm])assert.ok(!same(mm(mm(tr(T),G),T),G));
const orthogonalRepresentative=G=>{
 const alpha=-bilinear(incidence,G,q)/bilinear(q,G,q);
 const v=[1,alpha];
 assert.ok(Math.abs(bilinear(v,G,q))<1e-12);
 return {alpha,norm2:bilinear(v,G,v)};
};
const od=orthogonalRepresentative(Gd),om=orthogonalRepresentative(Gm);
assert.equal(od.alpha,-3/16);assert.equal(om.alpha,-5/16);
assert.equal(od.norm2,3669/16);assert.equal(om.norm2,3749/16);

// Metric plus area on an abstract topology plane still has an SO(2)
// stabilizer. The quarter turn is a concrete nonidentity witness.
const I=[[1,0],[0,1]],R90=[[0,-1],[1,0]];
assert.ok(same(mm(mm(tr(R90),I),R90),I));
assert.ok(same(mm(mm(tr(R90),omega),R90),omega));
assert.ok(!same(R90,I));

// Adding an oriented unit anchor removes the SO(2) freedom. An unoriented
// line retains the common sign ±I.
const anchor=[1,0];
assert.notDeepEqual(mv(R90,anchor),anchor);
const minusI=[[-1,0],[0,-1]];
assert.deepEqual(mv(minusI,anchor),[-1,0]);
assert.ok(same(mm(mm(tr(minusI),I),minusI),I));
assert.ok(same(mm(mm(tr(minusI),omega),minusI),omega));

console.log(JSON.stringify({
 protocol:'frontier-kantor-qft-frame-compatibility/1',
 sourceShear:{matrix:T,fixedBL:q,determinant:det(T),preservesArea:true,preservesAllYukawaDivergenceCoordinates:true},
 incidenceFork:{deduplicated:channelsDedup,multiplicity:channelsMultiplicity,chargedLeptonCoordinates:[2,4],distinguishedByChargedLeptons:true,shearStillInvisible:true},
 qftGramFix:{deduplicated:od,multiplicity:om,removesShearWithinDeclaredFork:true},
 topologyStabilizer:{metric:'I',area:omega,nontrivialWitness:R90,group:'SO(2)',orientedAnchorReducesTo:'identity',unorientedAnchorReducesTo:'{+I,-I}'},
 conclusion:'The contact-area line does not remove the B-L shear because the shear has determinant one, and charged-lepton divergence selects the incidence fork but remains shear blind. A fixed QFT Gram removes shear inside each fork. Yet Gram plus area on the topology plane retains an SO(2) frame torsor; one operator-level topology-to-source anchor is still necessary, after which only a sign remains if the anchor is unoriented.',
 passed:true,
},null,2));
