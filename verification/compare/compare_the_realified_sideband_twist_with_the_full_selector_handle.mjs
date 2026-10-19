import assert from 'node:assert/strict';

const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const tr=A=>A.reduce((s,r,i)=>s+r[i],0);
const transpose=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const sub=(A,B)=>A.map((r,i)=>r.map((x,j)=>x-B[i][j]));
const maxabs=A=>Math.max(...A.flat().map(Math.abs));
const det4=A=>{
  let M=A.map(r=>r.map(Number)), d=1;
  for(let i=0;i<4;i++){
    let p=i; for(let j=i+1;j<4;j++) if(Math.abs(M[j][i])>Math.abs(M[p][i]))p=j;
    if(p!==i){[M[p],M[i]]=[M[i],M[p]];d=-d}
    const q=M[i][i]; if(Math.abs(q)<1e-12)return 0; d*=q;
    for(let j=i+1;j<4;j++){const f=M[j][i]/q;for(let k=i;k<4;k++)M[j][k]-=f*M[i][k]}
  } return Math.round(d);
};
const gcd=(a,b)=>{a=Math.abs(a);b=Math.abs(b);while(b)[a,b]=[b,a%b];return a};
const smithRankTwo=A=>{
  let d1=0,d12=0;
  for(const row of A)for(const x of row)d1=gcd(d1,x);
  for(let r1=0;r1<4;r1++)for(let r2=r1+1;r2<4;r2++)for(let c1=0;c1<4;c1++)for(let c2=c1+1;c2<4;c2++)
    d12=gcd(d12,A[r1][c1]*A[r2][c2]-A[r1][c2]*A[r2][c1]);
  return [d1,d12/d1];
};

const D=[[1,0],[0,-1]], minusD=[[-1,0],[0,1]];
const T=[[1,0,0,0],[0,-1,0,0],[0,0,-1,0],[0,0,0,1]]; // diag(D,-D)=realification(DK)
const X=[[1,1],[0,-1]];
const H=[[0,0,1,1],[0,0,0,-1],[1,1,0,0],[0,-1,0,0]];
const P=[[1,1,0,0],[0,0,1,1],[1,-1,-1,1],[0,0,1,-1]];
const eps=[[0,1],[-1,0]];
const Jcode=[[0,1,0,0],[-1,0,0,0],[0,0,0,-1],[0,0,1,0]];
const Jfourier=[[0,0,1,0],[0,0,0,1],[-1,0,0,0],[0,-1,0,0]];
const JT=mm(mm(transpose(P),Jcode),P);
const I4=[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
const smithTminusI=smithRankTwo(sub(T,I4));
const smithHminusI=smithRankTwo(sub(H,I4));

assert.equal(maxabs(sub(mm(H,P),mm(P,T))),0);
assert.equal(maxabs(sub(mm(mm(transpose(T),Jfourier),T),Jfourier.map(r=>r.map(x=>-x)))),0);
assert.equal(maxabs(sub(mm(mm(transpose(H),Jcode),H),Jcode)),0);
assert.equal(maxabs(sub(mm(mm(transpose(T),JT),T),JT)),0);
assert.equal(det4(P),-4);
assert.equal(det4(JT),16);
assert.equal(tr(T),0); assert.equal(tr(H),0);
assert.deepEqual(smithTminusI,[2,2]);
assert.deepEqual(smithHminusI,[1,1]);

console.log(JSON.stringify({
  protocol:'realified-sideband-twist-versus-selector-handle/1',
  realifiedTwist:T,
  selectorHandle:H,
  conjugatorP:P,
  identities:{HP_equals_PT:true,detP:det4(P),indexOfImageLattice:Math.abs(det4(P)),traceT:tr(T),traceH:tr(H),T2:'I',H2:'I'},
  naturalFourierForm:Jfourier,
  naturalTyping:'T^T J_fourier T = -J_fourier (anti-symplectic)',
  selectorForm:Jcode,
  selectorTyping:'H^T J_code H = J_code (symplectic)',
  pulledBackHandleForm:JT,
  pulledBackTyping:'T^T (P^T J_code P) T = P^T J_code P (symplectic)',
  arithmetic:{detP:det4(P),indexOfImageLattice:Math.abs(det4(P)),unimodular:false,detPulledBackForm:det4(JT),smithTminusI,smithHminusI,unimodularConjugacy:'impossible because Smith invariants differ'},
  conclusion:'The two involutions are GL(4,Q)-conjugate but not GL(4,Z)-conjugate and not canonically identified in the natural Fourier symplectic typing.',
  passed:true
},null,2));
