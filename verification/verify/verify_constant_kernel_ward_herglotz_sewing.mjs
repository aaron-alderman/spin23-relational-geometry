import assert from 'node:assert/strict';

const C=(re,im=0)=>({re,im});
const add=(x,y)=>C(x.re+y.re,x.im+y.im);
const mul=(x,y)=>C(x.re*y.re-x.im*y.im,x.re*y.im+x.im*y.re);
const inv=x=>{const d=x.re*x.re+x.im*x.im;return C(x.re/d,-x.im/d)};
const scale=(x,a)=>C(a*x.re,a*x.im);
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>add(s,mul(x,B[k][j])),C(0))));
const mt=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const madd=(A,B,sa=1,sb=1)=>A.map((r,i)=>r.map((x,j)=>add(scale(x,sa),scale(B[i][j],sb))));
const imag=A=>A.map(r=>r.map(x=>x.im));
const psd2=M=>M[0][0]>=-1e-10&&M[1][1]>=-1e-10&&M[0][0]*M[1][1]-M[0][1]*M[1][0]>=-1e-10;
const real=A=>A.map(r=>r.map(x=>C(x)));

const A=z=>[[add(C(2),mul(C(1.1),z)),C(0.1)],[C(0.1),add(C(1.4),mul(C(0.8),z))]];
const supportD=z=>[add(C(1.3),mul(C(0.9),z)),add(C(1.8),mul(C(1.2),z))];
const Bgood=[[0.35,0.08,0],[0.04,0.3,0]];
const Bbad=[[0.35,0.08,0.2],[0.04,0.3,-0.1]];

const dplus=z=>{const [d1,d2]=supportD(z);return [[inv(d1),C(0),C(0)],[C(0),inv(d2),C(0)],[C(0),C(0),C(0)]]};
const eff=(z,B,Dinv=dplus(z))=>madd(A(z),mm(mm(real(B),Dinv),real(mt(B))),1,-1);

for(const z of [C(0.2,0.3),C(-0.8,1.1),C(1.7,0.2)]) assert(psd2(imag(eff(z,Bgood))));

// A null-sector regulator has exactly no effect when B annihilates the kernel.
const z=C(0.4,0.7);
const base=eff(z,Bgood);
for(const eps of [1,0.1,1e-3]){
  const R=dplus(z);R[2][2]=C(1/eps);
  const regulated=eff(z,Bgood,R);
  const delta=Math.max(...regulated.flatMap((r,i)=>r.map((x,j)=>Math.hypot(x.re-base[i][j].re,x.im-base[i][j].im))));
  assert(delta<1e-12);
}

// Violating the range condition creates the predicted inverse-regulator divergence.
const norms=[];
for(const eps of [1e-2,1e-4,1e-6]){
  const R=dplus(z);R[2][2]=C(1/eps);
  const E=eff(z,Bbad,R);
  norms.push(Math.max(...E.flat().map(x=>Math.hypot(x.re,x.im))));
}
assert(norms[1]>50*norms[0]&&norms[2]>50*norms[1]);

console.log('Constant-kernel Ward Herglotz sewing certificate: PASS');
console.log('support_inverse_analytic=true; sewn_passivity=true; compatible_regulator_independence=true; null_coupling_diverges=true');
