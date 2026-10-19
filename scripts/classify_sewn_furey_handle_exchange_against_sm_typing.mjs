import assert from 'node:assert/strict';

const labels=['u','d','e','nu'];
const data={
  u:{channel:'up',kind:'colored',Q:'2/3',handle:'C'},
  e:{channel:'down',kind:'singlet',Q:'-1',handle:'C'},
  d:{channel:'down',kind:'colored',Q:'-1/3',handle:'D'},
  nu:{channel:'up',kind:'singlet',Q:'0',handle:'D'},
};
function perms(a){if(a.length<=1)return[a];const out=[];for(let i=0;i<a.length;i++)for(const tail of perms([...a.slice(0,i),...a.slice(i+1)]))out.push([a[i],...tail]);return out;}
const all=perms(labels).map(image=>Object.fromEntries(labels.map((x,i)=>[x,image[i]])));
const same=(a,b)=>JSON.stringify([...a].sort())===JSON.stringify([...b].sort());
const imageSet=(p,xs)=>xs.map(x=>p[x]);
const C=['u','e'],D=['d','nu'],up=['u','nu'],down=['d','e'],colored=['u','d'],singlet=['e','nu'];
const preservesHandlePartition=p=>{
  const iC=imageSet(p,C); return same(iC,C)||same(iC,D);
};
const exchangesHandles=p=>same(imageSet(p,C),D)&&same(imageSet(p,D),C);
const preservesChannelBlocks=p=>same(imageSet(p,up),up)&&same(imageSet(p,down),down);
const preservesKindBlocks=p=>same(imageSet(p,colored),colored)&&same(imageSet(p,singlet),singlet);
const preservesEverySMType=p=>labels.every(x=>data[p[x]].channel===data[x].channel&&data[p[x]].kind===data[x].kind&&data[p[x]].Q===data[x].Q);

const pairAut=all.filter(preservesHandlePartition);
const swaps=pairAut.filter(exchangesHandles);
const typedSwaps=swaps.filter(p=>preservesChannelBlocks(p)&&preservesKindBlocks(p));
assert.equal(pairAut.length,8);
assert.equal(swaps.length,4);
assert.equal(typedSwaps.length,0);
assert.equal(all.filter(preservesEverySMType).length,1);

const flipChannel=Object.fromEntries([['u','d'],['d','u'],['nu','e'],['e','nu']]);
const flipKind=Object.fromEntries([['u','nu'],['nu','u'],['d','e'],['e','d']]);
assert.ok(exchangesHandles(flipChannel)&&preservesKindBlocks(flipChannel)&&!preservesChannelBlocks(flipChannel));
assert.ok(exchangesHandles(flipKind)&&preservesChannelBlocks(flipKind)&&!preservesKindBlocks(flipKind));

const classifiedSwaps=swaps.map(p=>({
  permutation:p,
  preservesHiggsChannel:preservesChannelBlocks(p),
  preservesColorSingletTyping:preservesKindBlocks(p),
  interpretation:preservesKindBlocks(p)?'up/down channel flip':preservesChannelBlocks(p)?'color/lepton flip':'flips or mixes both typings',
}));

console.log(JSON.stringify({
  protocol:'sewn-furey-handle-exchange-versus-sm-typing/1',
  handlePairing:{C:'(u,e)',D:'(d,nu)'},
  boundaryGrid:{rows:'up/down Higgs channel',columns:'colored/singlet',cells:data},
  untypedPairingAutomorphismOrder:pairAut.length,
  untypedHandleExchangeCount:swaps.length,
  handleExchangesPreservingBothPhysicalTypings:typedSwaps.length,
  exactSMTypedAutomorphismCount:all.filter(preservesEverySMType).length,
  canonicalExchangeMechanisms:{channelFlip:flipChannel,colorLeptonFlip:flipKind},
  classifiedSwaps,
  conclusion:'The untyped sewn pairing admits handle exchange, but every exchange flips at least one physical typing. A color-preserving exchange requires up/down Higgs-channel duality; a channel-preserving exchange requires color/lepton (Pati-Salam-like) duality. No Standard-Model-typed handle exchange exists.',
  equalAreaBoundary:'Equal areas can follow from handle exchange only in an enlarged or emergent response symmetry that relates physically distinct sectors.',
  passed:true,
},null,2));
