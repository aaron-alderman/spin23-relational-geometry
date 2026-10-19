import assert from 'node:assert/strict';

const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const scale=(s,A)=>A.map(r=>r.map(x=>s*x));
const eye=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i===j?1:0));
const kron=(A,B)=>A.flatMap(ar=>B.map(br=>ar.flatMap(a=>br.map(b=>a*b))));
const eq=(A,B,t=1e-10)=>A.every((r,i)=>r.every((x,j)=>Math.abs(x-B[i][j])<t));
const rank=A=>{const M=A.map(r=>r.slice());let row=0;for(let c=0;c<M[0].length&&row<M.length;c++){let p=row;while(p<M.length&&Math.abs(M[p][c])<1e-10)p++;if(p===M.length)continue;[M[row],M[p]]=[M[p],M[row]];const d=M[row][c];M[row]=M[row].map(x=>x/d);for(let i=0;i<M.length;i++)if(i!==row){const f=M[i][c];M[i]=M[i].map((x,j)=>x-f*M[row][j]);}row++;}return row;};

const S=[[1,0,0],[0,1,0],[0,0,-1]];
const one=[1,1,1];
const J=one.map(()=>one.slice());
const Pstd=add(eye(3),scale(-1/3,J));
const q1=[1/Math.sqrt(2),-1/Math.sqrt(2),0];
const q2=[1/Math.sqrt(6),1/Math.sqrt(6),-2/Math.sqrt(6)];
const Q=[q1,q2];
assert.ok(eq(mm(tr(Q),Q),Pstd));

// Minimal multiplicity amplitude for R_mult=(5/2) S L_K3 S
// = (15/2) S P_std S.
const Lmult=scale(Math.sqrt(15/2),mm(Q,S));
const Rmult=mm(tr(Lmult),Lmult);
assert.ok(eq(Rmult,scale(5/2,mm(mm(S,scale(3,Pstd)),S))));
assert.equal(rank(Lmult),2);

// Upper Cholesky-like color amplitude with Lcolor^T Lcolor=G_A2.
const Lcolor=[[Math.sqrt(2),-1/Math.sqrt(2)],[0,Math.sqrt(3/2)]];
const Gcolor=[[2,-1],[-1,2]];
assert.ok(eq(mm(tr(Lcolor),Lcolor),Gcolor));

const L0=kron(Lmult,Lcolor);
const fullGram=kron(Rmult,Gcolor);
assert.ok(eq(mm(tr(L0),L0),fullGram));
assert.equal(rank(L0),4);

// A genuinely nonlocal orthogonal rotation of the four-dimensional bath
// produces an apparently entangled amplitude with the identical Gram.
const theta=.37,c=Math.cos(theta),s=Math.sin(theta);
const O=[[c,0,0,s],[0,1,0,0],[0,0,1,0],[-s,0,0,c]];
assert.ok(eq(mm(tr(O),O),eye(4)));
const L1=mm(O,L0);
assert.ok(eq(mm(tr(L1),L1),fullGram));

// Recovering L0 from L1 uses only environment gauge.
assert.ok(eq(mm(tr(O),L1),L0));

console.log(JSON.stringify({
  protocol:'minimal-amplitudes-of-factorized-middle-frame-gram/1',
  multiplicityAmplitudeShape:[Lmult.length,Lmult[0].length],
  colorAmplitudeShape:[Lcolor.length,Lcolor[0].length],
  factorizedMinimalAmplitudeShape:[L0.length,L0[0].length],
  fullGramRank:rank(fullGram),
  factorizedAmplitudeExists:true,
  entanglingEnvironmentRotation:O,
  rotatedAmplitudeHasSameGram:true,
  classificationTheorem:'If L and L0 are minimal full-row-rank factors with L^T L=L0^T L0, then L=O L0 for a unique O in O(rank K). Nonminimal factors differ by an isometric embedding.',
  observableConsequence:'A complete trace over the auxiliary bath depends only on the Gram and cannot distinguish O.',
  unresolvedLabelConsequence:'Identifying a named two-dimensional bath factor with handle Kraus labels requires extra color and cyclic typing; the Gram alone does not choose a tensor factorization inside R4.',
  conclusion:'Amplitude-level factorization has no existence obstruction: every minimal realization is environment-gauge equivalent to a factorized one. The remaining problem is physical selection of the environment tensor factors and their handle alignment.',
  passed:true
},null,2));
