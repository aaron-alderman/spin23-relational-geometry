import assert from "node:assert/strict";

const rows=[];
for(const qQ of [0,1])for(const qL of [0,1]){
  const qD=(2*qQ)%2;
  const qT=(qQ+qL)%2;
  const anomalyPerFamily=(3*qQ+qL)%2;
  rows.push({qQ,qL,qD,qT,tripletSplit:(qT-qD+2)%2,anomalyPerFamily});
  assert.equal(anomalyPerFamily,(qT-qD+2)%2);
}
const universal={};
for(const families of [1,2,3,4,5,6])universal[families]=rows.filter(r=>r.tripletSplit===1).map(r=>({qQ:r.qQ,qL:r.qL,weakAnomaly:(families*r.anomalyPerFamily)%2}));
assert(universal[3].every(x=>x.weakAnomaly===1));
assert(universal[2].every(x=>x.weakAnomaly===0));

const familyPatterns=[];
for(let mask=0;mask<8;mask++){
  const d=[0,1,2].map(i=>(mask>>i)&1);
  familyPatterns.push({splitPattern:d,protectedFamilies:d.reduce((a,b)=>a+b,0),weakAnomaly:d.reduce((a,b)=>a+b,0)%2});
}
assert(familyPatterns.filter(x=>x.protectedFamilies===3).every(x=>x.weakAnomaly===1));
assert(familyPatterns.filter(x=>x.protectedFamilies===2).every(x=>x.weakAnomaly===0));

// Adding any transformation that flips every weak doublet shifts the anomaly
// per family by 3+1=4=0 mod 2 and leaves qQ+qL unchanged.
for(const r of rows){
  const shifted={qQ:r.qQ^1,qL:r.qL^1};
  assert.equal((shifted.qQ+shifted.qL)%2,r.tripletSplit);
  assert.equal((3*shifted.qQ+shifted.qL)%2,r.anomalyPerFamily);
}

console.log(JSON.stringify({
  protocol:"odd-family-z2-triplet-split-weak-anomaly-no-go/1",
  chargeRows:rows,
  familyUniversal:universal,
  threeFamilyPatterns:familyPatterns,
  identity:"A_SU2 per family = 3 q_Q + q_L = q_Q + q_L = q_T - q_D (mod 2)",
  centreShift:"q_Q,q_L -> q_Q+1,q_L+1 leaves both the split and anomaly unchanged",
  theorem:"For an odd number of families, every family-universal internal Z2 that distinguishes a quark-lepton triplet from a diquark triplet has an odd SU(2) instanton anomaly. Known order-two gauge-centre factors and fermion parity cannot repair it because they shift quark and lepton doublets together.",
  exits:["protect an even subset of families","break generic flavor mixing with a family-dependent action","add an anomalous inflow/topological sector","enlarge beyond an internal Z2","accept nonperturbative violation"],
  passed:true
},null,2));
