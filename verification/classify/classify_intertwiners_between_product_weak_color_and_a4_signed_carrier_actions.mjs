import assert from 'node:assert/strict';

const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const sub=(A,B)=>A.map((r,i)=>r.map((x,j)=>x-B[i][j]));
const kron=(A,B)=>A.flatMap(ar=>B.map(br=>ar.flatMap(a=>br.map(b=>a*b))));
const zero=()=>Array.from({length:4},()=>Array(4).fill(0));
const basis=[];for(let a=0;a<4;a++)for(let b=0;b<4;b++){const E=zero();E[a][b]=1;basis.push(E);}
const rank=A=>{const M=A.map(r=>r.slice());let row=0;for(let c=0;c<(M[0]?.length||0)&&row<M.length;c++){let p=row;while(p<M.length&&Math.abs(M[p][c])<1e-9)p++;if(p===M.length)continue;[M[p],M[row]]=[M[row],M[p]];const q=M[row][c];M[row]=M[row].map(x=>x/q);for(let i=0;i<M.length;i++)if(i!==row){const f=M[i][c];M[i]=M[i].map((x,j)=>x-f*M[row][j]);}row++;}return row;};
const constraints=pairs=>{
  const rows=[];
  for(const [A,B] of pairs)for(let i=0;i<4;i++)for(let j=0;j<4;j++)
    rows.push(basis.map(E=>sub(mm(A,E),mm(E,B))[i][j]));
  return rows;
};
const nullspace=A=>{
  const M=A.map(r=>r.slice());const piv=[];let row=0;
  for(let c=0;c<M[0].length&&row<M.length;c++){
    let p=row;while(p<M.length&&Math.abs(M[p][c])<1e-9)p++;if(p===M.length)continue;
    [M[p],M[row]]=[M[row],M[p]];const q=M[row][c];M[row]=M[row].map(x=>x/q);
    for(let i=0;i<M.length;i++)if(i!==row){const f=M[i][c];M[i]=M[i].map((x,j)=>x-f*M[row][j]);}
    piv.push(c);row++;
  }
  const free=Array.from({length:M[0].length},(_,i)=>i).filter(i=>!piv.includes(i));
  return free.map(f=>{const v=Array(M[0].length).fill(0);v[f]=1;piv.forEach((p,i)=>v[p]=-M[i][f]);return v;});
};
const matrix=v=>Array.from({length:4},(_,i)=>v.slice(4*i,4*i+4));
const det=A=>{const M=A.map(r=>r.slice());let d=1;for(let c=0;c<4;c++){let p=c;while(p<4&&Math.abs(M[p][c])<1e-9)p++;if(p===4)return 0;if(p!==c){[M[p],M[c]]=[M[c],M[p]];d=-d;}const q=M[c][c];d*=q;for(let i=c+1;i<4;i++){const f=M[i][c]/q;for(let j=c;j<4;j++)M[i][j]-=f*M[c][j];}}return d;};
const addScaled=(vs,cs)=>vs[0].map((_,i)=>cs.reduce((s,c,k)=>s+c*vs[k][i],0));

function rep(p){return Array.from({length:4},(_,r)=>Array.from({length:4},(_,c)=>(p[c]===r?1:0)-(p[4]===r?1:0)));}
const R=rep([1,2,0,3,4]);
const S=rep([1,0,2,4,3]);
const C=[[0,-1],[1,-1]],F=[[0,1],[1,0]],I2=[[1,0],[0,1]];
const A=kron(I2,C),T=kron(F,F);
const trace=M=>M.reduce((s,r,i)=>s+r[i],0);
const fixedDimension=M=>4-rank(M.map((r,i)=>r.map((x,j)=>x-(i===j?1:0))));
assert.equal(trace(A),-2);
assert.equal(trace(R),1);
assert.equal(fixedDimension(A),0);
assert.equal(fixedDimension(R),2);

const systems={color:[[A,R]],reflection:[[T,S]],both:[[A,R],[T,S]]};
const result={};
for(const [name,pairs] of Object.entries(systems)){
  const rows=constraints(pairs),ns=nullspace(rows),mats=ns.map(matrix);
  let maxRank=0,invertibleExample=null;
  const coeffs=[-2,-1,0,1,2];
  const visit=(prefix)=>{
    if(invertibleExample)return;
    if(prefix.length===ns.length){if(prefix.every(x=>x===0))return;const M=matrix(addScaled(ns,prefix));const d=Math.round(det(M));if(d!==0){invertibleExample={coefficients:prefix.slice(),matrix:M,determinant:d};}return;}
    for(const c of coeffs)visit([...prefix,c]);
  };
  if(ns.length<=6)visit([]);
  for(const M of mats)maxRank=Math.max(maxRank,rank(M));
  result[name]={constraintRank:rank(rows),intertwinerDimension:ns.length,basisMatrixRanks:mats.map(rank),maxBasisRank:maxRank,invertibleExample};
}

assert.ok(result.color.intertwinerDimension>0);
assert.ok(result.reflection.intertwinerDimension>0);

console.log(JSON.stringify({
  protocol:'product-versus-a4-signed-action-intertwiner-classification/1',
  productActions:{color:A,jointReflection:T},
  a4Actions:{color:R,pairedReflection:S},
  characterObstruction:{
    productColorTrace:trace(A),a4ColorTrace:trace(R),
    productColorFixedDimension:fixedDimension(A),a4ColorFixedDimension:fixedDimension(R),
    productCharacteristicPolynomial:'(lambda^2+lambda+1)^2',
    a4CharacteristicPolynomial:'(lambda-1)^2(lambda^2+lambda+1)'
  },
  intertwinerSystems:result,
  simultaneousIsomorphismExists:false,
  conclusion:'The product and A4 color characters already differ: the product has two nontrivial C3 doublets and no fixed plane, while A4 has one nontrivial doublet plus a fixed plane. Hence no invertible color intertwiner, and therefore no simultaneous signed intertwiner, exists over characteristic zero.',
  passed:true
},null,2));
