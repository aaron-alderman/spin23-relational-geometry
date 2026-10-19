import assert from 'node:assert/strict';

const z=(re=0,im=0)=>({re,im});
const add=(a,b)=>z(a.re+b.re,a.im+b.im),mulz=(a,b)=>z(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re),conj=a=>z(a.re,-a.im);
const mmul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>add(s,mulz(x,B[k][j])),z())));
const cconj=A=>A.map(r=>r.map(conj));
const maxerr=(A,B)=>Math.max(...A.flatMap((r,i)=>r.map((x,j)=>Math.hypot(x.re-B[i][j].re,x.im-B[i][j].im))));
const real=A=>A.map(r=>r.map(x=>z(x)));
const neg=A=>A.map(r=>r.map(x=>z(-x.re,-x.im)));
const I2=[[1,0],[0,1]],Z2=[[0,0],[0,0]];
const block=(a,b,c,d)=>[[...a[0],...b[0]],[...a[1],...b[1]],[...c[0],...d[0]],[...c[1],...d[1]]];
const X=real(block(Z2,I2,I2,Z2));
const Sigma=real(block(I2,Z2,Z2,I2.map((r)=>r.map(x=>-x))));
const I4=real(block(I2,Z2,Z2,I2));
assert.ok(maxerr(mmul(X,cconj(X)),I4)<1e-12);
assert.ok(maxerr(mmul(mmul(X,cconj(Sigma)),X),neg(Sigma))<1e-12);

const alpha=[[z(1.5),z(-.5,-.5)],[z(-.5),z(2,-1)]];
const beta=[[z(-.5,-1),z(.5,.5)],[z(.5),z(-2)]];
const T=block(alpha,beta,cconj(beta),cconj(alpha));
assert.ok(maxerr(mmul(mmul(X,cconj(T)),X),T)<1e-12);

const J=[[0,0,1,0],[0,0,0,1],[-1,0,0,0],[0,-1,0,0]];
const kappa=[[1,0,0,0],[0,1,0,0],[0,0,-1,0],[0,0,0,-1]]; // (q,p)->(q,-p)
const rmul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const rt=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const clean=A=>A.map(r=>r.map(x=>Object.is(x,-0)?0:x));
assert.deepEqual(clean(rmul(rmul(rt(kappa),J),kappa)),clean(J.map(r=>r.map(x=>-x))));
const meridianBasis=[[1,0,0,0],[0,1,0,0]],longitudeBasis=[[0,0,1,0],[0,0,0,1]];
assert.deepEqual(meridianBasis.map(v=>rmul(kappa,v.map(x=>[x])).flat()),meridianBasis);
assert.deepEqual(clean(longitudeBasis.map(v=>rmul(kappa,v.map(x=>[x])).flat())),clean(longitudeBasis.map(v=>v.map(x=>-x))));

console.log(JSON.stringify({
  protocol:'furey-exchange-spatial-flux-real-structure/1',
  antiunitary:'Theta=sigma_x K on direction/survivor pair, tensored with I2 on modes',
  thetaSquared:1,
  fluxAction:'Theta Sigma Theta^-1 = -Sigma',
  transferReality:'Theta T Theta^-1 = T',
  realCarrierAction:'kappa(q,p)=(q,-p)',
  realSymplecticSign:'anti-symplectic',
  meridianPlane:'preserved pointwise',
  longitudePlane:'preserved setwise and orientation-reversed',
  doesNotDo:['exchange meridians and longitudes','select longitude framing','prove survivor topology equals propagation direction','supply the gauge-conjugating CAR adjoint'],
  conclusion:'The Furey survivor-exchange antiunitary has exactly the algebraic type required for spatial flux reversal and transfer reality. Its physical use remains conditional on identifying the survivor-pair index with counterpropagating response channels.',
  passed:true,
},null,2));
