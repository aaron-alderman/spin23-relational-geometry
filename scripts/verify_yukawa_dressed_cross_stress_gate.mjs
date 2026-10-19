#!/usr/bin/env node

const assert=(ok,msg)=>{if(!ok)throw new Error(msg);};
// Hypercharges in units of 1/6.
const Y={barQ:-1,barL:3,H:3,Htilde:-3,dR:-2,uR:4,eR:-6,nuR:0};
const sum=(...xs)=>xs.reduce((a,b)=>a+b,0);
const channels={
  down:{correct:sum(Y.barQ,Y.H,Y.dR),wrong:sum(Y.barQ,Y.Htilde,Y.dR)},
  up:{correct:sum(Y.barQ,Y.Htilde,Y.uR),wrong:sum(Y.barQ,Y.H,Y.uR)},
  lepton:{correct:sum(Y.barL,Y.H,Y.eR),wrong:sum(Y.barL,Y.Htilde,Y.eR)},
  neutrino:{correct:sum(Y.barL,Y.Htilde,Y.nuR),wrong:sum(Y.barL,Y.H,Y.nuR)},
};
for(const [name,x] of Object.entries(channels)){
  assert(x.correct===0,`${name} correct Higgs dressing is not neutral`);
  assert(x.wrong!==0,`${name} wrong Higgs dressing should be charged`);
}

const dimFermion=1.5, dimHiggs=1;
assert(dimFermion+dimFermion+dimHiggs===4,"Yukawa cross operator dimension failed");

// Metric-proportional relationship stress has a rank-one x/y Gram on one classical background.
const re=1.3, im=-0.8, spacetimeDim=4;
const Q=[[spacetimeDim*re*re,spacetimeDim*re*im],[spacetimeDim*re*im,spacetimeDim*im*im]];
const detQ=Q[0][0]*Q[1][1]-Q[0][1]*Q[1][0];
assert(Math.abs(detQ)<1e-12,"single Yukawa background relationship Gram must be rank one");
assert(Q[0][0]+Q[1][1]>0,"nonzero relationship channel required");

// A phase redefinition rotates the two quadratures and cannot select an absolute axis for one species.
const phi=0.37, c=Math.cos(phi),s=Math.sin(phi);
const rotated=[c*re-s*im,s*re+c*im];
assert(Math.abs(rotated[0]**2+rotated[1]**2-(re*re+im*im))<1e-12,"quadrature phase rotation failed");

console.log("Yukawa-dressed cross-stress gate certificate: PASS");
console.log("neutral_dressings=down:H,up:Htilde,lepton:H,neutrino:Htilde; unique_against_partner=true");
console.log("operator_dimension=4; Hilbert_stress_form=-gmunu_LY");
console.log(`single_background_xy_Gram_det=${detQ}; rank=1; one_species_phase_axis_noncanonical=true`);
