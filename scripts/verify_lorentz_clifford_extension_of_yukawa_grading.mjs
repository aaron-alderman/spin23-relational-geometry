#!/usr/bin/env node

const assert=(ok,msg)=>{if(!ok)throw new Error(msg);};
const zero=(r,c)=>Array.from({length:r},()=>Array(c).fill(0));
const I=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i===j?1:0));
const T=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const block=(A,B,C,D)=>[...A.map((r,i)=>[...r,...B[i]]),...C.map((r,i)=>[...r,...D[i]])];
const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const scale=(s,A)=>A.map(r=>r.map(x=>s*x));
const maxAbs=A=>Math.max(...A.flat().map(Math.abs));
const kron=(A,B)=>A.flatMap(rowA=>B.map(rowB=>rowA.flatMap(a=>rowB.map(b=>a*b))));
const diagSigns=(p,m)=>Array.from({length:p+m},(_,i)=>Array.from({length:p+m},(_,j)=>i===j?(i<p?1:-1):0));

const alpha=[[0,1],[1,0]], beta=[[1,0],[0,-1]], I2=I(2);
assert(maxAbs(add(mul(alpha,beta),mul(beta,alpha)))<1e-12,"Clifford anticommutation failed");
assert(maxAbs(add(mul(alpha,alpha),scale(-1,I2)))<1e-12&&maxAbs(add(mul(beta,beta),scale(-1,I2)))<1e-12,"Clifford squares failed");

const nD=8,nS=7,Mrect=zero(nD,nS); for(let i=0;i<nS;i++)Mrect[i][i]=i+1;
const M=block(zero(nD,nD),Mrect,T(Mrect),zero(nS,nS));
const W=diagSigns(nD,nS),I15=I(15);
assert(maxAbs(add(mul(W,M),mul(M,W)))<1e-12,"internal Yukawa grading failed");

const p=0.63;
const H=add(scale(p,kron(alpha,I15)),kron(beta,M));
const S=kron(beta,W);
assert(maxAbs(add(mul(S,H),mul(H,S)))<1e-11,"full Clifford-extended chiral symmetry failed");

// The unmatched internal state has massless E^2=p^2 dispersion.
const nu=Array(15).fill(0); nu[7]=1;
const spin=[1,0],state=spin.flatMap(a=>nu.map(b=>a*b));
const H2=mul(H,H),H2state=H2.map(r=>r.reduce((s,x,i)=>s+x*state[i],0));
const expected=state.map(x=>p*p*x);
assert(Math.max(...H2state.map((x,i)=>Math.abs(x-expected[i])))<1e-10,"protected zero mode must extend to massless dispersion");

// Majorana mass in the unmatched doublet block breaks the full symmetry and opens p^2+m^2.
const Amaj=zero(8,8); Amaj[7][7]=0.4;
const Mmaj=block(Amaj,Mrect,T(Mrect),zero(7,7));
const Hmaj=add(scale(p,kron(alpha,I15)),kron(beta,Mmaj));
assert(maxAbs(add(mul(S,Hmaj),mul(Hmaj,S)))>0.1,"Majorana mass must break extended grading");
const Hmaj2state=mul(Hmaj,Hmaj).map(r=>r.reduce((s,x,i)=>s+x*state[i],0));
assert(Math.abs(Hmaj2state[7]-(p*p+0.16))<1e-10,"Majorana dispersion gap failed");

console.log("Lorentz-Clifford extension of Yukawa grading certificate: PASS");
console.log("H(p)=alpha*p+beta*M; S=beta*W; anticommutator_zero=true");
console.log(`unmatched_neutrino_dispersion_E2=${p*p}; massless_cone=true`);
console.log(`Majorana_breaking=true; gapped_E2=${p*p+0.16}`);
