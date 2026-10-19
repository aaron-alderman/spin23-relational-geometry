#!/usr/bin/env node

// Hypercharges are stored in units of 1/6 for exact integer arithmetic.
const fields=[
  {name:"Q_L",multiplicity:6,y6:1,su3Cubic:2,su2Doublets:3},
  {name:"u^c",multiplicity:3,y6:-4,su3Cubic:-1,su2Doublets:0},
  {name:"d^c",multiplicity:3,y6:2,su3Cubic:-1,su2Doublets:0},
  {name:"L_L",multiplicity:2,y6:-3,su3Cubic:0,su2Doublets:1},
  {name:"e^c",multiplicity:1,y6:6,su3Cubic:0,su2Doublets:0},
];
const sum=f=>fields.reduce((s,x)=>s+f(x),0);
// Common Dynkin-index factors suppressed in mixed anomalies.
const su3su3y=2*1+(-4)+2;
const su2su2y=3*1+(-3);
const gravitationalY=sum(f=>f.multiplicity*f.y6);
const yCubedNumerator=sum(f=>f.multiplicity*f.y6**3); // denominator 6^3
const su3Cubic=sum(f=>f.su3Cubic);
const su2DoubletCount=sum(f=>f.su2Doublets);
const report={
  protocol:"standard-model-one-generation-anomaly-ledger/1",
  convention:"all fields left-handed; hypercharge units 1/6",
  fields,
  anomalyNumerators:{SU3cubed:su3Cubic,SU3squaredU1:su3su3y,SU2squaredU1:su2su2y,gravitySquaredU1:gravitationalY,U1cubed:yCubedNumerator},
  globalSU2:{doubletCount:su2DoubletCount,even:su2DoubletCount%2===0},
};
report.passed=Object.values(report.anomalyNumerators).every(x=>x===0)&&report.globalSU2.even;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
