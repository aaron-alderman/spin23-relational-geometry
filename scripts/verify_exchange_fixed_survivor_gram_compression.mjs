#!/usr/bin/env node

const assert=(ok,msg)=>{if(!ok)throw new Error(msg);};
const C=(re,im=0)=>({re,im});
const conj=z=>C(z.re,-z.im);
const add=(a,b)=>C(a.re+b.re,a.im+b.im);
const mul=(a,b)=>C(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re);
const scale=(s,a)=>C(s*a.re,s*a.im);
const abs2=z=>z.re*z.re+z.im*z.im;
const inner=(u,v)=>u.reduce((s,z,i)=>add(s,mul(conj(z),v[i])),C(0));
const norm2=u=>inner(u,u).re;
const gram=(a,b)=>[[C(norm2(a)),inner(a,b)],[inner(b,a),C(norm2(b))]];
const det=G=>G[0][0].re*G[1][1].re-abs2(G[0][1]);
const near=(a,b)=>Math.abs(a-b)<1e-11;
const thetaPair=([a,b])=>[b.map(conj),a.map(conj)];
const thetaGram=G=>[[conj(G[1][1]),conj(G[1][0])],[conj(G[0][1]),conj(G[0][0])]];

const a=[C(1,1),C(2,-1),C(0.5,0.2)], b=a.map(conj);
const G=gram(a,b);
assert(near(G[0][0].re,G[1][1].re),"exchange-fixed Gram must have equal populations");
assert(det(G)>0,"generic complex exchange-fixed Gram should be interior positive");
const TG=thetaGram(G);
for(let i=0;i<2;i++)for(let j=0;j<2;j++)assert(near(TG[i][j].re,G[i][j].re)&&near(TG[i][j].im,G[i][j].im),"fixed Gram intertwining failed");

// Equivariance before fixing.
const p=[C(0.2,1.1),C(-0.3,0.4),C(2,-0.1)], q=[C(1,-0.2),C(0.7,0.9),C(-0.5,0.6)];
const lhs=gram(...thetaPair([p,q])), rhs=thetaGram(gram(p,q));
for(let i=0;i<2;i++)for(let j=0;j<2;j++)assert(near(lhs[i][j].re,rhs[i][j].re)&&near(lhs[i][j].im,rhs[i][j].im),"Gram map must intertwine exchange");

// Phase-real vectors lie on the determinant boundary.
const phi=0.43, phase=C(Math.cos(phi),Math.sin(phi));
const r=[1,2,-0.7].map(x=>scale(x,phase));
const Gr=gram(r,r.map(conj));
assert(Math.abs(det(Gr))<1e-10,"phase-real state should give rank-one boundary Gram");

// Positive exchange-fixed spectral sum and upper-half-plane Herglotz sign.
const states=[a,[C(0.1,-0.4),C(1.3,0.2),C(-0.8,0.7)]];
const masses=[1.5,3.2], weights=[0.7,1.1], z=C(0.6,0.9);
let ImR=[[0,0],[0,0]], sumG=[[C(0),C(0)],[C(0),C(0)]];
for(let k=0;k<states.length;k++){
  const g=gram(states[k],states[k].map(conj));
  const denom=(masses[k]-z.re)**2+z.im*z.im;
  const imKernel=z.im/denom;
  for(let i=0;i<2;i++)for(let j=0;j<2;j++){
    sumG[i][j]=add(sumG[i][j],scale(weights[k],g[i][j]));
    ImR[i][j]+=weights[k]*imKernel*g[i][j].re;
  }
}
assert(near(sumG[0][0].re,sumG[1][1].re)&&det(sumG)>=-1e-10,"spectral sum must remain in positive Jz");
assert(ImR[0][0]>=0&&ImR[1][1]>=0&&ImR[0][0]*ImR[1][1]-ImR[0][1]*ImR[1][0]>=-1e-10,"Herglotz imaginary part must be positive");

console.log("Exchange-fixed survivor Gram compression certificate: PASS");
console.log(`pointwise_Jz_positive=true; generic_det=${det(G).toFixed(12)}; phase_real_boundary_det=${det(Gr).toFixed(12)}`);
console.log("Gram_exchange_intertwining=true; positive_spectral_sum=true; Herglotz_sign=true");
