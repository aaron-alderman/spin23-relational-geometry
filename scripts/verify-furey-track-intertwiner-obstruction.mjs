#!/usr/bin/env node

const dim={one:1,three:3,threebar:3,two:2};
const minimalIdeal=[
  {su3:"1",su2:"1",multiplicity:2,dimension:2*dim.one},
  {su3:"3",su2:"1",multiplicity:1,dimension:dim.three},
  {su3:"3bar",su2:"1",multiplicity:1,dimension:dim.threebar}
];
const endomorphicCarrier=[
  {su3:"1",su2:"1",multiplicity:3,dimension:3*dim.one},
  {su3:"3",su2:"1",multiplicity:1,dimension:dim.three},
  {su3:"1",su2:"2",multiplicity:1,dimension:dim.two}
];
const key=x=>x.su3+"|"+x.su2;
const inventory=xs=>Object.fromEntries(xs.map(x=>[key(x),x.multiplicity]));
const A=inventory(minimalIdeal),B=inventory(endomorphicCarrier);
const labels=[...new Set([...Object.keys(A),...Object.keys(B)])].sort();
const mismatch=labels.filter(k=>(A[k]||0)!==(B[k]||0)).map(k=>({
  irrep:k,minimalIdealMultiplicity:A[k]||0,endomorphicCarrierMultiplicity:B[k]||0
}));
const total=xs=>xs.reduce((sum,x)=>sum+x.dimension,0);
const report={
  protocol:"furey-track-intertwiner-obstruction/1",
  comparedObjects:{
    minimalIdeal:"Lambda^bullet(C^3), natural SU(3) color/charge ideal",
    endomorphicCarrier:"natural fundamental block module for C + M3(C) + M2(C) + C + R after choosing a complex structure"
  },
  complexDimensions:{minimalIdeal:total(minimalIdeal),endomorphicCarrier:total(endomorphicCarrier)},
  minimalIdeal,
  endomorphicCarrier,
  representationMismatch:mismatch,
  conclusion:[
    "Equal complex dimension eight does not give a gauge-equivariant isomorphism.",
    "The minimal ideal contains a color anti-triplet and no weak doublet.",
    "The block carrier contains a weak doublet and no color anti-triplet in its fundamental decomposition.",
    "Any relation between the tracks must pass through an endomorphism/operator construction or a larger module, not a direct identification of these two eight-dimensional spaces."
  ]
};
report.passed=total(minimalIdeal)===8&&total(endomorphicCarrier)===8&&
  mismatch.some(x=>x.irrep==="3bar|1")&&mismatch.some(x=>x.irrep==="1|2");
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
