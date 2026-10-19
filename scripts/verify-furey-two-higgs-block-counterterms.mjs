#!/usr/bin/env node

const ops={
  c:{target:"H",source:"C",charge:1,label:"h_C"},
  C:{target:"C",source:"H",charge:-1,label:"h_C^dagger"},
  d:{target:"D",source:"H",charge:1,label:"h_D"},
  D:{target:"H",source:"D",charge:-1,label:"h_D^dagger"}
};
const multiply=(x,y)=>x.source===y.target?
  {target:x.target,source:y.source}:null;
const traceWord=word=>{
  let product=ops[word[0]];
  for(let i=1;i<word.length;i++){
    product=multiply(product,ops[word[i]]);
    if(!product)return false;
  }
  return product.target===product.source;
};
const permutations=arr=>{
  if(arr.length===0)return[[]];
  const out=[];
  for(let i=0;i<arr.length;i++){
    const rest=arr.slice(0,i).concat(arr.slice(i+1));
    for(const p of permutations(rest))out.push([arr[i],...p]);
  }
  return [...new Map(out.map(x=>[x.join(""),x])).values()];
};
const signature=word=>{
  const counts={c:0,C:0,d:0,D:0};
  for(const x of word)counts[x]++;
  return "c"+counts.c+"C"+counts.C+"d"+counts.d+"D"+counts.D;
};
const allWords=(alphabet,length)=>{
  let words=[[]];
  for(let i=0;i<length;i++)words=words.flatMap(w=>alphabet.map(x=>[...w,x]));
  return words;
};

const quadratic={};
for(const word of allWords(Object.keys(ops),2)){
  if(word.reduce((n,x)=>n+ops[x].charge,0)!==0)continue;
  const s=signature(word);
  if(!quadratic[s])quadratic[s]={signature:s,words:[],traceWords:[]};
  quadratic[s].words.push(word.join(""));
  if(traceWord(word))quadratic[s].traceWords.push(word.join(""));
}
const quartic={};
for(const word of allWords(Object.keys(ops),4)){
  if(word.reduce((n,x)=>n+ops[x].charge,0)!==0)continue;
  const s=signature(word);
  if(!quartic[s])quartic[s]={signature:s,traceWords:new Set()};
  if(traceWord(word))quartic[s].traceWords.add(word.join(""));
}
for(const q of Object.values(quartic))q.traceWords=[...q.traceWords].sort();
const allowedQuadratic=Object.values(quadratic).filter(x=>x.traceWords.length);
const forbiddenQuadratic=Object.values(quadratic).filter(x=>!x.traceWords.length);
const allowedQuartic=Object.values(quartic).filter(x=>x.traceWords.length);
const forbiddenQuartic=Object.values(quartic).filter(x=>!x.traceWords.length);

const report={
  protocol:"furey-two-higgs-block-counterterms/1",
  convention:"c=h_C, d=h_D and capitals denote dagger. A monomial is admitted when at least one ordering has a nonzero cyclic block trace.",
  allowedQuadratic,
  forbiddenQuadratic,
  allowedQuartic,
  forbiddenQuarticSignatures:forbiddenQuartic.map(x=>x.signature).sort(),
  structuralConsequences:{
    crossMassForbidden:!(allowedQuadratic.some(x=>x.signature==="c0C1d1D0"||x.signature==="c1C0d0D1")),
    selfMassesAllowed:["c1C1d0D0","c0C0d1D1"].every(s=>allowedQuadratic.some(x=>x.signature===s)),
    mixedNormQuarticAllowed:allowedQuartic.some(x=>x.signature==="c1C1d1D1"),
    phaseSensitiveQuarticsForbidden:[
      "c0C2d2D0","c2C0d0D2",
      "c1C2d1D0","c2C1d0D1",
      "c0C1d2D1","c1C0d1D2"
    ].every(s=>!allowedQuartic.some(x=>x.signature===s))
  },
  interpretation:"Strict block-trace locality permits separate masses, separate self quartics and a mixed norm quartic, but forbids quadratic mixing and all quartics odd or phase-sensitive in the two block components. A nonzero diagonal identification is not dynamically selected by these counterterms.",
  risk:"If both independent doublets acquire vevs, the absence of phase-sensitive mixing leaves an accidental relative phase symmetry and hence a CP-odd massless mode unless another interaction, gauge field or soft source breaks it."
};
report.passed=report.structuralConsequences.crossMassForbidden&&
  report.structuralConsequences.selfMassesAllowed&&
  report.structuralConsequences.mixedNormQuarticAllowed&&
  report.structuralConsequences.phaseSensitiveQuarticsForbidden;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
