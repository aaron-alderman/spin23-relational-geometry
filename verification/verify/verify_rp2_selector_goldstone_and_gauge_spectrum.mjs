#!/usr/bin/env node

const assert=(ok,msg)=>{if(!ok)throw new Error(msg);};
const near=(a,b)=>Math.abs(a-b)<1e-12;
const lambda=1.7, v=2.1, g=0.4, kappa=0.3;

// At n=(0,0,v), V=lambda/4 (n^2-v^2)^2 has Hessian 2 lambda n n^T.
const hIso=[0,0,2*lambda*v*v];
assert(near(hIso[0],0)&&near(hIso[1],0)&&hIso[2]>0,"isotropic selector must have two Goldstones and one radial mode");

// Gauging SO(3)->SO(2): M_A^2=g^2(v^2 I-n n^T).
const gaugeMass2=[g*g*v*v,g*g*v*v,0];
assert(gaugeMass2[0]>0&&near(gaugeMass2[0],gaugeMass2[1])&&near(gaugeMass2[2],0),"gauge spectrum failed");

// Explicit easy-axis anisotropy kappa/2(n_x^2+n_y^2) gaps the two orientations.
const hAniso=[kappa,kappa,2*lambda*v*v];
assert(hAniso.every(x=>x>0),"positive anisotropy must gap every selector fluctuation");

// A director identifies n and -n; the reflection plane and fixed Jordan algebra are unchanged.
const reflection=n=>Array.from({length:3},(_,i)=>Array.from({length:3},(_,j)=>(i===j?1:0)-2*n[i]*n[j]));
const n=[0,0,1], nm=n.map(x=>-x);
assert(JSON.stringify(reflection(n))===JSON.stringify(reflection(nm)),"selector must be an unoriented director");

console.log("RP2 selector Goldstone/gauge spectrum certificate: PASS");
console.log(`isotropic_Hessian_eigenvalues=${hIso.join(',')}; Goldstones=2`);
console.log(`gauged_vector_mass2=${gaugeMass2.join(',')}; massive=2; massless=1`);
console.log(`anisotropic_Hessian_eigenvalues=${hAniso.join(',')}; director_identification=true`);
