import assert from 'node:assert/strict';

const mm=(A,B)=>A.map(row=>B[0].map((_,j)=>row.reduce((sum,value,k)=>sum+value*B[k][j],0)));
const transpose=A=>A[0].map((_,j)=>A.map(row=>row[j]));
const scale=(x,A)=>A.map(row=>row.map(value=>x*value));
const close=(A,B,tolerance=1e-11)=>A.every((row,i)=>row.every((value,j)=>Math.abs(value-B[i][j])<tolerance));
const inverse=A=>{const n=A.length,M=A.map((row,i)=>[...row,...Array.from({length:n},(_,j)=>i===j?1:0)]);for(let c=0;c<n;c++){let p=c;while(p<n&&Math.abs(M[p][c])<1e-12)p++;assert.ok(p<n);[M[c],M[p]]=[M[p],M[c]];const q=M[c][c];for(let j=0;j<2*n;j++)M[c][j]/=q;for(let i=0;i<n;i++)if(i!==c){const f=M[i][c];for(let j=0;j<2*n;j++)M[i][j]-=f*M[c][j];}}return M.map(row=>row.slice(n));};
const I4=Array.from({length:4},(_,i)=>Array.from({length:4},(_,j)=>i===j?1:0));
const H=[[0,0,1,1],[0,0,0,-1],[1,1,0,0],[0,-1,0,0]];
const Jcode=[[0,1,0,0],[-1,0,0,0],[0,0,0,-1],[0,0,1,0]];
const W=[[0,0,1,0],[0,0,0,1],[-1,0,0,0],[0,-1,0,0]];
assert.ok(close(mm(H,H),I4));
assert.ok(close(mm(mm(transpose(H),Jcode),H),Jcode));

const P=[[1,1,-1,-1],[0,-1,0,1],[1,0,1,0],[0,1,0,1]];
const Hprime=[[1,0,0,0],[0,1,0,0],[0,0,-1,0],[0,0,0,-1]];
const Jdiag=[[0,1,0,0],[-1,0,0,0],[0,0,0,1],[0,0,-1,0]];
assert.ok(close(mm(H,P),mm(P,Hprime)));
assert.ok(close(mm(mm(transpose(P),Jcode),P),scale(-2,Jdiag)));

const Zprime=[[0,1,0,0],[-1,0,0,0],[0,0,0,-1],[0,0,1,0]];
const Lprime=mm(Zprime,Hprime);
assert.ok(close(Lprime,Jdiag));
assert.ok(close(mm(Zprime,Hprime),mm(Hprime,Zprime)));
assert.ok(close(mm(Lprime,Lprime),scale(-1,I4)));

const Pinverse=inverse(P);
const Z=mm(mm(P,Zprime),Pinverse);
const L=mm(Z,H);
assert.ok(close(mm(Z,H),mm(H,Z)));
assert.ok(close(mm(L,L),scale(-1,I4)));
assert.ok(close(mm(mm(transpose(L),Jcode),L),Jcode));

const Q=[[1,0,0,0],[0,0,1,0],[0,1,0,0],[0,0,0,1]];
const K0=[[1,0,0,0],[0,1,0,0],[0,0,-1,0],[0,0,0,-1]];
const S=mm(mm(P,Q),K0);
const Ssym=scale(1/Math.sqrt(2),S);
assert.ok(close(mm(mm(transpose(Ssym),Jcode),Ssym),W));
assert.ok(close(mm(L,Ssym),mm(Ssym,scale(-1,W))));

console.log(JSON.stringify({
  protocol:'coherent-selector-handle-to-tkk-inversion/1',
  noGo:'H^2=I while W^2=-I, so the primitive handle cannot be conjugate to TKK inversion.',
  eigenspaceLift:'Z gives opposite complex orientations on the H=+1 and H=-1 symplectic planes and commutes with H.',
  coherentHandle:'L=ZH, L^2=-I, and L is symplectic for J_code.',
  conjugator:'S_sym=(1/sqrt(2)) P Q K0',
  exactTransport:'S_sym^T J_code S_sym=Omega and L S_sym=S_sym(-W)',
  consequence:'The coherent handle lift, not the primitive involution, is the correctly typed physical candidate for TKK grade reversal.',
  passed:true
},null,2));
