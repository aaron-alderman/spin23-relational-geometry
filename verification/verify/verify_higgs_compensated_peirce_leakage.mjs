import assert from 'node:assert/strict';

const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const sub=(A,B)=>A.map((r,i)=>r.map((x,j)=>x-B[i][j]));
const T=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const kron=(A,B)=>A.flatMap(r=>B.map(s=>r.flatMap(x=>s.map(y=>x*y))));
const norm=A=>Math.sqrt(A.flat().reduce((s,x)=>s+x*x,0));
const eye=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i===j?1:0));
const Qf=[[0,0,0],[0,1,0],[0,0,0]],Qs=[[0,0],[0,1]],Qtot=add(kron(Qf,eye(2)),kron(eye(3),Qs)),p=[[1,0,0],[0,0,0],[0,0,1]],P=kron(p,eye(2));
const EC=[[0,1,0],[0,0,0],[0,0,0]],raise=[[0,0],[1,0]],charged=kron(EC,raise),Hc=add(charged,T(charged));
assert(norm(sub(mm(Qtot,Hc),mm(Hc,Qtot)))<1e-12&&norm(sub(mm(P,Hc),mm(Hc,P)))>1e-3);
const ED=[[0,0,1],[0,0,0],[0,0,0]],Hn=kron(add(ED,T(ED)),eye(2));assert(norm(sub(mm(Qtot,Hn),mm(Hn,Qtot)))<1e-12&&norm(sub(mm(P,Hn),mm(Hn,P)))<1e-12);
const pids=[0,1,4,5],qids=[2,3],g=.42,Delta=2.3,z=.2,H=add(Array.from({length:6},(_,i)=>Array.from({length:6},(_,j)=>qids.includes(i)&&i===j?Delta:0)),Hc.map(r=>r.map(x=>g*x))),block=(A,rs,cs)=>rs.map(i=>cs.map(j=>A[i][j]));
const Hpq=block(H,pids,qids),Hqp=block(H,qids,pids),Rq=[[1/(Delta-z),0],[0,1/(Delta-z)]],Sigma=mm(mm(Hpq,Rq),Hqp);
const rank=M=>{const A=M.map(r=>[...r]);let q=0;for(let c=0;c<A[0].length&&q<A.length;c++){let p=q;while(p<A.length&&Math.abs(A[p][c])<1e-12)p++;if(p===A.length)continue;[A[q],A[p]]=[A[p],A[q]];const t=A[q][c];A[q]=A[q].map(x=>x/t);for(let i=0;i<A.length;i++)if(i!==q){const f=A[i][c];A[i]=A[i].map((x,j)=>x-f*A[q][j])}q++}return q};
assert.equal(rank(Sigma),1);assert(Math.abs(Sigma.flat().reduce((s,x)=>s+x,0)-g*g/(Delta-z))<1e-12);

console.log('Higgs-compensated Peirce-leakage certificate: PASS');
console.log('charged_total_gauge_invariant=true; charged_crosses_Peirce=true; neutral_preserves_Peirce=true; compressed_self_energy_rank1=true; exact_closure_requires_decoupling_or_enlargement');
