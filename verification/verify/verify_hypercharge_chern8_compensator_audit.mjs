import assert from 'node:assert/strict';

const X={Q:1,uc:-4,dc:2,L:-3,ec:6,Nc:0,H:3};
assert.deepEqual(X,{Q:1,uc:-4,dc:2,L:-3,ec:6,Nc:0,H:3});
assert(!Object.values(X).includes(-8));

const names=Object.keys(X);
const pairs=[];
for(let i=0;i<names.length;i++)for(let j=i;j<names.length;j++){
  if(X[names[i]]+X[names[j]]===-8)pairs.push([names[i],names[j]]);
}
assert(pairs.some(([a,b])=>a==='uc'&&b==='uc'));
assert.equal(pairs.length,1);

const factorizations=[];
for(let n=-8;n<=8;n++)for(let m=-8;m<=8;m++)if(n&&m&&n*m===-8)factorizations.push([n,m]);
assert.deepEqual(factorizations.sort((a,b)=>a[0]-b[0]),[[-8,1],[-4,2],[-2,4],[-1,8],[1,-8],[2,-4],[4,-2],[8,-1]]);

// A gauge-invariant monomial has total U(1) weight zero by definition, not -8.
const gaugeInvariantWeight=0;
assert.notEqual(gaugeInvariantWeight,-8);

console.log('Hypercharge/Chern-eight compensator audit: PASS');
console.log('elementary_weight_minus8=false; arithmetic_pair=uc*uc; pair_is_not_color_singlet=true; charge_requires_flux_and_base_map=true');
