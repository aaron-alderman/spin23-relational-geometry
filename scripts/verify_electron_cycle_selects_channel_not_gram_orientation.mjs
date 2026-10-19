#!/usr/bin/env node

// Exact certificate: the unique charged-lepton linking factor and nonzero
// cyclic trace select incidence/channel, but not an arrow sign, phase, or
// normalization.  The physical one-generation Yukawa coefficient absorbs the
// remaining cycle phase under field rephasing.

import assert from 'node:assert/strict';

const C=(re=0,im=0)=>({re,im});
const mul=(a,b)=>C(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re);
const scale=(r,z)=>C(r*z.re,r*z.im);
const conj=z=>C(z.re,-z.im);
const abs=z=>Math.hypot(z.re,z.im);
const phase=t=>C(Math.cos(t),Math.sin(t));
const near=(a,b,e=1e-11)=>Math.abs(a.re-b.re)<e&&Math.abs(a.im-b.im)<e;
const product=edges=>edges.reduce(mul,C(1));

// Edges C->E, E->H, H->C.
const edges=[C(.8,.3),C(-.4,.9),C(1.2,-.2)];
const base=product(edges);
assert(abs(base)>0);

// Every sign choice preserves the nonzero-cycle predicate; odd parity flips
// the trace sign, so the predicate cannot select it.
const signProducts=[];
for(let mask=0;mask<8;mask++){
  const signed=edges.map((z,j)=>scale((mask>>j)&1?-1:1,z));
  const p=product(signed);assert(abs(p)>0);signProducts.push(p);
}
assert(signProducts.some(z=>near(z,base))&&signProducts.some(z=>near(z,scale(-1,base))));

// Arbitrary positive edge rescalings change the cycle magnitude while keeping
// it nonzero.
const scaled=product(edges.map((z,j)=>scale([2,.5,3][j],z)));
assert(Math.abs(abs(scaled)-3*abs(base))<1e-10);

// Vertex basis phases: an edge s->t receives exp(i(theta_t-theta_s)).
// Their product telescopes exactly around the cycle.
const theta={C:.31,E:-.72,H:1.13};
const transformed=[
  mul(phase(theta.E-theta.C),edges[0]),
  mul(phase(theta.H-theta.E),edges[1]),
  mul(phase(theta.C-theta.H),edges[2]),
];
assert(near(product(transformed),base));

// A field rephasing of the right electron face rotates the neutral Gram cross
// response.  Rephasing the Yukawa coefficient oppositely leaves the physical
// cycle amplitude invariant, so one-generation positivity is a convention.
const delta=.47;
const Z=C(.6,-.2),Zrot=mul(phase(delta),Z);
assert(!near(Zrot,Z));
const y=C(.3,.4),yrot=mul(phase(-delta),y);
assert(near(mul(yrot,Zrot),mul(y,Z)));

// Even unit-normalized TRO edges retain one cycle U(1) holonomy, and the
// nonzero predicate places no condition on it.
const unitEdges=[phase(.2),phase(-.5),phase(1.1)];
assert(Math.abs(abs(product(unitEdges))-1)<1e-11);
assert(!near(product(unitEdges),C(1)));

const report={
  protocol:'electron-cycle-selects-channel-not-gram-orientation/1',
  selectedByIncidence:'charged-lepton channel through the unique 15-state M2(C) factor',
  cyclicPredicate:'Tr(e^c L h_C^dagger) != 0',
  signChoicesPreservingPredicate:8,
  normalizationFixed:false,
  signFixed:false,
  phaseFixed:false,
  vertexBasisRephasing:{cycleProductInvariant:true,independentPhaseRank:2,remainingCycleHolonomyDimension:1},
  oneGenerationYukawaRephasing:{responseCrossRotates:true,coefficientCompensates:true,positiveRealConventionNotPrediction:true},
  strictTRONormalization:'fixes individual moduli but leaves cycle U(1) holonomy',
  remainingSelector:'a Ward-normalized spectral kernel, multi-cycle relative phase, boundary sewing orientation, or source-derived coefficient is required',
  passed:true,
};
console.log(JSON.stringify(report,null,2));
