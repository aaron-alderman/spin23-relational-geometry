import assert from 'node:assert/strict';

const mod=(x,p)=>((x%p)+p)%p;
const transpose=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const multiply=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const identity=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i===j?1:0));
const subtract=(A,B)=>A.map((r,i)=>r.map((x,j)=>x-B[i][j]));
const power=(A,n,p=null)=>{
  let X=identity(A.length);
  for(let k=0;k<n;k++){
    X=multiply(X,A);
    if(p) X=X.map(r=>r.map(x=>mod(x,p)));
  }
  return X;
};
const rank=(M,p=null)=>{
  if(M.length===0)return 0;
  const A=M.map(r=>r.map(x=>p?mod(x,p):x));
  let row=0;
  for(let col=0;col<A[0].length&&row<A.length;col++){
    let pivot=row;
    while(pivot<A.length&&(p?A[pivot][col]===0:Math.abs(A[pivot][col])<1e-10))pivot++;
    if(pivot===A.length)continue;
    [A[row],A[pivot]]=[A[pivot],A[row]];
    if(p){
      const inv=Array.from({length:p},(_,x)=>x).find(x=>mod(x*A[row][col],p)===1);
      A[row]=A[row].map(x=>mod(x*inv,p));
      for(let i=0;i<A.length;i++)if(i!==row&&A[i][col]){
        const f=A[i][col];A[i]=A[i].map((x,j)=>mod(x-f*A[row][j],p));
      }
    }else{
      const d=A[row][col];A[row]=A[row].map(x=>x/d);
      for(let i=0;i<A.length;i++)if(i!==row){
        const f=A[i][col];A[i]=A[i].map((x,j)=>x-f*A[row][j]);
      }
    }
    row++;
  }
  return row;
};
const nullity=(constraints,n,p=null)=>n-rank(constraints,p);

// The chiral spinor weights are the even-parity sign words.  The all-plus
// word is nu^c and is punctured.
const full=[];
for(let mask=0;mask<32;mask++){
  const q=Array.from({length:5},(_,i)=>(mask>>i)&1?-1:1);
  if(q.filter(x=>x<0).length%2===0)full.push({mask,q});
}
const physical=full.filter(({mask})=>mask!==0);
assert.equal(physical.length,15);
const index=new Map(physical.map(({q},i)=>[q.join(','),i]));

// Cycle the first three oscillator/color coordinates.
const cycle=q=>[q[2],q[0],q[1],q[3],q[4]];
const P=Array.from({length:15},()=>Array(15).fill(0));
for(let j=0;j<15;j++){
  const i=index.get(cycle(physical[j].q).join(','));
  assert.notEqual(i,undefined);
  P[i][j]=1;
}
assert.deepEqual(power(P,3),identity(15));

// Four SU(5)-Cartan stabilizer rows of the punctured code, followed by the
// logical row q_1.  Row normalization by 1/2 is integral here.
const A=Array.from({length:4},(_,a)=>physical.map(({q})=>(q[a]-q[a+1])/2));
const logical=physical.map(({q})=>q[0]);
const W=[logical,...A];
assert.equal(rank(A),4);
assert.equal(rank(W),5);

const N=subtract(P,identity(15));
const fixedV=nullity(N,15);
const fixedGaugeKernel=nullity([...A,...N],15);
const fixedFullKernel=nullity([...W,...N],15);
const dimGaugeKernel=15-rank(A);
const dimFullKernel=15-rank(W);
const gaugeDoublets=(dimGaugeKernel-fixedGaugeKernel)/2;
const fullDoublets=(dimFullKernel-fixedFullKernel)/2;
assert.deepEqual(
  {fixedV,dimGaugeKernel,fixedGaugeKernel,gaugeDoublets,dimFullKernel,fixedFullKernel,fullDoublets},
  {fixedV:7,dimGaugeKernel:11,fixedGaugeKernel:5,gaugeDoublets:3,dimFullKernel:10,fixedFullKernel:4,fullDoublets:3}
);

// Orbit census: four colored three-cycles plus three fixed physical states.
const seen=new Set(),orbits=[];
for(let seed=0;seed<15;seed++)if(!seen.has(seed)){
  const orbit=[];let j=seed;
  do{orbit.push(j);seen.add(j);j=P.findIndex(r=>r[j]===1);}while(j!==seed);
  orbits.push(orbit);
}
const orbitSizes=orbits.map(o=>o.length).sort((a,b)=>a-b);
assert.deepEqual(orbitSizes,[1,1,1,3,3,3,3]);
const maskLabel=mask=>{
  const bits=[];for(let i=0;i<5;i++)if((mask>>i)&1)bits.push(i+1);
  return bits.length?bits.join(''):'empty';
};
const orbitLabels=orbits.map(o=>o.map(i=>maskLabel(physical[i].mask)));

// In characteristic three the real decomposition 1+2 ceases to be
// semisimple.  Determine the Jordan-block census of P on a constrained
// kernel from dimensions ker(N) and ker(N^2), all computed modulo 3.
const jordanCensus=(constraints,dimension)=>{
  const N2=multiply(N,N).map(r=>r.map(x=>mod(x,3)));
  const k1=nullity([...constraints,...N],15,3);
  const k2=nullity([...constraints,...N2],15,3);
  const n3=dimension-k2;
  const n2=2*k2-k1-dimension;
  const n1=2*k1-k2;
  assert.equal(n1+2*n2+3*n3,dimension);
  return {dimension,kerN:k1,kerN2:k2,J1:n1,J2:n2,J3:n3};
};
const gaugeMod3=jordanCensus(A,dimGaugeKernel);
const fullMod3=jordanCensus(W,dimFullKernel);
assert.deepEqual(gaugeMod3,{dimension:11,kerN:5,kerN2:8,J1:2,J2:0,J3:3});
assert.deepEqual(fullMod3,{dimension:10,kerN:4,kerN2:7,J1:1,J2:0,J3:3});

console.log(JSON.stringify({
  protocol:'c3-isotypic-content-of-punctured-generation-code/1',
  physicalOrbitSizes:orbitSizes,
  physicalOrbitLabels:orbitLabels,
  realCharacteristicZero:{
    physical:{dimension:15,fixed:fixedV,standardDoublets:4},
    gaugeNeutralKernel:{dimension:dimGaugeKernel,fixed:fixedGaugeKernel,standardDoublets:gaugeDoublets},
    gaugeAndLogicalNeutralKernel:{dimension:dimFullKernel,fixed:fixedFullKernel,standardDoublets:fullDoublets},
    standardIsotypicCommutant:'M_3(C), real dimension 18, on either constrained kernel',
    canonicalDoubletSelected:false
  },
  characteristicThree:{
    gaugeNeutralKernel:gaugeMod3,
    gaugeAndLogicalNeutralKernel:fullMod3,
    warning:'The characteristic-zero C3 doublets do not reduce as semisimple 2-planes. They are absorbed into three J3 unipotent blocks; an additional quotient or filtration would be required to obtain the handle carrier J2 block.'
  },
  conclusion:'Gauge stabilization removes one of four raw color doublets but leaves three equivalent real C3 doublets. C3, the Euclidean metric, and the code stabilizers therefore do not canonically select the unique two-dimensional handle environment.',
  nextGate:'Add a typed Furey ternary deformation operator, Dirac/Higgs sewing, or response bilinear and test whether it reduces the multiplicity from three to one without an arbitrary basis choice.',
  passed:true
},null,2));
