import assert from 'node:assert/strict';

const dot=(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0);
const add=(...vs)=>vs[0].map((_,i)=>vs.reduce((s,v)=>s+v[i],0));
const scale=(a,v)=>v.map(x=>a*x);
const key=v=>v.join(',');

// The chiral spinor 16 of Spin(10): five signs with even sign parity.
const weights=[];
for(let mask=0;mask<32;mask++){
  const q=Array.from({length:5},(_,i)=>(mask>>i)&1?-1:1);
  if(q.filter(x=>x===-1).length%2===0) weights.push(q);
}
assert.equal(weights.length,16);
const weightSet=new Set(weights.map(key));
const nuC=[1,1,1,1,1];
assert.ok(weightSet.has(key(nuC)));

// Integral triorthogonality: every polarized cubic Cartan anomaly vanishes.
const anomalyTensor=[];
for(let i=0;i<5;i++) for(let j=0;j<5;j++) for(let k=0;k<5;k++){
  const value=weights.reduce((s,q)=>s+q[i]*q[j]*q[k],0);
  anomalyTensor.push({i,j,k,value});
  assert.equal(value,0);
}

// Puncturing nu^c leaves the anomaly which that missing weight cancelled.
const punctured=weights.filter(q=>key(q)!==key(nuC));
for(let i=0;i<5;i++) for(let j=0;j<5;j++) for(let k=0;k<5;k++){
  const value=punctured.reduce((s,q)=>s+q[i]*q[j]*q[k],0);
  assert.equal(value,-1);
}

// One explicit distance-three logical support from the paper.
const eC=[1,1,1,-1,-1];
const uC1=[1,-1,-1,1,1];
const dC1=[1,-1,-1,-1,-1];
assert.deepEqual(add(eC,uC1,scale(-1,dC1)),nuC);

// q4 <-> q5 is the weak Weyl reflection.  It fixes nu^c and all weak
// singlets, swaps each weak doublet, and reverses T3L=(q4-q5)/4.
const weakReflect=q=>[q[0],q[1],q[2],q[4],q[3]];
for(const q of weights) assert.ok(weightSet.has(key(weakReflect(q))));
assert.deepEqual(weakReflect(nuC),nuC);
for(const q of weights){
  const t3=(q[3]-q[4])/4;
  const reflectedT3=(weakReflect(q)[3]-weakReflect(q)[4])/4;
  assert.ok(Math.abs(reflectedT3+t3)<1e-12);
}
assert.deepEqual(weakReflect(weakReflect(eC)),eC);
assert.deepEqual(weakReflect(eC),eC); // weak singlet
assert.deepEqual(weakReflect(uC1),uC1); // conjugate up is a weak singlet
assert.deepEqual(weakReflect(dC1),dC1); // conjugate down is a weak singlet

// The vectorlike/chiral split used by doubling: paired charges are invisible
// to the weak reflection except for the linking row 2T3L.
const t3Histogram=new Map();
for(const q of weights){
  const t=(q[3]-q[4])/2; // 2T3L
  t3Histogram.set(t,(t3Histogram.get(t)||0)+1);
}
assert.deepEqual(Object.fromEntries([...t3Histogram].sort((a,b)=>a[0]-b[0])),{'-1':4,'0':8,'1':4});

console.log(JSON.stringify({
  protocol:'standard-model-triorthogonal-code-weak-weyl-bridge/1',
  spin10Weights:weights.length,
  all125PolarizedCubicAnomaliesVanish:true,
  puncturedAnomalyTensor:'all entries -1, the negative nu^c contribution',
  explicitDistanceThreeRelation:'nu^c = e^c + u^c_1 - d^c_1',
  weakWeyl:{action:'q4 <-> q5',fixesRemovedWeight:true,reverses2T3L:true,order:2},
  twoT3LHistogram:Object.fromEntries([...t3Histogram].sort((a,b)=>a[0]-b[0])),
  typingBoundary:'The paper\'s cubic form is the coordinatewise anomaly polarization. It is not, without another theorem, the exceptional Jordan cubic norm or the project\'s signed K3 multiplicity form.',
  golayBoundary:'An all-positive integral P-lattice obeying sum mu_i s_i^2=0 is trivial, so ternary Golay doubling has no direct anomaly-free integral lift with unit positive coefficients.',
  passed:true
},null,2));
