import assert from 'node:assert/strict';

const z=(re=0,im=0)=>({re,im}),add=(a,b)=>z(a.re+b.re,a.im+b.im),sub=(a,b)=>z(a.re-b.re,a.im-b.im);
const mulz=(a,b)=>z(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re),divz=(a,b)=>{const d=b.re*b.re+b.im*b.im;return z((a.re*b.re+a.im*b.im)/d,(a.im*b.re-a.re*b.im)/d);};
const conj=a=>z(a.re,-a.im),abs=a=>Math.hypot(a.re,a.im),eye=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>z(i===j?1:0)));
const madd=(A,B)=>A.map((r,i)=>r.map((x,j)=>add(x,B[i][j]))),msub=(A,B)=>A.map((r,i)=>r.map((x,j)=>sub(x,B[i][j])));
const mmul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>add(s,mulz(x,B[k][j])),z())));
const dag=A=>A[0].map((_,j)=>A.map(r=>conj(r[j]))),cconj=A=>A.map(r=>r.map(conj)),scale=(a,A)=>A.map(r=>r.map(x=>mulz(a,x)));
const trace=A=>A.reduce((s,r,i)=>add(s,r[i]),z()),maxerr=(A,B)=>Math.max(...A.flatMap((r,i)=>r.map((x,j)=>abs(sub(x,B[i][j])))));
const q=(re,im=0)=>z(re/85,im/85);
const S=[[q(21,-52),q(-18,-4),q(58,-6),q(4,-18)],[q(-18,-4),q(64,-33),q(11,-7),q(33,-21)],[q(58,-6),q(11,-7),q(-26,-53),q(7,11)],[q(4,-18),q(33,-21),q(7,11),q(-64,33)]];

// Spectral projectors by characteristic polynomial and Durand-Kerner roots.
let B=eye(4);const coeff=[z(1)];for(let k=1;k<=4;k++){const c=mulz(z(-1/k),trace(mmul(S,B)));coeff.push(c);B=madd(mmul(S,B),scale(c,eye(4)));}
const peval=x=>coeff.reduce((v,c)=>add(mulz(v,x),c),z());
let roots=Array.from({length:4},(_,k)=>{const a=.31+2*Math.PI*k/4;return z(1.13*Math.cos(a),1.13*Math.sin(a));});
for(let it=0;it<500;it++){let dmax=0;const next=roots.map((r,j)=>{let den=z(1);for(let k=0;k<4;k++)if(k!==j)den=mulz(den,sub(r,roots[k]));const d=divz(peval(r),den);dmax=Math.max(dmax,abs(d));return sub(r,d);});roots=next;if(dmax<1e-14)break;}
roots.sort((a,b)=>Math.atan2(a.im,a.re)-Math.atan2(b.im,b.re));
const P=roots.map((lam,j)=>{let X=eye(4);for(let k=0;k<4;k++)if(k!==j)X=scale(divz(z(1),sub(lam,roots[k])),mmul(X,msub(S,scale(roots[k],eye(4)))));return X;});
const overlap=(A,B)=>trace(mmul(A,B)).re;
const unitaryAction=(G,Q)=>mmul(mmul(G,Q),dag(G));
const antiunitaryAction=(X,Q)=>mmul(mmul(X,cconj(Q)),dag(X));
const overlapMatrix=transform=>P.map(Pi=>P.map(Pj=>overlap(Pi,transform(Pj))));
const permutationTest=O=>O.every(row=>{const sorted=[...row].sort((a,b)=>b-a);return sorted[0]>1-1e-8&&sorted[1]<1e-8;});
const rowMaxima=O=>O.map(row=>Math.max(...row));

const X2=[[0,1],[1,0]],I2=[[1,0],[0,1]],Z2=[[0,0],[0,0]];
const block=(a,b,c,d)=>[[...a[0],...b[0]],[...a[1],...b[1]],[...c[0],...d[0]],[...c[1],...d[1]]];
const real=A=>A.map(r=>r.map(x=>z(x)));
const Ghandle=real(block(X2,Z2,Z2,X2));
const Xflux=real(block(Z2,I2,I2,Z2));
const OH=overlapMatrix(Q=>unitaryAction(Ghandle,Q));
const OF=overlapMatrix(Q=>antiunitaryAction(Xflux,Q));
assert.equal(permutationTest(OH),false);assert.equal(permutationTest(OF),false);

// Exact real-carrier dynamics commutators.
const rmmul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const rsub=(A,B)=>A.map((r,i)=>r.map((x,j)=>x-B[i][j]));
const rfrob=A=>Math.sqrt(A.flat().reduce((s,x)=>s+x*x,0));
const N=[[1,0,-1,1],[0,0,0,1],[-1,0,2,-1],[0,-1,-1,4]];
const R=[[1,0,0,0],[0,0,0,-1],[0,0,1,0],[0,1,0,-1]];
const H=[[0,1,0,0],[1,0,0,0],[0,0,0,1],[0,0,1,0]];
const commNorm=(A,B)=>rfrob(rsub(rmmul(A,B),rmmul(B,A)));
const orientedColorCommutatorNorm=commNorm(R,N),handleCommutatorNorm=commNorm(H,N);
assert.ok(orientedColorCommutatorNorm>0&&handleCommutatorNorm>0);

console.log(JSON.stringify({
  protocol:'selector-actions-on-scattering-spectral-lines/1',
  eigenphases:roots.map(x=>Math.atan2(x.im,x.re)),
  handleExchangeOverlapMatrix:OH,
  handleExchangeRowMaxima:rowMaxima(OH),
  handleExchangePermutesEigenlines:false,
  fluxReversalOverlapMatrix:OF,
  fluxReversalRowMaxima:rowMaxima(OF),
  fluxReversalPermutesEigenlines:false,
  realCarrierCommutators:{orientedColorWithN:orientedColorCommutatorNorm,handleExchangeWithN:handleCommutatorNorm},
  representationConclusion:'The four fixed-checkpoint eigenlines do not carry a permutation representation of handle exchange or flux reversal, and oriented color does not preserve the carrier word. They are dynamical spectral channels, not an equivariant copy of the u,d,e,nu label grid.',
  survivingInterpretation:'Selectors act covariantly on the family of checkpoints/responses, while a fixed symmetry-broken checkpoint has mixed eigenchannels. A field-to-eigenchannel map would need spurion-dependent covariance rather than a fixed permutation intertwiner.',
  passed:true,
},null,2));
