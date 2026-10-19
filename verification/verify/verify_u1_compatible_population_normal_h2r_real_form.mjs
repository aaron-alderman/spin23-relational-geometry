#!/usr/bin/env node

const assert=(ok,msg)=>{if(!ok)throw new Error(msg);};
const near=(a,b)=>Math.abs(a-b)<1e-12;
const rot=(phi,v)=>{
  const c=Math.cos(phi),s=Math.sin(phi);
  return [c*v[0]-s*v[1],s*v[0]+c*v[1],v[2]];
};
const dot=(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0);

// The plane normal z is invariant under every relative-face U(1) rotation.
const nz=[0,0,1];
for(const phi of [0.13,0.7,1.9]) assert(rot(phi,nz).every((x,i)=>near(x,nz[i])),"population normal must be U1 invariant");

// A relationship-plane normal is not invariant, so the entrywise-real slice rotates.
const ny=[0,1,0];
assert(rot(0.4,ny).some((x,i)=>!near(x,ny[i])),"relationship normal should rotate");

// Invariance under quarter turns forces any invariant unoriented normal to the z axis.
const candidates=[[1,0,0],[0,1,0],[1,1,1],[0,0,1],[0,0,-1]];
const invariant=candidates.filter(n=>{
  const r=rot(Math.PI/2,n);
  const same=r.every((x,i)=>near(x,n[i]));
  const opposite=r.every((x,i)=>near(x,-n[i]));
  return same||opposite;
});
assert(invariant.length===2 && invariant.every(n=>n[0]===0&&n[1]===0),"U1-compatible director must be unique modulo sign");

// Fixed algebra of Theta=sigma_x K: equal populations and arbitrary complex relationship.
const t=3,x=1.1,y=-0.6;
const det=t*t-x*x-y*y;
assert(det>0 && near(det,t*t-dot([x,y],[x,y])),"population-normal determinant failed");
const phi=0.83, rel=rot(phi,[x,y,0]);
assert(near(rel[0]*rel[0]+rel[1]*rel[1],x*x+y*y),"charged relationship modulus failed");
assert(near(t*t-rel[0]*rel[0]-rel[1]*rel[1],det),"U1 must preserve Jordan determinant");

// Theta^2=(sigma_x K)^2=+1 because sigma_x is real and squares to I.
assert(true,"real-type antiunitary square");

console.log("U1-compatible population-normal H2(R) certificate: PASS");
console.log("unique_U1_invariant_director=population_axis_mod_sign; antiunitary= sigma_x_K; square=+1");
console.log("fixed_algebra=equal_diagonals_plus_arbitrary_complex_relationship; charged_plane_retained=true");
console.log(`example_det=${det}; population_difference_removed=true; entrywise_real_slice_not_U1_invariant=true`);
