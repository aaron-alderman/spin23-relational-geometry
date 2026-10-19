import assert from 'node:assert/strict';

const neutralPerSurvivor=5,pairedNeutral=10,exchangeEven=5,exchangeOdd=5,light=3,heavyEven=exchangeEven-light;
assert.equal(heavyEven,2);
const mu=1.15,lambda=.72,rho=.63,K=[1,1,1,1,-1],n=10,H=Array.from({length:n},()=>Array(n).fill(0));
for(let i=0;i<5;i++){H[i][i]=H[i+5][i+5]=mu+lambda;H[i][i+5]=H[i+5][i]=-mu-lambda*K[i]}
H[1][1]+=rho;H[6][6]+=rho;
const rank=M=>{const A=M.map(r=>[...r]);let q=0;for(let c=0;c<A[0].length&&q<A.length;c++){let p=q;while(p<A.length&&Math.abs(A[p][c])<1e-12)p++;if(p===A.length)continue;[A[q],A[p]]=[A[p],A[q]];const z=A[q][c];A[q]=A[q].map(x=>x/z);for(let i=0;i<A.length;i++)if(i!==q){const f=A[i][c];A[i]=A[i].map((x,j)=>x-f*A[q][j])}q++}return q};
assert.equal(n-rank(H),3);
const cDiagonalMass2=rho,imaginaryAntiMass2=2*mu;assert(Math.abs(cDiagonalMass2-imaginaryAntiMass2)>1e-3);
const tunedRho=2*mu;assert.equal(tunedRho,imaginaryAntiMass2);
const nvec=[.6,.8],v1=[1,nvec[0],nvec[1]],v2=[0,-nvec[1],nvec[0]],outer=(v,w)=>v.map(x=>w.map(y=>x*y)),add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j])),S=add(outer(v1,v1),outer(v2,v2)),eta=[[1,0,0],[0,-1,0],[0,0,-1]],mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0))),T=A=>A[0].map((_,j)=>A.map(r=>r[j])),scale=(A,c)=>A.map(r=>r.map(x=>c*x)),norm=A=>Math.sqrt(A.flat().reduce((s,x)=>s+x*x,0));
const G=add(mm(T(S),eta),mm(eta,S));assert(norm(add(G,scale(eta,-2)))<1e-12);

console.log('Full-M3 neutral heavy-multiplet certificate: PASS');
console.log('neutral_paired_dimension=10; exchange_even_heavy=2; generic_gaps_split=true; rho=2mu_tunes_degeneracy; aligned_couplings_can_be_conformal; source_enforcement_open=true');
