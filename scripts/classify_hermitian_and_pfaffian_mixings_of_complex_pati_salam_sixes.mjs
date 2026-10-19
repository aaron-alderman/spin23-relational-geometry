import assert from "node:assert/strict";

const pairs = [[0,1],[0,2],[1,2],[0,3],[1,3],[2,3]];
const pairIndex = new Map(pairs.map((p,i)=>[p.join(","),i]));
const z = (n,m=n)=>Array.from({length:n},()=>Array(m).fill(0));
const eye = n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>Number(i===j)));
const tr = A=>A[0].map((_,j)=>A.map(r=>r[j]));
const mm = (A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const add = (A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const sub = (A,B)=>A.map((r,i)=>r.map((x,j)=>x-B[i][j]));
const maxabs = A=>Math.max(...A.flat().map(Math.abs));

const parity = xs => {
  let inv=0;
  for(let i=0;i<xs.length;i++)for(let j=i+1;j<xs.length;j++)if(xs[i]>xs[j])inv++;
  return inv%2 ? -1 : 1;
};
const epsilon4 = (a,b,c,d) => new Set([a,b,c,d]).size===4 ? parity([a,b,c,d]) : 0;

// J implements B(x,y)=1/2 epsilon_{IJKL} x^{IJ} y^{KL} on Lambda^2 C^4.
// Overall normalization is irrelevant for the support theorem.
const J=z(6);
for(let i=0;i<6;i++)for(let j=0;j<6;j++){
  const [a,b]=pairs[i], [c,d]=pairs[j];
  J[i][j]=epsilon4(a,b,c,d);
}
assert.deepEqual(J,tr(J));
assert(maxabs(sub(mm(J,J),eye(6)))===0);

const Pcc=z(6), Plq=z(6);
for(let i=0;i<3;i++)Pcc[i][i]=1;
for(let i=3;i<6;i++)Plq[i][i]=1;
assert(maxabs(mm(mm(Pcc,J),Pcc))===0);
assert(maxabs(mm(mm(Plq,J),Plq))===0);
assert(maxabs(mm(mm(Pcc,J),Plq))>0);
assert(maxabs(mm(mm(Plq,J),Pcc))>0);

// Exterior-square infinitesimal representation and full sl4 invariance audit.
const E=(a,b)=>{const X=z(4);X[a][b]=1;return X;};
const wedge2=X=>{
  const W=z(6);
  for(let col=0;col<6;col++){
    const [a,b]=pairs[col];
    for(let i=0;i<4;i++){
      if(X[i][a]!==0&&i!==b){const lo=Math.min(i,b),hi=Math.max(i,b),s=i<b?1:-1;W[pairIndex.get(`${lo},${hi}`)][col]+=s*X[i][a];}
      if(X[i][b]!==0&&i!==a){const lo=Math.min(a,i),hi=Math.max(a,i),s=a<i?1:-1;W[pairIndex.get(`${lo},${hi}`)][col]+=s*X[i][b];}
    }
  }
  return W;
};
const generators=[];
for(let i=0;i<4;i++)for(let j=0;j<4;j++)if(i!==j)generators.push(E(i,j));
for(let i=0;i<3;i++)generators.push(sub(E(i,i),E(3,3)));
assert.equal(generators.length,15);
const invariantResiduals=generators.map(X=>maxabs(add(mm(tr(wedge2(X)),J),mm(J,wedge2(X)))));
assert(invariantResiduals.every(x=>x===0));

// Support tests with basis vectors.
const v=i=>Array.from({length:6},(_,j)=>Number(i===j));
const bil=(x,M,y)=>x.reduce((s,xi,i)=>s+xi*y.reduce((t,yj,j)=>t+M[i][j]*yj,0),0);
const hermitianSupport=[], pfaffianSupport=[];
for(let i=0;i<6;i++)for(let j=0;j<6;j++){
  if(bil(v(i),eye(6),v(j))!==0)hermitianSupport.push([i,j]);
  if(bil(v(i),J,v(j))!==0)pfaffianSupport.push([i,j,J[i][j]]);
}
assert(hermitianSupport.every(([i,j])=>(i<3)===(j<3)));
assert(pfaffianSupport.every(([i,j])=>(i<3)!==(j<3)));

console.log(JSON.stringify({
  protocol:"complex-Pati-Salam-six-quadratic-invariant-mixing/1",
  basis:pairs.map(([a,b])=>`e${a+1}^e${b+1}`),
  sectors:{colourColour:[0,1,2],colourLepton:[3,4,5]},
  epsilonPairingMatrix:J,
  sl4InvarianceResiduals:invariantResiduals,
  hermitianInvariant:{form:"H_L^dagger H_R",support:hermitianSupport,consequence:"pairs like with like: lq--lq and dq--dq"},
  holomorphicInvariant:{form:"H_L^T J H_R (and self Pfaffians H_X^T J H_X)",support:pfaffianSupport,consequence:"pairs colour-colour with colour-lepton and therefore reconnects safe and dangerous source sectors"},
  phaseSelection:{commonPhase:"H_L,H_R -> exp(i theta)(H_L,H_R)",hermitianCharge:0,holomorphicCharge:2,consequence:"a common U(1), or suitable Z_N with 2 nonzero mod N, allows useful Hermitian L--R mixing and forbids Pfaffian lq--dq mixing"},
  theorem:"Pati-Salam gauge invariance alone does not protect the NCG source split: the invariant epsilon pairing mixes the leptoquark and diquark halves of a complex six. A further phase/grading or an explicit spectral-action selection rule is necessary.",
  sourceBoundary:"The published Model C phenomenology assumes suppressed companion mixing. The displayed spectral action for the earlier H_R sector is compatible with Hermitian contractions, but the complete left-right Model C potential must be expanded before claiming the phase grading is exact or radiatively stable.",
  passed:true
},null,2));
