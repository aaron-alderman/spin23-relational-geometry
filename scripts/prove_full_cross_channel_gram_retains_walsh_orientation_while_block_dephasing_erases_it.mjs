import assert from 'node:assert/strict';

const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const mv=(A,v)=>A.map(r=>r.reduce((s,x,j)=>s+x*v[j],0));
const transpose=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const outer=v=>v.map(x=>v.map(y=>x*y));
const maxerr=(A,B)=>Math.max(...A.flatMap((r,i)=>r.map((x,j)=>Math.abs(x-B[i][j]))));
const F=[
  [1,1,1,1],
  [1,-1,-1,1],
  [1,1,-1,-1],
  [1,-1,1,-1],
].map(r=>r.map(x=>x/2));
const D=[[1,0,0,0],[0,1,0,0],[0,0,-1,0],[0,0,0,-1]];
const atomic=[1,2,4,8],character=mv(F,atomic),reversed=mv(D,character);
const G=outer(character),Greversed=outer(reversed);
for(let i=0;i<4;i++)assert.ok(Math.abs(G[i][i]-Greversed[i][i])<1e-12);
for(let i=0;i<4;i++)for(let j=0;j<4;j++){
  const sameParity=(i<2)===(j<2);
  assert.ok(Math.abs(Greversed[i][j]-(sameParity?G[i][j]:-G[i][j]))<1e-12);
}
const dephase=A=>A.map((r,i)=>r.map((x,j)=>((i<2)===(j<2))?x:0));
assert.ok(maxerr(dephase(G),dephase(Greversed))<1e-12);
const witness=A=>A[0][2]+A[2][0];
assert.ok(Math.abs(witness(G)+witness(Greversed))<1e-12);
assert.notEqual(witness(G),0);

console.log(JSON.stringify({
  protocol:'full-cross-channel-gram-retains-walsh-orientation/1',
  atomicAmplitude:atomic,
  walshAmplitude:character,
  reversedWalshAmplitude:reversed,
  orientationAction:'D=diag(+,+,-,-)',
  fullGramRule:'G -> D G D',
  invariantData:'all diagonal populations and the even-even/odd-odd blocks',
  oddData:'the even-odd and odd-even coherence blocks change sign',
  witnessValues:{original:witness(G),reversed:witness(Greversed)},
  blockDephasedDifference:maxerr(dephase(G),dephase(Greversed)),
  conclusion:'A full positive cross-channel Gram matrix retains the orientation bit in its even-odd coherences. Separate per-channel Grams or parity-block dephasing erase exactly those entries.',
  fureyBoundary:'The real transpose-paired graph preserves the signs at amplitude level. A physical common phase convention or cyclic path is still required before cross-channel coherence is gauge/convention invariant.',
  passed:true,
},null,2));
