#!/usr/bin/env node

const edge=(target,source,name)=>({target,source,name});
const dagger=e=>edge(e.source,e.target,e.name+"^dagger");
const higgs=[
  edge("O1","H","h_O1"),
  edge("H","C","h_C"),
  edge("R","H","h_R")
];
const Q=edge("O2","H","Q");
const uc=edge("C","O2","u^c");
const exactMatter=[
  {dc:edge("O1","O2","d^c"),L:edge("H","O1","L"),ec:edge("R","C","e^c")},
  {dc:edge("O1","O2","d^c"),L:edge("H","R","L"),ec:edge("R","C","e^c")},
  {dc:edge("R","O2","d^c"),L:edge("H","O1","L"),ec:edge("O1","C","e^c")},
  {dc:edge("R","O2","d^c"),L:edge("H","R","L"),ec:edge("O1","C","e^c")}
];
const key=e=>e.target+"<-"+e.source;

// Three directed arrows admit a nonzero cyclic matrix trace exactly when
// every vertex has equal in/out degree and the nontrivial support is connected.
const cyclic=edges=>{
  const vertices=[...new Set(edges.flatMap(e=>[e.source,e.target]))];
  const balanced=vertices.every(v=>
    edges.filter(e=>e.source===v).length===edges.filter(e=>e.target===v).length);
  if(!balanced)return false;
  const seen=new Set([vertices[0]]);
  let changed=true;
  while(changed){
    changed=false;
    for(const e of edges)if(seen.has(e.source)||seen.has(e.target)){
      if(!seen.has(e.source)){seen.add(e.source);changed=true;}
      if(!seen.has(e.target)){seen.add(e.target);changed=true;}
    }
  }
  return seen.size===vertices.length;
};

const results=exactMatter.map((m,i)=>{
  const up=higgs.filter(h=>cyclic([Q,uc,h])).map(h=>h.name);
  const down=higgs.filter(h=>cyclic([Q,m.dc,dagger(h)])).map(h=>h.name);
  const lepton=higgs.filter(h=>cyclic([m.L,m.ec,dagger(h)])).map(h=>h.name);
  const allClose=up.length>0&&down.length>0&&lepton.length>0;
  const union=[...new Set([...up,...down,...lepton])];
  const dcTarget=m.dc.target,Lsource=m.L.source,ecTarget=m.ec.target;
  return {
    solution:i+1,
    matter:{dc:key(m.dc),L:key(m.L),ec:key(m.ec)},
    topology:Lsource===dcTarget?"L-source=dc-target":"L-source=ec-target",
    closingPositiveHiggs:{up,down,chargedLepton:lepton},
    allThreeYukawaCyclesClose:allClose,
    minimumDistinctPositiveHiggsMaps:allClose?union.length:null,
    requiredPositiveHiggsMaps:allClose?union:[]
  };
});
const viable=results.filter(x=>x.allThreeYukawaCyclesClose);
const report={
  protocol:"furey-matter-higgs-yukawa-cycles/1",
  interactionRule:"A cubic block interaction is admitted only when the three directed block maps form a composable cycle with nonzero matrix trace.",
  hyperchargeRule:"Use a positive-Y Higgs map for Q u^c H and the dagger of a positive-Y map for Q d^c H^dagger and L e^c H^dagger.",
  matterTROCount:results.length,
  fullyClosingCount:viable.length,
  fullyClosingTopologies:Object.fromEntries(
    [...new Set(viable.map(x=>x.topology))]
      .map(k=>[k,viable.filter(x=>x.topology===k).length])
  ),
  singleHiggsMapSolutions:viable.filter(x=>x.minimumDistinctPositiveHiggsMaps===1).length,
  twoHiggsMapSolutions:viable.filter(x=>x.minimumDistinctPositiveHiggsMaps===2).length,
  results,
  conclusion:"Cyclic block composition selects the L-source=e^c-target topology. It closes all three charged Yukawa types only with two distinct positive-hypercharge Higgs block maps; no single block-local Higgs serves all three."
};
report.passed=results.length===4&&viable.length===2&&
  viable.every(x=>x.topology==="L-source=ec-target"&&
    x.minimumDistinctPositiveHiggsMaps===2)&&
  report.singleHiggsMapSolutions===0;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
