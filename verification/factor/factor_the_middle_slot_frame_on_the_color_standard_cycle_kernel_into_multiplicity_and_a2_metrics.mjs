import assert from 'node:assert/strict';

const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const sub=(A,B)=>A.map((r,i)=>r.map((x,j)=>x-B[i][j]));
const scale=(s,A)=>A.map(r=>r.map(x=>s*x));
const diag=v=>v.map((x,i)=>v.map((_,j)=>i===j?x:0));
const eye=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i===j?1:0));
const kron=(A,B)=>A.flatMap(ar=>B.map(br=>ar.flatMap(a=>br.map(b=>a*b))));
const inverse=A=>{const n=A.length,M=A.map((r,i)=>[...r,...eye(n)[i]]);for(let c=0;c<n;c++){let p=c;while(p<n&&Math.abs(M[p][c])<1e-12)p++;assert(p<n);[M[c],M[p]]=[M[p],M[c]];const d=M[c][c];M[c]=M[c].map(x=>x/d);for(let i=0;i<n;i++)if(i!==c){const f=M[i][c];M[i]=M[i].map((x,j)=>x-f*M[c][j]);}}return M.map(r=>r.slice(n));};
const eq=(A,B,t=1e-10)=>A.every((r,i)=>r.every((x,j)=>Math.abs(x-B[i][j])<t));
const rank=A=>{const M=A.map(r=>r.slice());let row=0;for(let c=0;c<M[0].length&&row<M.length;c++){let p=row;while(p<M.length&&Math.abs(M[p][c])<1e-10)p++;if(p===M.length)continue;[M[row],M[p]]=[M[p],M[row]];const d=M[row][c];M[row]=M[row].map(x=>x/d);for(let i=0;i<M.length;i++)if(i!==row){const f=M[i][c];M[i]=M[i].map((x,j)=>x-f*M[row][j]);}row++;}return row;};

// Sector embedding x=(u,d,uc) -> (u,d,uc,dc), dc=u+d-uc.
const E=[[1,0,0],[0,1,0],[0,0,1],[1,1,-1]];
const v=[1,1,-1],vvT=v.map(x=>v.map(y=>x*y));
const Hmult=mm(tr(E),E);
assert.deepEqual(Hmult,add(eye(3),vvT));

// Integral color augmentation embedding and its unique invariant metric.
const Bcolor=[[1,0],[-1,1],[0,-1]];
const Gcolor=mm(tr(Bcolor),Bcolor);
assert.deepEqual(Gcolor,[[2,-1],[-1,2]]);

// Full four-sector, three-sheet embedding with sector-major ordering.
const Kembed=kron(E,Bcolor);
const physicalGram=mm(tr(Kembed),Kembed);
assert.deepEqual(physicalGram,kron(Hmult,Gcolor));

// The canonical middle-slot frame weights are 14 on u,d,uc and 4 on dc,
// identical across all three color sheets.
const sectorWeights=[14,14,14,4];
const Dfull=kron(diag(sectorWeights),eye(3));
const responseGram=mm(mm(tr(Kembed),Dfull),Kembed);
const Kmult=mm(mm(tr(E),diag(sectorWeights)),E);
assert.deepEqual(Kmult,add(scale(14,eye(3)),scale(4,vvT)));
assert.deepEqual(responseGram,kron(Kmult,Gcolor));

const generalized=mm(inverse(physicalGram),responseGram);
const Mmult=mm(inverse(Hmult),Kmult);
assert.ok(eq(generalized,kron(Mmult,eye(2))));

const S=diag([1,1,-1]);
const J=Array.from({length:3},()=>Array(3).fill(1));
const LK3=add(scale(3,eye(3)),scale(-1,J));
assert.ok(eq(mm(mm(S,Mmult),S),add(scale(6.5,eye(3)),scale(2.5,LK3))));

const shiftedMult=sub(Kmult,scale(6.5,Hmult));
assert.ok(eq(shiftedMult,mm(mm(S,scale(2.5,LK3)),S)));
const shiftedFull=sub(responseGram,scale(6.5,physicalGram));
assert.ok(eq(shiftedFull,kron(shiftedMult,Gcolor)));
assert.equal(rank(shiftedMult),2);
assert.equal(rank(Gcolor),2);
assert.equal(rank(shiftedFull),4);

console.log(JSON.stringify({
  protocol:'middle-slot-frame-multiplicity-color-factorization/1',
  sectorEmbedding:E,
  cycleVector:v,
  colorAugmentationEmbedding:Bcolor,
  multiplicityPhysicalGram:Hmult,
  colorMetric:Gcolor,
  fullPhysicalGramFactorization:'H_mult tensor G_A2',
  middleFrameSectorWeights:{u:14,d:14,uc:14,dc:4},
  multiplicityResponseGram:Kmult,
  fullResponseGramFactorization:'K_mult tensor G_A2',
  generalizedResponseFactorization:'M_mult tensor identity_I',
  signedGeneralizedResponse:'(13/2) I + (5/2) L_K3',
  shiftedMismatchFactorization:'[(5/2) S L_K3 S] tensor G_A2',
  shiftedRanks:{multiplicity:rank(shiftedMult),color:rank(Gcolor),full:rank(shiftedFull)},
  conclusion:'The canonical middle-slot quadratic frame factorizes exactly into the signed multiplicity response and the unique A2 color metric on the full color-standard cycle kernel.',
  claimBoundary:'Factorization of the positive quadratic Gram is proved. A specific microscopic amplitude/vertex can still differ by an auxiliary-space partial isometry or contain additional structures before the complete outer-leg trace.',
  passed:true
},null,2));
