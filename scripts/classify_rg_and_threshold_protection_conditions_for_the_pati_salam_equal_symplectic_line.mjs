import assert from 'node:assert/strict';

const mv=(A,v)=>A.map(r=>r.reduce((s,x,j)=>s+x*v[j],0));
const det=A=>A[0][0]*A[1][1]-A[0][1]*A[1][0];
const eqv=(a,b,e=1e-12)=>a.every((x,i)=>Math.abs(x-b[i])<e);
const e=[1,1],o=[1,-1],X=[[0,1],[1,0]];
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const sub=(A,B)=>A.map((r,i)=>r.map((x,j)=>x-B[i][j]));
const maxabs=A=>Math.max(...A.flat().map(Math.abs));

// General linearized two-coupling RG flow d(a,b)/dt=Gamma(a,b).
const Gamma=[[2/5,-1/7],[3/11,5/13]];
const rowSums=Gamma.map(r=>r[0]+r[1]);
const equalLineInvariant=Math.abs(rowSums[0]-rowSums[1])<1e-12;
assert.equal(equalLineInvariant,false);
const splittingAtEquality=mv(Gamma,e)[0]-mv(Gamma,e)[1];
assert.ok(Math.abs(splittingAtEquality)>1e-8);

// Projective beta function q=b/a for a nonzero a.
const projectiveBeta=(G,q)=>G[1][0]+(G[1][1]-G[0][0])*q-G[0][1]*q*q;
assert.ok(Math.abs(projectiveBeta(Gamma,1)+splittingAtEquality)<1e-12);

// Exact exchange covariance Gamma X=X Gamma gives Gamma=[[u,v],[v,u]].
const u=7/9,v=-2/5,Gexchange=[[u,v],[v,u]];
assert.ok(maxabs(sub(mm(Gexchange,X),mm(X,Gexchange)))<1e-12);
assert.ok(eqv(mv(Gexchange,e),e.map(x=>(u+v)*x)));
assert.ok(eqv(mv(Gexchange,o),o.map(x=>(u-v)*x)));
assert.ok(Math.abs(projectiveBeta(Gexchange,1))<1e-12);

// The derivative of dq/dt at q=1 decides local projective stability once the
// equal-line condition holds. Sign interpretation depends on RG-time direction.
const projectiveDerivativeAtOne=G=>G[1][1]-G[0][0]-2*G[0][1];
assert.ok(Math.abs(projectiveDerivativeAtOne(Gexchange)+2*v)<1e-12);

// A threshold matching matrix M preserves equality iff M e is proportional e,
// equivalently its row sums agree. It need not commute with X, so line
// preservation is weaker than full exchange covariance.
const Mpreserve=[[2,1],[4,-1]],Msplit=[[2,1],[1,1]];
const preserves=v=>Math.abs(mv(v,e)[0]-mv(v,e)[1])<1e-12;
assert.equal(preserves(Mpreserve),true);
assert.equal(preserves(Msplit),false);
assert.ok(Math.abs(det(Mpreserve))>1e-12);
assert.ok(maxabs(sub(mm(Mpreserve,X),mm(X,Mpreserve)))>1e-8);

console.log(JSON.stringify({
  protocol:'pati-salam-equal-line-rg-and-threshold-protection/1',
  generalFlow:'d(a,b)^T/dt = Gamma (a,b)^T',
  equalLineCondition:'Gamma_11+Gamma_12 = Gamma_21+Gamma_22 (equal row sums)',
  projectiveBeta:'dq/dt=Gamma_21+(Gamma_22-Gamma_11)q-Gamma_12 q^2',
  genericWitness:{Gamma,rowSums,splittingAtEquality,equalLineInvariant},
  exchangeCovariantFlow:{Gamma:Gexchange,form:'[[u,v],[v,u]]',evenEigenvalue:u+v,oddEigenvalue:u-v,projectiveDerivativeAtOne:projectiveDerivativeAtOne(Gexchange)},
  thresholdCondition:'M preserves a=b iff M(1,1) is proportional to (1,1), equivalently the two row sums of M agree.',
  thresholdWitnesses:{preservesWithoutFullExchange:Mpreserve,splits:Msplit},
  spurionBoundary:'Covariance relating two different breaking vacua gives Gamma(vacuum2)=X Gamma(vacuum1) X; it protects equality inside one vacuum only if that vacuum is itself exchange fixed or the observable averages/identifies the vacuum orbit.',
  conclusion:'The SU(4) equal line is RG invariant exactly when the beta-function row sums agree and survives each threshold exactly when the matching row sums agree. Full composite exchange is sufficient but stronger than necessary.',
  passed:true
},null,2));
