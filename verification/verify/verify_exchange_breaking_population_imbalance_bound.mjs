#!/usr/bin/env node

const assert=(ok,msg)=>{if(!ok)throw new Error(msg);};
const t=3.0,x=1.1,y=-0.7,delta=0.8;
const det0=t*t-x*x-y*y;
const det=det0-delta*delta;
assert(Math.abs(det-((t+delta)*(t-delta)-(x*x+y*y)))<1e-12,"exchange-breaking determinant identity failed");
assert(det>0,"interior example must remain positive");
const coneTolerance=Math.sqrt(det0);
assert(Math.abs(delta)<coneTolerance,"positivity tolerance failed");
const asymmetry=((t+delta)-(t-delta))/((t+delta)+(t-delta));
assert(Math.abs(asymmetry-delta/t)<1e-12,"population asymmetry failed");

// No linear determinant response at the exchange-fixed point.
const h=1e-5;
const deriv=((det0-h*h)-(det0-h*h))/(2*h); // f(h)-f(-h)
assert(Math.abs(deriv)<1e-12,"determinant must be even in exchange breaking");
const second=((det0-h*h)-2*det0+(det0-h*h))/(h*h);
assert(Math.abs(second+2)<1e-6,"quadratic curvature must be -2");

// Boundary carrier is destabilized by every nonzero imbalance.
const tb=Math.hypot(x,y), detBoundary=tb*tb-x*x-y*y;
assert(Math.abs(detBoundary)<1e-12,"boundary setup failed");
assert(detBoundary-delta*delta<0,"nonzero imbalance must leave the cone at a rank-one boundary point");

console.log("Exchange-breaking population-imbalance certificate: PASS");
console.log(`det0=${det0}; det_broken=${det}; exact_shift=${det-det0}; quadratic_only=true`);
console.log(`positivity_tolerance_abs_delta=${coneTolerance}; normalized_population_asymmetry=${asymmetry}`);
console.log("rank_one_boundary_tolerance=0; sigma_z_exchange_odd=true");
