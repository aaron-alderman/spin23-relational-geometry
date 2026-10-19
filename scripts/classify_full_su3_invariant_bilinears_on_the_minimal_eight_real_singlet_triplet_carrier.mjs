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

// Complex 4x4 matrices are stored as pairs [Re,Im].  Coordinate zero is an
// SU(3) singlet and coordinates 1,2,3 are the fundamental triplet.
const cm=()=>({re:zero(4,4),im:zero(4,4)});
const gens=[];
for(const diag of [[0,1,-1,0],[0,0,1,-1]]){
  const G=cm();for(let i=0;i<4;i++)G.im[i][i]=diag[i];gens.push(G);
}
for(const [a,b] of [[1,2],[2,3]]){
  const A=cm();A.re[a][b]=1;A.re[b][a]=-1;gens.push(A);
  const B=cm();B.im[a][b]=1;B.im[b][a]=1;gens.push(B);
}
const realify=({re,im})=>Array.from({length:8},(_,i)=>Array.from({length:8},(_,j)=>{
  const ir=i%4,jr=j%4,ib=i>=4,jb=j>=4;
  if(!ib&&!jb)return re[ir][jr];
  if(!ib&&jb)return -im[ir][jr];
  if(ib&&!jb)return im[ir][jr];
  return re[ir][jr];
}));
const realGenerators=gens.map(realify);

const bilinearBasis=kind=>{
  const out=[];
  for(let i=0;i<8;i++)for(let j=kind==='skew'?i+1:i;j<8;j++){
    const A=zero(8,8);A[i][j]=1;A[j][i]=kind==='skew'?-1:1;out.push(A);
  }
  return out;
};
const invariantDimension=basis=>{
  const equations=[];
  for(const G of realGenerators)for(let a=0;a<8;a++)for(let b=0;b<8;b++){
    const row=basis.map(A=>add(mm(tr(G),A),mm(A,G))[a][b]);
    if(row.some(x=>x!==0))equations.push(row);
  }
  return basis.length-rank(equations);
};
const skewBasis=bilinearBasis('skew'),symmetricBasis=bilinearBasis('symmetric');
const invariantAlternatingDimension=invariantDimension(skewBasis);
const invariantSymmetricDimension=invariantDimension(symmetricBasis);
assert.equal(invariantAlternatingDimension,2);
assert.equal(invariantSymmetricDimension,4);

// Explicit invariant metrics and symplectic forms on the singlet and triplet
// realifications. Ordering is (Re z0..Re z3, Im z0..Im z3).
const Ks=zero(8,8),Kt=zero(8,8),Gs=zero(8,8),Gt=zero(8,8);
for(const i of [0]){Ks[i][i+4]=-1;Ks[i+4][i]=1;Gs[i][i]=Gs[i+4][i+4]=1;}
for(const i of [1,2,3]){Kt[i][i+4]=-1;Kt[i+4][i]=1;Gt[i][i]=Gt[i+4][i+4]=1;}
for(const G of realGenerators)for(const A of [Ks,Kt,Gs,Gt])assert.ok(maxabs(add(mm(tr(G),A),mm(A,G)))<1e-10);
assert.equal(rank(Ks),2);assert.equal(rank(Kt),6);assert.equal(rank(add(Ks,Kt)),8);

// No invariant cross-sector bilinear survives: the complete invariant spaces
// are exhausted by the displayed sector forms.
const crossMask=A=>A.map((r,i)=>r.map((x,j)=>{
  const si=(i===0||i===4),sj=(j===0||j===4);return si!==sj?x:0;
}));
assert.equal(maxabs(crossMask(Ks)),0);assert.equal(maxabs(crossMask(Kt)),0);

console.log(JSON.stringify({
  protocol:'full-su3-invariant-bilinears-on-eight-real-singlet-triplet-carrier/1',
  carrier:'realification of complex (1 plus 3)',
  realDimension:8,
  arbitraryAlternatingDimension:skewBasis.length,
  invariantAlternatingDimension,
  alternatingBasis:{singletComplexPlane:Ks,tripletComplexRealification:Kt,ranks:[rank(Ks),rank(Kt)]},
  arbitrarySymmetricDimension:symmetricBasis.length,
  invariantSymmetricDimension,
  symmetricExamples:{singletMetric:Gs,tripletMetric:Gt},
  symmetricDecomposition:'three arbitrary symmetric forms on the two-real-dimensional trivial singlet plane, plus one triplet metric',
  invariantCrossSectorBilinears:0,
  uniqueNondegenerateSymplecticLine:false,
  nondegenerateFamily:'a*Ks+b*Kt is nondegenerate exactly when a and b are both nonzero; SU(3) does not fix b/a.',
  tripletOnlyTradeoff:'Dropping the singlet leaves the unique triplet symplectic line but destroys the retained singlet response.',
  conclusion:'Full color supplies two independently normalized invariant symplectic sectors, not the unique four-carrier line. A source relation, exchange, Ward normalization or dynamics must lock their relative coefficient before a unique pole can emerge.',
  passed:true
},null,2));
