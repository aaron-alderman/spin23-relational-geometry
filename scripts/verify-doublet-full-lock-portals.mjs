#!/usr/bin/env node

// Bilinears are labeled by SU(2) dimension and 2Y for exact integer hypercharge.
const hBilinears=[
  {id:"HdagH_1",degree:2,su2:1,y2:0},
  {id:"HdagH_3",degree:2,su2:3,y2:0},
  {id:"HH_3",degree:2,su2:3,y2:2},
  {id:"HdagHdag_3",degree:2,su2:3,y2:-2}
];
const lockLinear=[
  {id:"xi",degree:1,su2:3,y2:0},
  {id:"Delta",degree:1,su2:3,y2:2},
  {id:"DeltaDag",degree:1,su2:3,y2:-2}
];
const lockBilinears=[
  {id:"xixi_1",degree:2,su2:1,y2:0},
  {id:"DeltaDagDelta_1",degree:2,su2:1,y2:0},
  {id:"DeltaDagDelta_3",degree:2,su2:3,y2:0},
  {id:"xiDeltaDag_1",degree:2,su2:1,y2:-2},
  {id:"xiDeltaDag_3",degree:2,su2:3,y2:-2},
  {id:"xiDeltaDag_5",degree:2,su2:5,y2:-2},
  {id:"xiDelta_1",degree:2,su2:1,y2:2},
  {id:"xiDelta_3",degree:2,su2:3,y2:2},
  {id:"xiDelta_5",degree:2,su2:5,y2:2}
];
const singletMatch=(a,b)=>a.su2===b.su2&&a.y2+b.y2===0;
const cubic=[];
for(const h of hBilinears)for(const l of lockLinear)if(singletMatch(h,l))cubic.push({h:h.id,lock:l.id,totalDegree:h.degree+l.degree});
const quartic=[];
for(const h of hBilinears)for(const l of lockBilinears)if(singletMatch(h,l))quartic.push({h:h.id,lock:l.id,totalDegree:h.degree+l.degree});
const cubicIndependent=[
  {id:"mu_xi",members:cubic.filter(x=>x.lock==="xi")},
  {id:"mu_Delta_complex_plus_hc",members:cubic.filter(x=>x.lock==="Delta"||x.lock==="DeltaDag")}
];
const quarticIndependent=[
  {id:"lambda_Hxi",members:quartic.filter(x=>x.lock==="xixi_1")},
  {id:"lambda_HDelta",members:quartic.filter(x=>x.lock==="DeltaDagDelta_1")},
  {id:"lambda_HDelta_adjoint",members:quartic.filter(x=>x.lock==="DeltaDagDelta_3")},
  {id:"lambda_mixed_complex_plus_hc",members:quartic.filter(x=>x.lock==="xiDeltaDag_3"||x.lock==="xiDelta_3")}
];
const report={
  protocol:"doublet-full-lock-gauge-invariant-portals/1",
  convention:"H~2_{Y=1/2}, xi~3_0, Delta~3_1; hypercharge stored as 2Y",
  cubicPortals:cubic,
  quarticPortals:quartic,
  independentHermitianStructures:{cubic:cubicIndependent,quartic:quarticIndependent},
  analyticForms:{
    cubic:["(H^dag tau^a H) xi^a","(H^T epsilon tau^a H) Delta_a^dag + h.c."],
    quartic:["(H^dag H)(xi.xi)","(H^dag H)(Delta^dag.Delta)","(H^dag tau H).(i Delta^dag x Delta)","(H^T epsilon tau H).(xi x Delta^dag)+h.c."]
  },
  conclusion:"Gauge symmetry permits two cubic and four quartic portals. Custodial symmetry relates their coefficients but is not required by the gauge classification."
};
report.passed=cubic.length===3&&quartic.length===5&&cubicIndependent.length===2&&quarticIndependent.length===4&&cubic.every(x=>x.totalDegree===3)&&quartic.every(x=>x.totalDegree===4);
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
