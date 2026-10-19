import assert from 'node:assert/strict';

const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const eq=(A,B,t=1e-9)=>A.every((r,i)=>r.every((x,j)=>Math.abs(x-B[i][j])<t));
const roundMatrix=A=>A.map(r=>r.map(x=>{assert.ok(Math.abs(x-Math.round(x))<1e-9);return Math.round(x);}));
function inv(A){
  const n=A.length; const M=A.map((r,i)=>[...r,...Array.from({length:n},(_,j)=>i===j?1:0)]);
  for(let c=0;c<n;c++){
    let p=c;while(p<n&&Math.abs(M[p][c])<1e-12)p++;assert.ok(p<n);
    [M[c],M[p]]=[M[p],M[c]];const d=M[c][c];for(let j=0;j<2*n;j++)M[c][j]/=d;
    for(let i=0;i<n;i++)if(i!==c){const f=M[i][c];for(let j=0;j<2*n;j++)M[i][j]-=f*M[c][j];}
  }
  return M.map(r=>r.slice(n));
}
function det(A){
  const M=A.map(r=>r.map(Number));let d=1;
  for(let c=0;c<M.length;c++){let p=c;while(p<M.length&&Math.abs(M[p][c])<1e-10)p++;if(p===M.length)return 0;if(p!==c){[M[p],M[c]]=[M[c],M[p]];d=-d;}const q=M[c][c];d*=q;for(let i=c+1;i<M.length;i++){const f=M[i][c]/q;for(let j=c;j<M.length;j++)M[i][j]-=f*M[c][j];}}
  return d;
}

const Jc=[[0,1,-1,0],[-1,0,1,0],[1,-1,0,0],[0,0,0,0]];
const Jf=[[0,0,0,1],[0,0,0,1],[0,0,0,1],[-1,-1,-1,0]];
const J=Jc.map((r,i)=>r.map((x,j)=>x+Jf[i][j]));

// Columns are g1=(b1+b2+b3)/3, g2=b2, g3=b3, g4=b4.
const G=[
  [1/3,0,0,0],
  [1/3,1,0,0],
  [1/3,0,1,0],
  [0,0,0,1],
];
const Jg=roundMatrix(mul(mul(tr(G),J),G));
assert.equal(Math.round(det(Jg)),1);

// Canonical columns in the g basis: p1=g1, p2=g2-g1, q1=g4, q2=g3-g1.
const U=[
  [1,-1,0,-1],
  [0,1,0,0],
  [0,0,0,1],
  [0,0,1,0],
];
assert.equal(Math.abs(Math.round(det(U))),1);
const C=mul(G,U); // canonical basis columns in original b coordinates
const J0=roundMatrix(mul(mul(tr(C),J),C));
const expectedJ0=[[0,0,1,0],[0,0,0,1],[-1,0,0,0],[0,-1,0,0]];
assert.ok(eq(J0,expectedJ0));

function rep(p){return Array.from({length:4},(_,r)=>Array.from({length:4},(_,c)=>(p[c]===r?1:0)-(p[4]===r?1:0)));}
const Rb=rep([1,2,0,3,4]);
const Sb=rep([1,0,2,4,3]);
const R=roundMatrix(mul(mul(inv(C),Rb),C));
const S=roundMatrix(mul(mul(inv(C),Sb),C));
assert.ok(eq(mul(mul(tr(R),J0),R),J0));
assert.ok(eq(mul(mul(tr(S),J0),S),J0.map(r=>r.map(x=>-x))));
assert.equal(Math.round(det(R)),1);
assert.equal(Math.round(det(S)),1);

