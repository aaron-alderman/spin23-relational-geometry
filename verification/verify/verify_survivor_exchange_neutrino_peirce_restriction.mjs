import assert from 'node:assert/strict';

const rank=M=>{const A=M.map(r=>[...r]);let q=0;for(let c=0;c<A[0].length&&q<A.length;c++){let p=q;while(p<A.length&&Math.abs(A[p][c])<1e-12)p++;if(p===A.length)continue;[A[q],A[p]]=[A[p],A[q]];const z=A[q][c];A[q]=A[q].map(x=>x/z);for(let i=0;i<A.length;i++)if(i!==q){const f=A[i][c];A[i]=A[i].map((x,j)=>x-f*A[q][j])}q++}return q};
const K4=[1,1,1,-1],Theta=Array.from({length:8},(_,i)=>Array.from({length:8},(_,j)=>i<4?(j===i+4?K4[i]:0):(j===i-4?K4[i-4]:0)));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0))),I8=Array.from({length:8},(_,i)=>Array.from({length:8},(_,j)=>i===j?1:0));
assert(mm(Theta,Theta).every((r,i)=>r.every((x,j)=>x===I8[i][j])));
const fixedEq=Theta.map((r,i)=>r.map((x,j)=>x-(i===j?1:0)));assert.equal(8-rank(fixedEq),4);
const diagonalEq=Array.from({length:4},(_,i)=>Array.from({length:8},(_,j)=>j===i?1:j===i+4?-1:0)),intersection=[...fixedEq,...diagonalEq];
assert.equal(8-rank(intersection),3);
const J=[[0,-1],[1,0]],K=[[1,0],[0,-1]],anti=mm(K,J).map((r,i)=>r.map((x,j)=>x+mm(J,K)[i][j]));
assert(anti.flat().every(x=>x===0));
const z=[.4,-.7],thetaFixed=[z[0],z[1],z[0],.7];assert(thetaFixed[2]===z[0]&&thetaFixed[3]===-z[1]);

console.log('Survivor-exchange neutrino-Peirce restriction certificate: PASS');
console.log('Theta_square=1; exchange_fixed_full_corner_dimension=4; diagonal_intersection_dimension=3; offdiagonal_conjugation_anticommutes_with_J=true');
