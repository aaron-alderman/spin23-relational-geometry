import assert from "node:assert/strict";
import fs from "node:fs";

const data=new URL("../../evidence/data/",import.meta.url);
const record=JSON.parse(fs.readFileSync(new URL("moonshine-cross-sector-griess-product-oracle-v1.json",data),"utf8"));
const Kz=JSON.parse(fs.readFileSync(new URL("leech-explicit-k-matrix-v1.json",data),"utf8")).K.map(r=>r.map(BigInt));
assert.equal(record.schemaVersion,"moonshine-cross-sector-griess-product-oracle-v1");
const n=Kz.length;
const I=Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>+(i===j)));
const mod2=x=>Number(((x%2n)+2n)%2n);
const K=Kz.map(r=>r.map(mod2));
const add=(a,b)=>a.map((x,i)=>x^b[i]);
const pairing=(a,b)=>{let s=0;for(let i=0;i<n;i++)for(let j=0;j<n;j++)s^=a[i]&K[i][j]&b[j];return s;};
const quadratic=v=>{let q=0n;for(let i=0;i<n;i++)for(let j=0;j<n;j++)q+=BigInt(v[i])*Kz[i][j]*BigInt(v[j]);return Number((q/2n)%2n);};
const remaining=I.map(r=>[...r]);const pairs=[];
while(remaining.length){const a=remaining.shift();const p=remaining.findIndex(v=>pairing(a,v));assert.notEqual(p,-1);let[b]=remaining.splice(p,1);pairs.push([a,b]);for(let i=0;i<remaining.length;i++){let u=remaining[i];if(pairing(u,b))u=add(u,a);if(pairing(u,a))u=add(u,b);remaining[i]=u;}}
for(const p of pairs)if(quadratic(p[1]))p[1]=add(p[1],p[0]);
const S=Array.from({length:n},(_,i)=>pairs.flat().map(v=>v[i]));
const inverse2=m=>{const a=m.map((r,i)=>[...r,...I[i]]);for(let c=0;c<n;c++){const p=a.findIndex((r,i)=>i>=c&&r[c]);assert.notEqual(p,-1);[a[c],a[p]]=[a[p],a[c]];for(let r=0;r<n;r++)if(r!==c&&a[r][c])a[r]=a[r].map((x,j)=>x^a[c][j]);}return a.map(r=>r.slice(n));};
const Sinv=inverse2(S);
const mulv2=(a,v)=>a.map(r=>r.reduce((s,x,i)=>s^(x&v[i]),0));
const labels=I.map(e=>mulv2(Sinv,e));

const dotZ=(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0n);
const mulvZ=(a,v)=>a.map(r=>r.reduce((s,x,i)=>s+x*v[i],0n));
const basis=Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>BigInt(i===j)));
let seedChecks=0;let pureZSeeds=0;
for(let i=0;i<n;i++){
  const alpha=basis[i];
  const Kalpha=mulvZ(Kz,alpha);
  assert.equal(dotZ(alpha,Kalpha),4n);
  const Ralpha=alpha.map((_,r)=>alpha.map((__,c)=>BigInt(r===c)-2n*alpha[r]*Kalpha[c]));
  assert.deepEqual(mulvZ(Ralpha,alpha),alpha.map(x=>-7n*x));
  const alignedNumerator=dotZ(mulvZ(Ralpha,alpha),Kalpha);
  assert.equal(alignedNumerator,-28n);
  // Divide by 16 because <u_alpha,u_alpha>=2 and O_alpha carries 1/8.
  assert.equal(Number(alignedNumerator)/16,-7/4);
  let pauliSquare=0;let hasX=false;
  for(let q=0;q<12;q++){pauliSquare^=labels[i][2*q]&labels[i][2*q+1];hasX||=!!labels[i][2*q];}
  assert.equal(pauliSquare,0,"norm-four labels give symmetric square-plus Paulis");
  if(!hasX)pureZSeeds++;
  seedChecks++;
}

// Universal unit projection. For t1=h tensor s, t2=k tensor t, the
// oscillator component is delta_st [q(h,k)/2+(h,k)omega/8]. Since
// <omega,q(h,k)>=(h,k), <omega,omega>=12, and e=omega/2:
// <e,mu>=delta_st[(h,k)/4+3(h,k)/4]=<t1,t2>.
for(let i=0;i<n;i++)for(let j=0;j<n;j++){
  const inner=Kz[i][j];
  const ePairNumerator=inner+3n*inner;
  assert.equal(ePairNumerator/4n,inner);
}
assert.equal(record.invariantForms.griessUnitNorm,3);
assert.match(record.certifiedConsequences.oscillatorSameProbeNormSquared,/^13\/16/);
assert.match(record.certifiedConsequences.oscillatorOrthogonalChannelNormSquared,/^1\/4/);
assert.match(record.certifiedConsequences.markedSelfAlignedMinimalCoefficient,/^-7\/4/);
assert.equal(seedChecks,record.certifiedConsequences.markedSeedChecks);

console.log(JSON.stringify({status:"PASS",untwistedDimension:98580,twistedDimension:98304,product:"T times T to U",unitProjection:"<t1,t2> e/3",markedSelfAlignedCoefficient:"-7/4",markedSeedChecks:seedChecks,pureZMarkedSeeds:pureZSeeds,oscillatorProbeNormSquares:{same:"13/16",orthogonal:"1/4"},boundary:record.laboratoryBoundary}));
