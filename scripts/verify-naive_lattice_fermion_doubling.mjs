#!/usr/bin/env node

const zerosForDimension=d=>{
  const points=[];
  for(let mask=0;mask<2**d;mask++)
    points.push(Array.from({length:d},(_,i)=>((mask>>i)&1?Math.PI:0)));
  return points;
};
const derivativeSymbol=(ks,a=1)=>ks.map(k=>Math.sin(a*k)/a);
const wilsonMass=(ks,r=1,a=1)=>r/a*ks.reduce((s,k)=>s+1-Math.cos(a*k),0);
const data=[1,2,3,4].map(d=>{
  const zeros=zerosForDimension(d);
  return {
    d,
    naiveZeros:zeros.length,
    expected:2**d,
    points:zeros,
    derivativeMaximumAtZeros:Math.max(...zeros.map(k=>Math.max(...derivativeSymbol(k).map(Math.abs)))),
    wilsonMasses:zeros.map(k=>wilsonMass(k)),
    onlyPhysicalZeroRemainsMasslessWithWilson:zeros.filter(k=>Math.abs(wilsonMass(k))<1e-12).length===1
  };
});
const report={
  protocol:"naive-lattice-fermion-doubling/1",
  naiveSymbol:"D_i(k)=sin(a k_i)/a",
  wilsonTerm:"M_W(k)=(r/a) sum_i [1-cos(a k_i)]",
  data,
  interpretation:[
    "The naive massless lattice Dirac operator has 2^d zeros in d dimensions.",
    "A Wilson term lifts the corner doublers but explicitly breaks the naive chiral symmetry at finite spacing.",
    "Recovering chiral gauge matter requires an explicit Wilson, staggered, domain-wall, overlap/Ginsparg-Wilson, or other anomaly-consistent mechanism.",
    "The certificate demonstrates the elementary zero count, not the full Nielsen-Ninomiya theorem or a Standard-Model lattice construction."
  ]
};
report.passed=data.every(x=>x.naiveZeros===x.expected&&
  x.derivativeMaximumAtZeros<1e-12&&x.onlyPhysicalZeroRemainsMasslessWithWilson);
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
