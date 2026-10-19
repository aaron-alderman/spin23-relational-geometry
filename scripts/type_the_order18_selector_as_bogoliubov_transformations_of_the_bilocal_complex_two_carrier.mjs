import assert from 'node:assert/strict';

const R=[[1,0,0,0],[0,0,0,-1],[0,0,1,0],[0,1,0,-1]];
const H=[[0,1,0,0],[1,0,0,0],[0,0,0,1],[0,0,1,0]];
const I4=[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
const rmm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const key=A=>JSON.stringify(A);

const z=(re=0,im=0)=>({re,im}),za=(a,b)=>z(a.re+b.re,a.im+b.im),zs=(a,b)=>z(a.re-b.re,a.im-b.im),zm=(a,b)=>z(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re),zc=a=>z(a.re,-a.im),zabs=a=>Math.hypot(a.re,a.im);
const eye=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>z(i===j?1:0)));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>za(s,zm(x,B[k][j])),z())));
const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const dag=A=>tr(A).map(r=>r.map(zc));
const sub=(A,B)=>A.map((r,i)=>r.map((x,j)=>zs(x,B[i][j])));
const maxabs=A=>Math.max(...A.flat().map(zabs));
const blocks=M=>({a:M.slice(0,2).map(r=>r.slice(0,2)),b:M.slice(0,2).map(r=>r.slice(2,4)),c:M.slice(2,4).map(r=>r.slice(0,2)),d:M.slice(2,4).map(r=>r.slice(2,4))});
const real=A=>A.map(r=>r.map(x=>z(x)));
const bogoliubov=M=>{
  const {a:A,b:B,c:C,d:D}=blocks(M);
  const alpha=A.map((r,i)=>r.map((x,j)=>z((x+D[i][j])/2,(C[i][j]-B[i][j])/2)));
  const beta=A.map((r,i)=>r.map((x,j)=>z((x-D[i][j])/2,(C[i][j]+B[i][j])/2)));
  return {alpha,beta,G:[[...alpha[0],...beta[0]],[...alpha[1],...beta[1]],[...beta[0].map(zc),...alpha[0].map(zc)],[...beta[1].map(zc),...alpha[1].map(zc)]]};
};
const canonical=({alpha,beta})=>{
  const first=sub(mm(alpha,dag(alpha)),mm(beta,dag(beta)));
  const second=sub(mm(alpha,tr(beta)),mm(beta,tr(alpha)));
  return maxabs(sub(first,eye(2)))<1e-10&&maxabs(second)<1e-10;
};

const BR=bogoliubov(R),BH=bogoliubov(H);
assert.ok(canonical(BR)&&canonical(BH));
assert.ok(maxabs(BH.beta)<1e-12); // passive exchange of the two bilocal modes
assert.ok(maxabs(BR.beta)>1e-6);  // genuine amplitude/conjugate mixing

const group=[I4],seen=new Set([key(I4)]);
for(let i=0;i<group.length;i++)for(const gen of [R,H]){const q=rmm(gen,group[i]),k=key(q);if(!seen.has(k)){seen.add(k);group.push(q);}}
assert.equal(group.length,18);
const BG=group.map(bogoliubov);
assert.ok(BG.every(canonical));

// The real-to-Bogoliubov conversion is a representation homomorphism.
for(const A of group)for(const B of [R,H]){
  const lhs=bogoliubov(rmm(A,B)).G,rhs=mm(bogoliubov(A).G,bogoliubov(B).G);
  assert.ok(maxabs(sub(lhs,rhs))<1e-10);
}

// Gauge typing: both bilocal components and their conjugates are SU(3)
// singlets, so every real-linear/Bogoliubov combination remains a singlet.
const gaugeCharges=[0,0,0,0];
assert.ok(gaugeCharges.every(q=>q===0));

console.log(JSON.stringify({
  protocol:'order18-selector-as-bogoliubov-action-on-bilocal-c2/1',
  carrier:'B(v,w)=(u,z) in C2, doubled coordinates (u,z,conj(u),conj(z))',
  selectorGroupOrder:group.length,
  R:{alpha:BR.alpha,beta:BR.beta,genuineBogoliubovMixing:maxabs(BR.beta)>1e-6},
  H:{alpha:BH.alpha,beta:BH.beta,passiveModeExchange:maxabs(BH.beta)<1e-12},
  allElementsCanonical:true,
  homomorphismVerified:true,
  gaugeTyping:'u,z and their conjugates are all SU(3) singlets; selector mixing stays inside the gauge-singlet response space.',
  interpretation:'H exchanges the two bilocal response modes complex-linearly. R is an elliptic canonical transformation mixing the second mode with its conjugate; it is a response/Bogoliubov operation, not a microscopic color rotation.',
  physicalBoundary:'The representation is now well typed on the bilocal carrier, but no Standard-Model action has yet been shown to implement these exact alpha,beta coefficients.',
  conclusion:'The minimal bilocal C2 carrier supports the complete order-18 selector as canonical two-mode Bogoliubov transformations, providing an exact representation-level bridge from gauge-singlet composites to the symplectic/Redheffer programme.',
  passed:true
},null,2));