const pairs=[[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]];
function skewFrom6(v){
  const A=Array.from({length:4},()=>Array(4).fill(0));
  pairs.forEach(([i,j],k)=>{A[i][j]=v[k];A[j][i]=-v[k];});return A;
}
function vec6(A){return pairs.map(([i,j])=>A[i][j]);}
const wedgeGram6=Array.from({length:6},()=>Array(6).fill(0));
function wedgeCoeff(a,b){
  // coefficient of a wedge b in orientation 0,1,2,3
  return a[0]*b[5]+a[5]*b[0]-a[1]*b[4]-a[4]*b[1]+a[2]*b[3]+a[3]*b[2];
}
for(let i=0;i<6;i++)for(let j=0;j<6;j++){const ei=Array(6).fill(0),ej=Array(6).fill(0);ei[i]=1;ej[j]=1;wedgeGram6[i][j]=-wedgeCoeff(ei,ej);}

// Primitive basis: E01, E03, E12, E23, E02-E13.
const P6=[
  [1,0,0,0,0],
  [0,0,0,0,1],
  [0,1,0,0,0],
  [0,0,1,0,0],
  [0,0,0,0,-1],
  [0,0,0,1,0],
];
const Q23=roundMatrix(mul(mul(tr(P6),wedgeGram6),P6));
const expectedQ=[[0,0,0,-1,0],[0,0,-1,0,0],[0,-1,0,0,0],[-1,0,0,0,0],[0,0,0,0,-2]];
assert.ok(eq(Q23,expectedQ));
assert.equal(Math.round(det(Q23)),-2);

function wedgePull(A){
  const cols=[];
  for(let k=0;k<6;k++){
    const e=Array(6).fill(0);e[k]=1;
    cols.push(vec6(mul(mul(tr(A),skewFrom6(e)),A)));
  }
  return Array.from({length:6},(_,i)=>cols.map(c=>c[i]));
}
function restrictPrimitive(W){
  const WP=mul(W,P6);
  return roundMatrix(WP.map(row=>row));
}
// Coordinates in primitive basis d=(c01,c03,c12,c23,c02), with c13=-c02.
function primitiveCoords(v){
  assert.ok(Math.abs(v[1]+v[4])<1e-9);
  return [v[0],v[2],v[3],v[5],v[1]];
}
function primitiveMatrix(W){
  const WP=mul(W,P6); const cols=[];
  for(let j=0;j<5;j++)cols.push(primitiveCoords(WP.map(r=>r[j])));
  return roundMatrix(Array.from({length:5},(_,i)=>cols.map(c=>c[i])));
}
const R5=primitiveMatrix(wedgePull(R));
const S5=primitiveMatrix(wedgePull(S));
assert.ok(eq(mul(mul(tr(R5),Q23),R5),Q23));
assert.ok(eq(mul(mul(tr(S5),Q23),S5),Q23));
assert.equal(Math.round(det(R5)),1);
assert.equal(Math.round(det(S5)),-1);

console.log(JSON.stringify({
  protocol:'color-average-unimodular-sp4-to-integral-spin23/1',
  completedLatticeBasisInA4Coordinates:G,
  canonicalSymplecticBasisInA4Coordinates:C,
  canonicalSymplecticForm:J0,
  signedOrderSixOnCanonicalCarrier:{colorCycle:R,pairedReflection:S,colorCycleMultiplier:1,pairedReflectionMultiplier:-1},
  primitiveTwoFormBasis:['e01','e03','e12','e23','e02-e13'],
  primitiveGram:Q23,
  primitiveGramDescription:'U plus U plus <-2>, signature (2,3), determinant -2',
  inducedFiveDimensionalAction:{colorCycle:R5,pairedReflection:S5,bothPreservePrimitiveGram:true,colorCycleDeterminant:1,pairedReflectionDeterminant:-1},
  conclusion:'The unique signed-covariant index-three completion is integrally symplectomorphic to Z^4. Its primitive two-form lattice is U⊕U⊕<-2>, an integral signature-(2,3) lattice. The color cycle acts in SO(2,3), while the paired anti-symplectic reflection acts in the determinant-minus-one component of O(2,3).',
  boundary:'The construction remains conditional on the equal-area form J_color+J_fixed.',
  passed:true,
},null,2));
