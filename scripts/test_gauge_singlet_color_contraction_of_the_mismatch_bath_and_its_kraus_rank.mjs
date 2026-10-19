import assert from 'node:assert/strict';

const I=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i===j?1:0));
const zero=(m,n=m)=>Array.from({length:m},()=>Array(n).fill(0));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const sub=(A,B)=>A.map((r,i)=>r.map((x,j)=>x-B[i][j]));
const scale=(s,A)=>A.map(r=>r.map(x=>s*x));
const eq=(A,B,t=1e-10)=>A.every((r,i)=>r.every((x,j)=>Math.abs(x-B[i][j])<t));
const pow=(A,n)=>{let X=I(A.length);for(let i=0;i<n;i++)X=mm(X,A);return X;};
const rank=A=>{const M=A.map(r=>r.slice());let row=0;for(let c=0;c<M[0].length&&row<M.length;c++){let p=row;while(p<M.length&&Math.abs(M[p][c])<1e-10)p++;if(p===M.length)continue;[M[row],M[p]]=[M[p],M[row]];const d=M[row][c];M[row]=M[row].map(x=>x/d);for(let i=0;i<M.length;i++)if(i!==row){const f=M[i][c];M[i]=M[i].map((x,j)=>x-f*M[row][j]);}row++;}return row;};

// Color augmentation action and absence of an invariant linear functional.
const C=[[0,-1],[1,-1]];
assert.equal(Math.round((C[0][0]-1)*(C[1][1]-1)-C[0][1]*C[1][0]),3);
// Row l=(a,b) satisfying lC=l has only a=b=0; rank(C^T-I)=2.
assert.equal(rank(sub(tr(C),I(2))),2);

// Unique primitive invariant quadratic color contraction.
const G=[[2,-1],[-1,2]];
assert.ok(eq(mm(mm(tr(C),G),C),G));
const symBasis=[[[1,0],[0,0]],[[0,1],[1,0]],[[0,0],[0,1]]];
const constraints=[];
for(const [i,j] of [[0,0],[0,1],[1,1]])constraints.push(symBasis.map(B=>sub(mm(mm(tr(C),B),C),B)[i][j]));
assert.equal(3-rank(constraints),1);

// Reconstruct the two minimal handle Kraus operators.
const R=[[1,0,0,0],[0,0,0,-1],[0,0,1,0],[0,1,0,-1]];
const H=[[0,1,0,0],[1,0,0,0],[0,0,0,1],[0,0,1,0]];
const Qm=[[4/3,0,-2/3,0],[0,4/3,0,-2/3],[-2/3,0,4/3,0],[0,-2/3,0,4/3]];
const R2=pow(R,2),handles=[H,mm(mm(R,H),R2),mm(mm(R2,H),R)];
const rs=Math.sqrt(2/3),rl=Math.sqrt(2),d=(rs+rl)/2,o=(rs-rl)/2;
const L=zero(4);for(const [a,b] of [[0,2],[1,3]]){L[a][a]=L[b][b]=d;L[a][b]=L[b][a]=o;}
const is=(1/rs+1/rl)/2,io=(1/rs-1/rl)/2;
const Li=zero(4);for(const [a,b] of [[0,2],[1,3]]){Li[a][a]=Li[b][b]=is;Li[a][b]=Li[b][a]=io;}
assert.ok(eq(mm(L,L),Qm)&&eq(mm(L,Li),I(4)));
const O=handles.map(K=>mm(mm(L,K),Li));
const K1=scale(1/Math.sqrt(6),sub(O[0],O[1]));
const K2=scale(1/Math.sqrt(18),sub(add(O[0],O[1]),scale(2,O[2])));
assert.ok(eq(add(mm(tr(K1),K1),mm(tr(K2),K2)),I(4)));

// Diagonalize G conceptually: eigenvalues are 1 and 3. A normalized full
// color contraction duplicates each relational Kraus operator with scalar
// weights sqrt(lambda_a/Tr G).
const colorEigenvalues=[1,3],traceG=4;
const relational=[K1,K2];
const colorDuplicated=[];
for(const K of relational)for(const lambda of colorEigenvalues)colorDuplicated.push(scale(Math.sqrt(lambda/traceG),K));
assert.ok(eq(colorDuplicated.map(K=>mm(tr(K),K)).reduce(add,zero(4)),I(4)));

const baseChannel=X=>relational.map(K=>mm(mm(K,X),tr(K))).reduce(add,zero(4));
const colorContractedChannel=X=>colorDuplicated.map(K=>mm(mm(K,X),tr(K))).reduce(add,zero(4));
for(let a=0;a<4;a++)for(let b=0;b<4;b++){
  const X=zero(4);X[a][b]=1;
  assert.ok(eq(baseChannel(X),colorContractedChannel(X)));
}

const baseRank=rank(relational.map(K=>K.flat()));
const duplicatedRank=rank(colorDuplicated.map(K=>K.flat()));
assert.equal(baseRank,2);assert.equal(duplicatedRank,2);

console.log(JSON.stringify({
  protocol:'gauge-singlet-color-contraction-of-mismatch-bath/1',
  augmentationColorAction:C,
  invariantLinearFunctionalDimension:0,
  consequence:'A single augmentation excitation cannot couple linearly to a colorless carrier.',
  invariantSymmetricFormDimension:1,
  primitiveInvariantColorMetric:G,
  colorMetricEigenvalues:colorEigenvalues,
  normalizedColorWeights:colorEigenvalues.map(x=>x/traceG),
  originalKrausCount:2,
  colorDuplicatedKrausCount:4,
  originalChoiRank:baseRank,
  colorContractedChoiRank:duplicatedRank,
  normalizedColorContractionLeavesChannelUnchanged:true,
  interpretation:'For a factorized gauge-singlet bilinear contraction, color supplies scalar duplicate Kraus weights whose sum is one. The apparent four labels span only the original two operator directions.',
  physicalBoundary:'Gauge invariance selects the quadratic color contraction but does not by itself prove that the microscopic response vertex factorizes into color metric times the same two carrier operators. Nonfactorizing colored vertices could enlarge the Choi rank.',
  passed:true
},null,2));
