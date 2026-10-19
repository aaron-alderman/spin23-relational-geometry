import assert from "node:assert/strict";

const eps=1e-12;
const near=(a,b)=>Math.abs(a-b)<eps;
const matrixNear=(A,B)=>A.every((r,i)=>r.every((x,j)=>near(x,B[i][j])));
const dtn=(m,u)=>{const f=m/Math.sinh(u),c=Math.cosh(u);return [[f*c,-f],[-f,f*c]];};
const transfer=(m,u)=>[[Math.cosh(u),Math.sinh(u)/m],[m*Math.sinh(u),Math.cosh(u)]];
const det2=(A)=>A[0][0]*A[1][1]-A[0][1]*A[1][0];

const sqrt2=Math.sqrt(2),sqrt5=Math.sqrt(5),phi=(1+sqrt5)/2;
const mMinus=2*sqrt2,uMinus=2*Math.log(1+sqrt2),Lminus=uMinus/mMinus;
const Xminus=dtn(mMinus,uMinus),Tminus=transfer(mMinus,uMinus);
assert(matrixNear(Xminus,[[3,-1],[-1,3]]));
assert(matrixNear(Tminus,[[3,1],[8,3]]));
assert(near(det2(Tminus),1));
assert(near(Math.exp(uMinus),3+2*sqrt2));

const mPlus=sqrt5,uPlus=2*Math.log(phi),Lplus=uPlus/mPlus;
const XplusUnsigned=dtn(mPlus,uPlus),Tplus=transfer(mPlus,uPlus);
assert(matrixNear(XplusUnsigned,[[3,-2],[-2,3]]));
assert(matrixNear(Tplus,[[1.5,0.5],[2.5,1.5]]));
assert(near(det2(Tplus),1));
assert(near(Math.exp(uPlus),(3+sqrt5)/2));

const D=[[1,0],[0,-1]];
const transpose=(A)=>[[A[0][0],A[1][0]],[A[0][1],A[1][1]]];
const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
assert(matrixNear(mul(mul(D,XplusUnsigned),transpose(D)),[[3,2],[2,3]]));

assert(near(det2(Xminus),mMinus*mMinus));
assert(near(det2(XplusUnsigned),mPlus*mPlus));
assert(near(Lminus,Math.log(1+sqrt2)/sqrt2));
assert(near(Lplus,2*Math.log(phi)/sqrt5));

console.log("Scalar-interval realization of both positive integral lifts: PASS");
console.log("Kminus_is_DtN_for_m_2sqrt2_and_L_log_1plussqrt2_over_sqrt2");
console.log("Kplus_is_port_reversal_of_DtN_for_m_sqrt5_and_L_2logphi_over_sqrt5");
console.log("transfer_matrices_are_3_1__8_3_and_3over2_1over2__5over2_3over2");
console.log("transfer_spectral_units_are_3plus2sqrt2_and_3plussqrt5_over2");
console.log("the_Jordan_determinants_equal_the_bulk_mass_squares_8_and_5");
