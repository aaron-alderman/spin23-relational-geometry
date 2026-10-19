#!/usr/bin/env node

const khat2=(a,ks)=>ks.reduce((s,k)=>s+4*Math.sin(a*k/2)**2/a**2,0);
const k2=ks=>ks.reduce((s,k)=>s+k*k,0);
const bound=(a,ks)=>a*a*ks.reduce((s,k)=>s+k**4,0)/12;
const samples=[
  {a:0.1,ks:[0.7,0,0]},
  {a:0.1,ks:[0.7/Math.sqrt(3),0.7/Math.sqrt(3),0.7/Math.sqrt(3)]},
  {a:0.03,ks:[1.1,-0.4,0.2]},
  {a:0.2,ks:[0.8,0.3,-0.1]}
].map(s=>{
  const continuum=k2(s.ks),lattice=khat2(s.a,s.ks),error=continuum-lattice,b=bound(s.a,s.ks);
  return {...s,continuum,lattice,error,bound:b,satisfies:error>=-1e-14&&error<=b*(1+1e-10),relative:error/continuum};
});
const a=0.1,K=0.7;
const axis=[K,0,0],diag=[K/Math.sqrt(3),K/Math.sqrt(3),K/Math.sqrt(3)];
const anisotropy=Math.abs(khat2(a,axis)-khat2(a,diag));
const ratios=[
  {label:"10 TeV versus Planck energy",ratio:1e4/1.22e19},
  {label:"10^11 GeV versus Planck energy",ratio:1e11/1.22e19}
].map(x=>({...x,rigorousRelativeBound:x.ratio**2/12,leadingMasslessFrequencyError:x.ratio**2/24}));
const report={
  protocol:"lattice-continuum-dispersion-bounds/1",
  latticeSymbol:"khat^2=(4/a^2) sum_i sin^2(a k_i/2)",
  continuumSymbol:"|k|^2=sum_i k_i^2",
  rigorousSmallCellBound:"For |a k_i| in the stated low-momentum regime, 0 <= |k|^2-khat^2 <= (a^2/12) sum_i k_i^4 <= (a^2/12)|k|^4.",
  samples,
  anisotropy:{
    sameContinuumNorm:K,
    axisLattice:khat2(a,axis),
    diagonalLattice:khat2(a,diag),
    difference:anisotropy,
    leadingDifference:a*a*K**4/18,
    order:"O(a^2 |k|^4)"
  },
  planckScaleIllustrations:ratios,
  caveats:[
    "A tiny free-field dispersion error does not prove a discrete microscopic model.",
    "A preferred lattice generally breaks exact rotations and boosts at finite spacing.",
    "Interactions, accumulated propagation, thresholds and composite observables require separate error bounds.",
    "Naive lattice fermions face doubling/chirality constraints not tested here."
  ]
};
report.passed=samples.every(s=>s.satisfies)&&
  Math.abs(anisotropy-report.anisotropy.leadingDifference)/(report.anisotropy.leadingDifference)<0.01&&
  ratios.every(x=>x.rigorousRelativeBound<1e-16);
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
