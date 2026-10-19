import assert from 'node:assert/strict';

const I2=[[1,0],[0,1]],E=[[0,1],[-1,0]];
const C=[[1,3],[-1,-2]];
const X=[[1,1],[0,-1]];
const A=[[0,-1],[1,-1]];
const z2=()=>[[0,0],[0,0]];
const block=(A,B,C,D)=>[
  [...A[0],...B[0]],[...A[1],...B[1]],
  [...C[0],...D[0]],[...C[1],...D[1]]
];
const I4=block(I2,z2(),z2(),I2);
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const scale=(s,A)=>A.map(r=>r.map(x=>s*x));
const eq=(A,B)=>A.every((r,i)=>r.every((x,j)=>x===B[i][j]));
const pow=(A,n)=>{let Y=I4;for(let k=0;k<n;k++)Y=mm(Y,A);return Y;};
const det2=M=>M[0][0]*M[1][1]-M[0][1]*M[1][0];
const key=A=>JSON.stringify(A);

assert.ok(eq(mm(C,X),mm(X,A)));
assert.equal(det2(X),-1);

// Work in the selected code-lattice basis.  The color action is fixed on the
// second rank-two summand and trivial on the first.
const R=block(I2,z2(),z2(),C);

// Every invariant alternating form has no cross block because C-I is
// invertible over Q (det=3).  The two diagonal area scales remain free.
const J=(a,d)=>block(scale(a,E),z2(),z2(),scale(d,E));
for(const [a,d] of [[1,1],[1,-1],[2,3],[-1,-1]]){
  assert.ok(eq(mm(mm(tr(R),J(a,d)),R),J(a,d)));
}
assert.equal(det2([[C[0][0]-1,C[0][1]],[C[1][0],C[1][1]-1]]),3);

// Transport the handle-basis mode swap through diag(I,X).  Since X^2=I,
// the resulting involution is integral.
const H=block(z2(),X,X,z2());
assert.ok(eq(mm(H,H),I4));
assert.ok(eq(mm(mm(tr(H),J(1,-1)),H),J(1,-1)));
assert.ok(!eq(mm(mm(tr(H),J(1,1)),H),J(1,1)));

// The exact selector group is recovered.
assert.ok(eq(pow(R,3),I4));
const group=[I4],seen=new Set([key(I4)]);
for(let i=0;i<group.length;i++)for(const g of [R,H]){
  const y=mm(g,group[i]),k=key(y);
  if(!seen.has(k)){seen.add(k);group.push(y);}
}
assert.equal(group.length,18);

// Pfaffian of diag(aE,dE) is a*d, determinant is (a*d)^2.  Integral
// unimodularity forces a,d=+/-1.  H-symplecticity in the code basis forces
// d=-a because the conjugator X reverses the active-plane orientation.
const unimodularForms=[];
for(const a of [-1,1])for(const d of [-1,1])unimodularForms.push({
  a,d,pfaffian:a*d,
  Hsymplectic:eq(mm(mm(tr(H),J(a,d)),H),J(a,d)),
  HantiSymplectic:eq(mm(mm(tr(H),J(a,d)),H),scale(-1,J(a,d)))
});
assert.equal(unimodularForms.filter(x=>x.Hsymplectic).length,2);
assert.ok(unimodularForms.filter(x=>x.Hsymplectic).every(x=>x.d===-x.a));

console.log(JSON.stringify({
  protocol:'integral-symplectic-sewings-of-fixed-and-incidence-c3-modes/1',
  selectedCodeColorBlock:C,
  handleActiveBlock:A,
  unimodularConjugator:X,
  conditionalRankFourColorAction:R,
  invariantAlternatingForms:'J(a,d)=diag(a*epsilon,d*epsilon); cross blocks vanish because det(C-I)=3',
  invariantFormRank:2,
  unimodularityCondition:'a*d=+/-1, hence a,d are independently +/-1',
  transportedHandleInvolution:H,
  unimodularForms,
  HsymplecticCondition:'d=-a in the selected code basis; equivalently equal mode areas in the standard handle basis because det(X)=-1',
  selectedSymplecticForm:J(1,-1),
  generatedGroupOrder:group.length,
  conclusion:'Once a primitive color-fixed rank-two complement is supplied, the integral active module admits a full order-18 symplectic selector. Color alone leaves two area scales; unimodularity discretizes them, and the transported handle involution fixes their relative sign, leaving only overall orientation.',
  physicalBoundary:'The fixed complement and transported H are constructed abstractly from the known selector. They have not yet been derived from puncture/restoration, Furey neutral exchange, or bilocal source data.',
  passed:true
},null,2));
