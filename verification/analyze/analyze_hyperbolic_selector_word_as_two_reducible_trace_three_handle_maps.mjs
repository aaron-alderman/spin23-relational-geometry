import assert from 'node:assert/strict';

const W=[[1,0,-1,0],[0,0,0,1],[-1,0,2,0],[0,-1,0,3]]; // p1,p2,q1,q2
const order=[0,2,1,3]; // p1,q1,p2,q2
const Wr=order.map(i=>order.map(j=>W[i][j]));
const M1=[[1,-1],[-1,2]];
const M2=[[0,1],[-1,3]];
assert.deepEqual(Wr,[[...M1[0],0,0],[...M1[1],0,0],[0,0,...M2[0]],[0,0,...M2[1]]]);
for(const M of [M1,M2]){
  assert.equal(M[0][0]+M[1][1],3);
  assert.equal(M[0][0]*M[1][1]-M[0][1]*M[1][0],1);
}
const phi=(1+Math.sqrt(5))/2;
const lp=phi**2, lm=phi**-2;
const symp=(x,y)=>x[0]*y[2]+x[1]*y[3]-x[2]*y[0]-x[3]*y[1];
const v1=l=>[1,0,1-l,0];
const v2=l=>[0,1,0,l];
const up=[v1(lp),v2(lp)], down=[v1(lm),v2(lm)];
assert.ok(Math.abs(symp(up[0],up[1]))<1e-12);
assert.ok(Math.abs(symp(down[0],down[1]))<1e-12);
assert.ok(Math.abs(symp(up[0],down[0])-Math.sqrt(5))<1e-12);
assert.ok(Math.abs(symp(up[1],down[1])+Math.sqrt(5))<1e-12);

console.log(JSON.stringify({
  protocol:'hyperbolic-selector-two-handle-reducibility/1',
  reorderedBasis:['p1','q1','p2','q2'],
  blockDiagonalMatrix:Wr,
  handleBlocks:[M1,M2],
  eachBlock:{determinant:1,trace:3,characteristicPolynomial:'x^2-3x+1'},
  stretchFactor:lp,
  contractionFactor:lm,
  goldenRatioRelation:'lambda_plus=phi^2, lambda_minus=phi^-2',
  unstableLagrangianBasis:up,
  stableLagrangianBasis:down,
  crossPairings:[symp(up[0],down[0]),symp(up[1],down[1])],
  mutualHandleMixing:false,
  topologyBoundary:'The homology matrix admits a reducible lift as two independent one-handle Anosov maps. Homology alone neither proves nor excludes a pseudo-Anosov lift after multiplication by a Torelli element.',
  conclusion:'The infinite word is a doubled trace-three torus hyperbolic response, not yet a genuinely coupled genus-two mechanism.',
  passed:true,
},null,2));
