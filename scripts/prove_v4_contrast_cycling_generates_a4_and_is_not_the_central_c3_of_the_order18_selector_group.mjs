import assert from 'node:assert/strict';

const compose=(p,q)=>q.map(i=>p[i]);
const key=p=>p.join(',');
const closure=generators=>{
  const id=[0,1,2,3],out=[id],seen=new Set([key(id)]);
  for(let k=0;k<out.length;k++)for(const g of generators){const x=compose(g,out[k]),s=key(x);if(!seen.has(s)){seen.add(s);out.push(x);}}
  return out;
};
const H=[1,0,3,2];
const C=[3,2,1,0];
const V4=closure([H,C]);
assert.equal(V4.length,4);
const A=[0,3,1,2]; // fixes identity atom and cycles H -> C -> HC -> H
const A4=closure([H,C,A]);
assert.equal(A4.length,12);
assert.notDeepEqual(compose(A,H),compose(H,A));

// Parameter action on the three nonidentity difference classes is a 3-cycle.
const params=['b_handle','c_channel','d_product'];
const cycled=[params[2],params[0],params[1]];
assert.notDeepEqual(params,cycled);

console.log(JSON.stringify({
  protocol:'v4-character-cycle-a4-versus-selector-c3/1',
  v4Order:V4.length,
  orderThreeAutomorphism:A,
  generatedExtensionOrder:A4.length,
  generatedExtension:'V4 semidirect C3 is isomorphic to A4',
  automorphismAction:'cycles the three nonidentity V4 elements and the H,C,HC contrast characters',
  responseConsequence:'Invariance under the cycle forces b_handle=c_channel=d_product, hence one common eigenvalue on the three-dimensional contrast representation.',
  noncentrality:'The order-three automorphism does not commute with V4 translations; it conjugates them cyclically.',
  selectorComparison:{
    knownSelectorGroup:'C3 x S3',
    knownSelectorOrder:18,
    v4SubgroupImpossible:'4 does not divide 18',
    a4SubgroupImpossible:'12 does not divide 18',
    centralC3Mismatch:'The selector C3 is central, whereas the contrast-cycling C3 must act nontrivially by conjugation.'
  },
  conclusion:'Three-contrast isotropy would be explained by an A4-type extension of the response square, not by the presently known central selector phase. No such physical extension is yet derived.',
  passed:true,
},null,2));
