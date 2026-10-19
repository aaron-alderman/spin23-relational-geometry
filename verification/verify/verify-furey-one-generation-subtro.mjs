#!/usr/bin/env node

const blocks=[
  {id:"O1",dim:1},
  {id:"O2",dim:3},
  {id:"H",dim:2},
  {id:"C",dim:1},
  {id:"R",dim:1}
];
const dim=Object.fromEntries(blocks.map(x=>[x.id,x.dim]));
const edge=(target,source,label)=>({target,source,label});
const fixed={
  Q:edge("O2","H","Q"),
  uc:edge("C","O2","u^c")
};
const choices={
  dc:[edge("O1","O2","d^c"),edge("R","O2","d^c")],
  L:[edge("H","O1","L"),edge("C","H","L"),edge("H","R","L")],
  ec:[edge("O1","C","e^c"),edge("R","C","e^c")]
};
const key=e=>e.target+"<-"+e.source;
const parse=k=>{const [target,source]=k.split("<-");return{target,source};};

const ternaryClosure=input=>{
  const set=new Set(input.map(key));
  let changed=true;
  while(changed){
    changed=false;
    const es=[...set].map(parse);
    for(const x of es)for(const y of es)for(const z of es){
      // E_ab E_cd^dagger E_ef != 0 iff b=d and c=e; result E_af.
      if(x.source===y.source&&y.target===z.target){
        const out=x.target+"<-"+z.source;
        if(!set.has(out)){set.add(out);changed=true;}
      }
    }
  }
  return set;
};
const ordinaryClosed=set=>{
  const es=[...set].map(parse);
  return es.every(x=>es.every(y=>
    x.source!==y.target||set.has(x.target+"<-"+y.source)));
};
const daggerClosed=set=>[...set].every(k=>{
  const e=parse(k);return set.has(e.source+"<-"+e.target);
});
const complexDimension=set=>[...set].reduce((n,k)=>{
  const e=parse(k);return n+dim[e.target]*dim[e.source];
},0);

const candidates=[];
for(const dc of choices.dc)for(const L of choices.L)for(const ec of choices.ec){
  const selected=[fixed.Q,fixed.uc,dc,L,ec];
  const initial=new Set(selected.map(key));
  const closure=ternaryClosure(selected);
  const added=[...closure].filter(k=>!initial.has(k)).sort();
  candidates.push({
    choice:{dc:key(dc),L:key(L),ec:key(ec)},
    selected:[...initial].sort(),
    exactTRO:added.length===0,
    closureBlockCount:closure.size,
    closureComplexDimension:complexDimension(closure),
    added,
    ordinaryClosed:ordinaryClosed(initial),
    daggerClosed:daggerClosed(initial)
  });
}

// Standard one-generation anomaly numerators in Y6=6Y units.
const oneGenerationAnomalies={
  SU3cubed:2-1-1,
  SU3squaredU1:2*1-4+2,
  SU2squaredU1:3*1-3,
  gravitySquaredU1:6*1+3*(-4)+3*2+2*(-3)+6,
  U1cubed:6*1**3+3*(-4)**3+3*2**3+2*(-3)**3+6**3,
  weakDoublets:3+1
};
const anomalyFree=Object.entries(oneGenerationAnomalies)
  .every(([k,v])=>k==="weakDoublets"?v%2===0:v===0);
const exact=candidates.filter(x=>x.exactTRO);
for(const c of exact){
  const dcTarget=c.choice.dc.split("<-")[0];
  const leptonSource=c.choice.L.split("<-")[1];
  const ecTarget=c.choice.ec.split("<-")[0];
  c.neutralTopology=leptonSource===dcTarget?
    "L-source=dc-target":
    leptonSource===ecTarget?"L-source=ec-target":"other";
}
const closureSignatures={};
for(const c of candidates){
  const signature=c.closureBlockCount+" blocks/"+c.closureComplexDimension+" complex dimensions";
  closureSignatures[signature]=(closureSignatures[signature]||0)+1;
}

const report={
  protocol:"furey-one-generation-subtro/1",
  candidateCount:candidates.length,
  fixedOrigins:{Q:key(fixed.Q),uc:key(fixed.uc)},
  choiceMultiplicities:{dc:choices.dc.length,L:choices.L.length,ec:choices.ec.length},
  oneGenerationAnomalies,
  anomalyFree,
  exactTROCount:exact.length,
  exactTROChoices:exact.map(x=>x.choice),
  exactTROTopologyCounts:Object.fromEntries(
    [...new Set(exact.map(x=>x.neutralTopology))]
      .map(k=>[k,exact.filter(x=>x.neutralTopology===k).length])
  ),
  ordinaryClosedCount:candidates.filter(x=>x.ordinaryClosed).length,
  daggerClosedCount:candidates.filter(x=>x.daggerClosed).length,
  closureSignatures,
  candidates,
  conclusion:exact.length?
    "At least one exact one-generation block choice is already a gauge-stable anomaly-free TRO without its dagger mirrors.":
    "No exact one-generation block choice is ternary closed; every candidate requires additional generated block sectors."
};
report.passed=candidates.length===12&&anomalyFree&&exact.length===4&&
  exact.every(x=>x.closureComplexDimension===15)&&
  report.exactTROTopologyCounts["L-source=dc-target"]===2&&
  report.exactTROTopologyCounts["L-source=ec-target"]===2&&
  candidates.every(x=>!x.ordinaryClosed&&!x.daggerClosed);
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
