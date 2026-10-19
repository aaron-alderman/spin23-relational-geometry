#!/usr/bin/env node

// Hypercharge is stored as 2Y and weak representations by dimension 2j+1.
const higgs={weakDim:2,y2:1};
const productChannels=[
  {weakDim:1,j2:0,symmetry:"antisymmetric"},
  {weakDim:3,j2:2,symmetry:"symmetric"}
];
const connectorY2=-(higgs.y2+higgs.y2);
const t3TwiceValues=j2=>Array.from({length:j2+1},(_,i)=>-j2+2*i);
const hasNeutral=(j2,y2)=>t3TwiceValues(j2).some(m2=>m2+y2===0);
const channels=productChannels.map(ch=>({
  ...ch,
  connectorY2,
  connectorY:connectorY2/2,
  electricCharges:t3TwiceValues(ch.j2).map(m2=>(m2+connectorY2)/2),
  hasNeutralComponent:hasNeutral(ch.j2,connectorY2),
  canAcquireElectromagnetismPreservingVev:hasNeutral(ch.j2,connectorY2)
}));
const viable=channels.filter(x=>x.hasNeutralComponent);
const singlet=channels.find(x=>x.weakDim===1);
const triplet=channels.find(x=>x.weakDim===3);
const hermitianChannels=[
  {weakDim:1,Y:0,hasNeutralComponent:true,field:"neutral singlet"},
  {weakDim:3,Y:0,hasNeutralComponent:true,field:"real triplet xi"}
];
const rank=matrix=>{
  const a=matrix.map(r=>r.map(Number));
  let row=0;
  for(let col=0;col<(a[0]?.length||0)&&row<a.length;col++){
    const pivot=a.findIndex((r,i)=>i>=row&&Math.abs(r[col])>1e-9);
    if(pivot<0)continue;
    [a[row],a[pivot]]=[a[pivot],a[row]];
    const p=a[row][col];
    a[row]=a[row].map(x=>x/p);
    for(let i=0;i<a.length;i++)if(i!==row){
      const f=a[i][col];
      a[i]=a[i].map((x,j)=>x-f*a[row][j]);
    }
    row++;
  }
  return row;
};
// Phases are (theta_C,theta_D,theta_Delta). Hypercharge gauge direction is
// (1,1,2). The potential constraints are orthogonal to it.
const gauge=[1,1,2];
const holomorphicConstraint=[1,1,-1];
const hermitianConstraint=[-1,1,0];
const dot=(a,b)=>a.reduce((n,x,i)=>n+x*b[i],0);
const outer=a=>a.map(x=>a.map(y=>x*y));
const physicalPhaseCount=constraints=>
  3-rank([gauge])-rank(constraints);
const report={
  protocol:"minimal-higgs-block-connector/2",
  input:{
    hC:"(2,Y=+1/2)",
    hD:"(2,Y=+1/2)",
    product:"(1_a + 3_s,Y=+1)",
    requiredConnectorHypercharge:"Y=-1"
  },
  channels,
  viableNeutralVevChannels:viable.map(x=>({weakDim:x.weakDim,Y:x.connectorY})),
  minimalNeutralVevConnector:viable.length?
    {weakDim:viable[0].weakDim,Y:viable[0].connectorY}:null,
  hermitianChannel:{
    product:"h_C^dagger h_D transforms through (1+3,Y=0)",
    connectorOptions:hermitianChannels,
    fullLockField:"xi ~ (3,Y=0)",
    invariant:"mu_xi h_C^dagger tau^a h_D xi^a + h.c."
  },
  fullLockMatch:{
    holomorphicField:"Delta^dagger",
    holomorphicRepresentation:"(3,Y=-1)",
    holomorphicInvariant:"mu_Delta h_C^T i sigma_2 Delta^dagger h_D + h.c.",
    hyperchargeSum:higgs.y2/2+higgs.y2/2+connectorY2/2,
    hermitianField:"xi",
    hermitianRepresentation:"(3,Y=0)",
    hermitianInvariant:"mu_xi h_C^dagger tau^a h_D xi^a + h.c.",
    combinedEffect:"The bitriplet supplies independent holomorphic and hermitian phase constraints."
  },
  phaseAudit:{
    fields:"(theta_C,theta_D,theta_Delta); xi is real",
    gaugeDirection:gauge,
    holomorphicConstraint,
    hermitianConstraint,
    orthogonality:{
      gaugeHolomorphic:dot(gauge,holomorphicConstraint),
      gaugeHermitian:dot(gauge,hermitianConstraint),
      holomorphicHermitian:dot(holomorphicConstraint,hermitianConstraint)
    },
    reducedHessian:{
      form:"A u u^T + B v v^T with u=(1,1,-1), v=(-1,1,0)",
      holomorphicOuter:outer(holomorphicConstraint),
      hermitianOuter:outer(hermitianConstraint),
      euclideanEigenvalues:["3A","2B","0"],
      kernel:"hypercharge direction (1,1,2)"
    },
    physicalContinuousPhases:{
      holomorphicOnly:physicalPhaseCount([holomorphicConstraint]),
      bothTripletPortals:physicalPhaseCount([holomorphicConstraint,hermitianConstraint])
    }
  },
  conclusions:[
    "For the holomorphic h_C h_D channel, the singlet connector is charged and the complex triplet is the smallest neutral-vev option.",
    "Delta^dagger alone constrains theta_C+theta_D-theta_Delta but leaves one physical continuous phase.",
    "The hermitian h_C^dagger h_D channel admits a neutral singlet or real triplet; the full lock supplies xi.",
    "The combined xi and Delta portals remove all continuous scalar phases after the hypercharge gauge direction is quotiented.",
    "Gauge representation theory permits both portals but determines neither coefficient."
  ]
};
report.passed=connectorY2===-2&&
  !singlet.hasNeutralComponent&&triplet.hasNeutralComponent&&
  viable.length===1&&viable[0].weakDim===3&&
  report.fullLockMatch.hyperchargeSum===0&&
  report.phaseAudit.physicalContinuousPhases.holomorphicOnly===1&&
  report.phaseAudit.physicalContinuousPhases.bothTripletPortals===0&&
  Object.values(report.phaseAudit.orthogonality).every(x=>x===0);
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
