import assert from 'node:assert/strict';

// Left-handed Weyl convention. sixY avoids fractions.
const fields={
  Q:{color:'3',weak:'2',sixY:1,B:1/3,L:0},
  L:{color:'1',weak:'2',sixY:-3,B:0,L:1},
  uc:{color:'3bar',weak:'1',sixY:-4,B:-1/3,L:0},
  dc:{color:'3bar',weak:'1',sixY:2,B:-1/3,L:0},
  ec:{color:'1',weak:'1',sixY:6,B:0,L:-1},
  nuc:{color:'1',weak:'1',sixY:0,B:0,L:-1},
  H:{color:'1',weak:'2',sixY:3,B:0,L:0},
  Hdag:{color:'1',weak:'2bar',sixY:-3,B:0,L:0},
};
const probes=[
  {name:'Ou',terms:['uc','Q','H'],orientation:'epsilon H'},
  {name:'Od',terms:['dc','Hdag','Q'],orientation:'H dagger'},
  {name:'Oe',terms:['ec','Hdag','L'],orientation:'H dagger'},
  {name:'Onu',terms:['nuc','L','H'],orientation:'epsilon H'},
].map(p=>{
  const total=k=>p.terms.reduce((s,f)=>s+fields[f][k],0);
  const charges={sixY:total('sixY'),B:total('B'),L:total('L')};
  assert.ok(Math.abs(charges.sixY)<1e-12&&Math.abs(charges.B)<1e-12&&Math.abs(charges.L)<1e-12);
  return{...p,Lorentz:'scalar',gaugeRepresentation:'singlet after standard color/weak contraction',charges};
});

const vertices=probes.map(x=>x.name);
const allowedEdges=[];
for(let i=0;i<vertices.length;i++)for(let j=i+1;j<vertices.length;j++)allowedEdges.push([vertices[i],vertices[j]]);
assert.equal(allowedEdges.length,6);

// Exact symmetries see the same charge vector for every probe, so the allowed
// graph is complete.  This says allowed, not dynamically nonzero.
const exactChargeKeys=new Set(probes.map(x=>JSON.stringify({Lorentz:x.Lorentz,gauge:x.gaugeRepresentation,...x.charges})));
assert.equal(exactChargeKeys.size,1);

console.log(JSON.stringify({
  protocol:'standard-model-yukawa-probe-mixing-selection-rules/1',
  convention:'left-handed Weyl fields with a sterile nu^c; sixY=6Y',
  probes,
  sharedExactQuantumNumbers:{Lorentz:'scalar',gauge:'SU(3)xSU(2)xU(1) singlet',B:0,L:0,'B-L':0},
  symmetryAllowedMixingEdges:allowedEdges,
  allowedGraph:'complete graph K4',
  centerProtection:'None of the four primitive channel blocks is protected from the others by the listed exact Standard-Model quantum numbers.',
  spurionBoundary:'Independent chiral field-number symmetries reappear when selected Yukawa couplings vanish. With nonzero Yukawa spurions, cross kernels may be suppressed by products of couplings or loop order, but are not forbidden by the exact gauge, B or L charges audited here.',
  conclusion:'The R^4 response center is not symmetry-protected by ordinary one-generation Standard-Model charges. Its survival requires an explicit vanishing theorem, a stronger Furey/spurion grading, or a calculated block-diagonal renormalization/OPE kernel.',
  nonClaim:'A symmetry-allowed edge need not be dynamically nonzero. This certificate does not compute anomalous dimensions or spectral correlators.',
  passed:true,
},null,2));
