import assert from "node:assert/strict";

const zeros=(m,n)=>Array.from({length:m},()=>Array(n).fill(0));
const eye=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>Number(i===j)));
const kron=(A,B)=>A.flatMap(row=>B.map(brow=>row.flatMap(a=>brow.map(b=>a*b))));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const tr=A=>A.reduce((s,r,i)=>s+r[i],0);
const transpose=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const equal=(A,B)=>A.every((r,i)=>r.every((x,j)=>x===B[i][j]));
const put=(A,r0,c0,B)=>B.forEach((r,i)=>r.forEach((x,j)=>A[r0+i][c0+j]=x));
const frob=(A,B)=>A.reduce((s,r,i)=>s+r.reduce((t,x,j)=>t+x*B[i][j],0),0);

// Block order: P=H_(5,2) dim6, Q=H_(1,2) dim4,
// JP=H_(2,5) dim6, JQ=H_(2,1) dim4.
const dims=[6,4,6,4], off=[0,6,10,16], n=20;
const K=[[1,0,0],[0,1,0]];
const T=kron(K,eye(2)); // C^3 tensor C^2* -> C^2 tensor C^2*
assert.equal(T.length,4);assert.equal(T[0].length,6);

const D=zeros(n,n);
put(D,off[1],off[0],T);put(D,off[0],off[1],transpose(T));
put(D,off[3],off[2],T);put(D,off[2],off[3],transpose(T));

const gamma=zeros(n,n);[1,-1,-1,1].forEach((s,b)=>{for(let i=0;i<dims[b];i++)gamma[off[b]+i][off[b]+i]=s;});
const J=zeros(n,n);
for(let i=0;i<6;i++){J[off[2]+i][off[0]+i]=1;J[off[0]+i][off[2]+i]=1;}
for(let i=0;i<4;i++){J[off[3]+i][off[1]+i]=1;J[off[1]+i][off[3]+i]=1;}

assert(equal(mm(J,J),eye(n)));
assert(equal(mm(J,D),mm(D,J)));
assert(equal(add(mm(gamma,D),mm(D,gamma)),zeros(n,n)));
assert(equal(add(mm(J,gamma),mm(gamma,J)),zeros(n,n)));
assert(equal(D,transpose(D)));

const completedField=Phi=>{
  const X=kron(Phi,eye(2)), F=zeros(n,n);
  put(F,off[1],off[0],X);put(F,off[0],off[1],transpose(X));
  put(F,off[3],off[2],X);put(F,off[2],off[3],transpose(X));
  return F;
};
const fieldBasis=[];
for(let a=0;a<2;a++)for(let b=0;b<3;b++){
  const E=zeros(2,3);E[a][b]=1;fieldBasis.push(completedField(E));
}
const kineticGram=fieldBasis.map(A=>fieldBasis.map(B=>frob(A,B)));
assert(equal(kineticGram,eye(6).map(r=>r.map(x=>8*x))));
const quarticExamples=[
  [[1,0,0],[0,0,0]],
  [[1,0,0],[0,1,0]],
  [[1,0,0],[0,2,0]]
].map(Phi=>{
  const F=completedField(Phi), G=mm(Phi,transpose(Phi));
  const q=tr(G), r=tr(mm(G,G));
  const traceF2=tr(mm(F,F)), traceF4=tr(mm(mm(F,F),mm(F,F)));
  assert.equal(traceF2,8*q);assert.equal(traceF4,8*r);
  return {Phi,q,r,traceF2,traceF4};
});

console.log(JSON.stringify({
  protocol:"spin23-736d-colored-local-ko6-block/1",
  complexDimension:n,
  sectors:["H_(5,2)","H_(1,2)","H_(2,5)","H_(2,1)"],
  sectorDimensions:dims,
  diracSeed:"T=K tensor I_2, K=[[1,0,0],[0,1,0]]",
  checks:{selfAdjoint:true,J2:+1,JD_equals_DJ:true,gammaD_equals_minusDgamma:true,Jgamma_equals_minusgammaJ:true},
  orderOne:"Particle block preserves right node 2; J block preserves left node 2. T is linear on the shared factor.",
  nonzeroDiracSquaredTrace:tr(mm(D,D)),
  coloredFieldComplexComponents:6,
  realBasisKineticGram:kineticGram,
  kineticGramEigenvalue:8,
  quarticIdentity:"Tr(D(Phi)^4)=8 Tr((Phi Phi*)^2)",
  quarticExamples,
  conclusion:"The local colored rectangle admits an explicit KO6-sign real-even completion with nonzero D.",
  boundary:"This is a local four-sector block, not the orientability, duality, or junk calculation for the full 736D carrier.",
  passed:true
},null,2));
