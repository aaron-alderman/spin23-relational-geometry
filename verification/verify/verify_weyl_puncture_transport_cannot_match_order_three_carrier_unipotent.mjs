import assert from 'node:assert/strict';

const p=3,mod=x=>((x%p)+p)%p;
const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>mod(r.reduce((s,x,k)=>s+x*B[k][j],0))));
const I4=Array.from({length:4},(_,i)=>Array.from({length:4},(_,j)=>i===j?1:0));
const eq=(A,B)=>A.every((r,i)=>r.every((x,j)=>mod(x)===mod(B[i][j])));
function order(A,cap=20){let x=I4;for(let k=1;k<=cap;k++){x=mul(A,x);if(eq(x,I4))return k;}return null;}
function rank(A){const M=A.map(r=>r.map(mod));let r=0;for(let c=0;c<M[0].length&&r<M.length;c++){let q=r;while(q<M.length&&!M[q][c])q++;if(q===M.length)continue;[M[r],M[q]]=[M[q],M[r]];const inv=M[r][c]===1?1:2;for(let j=c;j<M[r].length;j++)M[r][j]=mod(inv*M[r][j]);for(let i=0;i<M.length;i++)if(i!==r){const f=M[i][c];for(let j=c;j<M[i].length;j++)M[i][j]=mod(M[i][j]-f*M[r][j]);}r++;}return r;}
const subtractI=A=>A.map((r,i)=>r.map((x,j)=>mod(x-(i===j?1:0))));

const orderedTransport=I4;
const swap=[[0,1,0,0],[1,0,0,0],[0,0,0,1],[0,0,1,0]];
const carrier=[[1,0,0,0],[0,0,0,2],[0,0,1,0],[0,1,0,2]];
assert.equal(order(orderedTransport),1);
assert.equal(order(swap),2);
assert.equal(order(carrier),3);
assert.equal(rank(subtractI(orderedTransport)),0);
assert.equal(rank(subtractI(swap)),2);
assert.equal(rank(subtractI(carrier)),1);

// Conjugate matrices have the same order and ranks of polynomial expressions.
assert.notEqual(order(carrier),order(orderedTransport));
assert.notEqual(order(carrier),order(swap));

console.log(JSON.stringify({
  protocol:'weyl-puncture-transport-versus-carrier-unipotent/1',
  orderedWeylTransport:{matrix:orderedTransport,order:1,rankMinusIdentity:0},
  unorderedSwapHolonomy:{matrix:swap,order:2,rankMinusIdentity:2},
  arithmeticCarrierColorCycle:{matrix:carrier,order:3,rankMinusIdentity:1},
  conjugacyPossible:false,
  conclusion:'Pure D5 Weyl puncture motion supplies only identity transport or an order-two logical-coordinate swap. Neither is conjugate in GL(4,3), hence neither in Sp(4,3), to the nontrivial order-three carrier unipotent.',
  requiredExit:'a non-Weyl code deformation, encoded Clifford, Fourier/duality operation, or an emergent response-level color action',
  passed:true,
},null,2));
