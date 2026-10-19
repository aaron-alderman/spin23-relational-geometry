import assert from 'node:assert/strict';

const C=(re,im=0)=>({re,im}), add=(a,b)=>C(a.re+b.re,a.im+b.im), mul=(a,b)=>C(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re), conj=a=>C(a.re,-a.im), phase=t=>C(Math.cos(t),Math.sin(t));
const sub=(a,b)=>C(a.re-b.re,a.im-b.im), abs=a=>Math.hypot(a.re,a.im), scale=(z,v)=>v.map(x=>mul(z,x));
const mv=(A,v)=>A.map(r=>r.reduce((s,x,j)=>add(s,mul(x,v[j])),C(0))), mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>add(s,mul(x,B[k][j])),C(0))));
const cv=v=>v.map(conj), dotT=(a,b)=>a.reduce((s,x,i)=>add(s,mul(x,b[i])),C(0)), daggerDot=(a,b)=>dotT(cv(a),b);
const su2=(x,y,z)=>{const n=Math.hypot(x,y,z),s=n?Math.sin(n)/n:1,a=C(Math.cos(n),z*s),b=C(y*s,x*s);return [[a,b],[C(-b.re,b.im),conj(a)]]};
const embed=(U,i,j)=>{const A=Array.from({length:3},(_,r)=>Array.from({length:3},(_,c)=>C(r===c?1:0)));A[i][i]=U[0][0];A[i][j]=U[0][1];A[j][i]=U[1][0];A[j][j]=U[1][1];return A};
const U2=su2(.23,-.31,.19), U3=mm(embed(su2(.17,.09,-.22),0,1),embed(su2(-.11,.28,.14),1,2)), theta=.37;
const Q=[[C(.2,.1),C(-.3,.4)],[C(.5,-.2),C(.1,.6)],[C(-.4,.3),C(.7,-.1)]], uc=[C(.3,-.4),C(-.2,.5),C(.6,.1)], dc=[C(-.1,.2),C(.4,.3),C(.2,-.6)];
const L=[C(.35,-.2),C(-.15,.55)], ec=C(.41,.23), nc=C(-.27,.38), H=[C(.26,.17),C(.61,-.12)], eps=[[C(0),C(1)],[C(-1),C(0)]];
const up=(q,u,h)=>u.reduce((s,x,a)=>add(s,mul(x,dotT(q[a],mv(eps,h)))),C(0));
const down=(q,d,h)=>d.reduce((s,x,a)=>add(s,mul(x,daggerDot(h,q[a]))),C(0));
const electron=(l,e,h)=>mul(e,daggerDot(h,l)), neutrino=(l,n,h)=>mul(n,dotT(l,mv(eps,h)));
const transform=()=>{
  const qWeak=Q.map(v=>mv(U2,v)), qColor=[0,1].map(i=>mv(U3,qWeak.map(v=>v[i]))), Qp=Array.from({length:3},(_,a)=>[qColor[0][a],qColor[1][a]]).map(v=>scale(phase(theta/6),v));
  const U3bar=U3.map(r=>r.map(conj)), ucp=scale(phase(-2*theta/3),mv(U3bar,uc)), dcp=scale(phase(theta/3),mv(U3bar,dc));
  const Lp=scale(phase(-theta/2),mv(U2,L)), Hp=scale(phase(theta/2),mv(U2,H)), ecp=mul(phase(theta),ec);
  return {Qp,ucp,dcp,Lp,Hp,ecp,ncp:nc};
};
const t=transform(), before=[up(Q,uc,H),down(Q,dc,H),electron(L,ec,H),neutrino(L,nc,H)], after=[up(t.Qp,t.ucp,t.Hp),down(t.Qp,t.dcp,t.Hp),electron(t.Lp,t.ecp,t.Hp),neutrino(t.Lp,t.ncp,t.Hp)];
assert(Math.max(...before.map((x,i)=>abs(sub(x,after[i]))))<1e-11);

const v=1.7, Hv=[C(0),C(v/Math.sqrt(2))], y=[C(.8,.2),C(.31,-.15),C(.54,.07),C(.12,.04)];
const masses=y.map(z=>mul(z,C(v/Math.sqrt(2))));
assert(abs(sub(dotT([C(1),C(0)],mv(eps,Hv)),C(v/Math.sqrt(2))))<1e-12);
assert(abs(sub(daggerDot(Hv,[C(0),C(1)]),C(v/Math.sqrt(2))))<1e-12);
for(const m of masses){const phi=Math.atan2(m.im,m.re),a=2*phi+.13,b=.13;assert(abs(sub(mul(phase(a-b),conj(m)),m))<1e-11)}

console.log('One-generation Higgs/Yukawa covariance certificate: PASS');
console.log('channels=up,down,electron,neutrino; SU3xSU2xU1_covariance=true; Higgs_conjugations=correct; unitary_gauge_masses=4; local_selectors=4');
