import assert from 'node:assert/strict';

const mu=1.3,lambda=.8,K=[1,1,1,-1],n=8,H=Array.from({length:n},()=>Array(n).fill(0));
for(let i=0;i<4;i++){H[i][i]=mu+lambda;H[i+4][i+4]=mu+lambda;H[i][i+4]=H[i+4][i]=-mu-lambda*K[i]}
const mv=(A,v)=>A.map(r=>r.reduce((s,x,j)=>s+x*v[j],0)),dot=(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0),norm=v=>Math.sqrt(dot(v,v));
const eigenChecks=[];
for(let i=0;i<3;i++){const diag=Array(n).fill(0),anti=Array(n).fill(0);diag[i]=diag[i+4]=1;anti[i]=1;anti[i+4]=-1;eigenChecks.push([diag,0],[anti,2*(mu+lambda)])}
const imagDiag=Array(n).fill(0),imagAnti=Array(n).fill(0);imagDiag[3]=imagDiag[7]=1;imagAnti[3]=1;imagAnti[7]=-1;eigenChecks.push([imagDiag,2*lambda],[imagAnti,2*mu]);
for(const [v,e] of eigenChecks){const w=mv(H,v);assert(norm(w.map((x,i)=>x-e*v[i]))<1e-12)}
const rank=M=>{const A=M.map(r=>[...r]);let q=0;for(let c=0;c<A[0].length&&q<A.length;c++){let p=q;while(p<A.length&&Math.abs(A[p][c])<1e-12)p++;if(p===A.length)continue;[A[q],A[p]]=[A[p],A[q]];const z=A[q][c];A[q]=A[q].map(x=>x/z);for(let i=0;i<A.length;i++)if(i!==q){const f=A[i][c];A[i]=A[i].map((x,j)=>x-f*A[q][j])}q++}return q};
assert.equal(n-rank(H),3);
const Theta=Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i<4?(j===i+4?K[i]:0):(j===i-4?K[i-4]:0))),mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
assert(mm(H,Theta).every((r,i)=>r.every((x,j)=>Math.abs(x-mm(Theta,H)[i][j])<1e-12)));
for(let q=0;q<20;q++){const v=Array.from({length:n},(_,i)=>Math.sin((q+1)*(i+2)));assert(dot(v,mv(H,v))>-1e-10)}

console.log('Exchange/diagonal Peirce-locking certificate: PASS');
console.log('nullity=3_H2R; real_antidiagonal_mass2=2(mu+lambda); imaginary_diagonal_mass2=2lambda; imaginary_antidiagonal_mass2=2mu; positive=true; exchange_symmetric=true');
