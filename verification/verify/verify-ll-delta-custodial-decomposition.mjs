#!/usr/bin/env node

// Product basis |mL,mR> for two spin-1 factors. Decompose the mR=+1 slice.
const basis=["1,1","1,0","1,-1","0,1","0,0","0,-1","-1,1","-1,0","-1,-1"];
const vec=entries=>basis.map(k=>entries[k]||0);
const dot=(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0);
const norm=a=>dot(a,a);
const custodial={
  J2M2:vec({"1,1":1}),
  J2M1:vec({"1,0":1/Math.sqrt(2),"0,1":1/Math.sqrt(2)}),
  J1M1:vec({"1,0":1/Math.sqrt(2),"0,1":-1/Math.sqrt(2)}),
  J2M0:vec({"1,-1":1/Math.sqrt(6),"0,0":2/Math.sqrt(6),"-1,1":1/Math.sqrt(6)}),
  J1M0:vec({"1,-1":1/Math.sqrt(2),"-1,1":-1/Math.sqrt(2)}),
  J0M0:vec({"1,-1":1/Math.sqrt(3),"0,0":-1/Math.sqrt(3),"-1,1":1/Math.sqrt(3)})
};
const delta={plusPlus:vec({"1,1":1}),plus:vec({"0,1":1}),neutral:vec({"-1,1":1})};
const project=(v,names)=>Object.fromEntries(names.map(n=>[n,dot(custodial[n],v)]));
const decompositions={
  deltaPlusPlus:project(delta.plusPlus,["J2M2"]),
  deltaPlus:project(delta.plus,["J2M1","J1M1"]),
  deltaNeutral:project(delta.neutral,["J2M0","J1M0","J0M0"])
};
const reconstructedNorms={
  deltaPlusPlus:Object.values(decompositions.deltaPlusPlus).reduce((s,x)=>s+x*x,0),
  deltaPlus:Object.values(decompositions.deltaPlus).reduce((s,x)=>s+x*x,0),
  deltaNeutral:Object.values(decompositions.deltaNeutral).reduce((s,x)=>s+x*x,0)
};
const orthonormal=Object.values(custodial).every(v=>Math.abs(norm(v)-1)<1e-12);
const report={
  protocol:"ll-delta-custodial-decomposition/1",
  convention:"Delta has right weight mR=+1 and Q=mL+mR",
  decompositions,
  analytic:[
    "Delta++ = H5++",
    "Delta+ = (H5+ - H3+)/sqrt(2)",
    "Delta0 = H5_0/sqrt(6) - H3_0/sqrt(2) + H1_0/sqrt(3)"
  ],
  reconstructedNorms,
  portalComponents:{chargedLeptonPair:"ee Delta++ couples directly to H5++",leptonNeutrino:"nu e Delta+ reaches H5+ and H3+",neutrinoPair:"nu nu Delta0 reaches H5_0, H3_0 and H1_0"},
  conclusion:"The LL Delta portal directly couples the doubly charged fiveplet and necessarily breaks custodial purity by selecting only the mR=+1 slice."
};
report.passed=orthonormal&&Object.values(reconstructedNorms).every(x=>Math.abs(x-1)<1e-12)&&Math.abs(decompositions.deltaPlus.J2M1-1/Math.sqrt(2))<1e-12&&Math.abs(decompositions.deltaNeutral.J0M0-1/Math.sqrt(3))<1e-12;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
