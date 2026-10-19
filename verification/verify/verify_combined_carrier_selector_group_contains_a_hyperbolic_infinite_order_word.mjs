import assert from 'node:assert/strict';

const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const scale=(c,A)=>A.map(r=>r.map(x=>c*x));
const eq=(A,B)=>A.every((r,i)=>r.every((x,j)=>x===B[i][j]));
const I=[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
const Z=I.map(r=>r.map(()=>0));

// Completed canonical carrier basis from documents 761, 766 and 770.
const R=[[1,0,0,0],[0,0,0,-1],[0,0,1,0],[0,1,0,-1]]; // oriented color C3
const P=[[1,0,0,0],[0,-1,0,0],[-1,0,-1,0],[0,-1,0,1]]; // paired signed reflection
const H=[[0,1,0,0],[1,0,0,0],[0,0,0,1],[0,0,1,0]]; // handle exchange
assert.ok(eq(mul(mul(R,R),R),I));
assert.ok(eq(mul(P,P),I));
assert.ok(eq(mul(H,H),I));

const A=mul(P,mul(H,R));
const W=mul(A,A); // (P H R)^2
const expected=[[1,0,-1,0],[0,0,0,1],[-1,0,2,0],[0,-1,0,3]];
assert.ok(eq(W,expected));
const trace=W.reduce((s,r,i)=>s+r[i],0);
assert.equal(trace,6);
assert.ok(eq(add(add(mul(W,W),scale(-3,W)),I),Z));
const lambdaPlus=(3+Math.sqrt(5))/2;
const lambdaMinus=(3-Math.sqrt(5))/2;
assert.ok(lambdaPlus>1&&lambdaMinus>0&&lambdaMinus<1);

console.log(JSON.stringify({
  protocol:'combined-carrier-selector-hyperbolic-word/1',
  generatorOrders:{R:3,P:2,H:2},
  word:'W=(P H R)^2',
  matrix:W,
  trace,
  minimalPolynomial:'x^2-3x+1',
  eigenvalues:[lambdaPlus,lambdaPlus,lambdaMinus,lambdaMinus],
  infiniteOrder:true,
  unitaryIntertwinerNoGo:'An invertible intertwiner from a positive-definite unitary source representation would preserve eigenvalues, but every unitary word has spectrum on the unit circle while W does not.',
  survivingSources:['non-unitary response transfer','indefinite/Krein representation','mapping-class or encoded duality','analytic continuation of compact gauge data'],
  conclusion:'The three selector actions cannot all be realized through an ordinary compact unitary matter action on the same four-dimensional quotient. Their combined carrier group is infinite and contains hyperbolic dynamics.',
  passed:true,
},null,2));
