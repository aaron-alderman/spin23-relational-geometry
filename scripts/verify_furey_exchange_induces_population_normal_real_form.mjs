#!/usr/bin/env node

const assert=(ok,msg)=>{if(!ok)throw new Error(msg);};
const C=(re,im=0)=>({re,im});
const conj=z=>C(z.re,-z.im);
const near=(a,b)=>Math.abs(a-b)<1e-12;

// Hermitian pair observable X=[[a,c],[c*,b]]. Theta=sigma_x K swaps populations and retains c.
const thetaObservable=X=>[[conj(X[1][1]),conj(X[1][0])],[conj(X[0][1]),conj(X[0][0])]];
const fixed=[[C(3),C(1.2,-0.7)],[C(1.2,0.7),C(3)]];
const image=thetaObservable(fixed);
for(let i=0;i<2;i++)for(let j=0;j<2;j++)assert(near(image[i][j].re,fixed[i][j].re)&&near(image[i][j].im,fixed[i][j].im),"population-normal observable should be fixed");

const unequal=[[C(4),C(1,0.2)],[C(1,-0.2),C(2)]];
const unequalImage=thetaObservable(unequal);
assert(!near(unequalImage[0][0].re,unequal[0][0].re),"population difference must be odd");

// Fixed survivor vector (v,bar v) has equal norms but does not require v real.
const v=[C(1,2),C(-0.5,0.3),C(0.2,-1.1)];
const vb=v.map(conj);
const norm2=w=>w.reduce((s,z)=>s+z.re*z.re+z.im*z.im,0);
assert(near(norm2(v),norm2(vb)),"exchange-fixed survivor weights must agree");
assert(v.some(z=>Math.abs(z.im)>0),"complex coefficients must survive exchange fixing");

// Relative U(1) rotates the relationship c and keeps the fixed algebra closed.
const phi=0.61, c0=fixed[0][1];
const phase=C(Math.cos(phi),Math.sin(phi));
const cmul=(a,b)=>C(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re);
const cp=cmul(phase,c0);
const rotated=[[fixed[0][0],cp],[conj(cp),fixed[1][1]]];
const rotatedImage=thetaObservable(rotated);
for(let i=0;i<2;i++)for(let j=0;j<2;j++)assert(near(rotatedImage[i][j].re,rotated[i][j].re)&&near(rotatedImage[i][j].im,rotated[i][j].im),"relative U1 must preserve fixed algebra");

const det=fixed[0][0].re*fixed[1][1].re-(c0.re*c0.re+c0.im*c0.im);
assert(det>0,"positive fixed observable example failed");

console.log("Furey exchange/population-normal real-form certificate: PASS");
console.log("Theta_ex_on_pair=sigma_x_K; induced_fixed_observables=Jz_equal_populations");
console.log("arbitrary_complex_relationship_survives=true; relative_U1_closure=true");
console.log(`fixed_vector_weights_equal=true; example_det=${det}; source_algebra_extension_not_tested`);
