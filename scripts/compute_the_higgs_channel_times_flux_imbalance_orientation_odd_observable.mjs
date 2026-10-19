import assert from 'node:assert/strict';

const leftWeights={
  P0:0.29181450639011824,
  P1:0.6583741528870748,
  P2:0.9515781350035436,
  P3:0.09823320571926385,
};
const delta=Object.fromEntries(Object.entries(leftWeights).map(([p,w])=>[p,2*w-1]));
assert.ok(delta.P1>0&&delta.P2>0&&delta.P0<0&&delta.P3<0);

const channelSign={u:1,nu:1,d:-1,e:-1};
const phiPlus={u:'P1',nu:'P2',d:'P3',e:'P0'};
const phiMinus={u:'P0',nu:'P3',d:'P2',e:'P1'};
const score=map=>Object.keys(channelSign).reduce((s,f)=>s+channelSign[f]*delta[map[f]],0);
const Iplus=score(phiPlus),Iminus=score(phiMinus);
assert.ok(Iplus>0);assert.ok(Iminus<0);assert.ok(Math.abs(Iplus+Iminus)<1e-12);
const absoluteSum=Object.values(delta).reduce((s,x)=>s+Math.abs(x),0);
assert.ok(Math.abs(Iplus-absoluteSum)<1e-12);

// Flux reversal complements each left weight, so every delta changes sign.
const reversedDelta=Object.fromEntries(Object.entries(delta).map(([p,x])=>[p,-x]));
const reversedScore=Object.keys(channelSign).reduce((s,f)=>s+channelSign[f]*reversedDelta[phiPlus[f]],0);
assert.ok(Math.abs(reversedScore-Iminus)<1e-12);

console.log(JSON.stringify({
  protocol:'higgs-channel-flux-imbalance-orientation-observable/1',
  propagationGrading:'Gamma=diag(+1,+1,-1,-1)',
  projectorFluxImbalances:delta,
  channelSigns:channelSign,
  assignments:{phiPlus,phiMinus},
  orientationOddObservable:'I=sum_f chi_f Tr(P_phi(f) Gamma), chi_up=+1, chi_down=-1',
  values:{Iplus,Iminus,normalizedPlus:Iplus/4,normalizedMinus:Iminus/4},
  fluxReversalAction:'I -> -I',
  nonzero:true,
  conclusion:'A channel-resolved source/flux cross correlation distinguishes the two bias-square orientations. It is positive when up channels map to left-biased projectors and negative for the reversed assignment.',
  boundary:'The observable requires separately addressable u,d,e,nu neutral sources and port-resolved flux. Total stress, spectral eigenvalues, determinants and unoriented residue weights do not measure it.',
  passed:true,
},null,2));
