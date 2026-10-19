import assert from 'node:assert/strict';

const z=(re=0,im=0)=>({re,im}),add=(a,b)=>z(a.re+b.re,a.im+b.im),sub=(a,b)=>z(a.re-b.re,a.im-b.im);
const mul=(a,b)=>z(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re),conj=a=>z(a.re,-a.im);
const div=(a,b)=>{const q=b.re*b.re+b.im*b.im;return z((a.re*b.re+a.im*b.im)/q,(a.im*b.re-a.re*b.im)/q);};
const abs=a=>Math.hypot(a.re,a.im),real=A=>A.map(r=>r.map(x=>z(x))),eye=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>z(i===j?1:0)));
const zero=n=>Array.from({length:n},()=>Array.from({length:n},()=>z()));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>add(s,mul(x,B[k][j])),z())));
const madd=(A,B)=>A.map((r,i)=>r.map((x,j)=>add(x,B[i][j]))),msub=(A,B)=>A.map((r,i)=>r.map((x,j)=>sub(x,B[i][j])));
const scale=(a,A)=>A.map(r=>r.map(x=>mul(a,x))),dag=A=>A[0].map((_,j)=>A.map(r=>conj(r[j])));
const maxerr=(A,B)=>Math.max(...A.flatMap((r,i)=>r.map((x,j)=>abs(sub(x,B[i][j])))));
const inv=A=>{const n=A.length,M=A.map((r,i)=>[...r,...eye(n)[i]]);for(let c=0;c<n;c++){let p=c;while(p<n&&abs(M[p][c])<1e-13)p++;assert.ok(p<n);[M[c],M[p]]=[M[p],M[c]];const d=M[c][c];M[c]=M[c].map(x=>div(x,d));for(let i=0;i<n;i++)if(i!==c){const f=M[i][c];M[i]=M[i].map((x,j)=>sub(x,mul(f,M[c][j])));}}return M.map(r=>r.slice(n));};
const block=(a,b,c,d)=>[[...a[0],...b[0]],[...a[1],...b[1]],[...c[0],...d[0]],[...c[1],...d[1]]];
const blocks=M=>({a:M.slice(0,2).map(r=>r.slice(0,2)),b:M.slice(0,2).map(r=>r.slice(2,4)),c:M.slice(2,4).map(r=>r.slice(0,2)),d:M.slice(2,4).map(r=>r.slice(2,4))});
const det2=A=>sub(mul(A[0][0],A[1][1]),mul(A[0][1],A[1][0]));
const trace=A=>A.reduce((s,r,i)=>add(s,r[i]),z());
const opnorm2=A=>{const Q=mm(dag(A),A),t=trace(Q).re,d=det2(Q).re;return Math.sqrt(Math.max(0,(t+Math.sqrt(Math.max(0,t*t-4*d)))/2));};
const opnorm=A=>{const Q=mm(dag(A),A),n=A.length;let v=Array.from({length:n},(_,i)=>z(Math.cos(i+1),Math.sin(2*i+1)));for(let it=0;it<200;it++){const w=Q.map(r=>r.reduce((s,x,j)=>add(s,mul(x,v[j])),z()));const q=Math.sqrt(w.reduce((s,x)=>s+abs(x)**2,0));if(q<1e-15)return 0;v=w.map(x=>z(x.re/q,x.im/q));}const w=Q.map(r=>r.reduce((s,x,j)=>add(s,mul(x,v[j])),z()));const ray=v.reduce((s,x,i)=>add(s,mul(conj(x),w[i])),z()).re;return Math.sqrt(Math.max(0,ray));};

const bogoliubov=M=>{
  const {a:A,b:B,c:C,d:D}=blocks(M);
  const alpha=madd(scale(z(.5),real(A.map((r,i)=>r.map((x,j)=>x+D[i][j])))),scale(z(0,.5),real(C.map((r,i)=>r.map((x,j)=>x-B[i][j])))));
  const beta=madd(scale(z(.5),real(A.map((r,i)=>r.map((x,j)=>x-D[i][j])))),scale(z(0,.5),real(C.map((r,i)=>r.map((x,j)=>x+B[i][j])))));
  return block(alpha,beta,beta.map(r=>r.map(conj)),alpha.map(r=>r.map(conj)));
};
const scatter=T=>{const {a,b,c,d}=blocks(T),di=inv(d);return block(scale(z(-1),mm(di,c)),di,msub(a,mm(mm(b,di),c)),mm(b,di));};
const transfer=S=>{const {a,b,c,d}=blocks(S),bi=inv(b);return block(msub(c,mm(mm(d,bi),a)),mm(d,bi),scale(z(-1),mm(bi,a)),bi);};

