#!/usr/bin/env node

const blocks=[
  {id:"O1",dim:1},
  {id:"O2",dim:3},
  {id:"H",dim:2},
  {id:"C",dim:1},
  {id:"R",dim:1}
];
const idx=Object.fromEntries(blocks.map((x,i)=>[x.id,i]));
const signs=Array.from({length:32},(_,n)=>blocks.map((_,i)=>(n>>i)&1?-1:1));
const higgs=[["O1","H"],["H","C"],["R","H"]]; // [target,source]
const leptons=higgs.map(([t,s])=>[s,t]);
const grade=(l,r,t,s)=>l[idx[t]]*r[idx[s]];
const separates=(l,r)=>higgs.every(([t,s])=>grade(l,r,t,s)===1)&&
  leptons.every(([t,s])=>grade(l,r,t,s)===-1);

const solutions=[];
for(const l of signs)for(const r of signs)if(separates(l,r))solutions.push({l,r});

const positions=(l,r,wanted)=>{
  const out=[];
  for(const t of blocks)for(const s of blocks)
    if(grade(l,r,t.id,s.id)===wanted)out.push([t.id,s.id]);
  return out;
};
const key=([t,s])=>t+"<-"+s;
const has=(set,t,s)=>set.has(t+"<-"+s);

const audit=(sol,wanted)=>{
  const ps=positions(sol.l,sol.r,wanted);
  const set=new Set(ps.map(key));
  let ordinaryClosed=true,ternaryClosed=true,daggerClosed=true;
  for(const [a,b] of ps){
    if(!has(set,b,a))daggerClosed=false;
    for(const [c,d] of ps){
      // E_ab E_cd is nonzero exactly when b=c, producing E_ad.
      if(b===c&&!has(set,a,d))ordinaryClosed=false;
      for(const [e,f] of ps){
        // E_ab E_cd^dagger E_ef is nonzero when b=d and c=e,
        // producing E_af.
        if(b===d&&c===e&&!has(set,a,f))ternaryClosed=false;
      }
    }
  }
  const dim=ps.reduce((sum,[t,s])=>
    sum+blocks[idx[t]].dim*blocks[idx[s]].dim,0);
  return {blockCount:ps.length,complexDimension:dim,ordinaryClosed,ternaryClosed,daggerClosed};
};

const rows=solutions.map((sol,i)=>({
  solution:i+1,
  plus:audit(sol,1),
  minus:audit(sol,-1)
}));

const report={
  protocol:"furey-oriented-bimodule-closure/1",
  orientationSolutionCount:solutions.length,
  closureCounts:{
    plusOrdinary:rows.filter(x=>x.plus.ordinaryClosed).length,
    minusOrdinary:rows.filter(x=>x.minus.ordinaryClosed).length,
    plusTernary:rows.filter(x=>x.plus.ternaryClosed).length,
    minusTernary:rows.filter(x=>x.minus.ternaryClosed).length,
    plusDagger:rows.filter(x=>x.plus.daggerClosed).length,
    minusDagger:rows.filter(x=>x.minus.daggerClosed).length
  },
  dimensionSignatures:[...new Set(rows.map(x=>x.plus.complexDimension+"+"+x.minus.complexDimension))],
  representative:rows[0],
  theorem:"For grade g(t,s)=l_t r_s, each eigenspace is the union of two complete source-target rectangles. Therefore X Y^dagger Z remains in the same eigenspace even though ordinary products and adjoints need not do so.",
  linkingAlgebra:"M is a ternary ring of operators. A_L=span(M M^dagger), A_R=span(M^dagger M), and [[A_L,M],[M^dagger,A_R]] is the natural dagger-closed associative completion.",
  conclusion:"All sixteen orientation-selecting eigenspaces are ternary closed. The surviving structure is an exact operator bimodule/TRO, not an associative particle subalgebra."
};
report.passed=solutions.length===16&&
  rows.every(x=>x.plus.ternaryClosed&&x.minus.ternaryClosed)&&
  report.closureCounts.plusDagger===0&&report.closureCounts.minusDagger===0;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
