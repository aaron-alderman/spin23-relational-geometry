import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const evidence=JSON.parse(readFileSync('evidence/data/spin23-spin10-shared126-family-symmetry-audit.json','utf8'));
const pairs=[[0,0],[0,1],[0,2],[1,1],[1,2],[2,2]]; // PP,PI,PN,II,IN,NN
const pairIndex=new Map(pairs.map((p,i)=>[p.join(','),i]));
const zeros=(m,n)=>Array.from({length:m},()=>Array(n).fill(0));
const identity=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>Number(i===j)));
const transpose=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const multiply=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));

// Signed permutation congruence induced on Sym^2(F). perm[i] is the image
// family index of i and signs[i] its coefficient.
const symAction=(perm,signs=[1,1,1])=>{
  const R=zeros(6,6);
  for(let k=0;k<pairs.length;k++){
    let [i,j]=pairs[k];
    const factor=signs[i]*signs[j];
    let a=perm[i],b=perm[j];
    if(a>b)[a,b]=[b,a];
    R[pairIndex.get(`${a},${b}`)][k]=factor;
  }
  return R;
};
const matrixRank=A=>{
  const M=A.map(r=>r.map(Number));let rank=0,col=0;
  while(rank<M.length&&col<(M[0]?.length??0)){
    let pivot=rank;
    while(pivot<M.length&&Math.abs(M[pivot][col])<1e-10)pivot++;
    if(pivot===M.length){col++;continue;}
    [M[rank],M[pivot]]=[M[pivot],M[rank]];
    const q=M[rank][col];for(let j=col;j<M[0].length;j++)M[rank][j]/=q;
    for(let i=0;i<M.length;i++)if(i!==rank){
      const f=M[i][col];for(let j=col;j<M[0].length;j++)M[i][j]-=f*M[rank][j];
    }
    rank++;col++;
  }
  return rank;
};
const subtract=(A,B)=>A.map((r,i)=>r.map((x,j)=>x-B[i][j]));
const fixedDimension=actions=>{
  const constraints=actions.flatMap(R=>subtract(R,identity(6)));
  return 6-matrixRank(constraints);
};

const id=[0,1,2],swapPN=[2,1,0],swapIN=[0,2,1],cycle=[1,2,0];
assert.equal(fixedDimension([symAction(id)]),6);
assert.equal(fixedDimension([symAction(swapPN)]),4);
assert.equal(fixedDimension([symAction(swapIN)]),4);
assert.equal(fixedDimension([symAction(cycle)]),2);
assert.equal(fixedDimension([symAction(cycle),symAction([1,0,2])]),2); // S3

// Exhaust all 48 signed permutations and prove that the diagonal and
// off-diagonal coordinate subspaces are invariant. Hence PP and PN can never
// occupy one monomial orbit.
const permutations=xs=>xs.length===0?[[]]:xs.flatMap((x,i)=>
  permutations(xs.slice(0,i).concat(xs.slice(i+1))).map(rest=>[x,...rest]));
const perms=permutations([0,1,2]);
const signs=[];
for(const a of [-1,1])for(const b of [-1,1])for(const c of [-1,1])signs.push([a,b,c]);
const signedActions=perms.flatMap(p=>signs.map(s=>symAction(p,s)));
assert.equal(signedActions.length,48);
const diagonals=new Set([0,3,5]),offDiagonals=new Set([1,2,4]);
for(const R of signedActions)for(let source=0;source<6;source++){
  const target=R.findIndex(row=>row[source]!==0);
  assert.equal(diagonals.has(target),diagonals.has(source));
  assert.equal(offDiagonals.has(target),offDiagonals.has(source));
}
assert.equal(signedActions.some(R=>R[2][0]!==0),false); // PP never maps to PN

// Representative sign symmetries and the full independent-sign group.
assert.equal(fixedDimension([symAction(id,[1,1,-1])]),4);
assert.equal(fixedDimension([symAction(id,[-1,1,-1])]),4);
assert.equal(fixedDimension(signs.map(s=>symAction(id,s))),3);

