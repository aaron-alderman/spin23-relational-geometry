import assert from 'node:assert/strict';

const fields={
  uL:{sector:'u',chirality:'L',sm:['3','2','1/6'],lr:['3','2','1','1/3']},
  dL:{sector:'d',chirality:'L',sm:['3','2','1/6'],lr:['3','2','1','1/3']},
  nuL:{sector:'nu',chirality:'L',sm:['1','2','-1/2'],lr:['1','2','1','-1']},
  eL:{sector:'e',chirality:'L',sm:['1','2','-1/2'],lr:['1','2','1','-1']},
  uR:{sector:'u',chirality:'R',sm:['3','1','2/3'],lr:['3','1','2','1/3']},
  dR:{sector:'d',chirality:'R',sm:['3','1','-1/3'],lr:['3','1','2','1/3']},
  nuR:{sector:'nu',chirality:'R',sm:['1','1','0'],lr:['1','1','2','-1']},
  eR:{sector:'e',chirality:'R',sm:['1','1','-1'],lr:['1','1','2','-1']},
};
const pairs=[['uL','dL'],['nuL','eL'],['uR','dR'],['nuR','eR']];
const sameRep=(a,b,key)=>JSON.stringify(fields[a][key])===JSON.stringify(fields[b][key]);
const smConnected=pairs.map(([a,b])=>({pair:[a,b],sameGaugeMultiplet:sameRep(a,b,'sm')}));
const lrConnected=pairs.map(([a,b])=>({pair:[a,b],sameGaugeMultiplet:sameRep(a,b,'lr')}));
assert.deepEqual(smConnected.map(x=>x.sameGaugeMultiplet),[true,true,false,false]);
assert.deepEqual(lrConnected.map(x=>x.sameGaugeMultiplet),[true,true,true,true]);

const sectorFlip={u:'d',d:'u',nu:'e',e:'nu'};
const C=['u','e'],D=['d','nu'];
assert.deepEqual(C.map(x=>sectorFlip[x]).sort(),[...D].sort());
assert.deepEqual(D.map(x=>sectorFlip[x]).sort(),[...C].sort());

const dimensions={colorSubspace:3,leptonSubspace:1};
assert.notEqual(dimensions.colorSubspace,dimensions.leptonSubspace);

console.log(JSON.stringify({
  protocol:'furey-handle-exchange-left-right-envelope/1',
  channelFlip:sectorFlip,
  handlePairing:{C:'(u,e)',D:'(d,nu)',exchanged:true},
  standardModelMultipletTest:smConnected,
  leftRightMultipletTest:lrConnected,
  minimalExtension:{group:'SU(3)c x SU(2)L x SU(2)R x U(1)B-L',requires:'nu_R',operation:'simultaneous nontrivial Weyl element in SU(2)L and SU(2)R'},
  patiSalamBoundary:{group:'SU(4) x SU(2)L x SU(2)R',statement:'useful completion but not required for channel exchange; after choosing SU(3)c, a 3D color subspace cannot be bijectively swapped with the 1D lepton line'},
  phaseBoundary:'The gauge element exchanges handles only when the Higgs/source/background data are transformed with it. A symmetry-breaking vacuum or unequal Yukawa response can destroy equal-area reciprocity.',
  conclusion:'The SM supports only the left half of the channel flip. SU(2)R plus nu_R supplies exactly the missing right half and is the minimal gauge envelope in this representation ledger.',
  passed:true,
},null,2));
