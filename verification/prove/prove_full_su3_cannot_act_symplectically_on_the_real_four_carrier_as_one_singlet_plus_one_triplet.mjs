import assert from 'node:assert/strict';

const zero=(m,n)=>Array.from({length:m},()=>Array(n).fill(0));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const maxabs=A=>Math.max(...A.flat().map(Math.abs));
const rank=A=>{
  const M=A.map(r=>r.slice());let row=0;
  for(let c=0;c<(M[0]?.length??0)&&row<M.length;c++){
    let p=row;while(p<M.length&&Math.abs(M[p][c])<1e-10)p++;
    if(p===M.length)continue;
    [M[row],M[p]]=[M[p],M[row]];const d=M[row][c];
    for(let j=c;j<M[0].length;j++)M[row][j]/=d;
    for(let i=0;i<M.length;i++)if(i!==row){const f=M[i][c];for(let j=c;j<M[0].length;j++)M[i][j]-=f*M[row][j];}
    row++;
  }
  return row;
};

// Complex representation 1 + 3 of sl_3.  All matrices happen to be real,
// so the bilinear invariance equations can be solved over Q directly.
const E=(a,b)=>{const M=zero(4,4);M[a][b]=1;return M;};
const H1=zero(4,4),H2=zero(4,4);
H1[1][1]=1;H1[2][2]=-1;
H2[2][2]=1;H2[3][3]=-1;
const roots=[E(1,2),E(2,1),E(2,3),E(3,2)];
const generators=[H1,H2,...roots];

// Coordinates of an arbitrary alternating 4x4 form.
const pairs=[[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]];
const altBasis=pairs.map(([a,b])=>{const A=zero(4,4);A[a][b]=1;A[b][a]=-1;return A;});
const equations=[];
for(const G of generators)for(let a=0;a<4;a++)for(let b=0;b<4;b++){
  const row=altBasis.map(A=>add(mm(tr(G),A),mm(A,G))[a][b]);
  if(row.some(x=>x!==0))equations.push(row);
}
const invariantAlternatingDimension=6-rank(equations);
assert.equal(invariantAlternatingDimension,0);

// The discrete color three-cycle does preserve a nondegenerate form after the
// exact similarity to R, demonstrating that the obstruction appears only when
// the Weyl-cycle shadow is promoted to the full connected color group.
const R=[[1,0,0,0],[0,0,0,-1],[0,0,1,0],[0,1,0,-1]];
const J=[[0,0,1,0],[0,0,0,1],[-1,0,0,0],[0,-1,0,0]];
const e0=[1,0,0,0],e1=[0,1,0,0],e2=[0,0,1,0];
const rv=(A,v)=>A.map(r=>r.reduce((s,x,j)=>s+x*v[j],0));
const av=(a,b)=>a.map((x,i)=>x+b[i]),sv=(s,a)=>a.map(x=>s*x);
const v=av(e1,sv(1/3,e2)),Rv=rv(R,v),R2v=rv(R,Rv);
const X=Array.from({length:4},(_,i)=>[e0[i],v[i],Rv[i],R2v[i]]);
const P=[[1,0,0,0],[0,0,0,1],[0,1,0,0],[0,0,1,0]];
const Jcolor=mm(mm(tr(X),J),X);
assert.ok(maxabs(add(mm(tr(P),mm(Jcolor,P)),Jcolor.map(r=>r.map(x=>-x))))<1e-10);
assert.ok(Math.abs(Jcolor[0][1])+Math.abs(Jcolor[0][2])+Math.abs(Jcolor[0][3])>0);
const cartanDefects=[H1,H2].map(G=>maxabs(add(mm(tr(G),Jcolor),mm(Jcolor,G))));
assert.ok(cartanDefects.some(x=>x>1e-6));

// Weight-pair explanation: no two distinct weights of 1+3 add to zero.
const weights=[[0,0],[1,0],[-1,1],[0,-1]];
const zeroWeightPairs=[];
for(let i=0;i<4;i++)for(let j=i+1;j<4;j++)if(weights[i][0]+weights[j][0]===0&&weights[i][1]+weights[j][1]===0)zeroWeightPairs.push([i,j]);
assert.equal(zeroWeightPairs.length,0);

console.log(JSON.stringify({
  protocol:'full-su3-versus-real-four-selector-carrier/1',
  complexSourceType:'1 plus fundamental 3 of SU(3)',
  alternatingFormDimension:6,
  fullSu3InvariantAlternatingDimension:invariantAlternatingDimension,
  weightPairsSummingToZero:zeroWeightPairs,
  discreteColorCycle:{preservesTransportedSymplecticForm:true,transportedForm:Jcolor},
  cartanDefects,
  realFormObstruction:'The complex representation 1+3 is not isomorphic to its conjugate 1+bar(3), so it has no four-real-dimensional form. Its faithful realification has dimension eight.',
  conclusion:'The C3 quotient is an exact discrete color-cycle shadow but cannot be promoted to a full SU(3)-equivariant symplectic action on the same real four-carrier.',
  survivingRoute:'Keep full color on an upstream eight-real-dimensional singlet-plus-triplet carrier and obtain the four-real response only after gauge-singlet bilinear contraction, not by a linear gauge-equivariant quotient retaining the triplet.',
  passed:true
},null,2));
