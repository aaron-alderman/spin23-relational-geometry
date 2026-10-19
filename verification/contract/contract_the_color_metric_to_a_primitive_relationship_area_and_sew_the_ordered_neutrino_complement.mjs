import assert from 'node:assert/strict';

const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const scale=(s,A)=>A.map(r=>r.map(x=>s*x));
const kron=(A,B)=>A.flatMap(ar=>B.map(br=>ar.flatMap(a=>br.map(b=>a*b))));
const block=(A,B,C,D)=>[[...A[0],...B[0]],[...A[1],...B[1]],[...C[0],...D[0]],[...C[1],...D[1]]];
const eq=(A,B,t=1e-10)=>A.every((r,i)=>r.every((x,j)=>Math.abs(x-B[i][j])<t));
const I2=[[1,0],[0,1]],Z=[[0,0],[0,0]],eps=[[0,1],[-1,0]];
const inv2=A=>{const d=A[0][0]*A[1][1]-A[0][1]*A[1][0];return [[A[1][1]/d,-A[0][1]/d],[-A[1][0]/d,A[0][0]/d]];};
const key=A=>JSON.stringify(A);

const G=[[2,-1],[-1,2]],Gi=inv2(G),Omega=kron(eps,G);
const contract=(Om,metricInv)=>Array.from({length:2},(_,a)=>Array.from({length:2},(_,b)=>{
  let s=0;for(let alpha=0;alpha<2;alpha++)for(let beta=0;beta<2;beta++)
    s+=metricInv[alpha][beta]*Om[2*a+alpha][2*b+beta];
  return s/2; // normalized color trace
}));
const relationshipArea=contract(Omega,Gi);
assert.ok(eq(relationshipArea,eps));

// Metric-scale independence of normalized contraction.
for(const lambda of [.5,2,7]){
  const Gl=scale(lambda,G),Oil=kron(eps,Gl);
  assert.ok(eq(contract(Oil,inv2(Gl)),eps));
}

// Integral incidence basis reverses the active orientation.
const X=[[1,1],[0,-1]];
assert.equal(X[0][0]*X[1][1]-X[0][1]*X[1][0],-1);
const activeCodeArea=mm(mm(tr(X),relationshipArea),X);
assert.ok(eq(activeCodeArea,scale(-1,eps)));

// The ordered primitive puncture/restoration pair (nu^c,nu) supplies the
// fixed determinant-line generator, up to reversal of the named order.
const fixedArea=eps;
const Jcode=block(fixedArea,Z,Z,activeCodeArea);
assert.ok(eq(Jcode,block(eps,Z,Z,scale(-1,eps))));

// This is the exact selector form of document 865.
const C=[[1,3],[-1,-2]],A=[[0,-1],[1,-1]];
const R=block(I2,Z,Z,C),H=block(Z,X,X,Z),I4=block(I2,Z,Z,I2);
assert.ok(eq(mm(mm(tr(R),Jcode),R),Jcode));
assert.ok(eq(mm(mm(tr(H),Jcode),H),Jcode));
assert.ok(eq(mm(H,H),I4));

const group=[I4],seen=new Set([key(I4)]);
for(let i=0;i<group.length;i++)for(const g of [R,H]){const y=mm(g,group[i]),k=key(y);if(!seen.has(k)){seen.add(k);group.push(y);}}
assert.equal(group.length,18);

// In standard handle coordinates both primitive areas have the same sign.
const D=block(I2,Z,Z,X);
const Jhandles=mm(mm(tr(D),Jcode),D);
assert.ok(eq(Jhandles,block(eps,Z,Z,eps)));
// Reorder (p1,q1,p2,q2) -> (p1,p2,q1,q2).
const P=[[1,0,0,0],[0,0,1,0],[0,1,0,0],[0,0,0,1]];
const J0=mm(mm(tr(P),Jhandles),P);
const expectedJ0=[[0,0,1,0],[0,0,0,1],[-1,0,0,0],[0,-1,0,0]];
assert.ok(eq(J0,expectedJ0));

console.log(JSON.stringify({
  protocol:'normalized-color-contraction-and-neutrino-complement-sewing/1',
  bathForm:'epsilon_relationship tensor G_A2',
  normalizedColorContraction:'(1/2) G^{alpha beta} Omega_{a alpha,b beta}',
  inducedRelationshipArea:relationshipArea,
  independentOfColorMetricScale:true,
  incidenceConjugator:X,
  activeAreaInIncidenceBasis:activeCodeArea,
  fixedComplement:['nu^c','nu'],
  fixedPrimitiveDeterminantArea:fixedArea,
  sewnSelectorForm:Jcode,
  standardHandleForm:Jhandles,
  generatedSelectorOrder:group.length,
  conclusion:'Normalized quadratic color contraction sends the four-dimensional bath form to the primitive relationship area epsilon. The orientation-reversing incidence conjugator turns it into -epsilon; sewing the ordered primitive neutrino complement supplies diag(epsilon,-epsilon), exactly the integral selector form and order-18 action.',
  limitation:'The active normalization is fixed by normalized color trace. The fixed-sector unit area is canonical as the determinant generator of the ordered primitive lattice (nu^c,nu), but its realization as a dynamical response residue remains open.',
  passed:true
},null,2));
