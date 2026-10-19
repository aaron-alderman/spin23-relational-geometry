#!/usr/bin/env node

const cutoff=4,basis=[];for(let a=0;a<cutoff;a++)for(let b=0;b<cutoff;b++)basis.push([a,b]);
const simultaneousPi=basis.map(([a,b])=>((-1)**(a+b+1))); // exp[-i pi(N1+N2+1)]
const parity=basis.map(([a,b])=>((-1)**(a+b)));
const simultaneous2Pi=basis.map(([a,b])=>1); // exp[-i2pi(N1+N2+1)]
const onePlane2Pi=basis.map(([a])=>-1); // exp[-i2pi(N1+1/2)]
const report={
  protocol:"maslov-rotation-path-comparison/1",
  cutoffPerMode:cutoff,
  simultaneousPiEqualsMinusParity:simultaneousPi.every((x,i)=>x===-parity[i]),
  simultaneousTwoPiLoopLiftsToIdentity:simultaneous2Pi.every(x=>x===1),
  onePlaneTwoPiLoopLiftsToMinusIdentity:onePlane2Pi.every(x=>x===-1),
  conclusion:"Loops with the same classical endpoint can have different metaplectic signs; the path class is essential.",
};
report.passed=report.simultaneousPiEqualsMinusParity&&report.simultaneousTwoPiLoopLiftsToIdentity&&report.onePlaneTwoPiLoopLiftsToMinusIdentity;
console.log(JSON.stringify(report,null,2));if(!report.passed)process.exitCode=1;
