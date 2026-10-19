import assert from 'node:assert/strict';

const I=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i===j?1:0));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const sub=(A,B)=>A.map((r,i)=>r.map((x,j)=>x-B[i][j]));
const scale=(s,A)=>A.map(r=>r.map(x=>s*x));
const kron=(A,B)=>A.flatMap(ar=>B.map(br=>ar.flatMap(a=>br.map(b=>a*b))));
const eq=(A,B,t=1e-9)=>A.every((r,i)=>r.every((x,j)=>Math.abs(x-B[i][j])<t));
const rank=A=>{const M=A.map(r=>r.slice());let row=0;for(let c=0;c<(M[0]?.length||0)&&row<M.length;c++){let p=row;while(p<M.length&&Math.abs(M[p][c])<1e-9)p++;if(p===M.length)continue;[M[row],M[p]]=[M[p],M[row]];const d=M[row][c];M[row]=M[row].map(x=>x/d);for(let i=0;i<M.length;i++)if(i!==row){const f=M[i][c];M[i]=M[i].map((x,j)=>x-f*M[row][j]);}row++;}return row;};

const theta=2*Math.PI/3,c=Math.cos(theta),s=Math.sin(theta);
const R=[[c,-s],[s,c]];
const J=[[0,-1],[1,0]];
const F=[[1,0],[0,-1]];
const Acolor=kron(I(2),R);
const Bmult=kron(R,I(2));
const Treflection=kron(F,F);
assert.ok(eq(mm(mm(Treflection,Acolor),Treflection),mm(Acolor,Acolor)));
assert.ok(eq(mm(mm(Treflection,Bmult),Treflection),mm(Bmult,Bmult)));

// Build homogeneous linear commutator constraints on a general 4x4 matrix.
const matrixBasis=[];for(let a=0;a<4;a++)for(let b=0;b<4;b++){const E=Array.from({length:4},()=>Array(4).fill(0));E[a][b]=1;matrixBasis.push(E);}
const commutantDimension=generators=>{
  const rows=[];
  for(const G of generators)for(let i=0;i<4;i++)for(let j=0;j<4;j++)rows.push(matrixBasis.map(E=>sub(mm(E,G),mm(G,E))[i][j]));
  return 16-rank(rows);
};

// Lie algebra of the orthogonal centralizer: skew matrices commuting with all.
const skewBasis=[];for(let a=0;a<4;a++)for(let b=a+1;b<4;b++){const E=Array.from({length:4},()=>Array(4).fill(0));E[a][b]=1;E[b][a]=-1;skewBasis.push(E);}
const orthogonalCentralizerLieDimension=generators=>{
  const rows=[];
  for(const G of generators)for(let i=0;i<4;i++)for(let j=0;j<4;j++)rows.push(skewBasis.map(E=>sub(mm(E,G),mm(G,E))[i][j]));
  return 6-rank(rows);
};

const algebraDims={
  colorOnly:commutantDimension([Acolor]),
  colorAndMultiplicity:commutantDimension([Acolor,Bmult]),
  colorMultiplicityReflection:commutantDimension([Acolor,Bmult,Treflection])
};
const lieDims={
  colorOnly:orthogonalCentralizerLieDimension([Acolor]),
  colorAndMultiplicity:orthogonalCentralizerLieDimension([Acolor,Bmult]),
  colorMultiplicityReflection:orthogonalCentralizerLieDimension([Acolor,Bmult,Treflection])
};
assert.deepEqual(algebraDims,{colorOnly:8,colorAndMultiplicity:4,colorMultiplicityReflection:2});
assert.deepEqual(lieDims,{colorOnly:4,colorAndMultiplicity:2,colorMultiplicityReflection:0});

// Joint-character planes are eigenspaces of J tensor J.
const K=kron(J,J);
assert.ok(eq(mm(K,K),I(4)));
const Pplus=scale(.5,add(I(4),K));
const Pminus=scale(.5,sub(I(4),K));
assert.ok(eq(mm(Pplus,Pplus),Pplus)&&eq(mm(Pminus,Pminus),Pminus));
assert.equal(rank(Pplus),2);assert.equal(rank(Pminus),2);

// With reflection included, independent signs on the two joint-character
// planes give the full obvious discrete centralizer component.
const signs=[];
for(const sp of [-1,1])for(const sm of [-1,1]){
  const O=add(scale(sp,Pplus),scale(sm,Pminus));
  assert.ok(eq(mm(O,mm(O,I(4))),I(4)));
  assert.ok([Acolor,Bmult,Treflection].every(G=>eq(mm(O,G),mm(G,O))));
  signs.push({sp,sm,matrix:O});
}

console.log(JSON.stringify({
  protocol:'environment-gauge-centralizers/1',
  colorGenerator:Acolor,
  multiplicityGenerator:Bmult,
  jointReflection:Treflection,
  reflectionNormalizesCycles:'T A T=A^{-1} and T B T=B^{-1}',
  fullLinearCommutantDimensions:algebraDims,
  orthogonalCentralizerLieDimensions:lieDims,
  groupInterpretation:{
    colorOnly:'connected orthogonal centralizer U(2)',
    colorAndMultiplicity:'connected orthogonal centralizer U(1) x U(1)',
    withJointReflection:'exactly four elements: independent signs on the two joint-character planes'
  },
  jointPlaneProjectors:{plus:Pplus,minus:Pminus},
  discreteSignChoices:signs,
  conclusion:'Physical color alone leaves four continuous environment-gauge parameters. An independently typed multiplicity cycle leaves two phases. A compatible real reflection removes the continuous ambiguity and reduces the residual labeled-frame freedom to discrete signs on the two joint-character planes.',
  caveat:'The joint reflection is a conditional typing datum. The calculation does not prove that the existing Furey ribbon, Higgs vacuum, or Pfaffian line realizes it on this environment.',
  passed:true
},null,2));
