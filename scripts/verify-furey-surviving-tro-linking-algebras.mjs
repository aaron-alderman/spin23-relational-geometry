#!/usr/bin/env node

const dims={O1:1,O2:3,H:2,C:1,R:1};
const edge=(target,source,name)=>({target,source,name});
const solutions=[
  {
    id:"A",
    D:"O1",E:"R",
    edges:[
      edge("O2","H","Q"),
      edge("C","O2","u^c"),
      edge("O1","O2","d^c"),
      edge("H","R","L"),
      edge("R","C","e^c")
    ]
  },
  {
    id:"B",
    D:"R",E:"O1",
    edges:[
      edge("O2","H","Q"),
      edge("C","O2","u^c"),
      edge("R","O2","d^c"),
      edge("H","O1","L"),
      edge("O1","C","e^c")
    ]
  }
];
const edgeKey=e=>e.target+"<-"+e.source+":"+e.name;
const swapNeutral=x=>x==="O1"?"R":x==="R"?"O1":x;

const analyze=sol=>{
  // Connected components of the bipartite target/source support graph.
  const nodes=[];
  const adjacency=new Map();
  const addNode=(side,b)=>{
    const k=side+":"+b;
    if(!adjacency.has(k)){adjacency.set(k,new Set());nodes.push(k);}
    return k;
  };
  for(const e of sol.edges){
    const l=addNode("L",e.target),r=addNode("R",e.source);
    adjacency.get(l).add(r);adjacency.get(r).add(l);
  }
  const seen=new Set(),components=[];
  for(const start of nodes)if(!seen.has(start)){
    const stack=[start],component=[];
    seen.add(start);
    while(stack.length){
      const n=stack.pop();component.push(n);
      for(const m of adjacency.get(n))if(!seen.has(m)){seen.add(m);stack.push(m);}
    }
    const left=component.filter(x=>x.startsWith("L:")).map(x=>x.slice(2)).sort();
    const right=component.filter(x=>x.startsWith("R:")).map(x=>x.slice(2)).sort();
    const leftDim=left.reduce((n,b)=>n+dims[b],0);
    const rightDim=right.reduce((n,b)=>n+dims[b],0);
    components.push({left,right,leftDim,rightDim,linkingMatrixSize:leftDim+rightDim});
  }
  components.sort((a,b)=>b.linkingMatrixSize-a.linkingMatrixSize||
    a.left.join(",").localeCompare(b.left.join(",")));
  const leftAlgebraDimension=components.reduce((n,c)=>n+c.leftDim**2,0);
  const rightAlgebraDimension=components.reduce((n,c)=>n+c.rightDim**2,0);
  const moduleDimension=sol.edges.reduce((n,e)=>n+dims[e.target]*dims[e.source],0);
  const linkingAlgebraDimension=components.reduce((n,c)=>n+c.linkingMatrixSize**2,0);
  const sourceBlocks=new Set(sol.edges.map(e=>e.source));
  const targetBlocks=new Set(sol.edges.map(e=>e.target));
  const rightAnnihilator=Object.keys(dims).filter(b=>!sourceBlocks.has(b));
  const leftAnnihilator=Object.keys(dims).filter(b=>!targetBlocks.has(b));
  return {
    id:sol.id,D:sol.D,E:sol.E,
    edges:sol.edges.map(edgeKey).sort(),
    moduleDimension,
    components,
    leftAlgebraDimension,
    rightAlgebraDimension,
    linkingAlgebraDimension,
    linkingSimpleFactors:components.map(c=>"M"+c.linkingMatrixSize+"(C)"),
    linkingCenterDimension:components.length,
    rightAnnihilator,
    leftAnnihilator,
    distinguishedRoles:{
      dTargetIsRightAnnihilator:rightAnnihilator.length===1&&rightAnnihilator[0]===sol.D,
      eTargetIsLeptonSource:sol.edges.some(e=>e.name==="L"&&e.source===sol.E)
    }
  };
};
const analyses=solutions.map(analyze);
const swappedA=solutions[0].edges.map(e=>edge(
  swapNeutral(e.target),swapNeutral(e.source),e.name
)).map(edgeKey).sort();
const unitaryEquivalent=JSON.stringify(swappedA)===
  JSON.stringify(solutions[1].edges.map(edgeKey).sort());
const sameFactorization=JSON.stringify(analyses[0].linkingSimpleFactors)===
  JSON.stringify(analyses[1].linkingSimpleFactors);

const report={
  protocol:"furey-surviving-tro-linking-algebras/1",
  solutionCount:solutions.length,
  analyses,
  commonStructure:{
    leftAlgebra:"M3(C) + M2(C) + M2(C) + C",
    rightAlgebra:"M3(C) + M2(C) + C + C on its seven-dimensional support",
    linkingAlgebra:"M5(C) + M5(C) + M3(C) + M2(C)",
    moduleComplexDimension:15,
    linkingComplexDimension:63,
    centerDimension:4
  },
  neutralSwap:{
    mapsAtoB:unitaryEquivalent,
    sameFactorization,
    conclusion:"The block incidence and linking-algebra invariants distinguish the relational roles D and E, but not the absolute labels O1 and R. The two solutions are conjugate under O1<->R."
  },
  conclusion:"The linking algebra canonically marks D as the unused right-source face and E as the e^c target/L source, but an additional nested-algebra or boundary datum is required to decide whether D=O1 or D=R."
};
report.passed=analyses.every(a=>
  a.moduleDimension===15&&a.leftAlgebraDimension===18&&
  a.rightAlgebraDimension===15&&a.linkingAlgebraDimension===63&&
  a.linkingCenterDimension===4&&
  a.distinguishedRoles.dTargetIsRightAnnihilator&&
  a.distinguishedRoles.eTargetIsLeptonSource)&&
  unitaryEquivalent&&sameFactorization;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
