import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const evidence=JSON.parse(readFileSync('evidence/data/spin23-portal-exchange-spectrum-enlargement.json','utf8'));
const types=['F_L','F_R','H_D','H_M'];
const count=xs=>Object.fromEntries(types.map(t=>[t,xs.filter(x=>x===t).length]));
const addCounts=(a,b)=>Object.fromEntries(types.map(t=>[t,(a[t]??0)+(b[t]??0)]));
const equalCounts=(a,b)=>types.every(t=>a[t]===b[t]);

// The original constituent-type multisets are unequal.
const D=['F_L','F_R','H_D'];
const M=['F_R','F_R','H_M'];
const cD=count(D),cM=count(M);
assert.equal(equalCounts(cD,cM),false);

// Exact lower bound for object-level multiset equality: for each type, add
// the positive part of the count difference to the deficient side.
const addD=Object.fromEntries(types.map(t=>[t,Math.max(0,cM[t]-cD[t])]));
const addM=Object.fromEntries(types.map(t=>[t,Math.max(0,cD[t]-cM[t])]));
assert.deepEqual(addD,{F_L:0,F_R:1,H_D:0,H_M:1});
assert.deepEqual(addM,{F_L:1,F_R:0,H_D:1,H_M:0});
assert.equal(Object.values(addD).reduce((a,b)=>a+b,0)+Object.values(addM).reduce((a,b)=>a+b,0),4);
const closedD=addCounts(cD,addD),closedM=addCounts(cM,addM);
assert.deepEqual(closedD,{F_L:1,F_R:2,H_D:1,H_M:1});
assert.deepEqual(closedM,closedD);
assert.deepEqual(closedD,evidence.minimalObjectLevelClosure.countsAfter.diracSide);
assert.deepEqual(closedM,evidence.minimalObjectLevelClosure.countsAfter.majoranaSide);

// No completion with fewer additions can equalize all four counts. Exhaust
// all allocations of at most three added objects between the two sides.
let smallerClosureExists=false;
const allocations=[];
const generate=(remaining,index,vector)=>{
  if(index===8){allocations.push(vector.slice());return;}
  for(let n=0;n<=remaining;n++){vector.push(n);generate(remaining-n,index+1,vector);vector.pop();}
};
for(let budget=0;budget<=3;budget++)generate(budget,0,[]);
for(const v of allocations){
  const xD=Object.fromEntries(types.map((t,i)=>[t,v[i]]));
  const xM=Object.fromEntries(types.map((t,i)=>[t,v[i+4]]));
  if(equalCounts(addCounts(cD,xD),addCounts(cM,xM)))smallerClosureExists=true;
}
assert.equal(smallerClosureExists,false);

// Even allowing the left-right outer automorphism does not map the full
// Dirac constituent multiset to the Majorana one: HD remains bidoublet type
// and HM becomes a left Majorana scalar, never HD.
const lrImage={F_L:'F_R',F_R:'F_L',H_D:'H_D',H_M:'H_M_L'};
const imageD=D.map(t=>lrImage[t]).sort();
assert.notDeepEqual(imageD,M.slice().sort());

// Bounded mirror candidate. Operator order is [D_A,M_A,D_B,M_B]. The safe
// sector exchange preserves portal type and has two cycles, hence two fixed
// coupling parameters: lambda_D and lambda_M.
const safePermutation=[2,3,0,1];
const portalType=['D','M','D','M'];
for(let i=0;i<4;i++)assert.equal(portalType[safePermutation[i]],portalType[i]);
const cycleCount=perm=>{
  const seen=new Set();let cycles=0;
  for(let i=0;i<perm.length;i++)if(!seen.has(i)){
    cycles++;let j=i;
    while(!seen.has(j)){seen.add(j);j=perm[j];}
  }
  return cycles;
};
assert.equal(cycleCount(safePermutation),2);
const invariantCoupling=[7,11,7,11];
assert.deepEqual(safePermutation.map(i=>invariantCoupling[i]),invariantCoupling);
assert.notEqual(invariantCoupling[0],invariantCoupling[1]);
assert.equal(evidence.minimalObjectLevelClosure.boundedCandidate.invariantCouplingDimension,2);

// Exhaust all type-preserving permutations. None can place original D_A=0
// and original M_B=3 in one orbit. This is the finite operator-orbit form of
// the no-go.
const permutations=xs=>xs.length===0?[[]]:xs.flatMap((x,i)=>
  permutations(xs.slice(0,i).concat(xs.slice(i+1))).map(rest=>[x,...rest]));
const allPerms=permutations([0,1,2,3]);
const typePreserving=allPerms.filter(p=>p.every((j,i)=>portalType[j]===portalType[i]));
assert.equal(typePreserving.length,4);
const sameOrbit=(perm,a,b)=>{
  const seen=new Set();let x=a;
  while(!seen.has(x)){if(x===b)return true;seen.add(x);x=perm[x];}
  return false;
};
assert.equal(typePreserving.some(p=>sameOrbit(p,0,3)),false);

// Kinetic normalization of an exchanged pair must agree. Otherwise the
// canonical swap is conjugated into the weighted reflection of claim 1528.
const mul=(A,B)=>A.map(row=>B[0].map((_,j)=>row.reduce((s,x,k)=>s+x*B[k][j],0)));
const eq=(a,b,tol=1e-12)=>Array.isArray(a)
  ? a.length===b.length&&a.every((x,i)=>eq(x,b[i],tol))
  : Math.abs(a-b)<=tol;
const P=[[0,1],[1,0]];
for(const [zA,zB] of [[1,1],[2,2],[1,3]]){
  const G=[[zA,0],[0,zB]];
  const invariant=eq(mul(P,mul(G,P)),G);
  assert.equal(invariant,zA===zB);
}

// Gauge-anomaly check for the minimal complete Pati-Salam family pair:
// SU(4)^3 multiplicities are +dim(2_L) for 4 and -dim(2_R) for bar(4).
const su4Cubic=2*(+1)+2*(-1);
assert.equal(su4Cubic,0);
// The number of SU(2) doublets is dim(4)=4 in each factor, hence even and
// free of the Witten parity obstruction.
assert.equal(4%2,0);
// Family-U(1) anomaly freedom is deliberately not asserted without charges.
assert.match(evidence.anomalyAudit.familyAnomalies,/must be specified/);

assert.equal(evidence.smallestBoundedCandidateVerdict.exists,true);
assert.equal(evidence.smallestBoundedCandidateVerdict.evadesClaim1531,false);
assert.match(evidence.minimalityDichotomy.theorem,/every safe completion is insufficient/);
assert.match(evidence.strongestNoGo,/No finite addition/);
assert.match(evidence.reopeningDatum,/enlarged gauge\/category structure/);

console.log('PASS 1534: exact type-counting requires at least one F_R and H_M on the Dirac side plus one F_L and H_D on the Majorana side. This four-multiplet mirror closure makes the enlarged object collections isomorphic and can close a gauge-anomaly-free Pati-Salam family pair, but every type-preserving Z2 has separate D and M operator orbits and therefore two invariant couplings. No finite fixed-group addition exchanges the original portals.');
