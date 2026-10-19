import assert from 'node:assert/strict';

const C=(re,im=0)=>({re,im}),add=(a,b)=>C(a.re+b.re,a.im+b.im),sub=(a,b)=>C(a.re-b.re,a.im-b.im),mul=(a,b)=>C(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re),conj=a=>C(a.re,-a.im),phase=t=>C(Math.cos(t),Math.sin(t)),abs=a=>Math.hypot(a.re,a.im);
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>add(s,mul(x,B[k][j])),C(0)))),dag=A=>A[0].map((_,j)=>A.map(r=>conj(r[j]))),det3=M=>add(sub(mul(M[0][0],sub(mul(M[1][1],M[2][2]),mul(M[1][2],M[2][1]))),mul(M[0][1],sub(mul(M[1][0],M[2][2]),mul(M[1][2],M[2][0])))),mul(M[0][2],sub(mul(M[1][0],M[2][1]),mul(M[1][1],M[2][0]))));
const comm=(A,B)=>mm(A,B).map((r,i)=>r.map((x,j)=>sub(x,mm(B,A)[i][j]))),dist2=(x,y)=>x.reduce((s,v,i)=>s+(v-y[i])**2,0),wedge=(x,y)=>x[0]*y[1]-x[1]*y[0];
const Q=[[-1.1,.2],[.15,1.0],[1.25,-.55]],U=[[-.8,-.65],[.55,.45],[1.6,.15]],D=[[-1.4,.75],[.25,-.35],[1.35,1.1]],sigma=1.05,kappa=.73;
const O=(A,B)=>A.map(a=>B.map(b=>Math.exp(-dist2(a,b)/(4*sigma*sigma)))),Ou=O(Q,U),Od=O(Q,D);
const Yu=Ou.map(r=>r.map(x=>C(x))),Yd=Od.map((r,i)=>r.map((x,j)=>mul(C(x),phase(kappa*wedge(Q[i],D[j])))));
assert(Math.max(...Yd.flatMap((r,i)=>r.map((z,j)=>Math.abs(abs(z)-Od[i][j]))))<1e-12);
const Hu=mm(Yu,dag(Yu)),Hd=mm(Yd,dag(Yd)),J=det3(comm(Hu,Hd));assert(Math.abs(J.im)>1e-8&&Math.abs(J.re)<1e-10);
const loop=(i,k,j,l)=>kappa*(wedge(Q[i],D[j])+wedge(Q[k],D[l])-wedge(Q[i],D[l])-wedge(Q[k],D[j]));
assert(Math.abs(loop(1,0,1,0))>1e-4);

const alpha=[.2,-.4,.7],bu=[-.3,.5,-.1],bd=[.6,-.2,.35],pure=(O,b)=>O.map((r,i)=>r.map((x,j)=>mul(C(x),phase(alpha[i]+b[j])))),Yup=pure(Ou,bu),Ydp=pure(Od,bd),Jp=det3(comm(mm(Yup,dag(Yup)),mm(Ydp,dag(Ydp))));
assert(abs(Jp)<1e-10);

console.log('Holonomy CP/magnitude certificate: PASS');
console.log('pure_gauge_factorized_J=0; flux_plaquette_nonzero=true; magnitudes_unchanged=true; flux_Jarlskog_nonzero=true');
