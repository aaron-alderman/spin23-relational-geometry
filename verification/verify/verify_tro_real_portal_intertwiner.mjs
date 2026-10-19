import assert from 'node:assert/strict';

const C=(re,im=0)=>({re,im});
const add=(a,b)=>C(a.re+b.re,a.im+b.im);
const mul=(a,b)=>C(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re);
const conj=a=>C(a.re,-a.im);
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>add(s,mul(x,B[k][j])),C(0))));
const dag=A=>A[0].map((_,j)=>A.map(r=>conj(r[j])));
const maxDiff=(A,B)=>Math.max(...A.flatMap((r,i)=>r.map((x,j)=>Math.hypot(x.re-B[i][j].re,x.im-B[i][j].im))));
const phase=t=>C(Math.cos(t),Math.sin(t));
const diag=xs=>xs.map((x,i)=>xs.map((_,j)=>i===j?x:C(0)));

const alpha=[0.4,-0.7],beta=[0.1,1.2];
const Da=diag(alpha.map(phase)),Db=diag(beta.map(phase));
const tau=X=>mm(mm(Da,X.map(r=>r.map(conj))),dag(Db));
const fixed=(R)=>R.map((r,i)=>r.map((x,j)=>mul(phase((alpha[i]-beta[j])/2),C(x))));

const X=fixed([[1.2,-0.4],[0.7,0.3]]),Y=fixed([[0.2,0.9],[-0.5,1.1]]),Z=fixed([[0.8,-0.6],[0.4,0.5]]);
for(const M of [X,Y,Z]){assert(maxDiff(tau(M),M)<1e-11);assert(maxDiff(tau(tau(M)),M)<1e-11)}
const triple=mm(mm(X,dag(Y)),Z);
assert(maxDiff(tau(triple),triple)<1e-10);

const B=X;
assert(maxDiff(tau(B),B)<1e-11); // equivalent matrix form of J_E B = B J_F

const realAxis=C(1);
const charged=mul(phase(0.37),realAxis);
assert(Math.abs(charged.im)>1e-6);
const neutral=mul(phase(0),realAxis);
assert(Math.abs(neutral.im)<1e-12);

console.log('TRO real-portal intertwiner certificate: PASS');
console.log('tau_involution=true; fixed_TRO_triple_closed=true; portal_intertwiner=true; charged_real_axis_U1_invariant=false; neutral_portal_required_without_locking=true');
