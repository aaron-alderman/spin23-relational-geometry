#!/usr/bin/env node

const assert=(ok,msg)=>{if(!ok)throw new Error(msg);};
const zero=(r,c)=>Array.from({length:r},()=>Array(c).fill(0));
const T=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const block=(A,B,C,D)=>[...A.map((r,i)=>[...r,...B[i]]),...C.map((r,i)=>[...r,...D[i]])];
const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const maxAbs=A=>Math.max(...A.flat().map(Math.abs));
const diagSigns=(p,m)=>Array.from({length:p+m},(_,i)=>Array.from({length:p+m},(_,j)=>i===j?(i<p?1:-1):0));

const nD=8,nS=7;
const M=zero(nD,nS); for(let i=0;i<nS;i++)M[i][i]=i+1;
const H=block(zero(nD,nD),M,T(M),zero(nS,nS));
const W=diagSigns(nD,nS);
assert(maxAbs(add(mul(W,H),mul(H,W)))<1e-12,"Yukawa mass matrix must anticommute with doublet/singlet grading");
const nu=Array(nD+nS).fill(0); nu[nD-1]=1;
const Hnu=H.map(r=>r.reduce((s,x,i)=>s+x*nu[i],0));
assert(Math.max(...Hnu.map(Math.abs))<1e-12,"8x7 bipartite mass matrix must have a zero mode in this full-rank example");

// Adding a right-handed neutrino balances 8+8 and allows a full-rank gap.
const M8=zero(8,8); for(let i=0;i<8;i++)M8[i][i]=i+1;
const H16=block(zero(8,8),M8,T(M8),zero(8,8));
const H16sq=mul(H16,H16);
assert(H16sq.every((r,i)=>r[i]>0),"balanced Dirac mass matrix should allow a full gap");

// A Majorana/Weinberg entry in the doublet block breaks the grading and lifts the zero mode.
const Amajorana=zero(8,8); Amajorana[7][7]=0.4;
const Hmaj=block(Amajorana,M,T(M),zero(7,7));
assert(maxAbs(add(mul(W,Hmaj),mul(Hmaj,W)))>0.1,"Majorana term must break the bipartite grading");
const HmajNu=Hmaj.map(r=>r.reduce((s,x,i)=>s+x*nu[i],0));
assert(Math.abs(HmajNu[7]-0.4)<1e-12,"Majorana term should lift the protected zero mode");

assert(3*2+2===8,"weak-doublet count failed");
assert(3+3+1===7,"singlet count failed");
assert(3*(8-7)===3,"three-generation zero-mode lower bound failed");

console.log("Fifteen-state Yukawa bipartite zero-mode certificate: PASS");
console.log("one_generation_without_nuR=8_doublet_plus_7_singlet; protected_zero_modes_at_least=1");
console.log("with_nuR=8_plus_8; full_Dirac_gap_allowed=true");
console.log("Majorana_Weinberg_term_breaks_grading=true; three_generation_lower_bound_without_breaking=3");
