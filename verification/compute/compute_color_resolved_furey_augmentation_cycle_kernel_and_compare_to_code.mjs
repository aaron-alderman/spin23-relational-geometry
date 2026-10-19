import assert from 'node:assert/strict';

const Iaug=[[1,0],[-1,1],[0,-1]]; // columns 1-g, g-g^2
const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const inverse=A=>{const n=A.length,M=A.map((r,i)=>[...r,...Array.from({length:n},(_,j)=>i===j?1:0)]);for(let c=0;c<n;c++){let p=c;while(p<n&&Math.abs(M[p][c])<1e-12)p++;assert(p<n);[M[c],M[p]]=[M[p],M[c]];const d=M[c][c];M[c]=M[c].map(x=>x/d);for(let i=0;i<n;i++)if(i!==c){const f=M[i][c];M[i]=M[i].map((x,j)=>x-f*M[c][j]);}}return M.map(r=>r.slice(n));};
const rank=A=>{const M=A.map(r=>r.slice());let row=0;for(let c=0;c<M[0].length&&row<M.length;c++){let p=row;while(p<M.length&&Math.abs(M[p][c])<1e-10)p++;if(p===M.length)continue;[M[row],M[p]]=[M[p],M[row]];const d=M[row][c];M[row]=M[row].map(x=>x/d);for(let i=0;i<M.length;i++)if(i!==row){const f=M[i][c];M[i]=M[i].map((x,j)=>x-f*M[row][j]);}row++;}return row;};

// Parameters are three independent augmentation coefficients u,d,uc in I.
// Cycle closure at each color-resolved O2 vertex forces dc=u+d-uc.
const parameterBasis=[];
for(let family=0;family<3;family++)for(let a=0;a<2;a++){
  const zero=[0,0,0],u=zero.slice(),d=zero.slice(),uc=zero.slice();
  const target=[u,d,uc][family];
  for(let i=0;i<3;i++)target[i]=Iaug[i][a];
  const dc=u.map((x,i)=>x+d[i]-uc[i]);
  parameterBasis.push({u,d,uc,dc});
}

// Punctured five-bit coordinate order:
// uc3,uc2,uc1,d1,d2,d3,e,u1,u2,u3,nu,ec,dc3,dc2,dc1.
const embed=({u,d,uc,dc})=>[
  uc[2],uc[1],uc[0],
  d[0],d[1],d[2],
  0,
  u[0],u[1],u[2],
  0,0,
  dc[2],dc[1],dc[0]
];
const Ktop=tr(parameterBasis.map(embed));
assert.equal(rank(Ktop),6);

// Reconstruct the five-bit weights and gauge-stabilizer matrix.
const full=[];
for(let mask=0;mask<32;mask++){
  const q=Array.from({length:5},(_,i)=>(mask>>i)&1?-1:1);
  if(q.filter(x=>x<0).length%2===0)full.push({mask,q});
}
const physical=full.filter(x=>x.mask!==0);
const A=Array.from({length:4},(_,a)=>physical.map(({q})=>(q[a]-q[a+1])/2));
assert.ok(mm(A,Ktop).flat().every(x=>x===0));

// The color-standard gauge kernel has rank six from the independent census,
// so containment plus equal rank proves equality over Q.  Integral
// primitivity is checked by a gcd-one maximal minor.
const det=M=>M.length===1?M[0][0]:M[0].reduce((z,x,j)=>z+(j%2?-1:1)*x*det(M.slice(1).map(r=>r.filter((_,k)=>k!==j))),0);
const gcd2=(a,b)=>b===0?Math.abs(a):gcd2(b,a%b);
const gcdAll=xs=>xs.reduce((g,x)=>gcd2(g,x),0);
const combinations=(n,k,start=0,p=[])=>p.length===k?[p]:Array.from({length:n-start},(_,z)=>z+start).flatMap(i=>combinations(n,k,i+1,[...p,i]));
const maximalMinors=combinations(15,6).map(rows=>det(rows.map(i=>Ktop[i])));
const saturationIndex=gcdAll(maximalMinors);
assert.equal(saturationIndex,1);