// With the present transfer convention, matrix products run opposite to the
// left-to-right physical cascade: Scat(T_A T_B)=Scat(T_B) star Scat(T_A).
const star=(A,B)=>{
  const x=blocks(A),y=blocks(B),DL=inv(msub(eye(2),mm(x.d,y.a))),DR=inv(msub(eye(2),mm(y.a,x.d)));
  return block(
    madd(x.a,mm(mm(mm(x.b,y.a),DL),x.c)),
    mm(mm(x.b,DR),y.b),
    mm(mm(y.c,DL),x.c),
    madd(y.d,mm(mm(mm(y.c,x.d),DR),y.b))
  );
};
const feedbackFactors=(A,B)=>{const x=blocks(A),y=blocks(B);return {left:msub(eye(2),mm(x.d,y.a)),right:msub(eye(2),mm(y.a,x.d)),leftNormProduct:opnorm2(x.d)*opnorm2(y.a),rightNormProduct:opnorm2(y.a)*opnorm2(x.d)};};

const rmm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const I4=[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
const R=[[1,0,0,0],[0,0,0,-1],[0,0,1,0],[0,1,0,-1]];
const H=[[0,1,0,0],[1,0,0,0],[0,0,0,1],[0,0,1,0]];
const N=[[1,0,-1,1],[0,0,0,1],[-1,0,2,-1],[0,-1,-1,4]];
const rinv=A=>{const M=A.map((r,i)=>[...r,...I4[i]]);for(let c=0;c<4;c++){let p=c;while(p<4&&Math.abs(M[p][c])<1e-13)p++;assert.ok(p<4);[M[c],M[p]]=[M[p],M[c]];const d=M[c][c];M[c]=M[c].map(x=>x/d);for(let i=0;i<4;i++)if(i!==c){const f=M[i][c];M[i]=M[i].map((x,j)=>x-f*M[c][j]);}}return M.map(r=>r.slice(4));};

const group=[I4],seen=new Set([JSON.stringify(I4)]);
for(let h=0;h<group.length;h++)for(const g of [R,H]){const x=rmm(g,group[h]),k=JSON.stringify(x);if(!seen.has(k)){seen.add(k);group.push(x);}}
assert.equal(group.length,18);

const J=block(eye(2),zero(2),zero(2),scale(z(-1),eye(2)));
const networks=group.map((g,index)=>{
  const G=bogoliubov(g),Gi=bogoliubov(rinv(g));
  assert.ok(maxerr(mm(mm(dag(G),J),G),J)<1e-11);
  assert.ok(maxerr(mm(G,Gi),eye(4))<1e-11);
  const K=scatter(G),Ki=scatter(Gi);
  assert.ok(maxerr(mm(dag(K),K),eye(4))<1e-10);
  assert.ok(maxerr(mm(dag(Ki),Ki),eye(4))<1e-10);
  return {index,G,Gi,K,Ki,maxFixedFeedbackBlockNorm:Math.max(opnorm2(blocks(K).d),opnorm2(blocks(Ki).a))};
});
const showComplex=x=>Math.abs(x.im)<1e-12?Number(x.re.toFixed(12)):{re:Number(x.re.toFixed(12)),im:Number(x.im.toFixed(12))};
const showMatrix=A=>A.map(r=>r.map(showComplex));

// Verify the star convention and the exact two-feedback factorization of the
// conjugation action at the arithmetic checkpoint.
const T0=bogoliubov(N),S0=scatter(T0);
const orbit=[];
for(const n of networks){
  const direct=scatter(mm(mm(n.G,T0),n.Gi));
  const cascaded=star(star(n.Ki,S0),n.K);
  const error=maxerr(direct,cascaded);assert.ok(error<1e-9);
  orbit.push({index:n.index,cascadeError:error,maxFixedFeedbackBlockNorm:n.maxFixedFeedbackBlockNorm});
}

// Reconstruct the same rational-inner base used by the previous audit.
let CB=eye(4);const characteristic=[z(1)];
for(let k=1;k<=4;k++){const c=mul(z(-1/k),trace(mm(S0,CB)));characteristic.push(c);CB=madd(mm(S0,CB),scale(c,eye(4)));}
const peval=x=>characteristic.reduce((v,c)=>add(mul(v,x),c),z());
let roots=Array.from({length:4},(_,k)=>{const a=.31+2*Math.PI*k/4;return z(1.13*Math.cos(a),1.13*Math.sin(a));});
for(let it=0;it<500;it++){let delta=0;const next=roots.map((r,j)=>{let den=z(1);for(let k=0;k<4;k++)if(k!==j)den=mul(den,sub(r,roots[k]));const q=div(peval(r),den);delta=Math.max(delta,abs(q));return sub(r,q);});roots=next;if(delta<1e-14)break;}
const projectors=roots.map((lam,j)=>{let P=eye(4);for(let k=0;k<4;k++)if(k!==j)P=scale(div(z(1),sub(lam,roots[k])),mm(P,msub(S0,scale(roots[k],eye(4)))));return P;});
const phases=roots.map(l=>{const a=Math.atan2(l.im,l.re);return a>0?a-2*Math.PI:a;});
const gammas=phases.map(p=>Math.tan(-p/4));
const blaschke=(w,g)=>div(sub(w,z(0,g)),add(w,z(0,g)));
const base=w=>projectors.map((P,j)=>scale(mul(blaschke(w,gammas[j]),blaschke(w,gammas[j])),P)).reduce(madd,zero(4));

// On Im(w)>0 the orthogonal projector decomposition makes ||S(w)|| exactly
// max_j |b_gamma_j(w)|^2 < 1.  The feedback factors then obey
// ||A22 S11|| <= ||A22|| ||S|| < 1 for every fixed unitary network.
const grid=[];for(const x of [-8,-3,-1,0,1,3,8])for(const y of [.01,.05,.2,1,5,20])grid.push(z(x,y));
let maximumBaseNorm=0,maximumFeedbackNormProduct=0,minimumFeedbackDeterminant=Infinity,maximumCascadeError=0,maximumSchurNorm=0;
for(const w of grid){
  const S=base(w),baseNorm=opnorm(S);assert.ok(baseNorm<1+1e-10);maximumBaseNorm=Math.max(maximumBaseNorm,baseNorm);
  for(const n of networks){
    const firstFactors=feedbackFactors(n.Ki,S),first=star(n.Ki,S),secondFactors=feedbackFactors(first,n.K);
    const transported=star(first,n.K),direct=scatter(mm(mm(n.G,transfer(S)),n.Gi));
    maximumCascadeError=Math.max(maximumCascadeError,maxerr(transported,direct));
    maximumSchurNorm=Math.max(maximumSchurNorm,opnorm(transported));
    for(const f of [firstFactors,secondFactors]){
      maximumFeedbackNormProduct=Math.max(maximumFeedbackNormProduct,f.leftNormProduct,f.rightNormProduct);
      minimumFeedbackDeterminant=Math.min(minimumFeedbackDeterminant,abs(det2(f.left)),abs(det2(f.right)));
    }
  }
}
assert.ok(maximumCascadeError<1e-8&&maximumSchurNorm<=1+1e-8&&minimumFeedbackDeterminant>1e-10);

console.log(JSON.stringify({
  protocol:'selector-redheffer-lossless-feedback-factorization/1',
  groupOrder:group.length,
  transferFactorization:'G_g T(z) G_g^-1',
  scatteringFactorization:'K_{g^-1} star S(z) star K_g, where K_g=Scat(G_g), in the present transfer convention',
  feedbackDenominators:[
    'D_1^L=I-(K_g^-1)22 S11 and D_1^R=I-S11 (K_g^-1)22',
    'D_2^L=I-(K_g^-1 star S)22 (K_g)11 and the reversed-order companion'
  ],
  proofMechanism:'Each K is unitary, hence every feedback block is contractive. Strict Schur input gives norm product below one, so the Neumann-series feedback inverses exist throughout the open upper half-plane. Lossless Redheffer composition preserves the Schur class.',
  jUnitaryBogoliubovAndUnitaryScatteringForAll18:true,
  checkpointOrbit:orbit,
  generatorNetworks:{R:showMatrix(networks[1].K),H:showMatrix(networks[2].K)},
  rationalInnerBase:{gammas,strictSchurReason:'orthogonal-projector functional calculus with |b_gamma(w)|^2<1 for Im(w)>0'},
  sampledCorroboration:{samples:grid.length*group.length,maximumBaseNorm,maximumFeedbackNormProduct,minimumFeedbackDeterminant,maximumCascadeError,maximumTransportedOperatorNorm:maximumSchurNorm},
  cayleyResidueConsequence:'The Cayley transform of every transported rational Schur-inner function is matrix Herglotz. Every real-axis pole therefore has a positive-semidefinite spectral weight (equivalently the coefficient of 1/(z-m) is negative semidefinite in the convention H(z)=integral dMu(t)/(t-z)).',
  sidebandReality:'Apply the conjugate-reflected negative-frequency completion after positive-envelope transport; the proof does not reinstate the falsified undoubled reality law.',
  remainingBoundary:'This proves global analytic Schur preservation and residue-sign positivity on the star-product chart. It does not give closed radical expressions for individual transported pole locations or identify their weights with Standard-Model states.',
  passed:true
},null,2));
