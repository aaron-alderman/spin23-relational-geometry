import assert from "node:assert/strict";

const mul=(a,b)=>a.map((row)=>b[0].map((_,j)=>row.reduce((s,x,k)=>s+x*b[k][j],0)));
const transpose=(a)=>a[0].map((_,j)=>a.map((row)=>row[j]));
const inverseDiagonal=(a)=>a.map((row,i)=>row.map((x,j)=>i===j?1/x:0));
const close=(a,b,tol=1e-10)=>a.every((row,i)=>row.every((x,j)=>Math.abs(x-b[i][j])<tol));
const I2=[[1,0],[0,1]],Z2=[[0,0],[0,0]];
const block=(a,b,c,d)=>[[...a[0],...b[0]],[...a[1],...b[1]],[...c[0],...d[0]],[...c[1],...d[1]]];
const J=block(Z2,I2,[[-1,0],[0,-1]],Z2);
const shear=(X)=>block(I2,Z2,X,I2);
const X=[[2,-1],[-1,2]];
const corr=(M)=>M[0][1]/Math.sqrt(M[0][0]*M[1][1]);

const lambda=Math.sqrt(2);
const D=[[lambda,0],[0,lambda]];
const C=block(D,Z2,Z2,inverseDiagonal(D));
const Cinv=block(inverseDiagonal(D),Z2,Z2,D);
assert(close(mul(mul(transpose(C),J),C),J));
const Xscaled=X.map((row)=>row.map((x)=>x/2));
assert(close(mul(mul(C,shear(X)),Cinv),shear(Xscaled)));
assert.equal(corr(X),-0.5);
assert.equal(corr(Xscaled),-0.5);
assert(Xscaled.some((row)=>row.some((x)=>!Number.isInteger(x))));

const faceD=[[2,0],[0,3]];
const faceDinv=inverseDiagonal(faceD);
const Xface=mul(mul(faceDinv,X),faceDinv);
assert(Math.abs(corr(Xface)-corr(X))<1e-12);
assert(Xface[0][0]>0 && Xface[0][0]*Xface[1][1]-Xface[0][1]**2>0);

const irrational=Math.PI;
const Xirrational=X.map((row)=>row.map((x)=>x/(irrational**2)));
assert(Math.abs(corr(Xirrational)-corr(X))<1e-12);
assert(Xirrational.flat().every((x)=>!Number.isInteger(x)));

console.log("Noncompact scalar normalization audit: PASS");
console.log("canonical_rescaling_q_to_lambda_q_p_to_p_over_lambda_is_symplectic");
console.log("response_transforms_X_to_X_over_lambda_squared");
console.log("integral_X_can_become_nonintegral_or_irrational_without_changing_positivity");
console.log("normalized_mutual_correlation=X12_over_sqrt_X11X22_equals_minus_one_half_is_invariant");
console.log("canonical_integral_lattice_requires_compactification_charge_quantization_or_extra_source_data");
