import assert from 'node:assert/strict';

const delta={P0:-0.4163709872197635,P1:0.3167483057741496,P2:0.9031562700070872,P3:-0.8035335885614723};
const chi={u:1,nu:1,d:-1,e:-1};
const plus={u:'P1',nu:'P2',d:'P3',e:'P0'};
const minus={u:'P0',nu:'P3',d:'P2',e:'P1'};
const weightSets=[
  {u:1,nu:1,d:1,e:1},
  {u:3,nu:.2,d:7,e:1.4},
  {u:1e-3,nu:50,d:.4,e:8},
  {u:0,nu:2,d:0,e:0},
];
const index=(map,w)=>{
  const fields=Object.keys(chi);
  const numerator=fields.reduce((s,f)=>s+w[f]*chi[f]*delta[map[f]],0);
  const denominator=fields.reduce((s,f)=>s+w[f]*Math.abs(delta[map[f]]),0);
  assert.ok(denominator>0);
  return{numerator,denominator,index:numerator/denominator};
};
const audits=weightSets.map(weights=>({weights,plus:index(plus,weights),minus:index(minus,weights)}));
for(const a of audits){assert.ok(Math.abs(a.plus.index-1)<1e-12);assert.ok(Math.abs(a.minus.index+1)<1e-12);}

console.log(JSON.stringify({
  protocol:'positive-weight-normalized-channel-flux-orientation-index/1',
  definition:'nu_orient=(sum_f r_f chi_f delta_phi(f))/(sum_f r_f |delta_phi(f)|), r_f>=0',
  audits,
  plusAssignmentIndex:1,
  minusAssignmentIndex:-1,
  invariantUnderArbitraryPositiveChannelRescaling:true,
  fluxReversalAction:'nu_orient -> -nu_orient',
  conclusion:'Once the bias-square assignment holds, positive residue weights and source normalizations cancel from the normalized orientation index. The two global maps carry exact indices +1 and -1.',
  boundary:'The quantization assumes diagonal positive channel weights, correct source labels and no coherent cross-channel contamination. General source mixing requires polar decomposition or a sign-stability bound.',
  passed:true,
},null,2));
