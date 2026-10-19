#!/usr/bin/env node

const gcd=(a,b)=>b===0n?(a<0n?-a:a):gcd(b,a%b);
const F=(n,d=1n)=>{n=BigInt(n);d=BigInt(d);if(d<0n){n=-n;d=-d;}const g=gcd(n,d);return[n/g,d/g];};
const sub=(a,b)=>F(a[0]*b[1]-b[0]*a[1],a[1]*b[1]);
const neg=a=>F(-a[0],a[1]);
const show=a=>a[1]===1n?String(a[0]):String(a[0])+"/"+String(a[1]);
const blocks=[
  {id:"O1",su3:"1",su2:"1",dim:1,y:F(0)},
  {id:"O2",su3:"3",su2:"1",dim:3,y:F(1,3)},
  {id:"H", su3:"1",su2:"2",dim:2,y:F(1,2)},
  {id:"C", su3:"1",su2:"1",dim:1,y:F(1)},
  {id:"R", su3:"1",su2:"1",dim:1,y:F(0)}
];
const dual3=r=>r==="3"?"3bar":r==="3bar"?"3":r;
const tensor=(target,source)=>{
  const a=target.su3,b=dual3(source.su3),c=target.su2,d=source.su2;
  if(a==="3"&&b==="3bar"&&c==="1"&&d==="1")return[
    {su3:"1",su2:"1",dim:1},{su3:"8",su2:"1",dim:8}
  ];
  if(a==="1"&&b==="1"&&c==="2"&&d==="2")return[
    {su3:"1",su2:"1",dim:1},{su3:"1",su2:"3",dim:3}
  ];
  const su3=a==="1"?b:a;
  const su2=c==="1"?d:c;
  return[{su3,su2,dim:target.dim*source.dim}];
};
const sectors=[];
for(const target of blocks)for(const source of blocks){
  const y=sub(target.y,source.y);
  for(const irrep of tensor(target,source)){
    sectors.push({target:target.id,source:source.id,...irrep,y:show(y),yFlipped:show(neg(y))});
  }
}
const aggregate=(field="yFlipped")=>{
  const map=new Map();
  for(const s of sectors){
    const k=s.su3+"|"+s.su2+"|"+s[field];
    map.set(k,(map.get(k)||0)+1);
  }
  return Object.fromEntries([...map.entries()].sort());
};
const flipped=aggregate("yFlipped");
const count=(r3,r2,y)=>flipped[r3+"|"+r2+"|"+y]||0;
const conjugateKey=s=>{
  const q=F(BigInt(s.yFlipped.split("/")[0]),s.yFlipped.includes("/")?BigInt(s.yFlipped.split("/")[1]):1n);
  return dual3(s.su3)+"|"+s.su2+"|"+show(neg(q));
};
const mirrorClosed=sectors.every(s=>count(...conjugateKey(s).split("|"))>0);
const totalDimension=sectors.reduce((sum,s)=>sum+s.dim,0);
const standardModelLike={
  Q:{irrep:"3|2|1/6",count:count("3","2","1/6")},
  uc:{irrep:"3bar|1|-2/3",count:count("3bar","1","-2/3")},
  dc:{irrep:"3bar|1|1/3",count:count("3bar","1","1/3")},
  L:{irrep:"1|2|-1/2",count:count("1","2","-1/2")},
  ec:{irrep:"1|1|1",count:count("1","1","1")},
  neutralSinglet:{irrep:"1|1|0",count:count("1","1","0")}
};
const report={
  protocol:"furey-endomorphism-sector-inventory/1",
  convention:"Y_particle = Y_source - Y_target (global sign opposite to the raw commutator difference)",
  carrierBlocks:blocks.map(b=>({...b,y:show(b.y)})),
  endomorphismComplexDimension:totalDimension,
  aggregateIrreps:flipped,
  standardModelLike,
  mirrorClosed,
  observations:[
    "One (3,2)_{1/6} quark-doublet type occurs.",
    "One up-conjugate type occurs, but the down-conjugate, lepton-doublet, charged-singlet and neutral-singlet types have excess multiplicity.",
    "Every charged irrep has a conjugate partner in the full endomorphism algebra.",
    "The full End_C(V) inventory is therefore nonchiral; a canonical polarization/projector is required before anomaly comparison."
  ]
};
report.passed=totalDimension===64&&standardModelLike.Q.count===1&&
  standardModelLike.uc.count===1&&standardModelLike.dc.count===2&&
  standardModelLike.L.count===3&&standardModelLike.ec.count===2&&
  standardModelLike.neutralSinglet.count===7&&mirrorClosed;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
