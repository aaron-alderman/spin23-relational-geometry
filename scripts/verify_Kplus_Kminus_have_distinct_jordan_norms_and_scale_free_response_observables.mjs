import assert from "node:assert/strict";

const Kplus=[[3,2],[2,3]],Kminus=[[3,-1],[-1,3]];
const det=(K)=>K[0][0]*K[1][1]-K[0][1]*K[1][0];
const trace=(K)=>K[0][0]+K[1][1];
const quad=(K,v)=>v[0]*(K[0][0]*v[0]+K[0][1]*v[1])+v[1]*(K[1][0]*v[0]+K[1][1]*v[1]);
const common=[1,1],difference=[1,-1];
const gain=(K,v)=>quad(K,v)/2;

assert.equal(trace(Kplus),6); assert.equal(trace(Kminus),6);
assert.equal(det(Kplus),5); assert.equal(det(Kminus),8);
assert.deepEqual([gain(Kplus,common),gain(Kplus,difference)],[5,1]);
assert.deepEqual([gain(Kminus,common),gain(Kminus,difference)],[2,4]);

const normalizedDet=(K)=>det(K)/(trace(K)**2);
const normalizedCross=(K)=>2*K[0][1]/trace(K);
assert.equal(normalizedDet(Kplus),5/36);
assert.equal(normalizedDet(Kminus),2/9);
assert.equal(normalizedCross(Kplus),2/3);
assert.equal(normalizedCross(Kminus),-1/3);

// det(A^T K A)=det(A)^2 det(K), so unimodular integral congruence cannot
// relate forms with different determinant.  Exhaust small GL(2,Z) as a check.
const transpose=(A)=>[[A[0][0],A[1][0]],[A[0][1],A[1][1]]];
const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const eq=(A,B)=>JSON.stringify(A)===JSON.stringify(B);
let equivalent=false;
for(let a=-3;a<=3;a++)for(let b=-3;b<=3;b++)for(let c=-3;c<=3;c++)for(let d=-3;d<=3;d++){
  const A=[[a,b],[c,d]]; if(Math.abs(a*d-b*c)!==1)continue;
  if(eq(mul(mul(transpose(A),Kplus),A),Kminus))equivalent=true;
}
assert.equal(equivalent,false);

// Both remain Herglotz/passive under multiplication by the same positive
// scalar spectral residue: every real vector sees positive residue.
for(const K of [Kplus,Kminus])for(let x=-4;x<=4;x++)for(let y=-4;y<=4;y++)if(x||y)assert(quad(K,[x,y])>0);

console.log("Kplus/Kminus Jordan-norm and response-observable audit: PASS");
console.log("Kplus_common_difference_eigenvalues=5,1_and_det=5");
console.log("Kminus_common_difference_eigenvalues=2,4_and_det=8");
console.log("scale_free_det_over_trace_squared_is_5_over_36_versus_2_over_9");
console.log("normalized_cross_response_is_2_over_3_versus_minus_1_over_3_in_the_declared_orientation");
console.log("different_determinants_prove_no_GL2Z_congruence_or_port_sign_can_identify_the_lifts");
