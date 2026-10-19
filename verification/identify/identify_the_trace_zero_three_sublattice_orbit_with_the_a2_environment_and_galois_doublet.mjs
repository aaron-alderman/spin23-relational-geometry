import assert from 'node:assert/strict';

const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const eq=(A,B)=>A.every((r,i)=>r.every((x,j)=>Math.abs(x-B[i][j])<1e-12));
const I=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>+(i===j)));
const C=[[0,0,1],[1,0,0],[0,1,0]]; // three-placement cycle
const F=[[1,0,0],[0,0,1],[0,1,0]]; // handle: fix L0, swap L1,L2
assert.ok(eq(mm(mm(C,C),C),I(3)));
assert.ok(eq(mm(F,F),I(3)));
assert.ok(eq(mm(mm(F,C),F),mm(C,C)));

const ones=[[1],[1],[1]];
assert.ok(eq(mm(C,ones),ones)&&eq(mm(F,ones),ones));
const B=[[1,0],[-1,1],[0,-1]]; // b1=e0-e1, b2=e1-e2
const CA2=[[0,-1],[1,-1]];
const FA2=[[1,0],[1,-1]];
assert.ok(eq(mm(C,B),mm(B,CA2)));
assert.ok(eq(mm(F,B),mm(B,FA2)));
assert.ok(eq(mm(mm(CA2,CA2),CA2),I(2)));
assert.ok(eq(mm(FA2,FA2),I(2)));
assert.ok(eq(mm(mm(FA2,CA2),FA2),mm(CA2,CA2)));

const traces={
  permutation:{identity:3,threeCycle:0,reflection:1},
  traceLine:{identity:1,threeCycle:1,reflection:1},
  traceZeroA2:{identity:2,threeCycle:-1,reflection:0},
};

console.log(JSON.stringify({
  protocol:'three-sublattice-trace-zero-a2-identification/1',
  placementCycle:C,
  placementReflection:F,
  groupRelations:{C3:'I',F2:'I',FCF:'C^-1',group:'S3'},
  decomposition:'R^3 = R*(1,1,1) direct-sum {x0+x1+x2=0}',
  traceZeroBasis:B,
  activeA2Cycle:CA2,
  activeA2Reflection:FA2,
  traces,
  match:'The trace-zero placement plane is the standard real A2/S3 doublet: C3 eigencharacters chi1+chi2 and reflection exchange.',
  boundary:'This is a canonical representation-level identification. A microscopic amplitude assigning weights to lattice placements is not yet derived.',
  passed:true
},null,2));
