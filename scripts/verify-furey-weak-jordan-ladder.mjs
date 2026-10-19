#!/usr/bin/env node

const assert=(condition,message)=>{if(!condition)throw new Error(message);};
const half=x=>x/2;

// Coordinates for [[a,x+iy],[x-iy,b]] in H_2(C).
const jordan=(A,B)=>{
  const [a,b,x,y]=A,[c,d,u,v]=B;
  return [
    a*c+x*u+y*v,
    b*d+x*u+y*v,
    half((a+b)*u+(c+d)*x),
    half((a+b)*v+(c+d)*y)
  ];
};
const det=([a,b,x,y])=>a*b-x*x-y*y;
const basis={
  H2C:[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]],
  H2R:[[1,0,0,0],[0,1,0,0],[0,0,1,0]],
  diagonal:[[1,0,0,0],[0,1,0,0]]
};
const inSubspace=(v,name)=>name==='H2C'||(name==='H2R'?v[3]===0:v[2]===0&&v[3]===0);
const closure={};
for(const [name,B] of Object.entries(basis)){
  closure[name]=B.every(x=>B.every(y=>inSubspace(jordan(x,y),name)));
}

// Real dimensions of Hermitian and anti-Hermitian parts of direct sums of matrix blocks.
const hermitianDim=n=>n*n;
const antiHermitianDim=n=>n*n;
const deltaSM={complexMatrixBlocks:[1,3,2,1],realBlocks:[1]};
const deltaLE={complexMatrixBlocks:[1,3,1,1,1],realBlocks:[1]};
const dims=delta=>({
  hermitian:delta.complexMatrixBlocks.reduce((s,n)=>s+hermitianDim(n),0)+delta.realBlocks.length,
  antiHermitian:delta.complexMatrixBlocks.reduce((s,n)=>s+antiHermitianDim(n),0
  )
});

const smDims=dims(deltaSM),leDims=dims(deltaLE);
// Projector ranks on the 16-real-dimensional embedding space in Furey's formulas.
const traceY=6*(1/3)+4*(1/2)+2*1;
const traceQ=6*(1/3)+2*1+2*1;

const report={
  protocol:"furey-weak-jordan-ladder/1",
  sourceModel:{
    deltaSM:"C + M3(C) + M2(C) + C + R",
    deltaLE:"C + M3(C) + C + C + C + R",
    antiInvolution:"blockwise dagger"
  },
  fullLieJordanDimensions:{
    preHiggs:smDims,
    postHiggs:leDims
  },
  weakObservableLadder:[
    {algebra:"H2(C)",realDimension:4,determinantSignature:[1,3],conformalAlgebra:"so(2,4)",conformalDimension:15},
    {algebra:"H2(R)",realDimension:3,determinantSignature:[1,2],conformalAlgebra:"so(2,3)",conformalDimension:10},
    {algebra:"R+R",realDimension:2,determinantSignature:[1,1],conformalAlgebra:"so(2,2)",conformalDimension:6}
  ],
  jordanClosure:closure,
  sampleDeterminants:{
    H2C:det([3,2,1,1]),
    H2R:det([3,2,1,0]),
    diagonal:det([3,2,0,0])
  },
  chargeTraceCheck:{traceY,traceQ,dimension:16,meanY:traceY/16,meanQ:traceQ/16},
  conclusion:"Furey's exact weak Hermitian block contains a canonical H2(R) intermediate between pre- and post-Higgs Jordan algebras; selecting that intermediate is not derived by the source paper."
};
report.passed=Object.values(closure).every(Boolean)&&smDims.hermitian===16&&smDims.antiHermitian===15&&
  leDims.hermitian===14&&leDims.antiHermitian===13&&traceY===6&&traceQ===6&&traceY/16===3/8;
assert(report.passed,"Furey weak Jordan ladder verification failed");
console.log(JSON.stringify(report,null,2));