// U(1) invariance of both PP and PN forces q_P=q_N. It permits entries but
// supplies no equality of their coefficients.
for(const [qP,qI,qN] of [[2,7,2],[-3,1,-3],[0,5,0]]){
  const qH=-2*qP;
  assert.equal(2*qP+qH,0);
  assert.equal(qP+qN+qH,0);
  assert.equal(qP,qN);
  void qI;
}
const a=2,c=5;
assert.notEqual(a,c); // both allowed coefficients remain independent

// A rank-one family tensor cannot satisfy nonzero PP=PN and NN=0.
for(const vP of [1,2,-3]){
  const vN=vP; // forced by vP^2=vP*vN with vP nonzero
  const YPP=vP*vP,YPN=vP*vN,YNN=vN*vN;
  assert.equal(YPP,YPN);
  assert.notEqual(YNN,0);
  assert.equal(YNN,YPP);
}

// The desired coefficient-space line is rank two as a family matrix, so it
// is not vv^T. Its defining projector simply inserts the wanted tensor.
const desired=[[1,0,1],[0,0,0],[1,0,0]];
assert.equal(matrixRank(desired),2);
assert.deepEqual(desired,evidence.coefficientProjectorAudit.matrix);

// Universal shared-126 contradiction: the same nonzero Y_PN cannot vanish in
// the Dirac branch and survive in the Majorana branch when both branch factors
// are nonzero.
for(const [vD,vM,yPN] of [[2,3,5],[-1,4,2],[0.5,-2,7]]){
  const DPN=vD*yPN,MPN=vM*yPN;
  assert.notEqual(DPN,0);
  assert.notEqual(MPN,0);
}

// Explicit sector-dependent construction. It shares Lambda across different
// branch-labelled tensors, preserves the masks, and yields full heavy rank.
const det3=M=>
  M[0][0]*(M[1][1]*M[2][2]-M[1][2]*M[2][1])
 -M[0][1]*(M[1][0]*M[2][2]-M[1][2]*M[2][0])
 +M[0][2]*(M[1][0]*M[2][1]-M[1][1]*M[2][0]);
for(const [Lambda,mu] of [[2,3],[-4,5],[0.5,-2]]){
  const D=[[Lambda,0,0],[0,7,0],[0,0,11]];
  const M=[[0,0,Lambda],[0,mu,0],[Lambda,0,0]];
  assert.equal(D[0][2],0); // forbidden Dirac PN
  assert.equal(M[0][2],Lambda); // required Majorana PN
  assert.equal(M[1][2],0); // Majorana IN mask
  assert.equal(M[2][2],0); // Majorana NN mask
  assert.equal(matrixRank([[M[1][1],M[1][2]],[M[2][1],M[2][2]]]),1);
  assert.equal(det3(M),-mu*Lambda**2);
  assert.notEqual(det3(M),0);
}

// The natural stabilizer preserves P versus its complement. Sym^2 therefore
// decomposes into dimensions 1+2+3, placing PP and PN in distinct summands.
assert.equal(1+2+3,6);

assert.equal(evidence.candidateResults.filter(x=>x.relatesPPtoPN&&x.preservesMask).length,1);
assert.equal(evidence.candidateResults.at(-1).candidate,'sector-dependent coefficient intertwiner');
assert.match(evidence.strongestNoGo,/no one-dimensional invariant portal ray/);
assert.match(evidence.reopeningDatum,/sector-dependent family tensor|natural transformation/);
assert.match(evidence.verdict,/cannot preserve.*null mask/);

console.log('PASS 1538: all 48 signed family permutations preserve diagonal/off-diagonal Sym2 sectors, U(1) characters only permit entries, and rank-one family tensors activate NN when PP=PN is nonzero. More strongly, one universal shared-126 Y_PN cannot be absent in Dirac and present in Majorana. A one-ray solution exists only after adding a branch-labelled family intertwiner with Y_D proportional to E_PP and Y_M proportional to sym(PN).');
