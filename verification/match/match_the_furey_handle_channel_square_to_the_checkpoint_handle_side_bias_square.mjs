import assert from 'node:assert/strict';

const fields={
  u:{handle:'C',channel:'up'},
  e:{handle:'C',channel:'down'},
  d:{handle:'D',channel:'down'},
  nu:{handle:'D',channel:'up'},
};
const projectors=[
  {id:0,handleWeights:[0.9365327081761696,0.06346729182382999],sideWeights:[0.29181450639011824,0.7081854936098814]},
  {id:1,handleWeights:[0.8590875421771937,0.14091245782280692],sideWeights:[0.6583741528870748,0.3416258471129258]},
  {id:2,handleWeights:[0.15536151359175104,0.8446384864082487],sideWeights:[0.9515781350035436,0.04842186499645615]},
  {id:3,handleWeights:[0.04901823605488549,0.9509817639451148],sideWeights:[0.09823320571926385,0.9017667942807365]},
].map(p=>({...p,handle:p.handleWeights[0]>.5?'C':'D',side:p.sideWeights[0]>.5?'left':'right'}));

assert.equal(new Set(projectors.map(p=>p.handle+':'+p.side)).size,4);
assert.equal(new Set(Object.values(fields).map(f=>f.handle+':'+f.channel)).size,4);

const names=Object.keys(fields);
const perms=a=>a.length<=1?[a]:a.flatMap((x,i)=>perms([...a.slice(0,i),...a.slice(i+1)]).map(t=>[x,...t]));
const assignments=perms(projectors.map(p=>p.id)).map(ids=>Object.fromEntries(names.map((f,i)=>[f,ids[i]])));
assert.equal(assignments.length,24);
const byId=Object.fromEntries(projectors.map(p=>[p.id,p]));
const handlePreserving=assignments.filter(M=>names.every(f=>fields[f].handle===byId[M[f]].handle));
assert.equal(handlePreserving.length,4);
const oriented=handlePreserving.filter(M=>names.every(f=>(fields[f].channel==='up')===(byId[M[f]].side==='left')));
const reversed=handlePreserving.filter(M=>names.every(f=>(fields[f].channel==='up')===(byId[M[f]].side==='right')));
assert.equal(oriented.length,1);assert.equal(reversed.length,1);

const handleMargins=projectors.map(p=>Math.abs(p.handleWeights[0]-.5));
const sideMargins=projectors.map(p=>Math.abs(p.sideWeights[0]-.5));
const minHandleMargin=Math.min(...handleMargins),minSideMargin=Math.min(...sideMargins);
assert.ok(minHandleMargin>0&&minSideMargin>0);

console.log(JSON.stringify({
  protocol:'furey-grid-to-projector-bias-square/1',
  matterGrid:fields,
  projectorBiasGrid:projectors,
  allOrderIsomorphisms:assignments.length,
  handleLabelPreservingAssignments:handlePreserving.length,
  handleAndOrientedChannelSideAssignments:oriented,
  handleAndReversedChannelSideAssignments:reversed,
  remainingWithoutPhysicalSideOrientation:oriented.length+reversed.length,
  biasMargins:{minimumHandleMargin:minHandleMargin,minimumSideMargin:minSideMargin},
  conclusion:'The exact Furey handle-by-channel square and the arithmetic checkpoint handle-by-side bias square each contain all four bit pairs once. Fixing C/D labels reduces 24 projector assignments to two, related by a global channel-to-side reversal; fixing that orientation would select one.',
  boundary:'Handle and side labels on projectors are strict numerical participation biases, not exact invariant subspaces. No physical theorem yet identifies Higgs up/down channel with propagation left/right side, and selector operations do not permute the eigenlines at fixed background.',
  passed:true,
},null,2));
