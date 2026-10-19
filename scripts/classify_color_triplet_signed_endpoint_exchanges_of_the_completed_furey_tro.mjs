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
const walk=(prefix,remaining)=>{if(!remaining.length){permutations.push(prefix);return;}for(let i=0;i<remaining.length;i++)walk([...prefix,remaining[i]],remaining.filter((_,j)=>j!==i));};
walk([],Array.from({length:8},(_,i)=>i));
assert.equal(permutations.length,40320);
const preservesSupport=p=>edges.every(([l,r])=>edgeSet.has(p[index.get(l)]+'|'+p[index.get(r)]));
const automorphisms=permutations.filter(preservesSupport);

const eye=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i===j?1:0));
const zero=n=>Array.from({length:n},()=>Array(n).fill(0));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const eq=(A,B)=>A.every((r,i)=>r.every((x,j)=>x===B[i][j]));
const matrix=(p,signs=Array(8).fill(1))=>Array.from({length:8},(_,i)=>Array.from({length:8},(_,j)=>p[j]===i?signs[j]:0));
const colorPermutation=[1,2,0,3,4,5,6,7];
const C=matrix(colorPermutation),C2=mm(C,C),I=eye(8),Z=zero(8);
assert.ok(eq(mm(mm(C,C),C),I));
const orbit=S=>[S,mm(mm(C,S),C2),mm(mm(C2,S),C)];
const orbitSize=O=>new Set(O.map(JSON.stringify)).size;
const sumOrbit=O=>O.reduce(add,Z);

const permutationOrbitCounts={1:0,3:0};
for(const p of automorphisms)permutationOrbitCounts[orbitSize(orbit(matrix(p)))]++;
assert.equal(permutationOrbitCounts[1]+permutationOrbitCounts[3],automorphisms.length);

const signedInvolutions=[];
const zeroSumTriplets=[];
for(const p of automorphisms)for(let mask=0;mask<256;mask++){
  const signs=Array.from({length:8},(_,i)=>(mask>>i)&1?-1:1),S=matrix(p,signs);
  if(!eq(mm(S,S),I))continue;
  signedInvolutions.push({p,signs,S});
  const O=orbit(S);
  if(orbitSize(O)===3&&eq(sumOrbit(O),Z))zeroSumTriplets.push({p,signs,S,orbit:O});
}

// Pure endpoint permutations can never have zero orbit sum because each
// conjugate is entrywise nonnegative and nonzero.
for(const p of automorphisms)assert.ok(!eq(sumOrbit(orbit(matrix(p))),Z));

// Record how any survivors act on the sixteen matter arrows.
const inducedEdgePermutation=({p})=>edges.map(([l,r,field])=>{
  const key=p[index.get(l)]+'|'+p[index.get(r)];
  const j=edges.findIndex(([a,b])=>index.get(a)+'|'+index.get(b)===key);
  return {field,image:edges[j][2]};
});
const survivorSummaries=zeroSumTriplets.map((x,i)=>({
  index:i,
  endpointPermutation:names.map((name,j)=>[name,names[x.p[j]]]),
  signs:Object.fromEntries(names.map((name,j)=>[name,x.signs[j]])),
  inducedFields:inducedEdgePermutation(x)
}));

console.log(JSON.stringify({
  protocol:'completed-furey-tro-color-triplet-signed-endpoint-exchange-classification/1',
  endpointCount:names.length,
  matterArrowCount:edges.length,
  permutationsEnumerated:permutations.length,
  directedSupportAutomorphismCount:automorphisms.length,
  permutationColorOrbitCounts:permutationOrbitCounts,
  unsignedZeroSumTriplets:0,
  signedInvolutiveLiftsTested:signedInvolutions.length,
  signedZeroSumColorTriplets:zeroSumTriplets.length,
  survivorSummaries,
  conclusion:zeroSumTriplets.length
    ? 'The completed TRO support admits real signed endpoint involutions whose three color conjugates sum to zero; their Standard-Model field action must be typed before admission.'
    : 'No real signed involutive endpoint automorphism of the completed TRO supplies the required three-leg zero-sum color orbit. The quadratic selector must use non-monomial, complex-phase, bilocal or background-dependent relationship maps.',
  passed:true
},null,2));