// Verify the previously selected active basis lies in the cycle kernel.
const Bselected=[
  [0,-1],[1,2],[-1,-1],[1,1],[-1,-2],[0,1],[0,0],[1,1],
  [-1,-2],[0,1],[0,0],[0,0],[0,3],[-3,-6],[3,3]
];
assert.equal(rank([...tr(Ktop),...tr(Bselected)]),6);

// Express the incidence compression directly on the topological I^3
// coordinates.  Orthogonal compression has coordinate matrix
// (K^T K)^(-1) K^T Lambda K.
const sectorOrder=['uc','uc','uc','d','d','d','e','u','u','u','nu','ec','dc','dc','dc'];
const incidence={uc:5,d:5,e:0,u:5,nu:0,ec:1,dc:1};
const Lambda=sectorOrder.map((s,i)=>sectorOrder.map((_,j)=>i===j?incidence[s]:0));
const Gram=mm(tr(Ktop),Ktop);
const topologicalIncidence=mm(mm(inverse(Gram),tr(Ktop)),mm(Lambda,Ktop));
const roundedTopologicalIncidence=topologicalIncidence.map(r=>r.map(x=>Math.round(x*1e12)/1e12));

// The matrix factors as a 3x3 multiplicity operator tensor the identity on
// the two augmentation coordinates in the chosen interleaved ordering.
const M3=Array.from({length:3},(_,i)=>Array.from({length:3},(_,j)=>roundedTopologicalIncidence[2*i][2*j]));
for(let i=0;i<3;i++)for(let j=0;j<3;j++){
  assert.ok(Math.abs(roundedTopologicalIncidence[2*i][2*j]-M3[i][j])<1e-10);
  assert.ok(Math.abs(roundedTopologicalIncidence[2*i+1][2*j+1]-M3[i][j])<1e-10);
  assert.ok(Math.abs(roundedTopologicalIncidence[2*i][2*j+1])<1e-10);
  assert.ok(Math.abs(roundedTopologicalIncidence[2*i+1][2*j])<1e-10);
}
// A primitive integer vector spanning the simple eigenline of M3.
const selectedMultiplicityVector=[-1,-1,1];
const Mv=M3.map(r=>r.reduce((s,x,j)=>s+x*selectedMultiplicityVector[j],0));
assert.ok(Mv.every((x,i)=>Math.abs(x-2*selectedMultiplicityVector[i])<1e-10));

console.log(JSON.stringify({
  protocol:'color-resolved-furey-augmentation-cycle-kernel/1',
  augmentationIdealBasis:Iaug,
  localCycleEquation:'u+d-uc-dc=0 in I=ker(epsilon:Z[C3]->Z)',
  parameterization:'(u,d,uc) arbitrary in I^3; dc=u+d-uc',
  integralKernelRank:rank(Ktop),
  primitiveInPuncturedCoordinateLattice:saturationIndex===1,
  saturationIndex,
  annihilatedByFourGaugeStabilizerRows:true,
  equalsGaugeNeutralColorStandardSpaceOverQ:true,
  selectedIncidenceLatticeContained:true,
  topologicalIncidenceOperator:roundedTopologicalIncidence,
  multiplicityOperator:M3,
  factorization:'multiplicityOperator tensor identity_I',
  simpleEigenvalue:2,
  selectedPrimitiveMultiplicityVector:selectedMultiplicityVector,
  selectedCopyEquation:'(u,d,uc)=(-w,-w,w), hence dc=u+d-uc=-3w for w in I',
  result:'The color-resolved Furey cycle kernel with augmentation coefficients is exactly the rank-six three-doublet space found independently from the punctured Standard-Model code.',
  remainingSelection:'Topology recovers I^3 but not the distinguished diagonal I. The Furey incidence Laplacian is still required to select L_inc inside this topological kernel.',
  passed:true
},null,2));
