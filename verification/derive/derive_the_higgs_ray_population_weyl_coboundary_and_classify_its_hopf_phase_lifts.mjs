import assert from 'node:assert/strict';

const C=(r=0,i=0)=>({r,i});
const ca=(x,y)=>C(x.r+y.r,x.i+y.i), cs=(x,y)=>C(x.r-y.r,x.i-y.i);
const cm=(x,y)=>C(x.r*y.r-x.i*y.i,x.r*y.i+x.i*y.r), cc=x=>C(x.r,-x.i);
const cr=(r,x)=>C(r*x.r,r*x.i), ce=t=>C(Math.cos(t),Math.sin(t));
const close=(x,y,t=1e-10)=>Math.abs(x.r-y.r)<t&&Math.abs(x.i-y.i)<t;
const madd=(A,B)=>A.map((r,i)=>r.map((x,j)=>ca(x,B[i][j])));
const mscale=(z,A)=>A.map(r=>r.map(x=>cm(z,x)));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>ca(s,cm(x,B[k][j])),C())));
const dag=A=>A[0].map((_,j)=>A.map(r=>cc(r[j])));
const mv=(A,v)=>A.map(r=>r.reduce((s,x,i)=>ca(s,cm(x,v[i])),C()));
const inner=(v,w)=>v.reduce((s,x,i)=>ca(s,cm(cc(x),w[i])),C());
const outer=(v,w)=>v.map(x=>w.map(y=>cm(x,cc(y))));
const trace=A=>A.reduce((s,r,i)=>ca(s,r[i]),C());
const det2=A=>cs(cm(A[0][0],A[1][1]),cm(A[0][1],A[1][0]));
const meq=(A,B)=>A.every((r,i)=>r.every((x,j)=>close(x,B[i][j])));
const I=[[C(1),C()],[C(),C(1)]];

const norm=v=>Math.sqrt(inner(v,v).r);
const normalize=v=>v.map(x=>cr(1/norm(v),x));
const eps=[[C(),C(1)],[C(-1),C()]];
const tilde=h=>mv(eps,h.map(cc));
const projector=v=>outer(v,v);

const h=normalize([C(1),C(1,1)]);
const ht=tilde(h);
assert.ok(close(inner(h,h),C(1))&&close(inner(ht,ht),C(1))&&close(inner(h,ht),C()));
const Ph=projector(h),Pt=projector(ht);
assert.ok(meq(madd(Ph,Pt),I));

const phi=(X,Pa=Ph,Pb=Pt)=>madd(mscale(trace(mm(Pa,X)),Pb),mscale(trace(mm(Pb,X)),Pa));
assert.ok(meq(phi(Ph),Pt));
assert.ok(meq(phi(Pt),Ph));
const X=madd(mscale(C(3),Pt),mscale(C(5),Ph));
assert.ok(meq(phi(X),madd(mscale(C(5),Pt),mscale(C(3),Ph))));
const primitive=madd(Pt,mscale(C(-1),Ph));
assert.ok(meq(madd(Pt,mscale(C(-1),phi(Pt))),primitive));
assert.ok(meq(phi(phi(X)),X));

// The Higgs ray, rather than its phase, determines the population map.
const theta=.713;
const hp=h.map(x=>cm(ce(theta),x)),htp=tilde(hp);
const Php=projector(hp),Ptp=projector(htp);
assert.ok(meq(Php,Ph)&&meq(Ptp,Pt));

// SU(2)-covariance.
const a=C(Math.SQRT1_2),b=C(0,Math.SQRT1_2);
const g=[[a,b],[cr(-1,cc(b)),cc(a)]];
assert.ok(meq(mm(g,dag(g)),I));
const gh=mv(g,h),gPtg=mm(mm(g,Pt),dag(g)),gPhg=mm(mm(g,Ph),dag(g));
assert.ok(meq(projector(gh),gPhg));
assert.ok(meq(projector(tilde(gh)),gPtg));
assert.ok(meq(phi(mm(mm(g,X),dag(g)),gPhg,gPtg),mm(mm(g,phi(X)),dag(g))));

// Coherent unitary lifts of the same population swap carry unfixed phases.
const lift=(alpha,beta)=>madd(mscale(ce(alpha),outer(ht,h)),mscale(ce(beta),outer(h,ht)));
for(const [alpha,beta] of [[0,0],[0,Math.PI],[.2,.9]]){
  const U=lift(alpha,beta);
  assert.ok(meq(mm(U,dag(U)),I));
  assert.ok(meq(mm(mm(U,Ph),dag(U)),Pt));
  assert.ok(meq(mm(mm(U,Pt),dag(U)),Ph));
  assert.ok(meq(mm(U,U),mscale(ce(alpha+beta),I)));
  assert.ok(close(det2(U),cr(-1,ce(alpha+beta))));
}
for(const alpha of [0,.2,1.7]){
  const beta=Math.PI-alpha,U=lift(alpha,beta);
  assert.ok(close(det2(U),C(1)));
  assert.ok(meq(mm(U,U),mscale(C(-1),I)));
}

console.log(JSON.stringify({
  protocol:'higgs-ray-population-weyl-coboundary-hopf-lifts/1',
  canonicalData:'the Higgs ray defines complementary projectors Ph and Ptilde',
  populationReflection:'Phi_h(a Ptilde + b Ph)=b Ptilde + a Ph',
  firstOrderCoboundary:'(1-Phi_h)Ptilde=Ptilde-Ph, the primitive weak seam',
  phaseIndependence:'h -> exp(i theta)h leaves both projectors and Phi_h unchanged',
  su2Covariance:'Phi_{gh}(gXg^dagger)=g Phi_h(X) g^dagger',
  coherentLifts:'U_alpha_beta=exp(i alpha)|tilde h><h|+exp(i beta)|h><tilde h|',
  liftSquare:'U_alpha_beta^2=exp(i(alpha+beta)) I',
  su2Restriction:'det U=1 forces alpha+beta=pi and hence U^2=-I; the relative phase remains a U(1) torsor',
  implication:'The Higgs ray canonically supplies the response-level Weyl swap and primitive coboundary. Requiring an SU(2) coherent lift fixes its central square to -I, while a relative Hopf phase remains unfixed.',
  limitation:'This is a canonical kinematic construction from a normalized Higgs ray, not yet a term derived from the Standard Model effective action.',
  passed:true
},null,2));
