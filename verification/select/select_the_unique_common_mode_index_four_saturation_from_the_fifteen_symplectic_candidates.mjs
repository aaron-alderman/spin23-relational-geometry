import assert from 'node:assert/strict';

const bits=n=>[n&1,(n>>1)&1,(n>>2)&1,(n>>3)&1];
const encode=x=>x[0]+2*x[1]+4*x[2]+8*x[3];
const key=W=>W.slice().sort((a,b)=>a-b).join(',');
const subspaces=new Map();
for(let a=1;a<16;a++)for(let b=a+1;b<16;b++){const W=[0,a,b,a^b].sort((x,y)=>x-y);subspaces.set(key(W),W)}
const K=[[0,0,0,1],[0,0,1,0],[0,1,0,0],[1,0,0,0]];
const pairing=(a,b)=>{const x=bits(a),y=bits(b);let s=0;for(let i=0;i<4;i++)for(let j=0;j<4;j++)s+=x[i]*K[i][j]*y[j];return s%2};
const lagrangians=[...subspaces.values()].filter(W=>W.every(a=>W.every(b=>pairing(a,b)===0)));
const J=n=>{const x=bits(n);return encode([x[2],x[3],x[0],x[1]])};
const jStable=lagrangians.filter(W=>key(W)===key(W.map(J)));
const productLocal=jStable.filter(W=>{
  const realLines=W.filter(n=>n!==0&&(n&12)===0);
  const imagLines=W.filter(n=>n!==0&&(n&3)===0);
  return realLines.length===1&&imagLines.length===1;
});
const commonMode=productLocal.filter(W=>{
  const real=W.find(n=>n!==0&&(n&12)===0), x=bits(real);
  return x[0]===1&&x[1]===1;
});
const chosen=[0,3,12,15];
assert.equal(lagrangians.length,15);
assert.equal(jStable.length,7);
assert.equal(productLocal.length,3);
assert.equal(commonMode.length,1);
assert.deepEqual(commonMode[0],chosen);

console.log(JSON.stringify({
  protocol:'unique-common-mode-index-four-saturation/1',
  filtration:{symplecticLagrangians:lagrangians.length,fourierComplexStable:jStable.length,quadratureProductLocal:productLocal.length,bothEigenchannelsActive:commonMode.length},
  threeProductCandidates:productLocal.map(W=>({plane:W,realGenerator:bits(W.find(n=>n!==0&&(n&12)===0)),imaginaryGenerator:bits(W.find(n=>n!==0&&(n&3)===0))})),
  selectedPlane:commonMode[0],
  selectedGenerators:['e1+e2','e3+e4'],
  physicalBoundary:'Uniqueness is conditional on product locality and the requirement that the saturation activate both response eigenchannels. Those conditions are motivated by the two-face/common-mode construction but are not yet derived microscopically.',
  passed:true
},null,2));
