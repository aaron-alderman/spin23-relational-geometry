#!/usr/bin/env node

const gcd=(a,b)=>b===0n?(a<0n?-a:a):gcd(b,a%b);
const F=(n,d=1n)=>{n=BigInt(n);d=BigInt(d);if(d<0n){n=-n;d=-d;}const g=gcd(n,d);return[n/g,d/g];};
const sub=(a,b)=>F(a[0]*b[1]-b[0]*a[1],a[1]*b[1]);
const neg=a=>F(-a[0],a[1]);
const eq=(a,b)=>a[0]===b[0]&&a[1]===b[1];
const show=a=>a[1]===1n?String(a[0]):String(a[0])+"/"+String(a[1]);
const blocks=[
  {id:"O1",dim:1,y:F(0)},
  {id:"O2",dim:3,y:F(1,3)},
  {id:"H",dim:2,y:F(1,2)},
  {id:"C",dim:1,y:F(1)},
  {id:"R",dim:1,y:F(0)}
];
const ordered=[];
for(const target of blocks)for(const source of blocks){
  ordered.push({
    id:target.id+"<-"+source.id,
    target:target.id,
    source:source.id,
    complexDimension:target.dim*source.dim,
    charge:sub(target.y,source.y),
    dagger:source.id+"<-"+target.id
  });
}
const diagonal=ordered.filter(x=>x.target===x.source);
const offDiagonal=ordered.filter(x=>x.target!==x.source);
const seen=new Set(),orbits=[];
for(const x of offDiagonal){
  if(seen.has(x.id))continue;
  const mate=ordered.find(y=>y.id===x.dagger);
  seen.add(x.id);seen.add(mate.id);
  orbits.push({
    pair:[x.id,mate.id],
    charges:[show(x.charge),show(mate.charge)],
    oppositeChargesExact:eq(x.charge,neg(mate.charge)),
    oneOrientationComplexDimension:x.complexDimension,
    hermitianFixedRealDimension:2*x.complexDimension
  });
}
const sum=(xs,f)=>xs.reduce((s,x)=>s+f(x),0);
const fullComplex=sum(ordered,x=>x.complexDimension);
const diagonalHermitianReal=sum(diagonal,x=>x.complexDimension);
const offDiagonalHermitianReal=sum(orbits,x=>x.hermitianFixedRealDimension);
const report={
  protocol:"dagger-mirror-orbits/1",
  blockCount:blocks.length,
  orderedBlockMaps:ordered.length,
  daggerOrbits:{diagonalFixed:diagonal.length,offDiagonalPairs:orbits.length},
  dimensions:{
    fullEndomorphismComplex:fullComplex,
    fullEndomorphismReal:2*fullComplex,
    hermitianFixedReal:diagonalHermitianReal+offDiagonalHermitianReal,
    antiHermitianReal:diagonalHermitianReal+offDiagonalHermitianReal
  },
  offDiagonalOrbits:orbits,
  checks:{
    everyOffDiagonalMapPaired:offDiagonal.length===2*orbits.length,
    oppositeCharges:orbits.every(o=>o.oppositeChargesExact),
    hermitianNotComplexLinear:"multiplication by i sends Hermitian fixed points to anti-Hermitian points"
  },
  conclusion:[
    "Dagger relates each charged block orientation to its mirror rather than deleting one.",
    "Hermitian and anti-Hermitian fixed spaces each have real dimension 64.",
    "Dagger splitting alone is not a complex-linear chiral projector."
  ]
};
report.passed=fullComplex===64&&diagonal.length===5&&orbits.length===10&&
  report.dimensions.hermitianFixedReal===64&&report.checks.everyOffDiagonalMapPaired&&
  report.checks.oppositeCharges;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
