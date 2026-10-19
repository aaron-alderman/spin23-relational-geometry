import assert from 'node:assert/strict';

const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const eq=(A,B,t=1e-9)=>A.every((r,i)=>r.every((x,j)=>Math.abs(x-B[i][j])<t));
function inv(A){const n=A.length,M=A.map((r,i)=>[...r,...Array.from({length:n},(_,j)=>i===j?1:0)]);for(let c=0;c<n;c++){let p=c;while(p<n&&Math.abs(M[p][c])<1e-12)p++;assert.ok(p<n);[M[c],M[p]]=[M[p],M[c]];const d=M[c][c];for(let j=0;j<2*n;j++)M[c][j]/=d;for(let i=0;i<n;i++)if(i!==c){const f=M[i][c];for(let j=0;j<2*n;j++)M[i][j]-=f*M[c][j];}}return M.map(r=>r.slice(n));}
function rank(A,t=1e-9){const M=A.map(r=>[...r]);let rr=0;for(let c=0;c<M[0].length&&rr<M.length;c++){let p=rr;while(p<M.length&&Math.abs(M[p][c])<t)p++;if(p===M.length)continue;[M[rr],M[p]]=[M[p],M[rr]];const d=M[rr][c];for(let j=c;j<M[0].length;j++)M[rr][j]/=d;for(let i=0;i<M.length;i++)if(i!==rr){const f=M[i][c];for(let j=c;j<M[0].length;j++)M[i][j]-=f*M[rr][j];}rr++;}return rr;}
function rep(p){return Array.from({length:4},(_,r)=>Array.from({length:4},(_,c)=>(p[c]===r?1:0)-(p[4]===r?1:0)));}
const pairs=[[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]];
const basis=pairs.map(([i,j])=>Array.from({length:4},(_,r)=>Array.from({length:4},(_,c)=>r===i&&c===j?1:r===j&&c===i?-1:0)));
const coords=J=>pairs.map(([i,j])=>J[i][j]);
const pull=(R,J)=>mul(mul(tr(R),J),R);
const transform6=(R,sign)=>basis.map(B=>coords(pull(R,B)).map(x=>x*sign));
const constraint=(R,targetSign)=>{
  const cols=transform6(R,1);
  return Array.from({length:6},(_,i)=>Array.from({length:6},(_,j)=>cols[j][i]-(i===j?targetSign:0)));
};

const c3=rep([1,2,0,3,4]);
const pairedReflection=rep([1,0,2,4,3]);
const C=[[1/3,-1/3,0,-1/3],[1/3,2/3,0,-1/3],[1/3,-1/3,0,2/3],[0,0,1,0]];
const Hcanonical=[[0,1,0,0],[1,0,0,0],[0,0,0,1],[0,0,1,0]];
const H=mul(mul(C,Hcanonical),inv(C));
const rows=[...constraint(c3,1),...constraint(pairedReflection,-1),...constraint(H,1)];
const r=rank(rows);
assert.equal(r,5);

const Jcolor=[[0,1,-1,0],[-1,0,1,0],[1,-1,0,0],[0,0,0,0]];
const Jfixed=[[0,0,0,1],[0,0,0,1],[0,0,0,1],[-1,-1,-1,0]];
const Jequal=Jcolor.map((row,i)=>row.map((x,j)=>x+Jfixed[i][j]));
assert.ok(eq(pull(c3,Jequal),Jequal));
assert.ok(eq(pull(pairedReflection,Jequal),Jequal.map(row=>row.map(x=>-x))));
assert.ok(eq(pull(H,Jequal),Jequal));
const pf=Jequal[0][1]*Jequal[2][3]-Jequal[0][2]*Jequal[1][3]+Jequal[0][3]*Jequal[1][2];
assert.equal(pf,3);

console.log(JSON.stringify({
  protocol:'full-two-form-oriented-color-reflection-handle-exchange/1',
  ambientAlternatingDimension:6,
  conditions:['C3 color cycle is symplectic','paired color/weak reflection is anti-symplectic','handle exchange is symplectic'],
  constraintRank:r,
  invariantSignedIntersectionDimension:6-r,
  selectedGenerator:'J_color + J_fixed',
  selectedCoordinates:coords(Jequal),
  pfaffian:pf,
  nondegenerate:pf!==0,
  conclusion:'The combined signed symmetry package collapses the full six-dimensional alternating-form space to the single nondegenerate equal-area line. No mixed-block loophole survives.',
  physicalBoundary:'This is an abstract carrier theorem. A matter-to-carrier intertwiner must still realize all three generators with the stated signs.',
  passed:true,
},null,2));
