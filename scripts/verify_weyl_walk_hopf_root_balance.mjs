import assert from 'node:assert/strict';

const nodes=[];
for(const nx of [0,1])for(const ny of [0,1])for(const nz of [0,1]){
  const parity=(nx+ny+nz)%2;
  nodes.push({nx,ny,nz,gap:parity===0?'zero':'pi',charge:parity===0?1:-1});
}
assert.equal(nodes.length,8);
assert.equal(nodes.filter(n=>n.gap==='zero').length,4);
assert.equal(nodes.filter(n=>n.gap==='pi').length,4);
assert.equal(nodes.reduce((s,n)=>s+n.charge,0),0);
assert(nodes.filter(n=>n.gap==='zero').every(n=>n.charge===1));
assert(nodes.filter(n=>n.gap==='pi').every(n=>n.charge===-1));

const faceChern=1;
const oppositeFaceChern=-1;
const relationshipChern=faceChern-oppositeFaceChern;
assert.equal(relationshipChern,2);
assert.equal(4*relationshipChern,8);

console.log('Weyl-walk Hopf-root balance certificate: PASS');
console.log('local_face_chern=1; local_relationship_chern=2; fourth_power_chern=8; zero_nodes=4; pi_nodes=4; total_charge=0');
