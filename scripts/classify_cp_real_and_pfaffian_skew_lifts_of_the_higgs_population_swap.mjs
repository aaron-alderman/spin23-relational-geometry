import assert from 'node:assert/strict';

const z=(r=0,i=0)=>({r,i});
const mul=(a,b)=>z(a.r*b.r-a.i*b.i,a.r*b.i+a.i*b.r);
const neg=a=>z(-a.r,-a.i),conj=a=>z(a.r,-a.i),exp=t=>z(Math.cos(t),Math.sin(t));
const close=(a,b,t=1e-10)=>Math.abs(a.r-b.r)<t&&Math.abs(a.i-b.i)<t;
const meq=(A,B)=>A.every((r,i)=>r.every((x,j)=>close(x,B[i][j])));
const scale=(a,A)=>A.map(r=>r.map(x=>mul(a,x)));
const transpose=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const conjugate=A=>A.map(r=>r.map(conj));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>({r:s.r+mul(x,B[k][j]).r,i:s.i+mul(x,B[k][j]).i}),z())));
const I=[[z(1),z()],[z(),z(1)]];

// In the adapted basis (tilde h,h), every determinant-one coherent lift of
// the population swap has this form.
const U=a=>[[z(),exp(a)],[neg(exp(-a)),z()]];
const phases={cpEven:[0,Math.PI],cpOdd:[Math.PI/2,3*Math.PI/2]};
for(const a of [...phases.cpEven,...phases.cpOdd])assert.ok(meq(mm(U(a),U(a)),scale(z(-1),I)));

for(const a of phases.cpEven){
  assert.ok(meq(conjugate(U(a)),U(a)));
  assert.ok(meq(transpose(U(a)),scale(z(-1),U(a))));
}
for(const a of phases.cpOdd){
  assert.ok(meq(conjugate(U(a)),scale(z(-1),U(a))));
  assert.ok(meq(transpose(U(a)),U(a)));
}

for(const a of [.2,.7,1.1]){
  assert.ok(!meq(conjugate(U(a)),U(a)));
  assert.ok(!meq(conjugate(U(a)),scale(z(-1),U(a))));
  assert.ok(!meq(transpose(U(a)),U(a)));
  assert.ok(!meq(transpose(U(a)),scale(z(-1),U(a))));
}

// Overall sign identifies the two representatives in each parity class for
// adjoint/population observables.
assert.ok(meq(U(Math.PI),scale(z(-1),U(0))));
assert.ok(meq(U(3*Math.PI/2),scale(z(-1),U(Math.PI/2))));

console.log(JSON.stringify({
  protocol:'cp-real-pfaffian-skew-higgs-swap-lifts/1',
  generalLift:'U(alpha)=[[0,e^{i alpha}],[-e^{-i alpha},0]], U(alpha)^2=-I',
  conjugation:'K U(alpha) K = U(-alpha)',
  cpEvenSolutions:['0','pi'],
  cpOddSolutions:['pi/2','3pi/2'],
  skewPfaffianSolutions:['0','pi'],
  symmetricSolutions:['pi/2','3pi/2'],
  moduloOverallSign:{cpEven:'one class represented by epsilon',cpOdd:'one class represented by i sigma_x'},
  implication:'Compatibility with the canonical real/skew symplectic structure collapses the Hopf phase to the two signs ±epsilon. Allowing odd real-structure parity gives the distinct symmetric class ±i sigma_x.',
  limitation:'The algebra classifies the lock if CP/Pfaffian parity is imposed. Exact CP is not a symmetry of the full three-generation Standard Model, and a physical Pfaffian coupling has not yet been derived.',
  passed:true
},null,2));
