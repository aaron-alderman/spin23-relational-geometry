import assert from 'node:assert/strict';

const I=Array.from({length:4},(_,i)=>Array.from({length:4},(_,j)=>i===j?1:0));
const R=[[1,0,0,0],[0,0,0,-1],[0,0,1,0],[0,1,0,-1]];
const H=[[0,1,0,0],[1,0,0,0],[0,0,0,1],[0,0,1,0]];
const Q=[[4/3,0,-2/3,0],[0,4/3,0,-2/3],[-2/3,0,4/3,0],[0,-2/3,0,4/3]];
const zero=(m=4,n=4)=>Array.from({length:m},()=>Array(n).fill(0));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const sub=(A,B)=>A.map((r,i)=>r.map((x,j)=>x-B[i][j]));
const scale=(s,A)=>A.map(r=>r.map(x=>s*x));
const maxabs=A=>Math.max(...A.flat().map(Math.abs));
const eq=(A,B)=>maxabs(sub(A,B))<1e-10;
const pow=(A,n)=>{let X=I;for(let i=0;i<n;i++)X=mm(X,A);return X;};
const rank=A=>{const M=A.map(r=>r.slice());let row=0;for(let c=0;c<(M[0]?.length??0)&&row<M.length;c++){let p=row;while(p<M.length&&Math.abs(M[p][c])<1e-10)p++;if(p===M.length)continue;[M[row],M[p]]=[M[p],M[row]];const d=M[row][c];for(let j=c;j<M[0].length;j++)M[row][j]/=d;for(let i=0;i<M.length;i++)if(i!==row){const f=M[i][c];for(let j=c;j<M[0].length;j++)M[i][j]-=f*M[row][j];}row++;}return row;};

const R2=pow(R,2),handles=[H,mm(mm(R,H),R2),mm(mm(R2,H),R)];
assert.ok(eq(handles.reduce(add,zero()),zero()));
assert.ok(handles.every(K=>eq(mm(mm(tr(K),Q),K),Q)));

// Exact symmetric square root of Q on the (0,2) and (1,3) pairs.
const rootSmall=Math.sqrt(2/3),rootLarge=Math.sqrt(2);
const d=(rootSmall+rootLarge)/2,o=(rootSmall-rootLarge)/2;
const L=zero();for(const [a,b] of [[0,2],[1,3]]){L[a][a]=L[b][b]=d;L[a][b]=L[b][a]=o;}
const id=(1/rootSmall+1/rootLarge)/2,io=(1/rootSmall-1/rootLarge)/2;
const Li=zero();for(const [a,b] of [[0,2],[1,3]]){Li[a][a]=Li[b][b]=id;Li[a][b]=Li[b][a]=io;}
assert.ok(eq(mm(L,L),Q)&&eq(mm(L,Li),I));

// Whitened handles are ordinary orthogonal involutions.
const O=handles.map(K=>mm(mm(L,K),Li));
assert.ok(O.every(K=>eq(mm(tr(K),K),I)&&eq(mm(K,K),I)));
assert.ok(eq(O.reduce(add,zero()),zero()));

// Naive three-label Stinespring isometry V stacks O_i/sqrt(3).
const V=O.flatMap(K=>K.map(r=>r.map(x=>x/Math.sqrt(3))));
assert.equal(V.length,12);assert.ok(eq(mm(tr(V),V),I));

// The Kraus/Choi rank is the rank of the vectorized Kraus operators. The
// zero-sum relation makes it two, not three.
const vectorized=O.map(K=>K.flat());
const krausRank=rank(vectorized);
assert.equal(krausRank,2);

// Rotate the relationship labels into the C3 singlet plus its real doublet.
// The singlet Kraus operator vanishes; the remaining two are minimal.
const Ksinglet=scale(1/3,O.reduce(add,zero()));
const K1=scale(1/Math.sqrt(6),sub(O[0],O[1]));
const K2=scale(1/Math.sqrt(18),sub(add(O[0],O[1]),scale(2,O[2])));
assert.ok(eq(Ksinglet,zero()));
const completeness=add(mm(tr(K1),K1),mm(tr(K2),K2));
assert.ok(eq(completeness,I));
const Vmin=[...K1.map(r=>r),...K2.map(r=>r)];
assert.equal(Vmin.length,8);assert.ok(eq(mm(tr(Vmin),Vmin),I));

console.log(JSON.stringify({
  protocol:'minimal-stinespring-dilation-of-three-handle-class-sum/1',
  invariantMetric:Q,
  whitenedHandlesOrthogonalInvolutions:true,
  naiveRelationshipLabels:3,
  naiveIsometryShape:[12,4],
  linearHandleRelation:'O0+O1+O2=0',
  choiKrausRank:krausRank,
  nullAncillaDirection:'(1,1,1)/sqrt(3), the C3-singlet label',
  minimalKrausOperators:[K1,K2],
  minimalIsometryShape:[8,4],
  minimalEnvironmentRealDimension:2,
  unitaryExtension:'Every finite-dimensional isometry extends to an orthogonal/unitary operator; hence the 8x4 minimal isometry has a passive 8-dimensional dilation.',
  interpretation:'Three relationship orientations form a label triplet, but their linear singlet cancels. The physical Kraus environment is the two-dimensional real standard representation of C3.',
  conclusion:'The full-selector class-sum channel has a minimal two-state relational environment, not a three-state one. Its three visible legs are an overcomplete zero-sum frame.',
  passed:true
},null,2));
