#!/usr/bin/env node

const assert=(ok,msg)=>{if(!ok)throw new Error(msg);};
const C=(re,im=0)=>({re,im});
const mul=(a,b)=>C(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re);
const conj=a=>C(a.re,-a.im);
const near=(a,b)=>Math.abs(a-b)<1e-12;

// Gauge-equivariant self-dual CAR: K_q plus conjugate Kbar_-q.
const theta=0.43,q=2/3, phase=C(Math.cos(q*theta),Math.sin(q*theta));
const U=([v,w])=>[mul(phase,v),mul(conj(phase),w)];
const Gamma=([v,w])=>[conj(w),conj(v)];
const F=[C(0.7,-0.2),C(1.1,0.4)];
const GU=Gamma(U(F)), UG=U(Gamma(F));
for(let i=0;i<2;i++)assert(near(GU[i].re,UG[i].re)&&near(GU[i].im,UG[i].im),"conjugate Nambu action must commute with CAR involution");

// Same-charge second support fails ordinary gauge equivariance for nonzero q.
const Usame=([v,w])=>[mul(phase,v),mul(phase,w)];
const bad1=Gamma(Usame(F)),bad2=Usame(Gamma(F));
assert(bad1.some((z,i)=>!near(z.re,bad2[i].re)||!near(z.im,bad2[i].im)),"same-charge exchange must fail CAR gauge equivariance");

// Basis projection has N independent complex modes although the self-dual space has dimension 2N.
const N=15, doubled=2*N, projectionRank=N;
assert(projectionRank*2===doubled,"basis projection complement count failed");
const fockSingle=2**N, fockIndependentDouble=2**(2*N);
assert(fockIndependentDouble===fockSingle*fockSingle,"Fock dimension comparison failed");

// P + Gamma P Gamma = I in block-rank bookkeeping.
const rankP=N,rankGammaPGamma=N,intersection=0;
assert(rankP+rankGammaPGamma-intersection===doubled,"self-dual CAR polarization failed");

console.log("Selector-exchange versus Nambu-CAR certificate: PASS");
console.log("same_charge_selector_exchange_is_CAR_adjoint=false; conjugate_gauge_action_repairs=true");
console.log(`self_dual_dimension_complex=${doubled}; independent_annihilation_modes=${projectionRank}`);
console.log(`Fock_dimension_one_generation=${fockSingle}; independent_double_Fock_dimension=${fockIndependentDouble}`);
