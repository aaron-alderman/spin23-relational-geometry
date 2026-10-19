import assert from 'node:assert/strict';

const names=['O2_1','O2_2','O2_3','H_4','H_5','C','D','E'];
const index=new Map(names.map((x,i)=>[x,i]));
const edges=[];
for(let c=1;c<=3;c++){
  edges.push(['O2_'+c,'H_4','d_'+c]);
  edges.push(['O2_'+c,'H_5','u_'+c]);
  edges.push(['C','O2_'+c,'uc_'+c]);
  edges.push(['D','O2_'+c,'dc_'+c]);
}
edges.push(['H_4','E','nu'],['H_5','E','e'],['E','C','ec'],['E','D','nuc']);
const edgeSet=new Set(edges.map(([l,r])=>index.get(l)+'|'+index.get(r)));

const permutations=[];
const walk=(prefix,remaining)=>{
  if(!remaining.length){permutations.push(prefix);return;}
  for(let i=0;i<remaining.length;i++)walk([...prefix,remaining[i]],remaining.filter((_,j)=>j!==i));
};
walk([],Array.from({length:8},(_,i)=>i));
const preservesSupport=p=>edges.every(([l,r])=>edgeSet.has(p[index.get(l)]+'|'+p[index.get(r)]));
const automorphisms=permutations.filter(preservesSupport);

// zeta=exp(pi i/3), represented exactly in Z[omega] with omega^2+omega+1=0.
const cyclotomic=[[1,0],[1,1],[0,1],[-1,0],[0,-1],[-1,-1]];
const addPair=([a,b],[c,d])=>[a+c,b+d];
const eqPair=([a,b],[c,d])=>a===c&&b===d;
const zeroPair=()=>[0,0];
const key=(row,col)=>row+'|'+col;
const color=[1,2,0,3,4,5,6,7];
const color2=color.map(i=>color[i]);
const conjugateEntry=(row,col,k)=>{
  if(k===0)return [row,col];
  const ck=k===1?color:color2;
  return [ck[row],ck[col]];
};

const involutive=p=>p.every((x,i)=>p[x]===i);
const involutiveAutomorphisms=automorphisms.filter(involutive);

const supportMap=p=>new Set(Array.from({length:8},(_,col)=>key(p[col],col)));
const conjugateSupport=(S,k)=>new Set([...S].map(entry=>{
  const [row,col]=entry.split('|').map(Number);
  return key(...conjugateEntry(row,col,k));
}));
const supportObstructions=automorphisms.map(p=>{
  const S=supportMap(p), orbit=[S,conjugateSupport(S,1),conjugateSupport(S,2)];
  const distinct=new Set(orbit.map(x=>[...x].sort().join(';'))).size;
  const counts=new Map();
  for(const T of orbit)for(const entry of T)counts.set(entry,(counts.get(entry)??0)+1);
  const singletonCells=[...counts].filter(([,n])=>n===1).map(([x])=>x);
  const fixedCells=[...S].filter(entry=>{
    const [row,col]=entry.split('|').map(Number);
    return color[row]===row&&color[col]===col;
  });
  return {distinct,singletonCells,fixedCells};
});
// If the three supports differ, a cell occurring only once cannot cancel for
// any nonzero phases.  If the support is fixed, at least one cell fixed by C
// contributes the same nonzero phase three times.  This excludes all U(1)
// monomial lifts, independently of order or the chosen roots of unity.
assert.ok(supportObstructions.every(x=>
  x.distinct===3 ? x.singletonCells.length>0 : x.fixedCells.length>0
));

const phaseAssignments=p=>{
  const cycles=[];
  const seen=new Set();
  for(let i=0;i<8;i++)if(!seen.has(i)){
    const j=p[i];
    seen.add(i);seen.add(j);
    cycles.push(i===j?[i]:[i,j]);
  }
  const out=[];
  const recur=(n,exponents)=>{
    if(n===cycles.length){out.push(exponents.slice());return;}
    const cyc=cycles[n];
    if(cyc.length===1){
      for(const e of [0,3]){exponents[cyc[0]]=e;recur(n+1,exponents);}
    }else{
      for(let e=0;e<6;e++){
        exponents[cyc[0]]=e;
        exponents[cyc[1]]=(6-e)%6;
        recur(n+1,exponents);
      }
    }
  };
  recur(0,Array(8).fill(0));
  return out;
};

const matrixMap=(p,exponents)=>new Map(Array.from({length:8},(_,col)=>[
  key(p[col],col),cyclotomic[exponents[col]]
]));
const conjugateMap=(M,k)=>{
  const out=new Map();
  for(const [entry,value] of M){
    const [row,col]=entry.split('|').map(Number);
    const [r,c]=conjugateEntry(row,col,k);
    out.set(key(r,c),value);
  }
  return out;
};
const mapKey=M=>[...M.entries()].sort().map(([k,v])=>k+':'+v.join(',')).join(';');
const zeroSum=maps=>{
  const total=new Map();
  for(const M of maps)for(const [k,v] of M)total.set(k,addPair(total.get(k)??zeroPair(),v));
  return [...total.values()].every(v=>eqPair(v,[0,0]));
};
const isReal=exponents=>exponents.every(e=>e===0||e===3);

let liftsTested=0;
const survivors=[];
for(const p of involutiveAutomorphisms){
  for(const exponents of phaseAssignments(p)){
    liftsTested++;
    const M=matrixMap(p,exponents);
    const orbit=[M,conjugateMap(M,1),conjugateMap(M,2)];
    if(new Set(orbit.map(mapKey)).size!==3||!zeroSum(orbit))continue;
    survivors.push({
      endpointPermutation:Object.fromEntries(names.map((name,j)=>[name,names[p[j]]])),
      phaseExponents:Object.fromEntries(names.map((name,j)=>[name,exponents[j]])),
      real:isReal(exponents)
    });
  }
}

assert.ok(survivors.every(x=>!x.real));
console.log(JSON.stringify({
  protocol:'completed-furey-tro-sixth-root-phase-endpoint-involution-classification/1',
  phaseConvention:'zeta=exp(pi*i/3); endpoint phase is zeta^exponent',
  directedSupportAutomorphismCount:automorphisms.length,
  involutiveSupportAutomorphismCount:involutiveAutomorphisms.length,
  phaseInvolutiveLiftsTested:liftsTested,
  zeroSumColorTriplets:survivors.length,
  allSurvivorsRequireGenuinelyComplexPhases:survivors.every(x=>!x.real),
  arbitraryUnitPhaseMonomialZeroSumPossible:false,
  supportLevelReason:'Every size-three support orbit has a singleton occupied cell, while every color-fixed support has a color-fixed occupied cell whose identical nonzero coefficient is added three times.',
  firstSurvivors:survivors.slice(0,12),
  conclusion:'No unit-phase monomial endpoint map of any order can supply the zero-sum color triplet. Proceed to nonmonomial, partial-isometry, quotient or bilocal maps.',
  passed:true
},null,2));
