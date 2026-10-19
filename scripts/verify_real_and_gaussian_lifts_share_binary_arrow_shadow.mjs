#!/usr/bin/env node

// Exact certificate that the same F2 triangular arrow is the residue of both
// a real integral arrow over Z and a complex/Gaussian arrow over Z[i].
// The quotient Z[i]/(1+i) is F2, with i=1, so the two real quadratures
// coalesce and the fourth-root orientation is invisible in the binary shadow.

import assert from 'node:assert/strict';

const G=(a,b=0)=>({a:Object.is(a,-0)?0:a,b:Object.is(b,-0)?0:b});
const add=(z,w)=>G(z.a+w.a,z.b+w.b);
const mul=(z,w)=>G(z.a*w.a-z.b*w.b,z.a*w.b+z.b*w.a);
const conj=z=>G(z.a,-z.b);
const neg=z=>G(-z.a,-z.b);
const q=z=>((z.a+z.b)%2+2)%2; // evaluation i -> 1 over F2

for(let a=-3;a<=3;a++)for(let b=-3;b<=3;b++)
for(let c=-3;c<=3;c++)for(let d=-3;d<=3;d++){
  const z=G(a,b),w=G(c,d);
  assert.equal(q(add(z,w)),q(z)^q(w));
  assert.equal(q(mul(z,w)),q(z)&q(w));
  assert.equal(q(conj(z)),q(z));
}

const one=G(1),i=G(0,1),minusOne=neg(one),minusI=neg(i);
assert.deepEqual([one,i,minusOne,minusI].map(q),[1,1,1,1]);
assert.deepEqual(mul(i,i),minusOne);

// One ramified rung higher: Z[i]/(2) is the dual-number ring F2[eps]/eps^2,
// with eps=i+1.  The residue map kills eps, but eps distinguishes i from 1.
const mod2G=z=>G(((z.a%2)+2)%2,((z.b%2)+2)%2);
const epsilon=mod2G(add(i,one));
assert.deepEqual(epsilon,G(1,1));
assert.deepEqual(mod2G(mul(epsilon,epsilon)),G(0,0));
assert.deepEqual(mod2G(add(one,epsilon)),mod2G(i));
const gaussianMod2=[G(0,0),G(1,0),G(0,1),G(1,1)];
assert.equal(new Set(gaussianMod2.map(z=>`${z.a}${z.b}`)).size,4);
assert.deepEqual(gaussianMod2.filter(z=>q(z)===0),[G(0,0),epsilon]);

// The first thickening sees i!=1 but only order two because -1=1.  The next
// ramified quotient O/(1+i)^3 is the first one in this tower retaining i of
// order four: 2 is not divisible by (1+i)^3, while i^4-1=0.
const pi=G(1,1),pi2=mul(pi,pi),pi3=mul(pi2,pi);
const divisible=(z,p)=>{
  const n=p.a*p.a+p.b*p.b;
  const num=mul(z,conj(p));
  return num.a%n===0&&num.b%n===0;
};
assert(divisible(G(2),pi2));
assert(!divisible(G(2),pi3));
assert(divisible(add(mul(i,i),neg(one)),pi2)); // i^2-1=-2 vanishes mod pi^2
assert(!divisible(add(mul(i,i),neg(one)),pi3));
assert(divisible(add(mul(mul(i,i),mul(i,i)),neg(one)),pi3));

// Gaussian 2x2 matrices and reduction.
const z0=G(0),z1=G(1);
const gm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>add(s,mul(x,B[k][j])),z0)));
const reduceM=A=>A.map(r=>r.map(q));
const bm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s^(x&B[k][j]),0)));
const E11=[[z1,z0],[z0,z0]],E12=[[z0,z1],[z0,z0]],E22=[[z0,z0],[z0,z1]];
const iE12=[[z0,i],[z0,z0]];
assert.deepEqual(reduceM(E12),reduceM(iE12));
for(const A of [E11,E12,iE12,E22])for(const B of [E11,E12,iE12,E22])
  assert.deepEqual(reduceM(gm(A,B)),bm(reduceM(A),reduceM(B)));

// The two Hermitian relationship quadratures coalesce in the residue.
const gd=A=>A[0].map((_,j)=>A.map(r=>conj(r[j])));
const X=addMatrix(E12,gd(E12));
const Y=addMatrix(iE12,gd(iE12));
assert.deepEqual(reduceM(X),[[0,1],[1,0]]);
assert.deepEqual(reduceM(Y),[[0,1],[1,0]]);

function addMatrix(A,B){return A.map((r,j)=>r.map((x,k)=>add(x,B[j][k])));}

const report={
  protocol:'real-and-gaussian-lifts-share-binary-arrow-shadow/1',
  quotient:'Z[i]/(1+i) = F2',
  quotientMap:'a+bi -> a+b mod 2',
  fourthRootsImages:{one:q(one),i:q(i),minusOne:q(minusOne),minusI:q(minusI)},
  conjugationVisibleInResidue:false,
  ramifiedFirstThickening:{ring:'Z[i]/(2) = F2[epsilon]/(epsilon^2)',epsilon:'i+1',epsilonSquare:0,residueKernel:['0','epsilon'],quadratureDifference:'i E12 - E12 = epsilon E12 in characteristic two'},
  firstQuarticOrientationRung:{ring:'Z[i]/(1+i)^3',cardinality:8,twoIsNonzero:true,iHasOrder:4},
  realLift:'T2(Z) -> T2(F2) by mod 2',
  gaussianLift:'T2(Z[i]) -> T2(F2) by i -> 1',
  arrowQuadratures:{E12:reduceM(E12).flat().join(''),iE12:reduceM(iE12).flat().join(''),coalesce:true},
  hermitianQuadratures:{X:'E12+E21',Y:'i(E12-E21)',sameBinaryResidue:true},
  consequence:'The one binary arrow does not choose between a real one-quadrature lift and a charged complex two-quadrature lift. A mu4/orientation datum is required to distinguish i from 1.',
  passed:true,
};
console.log(JSON.stringify(report,null,2));
