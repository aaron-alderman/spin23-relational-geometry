#!/usr/bin/env node

const blocks=[
  {id:"O1",c:"1",w:"1",dc:1,dw:1,y6:0},
  {id:"O2",c:"3",w:"1",dc:3,dw:1,y6:2},
  {id:"H", c:"1",w:"2",dc:1,dw:2,y6:3},
  {id:"C", c:"1",w:"1",dc:1,dw:1,y6:6},
  {id:"R", c:"1",w:"1",dc:1,dw:1,y6:0}
];
const idx=Object.fromEntries(blocks.map((x,i)=>[x.id,i]));
const signs=Array.from({length:32},(_,n)=>blocks.map((_,i)=>(n>>i)&1?-1:1));
const higgs=[["O1","H"],["H","C"],["R","H"]];
const leptons=higgs.map(([t,s])=>[s,t]);
const grade=(l,r,t,s)=>l[idx[t]]*r[idx[s]];
const separates=(l,r)=>higgs.every(([t,s])=>grade(l,r,t,s)===1)&&
  leptons.every(([t,s])=>grade(l,r,t,s)===-1);
const dual=c=>c==="3"?"3bar":c==="3bar"?"3":c;

const irreps=(t,s)=>{
  const y6=s.y6-t.y6;
  if(t.c==="3"&&s.c==="3")return [
    {c:"1",w:"1",dc:1,dw:1,y6},
    {c:"8",w:"1",dc:8,dw:1,y6}
  ];
  if(t.w==="2"&&s.w==="2")return [
    {c:"1",w:"1",dc:1,dw:1,y6},
    {c:"1",w:"3",dc:1,dw:3,y6}
  ];
  return [{
    c:t.c==="1"?dual(s.c):t.c,
    w:t.w==="1"?s.w:t.w,
    dc:t.c==="1"?s.dc:t.dc,
    dw:t.w==="1"?s.dw:t.dw,
    y6
  }];
};

const anomaly=(l,r,wanted)=>{
  const a={SU3cubed:0,SU3squaredU1:0,SU2squaredU1:0,gravitySquaredU1:0,U1cubed:0,weakDoublets:0};
  const multiplicities={};
  for(const t of blocks)for(const s of blocks){
    if(grade(l,r,t.id,s.id)!==wanted)continue;
    for(const q of irreps(t,s)){
      const k=`${q.c}|${q.w}|${q.y6}`;
      multiplicities[k]=(multiplicities[k]||0)+1;
      const A3=q.c==="3"?1:q.c==="3bar"?-1:0;
      const T3=q.c==="3"||q.c==="3bar"?1:q.c==="8"?6:0;
      const T2=q.w==="2"?1:q.w==="3"?4:0;
      a.SU3cubed+=A3*q.dw;
      a.SU3squaredU1+=T3*q.dw*q.y6;
      a.SU2squaredU1+=T2*q.dc*q.y6;
      a.gravitySquaredU1+=q.dc*q.dw*q.y6;
      a.U1cubed+=q.dc*q.dw*q.y6**3;
      if(q.w==="2")a.weakDoublets+=q.dc;
    }
  }
  const localZero=["SU3cubed","SU3squaredU1","SU2squaredU1","gravitySquaredU1","U1cubed"].every(k=>a[k]===0);
  return {anomalyNumerators:a,globalSU2Even:a.weakDoublets%2===0,localZero,multiplicities};
};
const containsOneGenerationTypes=a=>[
  "3|2|1",       // Q
  "3bar|1|-4",   // u^c
  "3bar|1|2",    // d^c
  "1|2|-3",      // L
  "1|1|6"        // e^c
].every(k=>(a.multiplicities[k]||0)>0);

const solutions=[];
for(const l of signs)for(const r of signs)if(separates(l,r)){
  const minus=anomaly(l,r,-1);
  const plus=anomaly(l,r,1);
  solutions.push({
    left:Object.fromEntries(blocks.map((b,i)=>[b.id,l[i]])),
    right:Object.fromEntries(blocks.map((b,i)=>[b.id,r[i]])),
    minus,plus,
    minusContainsOneGenerationTypes:containsOneGenerationTypes(minus),
    plusContainsOneGenerationTypes:containsOneGenerationTypes(plus),
    minusFullyAnomalyFree:minus.localZero&&minus.globalSU2Even,
    plusFullyAnomalyFree:plus.localZero&&plus.globalSU2Even
  });
}

const report={
  protocol:"furey-oriented-sector-anomalies/1",
  convention:"Every block map in an eigenspace is provisionally treated as a left-handed Weyl multiplet; Y6=6(Y_source-Y_target). This is a stress test, not a particle assignment.",
  orientationSolutionCount:solutions.length,
  anomalyFreeCounts:{
    minus:solutions.filter(x=>x.minusFullyAnomalyFree).length,
    plus:solutions.filter(x=>x.plusFullyAnomalyFree).length
  },
  containsOneGenerationTypeCounts:{
    minus:solutions.filter(x=>x.minusContainsOneGenerationTypes).length,
    plus:solutions.filter(x=>x.plusContainsOneGenerationTypes).length
  },
  distinctMinusAnomalies:[...new Set(solutions.map(x=>JSON.stringify(x.minus.anomalyNumerators)))].map(JSON.parse),
  distinctPlusAnomalies:[...new Set(solutions.map(x=>JSON.stringify(x.plus.anomalyNumerators)))].map(JSON.parse),
  representative:solutions[0],
  complementChecks:{
    localAnomaliesCancelInFullEndomorphism:solutions.every(x=>
      ["SU3cubed","SU3squaredU1","SU2squaredU1","gravitySquaredU1","U1cubed"]
        .every(k=>x.minus.anomalyNumerators[k]+x.plus.anomalyNumerators[k]===0)),
    fullWeakDoubletCountEven:solutions.every(x=>
      (x.minus.anomalyNumerators.weakDoublets+x.plus.anomalyNumerators.weakDoublets)%2===0)
  },
  conclusion:"Neither complete eigenspace of any orientation-selecting LXR involution is anomaly-free when provisionally treated as a fermion module. Complementing the two eigenspaces restores the vectorlike anomaly cancellation of the full endomorphism algebra."
};
report.passed=solutions.length===16&&
  report.anomalyFreeCounts.minus===0&&report.anomalyFreeCounts.plus===0&&
  report.complementChecks.localAnomaliesCancelInFullEndomorphism&&
  report.complementChecks.fullWeakDoubletCountEven;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
