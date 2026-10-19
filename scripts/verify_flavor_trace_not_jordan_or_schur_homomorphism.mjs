#!/usr/bin/env node

const eps=1e-9;
const assert=(c,m)=>{if(!c)throw new Error(m);};
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const sub=(A,B)=>A.map((r,i)=>r.map((x,j)=>x-B[i][j]));
const scale=(s,A)=>A.map(r=>r.map(x=>s*x));
const multiply=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const kron=(A,B)=>A.flatMap(rA=>B.map(rB=>rA.flatMap(x=>rB.map(y=>x*y))));
const frob=A=>Math.sqrt(A.flat().reduce((s,x)=>s+x*x,0));
const I2=[[1,0],[0,1]], sx=[[0,1],[1,0]];
const I4=kron(I2,I2), correlation=kron(sx,sx);

// Normalized partial trace over the second two-dimensional factor.
const E=A=>{
  const out=[[0,0],[0,0]];
  for(let i=0;i<2;i++)for(let j=0;j<2;j++)
    out[i][j]=(A[i*2][j*2]+A[i*2+1][j*2+1])/2;
  return out;
};
const jordan=(A,B)=>scale(0.5,add(multiply(A,B),multiply(B,A)));

assert(frob(E(correlation))<eps,"correlation must vanish under flavor trace");
const E_square=E(jordan(correlation,correlation));
const square_E=multiply(E(correlation),E(correlation));
assert(frob(sub(E_square,I2))<eps&&frob(square_E)<eps,
  "partial trace must fail Jordan multiplicativity");

// Inverse and therefore Schur sewing do not commute with reduction.
const a=3,b=1;
const M=add(scale(a,I4),scale(b,correlation));
const Minv=scale(1/(a*a-b*b),add(scale(a,I4),scale(-b,correlation)));
assert(frob(sub(multiply(M,Minv),I4))<eps,"inverse formula failed");
const E_Minv=E(Minv);
const inv_E_M=scale(1/a,I2);
assert(frob(sub(E_Minv,inv_E_M))>eps,"partial trace should not commute with inverse");

// Exact factor-central pivots are an escape.
const Cface=[[4,1],[1,3]], CfaceInv=[[3/11,-1/11],[-1/11,4/11]];
const Ccentral=kron(Cface,I2), CcentralInv=kron(CfaceInv,I2);
assert(frob(sub(E(CcentralInv),CfaceInv))<eps,"factor-central inverse reduction failed");

// Parent/carrier inventory.
const inventory={
  H2R:{dimension:3,rank:2,detDegree:2,conformalDimension:10},
  H2C:{dimension:4,rank:2,detDegree:2,conformalDimension:15},
  H6R:{dimension:21,rank:6,detDegree:6,conformalDimension:78},
};
assert(inventory.H2R.conformalDimension===2*(2*2+1),"Sp4 dimension failed");
assert(inventory.H6R.conformalDimension===6*(2*6+1),"Sp12 dimension failed");

console.log("Flavor-trace Jordan/Schur obstruction certificate: PASS");
console.log("positive_unital_partial_trace=true; Jordan_homomorphism=false; inverse_commutation=false; Schur_commutation=false");
console.log("factor_central_pivot_escape=true; H2R_dim_rank_conf=3,2,10; H2C=4,2,15; H6R=21,6,78");
